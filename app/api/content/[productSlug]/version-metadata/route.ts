/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductMetadata } from '#utils/contentVersions'
import { getMetadata } from '#utils/metadata'
import { errorResultToString } from '#utils/result'
import type { ProductParam } from '#types'

export async function GET(
	request: Request,
	{ params }: { params: Promise<ProductParam> },
) {
	const { productSlug } = await params

	const { versionMetadata } = await getMetadata()
	const productVersionMetadataResult = getProductMetadata(
		productSlug,
		versionMetadata,
	)

	if (!productVersionMetadataResult.ok) {
		console.error(errorResultToString('API', productVersionMetadataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({
		result: productVersionMetadataResult.value,
	})
}
