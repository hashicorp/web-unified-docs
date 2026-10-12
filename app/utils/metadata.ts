import fs from 'node:fs'
import path from 'node:path'
import type {
	DocsPathsAllVersions,
	IncBuildsMetadataCache,
	Metadata,
	VersionMetadataMap,
} from '#types'

const contentDir = path.join(process.cwd(), 'content')
const versionMetadataFile = path.join(
	process.cwd(),
	'app/api/versionMetadata.json',
)
const docsPathsAllVersionsFile = path.join(
	process.cwd(),
	'app/api/docsPathsAllVersions.json',
)
const incBuild = process.env.INCREMENTAL_BUILD === 'true'
const incBuildPRPreview = incBuild && process.env.VERCEL_ENV === 'preview'
export const incBuildLocalDev =
	incBuild && process.env.NODE_ENV === 'development' && !incBuildPRPreview

// Keep the development cache and watcher alive across module reloads.
const globals = globalThis as typeof globalThis & {
	__incBuildsMetadataCache?: IncBuildsMetadataCache
}

function getContentPaths(): string {
	return JSON.stringify(fs.readdirSync(contentDir, { recursive: true }).sort())
}

function invalidateIfStructureChanged(cache: IncBuildsMetadataCache): void {
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

function readGeneratedMetadata(): Metadata {
	return {
		versionMetadata: JSON.parse(
			fs.readFileSync(versionMetadataFile, 'utf8'),
		) as VersionMetadataMap,
		docsPathsAllVersions: JSON.parse(
			fs.readFileSync(docsPathsAllVersionsFile, 'utf8'),
		) as DocsPathsAllVersions,
	}
}

function getIncrementalLocalDevMetadata(): Promise<Metadata> {
	const cache = (globals.__incBuildsMetadataCache ??= {})
	if (!cache.watcher || cache.paths === undefined) {
		// Replace an older watcher retained across a development module reload.
		cache.watcher?.close()
		cache.paths = getContentPaths()
		// Watch all content without keeping the process alive.
		cache.watcher = fs.watch(
			contentDir,
			{ recursive: true, persistent: false },
			() => {
				cache.checkPaths = true
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
				return cache.promise === pending
					? metadata
					: getIncrementalLocalDevMetadata()
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

let prodVersionMetadata: VersionMetadataMap | undefined
let prodDocsPathsAllVersions: DocsPathsAllVersions | undefined
function getProductionMetadata(): Metadata {
	if (
		prodVersionMetadata === undefined ||
		prodDocsPathsAllVersions === undefined
	) {
		const missingFiles = [versionMetadataFile, docsPathsAllVersionsFile].filter(
			(file: string): boolean => {
				return !fs.existsSync(file)
			},
		)
		if (missingFiles.length > 0) {
			throw new Error(
				`Missing generated metadata file(s): ${missingFiles.join(', ')}. Run \`npm run prebuild\` to generate them.`,
			)
		}

		const metadata = readGeneratedMetadata()
		prodVersionMetadata = metadata.versionMetadata
		prodDocsPathsAllVersions = metadata.docsPathsAllVersions
	}

	return {
		versionMetadata: prodVersionMetadata,
		docsPathsAllVersions: prodDocsPathsAllVersions,
	}
}

export function getMetadata(): Promise<Metadata> {
	return incBuildLocalDev
		? getIncrementalLocalDevMetadata()
		: Promise.resolve().then(getProductionMetadata)
}
