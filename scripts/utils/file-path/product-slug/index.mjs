/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'

/**
 * Extracts the repo name from the file path,
 * then finds its respective productSlug value from the product config
 *
 * @param {string} filePath - The file path to extract the repo name from.
 * @param {Object} productConfig - The product config object.
 * @returns {string} The product slug associated with the file path.
 * @throws {Error} If the product slug is not found for the given repository directory.
 */
export function getProductSlugFromFilePath(filePath, productConfig) {
	const repoDir = getProductDirectoryFromFilePath(filePath)
	const isValidProduct = productConfig[repoDir]

	if (!isValidProduct) {
		throw new Error(`Product not found for ${repoDir}`)
	} else {
		return productConfig[repoDir].productSlug
	}
}
