/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import docsPathsAllVersions from '#api/docsPathsAllVersions.json'

/**
 * Finds the versions in which a document exists for a certain product. It uses the
 * `docsPathsAllVersions` json data to search for the versions. If the json content
 * includes the specified `fullPath`, the version is added to the result.
 *
 * @param product - The name of the product whose directories are to be searched.
 * @param fullPath - The path to be searched for within the `docsPathsAllVersions.json` file.
 * @param docsPathsData - The json data that is used to search for the versions. Defaults to `docsPathsAllVersions.json`.
 * @returns An array of version strings where the `fullPath` was found.
 */
export function findDocVersions(
	product: string,
	fullPath: string,
	docsPathsData: typeof docsPathsAllVersions = docsPathsAllVersions,
): string[] {
	const versions: string[] = []
	const docsPathsForProduct = docsPathsData[product]

	if (!docsPathsForProduct) {
		console.error(`Product, ${product}, not found in docs paths`)
		return []
	}

	const docsVersions = Object.keys(docsPathsForProduct)
	docsVersions.forEach((version: string) => {
		const versionPaths = docsPathsForProduct[version]
		versionPaths.forEach(
			(versionInfo: { path: string; itemPath: string; created_at: string }) => {
				if (
					versionInfo.path.endsWith(fullPath) &&
					!versions.includes(version)
				) {
					versions.push(version)
				}
			},
		)
	})

	return versions
}
