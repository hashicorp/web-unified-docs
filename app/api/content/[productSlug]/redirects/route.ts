/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductVersionMetadata } from '#utils/contentVersions'
import { findFileWithMetadata, parseJsonc } from '#utils/file'
import { errorResultToString } from '#utils/result'
import { ProductParam } from '#api/types'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import {
	getQuickPreviewManifest,
	fetchFromProduction,
	isFileDeleted,
	shouldFetchFromProduction,
} from '#utils/quickPreview'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = ProductParam
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug } = params

	// Check if we're in quick preview mode and get the changedfiles.json if so
	const quickPreviewManifest = await getQuickPreviewManifest()

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	const productVersionResult = getProductVersionMetadata(productSlug, 'latest')

	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: versionMetadata } = productVersionResult

	const filePath = [
		'content',
		productSlug,
		versionMetadata.version,
		'redirects.jsonc',
	]

	const readFileResult = await findFileWithMetadata(filePath, versionMetadata, {
		loadFromContentDir: process.env.NODE_ENV === 'development',
	})
	if (!readFileResult.ok) {
		// If in quick preview mode, try fetching from production
		if (shouldFetchFromProduction(quickPreviewManifest)) {
			const sourceFile = filePath.join('/')
			if (isFileDeleted(quickPreviewManifest, sourceFile)) {
				console.log(
					`[Quick Preview] Redirects deleted in preview: ${sourceFile}`,
				)
				return new Response('Content deleted in preview', {
					status: 404,
					headers: { 'X-Content-Source': 'deleted' },
				})
			}

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
			}
		}
		return new Response('Not found', { status: 404 })
	}

	const redirects = parseJsonc(readFileResult.value)
	if (!redirects.ok) {
		console.error(
			`API Error: Product, ${productSlug}, redirects.jsonc could not be parsed`,
		)

		return new Response('Server error', { status: 500 })
	}

	return new Response(JSON.stringify(redirects.value), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
