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

export async function gatherAllVersionsDocsPaths(
	versionMetadata,
	getRealFileChangedMetadata,
) {
	const allDocsPaths = {}
	const allProducts = Object.keys(PRODUCT_CONFIG)

	// Iterate over each product directory, adding to `allDocsPaths`
	console.log(
		`🪄 Gathering file information for ${allProducts.length} products...`,
	)

	if (getRealFileChangedMetadata) {
		console.log(
			'\nℹ️ Using REAL created_at dates for file metadata. This may take a while...\n',
		)
	} else {
		console.log(
			"\nℹ️ Using DEBUG created_at date of 2025-06-03T18:02:21+00:00 for file metadata.\nIf you want to use the real created_at dates, run with '--use-real-file-changed-metadata'.\ne.g. `npm run prebuild -- --use-real-file-changed-metadata`\n",
		)
	}

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
				getRealFileChangedMetadata,
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

export async function getProductPaths(
	directory,
	productSlug,
	getRealFileChangedMetadata,
) {
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
			// We use `git log` to get the last commit date for the file, but because
			// it is expensive, we only do it in production. Everything we use a default date of '2025-06-03T18:02:21+
			let createdAt = '2025-06-03T18:02:21+00:00'

			// TODO: Store this data in frontmatter of each file instead
			if (getRealFileChangedMetadata) {
				// Normalize path separators for cross-platform compatibility
				const normalizedPath = apiPath.itemPath.replace(/\\/g, '/')
				const gitLogTime = await execAsync(
					`git log --format=%cI --max-count=1 -- "${normalizedPath}"`,
				)

				// remove the "\n" from the end of the output
				createdAt = gitLogTime.stdout.slice(0, -1)
			}

			apiPath.created_at = createdAt
		},
		{ loggingEnabled: false },
	)

	return apiPaths
}
