#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'

const OUTPUT_FILE = path.join(process.cwd(), 'public', 'changedfiles.json')

/**
 * Generates a mock manifest for testing Quick Preview infrastructure
 * This marks the build as "quick preview" mode with zero changed files,
 * meaning ALL content will be proxied from production
 */
function generateMockManifest() {
	const manifest = {
		generated: new Date().toISOString(),
		baseBranch: 'main',
		quickPreview: true,
		mode: 'mock',
		stats: {
			changed: 0,
			deleted: 0,
			impactedProducts: 0,
		},
		files: {
			changed: [],
			deleted: [],
		},
		products: {
			impacted: [],
			requiresFullRebuild: false,
		},
		message:
			'Mock manifest for testing Quick Preview infrastructure. All content will be served from production.',
	}

	// Ensure output directory exists
	const outputDir = path.dirname(OUTPUT_FILE)
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true })
	}

	// Write manifest
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2))

	console.log('🎭 Mock Quick Preview Manifest Generated:')
	console.log(`   Location: ${OUTPUT_FILE}`)
	console.log(`   Mode: Testing infrastructure`)
	console.log(`   Changed files: 0 (all content from production)`)
	console.log('')
	console.log(
		'✅ You can now run the dev server and all content will be proxied from production.',
	)

	return manifest
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	generateMockManifest()
}

export { generateMockManifest }
