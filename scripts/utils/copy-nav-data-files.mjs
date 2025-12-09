/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'
import { addVersionToNavData } from '../prebuild/add-version-to-nav-data.mjs'

/**
 * Copy all *-nav-data.json files from the source to the destination directory.
 */
export async function copyNavDataFiles(
	sourceDir,
	destDir,
	versionMetadata = {},
) {
	const navDataFiles = (await listFiles(sourceDir)).filter((f) => {
		return f.endsWith('-nav-data.json')
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
