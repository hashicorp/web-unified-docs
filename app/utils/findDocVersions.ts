/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Finds the versions in which a document exists for a certain product. It uses the
 * `docsPathsAllVersions` json data to search for the versions. If the json content
 * includes the specified `fullPath`, the version is added to the result.
 *
 * @param product - The name of the product whose directories are to be searched.
 * @param fullPath - The path to be searched for within the `docsPathsAllVersions.json` file.
 * @param docsPathsData - The generated json data that is used to search for the versions.
 * @returns An array of version strings where the `fullPath` was found.
 */
export function findDocVersions(
	product: string,
	fullPath: string,
	docsPathsData: Record<string, Record<string, { path: string }[]>>,
): string[] {
	const versions: string[] = []
	const docsPathsForProduct = docsPathsData[product]

	if (!docsPathsForProduct) {
		console.error(`Product, ${product}, not found in docs paths`)
		return []
	}

	for (const [version, versionPaths] of Object.entries(docsPathsForProduct)) {
		if (
			versionPaths.some((versionInfo: { path: string }) => {
				return versionInfo.path.endsWith(fullPath)
			})
		) {
			versions.push(version)
		}
	}

	return versions
}
