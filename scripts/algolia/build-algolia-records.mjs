import fs from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'
import { createAlgoliaRecordObject } from './transform-mdx-to-algolia-record/create-records.mjs'
import { listFiles } from '../utils/list-files.mjs'
import { batchPromises } from '../utils/batch-promises.mjs'
import { isLatestVersion } from '../utils/file-path/latest-version/index.mjs'
import { readdir } from 'node:fs/promises'
// import { isLatestVersion } from './file-path/latest-version/index.mjs'

async function listLatestDirectories(dir, versionMetadata) {
	// Gather all directories from public/content
	const directories = await readdir(dir, { withFileTypes: true })

	// Iterate over productDir, and return the list of latest version directories
	const productDirectories = await Promise.all(
		directories.map(async (directory) => {
			const filePath = path.join(dir, directory.name).toString()
			const resolvedDirs = await readdir(filePath, { withFileTypes: true })
			return resolvedDirs.map((dirEnt) => {
				return path.join(filePath, dirEnt.name)
			})
		}),
	)

	const latestDirectories = productDirectories.flat().filter((dirPath) => {
		return isLatestVersion(dirPath, versionMetadata)
	})

	return latestDirectories
}

export async function buildAlgoliaRecords(targetDir, versionMetadata) {
	console.time()
	// get latest product directories
	const latestDirectories = await listLatestDirectories(
		targetDir,
		versionMetadata,
	)
	console.log({ latestDirectories })
	// Walk the directory to get a list of all files
	const allFiles = await listFiles(latestDirectories)

	// Filter for `.mdx` files and check file is in latest version dir
	const mdxFiles = allFiles.filter((filePath) => {
		return (
			// Exclude internal HashiCorp ed edng docs named _template
			!filePath.includes('_template') &&
			path.extname(filePath) === '.mdx' &&
			isLatestVersion(filePath, versionMetadata)
		)
	})
	console.timeEnd()
	console.log(
		`🪄 Converting ${mdxFiles.length} files to JSON for the Algolia search index...`,
	)
	const batchSize = 16

	const results = await batchPromises(
		mdxFiles,
		async (entry) => {
			try {
				const fileString = fs.readFileSync(entry)
				// get mdx content and frontmatter
				const { data, content } = grayMatter(fileString)
				return createAlgoliaRecordObject(content, data, entry)
			} catch (err) {
				throw new Error(err)
			}
		},
		batchSize,
	)

	const ALGOLIA_RECORDS_JSON_PATH = path.join(
		process.cwd(),
		'algoliaRecords.json',
	)

	const stringifiedResults = JSON.stringify(results, null, 2)
	try {
		fs.writeFileSync(ALGOLIA_RECORDS_JSON_PATH, stringifiedResults)
	} catch (error) {
		throw new Error(error)
	}
	// Log out that the script has complete
	console.log(
		`✅ Converted ${mdxFiles.length} files to JSON for the Algolia search index.`,
	)
}
