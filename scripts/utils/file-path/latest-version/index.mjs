/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Checks if the given file path corresponds to the latest version of the document.
 *
 * @param {string} filePath - The file path to check, e.g. content/terraform-plugin-testing/v1.6.x/docs/plugin/testing/index.mdx
 * @param {Object} versionMetadata - The metadata containing version information for different product directories
 * @type VersionMetadata = Record<string, { version: string, releaseStage: "stable", isLatest: boolean }[]>
 * @throws {Error} If the file path is empty or version metadata is not provided.
 * @returns {boolean} True if the file path corresponds to the latest version, false otherwise.
 */
export function isLatestVersion(filePath, versionMetadata) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	} else if (!versionMetadata) {
		throw new Error('Version metadata is empty')
	}

	// get repo name from the file path
	const productDir = getProductDirectoryFromFilePath(filePath)

	// use productDir to get version metadata
	const productVersions = versionMetadata[productDir]

	// if repo dir exists, and is an empty array (aka versionless docs)
	if (PRODUCT_CONFIG[productDir].versionedDocs === false) {
		return true
	}
	// check that the file path version exists in the version metadata and is the latest version
	const filePathVersion = getVersionFromFilePath(filePath)
	const isLatestVersion = productVersions.find((version) => {
		return version.version === filePathVersion && version.isLatest
	})
	return !!isLatestVersion
}

/**
 * Retrieves the latest version for the product extracted from the file path using the version metadata.
 *
 * @param {string} filePath - The file path from which to extract the product directory.
 * @param {Object} versionMetadata - An object containing version information for various repositories.
 * @type VersionMetadata = Record<string, { version: string, releaseStage: "stable", isLatest: boolean }[]>
 * @throws {Error} Throws an error if the file path is empty or if the version metadata is not provided.
 * @returns {string|null} The latest version of the product if found, otherwise null.
 */
export function getLatestVersion(filePath, versionMetadata) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	} else if (!versionMetadata) {
		throw new Error('Version metadata is empty')
	}

	// get product directory from the file path
	const productDir = getProductDirectoryFromFilePath(filePath)

	// check if product matches any version metadata
	const productMetadata = versionMetadata[productDir]

	if (!productMetadata) {
		throw new Error(
			`Product directory ${productDir} does not match any products in version metadata`,
		)
	}

	const hasVersions = productMetadata.some((version) => {
		return version.version
	})

	if (hasVersions) {
		return versionMetadata[productDir].find((version) => {
			return version.isLatest
		}).version
	} else {
		// return null for versionless docs
		return null
	}
}
