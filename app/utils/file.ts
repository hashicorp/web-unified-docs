import grayMatter from 'gray-matter'

import { Err, Ok } from './result'

const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export const readFile = async (filePath: string[]) => {
	try {
		const res = await fetch(`${SELF_URL}/${filePath.join('/')}`)

		if (!res.ok) {
			return Err(`Failed to read file at path: ${filePath.join('/')}`)
		}

		const text = await res.text()

		return Ok(text)
	} catch (error) {
		return Err(`Failed to read file at path: ${filePath.join('/')}`)
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
