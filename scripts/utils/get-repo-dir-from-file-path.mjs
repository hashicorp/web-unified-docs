import { PRODUCT_CONFIG } from '../../app/utils/productConfig.mjs'

/**
 * Extracts the repository name from a given file path.
 *
 * @param {string} filePath - The file path from which to extract the repository name.
 * @returns {string|null} The repository name if found, otherwise null.
 */
export function getRepoNameFromFilePath(filePath) {
	if (!filePath.length) {
		return null
	}
	const repoDir = filePath.split('content/')[1].split('/')[0]
	return repoDir
}

/**
 * Extracts the repo name from the file path,
 * then finds its respective product slug from the product config
 *
 * @param {string} filePath - The file path to extract the repo name from.
 * @returns {string} The product slug associated with the file path.
 * @throws {Error} If the product slug is not found for the given repository directory.
 */
export function getProductSlugFromFilePath(filePath) {
	const repoDir = getRepoNameFromFilePath(filePath)
	const isValidProduct = Object.entries(PRODUCT_CONFIG[repoDir]).length

	if (!isValidProduct) {
		throw new Error(`Product not found for ${repoDir}`)
	} else {
		return PRODUCT_CONFIG[repoDir].productSlug
	}
}
