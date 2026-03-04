/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */
import { readFile } from 'node:fs/promises'

import grayMatter from 'gray-matter'
import { parse as jsoncParse } from 'jsonc-parser'

import { Err, Ok, Result } from './result'
import type { ProductVersionMetadata } from './contentVersions'

const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: `http://localhost:${process.env.UNIFIED_DOCS_PORT}`

const headers = process.env.VERCEL_URL
	? new Headers({
			'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
		})
	: new Headers()

/**
 * NOTE: we currently read files by fetching them from the `public` folder
 * via the Vercel CDN.
 *
 **/
export const findFileWithMetadata = async (
	filePath: string[],
	versionMetaData: ProductVersionMetadata,
	options: {
		loadFromContentDir?: boolean
	} = { loadFromContentDir: false },
) => {
	const newFilePath = ifNeededAddReleaseStageToPath(
		filePath,
		versionMetaData.releaseStage,
	)

	try {
		if (options.loadFromContentDir) {
			const filePathString = joinFilePath(newFilePath)
			const fileContent = await readFile(filePathString, 'utf-8')
			return Ok(fileContent)
		}

		const res = await fetch(`${SELF_URL}/${newFilePath.join('/')}`, {
			cache: 'no-cache',
			headers,
		})

		if (!res.ok) {
			return Err(`Failed to read file at path: ${newFilePath.join('/')}`)
		}

		const text = await res.text()

		return Ok(text)
	} catch {
		return Err(
			`Failed to read file at path: ${newFilePath.join('/')}, with options: ${JSON.stringify(options, null, 2)}`,
		)
	}
}

export const getAssetData = async (
	filePath: string[],
	versionMetaData: ProductVersionMetadata,
): Promise<
	Result<
		{
			buffer: Buffer
			contentType: string
		},
		string
	>
> => {
	const newFilePath = ifNeededAddReleaseStageToPath(
		filePath,
		versionMetaData.releaseStage,
	)

	try {
		const res = await fetch(`${SELF_URL}/${newFilePath.join('/')}`, {
			cache: 'no-cache',
			headers,
		})

		if (!res.ok) {
			return Err(`Failed to read asset at path: ${newFilePath.join('/')}`)
		}

		const buffer = await res.arrayBuffer()

		return Ok({
			buffer: Buffer.from(buffer),
			contentType: res.headers.get('Content-Type'),
		})
	} catch {
		return Err(`Failed to read asset at path: ${newFilePath.join('/')}`)
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
			console.log(`JSONC parse errors: ${JSON.stringify(parserError, null, 2)}`)
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

// This assumes that the version is always third in the filePath
function ifNeededAddReleaseStageToPath(
	filePath: string[],
	releaseStage: string,
) {
	const newFilePath = [...filePath]
	if (releaseStage !== 'stable' && newFilePath[2]) {
		newFilePath[2] = `${newFilePath[2]} (${releaseStage})`
	}

	return newFilePath
}

export const joinFilePath = (path: string[] = []): string => {
	return path
		.filter(Boolean)
		.join('/')
		.replace(/\/{2,}/g, '/')
}
