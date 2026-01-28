/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { parseDirectiveBlocks } from './ast-utils.mjs'
import { processVaultBlock } from './vault-processor.mjs'
import {
	processTFCBlock,
	processTFEnterpriseBlock,
} from './terraform-processor.mjs'

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
 * Route directive blocks to appropriate processors with if-blocks
 */
function routeAndProcessBlock(block, tree, options) {
	// Parse the directive: "Vault:>=v1.21.x" -> product="Vault", directive=">=v1.21.x"
	const [product, ...rest] = block.content.split(':')
	const directive = rest.join(':') // Handle edge cases like "TFEnterprise:only name:something"

	const directiveProcessingFuncs = {
		Vault: processVaultBlock,
		TFC: processTFCBlock,
		TFEnterprise: processTFEnterpriseBlock,
	}

	// Explicit routing
	if (product in directiveProcessingFuncs) {
		directiveProcessingFuncs[product](directive, block, tree, options)
	} else {
		// Error for unknown products
		throw new Error(
			`Unknown directive product: "${product}" in block "${block.content}" at lines ${block.start}-${block.end}. Expected: Vault, TFC, or TFEnterprise`,
		)
	}
}
