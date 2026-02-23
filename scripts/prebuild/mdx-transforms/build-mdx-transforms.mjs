/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import path from 'node:path'

import { listFiles } from '#scriptUtils/list-files.mjs'
import { batchPromises } from '#scriptUtils/batch-promises.mjs'

import {
	applyMdxTransforms,
	resolveVersionParts,
} from './apply-mdx-transforms.mjs'

/**
 * Given a target directory,
 * Apply MDX transforms to all `.mdx` files found in the directory and its
 * subdirectories. Each `.mdx` file will be modified in place.
 *
 * Note: we expect the following directory structure:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/<...file>.mdx`
 * And we expect the `partials` directory to be located at:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/partials`
 *
 * @param {string} targetDir
 * @param {string} outputDir the directory to write transformed files to
 */
export async function buildMdxTransforms(
	targetDir,
	outputDir,
	versionMetadata,
) {
	// Walk the directory to get a list of all files
	const allFiles = await listFiles(targetDir)
	// Filter for `.mdx` files
	const mdxFiles = allFiles.filter((filePath) => {
		return path.extname(filePath) === '.mdx'
	})
	/**
	 * Map over each `.mdx` file, and prepare the file for transformation
	 */
	const mdxFileEntries = mdxFiles.map((filePath) => {
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
		const redirectsDir = path.join(targetDir, repoSlug, verifiedVersion)
		const outPath = path.join(outputDir, relativePath)
		return { repoSlug, filePath, partialsDir, outPath, version, redirectsDir }
	})

	console.log(`Running MDX transforms on ${mdxFileEntries.length} files...`)
	const results = await batchPromises(
		'MDX transforms',
		mdxFileEntries,
		(entry) => {
			return applyMdxTransforms(entry, versionMetadata)
		},
	)
	// Log out any errors encountered
	const errors = results
		.filter((result) => {
			return result.error !== null
		})
		.map(({ error, file }) => {
			return { error, file }
		})
	if (errors.length > 0) {
		console.error(`\n❗ Encountered ${errors.length} errors:`)
		errors.forEach(({ error, file }) => {
			console.error(`❌ ${error} in file: ${file}`)
		})
		console.error('\n❗ Build failed due to errors in MDX transforms.')
		process.exit(1)
	}
	// Log out that the script has complete
	console.log(`✅ Applied MDX transforms to ${mdxFileEntries.length} files.`)
}
