/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { findFileWithMetadata, parseJson } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { createInstanaErrorResponse } from '#utils/instana'
import { errorResultToString } from '#utils/result'
import { VersionedProduct } from '#api/types'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = VersionedProduct & {
	/**
	 * An array of strings representing the path relative to `content/<productSlug>/nav-data/<version>/data`
	 * @example ['cli']
	 */
	section: string[]
}
export async function GET(
	request: Request,
	{ params }: { params: Promise<GetParams> },
) {
	const { productSlug, version, section } = await params
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

	const sectionPath = section.join('/')

	const readFileResult = await findFileWithMetadata(
		[
			'content',
			productSlug,
			versionMetadata.version,
			'data',
			`${sectionPath}-nav-data.json`,
		],
		versionMetadata,
	)

	if (!readFileResult.ok) {
		console.error(errorResultToString('API', readFileResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Nav data file not found for ${productSlug}@${versionMetadata.version}/${sectionPath}`,
			attributes: {
				'error.kind': 'nav_data_not_found',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
				'nav.section': sectionPath,
			},
			body: 'Not found',
		})
	}

	const fileData = readFileResult.value.text
	const navDataResult = parseJson(fileData)

	if (!navDataResult.ok) {
		console.error(errorResultToString('API', navDataResult))
		return createInstanaErrorResponse(request, {
			status: 404,
			message: `Nav data could not be parsed for ${productSlug}@${versionMetadata.version}/${sectionPath}`,
			attributes: {
				'error.kind': 'nav_data_parse_error',
				'product.slug': productSlug,
				'product.version': versionMetadata.version,
				'nav.section': sectionPath,
			},
			body: 'Not found',
		})
	}

	return new Response(
		JSON.stringify({ result: { navData: navDataResult.value } }),
		{
			headers: {
				'content-type': 'application/json',
				'served-from': readFileResult.value.servedFrom,
			},
		},
	)
}
