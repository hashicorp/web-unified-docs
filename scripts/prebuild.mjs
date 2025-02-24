import fs from 'fs'
import path from 'path'
import { buildMdxTransforms } from './mdx-transforms/build-mdx-transforms.mjs'
import { batchPromises } from './utils/batch-promises.mjs'
import { listFiles } from './utils/list-files.mjs'
import { gatherVersionMetadata } from './gather-version-metadata.mjs'
import { gatherAllDocsPaths } from './gather-all-docs-paths.mjs'
import { gatherAllVersionsDocsPaths } from './gather-all-versions-docs-paths.mjs'
import { addVersionToNavData } from './add-version-to-nav-data.mjs'
import { buildAlgoliaRecords } from './algolia/build-algolia-records.mjs'

/**
 * We expect the current working directory to be the project root.
 * We expect MDX files to be located in `public/products`.
 */
const CWD = process.cwd()
const CONTENT_DIR = path.join(CWD, 'content')
const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')
const CONTENT_DIR_OUT_ASSETS = path.join(CWD, 'public', 'assets')
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')
const DOCS_PATHS_FILE = path.join(CWD, 'app/api/docsPaths.json')
const DOCS_PATHS_ALL_VERSIONS_FILE = path.join(
	CWD,
	'app/api/docsPathsAllVersions.json',
)

/**
 * Define the prebuild script.
 */
async function main() {
	// Gather and write out version metadata
	const versionMetadata = await gatherVersionMetadata(CONTENT_DIR)
	const versionMetadataJson = JSON.stringify(versionMetadata, null, 2)
	fs.writeFileSync(VERSION_METADATA_FILE, versionMetadataJson)

	// Gather and write out all docs paths
	const docsPaths = await gatherAllDocsPaths(versionMetadata)
	const docsPathsJson = JSON.stringify(docsPaths, null, 2)
	fs.writeFileSync(DOCS_PATHS_FILE, docsPathsJson)

	const docsPathsAllVersions = await gatherAllVersionsDocsPaths(versionMetadata)
	const docsPathsAllVersionsJson = JSON.stringify(docsPathsAllVersions, null, 2)
	fs.writeFileSync(DOCS_PATHS_ALL_VERSIONS_FILE, docsPathsAllVersionsJson)

	// Apply MDX transforms, writing out transformed MDX files to `public`
	await buildMdxTransforms(CONTENT_DIR, CONTENT_DIR_OUT, versionMetadata)

	await buildAlgoliaRecords(CONTENT_DIR_OUT, versionMetadata)

	// Copy all `*-nav-data.json` files from `content` to `public/content`, using execSync
	await copyNavDataFiles(CONTENT_DIR, CONTENT_DIR_OUT, versionMetadata)

	// Copy all `redirects.jsonc` files from `content` to `public/content
	await copyRedirectFiles(CONTENT_DIR, CONTENT_DIR_OUT)

	// Copy all asset files from `content` to `public/assets`
	await copyAssetFiles(CONTENT_DIR, CONTENT_DIR_OUT_ASSETS)
}

/**
 * Copy all *-nav-data.json files from the source to the destination directory.
 *
 * TODO: approach here could maybe be refined, or maybe this would be nice
 * to split out to a separate file... but felt fine to leave here for now.
 */
async function copyNavDataFiles(sourceDir, destDir, versionMetadata = {}) {
	const navDataFiles = (await listFiles(sourceDir)).filter((f) => {
		return f.endsWith('-nav-data.json')
	})

	console.log(`\nCopying NavData from ${navDataFiles.length} files...`)

	await batchPromises('NavData', navDataFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)

		// add version to nav data paths/hrefs
		await addVersionToNavData(destPath, versionMetadata)
	})
}

async function copyRedirectFiles(sourceDir, destDir) {
	const redirectFiles = (await listFiles(sourceDir)).filter((f) => {
		return f.endsWith('redirects.jsonc')
	})

	console.log(`\nCopying Redirects from ${redirectFiles.length} files...`)

	await batchPromises('Redirects', redirectFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)
	})
}

function isFileAnImage(file) {
	const fileExtension = path.extname(file).toLowerCase()

	const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
	return imageExtensions.includes(fileExtension)
}

async function copyAssetFiles(sourceDir, destDir) {
	const assetFiles = (await listFiles(sourceDir)).filter((f) => {
		return isFileAnImage(f)
	})

	console.log(`\nCopying Assets from ${assetFiles.length} files...`)

	await batchPromises('Assets', assetFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)
	})
}

/**
 * Run the prebuild script.
 */
main()
