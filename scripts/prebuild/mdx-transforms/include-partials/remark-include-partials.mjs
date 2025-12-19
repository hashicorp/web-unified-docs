/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'node:fs'
import path from 'node:path'

import remark from 'remark'
import flatMap from 'unist-util-flatmap'

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
			let includeContents
			try {
				includeContents = fs.readFileSync(includePath, 'utf8')
			} catch {
				throw new Error(
					`@include file not found. In "${filePath}", on line ${node.position.start.line}, column ${node.position.start.column}, please ensure the referenced file "${includePath}" exists.`,
				)
			}

			/**
			 * Replace the `@include` with the contents of the file.
			 * We run some processing on the file contents based on the file type.
			 *
			 * If the file is Markdown or MDX, we process it with remark to enable
			 * recursive includes, and then return the processed contents.
			 *
			 * Else for other file types, we wrap the file contents in a code block.
			 */
			const isMarkdownOrMdx = includePath.match(/\.md(?:x)?$/)
			if (isMarkdownOrMdx) {
				const processor = remark()
				processor.use(remarkIncludePartialsPlugin, { partialsDir })
				const ast = processor.parse(includeContents)
				return processor.runSync(ast, includeContents).children
			} else {
				const includeLang = path.extname(includePath).slice(1)
				// Return the file contents wrapped inside a "code" node and trim any leading or trailing whitespace in the file
				return [
					{
						type: 'code',
						lang: includeLang,
						value: includeContents.trim(),
					},
				]
			}
		})
	}
}
