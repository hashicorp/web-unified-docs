/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import grayMatter from 'gray-matter'
import { parse as jsoncParse } from 'jsonc-parser'

import { ServedFrom } from '#api/types'
import { Err, Ok, Result } from './result'
import type { ProductVersionMetadata } from './contentVersions'

// Only exported for testing purposes
export enum FileType {
	Content = 'content',
	Asset = 'asset',
}

const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: `http://localhost:${process.env.UNIFIED_DOCS_PORT}`

const headers = process.env.VERCEL_URL
	? new Headers({
			'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
		})
	: new Headers()

const incBuild = process.env.INCREMENTAL_BUILD === 'true'
const incBuildPRPreview = incBuild && process.env.VERCEL_ENV === 'preview'
const incBuildLocalDev =
	incBuild && process.env.NODE_ENV === 'development' && !incBuildPRPreview

const EXT_TO_CONTENT_TYPE: Record<string, string> = {
	'.avif': 'image/avif',
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.json': 'application/json; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8',
	'.mdx': 'text/markdown; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.txt': 'text/plain; charset=utf-8',
	'.webp': 'image/webp',
}

const contentTypeFromPath = (filePath: string): string => {
	const ext = path.extname(filePath).toLowerCase()
	if (EXT_TO_CONTENT_TYPE[ext]) {
		return EXT_TO_CONTENT_TYPE[ext]
	}

	// Default to text/plain for unknown file types
	return 'text/plain; charset=utf-8'
}

/**
 * Fetches a file by path, applying incremental build logic when
 * `INCREMENTAL_BUILD` is set to `'true'`:
 *   - Files in `removed`            → returns Err
 *   - Files in `added` or `modified` → fetches from SELF_URL (current build)
 *   - Files not in changedContentFiles.json  → fetches from UNIFIED_DOCS_PROD_URL
 * Otherwise falls back to the standard SELF_URL fetch.
 */
// Only exported for testing purposes
export const fetchFile = async (
	filePath: string,
	fileType: FileType,
): Promise<Result<{ response: Response; servedFrom: ServedFrom }, string>> => {
	if (incBuildPRPreview) {
		let changedFiles: {
			added: string[]
			modified: string[]
			removed: string[]
		}

		try {
			const changedFilesPath = path.join(
				process.cwd(),
				'changedContentFiles.json',
			)
			const changedFilesData = await readFile(changedFilesPath, 'utf8')
			changedFiles = JSON.parse(changedFilesData)
		} catch {
			// TODO: This right now just downstreams to a 404, should this be a 500?
			// Overall this should be a very rare case, as prebuild fail if it cannot generate the changedContentFiles.json successfully
			return Err(
				'Failed to read changedContentFiles.json for incremental build',
			)
		}

		// For asset files, we need to adjust the file path to match the paths in changedContentFiles.json, which are based on the content directory structure. Specifically, we replace the first segment 'asset' with 'content' to align with how assets are referenced in the content directory versus how they are stored in the public directory for fetching.
		let localFilePath = filePath
		if (fileType === FileType.Asset) {
			const parts = filePath.split('/')
			parts[0] = 'content'
			localFilePath = parts.join('/')
		}

		if (changedFiles.removed.includes(localFilePath)) {
			return Err('File removed in current build')
		}

		if (
			changedFiles.added.includes(localFilePath) ||
			changedFiles.modified.includes(localFilePath)
		) {
			const response = await fetch(`${SELF_URL}/${filePath}`, {
				cache: 'no-cache',
				headers,
			})
			return Ok({
				response,
				servedFrom: ServedFrom.CurrentBuild,
			})
		}

		// File not changed in this build — load from production
		console.warn(
			`File ${filePath} not changed in current build, loading from production`,
		)
		const response = await fetch(
			`${process.env.UNIFIED_DOCS_PROD_URL}/${filePath}`,
			{
				cache: 'no-cache',
				headers,
			},
		)
		return Ok({
			response,
			servedFrom: ServedFrom.Production,
		})
	} else if (incBuildLocalDev) {
		const markdownFileExtensions = ['.md', '.mdx']
		const isMarkdownFile = markdownFileExtensions.some((ext: string) => {
			return filePath.toLowerCase().endsWith(ext)
		})

		let localFilePath = filePath
		if (fileType === FileType.Asset) {
			// Adjust the file path to match the paths in the content directory
			const parts = filePath.split('/')
			parts[0] = 'content'
			localFilePath = parts.join('/')
		} else if (isMarkdownFile) {
			// Apply MDX transforms, writing out transformed MDX files to `public`
			const CWD = process.cwd()
			const CONTENT_DIR = path.join(CWD, 'content')
			const CONTENT_DIR_OUT = path.join(CWD, 'public', 'content')
			const MDX_TRANSFORMS_FILE = path.join(
				CWD,
				'scripts',
				'prebuild',
				'mdx-transforms',
				'build-mdx-transforms.mjs',
			)

			// Use a runtime file URL and webpackIgnore so Next.js does not statically
			// trace the prebuild remark-mdx/@babel dependencies into API bundles.
			// This is fine as we only do this in local dev, not preview or prod
			const { buildMdxTransforms } = await import(
				/* webpackIgnore: true */ pathToFileURL(MDX_TRANSFORMS_FILE).href
			)

			// load the file app/api/versionMetadata.json
			const versionMetadataPath = path.join(
				CWD,
				'app',
				'api',
				'versionMetadata.json',
			)
			const versionMetadata = JSON.parse(
				await readFile(versionMetadataPath, 'utf-8'),
			)

			try {
				// See if the file exist as MDX files can exist in the path of
				// "doc.mdx" or "doc/index.mdx" and we often have to check for both
				await readFile(localFilePath)

				await buildMdxTransforms(
					CONTENT_DIR,
					CONTENT_DIR_OUT,
					versionMetadata,
					[localFilePath],
				)
			} catch (error) {
				return Err(
					`Failed to read local file at path: ${localFilePath}, error: ${error}`,
				)
			}

			// Add /public to the path for markdown files to match the transformed output directory
			const parts = filePath.split('/')
			parts.unshift('public')
			localFilePath = parts.join('/')
		}

		try {
			const fileContent =
				fileType === FileType.Asset
					? await readFile(localFilePath)
					: await readFile(localFilePath, 'utf-8')

			// Wrap the file content in a Response object to mimic the fetch API's Response which is expected downstream.

			// @ts-expect-error:2345 - TS wants Uint8Array, but a Buffer is fine
			const response = new Response(fileContent, {
				headers: {
					'content-type': contentTypeFromPath(localFilePath),
				},
			})
			return Ok({ response, servedFrom: ServedFrom.CurrentBuild })
		} catch {
			return Err(`Failed to read local file at path: ${localFilePath}`)
		}
	}

	const response = await fetch(`${SELF_URL}/${filePath}`, {
		cache: 'no-cache',
		headers,
	})
	return Ok({
		response,
		servedFrom: ServedFrom.CurrentBuild,
	})
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

	const newFilePathJoined = joinFilePath(newFilePath)

	try {
		const fetchResult = await fetchFile(newFilePathJoined, FileType.Content)
		if (!fetchResult.ok) {
			// Rewrap the error string or else we expand the OK type downstream
			return Err(fetchResult.value as string)
		}

		const { response, servedFrom } = fetchResult.value
		if (!response.ok) {
			return Err(`Failed to read file at path: ${newFilePathJoined}`)
		}

		const text = await response.text()

		return Ok({
			text,
			servedFrom,
		})
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
	)

	const newFilePathJoined = joinFilePath(newFilePath)

	try {
		const fetchResult = await fetchFile(newFilePathJoined, FileType.Asset)
		if (!fetchResult.ok) {
			// Rewrap the error string or else we expand the OK type downstream
			return Err(fetchResult.value as string)
		}

		const { response, servedFrom } = fetchResult.value
		if (!response.ok) {
			return Err(`Failed to read asset at path: ${newFilePathJoined}`)
		}

		const buffer = await response.arrayBuffer()

		return Ok({
			buffer: Buffer.from(buffer),
			contentType: response.headers.get('content-type'),
			servedFrom,
		})
	} catch {
		return Err(`Failed to read asset at path: ${newFilePathJoined}`)
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
	// Filter out duplicate slashes and empty segments
	return path
		.filter(Boolean)
		.join('/')
		.replace(/\/{2,}/g, '/')
}
