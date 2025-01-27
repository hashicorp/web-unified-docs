/**
 * Extracts the repository name from a given file path.
 *
 * @param {string} filePath - The file path from which to extract the repository name.
 * @returns {string|null} The repository name if found, otherwise null.
 */
export function getRepoNameFromFilePath(filePath) {
	if (!filePath.length || !filePath.includes('content/')) {
		return null
	}
	const repoDir = filePath.split('content/')[1].split('/')[0]
	return repoDir
}
