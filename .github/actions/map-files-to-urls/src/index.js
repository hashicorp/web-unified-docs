/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getUrlFromFilePath } from '../../../../scripts/utils/file-path/url/index.mjs'
import * as core from '@actions/core'

const FILE_PATHS = core.getInput('files', { required: true })

console.log('### file paths', FILE_PATHS)
const pathsArray = FILE_PATHS.split(',')
console.log('### pathsArray', pathsArray)
const result = pathsArray.map((filePath) => {
	try {
		const url = getUrlFromFilePath(filePath)
		core.info(`URL for ${filePath}: ${url}`)
		return url
	} catch (error) {
		core.error(error)
	}
})
console.log('### result', result)
core.setOutput('paths', result)
