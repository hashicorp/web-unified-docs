/**
 * Copyright IBM Corp. 2024, 2026
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
import { copyAssetFiles } from '#scriptUtils/copy-asset-files.mjs'
import { getChangedContentFiles } from '#scriptUtils/get-changed-content-files.mjs'

const NUM_OF_MICROSEC_IN_NANOSEC = BigInt('1000')

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
const PREBUILD_TRACE_FILE = path.join(CWD, 'scripts', 'prebuild', 'trace')

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
 * Write trace data to file
 */
function writeTraceData(traceEvent) {
	const traceData = JSON.stringify([traceEvent])
	fs.writeFileSync(PREBUILD_TRACE_FILE, traceData)
}

/**
 * Define the prebuild script.
 */
async function main() {
	let skipTraceFile = false
	const startTime = process.hrtime.bigint()
	const traceId = Math.random().toString(16).slice(2, 18)
	const incBuild = process.env.INCREMENTAL_BUILD === 'true'

	const args = getCommandLineArgs()

	console.log(
		`Running prebuild script with args: ${JSON.stringify(args, null, 2)}\n`,
	)

	console.log(`Incremental build: ${incBuild ? 'true' : 'false'}\n`)

	let changedFiles = null
	if (incBuild) {
		changedFiles = await getChangedContentFiles()

		console.log(
			`Changed content files: ${JSON.stringify(changedFiles, null, 2)}\n`,
		)
	}

	// Gather and write out version metadata
	const versionMetadata = await gatherVersionMetadata(CONTENT_DIR)
	const versionMetadataJson = JSON.stringify(versionMetadata, null, 2)
	fs.writeFileSync(VERSION_METADATA_FILE, versionMetadataJson)

	if (args.onlyVersionMetadata) {
		console.log('Only generating version metadata, skipping other steps.')

		// Skip trace writing since we didn't actually do any work beyond generating version metadata
		skipTraceFile = true
		return
	}

	const docsPathsAllVersions = await gatherAllVersionsDocsPaths(
		versionMetadata,
		args.getRealFileChangedMetadata,
	)
	const docsPathsAllVersionsJson = JSON.stringify(docsPathsAllVersions, null, 2)
	fs.writeFileSync(DOCS_PATHS_ALL_VERSIONS_FILE, docsPathsAllVersionsJson)

	// Apply MDX transforms, writing out transformed MDX files to `public`
	await buildMdxTransforms(
		CONTENT_DIR,
		CONTENT_DIR_OUT,
		versionMetadata,
		incBuild ? changedFiles : null,
	)

	if (args.buildAlgoliaIndex) {
		// This only happens in non-deployment CI builds so skip the trace file
		skipTraceFile = true
		await buildAlgoliaRecords(CONTENT_DIR_OUT, versionMetadata)
	} else {
		console.log(
			'\nSkipping Algolia records build. Use --build-algolia-index to enable.',
		)
	}

	// Copy all `*-nav-data.json` files from `content` to `public/content`, using execSync
	await copyNavDataFiles(
		CONTENT_DIR,
		CONTENT_DIR_OUT,
		versionMetadata,
		incBuild ? changedFiles : null,
	)

	// Copy `redirects.jsonc` files from `content` to `public/content
	await copyRedirectFiles(
		CONTENT_DIR,
		CONTENT_DIR_OUT,
		incBuild ? changedFiles : null,
	)

	// Copy all asset files from `content` to `public/assets`
	await copyAssetFiles(
		CONTENT_DIR,
		CONTENT_DIR_OUT_ASSETS,
		incBuild ? changedFiles : null,
	)

	if (skipTraceFile) {
		return
	}

	// Write trace data
	// Follows the same format as next.js trace events; see https://github.com/vercel/next.js/blob/ababa1b3d967030ba2aa63a808ef3203f59e9b73/packages/next/src/trace/trace.ts
	const endTime = process.hrtime.bigint()
	const duration = (endTime - startTime) / NUM_OF_MICROSEC_IN_NANOSEC

	writeTraceData({
		name: 'prebuild',
		duration: Number(duration),
		timestamp: Number(startTime / NUM_OF_MICROSEC_IN_NANOSEC),
		id: 1,
		parentId: 0,
		tags: {},
		startTime: Date.now(),
		traceId,
	})
}

/**
 * Run the prebuild script.
 */
main()
