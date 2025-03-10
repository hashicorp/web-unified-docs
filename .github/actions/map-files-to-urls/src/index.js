import { getUrlFromFilePath } from '../../../../scripts/utils/file-path/url/index.mjs'
import * as core from '@actions/core'

const FILE_PATHS = core.getInput('files', { required: true })

export const getAllPaths = () => {
	const pathsArray = FILE_PATHS.split(',')
	const result = pathsArray.map((filePath) => {
		try {
			const url = getUrlFromFilePath(filePath)
			core.info(`URL for ${filePath}: ${url}`)
		} catch (error) {
			core.error(error)
		}
	})
	core.setOutput('paths', result)
}
