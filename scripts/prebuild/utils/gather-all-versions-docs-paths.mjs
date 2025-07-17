/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { PRODUCT_CONFIG } from '../../app/utils/productConfig.mjs'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { batchPromises } from './batch-promises.mjs'

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

		for (const metadata of allVersions) {
			let versionPath = metadata.version
			let versionName = metadata.version

			// If the product is not versioned, we set it's version to 'v0.0.x' but keep the path empty
			if (!PRODUCT_CONFIG[product].versionedDocs) {
				versionName = 'v0.0.x'
				versionPath = ''
			}

			if (metadata.releaseStage !== 'stable') {
				versionPath = `${metadata.version} (${metadata.releaseStage})`
				versionName = metadata.version
			}

			allDocsPaths[product][versionName] = []
			const contentPath = path.join(
				'./content',
				product,
				versionPath,
				PRODUCT_CONFIG[product].contentDir,
			)

			// Get all paths for the product
			const allPaths = await getProductPaths(
				contentPath,
				PRODUCT_CONFIG[product].productSlug,
			)

			allDocsPaths[product][versionName].push(...allPaths)
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
				const itemName = item.split('.')[0]

				if (itemName === 'index') {
					apiPaths.push({
						path: path.join(productSlug, relativePath),
						itemPath,
					})
					return
				}

				apiPaths.push({
					path: path.join(productSlug, relativePath, itemName),
					itemPath,
				})
			}
		})
	}
	traverseDirectory(directory)

	await batchPromises(
		`Creating change history for files in ${directory}`,
		apiPaths,
		async (apiPath) => {
			// Normalize path separators for cross-platform compatibility
			const normalizedPath = apiPath.itemPath.replace(/\\/g, '/')
			const created_at = await execAsync(
				`git log --format=%cI --max-count=1 -- "${normalizedPath}"`,
			)

			// remove the "\n" from the end of the output
			apiPath.created_at = created_at.stdout.slice(0, -1)
		},
		{ loggingEnabled: false },
	)

	return apiPaths
}
