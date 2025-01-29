import path from 'path'
import grayMatter from 'gray-matter'
import { createAlgoliaRecordObject } from './transform-mdx-to-algolia-record/create-records.mjs'
import { listFiles } from '../utils/list-files.mjs'
import { batchPromises } from '../utils/batch-promises.mjs'
import { getLatestVersion } from '../utils/file-path/latest-version/index.mjs'
import { readdir, readFile, writeFile } from 'node:fs/promises'

async function getLatestProductVersionDirectories(dir, versionMetadata) {
	// Gather all sub-directories from the specified directory
	const directories = await readdir(dir, { withFileTypes: true })

	// Iterate over product directories and return the list of latest version directories
	const productDirectories = await Promise.all(
		directories.map(async (directory) => {
			const directoryPath = path.join(dir, directory.name)
			const latestProductVersion = getLatestVersion(
				directoryPath,
				versionMetadata,
			)
			// latestProductVersion will return null for versionless product
			if (latestProductVersion == null) {
				return directoryPath
			} else {
				return path.join(directoryPath, latestProductVersion)
			}
		}),
	)
	return productDirectories
}

export async function buildAlgoliaRecords(targetDir, versionMetadata) {
	// get latest product directories, returns array
	const latestProductVersionDirectories =
		await getLatestProductVersionDirectories(targetDir, versionMetadata)

	const allFilesPromises = latestProductVersionDirectories.map((dir) => {
		return listFiles(dir)
	})

	const mdxFiles = (await Promise.all(allFilesPromises))
		.flat()
		.filter((filePath) => {
			return (
				path.extname(filePath) === '.mdx' && !filePath.includes('_template')
			)
		})

	// Filter for .mdx files
	// const mdxFiles = allFiles.filter(
	// 	(filePath) => path.extname(filePath) === '.mdx',
	// )

	console.log(
		`🪄 Converting ${mdxFiles.length} files to JSON for the Algolia search index...`,
	)
	const batchSize = 32

	const results = await batchPromises(
		mdxFiles,
		async (entry) => {
			try {
				const fileString = await readFile(entry).then((mdx) => {
					return mdx
				})
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
		// fs.writeFileSync(ALGOLIA_RECORDS_JSON_PATH, stringifiedResults)
		writeFile(ALGOLIA_RECORDS_JSON_PATH, stringifiedResults)
	} catch (error) {
		throw new Error(error)
	}
	// Log out that the script has complete
	console.log(
		`✅ Converted ${mdxFiles.length} files to JSON for the Algolia search index.`,
	)
}
