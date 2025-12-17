/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Selective prebuild for Quick Preview mode.
 * Only processes files listed in the changedfiles.json manifest.
 */

import fs from 'node:fs'
import path from 'node:path'
import { applyFileMdxTransforms } from '../prebuild/mdx-transforms/build-mdx-transforms-file.mjs'
import { batchPromises } from '#scriptUtils/batch-promises.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import semver from 'semver'

const CWD = process.cwd()
const MANIFEST_PATH = path.join(CWD, 'public/changedfiles.json')
const CONTENT_DIR = path.join(CWD, 'content')
const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')
const CONTENT_DIR_OUT_ASSETS = path.join(CWD, 'public', 'assets')
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')

/**
 * Load the Quick Preview manifest
 */
function loadManifest() {
	if (!fs.existsSync(MANIFEST_PATH)) {
		throw new Error(
			`Manifest not found at ${MANIFEST_PATH}. Run detect-changes.mjs first.`,
		)
	}

	const manifestContent = fs.readFileSync(MANIFEST_PATH, 'utf-8')
	return JSON.parse(manifestContent)
}

/**
 * Process only changed MDX files
 */
async function processChangedDocs(changedDocs, versionMetadata) {
	if (changedDocs.length === 0) {
		console.log('✅ No changed docs to process')
		return
	}

	console.log(`\nProcessing ${changedDocs.length} changed docs...`)

	// Convert file paths to entries similar to buildMdxTransforms
	const mdxFileEntries = changedDocs.map((filePath) => {
		const relativePath = path.relative(CONTENT_DIR, filePath)
		const [repoSlug, version, contentDir] = relativePath.split('/')

		const verifiedVersion = PRODUCT_CONFIG[repoSlug].versionedDocs
			? version
			: ''
		const verifiedContentDir = semver.valid(semver.coerce(version))
			? contentDir
			: version
		const partialsDir = path.join(
			CONTENT_DIR,
			repoSlug,
			verifiedVersion,
			verifiedContentDir,
			'partials',
		)
		const redirectsDir = path.join(CONTENT_DIR, repoSlug, verifiedVersion)
		const outPath = path.join(CONTENT_DIR_OUT, relativePath)

		return {
			repoSlug,
			filePath,
			partialsDir,
			outPath,
			version,
			redirectsDir,
		}
	})

	const results = await batchPromises(
		'MDX transforms',
		mdxFileEntries,
		(entry) => {
			return applyFileMdxTransforms(entry, versionMetadata)
		},
	)

	// Check for errors
	const errors = results.filter((result) => {
		return result.error !== null
	})

	if (errors.length > 0) {
		console.error(`\n❗ Encountered ${errors.length} errors:`)
		errors.forEach(({ error, file }) => {
			console.error(`❌ ${error} in file: ${file}`)
		})
		throw new Error('Build failed due to errors in MDX transforms.')
	}

	console.log(`✅ Processed ${changedDocs.length} docs`)
}

/**
 * Process only changed nav-data files
 */
async function processChangedNavData(changedNavData) {
	if (changedNavData.length === 0) {
		console.log('✅ No changed nav-data to process')
		return
	}

	console.log(`\nProcessing ${changedNavData.length} changed nav-data files...`)

	for (const filePath of changedNavData) {
		const relativePath = path.relative(CONTENT_DIR, filePath)
		const destPath = path.join(CONTENT_DIR_OUT, relativePath)
		const parentDir = path.dirname(destPath)

		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}

		fs.copyFileSync(filePath, destPath)
	}

	console.log(`✅ Processed ${changedNavData.length} nav-data files`)
}

/**
 * Process only changed redirect files
 */
async function processChangedRedirects(changedRedirects) {
	if (changedRedirects.length === 0) {
		console.log('✅ No changed redirects to process')
		return
	}

	console.log(
		`\nProcessing ${changedRedirects.length} changed redirect files...`,
	)

	for (const filePath of changedRedirects) {
		const relativePath = path.relative(CONTENT_DIR, filePath)
		const destPath = path.join(CONTENT_DIR_OUT, relativePath)
		const parentDir = path.dirname(destPath)

		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}

		fs.copyFileSync(filePath, destPath)
	}

	console.log(`✅ Processed ${changedRedirects.length} redirect files`)
}

/**
 * Process only changed asset files
 */
async function processChangedAssets(changedAssets) {
	if (changedAssets.length === 0) {
		console.log('✅ No changed assets to process')
		return
	}

	console.log(`\nProcessing ${changedAssets.length} changed asset files...`)

	for (const filePath of changedAssets) {
		const relativePath = path.relative(CONTENT_DIR, filePath)
		const destPath = path.join(CONTENT_DIR_OUT_ASSETS, relativePath)
		const parentDir = path.dirname(destPath)

		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}

		fs.copyFileSync(filePath, destPath)
	}

	console.log(`✅ Processed ${changedAssets.length} asset files`)
}

/**
 * Main selective prebuild function
 */
async function selectivePrebuild() {
	console.log('🚀 Running Selective Prebuild (Quick Preview mode)\n')

	const manifest = loadManifest()

	console.log(`Mode: ${manifest.mode}`)
	console.log(`Base branch: ${manifest.baseBranch}`)
	console.log(`Changed files: ${manifest.stats.changed}`)
	console.log(`Deleted files: ${manifest.stats.deleted}\n`)

	// Convert relative paths to absolute paths
	const changedDocs = manifest.changed.docs.map((f) => {
		return path.join(CWD, f)
	})
	const changedNavData = manifest.changed.navData.map((f) => {
		return path.join(CWD, f)
	})
	const changedRedirects = manifest.changed.redirects.map((f) => {
		return path.join(CWD, f)
	})
	const changedAssets = manifest.changed.assets.map((f) => {
		return path.join(CWD, f)
	})

	// Load version metadata
	const versionMetadataContent = fs.readFileSync(VERSION_METADATA_FILE, 'utf-8')
	const versionMetadata = JSON.parse(versionMetadataContent)

	// Process each category
	await processChangedDocs(changedDocs, versionMetadata)
	await processChangedNavData(changedNavData)
	await processChangedRedirects(changedRedirects)
	await processChangedAssets(changedAssets)

	console.log('\n✅ Selective prebuild complete!')
	console.log(
		'\n💡 Unchanged files will be served from production via Quick Preview fallback',
	)
}

// Run the selective prebuild
selectivePrebuild().catch((error) => {
	console.error('❌ Selective prebuild failed:', error.message)
	process.exit(1)
})
