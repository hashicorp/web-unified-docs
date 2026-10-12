import fs from 'node:fs'
import type { FSWatcher } from 'node:fs'
import path from 'node:path'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import type { Metadata } from '#types'

const contentDir = path.join(process.cwd(), 'content')
const products = Object.keys(PRODUCT_CONFIG)
export const IncBuildLocalDev =
	process.env.INCREMENTAL_BUILD === 'true' &&
	process.env.NODE_ENV === 'development' &&
	process.env.VERCEL_ENV !== 'preview'

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
			cache.pendingProducts.clear()
			cache.metadata = await (initialMetadata ?? generateMetadata())
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
			(_eventType: string, filename: string | null) => {
				const filePath = filename ? path.join(contentDir, filename) : contentDir
				console.log(`[watcher] reloading ${filePath}`)
				void fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
					method: 'POST',
				}).catch((error: unknown) => {
					console.error('[watcher] failed to refresh Dev Portal', error)
				})

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

if (IncBuildLocalDev) {
	startIncBuildsWatcher()
}
