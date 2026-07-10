/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductVersionMetadata } from '#utils/contentVersions'
import { findFileWithMetadata, parseJsonc } from '#utils/file'
import { createInstanaErrorResponse } from '#utils/instana'
import { errorResultToString } from '#utils/result'
import { ProductParam } from '#api/types'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = ProductParam
export async function GET(
	request: Request,
	{ params }: { params: Promise<GetParams> },
) {
	const { productSlug } = await params

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

	const productVersionResult = getProductVersionMetadata(productSlug, 'latest')

	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Version metadata lookup failed for ${productSlug}@latest`,
			attributes: {
				'error.kind': 'version_not_found',
				'product.slug': productSlug,
			},
			body: 'Not found',
		})
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
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Redirects file not found for ${productSlug}@${versionMetadata.version}`,
			attributes: {
				'error.kind': 'redirects_not_found',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
			},
			body: 'Not found',
		})
	}

	const redirects = parseJsonc(readFileResult.value.text)
	if (!redirects.ok) {
		console.error(
			`API Error: Product, ${productSlug}, redirects.jsonc could not be parsed`,
		)

		return createInstanaErrorResponse(request, {
			status: 500,
			message: `Redirects file could not be parsed for ${productSlug}@${versionMetadata.version}`,
			attributes: {
				'error.kind': 'redirects_parse_error',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
			},
			body: 'Server error',
		})
	}

	return new Response(JSON.stringify(redirects.value), {
		headers: {
			'content-type': 'application/json',
			'served-from': readFileResult.value.servedFrom,
		},
	})
}
