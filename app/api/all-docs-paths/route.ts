/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { errorResultToString } from '#utils/result'
import { getDocsPaths } from '#utils/allDocsPaths'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

export async function GET(req: Request) {
	const url = new URL(req.url)
	const productSlugs = url.searchParams.getAll('products')

	const index = productSlugs.indexOf('ptfe-releases')
	if (index !== -1) {
		productSlugs[index] = 'terraform-enterprise'
	}

	const docsPaths = await getDocsPaths(
		productSlugs.length === 0 ? Object.keys(PRODUCT_CONFIG) : productSlugs,
	)

	if (!docsPaths.ok) {
		console.error(errorResultToString('API', docsPaths))
		return new Response('Not found', { status: 404 })
	}
	return Response.json({
		result: docsPaths.value,
	})
}
