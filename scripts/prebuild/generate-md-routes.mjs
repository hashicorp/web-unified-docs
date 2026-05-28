/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { resolveBasePath } from './generate-llms-txt.mjs'

/**
 * Strip YAML frontmatter from markdown/MDX content.
 */
function stripFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
	if (match) {
		return content.slice(match[0].length)
	}
	return content
}

/**
 * Clean up excessive blank lines.
 */
function cleanupWhitespace(content) {
	return content.replace(/\n{3,}/g, '\n\n').trim() + '\n'
}

/**
 * Convert transformed MDX content to markdown suitable for .md routes.
 * Partials are already inlined by the MDX transform step.
 * JSX components like <Warning>, <Tab>, etc. are left intact.
 */
function mdxToMarkdown(content) {
	let result = stripFrontmatter(content)
	result = cleanupWhitespace(result)
	return result
}

/**
 * Find the latest version for a product.
 */
function findLatestVersion(contentDir, repoSlug, versionMetadata) {
	if (versionMetadata?.[repoSlug]) {
		const latest = versionMetadata[repoSlug].find((v) => v.isLatest)
		if (latest) {
			return latest.version
		}
	}
	const productDir = path.join(contentDir, repoSlug)
	if (!fs.existsSync(productDir)) {
		return null
	}
	const dirs = fs
		.readdirSync(productDir)
		.filter((d) => fs.statSync(path.join(productDir, d)).isDirectory())
		.sort()
	return dirs.at(-1) || null
}

/**
 * Recursively collect all .mdx files in a directory, excluding partials.
 */
function collectMdxFiles(dir, relativeTo = dir) {
	const results = []
	if (!fs.existsSync(dir)) {
		return results
	}

	const entries = fs.readdirSync(dir, { withFileTypes: true })
	for (const entry of entries) {
		if (entry.name === 'partials' || entry.name.startsWith('_')) {
			continue
		}
		const fullPath = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			results.push(...collectMdxFiles(fullPath, relativeTo))
		} else if (entry.name.endsWith('.mdx')) {
			const relativePath = path.relative(relativeTo, fullPath)
			results.push({ fullPath, relativePath })
		}
	}
	return results
}

/**
 * Convert a relative MDX file path to a public docs path.
 * e.g. "overview/what-is-boundary.mdx" -> "overview/what-is-boundary"
 * e.g. "install-boundary/index.mdx" -> "install-boundary"
 */
function mdxPathToDocsPath(relativePath) {
	let docsPath = relativePath.replace(/\.mdx$/, '')
	docsPath = docsPath.replace(/\/index$/, '')
	if (docsPath === 'index') {
		docsPath = ''
	}
	return docsPath
}

/**
 * Generate static .md files for all products, latest version only.
 * Reads from the transformed MDX output (public/content/) where partials
 * have already been inlined by the MDX transform step.
 *
 * Output structure: <outputDir>/<productSlug>/<basePath>/<docsPath>.md
 */
export async function buildMdRoutes(
	transformedContentDir,
	outputDir,
	versionMetadata,
) {
	console.log('\nGenerating .md route files...')

	let totalFiles = 0
	let totalBytes = 0

	for (const [repoSlug, config] of Object.entries(PRODUCT_CONFIG)) {
		const { productSlug, contentDir: repoContentDir, basePaths } = config

		// Determine the version directory within transformed content
		let versionDir
		if (config.versionedDocs === false) {
			versionDir = path.join(transformedContentDir, repoSlug)
		} else {
			const version = findLatestVersion(
				transformedContentDir,
				repoSlug,
				versionMetadata,
			)
			if (!version) {
				continue
			}
			versionDir = path.join(transformedContentDir, repoSlug, version)
		}

		const contentRoot = path.join(versionDir, repoContentDir)
		if (!fs.existsSync(contentRoot)) {
			continue
		}

		// Determine which base paths to process
		// If basePaths is explicit, use those. Otherwise, derive from nav-data files.
		let pathsToProcess
		if (basePaths) {
			pathsToProcess = basePaths
		} else {
			// Infer basePaths from nav-data file names (same as llms.txt)
			const dataDir = path.join(versionDir, 'data')
			if (fs.existsSync(dataDir)) {
				pathsToProcess = fs
					.readdirSync(dataDir)
					.filter((f) => f.endsWith('-nav-data.json'))
					.map((f) => resolveBasePath(f, config))
			} else {
				pathsToProcess = []
			}
		}

		for (const basePath of pathsToProcess) {
			const sourceDir = basePath
				? path.join(contentRoot, basePath)
				: contentRoot

			if (!fs.existsSync(sourceDir)) {
				continue
			}

			const mdxFiles = collectMdxFiles(sourceDir)

			for (const { fullPath, relativePath } of mdxFiles) {
				const docsPath = mdxPathToDocsPath(relativePath)

				// Build output path: <outputDir>/<productSlug>/<basePath>/<docsPath>.md
				const outputSegments = [outputDir, productSlug]
				if (basePath) {
					outputSegments.push(basePath)
				}
				if (docsPath) {
					outputSegments.push(docsPath + '.md')
				} else {
					outputSegments.push('index.md')
				}

				const outputPath = path.join(...outputSegments)

				// Read transformed MDX, strip frontmatter, write as .md
				const mdxContent = fs.readFileSync(fullPath, 'utf-8')
				const markdown = mdxToMarkdown(mdxContent)

				fs.mkdirSync(path.dirname(outputPath), { recursive: true })
				fs.writeFileSync(outputPath, markdown, 'utf-8')

				totalFiles++
				totalBytes += Buffer.byteLength(markdown)
			}
		}
	}

	console.log(
		`  Generated ${totalFiles} .md files (${(totalBytes / 1024 / 1024).toFixed(1)} MB total)`,
	)
}
