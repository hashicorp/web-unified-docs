/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import type { FSWatcher } from 'node:fs'
import path from 'node:path'
import { BUILD_TYPE, buildType } from './buildType'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import type { Metadata } from '#types'

const METADATA_MAX_AGE_MS = 60 * 60 * 1000
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
}

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

	const oldestAllowedMtime = Date.now() - METADATA_MAX_AGE_MS
	const expired = [versionMetadataFile, docsPathsAllVersionsFile].some(
		(file: string): boolean => {
			return fs.statSync(file).mtimeMs < oldestAllowedMtime
		},
	)

	if (expired) {
		console.log(
			'[watcher] existing metadata is older than one hour; regenerating',
		)
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
				const existingMetadata = readExistingMetadata()

				if (existingMetadata) {
					console.log('[watcher] loading existing metadata')
					cache.metadata = existingMetadata
				} else {
					cache.pendingProducts.clear()
					console.log('[watcher] generating initial metadata')

					try {
						cache.metadata = await generateMetadata()
					} catch (error: unknown) {
						console.error(
							'[watcher] failed to generate initial metadata',
							error,
						)
						throw error
					}

					console.log('[watcher] generated initial metadata')
					saveMetadataFiles(cache.metadata)
				}
			}
		}

		invalidateIfStructureChanged(cache)
		while (cache.pendingProducts.size > 0) {
			const changedProducts = [...cache.pendingProducts]
			cache.pendingProducts.clear()
			for (const product of changedProducts) {
				console.log(`[watcher] reloading ${product} metadata`)
			}

			try {
				const generated = await generateMetadata(changedProducts)

				for (const product of changedProducts) {
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
			}

			invalidateIfStructureChanged(cache)
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

function startIncBuildsWatcher(): IncBuildsMetadataCache {
	let cache = globals.__incBuildsMetadataCache
	if (!cache?.watcher || !cache.productPaths) {
		// Replace an older watcher retained across a development module reload.
		cache?.watcher?.close()
		const initialMetadata = cache?.promise
		const nextCache: IncBuildsMetadataCache = {
			metadata: cache?.metadata,
			productPaths: new Map(
				products.map((product: string) => {
					return [product, getProductPaths(product)]
				}),
			),
			checkProducts: new Set(),
			pendingProducts: new Set(),
		}
		cache = globals.__incBuildsMetadataCache = nextCache

		cache.watcher = fs.watch(
			contentDir,
			{ recursive: true, persistent: false },
			(eventType: string, filename: string | null) => {
				const filePath = filename ? path.join(contentDir, filename) : contentDir
				console.log(`[watcher] reloading ${filePath}`)

				void fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
					method: 'POST',
				}).catch((error: unknown) => {
					console.error('[watcher] failed to refresh Dev Portal', error)
				})

				if (eventType === 'change') {
					return
				}

				const changedProduct = filename?.split(path.sep)[0]
				if (changedProduct !== undefined) {
					if (!products.includes(changedProduct)) {
						return
					}

					nextCache.checkProducts.add(changedProduct)
				} else {
					for (const product of products) {
						nextCache.checkProducts.add(product)
					}
				}

				const alreadyRegenerating = nextCache.promise !== undefined
				const pending = regenerateMetadata(nextCache)
				if (!alreadyRegenerating) {
					// The regeneration logs product-specific failures before rejecting.
					void pending.catch(() => {})
				}
			},
		)

		if (initialMetadata) {
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

	if (cache.promise) {
		return cache.promise
	}

	return cache.metadata && cache.pendingProducts.size === 0
		? Promise.resolve(cache.metadata)
		: regenerateMetadata(cache)
}

if (buildType === BUILD_TYPE.incBuildLocalDev) {
	startIncBuildsWatcher()
}
