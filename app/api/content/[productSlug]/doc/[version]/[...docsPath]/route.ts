/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	findFileWithMetadata,
	joinFilePath,
	parseMarkdownFrontMatter,
	parseJsonc,
} from '@utils/file'
import { getProductVersionMetadata } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import docsPathsAllVersions from '@api/docsPathsAllVersions.json'
import { VersionedProduct } from '@api/types'

/**
 * Check if there's a redirect for the given path
 * Always uses the latest version's redirects file
 */
async function checkForRedirect(
	productSlug: string,
	versionMetadata: any,
	docsPath: string,
): Promise<string | null> {
	try {
		// For redirects, we always want to use the latest version
		const latestVersionResult = getProductVersionMetadata(productSlug, 'latest')
		if (!latestVersionResult.ok) {
			return null
		}

		const { value: latestVersionMetadata } = latestVersionResult

		// Construct the redirects file path using latest version, handling non-versioned products
		const redirectsPathParts = [`content`, productSlug]
		if (latestVersionMetadata.version) {
			redirectsPathParts.push(latestVersionMetadata.version)
		}
		redirectsPathParts.push('redirects.jsonc')

		const redirectsFileResult = await findFileWithMetadata(
			redirectsPathParts,
			latestVersionMetadata,
		)
		if (!redirectsFileResult.ok) {
			return null
		}

		const redirectsData = parseJsonc(redirectsFileResult.value)
		if (!redirectsData.ok) {
			return null
		}

		const redirects = redirectsData.value

		// Look for a redirect that matches our current path
		// Csonstruct the full path that would be in the redirects file
		const { productSlug: frontendSlug } = PRODUCT_CONFIG[productSlug]
		const fullPath = `/${frontendSlug}/${docsPath}`

		if (Array.isArray(redirects)) {
			for (const redirect of redirects) {
				if (
					redirect.source === fullPath ||
					redirect.source.endsWith(docsPath)
				) {
					// Extract the path part from the destination
					const destination = redirect.destination
					if (destination.startsWith(`/${frontendSlug}/`)) {
						return destination.substring(`/${frontendSlug}/`.length)
					}
				}
			}
		}

		return null
	} catch (error) {
		console.warn(`Failed to check redirects for ${productSlug}:`, error)
		return null
	}
}

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

	// Build content paths, handling non-versioned products
	const pathParts = [`content`, productSlug]
	if (versionMetadata.version) {
		pathParts.push(versionMetadata.version)
	}
	pathParts.push(contentDir)

	const possibleContentLocations = [
		[...pathParts, `${parsedDocsPath}.mdx`],
		[...pathParts, parsedDocsPath, `index.mdx`],
	]

	let foundContent, githubFile, createdAt
	for (const loc of possibleContentLocations) {
		const readFileResult = await findFileWithMetadata(loc, versionMetadata, {
			loadFromContentDir: process.env.NODE_ENV === 'development',
		})

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

	// If content not found, check for redirects
	if (!foundContent) {
		const redirectedPath = await checkForRedirect(
			productSlug,
			versionMetadata,
			parsedDocsPath,
		)
		if (redirectedPath) {
			// Try to find content at the redirected path using same path construction logic
			const redirectedPathParts = [`content`, productSlug]
			if (versionMetadata.version) {
				redirectedPathParts.push(versionMetadata.version)
			}
			redirectedPathParts.push(contentDir)

			const redirectedLocations = [
				[...redirectedPathParts, `${redirectedPath}.mdx`],
				[...redirectedPathParts, redirectedPath, `index.mdx`],
			]

			for (const loc of redirectedLocations) {
				const readFileResult = await findFileWithMetadata(loc, versionMetadata)
				if (readFileResult.ok) {
					foundContent = readFileResult.value
					githubFile = loc.join('/')
					const productDocsPaths =
						docsPathsAllVersions[productSlug][versionMetadata.version]
					if (productDocsPaths) {
						const matchingPath = productDocsPaths.find(
							({ path }: { path: string }) => {
								return path.endsWith(redirectedPath)
							},
						)
						if (matchingPath) {
							createdAt = matchingPath.created_at
						} else {
							console.warn(
								`File metadata could not be found for redirected file ${githubFile}`,
							)
						}
					}
					break
				}
			}
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
