/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { PRODUCT_CONFIG } from '../app/utils/productConfig.mjs'
import { exec } from 'child_process'
import { promisify } from 'util'

import { batchPromises } from './utils/batch-promises.mjs'

const execAsync = promisify(exec)

export async function gatherAllVersionsDocsPaths(versionMetadata) {
	const allDocsPaths = {}
	const allProducts = Object.keys(PRODUCT_CONFIG)

	// Iterate over each product directory, adding to `allDocsPaths`
	console.log(
		`🪄 Gathering file information for ${allProducts.length} products...`,
	)
	for (const product of allProducts) {
		// Initialize the product array
		allDocsPaths[product] = {}

		// Get the latest product version for the path
		if (!versionMetadata[product]) {
			throw new Error(`No version metadata found for product: ${product}`)
		}
		const allVersions = versionMetadata[product]

		console.log(`Gathering file information for ${product}...`)

		for (const version of allVersions) {
			allDocsPaths[product][version?.version ?? ''] = []
			const contentPath = path.join(
				'./content',
				product,
				PRODUCT_CONFIG[product].versionedDocs ? (version?.version ?? '') : '',
				PRODUCT_CONFIG[product].contentDir,
			)

			// Get all paths for the product
			const allPaths = await getProductPaths(
				contentPath,
				PRODUCT_CONFIG[product].productSlug,
			)

			allDocsPaths[product][version?.version ?? ''].push(...allPaths)
		}
	}

	console.log(
		`✅ Gathered file information for ${allProducts.length} products\n`,
	)
	// Return the paths
	return allDocsPaths
}

const extractIdFromFrontmatter = (content) => {
	const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/m);
	if (!frontmatterMatch) {
		return '';
	}

	const frontmatter = frontmatterMatch[1];
	const idMatch = frontmatter.match(/^uuidV4:\s*(.+)$/m);
	return idMatch ? idMatch[1].trim() : '';
};

export async function getProductPaths(directory, productSlug) {
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
				const itemName = item.split('.')[0]

				const content = fs.readFileSync(itemPath, 'utf8')
				const id = extractIdFromFrontmatter(content)

				if (itemName === 'index') {
					apiPaths.push({
						path: path.join(productSlug, relativePath),
						itemPath,
						id,
					})
					return
				}

				apiPaths.push({
					path: path.join(productSlug, relativePath, itemName),
					itemPath,
					id,
				})
			}
		})
	}

	traverseDirectory(directory)

	await batchPromises(
		`Creating change history for files in ${directory}`,
		apiPaths,
		async (apiPath) => {
			// TODO: We only care about a real value if it's a prod build
			const created_at = "2025-05-29T11:04:37-04:00"
			apiPath.created_at = created_at

			// await execAsync(
			// 	`git log --format=%cI --max-count=1 ${apiPath.itemPath}`,
			// )

			// remove the "\n" from the end of the output
			// apiPath.created_at = created_at.stdout.slice(0, -1)
		},
		{ loggingEnabled: false },
	)

	return apiPaths
}
