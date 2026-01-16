/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	findFileWithMetadata,
	joinFilePath,
	parseMarkdownFrontMatter,
} from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import docsPathsAllVersions from '#api/docsPathsAllVersions.json'
import { VersionedProduct } from '#api/types'
import {
	getQuickPreviewManifest,
	fetchFromProduction,
	isFileDeleted,
	shouldFetchFromProduction,
} from '#utils/quickPreview'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = VersionedProduct & {
	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	docsPath: string[]
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, docsPath } = params

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	// Check if we're in quick preview mode and get the changedfiles.json if so
	const quickPreviewManifest = await getQuickPreviewManifest()

	// Determine the content directory based on the "product" (actually repo) slug
	const { contentDir } = PRODUCT_CONFIG[productSlug]
	const productVersionResult = getProductVersionMetadata(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
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

	let foundContent, githubFile, createdAt
	for (const loc of possibleContentLocations) {
		const readFileResult = await findFileWithMetadata(loc, versionMetadata)

		if (readFileResult.ok) {
			foundContent = readFileResult.value
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
		// If in quick preview mode, try fetching from production
		if (shouldFetchFromProduction(quickPreviewManifest)) {
			// Check if file was deleted in this preview
			const sourceFile = `content/${productSlug}/${versionMetadata.version}/${contentDir}/${parsedDocsPath}.mdx`
			if (isFileDeleted(quickPreviewManifest, sourceFile)) {
				console.log(`[Quick Preview] File deleted in preview: ${sourceFile}`)
				return new Response('Content deleted in preview', {
					status: 404,
					headers: {
						'X-Content-Source': 'deleted',
					},
				})
			}

			// Try to fetch from production
			try {
				const productionPath = request.url.replace(
					new URL(request.url).origin,
					'',
				)
				const productionResponse = await fetchFromProduction(productionPath)

				if (productionResponse.ok) {
					const productionContent = await productionResponse.text()
					// Parse and augment the response with quick preview metadata
					const contentJson = JSON.parse(productionContent)
					if (contentJson.meta) {
						contentJson.meta.quick_preview = {
							enabled: true,
							mode: quickPreviewManifest?.mode || 'normal',
							content_source: 'production',
						}
					}

					return new Response(JSON.stringify(contentJson), {
						status: productionResponse.status,
						headers: {
							'Content-Type': 'application/json',
							'X-Content-Source': 'production',
							'X-Preview-Fallback': 'true',
						},
					})
				}
			} catch (error) {
				console.error('[Quick Preview] Production fetch failed:', error)
				// Fall through to 404 below
			}
		}

		const locationsString = possibleContentLocations.map(
			(location: string[]) => {
				return `* ${joinFilePath(location)}`
			},
		)
		console.error(
			`API Error: No content found for ${request.url}\n\nChecked for content at: \n${locationsString.join('\n')}`,
		)
		return new Response('Not found', { status: 404 })
	}

	const markdownFrontMatterResult = parseMarkdownFrontMatter(foundContent)

	if (!markdownFrontMatterResult.ok) {
		console.error(errorResultToString('API', markdownFrontMatterResult))
		return new Response('Not found', { status: 404 })
	}

	const { metadata, markdownSource } = markdownFrontMatterResult.value

	return Response.json({
		meta: {
			status_code: 200,
			status_text: 'OK',
			// Include quick preview metadata in response for frontend to use
			quick_preview: quickPreviewManifest
				? {
						enabled: true,
						mode: quickPreviewManifest.mode || 'normal',
						content_source: 'preview',
					}
				: undefined,
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
			created_at: createdAt,
			sha: '', // TODO: Do we really need this?
			githubFile,
		},
	})
}
