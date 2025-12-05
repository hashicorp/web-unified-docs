/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

import grayMatter from 'gray-matter'

import { createAlgoliaRecordObject } from './transform-mdx-to-algolia-record/create-records.mjs'
import { listFiles } from '#scriptUtils/list-files.mjs'
import { batchPromises } from '#scriptUtils/batch-promises.mjs'
import { getLatestProductVersionDirectories } from './convert-mdx-to-json/index.mjs'

/**
 * Retrieves all MDX files from the latest product version directories.
 *
 * @param {string} targetDir - The target directory to search for MDX files.
 * @param {Object} versionMetadata - Metadata containing version information.
 * @returns {Promise<string[]>} A promise that resolves to an array of MDX file paths.
 */
async function getAllMdxFiles(targetDir, versionMetadata) {
	// get latest product directories, returns array
	const latestProductVersionDirectories =
		await getLatestProductVersionDirectories(targetDir, versionMetadata)

	const latestFilesPromises = latestProductVersionDirectories.map((dir) => {
		return listFiles(dir)
	})

	return (await Promise.all(latestFilesPromises)).flat().filter((filePath) => {
		return (
			// only include mdx files that are not templates or partials
			path.extname(filePath) === '.mdx' &&
			!filePath.includes('_template') &&
			!filePath.includes('/partials/')
		)
	})
}

/**
 * Builds Algolia records from the latest product version directories.
 *
 * @param {string} targetDir - The target directory containing product versions.
 * @param {Object} versionMetadata - Metadata about the product versions.
 * @returns {Promise<void>} - A promise that resolves when the Algolia records have been built.
 *
 * @throws {Error} - Throws an error if there is an issue reading files or creating Algolia records.
 */
export async function buildAlgoliaRecords(targetDir, versionMetadata) {
	const mdxFiles = await getAllMdxFiles(targetDir, versionMetadata)

	console.log(
		`🪄 Converting ${mdxFiles.length} files to JSON for the Algolia search index...`,
	)
	const results = await batchPromises(
		'Algolia Records',
		mdxFiles,
		async (entry) => {
			try {
				const mdx = await readFile(entry)
				const { data, content } = grayMatter(mdx)
				return await createAlgoliaRecordObject(content, data, entry)
			} catch (err) {
				throw new Error(err)
			}
		},
		{ batchSize: 64 },
	)

	const ALGOLIA_RECORDS_JSON_PATH = path.join(
		process.cwd(),
		'scripts/algolia/batch-post-records/algoliaRecords.json',
	)
	const stringifiedResults = JSON.stringify(results, null, 2)
	try {
		writeFile(ALGOLIA_RECORDS_JSON_PATH, stringifiedResults)
		console.log(
			`✅ Converted ${mdxFiles.length} files to JSON for the Algolia search index.`,
		)
	} catch (error) {
		console.error(
			`❌ Failed to convert mdx files to JSON for the Algolia search index due to ${error}`,
		)
		throw new Error(error)
	}
}
