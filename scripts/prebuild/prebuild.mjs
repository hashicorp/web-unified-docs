/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { buildMdxTransforms } from './mdx-transforms/build-mdx-transforms.mjs'
import { gatherVersionMetadata } from './gather-version-metadata.mjs'
import { gatherAllVersionsDocsPaths } from './gather-all-versions-docs-paths.mjs'
import { buildAlgoliaRecords } from '../algolia/build-algolia-records.mjs'
import { copyNavDataFiles } from '#scriptUtils/copy-nav-data-files.mjs'
import { copyRedirectFiles } from '#scriptUtils/copy-redirect-files.mjs'
import { copyAllAssetFiles } from '#scriptUtils/copy-asset-files.mjs'

/**
 * We expect the current working directory to be the project root.
 * We expect MDX files to be located in `public/products`.
 */
const CWD = process.cwd()
const CONTENT_DIR = path.join(CWD, 'content')
const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')
const CONTENT_DIR_OUT_ASSETS = path.join(CWD, 'public', 'assets')
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')
const DOCS_PATHS_ALL_VERSIONS_FILE = path.join(
	CWD,
	'app/api/docsPathsAllVersions.json',
)

const getCommandLineArgs = () => {
	const args = process.argv.slice(2).reduce(
		(args, arg) => {
			if (arg === '--only-build-version-metadata') {
				args.onlyVersionMetadata = true
			} else if (arg === '--build-algolia-index') {
				args.buildAlgoliaIndex = true
			} else if (arg === '--get-real-file-changed-metadata') {
				args.getRealFileChangedMetadata = true
			}

			return args
		},
		{
			onlyBuildVersionMetadata: false,
			buildAlgoliaIndex: false,
			getRealFileChangedMetadata: false,
		},
	)

	// Set getRealFileChangedMetadata to true in production
	if (process.env.VERCEL_ENV === 'production') {
		args.getRealFileChangedMetadata = true
	}

	return args
}

/**
 * Define the prebuild script.
 */
async function main() {
	const args = getCommandLineArgs()

	console.log(
		`Running prebuild script with args: ${JSON.stringify(args, null, 2)}\n`,
	)

	// Gather and write out version metadata
	const versionMetadata = await gatherVersionMetadata(CONTENT_DIR)
	const versionMetadataJson = JSON.stringify(versionMetadata, null, 2)
	fs.writeFileSync(VERSION_METADATA_FILE, versionMetadataJson)

	if (args.onlyVersionMetadata) {
		console.log('Only generating version metadata, skipping other steps.')
		return
	}

	const docsPathsAllVersions = await gatherAllVersionsDocsPaths(
		versionMetadata,
		args.getRealFileChangedMetadata,
	)
	const docsPathsAllVersionsJson = JSON.stringify(docsPathsAllVersions, null, 2)
	fs.writeFileSync(DOCS_PATHS_ALL_VERSIONS_FILE, docsPathsAllVersionsJson)

	// Apply MDX transforms, writing out transformed MDX files to `public`
	await buildMdxTransforms(CONTENT_DIR, CONTENT_DIR_OUT, versionMetadata)

	if (args.buildAlgoliaIndex) {
		await buildAlgoliaRecords(CONTENT_DIR_OUT, versionMetadata)
	} else {
		console.log(
			'\nSkipping Algolia records build. Use --build-algolia-index to enable.',
		)
	}

	// Copy all `*-nav-data.json` files from `content` to `public/content`, using execSync
	await copyNavDataFiles(CONTENT_DIR, CONTENT_DIR_OUT, versionMetadata)

	// Copy all `redirects.jsonc` files from `content` to `public/content
	await copyRedirectFiles(CONTENT_DIR, CONTENT_DIR_OUT)

	// Copy all asset files from `content` to `public/assets`
	await copyAllAssetFiles(CONTENT_DIR, CONTENT_DIR_OUT_ASSETS)
}

/**
 * Run the prebuild script.
 */
main()
