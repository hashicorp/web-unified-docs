/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { getUrlFromFilePath } from './utils/file-path/url/index.mjs'

const filePaths = process.argv.slice(2)

// Run the main script
main(filePaths)

function main(filePaths) {
	const allDocsPaths = fs.readFileSync(
		path.join(process.cwd(), 'app/api/allDocsPaths.json'),
		'utf-8',
	)
	const result = filePaths.map((filePath) => {
		try {
			const url = getUrlFromFilePath(filePath, allDocsPaths)
			console.log(`URL for ${filePath}: ${url}`)
			return url
		} catch (error) {
			console.error(error)
		}
	})

	return result
}
