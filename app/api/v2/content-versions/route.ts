/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import docsPathsAllVersions from '../../docsPathsAllVersions.json'

export async function GET(request: Request) {
	const url = new URL(request.url)
	let product = url.searchParams.get('product')
	const id = url.searchParams.get('id')

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
	if (!id) {
		return new Response(
			'Missing `id` query parameter.',
			{ status: 400 },
		)
	}

	if (!Object.keys(PRODUCT_CONFIG).includes(product)) {
		console.error(`API Error: Product, ${product}, not found in contentDirMap`)
		return new Response('Not found', { status: 404 })
	}

	// Get all versions for the given product
	const productVersions = docsPathsAllVersions[product] || {}

	// Find versions where the id exists in the docs
	const versions = Object.entries(productVersions)
		.reduce((acc, [version, docs]: [string, any[]]) => {
			const doc = (docs as any[]).find((doc) => doc.id === id)
			if (doc) {
				acc.push({
					version,
					path: doc?.path,
				})
			}

			return acc
		}, [])

	return Response.json({
		versions,
	})
}
