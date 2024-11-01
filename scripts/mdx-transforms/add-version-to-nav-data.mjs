import fs from 'node:fs/promises'
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const versionMetadataFile = path.join(
	process.cwd(),
	'app/api/versionMetadata.json',
)
const versionMetadata = require(versionMetadataFile)

const terraformBasePaths = [
	'/cdktf',
	'/cli',
	'/cloud-docs/agents',
	'/cloud-docs',
	'/docs',
	'/enterprise',
	'/internals',
	'/intro',
	'/language',
	'/plugin',
	'/plugin/framework',
	'/plugin/log',
	'/plugin/mux',
	'/plugin/sdkv2',
	'/plugin/testing',
	'/registry',
]

/**
 * Adds a version to the navigation data in a JSON file.
 *
 * This function reads a JSON file, updates the `href` or `path` properties
 * to include the version if necessary, and writes the updated JSON back to the file.
 *
 * @param {string} filePath - The path to the JSON file containing the navigation data.
 * @throws {Error} If the file path is not provided.
 * @returns {Promise<void>} A promise that resolves when the file has been updated.
 */
export async function addVersionToNavData(filePath) {
	if (!filePath) {
		throw new Error(
			`Please provide a file path as an argument. For example, to add version to a nav data file, you can run "node add-version-to-nav-data.mjs /path/to/nav-data.json".`,
		)
	}

	try {
		const data = await fs.readFile(filePath, 'utf-8')
		if (data === '') {
			console.error(`File is empty: ${filePath}`)
			return
		}

		const jsonData = JSON.parse(data)
		const versionMatch = filePath.match(/\/content\/[^/]+\/([^/]+)\/data\//)

		if (!versionMatch) {
			console.error(`No version found in file path: ${filePath}`)
			return
		}

		const version = versionMatch[1]
		let product = filePath.split('/content/')[1]
		product = product.split('/')[0]

		// Use app/api/versionMetadata.json to get the latest version
		const latestVersion = versionMetadata[product].find((version) => {
			return version.isLatest
		}).version

		// Update href or path properties
		const updatePaths = (obj) => {
			for (const key in obj) {
				if (typeof obj[key] === 'object') {
					updatePaths(obj[key])
				} else if (
					(key === 'href' || key === 'path') &&
					typeof obj[key] === 'string' &&
					!obj[key].startsWith('http') &&
					version !== latestVersion &&
					!obj[key].includes(version)
				) {
					// href allows linking outside of content subpath
					const basePath = terraformBasePaths.find((basePath) => {
						return obj[key].startsWith(basePath)
					})

					// if the href starts with a basepath, e.g. "/cli", add version after the basepath
					if (basePath && basePath.length) {
						obj[key] =
							`${basePath}/${version}${obj[key].substring(basePath.length)}`
					} else {
						obj[key] = `${version}/${obj[key]}`
					}
				}
			}
		}

		updatePaths(jsonData)

		// Write the updated JSON back to the file
		await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
	} catch (parseError) {
		console.error(`Error parsing JSON in file ${filePath}:`, parseError)
	}
}
