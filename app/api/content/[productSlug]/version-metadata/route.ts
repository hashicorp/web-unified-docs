/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductMetadata } from '#utils/contentVersions'
import { errorResultToString } from '#utils/result'
import { ProductParam } from '#api/types'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = ProductParam

export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug } = params

	const productVersionMetadataResult = getProductMetadata(productSlug)

	if (!productVersionMetadataResult.ok) {
		console.error(errorResultToString('API', productVersionMetadataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({
		result: productVersionMetadataResult.value,
	})
}
