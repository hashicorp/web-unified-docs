import docsPathsAllVersions from '@api/docsPathsAllVersions.json'

/**
 * Searches for navigation data files within a specified product directory and its subdirectories.
 * It looks for directories matching the pattern `<version>/data` and files named `nav-data.json`.
 * If the content of `nav-data.json` includes the specified `fullPath`, the version is added to the result.
 *
 * @param product - The name of the product whose directories are to be searched.
 * @param fullPath - The path to be searched for within the `nav-data.json` files.
 * @param baseDir - The base directory to start the search from. Defaults to process.cwd().
 * @returns A promise that resolves to an array of version strings where the `fullPath` was found.
 *
 * @throws Will throw an error if there is an issue reading directories or files
 */
export function searchNavDataFiles(
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
		const jsonData = JSON.stringify(versionPaths)
		if (jsonData.includes(fullPath)) {
			versions.push(version)
		}
	})

	return versions
}
