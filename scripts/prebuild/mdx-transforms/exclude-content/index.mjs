/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { parseDirectiveBlocks } from './ast-utils.mjs'
import { processOnlyDirective } from './only-processor.mjs'
import { processVersionDirective } from './version-processor.mjs'

/**
 * Maps a directive tag (the text before the colon in a BEGIN/END comment) to
 * the product slug the directive is scoped to. To support a new product, add a
 * tag here - no new processor file is required.
 */
export const EXCLUSION_DIRECTIVE_TAGS = {
	Vault: 'vault',
	TFC: 'terraform-docs-common',
	TFEnterprise: 'terraform-enterprise',
}

/**
 * Content exclusion transform with explicit if-block routing
 * for each product- intended to run through a single AST pass
 *
 * @param {Object} options Transform options
 * @param {string} options.filePath File path being processed
 * @param {string} options.version Content version (for version directives)
 * @param {string} options.repoSlug Product repo slug (e.g., 'vault', 'terraform-docs-common')
 * @param {Object} options.productConfig Product configuration from PRODUCT_CONFIG
 * @returns {Function} Remark transformer function
 */
export function transformExcludeContent(options = {}) {
	return function transformer(tree) {
		const { productConfig } = options

		// Early return if product doesn't support exclusion directives
		if (!productConfig?.supportsExclusionDirectives) {
			return tree
		}

		try {
			// Single AST pass to find all directive blocks
			const blocks = parseDirectiveBlocks(tree)

			// Process each block with explicit routing (reverse order for safe removal)
			blocks.reverse().forEach((block) => {
				routeAndProcessBlock(block, tree, options)
			})
			return tree
		} catch (error) {
			// Add file context to any errors
			throw new Error(
				`Content exclusion failed in ${options.filePath}: ${error.message}`,
			)
		}
	}
}

/**
 * Route directive blocks to the generic processors based on the directive shape
 */
function routeAndProcessBlock(block, tree, options) {
	// Parse the directive: "Vault:>=v1.21.x" -> tag="Vault", directive=">=v1.21.x"
	const [tag, ...rest] = block.content.split(':')
	const directive = rest.join(':') // Handle edge cases like "TFEnterprise:only name:something"

	// Resolve the tag to a product slug
	const targetSlug = EXCLUSION_DIRECTIVE_TAGS[tag]
	if (!targetSlug) {
		throw new Error(
			`Unknown directive product: "${tag}" in block "${block.content}" at lines ${block.startLine}-${block.endLine}. ` +
				`Expected one of: ${Object.keys(EXCLUSION_DIRECTIVE_TAGS).join(', ')}`,
		)
	}

	// Dispatch by directive shape: "only" directives vs version directives
	if (directive === 'only' || directive.startsWith('only')) {
		processOnlyDirective(targetSlug, directive, block, tree, options)
	} else {
		processVersionDirective(targetSlug, directive, block, tree, options)
	}
}
