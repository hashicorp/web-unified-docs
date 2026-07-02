/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'
import { addVersionToNavData } from '../prebuild/add-version-to-nav-data.mjs'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Copy all *-nav-data.json files from the source to the destination directory.
 */
export async function copyNavDataFiles(
	sourceDir,
	destDir,
	versionMetadata = {},
	changedFiles = null,
) {
	const filesToCheck = changedFiles
		? [...changedFiles.added, ...changedFiles.modified]
		: await listFiles(sourceDir)

	const navDataFiles = filesToCheck.filter((filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const repoSlug = relativePath.split('/')[0]
		return filePath.endsWith('-nav-data.json') && repoSlug in PRODUCT_CONFIG
	})

	console.log(`\nCopying NavData from ${navDataFiles.length} files...`)

	await batchPromises('NavData', navDataFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)

		// add version to nav data paths/hrefs
		await addVersionToNavData(destPath, versionMetadata)
	})
}
