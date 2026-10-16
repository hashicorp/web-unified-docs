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

// Keep the development cache and watcher alive across module reloads.
const globals = globalThis as typeof globalThis & {
	__incBuildsMetadataCache?: IncBuildsMetadataCache
}

function getProductPaths(product: string): string | undefined {
	const productDir = path.join(contentDir, product)
	if (!fs.existsSync(productDir) || !fs.statSync(productDir).isDirectory()) {
		return undefined
	}

	return JSON.stringify(fs.readdirSync(productDir, { recursive: true }).sort())
}

function invalidateIfStructureChanged(cache: IncBuildsMetadataCache): void {
	// Compare paths only: editing an existing file must not invalidate metadata.
	for (const product of cache.checkProducts) {
		const paths = getProductPaths(product)

		if (cache.productPaths.get(product) !== paths) {
			cache.productPaths.set(product, paths)
			cache.pendingProducts.add(product)
		}
	}

	cache.checkProducts.clear()
}

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

function saveMetadataFiles(metadata: Metadata): void {
	const versionMetadata = JSON.stringify(metadata.versionMetadata, null, 2)
	const docsPathsAllVersions = JSON.stringify(
		metadata.docsPathsAllVersions,
		null,
		2,
	)

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

async function generateMetadata(products?: string[]): Promise<Metadata> {
	// These are cached automatically by module runtime
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

export function startIncBuildsWatcher(): IncBuildsMetadataCache {
	let cache = globals.__incBuildsMetadataCache
	if (
		!cache?.watcher ||
		!cache.productPaths ||
		typeof cache.needsStartupValidation !== 'boolean' ||
		typeof cache.rebuildingProducts !== 'boolean'
	) {
		// Replace an older watcher retained across a development module reload.
		cache?.watcher?.close()
		const initialMetadata = cache?.promise
		const metadata =
			cache?.metadata ?? (initialMetadata ? undefined : readExistingMetadata())
		if (metadata && !cache?.metadata) {
			console.log('[watcher] loading existing metadata')
		}
		const nextCache: IncBuildsMetadataCache = {
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
		cache = globals.__incBuildsMetadataCache = nextCache

		cache.watcher = fs.watch(
			contentDir,
			{ recursive: true, persistent: false },
			(eventType: string, filename: string | null) => {
				const filePath = filename ? path.join(contentDir, filename) : contentDir
				console.log(`[watcher] reloading ${filePath}`)

				if (eventType === 'change') {
					refreshDevPortal()
					return
				}

				const changedProduct = filename?.split(path.sep)[0]
				if (changedProduct !== undefined) {
					if (!products.includes(changedProduct)) {
						refreshDevPortal()
						return
					}

					nextCache.checkProducts.add(changedProduct)
				} else {
					for (const product of products) {
						nextCache.checkProducts.add(product)
					}
				}

				const pending = regenerateMetadata(nextCache)
				void pending
					.then(() => {
						refreshDevPortal()
					})
					.catch(() => {
						// Regeneration logs its failures; don't refresh stale metadata.
					})
			},
		)

		if (initialMetadata || cache.needsStartupValidation) {
			void regenerateMetadata(cache, initialMetadata).catch(
				(error: unknown) => {
					console.error('[watcher] failed to reload metadata', error)
				},
			)
		}
	}

	return cache
}

export function getIncBuildLocalDevMetadata(): Promise<Metadata> {
	const cache = startIncBuildsWatcher()

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
