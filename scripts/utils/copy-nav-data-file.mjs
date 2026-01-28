/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { addVersionToNavData } from '../prebuild/add-version-to-nav-data.mjs'

const CWD = process.cwd()
const CONTENT_DIR = path.join(CWD, 'content')
const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')

export async function copyNavDataFile(filePath, versionMetadata = {}) {
	console.log(`\nCopying NavData from ${filePath}...`)

	const relativePath = path.relative(CONTENT_DIR, filePath)
	const destPath = path.join(CONTENT_DIR_OUT, relativePath)
	const parentDir = path.dirname(destPath)
	if (!fs.existsSync(parentDir)) {
		fs.mkdirSync(parentDir, { recursive: true })
	}
	fs.copyFileSync(filePath, destPath)

	// add version to nav data paths/hrefs
	await addVersionToNavData(destPath, versionMetadata)
}
