/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'

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
export async function copyAssetFiles(sourceDir, destDir) {
	const assetFiles = (await listFiles(sourceDir)).filter((f) => {
		return isFileAnImage(f)
	})

	console.log(`\nCopying Assets from ${assetFiles.length} files...`)

	await batchPromises('Assets', assetFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)
	})
}
