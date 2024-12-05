import { Result } from '@utils/result'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Searches for navigation data files within a specified product directory and its subdirectories.
 * It looks for directories matching the pattern `<version>/data` and files named `nav-data.json`.
 * If the content of `nav-data.json` includes the specified `fullPath`, the version is added to the result.
 *
 * @param product - The name of the product whose directories are to be searched.
 * @param fullPath - The path to be searched for within the `nav-data.json` files.
 * @param baseDir - The base directory to start the search from. Defaults to process.cwd().
 * @returns A promise that resolves to an array of version strings where the `fullPath` was found.
 *
 * @throws Will throw an error if there is an issue reading directories or files
 */
export async function searchNavDataFiles(
	product: string,
	fullPath: string,
	baseDir: string = process.cwd(),
): Promise<string[]> {
	const versions: string[] = []
	const productDir = path.join(baseDir, 'content', product)

	async function searchDirectory(
		directory: string,
	): Promise<Result<string[], Error>> {
		let files
		try {
			files = await fs.promises.readdir(directory, { withFileTypes: true })
		} catch (err) {
			if (err.code === 'ENOENT') {
				console.error(`Directory not found: ${directory}`)
				return
			}
			throw err
		}

		for (const file of files) {
			const fullPathToFile = path.join(directory, file.name)

			if (file.isDirectory()) {
				// Only search in directories that match the pattern <version>/data
				const versionDataPattern = new RegExp(
					`^v\\d+\\.\\d+\\.x$|v[0-9]{6}-\\d+`,
					'i',
				)
				if (versionDataPattern.test(file.name)) {
					const dataDir = path.join(directory, file.name, 'data')

					await searchDirectory(dataDir)
				}
			} else if (file.isFile() && file.name.endsWith('nav-data.json')) {
				try {
					const data = await fs.promises.readFile(fullPathToFile, 'utf-8')
					const jsonData = JSON.stringify(data)
					if (jsonData.includes(fullPath)) {
						const versionMatch = fullPathToFile.match(
							/\/content\/[^/]+\/([^/]+)\/data\//,
						)
						if (versionMatch) {
							versions.push(versionMatch[1])
						}
					}
				} catch {
					console.error(`An error occurred while searching for the file ${fullPathToFile}`)
				}
			}
		}
	}

	await searchDirectory(productDir)
	return versions
}
