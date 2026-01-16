/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getAssetData, joinFilePath } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { VersionedProduct } from '#api/types'
import {
	getQuickPreviewManifest,
	fetchFromProduction,
	isFileDeleted,
	shouldFetchFromProduction,
} from '#utils/quickPreview'

export type GetParams = VersionedProduct & {
	/**
	 * Full path to the asset in the production build, i.e. `terraform/v1.9.x/img/docs/plan-comments.png`
	 */
	assetPath: string[]
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, assetPath } = params

	// Check if we're in quick preview mode and get the changedfiles.json if so
	const quickPreviewManifest = await getQuickPreviewManifest()

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	const productVersionResult = getProductVersionMetadata(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: versionMetadata } = productVersionResult

	const parsedAssetPath = joinFilePath(assetPath)

	const assetLoc = [
		`assets`,
		productSlug,
		versionMetadata.version,
		parsedAssetPath,
	]
	const assetData = await getAssetData(assetLoc, versionMetadata)

	if (!assetData.ok) {
		// If in quick preview mode, try fetching from production
		if (shouldFetchFromProduction(quickPreviewManifest)) {
			const sourceFile = assetLoc.join('/')
			if (isFileDeleted(quickPreviewManifest, sourceFile)) {
				console.log(`[Quick Preview] Asset deleted in preview: ${sourceFile}`)
				return new Response('Asset deleted in preview', {
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
					const productionContent = await productionResponse.arrayBuffer()

					return new Response(productionContent, {
						status: productionResponse.status,
						headers: {
							'Content-Type':
								productionResponse.headers.get('content-type') ||
								'application/octet-stream',
							'X-Content-Source': 'production',
							'X-Preview-Fallback': 'true',
						},
					})
				}
			} catch (error) {
				console.error('[Quick Preview] Production fetch failed:', error)
			}
		}

		console.error(`API Error: No asset found at ${assetLoc}`)
		return new Response('Not found', { status: 404 })
	}

	// TODO: should we add caching headers?
	return new Response(new Uint8Array(assetData.value.buffer), {
		headers: {
			'Content-Type': assetData.value.contentType,
		},
	})
}
