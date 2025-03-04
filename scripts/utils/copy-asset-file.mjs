/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'

export function copyAssetFile(filePath) {
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
