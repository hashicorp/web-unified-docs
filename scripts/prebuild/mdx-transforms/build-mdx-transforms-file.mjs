/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import {
	applyMdxTransforms,
	resolveVersionParts,
} from './apply-mdx-transforms.mjs'

export { applyMdxTransforms as applyFileMdxTransforms } from './apply-mdx-transforms.mjs'

const CWD = process.cwd()
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')

/**
 * Given a file path,
 * Apply MDX transforms to the file and copy the transformed file to the
 * corresponding path in the `public/content` directory.
 *
 * @param {string} filePath
 */
export async function buildFileMdxTransforms(filePath) {
	const targetDir = 'content'
	const outputDir = 'public/content'

	const relativePath = path.relative(targetDir, filePath)
	const [repoSlug, version, contentDir] = relativePath.split('/')
	const { verifiedVersion, verifiedContentDir } = resolveVersionParts(
		repoSlug,
		version,
		contentDir,
	)
	const partialsDir = path.join(
		targetDir,
		repoSlug,
		verifiedVersion,
		verifiedContentDir,
		'partials',
	)
	const redirectsDir = path.join(
		'/server/',
		targetDir,
		repoSlug,
		verifiedVersion,
	)
	const outPath = path.join(outputDir, relativePath)

	const entry = {
		filePath,
		partialsDir,
		outPath,
		version,
		redirectsDir,
	}
	const versionMetadata = await fs.promises.readFile(
		VERSION_METADATA_FILE,
		'utf-8',
	)
	const serializedVersionMetadata = JSON.parse(versionMetadata)
	console.log(`🪄 Running MDX transform on ${filePath}...`)
	const result = await applyMdxTransforms(entry, serializedVersionMetadata)
	if (result.error) {
		console.error(`❗ Encountered an error: ${result.error}`)
	} else {
		console.log(`✅ Applied MDX transform to ${filePath}`)
	}
}
