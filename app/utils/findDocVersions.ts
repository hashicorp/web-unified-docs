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

	const docsVersions = Object.keys(docsPathsForProduct)
	docsVersions.forEach((version: string) => {
		const versionPaths = docsPathsForProduct[version]
		versionPaths.forEach((versionInfo: { path: string }) => {
			if (versionInfo.path.endsWith(fullPath) && !versions.includes(version)) {
				versions.push(version)
			}
		})
	})

	return versions
}
