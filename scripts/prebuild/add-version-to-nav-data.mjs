/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs/promises'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Rewrites a versioned product's parsed navigation data in place without I/O.
 *
 * @template T
 * @param {T} navData
 * @param {string} product
 * @param {string} version
 * @param {import('../../app/types').VersionMetadataMap} versionMetadata
 * @returns {T}
 */
export function addVersionToNavDataPaths(
	navData,
	product,
	version,
	versionMetadata,
) {
	const productVersions = versionMetadata[product]
	if (!productVersions) {
		throw new Error(`No version metadata found for product: ${product}`)
	}

	const latestVersion = productVersions.find((version) => {
		return version.isLatest
	})?.version
	if (!latestVersion) {
		throw new Error(`No latest version found for product: ${product}`)
	}

	const cleanVersion = version.replace(/\s*\([^)]+\)/, '')
	if (cleanVersion === latestVersion) {
		return navData
	}

	const basePaths = PRODUCT_CONFIG[product].basePaths
	const basePathPrefixes = basePaths?.map((basePath) => {
		return `/${basePath}`
	})

	const updatePaths = (obj) => {
		for (const key in obj) {
			if (typeof obj[key] === 'object') {
				updatePaths(obj[key])
			} else if (
				(key === 'href' || key === 'path') &&
				typeof obj[key] === 'string' &&
				!obj[key].startsWith('http') &&
				!obj[key].includes(cleanVersion)
			) {
				// href allows linking outside of content subpath
				const basePath = basePathPrefixes?.find((basePath) => {
					return obj[key].startsWith(basePath)
				})

				// if the href starts with a basepath, e.g. "/cli", add version after the basepath
				if (basePath && basePath.length) {
					obj[key] =
						`${basePath}/${cleanVersion}${obj[key].substring(basePath.length)}`
				} else if (key === 'path') {
					obj[key] = `${cleanVersion}/${obj[key]}`
				}
			}
		}
	}

	updatePaths(navData)
	return navData
}

/**
 * Adds version information to navigation data in a JSON file.
 *
 * This function reads a JSON file containing navigation data, updates the paths or hrefs
 * with the version information extracted from the file path, and writes the updated data
 * back to the file. It uses the provided version metadata to determine the latest version.
 *
 * @param {string} filePath - The path to the JSON file containing navigation data.
 * @param {Object} versionMetadata - An object containing version metadata for different products.
 * @type VersionMetadata = Record<string, { version: string, releaseStage: "stable", isLatest: boolean }[]>
 * @throws {Error} Throws an error if the file path is not provided.
 * @returns {Promise<void>} A promise that resolves when the file has been successfully updated.
 */
export async function addVersionToNavData(filePath, versionMetadata) {
	if (!filePath) {
		throw new Error(
			`Please provide a file path as an argument. For example, to add version to a nav data file, you can run "node add-version-to-nav-data.mjs /path/to/nav-data.json".`,
		)
	}

	try {
		const relativePath = filePath.split('content/')[1]
		/**
		 * product and version variables, which are assigned based on the
		 * specific indices those strings are expected to be in the filepath
		 */
		const [product, version] = relativePath.split('/')

		// We are looking at a versionless doc
		if (PRODUCT_CONFIG[product].versionedDocs === false) {
			return
		}

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

		addVersionToNavDataPaths(jsonData, product, version, versionMetadata)

		// Write the updated JSON back to the file
		await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
	} catch (parseError) {
		console.error(`Error parsing JSON in file ${filePath}:`, parseError)
	}
}
