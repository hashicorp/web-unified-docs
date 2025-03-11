/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getUrlFromFilePath } from './utils/file-path/url/index.mjs'

const filePaths = process.argv.slice(2)

// Run the main script
main(filePaths)

function main(filePaths) {
	const result = filePaths.map((filePath) => {
		try {
			const url = getUrlFromFilePath(filePath)
			console.log(`URL for ${filePath}: ${url}`)
			return url
		} catch (error) {
			console.error(error)
		}
	})

	return result
}
