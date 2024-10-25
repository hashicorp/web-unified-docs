import grayMatter from 'gray-matter'

import { Err, Ok } from './result'

const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: `http://localhost:${process.env.UNIFIED_DOCS_PORT}`

/**
 * NOTE: we currently read files by fetching them from the `public` folder
 * via the Vercel CDN. We intend to explore being able to read from the
 * filesystem directly rather than reading files through the Vercel CDN.
 *
 * Vercel has some reference on bundling files into Vercel Functions
 * which may be relevant:
 *
 * https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
 */
export const readFile = async (filePath: string[]) => {
	try {
		const res = await fetch(`${SELF_URL}/${filePath.join('/')}`)

		if (!res.ok) {
			return Err(`Failed to read file at path: ${filePath.join('/')}`)
		}

		const text = await res.text()

		return Ok(text)
	} catch {
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
