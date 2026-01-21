/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 *
 * Quick Preview middleware
 * Proxies missing static assets from production in Quick Preview mode
 */

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * @typedef {import('next/server').NextRequest} NextRequest
 */

const PRODUCTION_URL =
	process.env.QUICK_PREVIEW_FALLBACK_URL ||
	'https://web-unified-docs-hashicorp.vercel.app'

const QUICK_PREVIEW_ENABLED = process.env.QUICK_PREVIEW === 'true'

/**
 * Check if quick preview mode is enabled by looking for the manifest
 */
function isQuickPreviewEnabled() {
	if (!QUICK_PREVIEW_ENABLED) {
		return false
	}

	try {
		const manifestPath = path.join(process.cwd(), 'public', 'changedfiles.json')
		const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
		return manifest.quickPreview === true
	} catch {
		return false
	}
}

/**
 * Check if a file exists in the public directory
 */
function fileExists(publicPath) {
	try {
		const fullPath = path.join(process.cwd(), 'public', publicPath)
		return fs.existsSync(fullPath)
	} catch {
		return false
	}
}

/**
 * Proxy a request to production
 * @param {NextRequest} request
 */
async function proxyFromProduction(request) {
	const pathname = new URL(request.url).pathname
	const productionUrl = `${PRODUCTION_URL}${pathname}`

	console.log(`[Quick Preview] Proxying asset from production: ${pathname}`)
	console.log(`[Quick Preview] Production URL: ${productionUrl}`)

	try {
		const response = await fetch(productionUrl, {
			headers: {
				'User-Agent': 'HashiCorp-Preview-Build/1.0',
			},
		})

		console.log(
			`[Quick Preview] Production response status: ${response.status}`,
		)

		if (!response.ok) {
			console.log(
				`[Quick Preview] Asset not found in production: ${pathname} (${response.status})`,
			)
			return new NextResponse('Not found', { status: 404 })
		}

		// Create new response with production content
		const contentType =
			response.headers.get('content-type') || 'application/octet-stream'
		const body = await response.arrayBuffer()

		console.log(
			`[Quick Preview] Successfully proxied ${pathname} (${body.byteLength} bytes, ${contentType})`,
		)

		return new NextResponse(body, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'X-Content-Source': 'production',
				'X-Preview-Fallback': 'true',
				'Cache-Control': 'public, max-age=3600',
			},
		})
	} catch (error) {
		console.error(`[Quick Preview] Failed to proxy asset: ${pathname}`, error)
		return new NextResponse('Failed to fetch from production', { status: 502 })
	}
}

/**
 * Quick Preview middleware handler
 * @param {NextRequest} request
 * @returns {Promise<NextResponse|null>} Response if handled, null to pass through
 */
export async function quickPreviewMiddleware(request) {
	// Only run in Quick Preview mode
	if (!isQuickPreviewEnabled()) {
		return null
	}

	const pathname = request.nextUrl.pathname

	// Only handle requests for static assets
	const isStaticAsset =
		pathname.startsWith('/assets/') ||
		pathname.startsWith('/_next/static/') ||
		pathname.startsWith('/content/') ||
		/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot|css|js|json)$/i.test(
			pathname,
		)

	if (!isStaticAsset) {
		return null
	}

	// Check if file exists locally
	const publicPath = pathname.startsWith('/') ? pathname.slice(1) : pathname

	if (fileExists(publicPath)) {
		// File exists locally, let Next.js handle it
		return null
	}

	// File doesn't exist locally, proxy from production
	return proxyFromProduction(request)
}
