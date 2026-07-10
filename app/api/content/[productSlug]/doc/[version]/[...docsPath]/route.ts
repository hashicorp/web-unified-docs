/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	findFileWithMetadata,
	joinFilePath,
	parseMarkdownFrontMatter,
} from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { createInstanaErrorResponse } from '#utils/instana'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import docsPathsAllVersions from '#api/docsPathsAllVersions.json'
import { VersionedProduct } from '#api/types'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = VersionedProduct & {
	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	docsPath: string[]
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<GetParams> },
) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, docsPath } = await params

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Product ${productSlug} not found in contentDirMap`,
			attributes: {
				'error.kind': 'product_not_found',
				'product.slug': productSlug,
			},
			body: 'Not found',
		})
	}

	// Determine the content directory based on the "product" (actually repo) slug
	const { contentDir } = PRODUCT_CONFIG[productSlug]
	const productVersionResult = getProductVersionMetadata(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Version metadata lookup failed for ${productSlug}@${version}`,
			attributes: {
				'error.kind': 'version_not_found',
				'product.slug': productSlug,
				'product.version': version,
			},
			body: 'Not found',
		})
	}

	const { value: versionMetadata } = productVersionResult

	let parsedDocsPath = joinFilePath(docsPath)
	if (parsedDocsPath.endsWith('.mdx')) {
		parsedDocsPath = parsedDocsPath.slice(0, -4)
	}

	/**
	 * TODO: possible improvement: rename files instead of two requests. Which
	 * files are "named" files (`slug.mdx`) and "index" files (`slug/index.mdx`)
	 * is known at build time. Named files are more common than index files. Maybe
	 * near the end of our prebuild script, we could traverse the output content
	 * directory. For any `<slug>/index.mdx` file, we could rename or rm the file:
	 * - If `<slug>.mdx` already exists, then rm `<slug>/index.mdx`. This reflects
	 *   the preference for named files already built in to this API route. We
	 *   definitely want to warn if we hit this case, maybe even fail the build.
	 * - Else, renamed `<slug>/index.mdx` to `<slug>.mdx`
	 * With this prebuild rename step in place, then for a given `docsPath`, we'll
	 * have a consistent and predictable file path to fetch - always:
	 * - `.../${contentDir}/${docsPath.join("/")}.mdx`. We'd be able to remove
	 * one of the two locations below.
	 */
	const possibleContentLocations = [
		[
			`content`,
			productSlug,
			versionMetadata.version,
			contentDir,
			`${parsedDocsPath}.mdx`,
		],
		[
			`content`,
			productSlug,
			versionMetadata.version,
			contentDir,
			parsedDocsPath,
			`index.mdx`,
		],
	]

	let foundContent, servedFrom, githubFile, createdAt
	for (const loc of possibleContentLocations) {
		const readFileResult = await findFileWithMetadata(loc, versionMetadata)

		if (readFileResult.ok) {
			foundContent = readFileResult.value.text
			servedFrom = readFileResult.value.servedFrom
			githubFile = loc.join('/')
			const productDocsPaths =
				docsPathsAllVersions[productSlug][versionMetadata.version]
			if (productDocsPaths) {
				const matchingPath = productDocsPaths.find(
					({ path }: { path: string }) => {
						return path.endsWith(parsedDocsPath)
					},
				)
				if (matchingPath) {
					createdAt = matchingPath.created_at
				} else {
					console.warn(
						`File metadata could not be found for file ${githubFile}`,
					)
				}
			}
			break
		}
	}

	if (!foundContent) {
		const locationsString = possibleContentLocations.map(
			(location: string[]) => {
				return `* ${joinFilePath(location)}`
			},
		)
		console.error(
			`API Error: No content found for ${request.url}\n\nChecked for content at: \n${locationsString.join('\n')}`,
		)
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Content not found for ${productSlug}@${versionMetadata.version}/${parsedDocsPath}`,
			attributes: {
				'error.kind': 'content_not_found',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
				'docs.path': parsedDocsPath,
			},
			body: 'Not found',
		})
	}

	const markdownFrontMatterResult = parseMarkdownFrontMatter(foundContent)

	if (!markdownFrontMatterResult.ok) {
		console.error(errorResultToString('API', markdownFrontMatterResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Front matter parse failed for ${productSlug}@${versionMetadata.version}/${parsedDocsPath}`,
			attributes: {
				'error.kind': 'frontmatter_parse_error',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
				'docs.path': parsedDocsPath,
			},
			body: 'Not found',
		})
	}

	const { metadata, markdownSource } = markdownFrontMatterResult.value

	return new Response(
		JSON.stringify({
			meta: {
				status_code: 200,
				status_text: 'OK',
			},
			result: {
				fullPath: parsedDocsPath,
				product: productSlug,
				version: PRODUCT_CONFIG[productSlug].versionedDocs
					? versionMetadata.version
					: 'v0.0.x',
				metadata,
				subpath: 'docs', // TODO: I guess we could grab the first part of the rawDocsPath? Is there something I am missing here?
				markdownSource,
				// check mdx frontmatter metadata first, if not then fallback to docsPathsAllVersions.json
				created_at: metadata.created_at || createdAt,
				last_modified: metadata.last_modified || null,
				sha: '', // TODO: Do we really need this?
				githubFile,
			},
		}),
		{
			headers: {
				'content-type': 'application/json',
				'served-from': servedFrom,
			},
		},
	)
}
