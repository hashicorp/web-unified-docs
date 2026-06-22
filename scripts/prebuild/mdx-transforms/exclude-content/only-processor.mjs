/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { removeNodesInRange } from './ast-utils.mjs'

/**
 * Process a generic "only" directive block.
 *
 * Keeps the block ONLY when the file being processed belongs to the
 * directive's target product. In every other product the block (including its
 * BEGIN/END comments) is removed.
 *
 * Replaces the previous per-product TFC/TFEnterprise processors.
 *
 * @param {string} targetSlug Product slug the directive is scoped to (e.g. 'terraform-enterprise')
 * @param {string} directive The directive part (e.g. "only" or "only name:something")
 * @param {Object} block Block information with startNode, endNode, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processOnlyDirective(
	targetSlug,
	directive,
	block,
	tree,
	options,
) {
	const { repoSlug } = options

	// Handle "only" or "only name:something" format
	if (directive === 'only' || directive.startsWith('only ')) {
		// Keep the block only in its target product, remove it everywhere else
		if (repoSlug !== targetSlug) {
			removeNodesInRange(tree, block)
		}
		return
	}

	// If we get here, it's an invalid "only" directive
	throw new Error(
		`Invalid "${block.content}" directive at lines ${block.startLine}-${block.endLine}. ` +
			`Expected format: <Product>:only`,
	)
}
