import fs from 'fs'
import path from 'path'
import { PRODUCT_CONFIG } from '../app/utils/productConfig.mjs'
import { execSync } from 'child_process'

export async function gatherAllVersionsDocsPaths(versionMetadata) {
	const allDocsPaths = {}
	const allProducts = Object.keys(PRODUCT_CONFIG)

	// Iterate over each product directory, adding to `allDocsPaths`
	for (const product of allProducts) {
		// Initialize the product array
		allDocsPaths[product] = {}

		// Get the latest product version for the path
		if (!versionMetadata[product]) {
			throw new Error(`No version metadata found for product: ${product}`)
		}
		const allVersions = versionMetadata[product]

		for (const version of allVersions) {
			allDocsPaths[product][version?.version ?? ''] = []
			const contentPath = path.join(
				'./content',
				product,
				version?.version ?? '',
				PRODUCT_CONFIG[product].contentDir,
			)

			// Get all paths for the product
			const allPaths = getProductPaths(
				contentPath,
				PRODUCT_CONFIG[product].productSlug,
			)

			allDocsPaths[product][version?.version ?? ''].push(...allPaths)
		}
	}
	// Return the paths
	return allDocsPaths
}

export function getProductPaths(directory, productSlug) {
	const apiPaths = []

	function traverseDirectory(currentPath, relativePath = '') {
		const items = fs.readdirSync(currentPath)

		items.forEach((item) => {
			const itemPath = path.join(currentPath, item)
			const itemRelativePath = path.join(relativePath, item)
			const stat = fs.statSync(itemPath)

			if (stat.isDirectory()) {
				traverseDirectory(itemPath, itemRelativePath)
			} else {
				const created_at = execSync(
					`git log --format=%aI -1 --reverse ${itemPath}`,
				).toString()
				const last_modified = execSync(
					`git log --format=%aI -1 ${itemPath}`,
				).toString()
				const itemName = item.split('.')[0]

				if (itemName === 'index') {
					apiPaths.push({
						path: path.join(productSlug, relativePath),
						created_at,
						last_modified,
					})
					return
				}

				apiPaths.push({
					path: path.join(productSlug, relativePath, itemName),
					created_at: created_at,
					last_modified: last_modified,
				})
			}
		})
	}

	traverseDirectory(directory)

	return apiPaths
}
