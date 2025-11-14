/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
/**
 * Extracts the repo name from the file path,
 * then finds its respective url value from the docs paths
 *
 * @param {string} filePath - The file path to extract the repo name from.
 * @param {Object} allDocsPaths - The all docs paths object.
 * @param {Object} productConfig - The product config object.
 * @returns {string} The url associated with the file path.
 * @throws {Error} If the product slug is not found for the given repository directory.
 */
export function getUrlFromFilePath(
	filePath,
	allDocsPaths,
	productConfig = PRODUCT_CONFIG,
) {
	const repoDir = getProductDirectoryFromFilePath(filePath)
	const isValidProduct = productConfig[repoDir]

	if (!isValidProduct) {
		throw new Error(`Product not found for ${repoDir}`)
	}

	// Check for versionless products and use v0.0.x as the version key
	let version
	if (productConfig[repoDir].versionedDocs === false) {
		version = 'v0.0.x'
	} else {
		version = getVersionFromFilePath(filePath)
	}

	// Check if the version exists in allDocsPaths
	if (!allDocsPaths[repoDir]) {
		throw new Error(`No docs paths found for product: ${repoDir}`)
	}

	if (!allDocsPaths[repoDir][version]) {
		throw new Error(
			`Version ${version} not found for product ${repoDir}. File path: ${filePath}`,
		)
	}

	// Find the matching path
	const matchedPath = allDocsPaths[repoDir][version].find((path) => {
		return filePath.endsWith(path.itemPath)
	})

	if (!matchedPath) {
		throw new Error(
			`No matching path found for file: ${filePath} in version ${version} of ${repoDir}`,
		)
	}

	return matchedPath.path
}
