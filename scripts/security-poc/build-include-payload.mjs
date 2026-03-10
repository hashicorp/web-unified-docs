/**
 * Build an `@include` payload that resolves from this repo's MDX partials root
 * to an arbitrary target file. This mirrors the workflow/build behavior closely
 * enough for a lab PoC without touching production secrets.
 *
 * Usage:
 *   node scripts/security-poc/build-include-payload.mjs <content-file> <target-file>
 *
 * Example:
 *   node scripts/security-poc/build-include-payload.mjs \
 *     content/packer/v1.14.x/content/docs/debugging.mdx \
 *     .vercel/.env.preview.local
 */

import path from 'node:path'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

const [, , contentFileArg, targetFileArg] = process.argv

if (!contentFileArg || !targetFileArg) {
	console.error(
		'Usage: node scripts/security-poc/build-include-payload.mjs <content-file> <target-file>',
	)
	process.exit(1)
}

const repoRoot = process.cwd()
const normalizedContentFile = contentFileArg.replace(/\\/g, '/')
const contentSegments = normalizedContentFile.split('/')

if (contentSegments[0] !== 'content' || contentSegments.length < 5) {
	console.error(
		`Expected a repo content path like content/<product>/<version-or-contentDir>/...; got: ${contentFileArg}`,
	)
	process.exit(1)
}

const [, repoSlug, versionOrContentDir, maybeContentDir] = contentSegments
const productConfig = PRODUCT_CONFIG[repoSlug]

if (!productConfig) {
	console.error(`Unknown product slug in path: ${repoSlug}`)
	process.exit(1)
}

const version = productConfig.versionedDocs ? versionOrContentDir : ''
const contentDir = productConfig.versionedDocs
	? maybeContentDir
	: versionOrContentDir

const partialsDir = path.join(repoRoot, 'content', repoSlug, version, contentDir, 'partials')
const targetPath = path.resolve(repoRoot, targetFileArg)
const includePath = path.relative(partialsDir, targetPath).replace(/\\/g, '/')

console.log(`content file: ${normalizedContentFile}`)
console.log(`partials dir: ${path.relative(repoRoot, partialsDir).replace(/\\/g, '/')}`)
console.log(`target file: ${path.relative(repoRoot, targetPath).replace(/\\/g, '/')}`)
console.log('')
console.log(`@include '${includePath}'`)
