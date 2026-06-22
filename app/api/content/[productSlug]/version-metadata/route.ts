/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductMetadata } from '#utils/contentVersions'
import { createInstanaErrorResponse } from '#utils/instana'
import { errorResultToString } from '#utils/result'
import { ProductParam } from '#api/types'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = ProductParam

export async function GET(
	request: Request,
	{ params }: { params: Promise<GetParams> },
) {
	const { productSlug } = await params

	const productVersionMetadataResult = getProductMetadata(productSlug)

	if (!productVersionMetadataResult.ok) {
		console.error(errorResultToString('API', productVersionMetadataResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Product metadata lookup failed for ${productSlug}`,
			attributes: {
				'error.kind': 'product_metadata_not_found',
				'product.slug': productSlug,
			},
			body: 'Not found',
		})
	}

	return Response.json({
		result: productVersionMetadataResult.value,
	})
}
