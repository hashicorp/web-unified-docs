#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 *
 * Quick validation script for Quick Preview infrastructure
 */

// This probably has to go byebye at some point

import fs from 'fs'
import path from 'path'

console.log('🔍 Validating Quick Preview Infrastructure...\n')

const checks = []

// Check 1: Change detection script exists
const detectScript = path.join(
	process.cwd(),
	'scripts/quick-preview/detect-changes.mjs',
)
checks.push({
	name: 'Change detection script',
	path: detectScript,
	exists: fs.existsSync(detectScript),
})

// Check 2: Selective prebuild script exists
const selectivePrebuild = path.join(
	process.cwd(),
	'scripts/quick-preview/selective-prebuild.mjs',
)
checks.push({
	name: 'Selective prebuild script',
	path: selectivePrebuild,
	exists: fs.existsSync(selectivePrebuild),
})

// Check 3: Quick preview utilities exist
const quickPreviewUtils = path.join(process.cwd(), 'app/utils/quickPreview.ts')
checks.push({
	name: 'Quick preview utilities',
	path: quickPreviewUtils,
	exists: fs.existsSync(quickPreviewUtils),
})

// Check 3: Package.json has new scripts
const packageJson = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'),
)
checks.push({
	name: 'npm script: dev:quick-preview',
	path: 'package.json',
	exists: !!packageJson.scripts['dev:quick-preview'],
})
checks.push({
	name: 'npm script: quick-preview:detect',
	path: 'package.json',
	exists: !!packageJson.scripts['quick-preview:detect'],
})
checks.push({
	name: 'npm script: quick-preview:build',
	path: 'package.json',
	exists: !!packageJson.scripts['quick-preview:build'],
})

// Check 4: API route has quick preview logic
const apiRoute = path.join(
	process.cwd(),
	'app/api/content/[productSlug]/doc/[version]/[...docsPath]/route.ts',
)
const apiRouteContent = fs.readFileSync(apiRoute, 'utf-8')
checks.push({
	name: 'API route imports quick preview utils',
	path: apiRoute,
	exists: apiRouteContent.includes('quickPreview'),
})

// Check 5: Quick Preview middleware exists
const quickPreviewMiddleware = path.join(
	process.cwd(),
	'app/middleware/quickPreview.js',
)
checks.push({
	name: 'Quick Preview middleware (asset proxying)',
	path: quickPreviewMiddleware,
	exists: fs.existsSync(quickPreviewMiddleware),
})

// Check 6: Main middleware imports Quick Preview
const mainMiddleware = path.join(process.cwd(), 'middleware.js')
const mainMiddlewareContent = fs.readFileSync(mainMiddleware, 'utf-8')
checks.push({
	name: 'Main middleware imports quickPreviewMiddleware',
	path: mainMiddleware,
	exists: mainMiddlewareContent.includes('quickPreviewMiddleware'),
})

// Print results
let allPassed = true
checks.forEach((check) => {
	const status = check.exists ? '✅' : '❌'
	console.log(`${status} ${check.name}`)
	if (!check.exists) {
		console.log(`   Missing: ${check.path}`)
		allPassed = false
	}
})

console.log('\n' + '='.repeat(60))

if (allPassed) {
	console.log('✅ All checks passed! Quick Preview infrastructure is ready.\n')
	console.log('Next steps:')
	console.log('  1. Run: npm run dev:quick-preview')
	console.log('  2. Navigate to: http://localhost:8080')
	console.log('  3. All content should load from production')
	console.log(
		'  4. Check terminal logs for: [Quick Preview] Fetching from production\n',
	)
	console.log('Environment variables:')
	console.log(
		'  QUICK_PREVIEW_FALLBACK_URL - Backend URL (default: web-unified-docs-hashicorp.vercel.app)\n',
	)
	process.exit(0)
} else {
	console.log('❌ Some checks failed. Please review the missing files.\n')
	process.exit(1)
}
