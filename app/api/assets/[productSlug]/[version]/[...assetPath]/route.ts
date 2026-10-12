/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getAssetData, joinFilePath } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { getMetadata } from '#utils/metadata'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import type { AssetRouteParams } from '#types'

export async function GET(
	request: Request,
	{ params }: { params: Promise<AssetRouteParams> },
) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, assetPath } = await params

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	const { versionMetadata: productVersions } = await getMetadata()
	const productVersionResult = getProductVersionMetadata(
		productSlug,
		version,
		productVersions,
	)
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
		console.error(`API Error: No asset found at ${assetLoc}`)
		return new Response('Not found', { status: 404 })
	}

	// TODO: should we add caching headers?
	return new Response(assetData.value.buffer, {
		headers: {
			'content-type': assetData.value.contentType,
			'served-from': assetData.value.servedFrom,
		},
	})
}
