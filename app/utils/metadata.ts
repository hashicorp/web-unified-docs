import fs from 'node:fs'
import path from 'node:path'
import versionMetadataJson from '#api/versionMetadata.json'
import docsPathsAllVersionsJson from '#api/docsPathsAllVersions.json'

export type Metadata = {
	versionMetadata: typeof versionMetadataJson
	docsPathsAllVersions: typeof docsPathsAllVersionsJson
}

type MetadataCache = {
	promise?: Promise<Metadata>
	watcher?: fs.FSWatcher
	paths?: string
	checkPaths?: boolean
}

const contentDir = path.join(process.cwd(), 'content')
const incBuild = process.env.INCREMENTAL_BUILD === 'true'
const incBuildPRPreview = incBuild && process.env.VERCEL_ENV === 'preview'
export const incBuildLocalDev =
	incBuild && process.env.NODE_ENV === 'development' && !incBuildPRPreview

// Keep the shared cache and watcher alive across development module reloads.
const globals = globalThis as typeof globalThis & {
	__unifiedDocsMetadataCache?: MetadataCache
}

function getContentPaths(): string {
	return JSON.stringify(fs.readdirSync(contentDir, { recursive: true }).sort())
}

function invalidateIfStructureChanged(cache: MetadataCache): void {
	if (!cache.checkPaths) {
		return
	}

	// Compare paths only: editing or replacing an existing file must not invalidate metadata.
	const paths = getContentPaths()
	cache.checkPaths = false
	if (cache.paths !== paths) {
		cache.paths = paths
		cache.promise = undefined
	}
}

async function generateMetadata(): Promise<Metadata> {
	const [versionsModule, pathsModule] = await Promise.all([
		import('../../scripts/prebuild/gather-version-metadata.mjs'),
		import('../../scripts/prebuild/gather-all-versions-docs-paths.mjs'),
	])
	const versionMetadata = await versionsModule.gatherVersionMetadata(contentDir)
	const docsPathsAllVersions = await pathsModule.gatherAllVersionsDocsPaths(
		versionMetadata,
		false,
		Object.keys(versionMetadata),
	)
	return { versionMetadata, docsPathsAllVersions } as Metadata
}

export function getMetadata(): Promise<Metadata> {
	if (!incBuildLocalDev) {
		return Promise.resolve({
			versionMetadata: versionMetadataJson,
			docsPathsAllVersions: docsPathsAllVersionsJson,
		})
	}

	const cache = (globals.__unifiedDocsMetadataCache ??= {})
	if (!cache.watcher || cache.paths === undefined) {
		// Replace an older watcher retained across a development module reload.
		cache.watcher?.close()
		cache.paths = getContentPaths()
		// Watch all content without keeping the process alive.
		cache.watcher = fs.watch(
			contentDir,
			{ recursive: true, persistent: false },
			(eventType: string) => {
				// Atomic saves can emit rename events; defer checking the final path list.
				if (eventType === 'rename') {
					cache.checkPaths = true
				}
			},
		)
	}

	invalidateIfStructureChanged(cache)
	if (!cache.promise) {
		// Concurrent requests share this generation until the directory structure changes.
		const pending: Promise<Metadata> = generateMetadata()
			.then((metadata: Metadata) => {
				invalidateIfStructureChanged(cache)
				// If invalidated mid-build, wait for fresh metadata instead of returning stale data.
				return cache.promise === pending ? metadata : getMetadata()
			})
			.catch((error: unknown) => {
				// Allow retries without clearing a newer generation started after invalidation.
				if (cache.promise === pending) {
					cache.promise = undefined
				}
				throw error
			})
		cache.promise = pending
	}
	return cache.promise
}
