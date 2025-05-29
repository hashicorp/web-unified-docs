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
 * Rewrite requests for /ptfe-releases/* content to /terraform-enterprise/*
 * @param {NextRequest} request
 *
 * @return {NextResponse}
 */
export function middleware({ url }) {
	if (url.includes('ptfe-releases')) {
		return NextResponse.redirect(
			url.replace('ptfe-releases', 'terraform-enterprise'),
		)
	}
}

export const config = {
	matcher: [
		'/api/content/ptfe-releases/:path*',
		'/api/assets/ptfe-releases/:path*',
		'/api/all-docs-paths',
		'/api/content-versions',
	],
}
