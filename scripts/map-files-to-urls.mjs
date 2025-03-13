/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getUrlFromFilePath } from './utils/file-path/url/index.mjs'
import allDocsPathsJson from '../app/api/docsPathsAllVersions.json' with { type: 'json' }

const filePaths = process.argv.slice(2)

// Run the main script
main(filePaths)

function main(filePaths) {
	const result = filePaths.map((filePath) => {
		try {
			return getUrlFromFilePath(filePath, allDocsPathsJson)
		} catch (error) {
			console.error(error)
		}
	})

	process.stdout.write(JSON.stringify(result))
}
