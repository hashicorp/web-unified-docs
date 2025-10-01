/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
// import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

import crypto from 'node:crypto'

function getFileShaHashSync(filePath) {
	try {
		const fileBuffer = fs.readFileSync(filePath)

		const hash = crypto.createHash('sha256')
		hash.update(fileBuffer)

		return hash.digest('hex')
	} catch (error) {
		console.error(`Error calculating hash for file ${filePath}:`, error.message)
		return null
	}
}

/**
 * Check if a file is an image based on its extension.
 */
export function isFileAnImage(file) {
	const fileExtension = path.extname(file).toLowerCase()

	const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
	return imageExtensions.includes(fileExtension)
}

/**
 * Copy all asset files (images) from the source to the destination directory.
 */
export async function copyAllAssetFiles(sourceDir, destDir, versionMetadata) {
	console.log(`\nCopying Assets...`)

	// Track filename usage by product
	const fileNameUsage = {}

	for (const product of Object.keys(versionMetadata)) {
		const versionAssetsDest = path.join(destDir, product)

		if (!fs.existsSync(versionAssetsDest)) {
			fs.mkdirSync(versionAssetsDest, { recursive: true })
		}

		// Initialize product tracking
		if (!fileNameUsage[product]) {
			fileNameUsage[product] = {}
		}

		const productConfig = PRODUCT_CONFIG[product]

		for (const metadata of versionMetadata[product]) {
			const versionAssetsSrc = path.join(
				sourceDir,
				product,
				productConfig.versionedDocs === false
					? ''
					: metadata.releaseStage === 'stable'
						? metadata.version
						: `${metadata.version} (${metadata.releaseStage})`,
			)

			const assetFiles = (await listFiles(versionAssetsSrc)).filter((f) => {
				return isFileAnImage(f)
			})

			for (const filePath of assetFiles) {
				const relativePath = path.relative(versionAssetsSrc, filePath)
				const destPath = path.join(versionAssetsDest, relativePath)
				const parentDir = path.dirname(destPath)
				if (!fs.existsSync(parentDir)) {
					fs.mkdirSync(parentDir, { recursive: true })
				}

				const filename = path.basename(filePath)

				const sha = getFileShaHashSync(filePath)
				const filePathRelativeToContent = path.relative(sourceDir, filePath)

				// Track filename usage for this product
				if (!fileNameUsage[product][filename]) {
					fileNameUsage[product][filename] = {
						totalFileNameCount: 1,
						uniqueShas: [
							{
								sha,
								filePaths: [filePathRelativeToContent],
							},
						],
					}
				} else {
					const existingSha = fileNameUsage[product][filename].uniqueShas

					const foundEntry = existingSha.find((entry) => {
						return entry.sha === sha
					})

					if (!foundEntry) {
						fileNameUsage[product][filename].uniqueShas.push({
							sha,
							filePaths: [filePathRelativeToContent],
						})
					} else {
						foundEntry.filePaths.push(filePathRelativeToContent)
					}

					fileNameUsage[product][filename].totalFileNameCount++
				}

				fs.copyFileSync(filePath, destPath)
			}
		}
	}

	console.log(
		`\nImage's that share the same name but have different SHAs across versions:`,
	)
	console.log('==========================')

	// Filter out filenames that have only one unique SHA (not duplicated)
	for (const product in fileNameUsage) {
		for (const filename in fileNameUsage[product]) {
			const { uniqueShas } = fileNameUsage[product][filename]
			if (uniqueShas.length === 1) {
				delete fileNameUsage[product][filename]
			}
		}
	}

	// Remove products that have no duplicated filenames
	for (const product in fileNameUsage) {
		const filenames = Object.keys(fileNameUsage[product])
		if (filenames.length === 0) {
			delete fileNameUsage[product]
		}
	}

	console.log(JSON.stringify(fileNameUsage, null, 2))
}

export function copySingleAssetFile(filePath) {
	const CWD = process.cwd()
	const CONTENT_DIR = path.join(CWD, 'content')
	const ASSET_DIR_OUT = path.join(CWD, 'public', 'assets')
	console.log(`\nCopying Assets from ${filePath}...`)

	const relativePath = path.relative(CONTENT_DIR, filePath)
	const destPath = path.join(ASSET_DIR_OUT, relativePath)
	const parentDir = path.dirname(destPath)
	if (!fs.existsSync(parentDir)) {
		fs.mkdirSync(parentDir, { recursive: true })
	}
	fs.copyFileSync(filePath, destPath)
}
