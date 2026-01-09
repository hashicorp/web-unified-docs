/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductVersionMetadata } from '#utils/contentVersions'
import { findFileWithMetadata, parseJsonc } from '#utils/file'
import { errorResultToString } from '#utils/result'
import { ProductParam } from '#api/types'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = ProductParam
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug } = params

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
