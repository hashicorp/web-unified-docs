/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { NextResponse } from 'next/server'

/**
 * @typedef {import('next/server').NextRequest} NextRequest
 * @typedef {import('next/server').NextResponse} NextResponse
 */

/**
 * Handle repository-to-product slug mapping and legacy redirects
 * @param {NextRequest} request
 * @return {NextResponse}
 */
export const middleware = (request) => {
	const { url: requestUrl } = request
	const url = new URL(requestUrl)

	// Handle ptfe-releases → terraform-enterprise mapping
	if (url.pathname.includes('/ptfe-releases/')) {
		const rewriteUrl = new URL(
			url.toString().replace('ptfe-releases', 'terraform-enterprise'),
		)
		return NextResponse.rewrite(rewriteUrl)
	}

	// Handle terraform-docs-common repository mapping
	// Note: We keep the repository name in the API path since that's how content is organized
	// The product slug mapping is handled in the productConfig

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/api/content/ptfe-releases/:path*',
		'/api/assets/ptfe-releases/:path*',
		'/api/content/terraform-docs-common/:path*',
	],
}
