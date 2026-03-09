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
 * Fetches a file by path, applying incremental build logic when
 * `INCREMENTAL_BUILD` is set to `'true'`:
 *   - Files in `removed`            → returns Err
 *   - Files in `added` or `modified` → fetches from SELF_URL (current build)
 *   - Files not in changedFiles.json  → fetches from UNIFIED_DOCS_PROD_URL
 * Otherwise falls back to the standard SELF_URL fetch.
 */
const fetchFile = async (
	filePath: string,
): Promise<Result<Response, string>> => {
	if (process.env.INCREMENTAL_BUILD === 'true') {
		let changedFiles: {
			added: string[]
			modified: string[]
			removed: string[]
		}

		try {
			const changedFilesContent = await readFile('./changedFiles.json', 'utf-8')
			changedFiles = JSON.parse(changedFilesContent)
		} catch {
			console.warn('Failed to read changedFiles.json for incremental build')
			return Err('Failed to read changedFiles.json for incremental build')
		}

		if (changedFiles.removed.includes(filePath)) {
			console.warn(`File ${filePath} removed in current build`)
			return Err('File removed in current build')
		}

		if (
			changedFiles.added.includes(filePath) ||
			changedFiles.modified.includes(filePath)
		) {
			console.warn(`File ${filePath} added or modified in current build`)
			const res = await fetch(`${SELF_URL}/${filePath}`, {
				cache: 'no-cache',
				headers,
			})
			return Ok(res)
		}

		// File not changed in this build — load from production
		console.warn(
			`File ${filePath} not changed in current build, loading from production`,
		)
		const res = await fetch(
			`${process.env.UNIFIED_DOCS_PROD_URL}/${filePath}`,
			{
				cache: 'no-cache',
				headers,
			},
		)
		return Ok(res)
	}

	const res = await fetch(`${SELF_URL}/${filePath}`, {
		cache: 'no-cache',
		headers,
	})
	return Ok(res)
}

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

	const newFilePathJoined = newFilePath.join('/')

	try {
		// TODO: when we do inc builds locally we want to load all files from the content dir and transform them on demand if needed
		if (options.loadFromContentDir) {
			// Special join needed here to load the file from the local file system
			const filePathString = joinFilePath(newFilePath)
			const fileContent = await readFile(filePathString, 'utf-8')
			return Ok(fileContent)
		}

		const fetchResult = await fetchFile(newFilePathJoined)
		if (!fetchResult.ok) {
			// Rewrap the error string or else we expand the OK type downstream
			return Err(fetchResult.value as string)
		}

		const res = fetchResult.value
		if (!res.ok) {
			return Err(`Failed to read file at path: ${newFilePathJoined}`)
		}

		const text = await res.text()

		return Ok(text)
	} catch {
		return Err(
			`Failed to read file at path: ${newFilePathJoined}, with options: ${JSON.stringify(options, null, 2)}`,
		)
	}
}

export const getAssetData = async (
	filePath: string[],
	versionMetaData: ProductVersionMetadata,
) => {
	const newFilePath = ifNeededAddReleaseStageToPath(
		filePath,
		versionMetaData.releaseStage,
	).join('/')

	try {
		const fetchResult = await fetchFile(newFilePath)
		if (!fetchResult.ok) {
			// Rewrap the error string or else we expand the OK type downstream
			return Err(fetchResult.value as string)
		}

		const res = fetchResult.value
		if (!res.ok) {
			return Err(`Failed to read asset at path: ${newFilePath}`)
		}

		const buffer = await res.arrayBuffer()

		return Ok({
			buffer: Buffer.from(buffer),
			contentType: res.headers.get('Content-Type'),
		})
	} catch {
		return Err(`Failed to read asset at path: ${newFilePath}`)
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
