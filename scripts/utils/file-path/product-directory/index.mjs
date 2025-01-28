/**
 * Extracts the repository name from a given file path.
 *
 * @param {string} filePath - The file path from which to extract the repository/product directory name.
 * e.g. 'web-unified-docs/content/ptfe-releases` will return ptfe-releases.
 * This is different from the product slug found in the product config.
 * @returns {string|null} The repository name if found, otherwise null.
 */
export function getProductDirectoryFromFilePath(filePath) {
	if (!filePath.length || !filePath.includes('content/')) {
		return null
	}
	const repoDir = filePath.split('content/')[1].split('/')[0]
	return repoDir
}
