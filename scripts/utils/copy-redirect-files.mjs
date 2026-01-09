/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { batchPromises } from './batch-promises.mjs'
import { listFiles } from './list-files.mjs'

/**
 * Copy all redirects.jsonc files from the source to the destination directory.
 */
export async function copyRedirectFiles(sourceDir, destDir) {
	const redirectFiles = (await listFiles(sourceDir)).filter((f) => {
		return f.endsWith('redirects.jsonc')
	})

	console.log(`\nCopying Redirects from ${redirectFiles.length} files...`)

	await batchPromises('Redirects', redirectFiles, async (filePath) => {
		const relativePath = path.relative(sourceDir, filePath)
		const destPath = path.join(destDir, relativePath)
		const parentDir = path.dirname(destPath)
		if (!fs.existsSync(parentDir)) {
			fs.mkdirSync(parentDir, { recursive: true })
		}
		fs.copyFileSync(filePath, destPath)
	})
}
