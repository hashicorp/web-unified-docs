/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs, { type FSWatcher } from 'node:fs'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { Worker } from 'node:worker_threads'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import type { Metadata } from '#types'

const contentDir = path.join(process.cwd(), 'content')
const products = Object.keys(PRODUCT_CONFIG)
const versionMetadataFile = path.join(
	process.cwd(),
	'app/api/versionMetadata.json',
)
const docsPathsAllVersionsFile = path.join(
	process.cwd(),
	'app/api/docsPathsAllVersions.json',
)
let metadataWriteQueue: Promise<void> = Promise.resolve()

type IncBuildsMetadataCache = {
	promise?: Promise<Metadata>
	metadata?: Metadata
	watcher?: FSWatcher
	productPaths: Map<string, string | undefined>
	checkProducts: Set<string>
	pendingProducts: Set<string>
	needsStartupValidation: boolean
	rebuildingProducts: boolean
}

type StartupMetadataCheck =
	| { changed: false }
	| { changed: true; metadata: Metadata }

// Keep the cache on globalThis so module reloads can reuse the watcher.
const globals = globalThis as typeof globalThis & {
	__incBuildsMetadataCache?: IncBuildsMetadataCache
}

// Returns a recursive path snapshot, or undefined when the product directory is missing.
function getProductPaths(product: string): string | undefined {
	const productDir = path.join(contentDir, product)
	if (!fs.existsSync(productDir) || !fs.statSync(productDir).isDirectory()) {
		return undefined
	}

	return JSON.stringify(fs.readdirSync(productDir, { recursive: true }).sort())
}

// Queues products whose content paths differ from the cached snapshot.
function invalidateIfStructureChanged(cache: IncBuildsMetadataCache): void {
	// Content edits don't affect metadata; only path changes do.
	for (const product of cache.checkProducts) {
		const paths = getProductPaths(product)

		if (cache.productPaths.get(product) !== paths) {
			cache.productPaths.set(product, paths)
			cache.pendingProducts.add(product)
		}
	}

	cache.checkProducts.clear()
}

// Reads both generated metadata files when they are present.
function readExistingMetadata(): Metadata | undefined {
	if (
		!fs.existsSync(versionMetadataFile) ||
		!fs.existsSync(docsPathsAllVersionsFile)
	) {
		return undefined
	}

	return {
		versionMetadata: JSON.parse(
			fs.readFileSync(versionMetadataFile, 'utf8'),
		) as Metadata['versionMetadata'],
		docsPathsAllVersions: JSON.parse(
			fs.readFileSync(docsPathsAllVersionsFile, 'utf8'),
		) as Metadata['docsPathsAllVersions'],
	}
}

// Checks cached metadata against a fresh scan in a worker thread.
function checkStartupMetadata(
	metadata: Metadata,
): Promise<StartupMetadataCheck> {
	return new Promise<StartupMetadataCheck>(
		(
			resolve: (result: StartupMetadataCheck) => void,
			reject: (error: Error) => void,
		) => {
			const worker = new Worker(
				path.join(process.cwd(), 'app/utils/incBuildsMetadataWorker.mjs'),
				{ workerData: { contentDir, metadata } },
			)
			let receivedResult = false

			worker.once('message', (result: StartupMetadataCheck) => {
				receivedResult = true
				resolve(result)
			})

			worker.once('error', reject)
			worker.once('exit', (code: number) => {
				// A normal exit is valid only after the worker sends its result.
				if (!receivedResult) {
					reject(
						new Error(
							`Startup metadata worker exited without a result (code ${code})`,
						),
					)
				}
			})
		},
	)
}

// Requests a Dev Portal refresh without blocking the caller.
function refreshDevPortal(): void {
	void fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
		method: 'POST',
	})
		.then((response: Response) => {
			if (!response.ok) {
				throw new Error(`Dev Portal refresh returned HTTP ${response.status}`)
			}
		})
		.catch((error: unknown) => {
			console.error('[watcher] failed to refresh Dev Portal', error)
		})
}

// Queues writes of both generated metadata files.
function saveMetadataFiles(metadata: Metadata): void {
	const versionMetadata = JSON.stringify(metadata.versionMetadata, null, 2)
	const docsPathsAllVersions = JSON.stringify(
		metadata.docsPathsAllVersions,
		null,
		2,
	)

	// Serialize writes so a slower rebuild can't overwrite newer metadata.
	metadataWriteQueue = metadataWriteQueue
		.then(async (): Promise<void> => {
			await Promise.all([
				fs.promises.writeFile(versionMetadataFile, versionMetadata),
				fs.promises.writeFile(docsPathsAllVersionsFile, docsPathsAllVersions),
			])
		})
		.catch((error: unknown) => {
			console.error('[watcher] failed to save metadata files', error)
		})
}

// Generates version and document-path metadata for all or selected products.
async function generateMetadata(products?: string[]): Promise<Metadata> {
	// ESM caches these imports across incremental rebuilds.
	const [versionsModule, pathsModule] = await Promise.all([
		import('../../scripts/prebuild/gather-version-metadata.mjs'),
		import('../../scripts/prebuild/gather-all-versions-docs-paths.mjs'),
	])

	const versionMetadata = await versionsModule.gatherVersionMetadata(
		contentDir,
		products,
	)

	const docsPathsAllVersions = await pathsModule.gatherAllVersionsDocsPaths(
		versionMetadata,
		false,
		Object.keys(versionMetadata),
		{ verbose: false },
	)

	return { versionMetadata, docsPathsAllVersions } as Metadata
}

// Coalesces startup validation and pending product rebuilds into one shared update.
function regenerateMetadata(
	cache: IncBuildsMetadataCache,
	initialMetadata?: Promise<Metadata>,
): Promise<Metadata> {
	if (cache.promise) {
		return cache.promise
	}

	const pending = (async () => {
		// Coalesce watcher events, including atomic saves, before checking paths.
		await new Promise<void>((resolve: () => void) => {
			setImmediate(resolve)
		})

		if (!cache.metadata) {
			invalidateIfStructureChanged(cache)

			if (initialMetadata) {
				cache.metadata = await initialMetadata
			} else {
				cache.pendingProducts.clear()
				console.log('[watcher] generating initial metadata')

				try {
					cache.metadata = await generateMetadata()
				} catch (error: unknown) {
					console.error('[watcher] failed to generate initial metadata', error)
					throw error
				}

				console.log('[watcher] generated initial metadata')
				saveMetadataFiles(cache.metadata)
			}
		}

		let startupMetadataChanged = false

		// Validate cached files off-thread while requests continue using the cache.
		if (cache.needsStartupValidation) {
			console.log('[watcher] checking startup metadata in the background')
			try {
				const result = await checkStartupMetadata(cache.metadata)
				if (result.changed) {
					cache.metadata = result.metadata
					startupMetadataChanged = true
					saveMetadataFiles(cache.metadata)
				}
			} catch (error: unknown) {
				console.error('[watcher] failed to check startup metadata', error)
				throw error
			}
		}

		// Drain path changes received during validation or a previous rebuild.
		invalidateIfStructureChanged(cache)
		while (cache.pendingProducts.size > 0) {
			const changedProducts = [...cache.pendingProducts]
			cache.pendingProducts.clear()
			for (const product of changedProducts) {
				console.log(`[watcher] reloading ${product} metadata`)
			}

			cache.rebuildingProducts = true
			try {
				const generated = await generateMetadata(changedProducts)

				for (const product of changedProducts) {
					if (
						cache.needsStartupValidation &&
						(!isDeepStrictEqual(
							cache.metadata.versionMetadata[product],
							generated.versionMetadata[product],
						) ||
							!isDeepStrictEqual(
								cache.metadata.docsPathsAllVersions[product],
								generated.docsPathsAllVersions[product],
							))
					) {
						startupMetadataChanged = true
					}
					cache.metadata.versionMetadata[product] =
						generated.versionMetadata[product]
					cache.metadata.docsPathsAllVersions[product] =
						generated.docsPathsAllVersions[product]
				}
				saveMetadataFiles(cache.metadata)
			} catch (error: unknown) {
				for (const product of changedProducts) {
					cache.pendingProducts.add(product)
					console.error(`[watcher] failed to reload ${product}`, error)
				}

				throw error
			} finally {
				cache.rebuildingProducts = false
			}

			invalidateIfStructureChanged(cache)
		}

		// Refresh once, after startup validation and all structural rebuilds finish.
		if (cache.needsStartupValidation) {
			cache.needsStartupValidation = false
			console.log('[watcher] completed startup metadata check')
			if (startupMetadataChanged) {
				refreshDevPortal()
			}
		}

		return cache.metadata
	})().finally(() => {
		if (cache.promise === pending) {
			cache.promise = undefined
		}
	})

	cache.promise = pending
	return pending
}

// Reuses or initializes the global cache and recursive content watcher.
export function startIncBuildsWatcher(): IncBuildsMetadataCache {
	const existingCache = globals.__incBuildsMetadataCache

	if (
		existingCache?.watcher &&
		existingCache.productPaths &&
		typeof existingCache.needsStartupValidation === 'boolean' &&
		typeof existingCache.rebuildingProducts === 'boolean'
	) {
		return existingCache
	}

	// Close a watcher tied to an outdated cache shape.
	existingCache?.watcher?.close()
	const initialMetadata = existingCache?.promise
	const metadata =
		existingCache?.metadata ??
		(initialMetadata ? undefined : readExistingMetadata())
	if (metadata && !existingCache?.metadata) {
		console.log('[watcher] loading existing metadata')
	}
	const cache: IncBuildsMetadataCache = {
		metadata,
		productPaths: new Map(
			products.map((product: string) => {
				return [product, getProductPaths(product)]
			}),
		),
		checkProducts: new Set(),
		pendingProducts: new Set(),
		needsStartupValidation: Boolean(metadata || initialMetadata),
		rebuildingProducts: false,
	}
	globals.__incBuildsMetadataCache = cache

	cache.watcher = fs.watch(
		contentDir,
		{ recursive: true, persistent: false },
		(eventType: string, filename: string | null) => {
			const filePath = filename ? path.join(contentDir, filename) : contentDir
			console.log(`[watcher] reloading ${filePath}`)

			// Content edits refresh the portal but don't affect metadata structure.
			if (eventType === 'change') {
				refreshDevPortal()
				return
			}

			// Rename events require a path comparison to identify affected products.
			const changedProduct = filename?.split(path.sep)[0]

			if (changedProduct !== undefined) {
				if (!products.includes(changedProduct)) {
					refreshDevPortal()
					return
				}

				cache.checkProducts.add(changedProduct)
			} else {
				// Without a filename, check every configured product.
				for (const product of products) {
					cache.checkProducts.add(product)
				}
			}

			const pending = regenerateMetadata(cache)
			void pending
				.then(() => {
					refreshDevPortal()
				})
				.catch(() => {
					// Regeneration logs its failures; don't refresh stale metadata.
				})
		},
	)

	// Validate cached metadata at startup without blocking the first cached read.
	if (initialMetadata || cache.needsStartupValidation) {
		void regenerateMetadata(cache, initialMetadata).catch((error: unknown) => {
			console.error('[watcher] failed to reload metadata', error)
		})
	}

	return cache
}

// Returns local metadata, waiting for initial generation or pending path rebuilds.
export function getIncBuildLocalDevMetadata(): Promise<Metadata> {
	const cache = startIncBuildsWatcher()

	// Serve cached data during validation unless a structural rebuild is pending.
	if (cache.metadata && cache.needsStartupValidation) {
		invalidateIfStructureChanged(cache)
		if (cache.pendingProducts.size === 0 && !cache.rebuildingProducts) {
			if (!cache.promise) {
				// Startup failures are logged before rejecting; a later request retries.
				void regenerateMetadata(cache).catch(() => {})
			}
			return Promise.resolve(cache.metadata)
		}
	}

	if (cache.promise) {
		return cache.promise
	}

	return cache.metadata && cache.pendingProducts.size === 0
		? Promise.resolve(cache.metadata)
		: regenerateMetadata(cache)
}
