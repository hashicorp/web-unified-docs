import { errorResultToString, Ok, Err } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import fs from 'fs'
import path from 'path'

export function getProductPaths(directory: string, productSlug: string) {
	const apiPaths = []

	function traverseDirectory(currentPath: string, relativePath: string = '') {
		const items = fs.readdirSync(currentPath)

		items.forEach((item: string) => {
			const itemPath = path.join(currentPath, item)
			const itemRelativePath = path.join(relativePath, item)
			const stat = fs.statSync(itemPath)

			if (stat.isDirectory()) {
				traverseDirectory(itemPath, itemRelativePath)
			} else {
				const itemName = item.split('.')[0]

				if (itemName === 'index') {
					apiPaths.push({
						path: path.join(productSlug, relativePath),
						created_at: stat.mtime,
					})
					return
				}

				apiPaths.push({
					path: path.join(productSlug, relativePath, itemName),
					created_at: stat.mtime,
				})
			}
		})
	}

	traverseDirectory(directory)

	return apiPaths
}

export const getAllDocsPaths = async () => {
	const allDocsData = Object.keys(PRODUCT_CONFIG)
		.map((productSlug: string) => {
			const latestProductVersion = getProductVersion(productSlug, 'latest')
			if (!latestProductVersion.ok) {
				console.error(errorResultToString('API', latestProductVersion))
				return Err('Product version not found')
			}

			const contentPath = path.join(
				'./content',
				productSlug,
				latestProductVersion.value,
				PRODUCT_CONFIG[productSlug].contentDir,
			)
			console.log('### Info', PRODUCT_CONFIG[productSlug].productSlug)
			const allPaths = getProductPaths(
				contentPath,
				PRODUCT_CONFIG[productSlug].productSlug,
			)

			return allPaths
		})
		.flat()

	if (allDocsData !== undefined && allDocsData.length > 0) {
		return Ok(allDocsData)
	}
	return Err('All docs paths not found')
}
