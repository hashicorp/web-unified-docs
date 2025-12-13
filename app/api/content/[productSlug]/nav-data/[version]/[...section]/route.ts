/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { findFileWithMetadata, parseJson } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
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
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug, version, section } = params
	const productVersionResult = getProductVersionMetadata(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
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
		return new Response('Not found', { status: 404 })
	}

	const fileData = readFileResult.value
	const navDataResult = parseJson(fileData)

	if (!navDataResult.ok) {
		console.error(errorResultToString('API', navDataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({ result: { navData: navDataResult.value } })
}
