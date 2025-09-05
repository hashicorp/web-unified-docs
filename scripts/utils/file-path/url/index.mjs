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
	const version = getVersionFromFilePath(filePath)
	const isValidProduct = productConfig[repoDir]

	if (!isValidProduct) {
		throw new Error(`Product not found for ${repoDir}`)
	} else {
		return allDocsPaths[repoDir][version].find((path) => {
			return filePath.endsWith(path.itemPath)
		}).path
	}
}
