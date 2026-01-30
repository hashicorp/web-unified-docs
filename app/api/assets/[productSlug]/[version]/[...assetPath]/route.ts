/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getAssetData, joinFilePath } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { errorResultToString } from '#utils/result'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { VersionedProduct } from '#api/types'

export type GetParams = VersionedProduct & {
	/**
	 * Full path to the asset in the production build, i.e. `terraform/v1.9.x/img/docs/plan-comments.png`
	 */
	assetPath: string[]
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, assetPath } = params

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
		console.error(`API Error: No asset found at ${assetLoc}`)
		return new Response('Not found', { status: 404 })
	}

	// TODO: should we add caching headers?
	return new Response(assetData.value.buffer, {
		headers: {
			'Content-Type': assetData.value.contentType,
		},
	})
}
