/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { findDocVersions } from '#utils/findDocVersions'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

export async function GET(request: Request) {
	const url = new URL(request.url)
	let product = url.searchParams.get('product')
	const fullPath = url.searchParams.get('fullPath')

	if (product === 'ptfe-releases') {
		product = 'terraform-enterprise'
	}

	// If a `product` parameter has not been provided, return a 400
	if (!product) {
		return new Response(
			'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
			{ status: 400 },
		)
	}
	// If a `fullPath` parameter has not been provided, return a 400
	if (!fullPath) {
		return new Response(
			'Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.',
			{ status: 400 },
		)
	}

	if (!Object.keys(PRODUCT_CONFIG).includes(product)) {
		console.error(`API Error: Product, ${product}, not found in contentDirMap`)
		return new Response('Not found', { status: 404 })
	}
	/**
	 * reformat fullPath to searchable file path
	 * e.g. doc#cdktf/api-reference/python/classes -> api-reference/python/classes
	 */
	const splitPath = fullPath.split('#')
	const basePath = PRODUCT_CONFIG[product].basePaths?.find(
		(basePath: string) => {
			return splitPath[1].startsWith(`${basePath}`)
		},
	)
	let fileNameQuery = splitPath[1].replace(basePath, '')
	if (fileNameQuery.startsWith('/')) {
		fileNameQuery = fileNameQuery.slice(1)
	}
	const versions = findDocVersions(product, fileNameQuery)
	/**
	 * return either A) versions array or B) an empty array (if no content matches the query params)
	 * this matches the current Content API behaviour
	 */
	return Response.json({
		versions,
	})
}
