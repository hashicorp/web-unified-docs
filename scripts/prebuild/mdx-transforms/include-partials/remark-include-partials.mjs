/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'node:fs'
import path from 'node:path'

import remark from 'remark'
import flatMap from 'unist-util-flatmap'

// Module-level cache that persists across all plugin instances
const includeCache = new Map()
export const totalFilesCached = () => {
	return includeCache.size
}
export let totalCacheHits = 0

/**
 * Estimate the memory size of an object in bytes
 */
function estimateObjectSize(obj) {
	function sizeOf(obj) {
		if (obj === null || obj === undefined) {
			return 0
		}

		switch (typeof obj) {
			case 'number':
				return 8
			case 'string':
				return obj.length * 2 // UTF-16 encoding
			case 'boolean':
				return 4
			case 'object':
				if (Array.isArray(obj)) {
					return obj.reduce((sum, item) => {
						return sum + sizeOf(item)
					}, 0)
				} else {
					return Object.keys(obj).reduce((sum, key) => {
						return sum + sizeOf(key) + sizeOf(obj[key])
					}, 0)
				}
			default:
				return 0
		}
	}

	return sizeOf(obj)
}

/**
 * Get the estimated cache size in MB
 */
export const getCacheSizeMB = () => {
	let totalBytes = 0

	for (const [key, value] of includeCache) {
		totalBytes += estimateObjectSize(key) + estimateObjectSize(value)
	}

	return (totalBytes / (1024 * 1024)).toFixed(2)
}

/**
 * A remark plugin that allows including "partials" into other files.
 *
 * Partials are expected to be located in the provided `partialsDir`.
 *
 * Include statements must match the regex /^@include\s['"](.*)['"]$/.
 * More specifically:
 * - The path must be relative to the `partialsDir`.
 * - The path must be wrapped in single or double quotes.
 * - The path must include the file extension.
 * - There must be no other content or whitespace around the `@include`.
 * Example: `@include 'path/to/file.mdx'` or `@include "path/to/file.mdx"`
 */
export function remarkIncludePartialsPlugin({ partialsDir, filePath }) {
	// If the partialsDir has not been provided, throw an error.
	if (!partialsDir) {
		throw new Error(
			'Error in remarkIncludePartials: The partialsDir argument is required. Please provide the path to the partials directory.',
		)
	}

	// Set up and return the transformer function to be used as a remark plugin
	return function transformer(tree) {
		/**
		 * Note: We use flapMap, as we expect to replace single MDX paragraph nodes
		 * with detected `@include` statements with the contents of the included
		 * file, which will yield an MDX AST with multiple nodes.
		 */
		return flatMap(tree, (node) => {
			// We only allow `@include` statements in paragraph nodes, so skip others
			if (node.type !== 'paragraph') {
				return [node]
			}
			/**
			 * Detect an `@include` statement in the paragraph using a regex.
			 * Include statements follow a strict format.
			 */
			const includeRegex = /^@include\s['"](.*)['"]$/
			const includeMatch = node.children[0].value?.match(includeRegex)
			// If we do not detect an `@include` statement, return the node unchanged
			if (!includeMatch) {
				return [node]
			}
			/**
			 * Attempt to read the file contents.
			 * If successful, we continue. If we fail, we throw an error, which
			 * should block our build from proceeding.
			 */

			const includePath = path.join(partialsDir, includeMatch[1])
			let cacheEntry

			// Check if file contents are already cached
			if (includeCache.has(includePath)) {
				cacheEntry = includeCache.get(includePath)
				totalCacheHits++
			} else {
				try {
					const includeContents = fs.readFileSync(includePath, 'utf8')
					const isMarkdownOrMdx = includePath.match(/\.md(?:x)?$/)

					// Process the content based on file type and cache the result
					if (isMarkdownOrMdx) {
						const processor = remark()
						processor.use(remarkIncludePartialsPlugin, { partialsDir })
						const ast = processor.parse(includeContents)

						cacheEntry = {
							isMarkdownOrMdx: true,
							processedContent: processor.runSync(ast, includeContents)
								.children,
						}
					} else {
						const includeLang = path.extname(includePath).slice(1)
						cacheEntry = {
							isMarkdownOrMdx: false,
							processedContent: [
								{
									type: 'code',
									lang: includeLang,
									value: includeContents.trim(),
								},
							],
						}
					}

					// Cache the processed entry for future use
					includeCache.set(includePath, cacheEntry)
				} catch {
					throw new Error(
						`@include file not found. In "${filePath}", on line ${node.position.start.line}, column ${node.position.start.column}, please ensure the referenced file "${includePath}" exists.`,
					)
				}
			}

			// Return the cached processed content
			return cacheEntry.processedContent
		})
	}
}
