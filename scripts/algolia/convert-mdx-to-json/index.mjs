/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import path from 'node:path'
import { readdir } from 'node:fs/promises'

import { getLatestVersion } from '#scriptUtils/file-path/latest-version/index.mjs'

/**
 * Retrieves the latest version directories for products within a specified directory.
 *
 * @param {string} dir - The path to the directory containing product directories.
 * @param {Object} versionMetadata - Metadata containing version information for the products.
 * @type VersionMetadata = Record<string, { version: string, releaseStage: "stable", isLatest: boolean }[]>
 * @returns {Promise<string[]> | []} A promise that resolves to an array of paths to the latest version directories for each product, or an empty array if there are no product directories.
 */
export async function getLatestProductVersionDirectories(dir, versionMetadata) {
	// Gather all sub-directories from the specified directory
	const directories = await readdir(dir, { withFileTypes: true })

	if (!Array.isArray(directories)) {
		return []
	}

	// Iterate over product directories and return the list of latest version directories
	const productDirectories = await Promise.all(
		directories.map(async (directory) => {
			const directoryPath = path.join(dir, directory.name)
			const latestProductVersion = getLatestVersion(
				directoryPath,
				versionMetadata,
			)

			// getLatestVersion will return null for versionless products
			// if directory is for versionless docs, return null
			if (latestProductVersion == 'v0.0.x') {
				return directoryPath
			}

			// Non-stable versions (e.g. beta, rc) are written to disk in a directory
			// suffixed with the release stage, e.g. `v0.1.x (beta)`, so we need to
			// reconstruct that same directory name here to avoid an ENOENT.
			const latestVersionMetadata = versionMetadata[directory.name]?.find(
				(version) => {
					return version.isLatest
				},
			)
			const latestVersionDirName =
				latestVersionMetadata && latestVersionMetadata.releaseStage !== 'stable'
					? `${latestProductVersion} (${latestVersionMetadata.releaseStage})`
					: latestProductVersion

			return path.join(directoryPath, latestVersionDirName)
		}),
	)
	return productDirectories
}
