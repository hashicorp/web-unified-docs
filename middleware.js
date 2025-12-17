/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { NextResponse } from 'next/server'
import { quickPreviewMiddleware } from './app/middleware/quickPreview.js'

/**
 * @typedef {import('next/server').NextRequest} NextRequest
 * @typedef {import('next/server').NextResponse} NextResponse
 */

/**
 * Main middleware - composes multiple middleware handlers
 * @param {NextRequest} request
 *
 * @return {Promise<NextResponse>}
 */
export async function middleware(request) {
	const { url, nextUrl } = request

	// 1. Handle ptfe-releases rewrite (existing functionality)
	if (
		url.includes('/ptfe-releases/') ||
		nextUrl.pathname.startsWith('/api/content/ptfe-releases/') ||
		nextUrl.pathname.startsWith('/api/assets/ptfe-releases/')
	) {
		return NextResponse.rewrite(
			new URL(url.replace('ptfe-releases', 'terraform-enterprise')),
		)
	}

	// 2. Handle Quick Preview asset proxying (new functionality)
	const quickPreviewResponse = await quickPreviewMiddleware(request)
	if (quickPreviewResponse) {
		return quickPreviewResponse
	}

	// 3. Default: continue to next handler
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/api/content/ptfe-releases/:path*',
		'/api/assets/ptfe-releases/:path*',
		// Quick Preview: match all paths except API routes
		'/((?!api|_next/image|favicon.ico).*)',
	],
}
