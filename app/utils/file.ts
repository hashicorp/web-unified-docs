import grayMatter from 'gray-matter'

import { promises as fs } from 'fs'
import path from 'path'
import { Err, Ok } from './result'

const CWD = process.cwd()

export const readFile = async (filePath: string[]) => {
	const completeFilePath = path.join(CWD, ...filePath)

	try {
		const fileContent = await fs.readFile(completeFilePath, 'utf8')
		return Ok(fileContent)
	} catch (error) {
		return Err(`Failed to read file at path: ${completeFilePath}`)
	}
}

export const parseJson = (jsonString: string) => {
	try {
		return Ok(JSON.parse(jsonString))
	} catch (error) {
		return Err(`Failed to parse JSON: ${error}`)
	}
}

export const parseMarkdownFrontMatter = (markdownString: string) => {
	try {
		const { data: metadata, content: markdownSource } =
			grayMatter(markdownString)
		return Ok({ metadata, markdownSource })
	} catch (error) {
		return Err(`Failed to parse Markdown front-matter: ${error}`)
	}
}
