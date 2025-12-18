/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs/promises'
import path from 'path'

// Production API URL - defaults to Vercel preview URL
// In production, this would be the actual production API backend
const PRODUCTION_URL =
	process.env.QUICK_PREVIEW_FALLBACK_URL ||
	'https://web-unified-docs-hashicorp.vercel.app'
const CHANGED_FILES_MANIFEST = 'public/changedfiles.json'

interface ChangedFilesManifest {
	quickPreview: boolean
	mode?: string
	baseBranch?: string
	timestamp?: string
	stats?: {
		changed: number
		deleted: number
		docs: number
		navData: number
		redirects: number
		assets: number
	}
	changed: {
		docs: string[]
		navData: string[]
		redirects: string[]
		assets: string[]
		other: string[]
	}
	deleted: {
		docs: string[]
		navData: string[]
		redirects: string[]
		assets: string[]
		other: string[]
	}
}

let manifestCache: ChangedFilesManifest | null = null
let manifestLoadTime = 0

/**
 * Gets the quick preview manifest if it exists
 * Caches for 5 seconds to avoid repeated disk reads
 */
export async function getQuickPreviewManifest(): Promise<ChangedFilesManifest | null> {
	// Quick Preview must be explicitly enabled
	if (process.env.QUICK_PREVIEW !== 'true') {
		return null
	}

	try {
		// Cache manifest for 5 seconds to avoid repeated reads
		const now = Date.now()
		if (manifestCache && now - manifestLoadTime < 5000) {
			return manifestCache
		}

		const manifestPath = path.join(process.cwd(), CHANGED_FILES_MANIFEST)
		const content = await fs.readFile(manifestPath, 'utf-8')
		manifestCache = JSON.parse(content)
		manifestLoadTime = now

		return manifestCache
	} catch {
		// No manifest = not a quick preview
		return null
	}
}

/**
 * Fetches content from production site
 * Used as fallback when content isn't available in preview
 */
export async function fetchFromProduction(
	productionPath: string,
): Promise<Response> {
	const productionUrl = `${PRODUCTION_URL}${productionPath}`

	console.log(`[Quick Preview] Fetching from production: ${productionPath}`)

	try {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => {
			controller.abort()
		}, 10000) // 10s timeout

		const response = await fetch(productionUrl, {
			signal: controller.signal,
			headers: {
				'User-Agent': 'HashiCorp-Preview-Build/1.0',
			},
			// Cache for the duration of the preview
			next: { revalidate: 3600 },
		})

		clearTimeout(timeoutId)

		return response
	} catch (error) {
		console.error(
			'[Quick Preview] Failed to fetch from production: %s',
			productionPath,
			error,
		)
		throw error
	}
}

/**
 * Checks if a file was deleted in this preview
 */
export function isFileDeleted(
	manifest: ChangedFilesManifest | null,
	filePath: string,
): boolean {
	if (!manifest?.quickPreview || !manifest?.deleted) {
		return false
	}

	return manifest.deleted.docs?.includes(filePath) ?? false
}

/**
 * Checks if we should try to fetch from production
 */
export function shouldFetchFromProduction(
	manifest: ChangedFilesManifest | null,
): boolean {
	return manifest?.quickPreview === true
}
