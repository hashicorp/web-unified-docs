import fs from 'fs'
import path from 'path'
import buildMdxTransforms from './mdx-transforms/build-mdx-transforms.mjs'
import batchPromises from './utils/batch-promises.mjs'
import listFiles from './utils/list-files.mjs'
import gatherVersionMetadata from './gather-version-metadata.mjs'
import { addVersionToNavData } from './mdx-transforms/add-version-to-nav-data.mjs'

/**
 * We expect the current working directory to be the project root.
 * We expect MDX files to be located in `public/products`.
 */
const CWD = process.cwd()
const CONTENT_DIR = path.join(CWD, 'content')
const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')

/**
 * Define the prebuild script.
 */
async function main() {
	// Apply MDX transforms, writing out transformed MDX files to `public`
	await buildMdxTransforms(CONTENT_DIR, CONTENT_DIR_OUT)
	// Copy all `*-nav-data.json` files from `content` to `public/content`, using execSync
	await copyNavDataFiles(CONTENT_DIR, CONTENT_DIR_OUT)
	// Gather and write out version metadata
	const versionMetadata = await gatherVersionMetadata(CONTENT_DIR_OUT)
	const versionMetadataJson = JSON.stringify(versionMetadata, null, 2)
	fs.writeFileSync(VERSION_METADATA_FILE, versionMetadataJson)
}

/**
 * Copy all *-nav-data.json files from the source to the destination directory.
 *
 * TODO: approach here could maybe be refined, or maybe this would be nice
 * to split out to a separate file... but felt fine to leave here for now.
 */
async function copyNavDataFiles(sourceDir, destDir) {
	const navDataFiles = (await listFiles(sourceDir)).filter((f) => {
		return f.endsWith('-nav-data.json')
	})
	// add version to nav data paths/hrefs
	navDataFiles.forEach(async (file) => {
		let product = file.split('/content/')[1]
		product = product.split('/').shift()
		await addVersionToNavData(product)
	})
	await batchPromises(
		navDataFiles,
		async (filePath) => {
			const relativePath = path.relative(sourceDir, filePath)
			const destPath = path.join(destDir, relativePath)
			const parentDir = path.dirname(destPath)
			if (!fs.existsSync(parentDir)) {
				fs.mkdirSync(parentDir, { recursive: true })
			}
			fs.copyFileSync(filePath, destPath)
		},
		16,
	)
}

/**
 * Run the prebuild script.
 */
main()
