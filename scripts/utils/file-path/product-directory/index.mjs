/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Extracts the repository name from a given file path.
 *
 * @param {string} filePath - The file path from which to extract the repository/product directory name.
 * e.g. 'content/terraform-enterprise` will return terraform-enterprise.
 * This is different from the product slug found in the product config.
 * @returns {string|null} The repository name if found, otherwise null.
 */
export function getProductDirectoryFromFilePath(filePath) {
	if (!filePath.length || !filePath.includes('content/')) {
		return null
	}

	return filePath.split('content/')[1].split('/')[0]
}
