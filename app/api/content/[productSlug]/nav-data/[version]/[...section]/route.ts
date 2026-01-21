/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { findFileWithMetadata, parseJson } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { errorResultToString } from '#utils/result'
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
	 * An array of strings representing the path relative to `content/<productSlug>/nav-data/<version>/data`
	 * @example ['cli']
	 */
	section: string[]
}
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug, version, section } = params

	// Check if we're in quick preview mode and get the changedfiles.json if so
	const quickPreviewManifest = await getQuickPreviewManifest()

	const productVersionResult = getProductVersionMetadata(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: versionMetadata } = productVersionResult

	const sectionPath = section.join('/')

	const readFileResult = await findFileWithMetadata(
		[
			'content',
			productSlug,
			versionMetadata.version,
			'data',
			`${sectionPath}-nav-data.json`,
		],
		versionMetadata,
	)

	if (!readFileResult.ok) {
		// If in quick preview mode, try fetching from production
		if (shouldFetchFromProduction(quickPreviewManifest)) {
			// Check if file was deleted in this preview
			const sourceFile = `content/${productSlug}/${versionMetadata.version}/data/${sectionPath}-nav-data.json`
			if (isFileDeleted(quickPreviewManifest, sourceFile)) {
				console.log(
					`[Quick Preview] Nav data deleted in preview: ${sourceFile}`,
				)
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

					return new Response(productionContent, {
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

		console.error(errorResultToString('API', readFileResult))
		return new Response('Not found', { status: 404 })
	}

	const fileData = readFileResult.value
	const navDataResult = parseJson(fileData)

	if (!navDataResult.ok) {
		console.error(errorResultToString('API', navDataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({ result: { navData: navDataResult.value } })
}
