/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'
import { PRODUCT_CONFIG } from '../../app/utils/productConfig.mjs'

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

	for (const product of Object.keys(versionMetadata)) {
		const versionAssetsDest = path.join(destDir, product)

		if (!fs.existsSync(versionAssetsDest)) {
			fs.mkdirSync(versionAssetsDest, { recursive: true })
		}

		const productConfig = PRODUCT_CONFIG[product]

		for (const metadata of versionMetadata[product]) {
			const versionAssetsSrc = path.join(
				sourceDir,
				product,
				productConfig.versionedDocs === false ? '' : metadata.releaseStage === 'stable' ?
					metadata.version :
					`${metadata.version} (${metadata.releaseStage})`
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
				fs.copyFileSync(filePath, destPath)
			}
		}
	}
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
