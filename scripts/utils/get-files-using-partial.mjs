/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'

/**
 * Recursively walks a directory and returns all .mdx file paths.
 *
 * @param {string} dir - Directory to walk (relative or absolute)
 * @returns {string[]} Array of .mdx file paths
 */
function walkMdxFiles(dir) {
	const results = []
	if (!fs.existsSync(dir)) {
		return results
	}

	const entries = fs.readdirSync(dir, { withFileTypes: true })
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			results.push(...walkMdxFiles(fullPath))
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			results.push(fullPath)
		}
	}
	return results
}

/**
 * Escapes regex metacharacters in a string.
 *
 * @param {string} value - String to escape
 * @returns {string} Escaped string safe for use in a RegExp pattern
 */
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Filters a list of files to those whose content matches any of the given patterns.
 *
 * @param {string[]} files - List of file paths to search
 * @param {...(string | RegExp)} searchPatterns - One or more string or regex patterns, matched with OR logic
 * @returns {string[]} Files that contain at least one of the search patterns
 */
function filesContaining(files, ...searchPatterns) {
	return files
		.filter((file) => {
			const content = fs.readFileSync(file, 'utf-8')
			return searchPatterns.some((pattern) => {
				if (pattern instanceof RegExp) {
					if (pattern.global || pattern.sticky) {
						pattern.lastIndex = 0
					}
					return pattern.test(content)
				}

				return content.includes(pattern)
			})
		})
		.map((f) => {
			// Normalize to forward slashes for consistency across platforms
			return f.replace(/\\/g, '/')
		})
}

/**
 * Given a partial file path, returns all MDX files that @include it.
 *
 * Handles three scenarios:
 *
 * 1. **Normal Partials** — partial lives under the same product *and* version:
 *    `content/{product}/{version}/content/partials/...`
 *    Files reference it with `@include "{rel-from-partials-root}"`.
 *
 * 2. **Legacy Global Partials** — partial lives under the same product but
 *    is shared across versions:
 *    `content/{product}/global/partials/...`
 *    Files reference it with a relative path that ends in
 *    `global/partials/{rel-path}`.
 *
 * 3. **Global Namespaced Partials** — partial lives in the top-level global
 *    directory and is shared across all products:
 *    `content/global/partials/...`
 *    Files reference it with `@include "@global/{rel-path}"`.
 *
 * @param {string} partialPath - Workspace-relative path to the partial file
 * @returns {string[]} Workspace-relative paths of files that use this partial
 */
export function getFilesUsingPartial(partialPath) {
	const normalized = partialPath.replace(/\\/g, '/')
	const parts = normalized.split('/')
	// parts[0] = 'content', parts[1] = product

	// ── Scenario 3: Global Namespaced Partial ─────────────────────────────────
	// Pattern: content/global/partials/{rel-path}
	// Include: @include "@global/{rel-path}" or @include '@global/{rel-path}'
	if (parts[1] === 'global' && parts[2] === 'partials') {
		const relPath = parts.slice(3).join('/')
		const allFiles = walkMdxFiles('content')

		return filesContaining(
			allFiles,
			`@include "@global/${relPath}"`,
			`@include '@global/${relPath}'`,
		)
	}

	const product = parts[1] // e.g. 'vault'

	// ── Scenario 2: Legacy Global Partial ─────────────────────────────────────
	// Pattern: content/{product}/global/partials/{rel-path}
	// Include: a relative path (single or double quoted) whose suffix is
	// `global/partials/{rel-path}`. Quote-agnostic because we match the substring
	// between the quotes, not the quotes themselves.
	if (parts[2] === 'global' && parts[3] === 'partials') {
		const relPath = parts.slice(4).join('/')
		const allFiles = walkMdxFiles(`content/${product}`)
		const relPathPattern = escapeRegExp(relPath)
		const searchPattern = RegExp(
			`@include\\s+["'](?:\\.\\./)+global/partials/${relPathPattern}["']`,
		)

		return filesContaining(allFiles, searchPattern)
	}

	// ── Scenario 1: Normal Partial ─────────────────────────────────────────────
	// Pattern: content/{product}/{version}/content/partials/{rel-path}
	// Include: @include "{rel-path}" or @include '{rel-path}'
	const version = parts[2] // e.g. 'v1.21.x'
	const searchDir = `content/${product}/${version}`

	// Derive the relative path within the partials directory from the given path.
	// parts: content / product / version / content / partials / ...rel-path...
	const relFromPartialsRoot = parts.slice(5).join('/')

	const allFiles = walkMdxFiles(searchDir)
	return filesContaining(
		allFiles,
		`@include "${relFromPartialsRoot}"`,
		`@include '${relFromPartialsRoot}'`,
	)
}
