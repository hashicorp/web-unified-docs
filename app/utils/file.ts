/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import grayMatter from 'gray-matter'
import { parse as jsoncParse } from 'jsonc-parser'

import { Err, Ok, Result } from './result'

const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: `http://localhost:${process.env.UNIFIED_DOCS_PORT}`

/**
 * NOTE: we currently read files by fetching them from the `public` folder
 * via the Vercel CDN.
 *
 **/
export const readFile = async (filePath: string[]) => {
	try {
		const res = await fetch(`${SELF_URL}/${filePath.join('/')}`, {
			cache: 'no-cache',
		})

		if (!res.ok) {
			return Err(`Failed to read file at path: ${filePath.join('/')}`)
		}

		const text = await res.text()

		return Ok(text)
	} catch {
		return Err(`Failed to read file at path: ${filePath.join('/')}`)
	}
}

export const getAssetData = async (
	filePath: string[],
): Promise<
	Result<
		{
			buffer: Buffer
			contentType: string
		},
		string
	>
> => {
	try {
		const res = await fetch(`${SELF_URL}/${filePath.join('/')}`, {
			cache: 'no-cache',
		})

		if (!res.ok) {
			return Err(`Failed to read asset at path: ${filePath.join('/')}`)
		}

		const buffer = await res.arrayBuffer()

		return Ok({
			buffer: Buffer.from(buffer),
			contentType: res.headers.get('Content-Type'),
		})
	} catch {
		return Err(`Failed to read asset at path: ${filePath.join('/')}`)
	}
}

export const parseJson = (jsonString: string) => {
	try {
		return Ok(JSON.parse(jsonString))
	} catch (error) {
		return Err(`Failed to parse JSON: ${error}`)
	}
}

export const parseJsonc = (jsonString: string) => {
	try {
		const parserError = []
		const json = jsoncParse(jsonString, parserError, {
			allowTrailingComma: true,
		})

		if (parserError.length > 0) {
			return Err(`Failed to parse JSONC: ${parserError}`)
		}

		return Ok(json)
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
