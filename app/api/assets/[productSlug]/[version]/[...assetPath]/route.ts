/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getAssetData, joinFilePath } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { createInstanaErrorResponse } from '#utils/instana'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { VersionedProduct } from '#api/types'

export type GetParams = VersionedProduct & {
	/**
	 * Full path to the asset in the production build, i.e. `terraform/v1.9.x/img/docs/plan-comments.png`
	 */
	assetPath: string[]
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<GetParams> },
) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, assetPath } = await params

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

	const parsedAssetPath = joinFilePath(assetPath)

	const assetLoc = [
		`assets`,
		productSlug,
		versionMetadata.version,
		parsedAssetPath,
	]
	const assetData = await getAssetData(assetLoc, versionMetadata)

	if (!assetData.ok) {
		console.error(`API Error: No asset found at ${assetLoc}`)
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Asset not found at ${assetLoc.join('/')}`,
			attributes: {
				'error.kind': 'asset_not_found',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
			},
			body: 'Not found',
		})
	}

	// TODO: should we add caching headers?
	return new Response(assetData.value.buffer, {
		headers: {
			'content-type': assetData.value.contentType,
			'served-from': assetData.value.servedFrom,
		},
	})
}
