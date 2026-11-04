/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { isVersionPathSegment } from '#scriptUtils/version-regex.mjs'

/**
 * Extracts the version from a given file path.
 *
 * This function parses the file path to extract the version information
 * based on predefined regular expressions. It supports both general product
 * versions and Terraform Enterprise versions.
 *
 * @param {string} filePath - The file path from which to extract the version.
 * @returns {string} The extracted version from the file path.
 * @throws {Error} If the file path is empty.
 */
export function getVersionFromFilePath(filePath) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	}

	const version = filePath.split('content/')[1].split('/')[1]

	if (isVersionPathSegment(version)) {
		return version
	} else {
		/**
		 * returns null if the version is not in the expected format
		 * this is expected if the file path is for versionless docs
		 * e.g. terraform-docs-common
		 */

		return version === 'v0.0.x'
	}
}
