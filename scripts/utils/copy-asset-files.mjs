/**
 * Copyright IBM Corp. 2024, 2026
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
export async function copyAllAssetFiles(sourceDir, destDir) {
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
