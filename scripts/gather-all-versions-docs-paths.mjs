/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { PRODUCT_CONFIG } from '../app/utils/productConfig.mjs'
import grayMatter from 'gray-matter'
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
				const [itemName] = item.split('.')
				const fileContents = fs.readFileSync(itemPath)
				const { data } = grayMatter(fileContents)
				let apiPath = {
					path:
						itemName === 'index'
							? path.join(productSlug, relativePath)
							: path.join(productSlug, relativePath, itemName),
					itemPath,
				}
				if (data.id) {
					apiPath.id = data.id
				}
				apiPaths.push(apiPath)
			}
		})
	}

	traverseDirectory(directory)

	await batchPromises(
		`Creating change history for files in ${directory}`,
		apiPaths,
		async (apiPath) => {
			const created_at = await execAsync(
				`git log --format=%cI --max-count=1 ${apiPath.itemPath}`,
			)

			// remove the "\n" from the end of the output
			apiPath.created_at = created_at.stdout.slice(0, -1)
		},
		{ loggingEnabled: false },
	)

	return apiPaths
}
