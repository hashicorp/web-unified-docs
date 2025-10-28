/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { removeNodesInRange } from './ast-utils.mjs'

/**
 * Process TFC (Terraform Cloud) directive blocks
 * Implements cross-product behavior based on your test requirements
 *
 * @param {string} directive The directive part (e.g., "only")
 * @param {Object} block Block information with startNode, endNode, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processTFCBlock(directive, block, tree, options) {
	const { repoSlug } = options

	// Handle "only" or "only name:something" format
	if (directive === 'only' || directive.startsWith('only ')) {
		// TFC:only should be kept ONLY in terraform-docs-common, removed everywhere else
		if (repoSlug !== 'terraform-docs-common') {
			removeNodesInRange(tree, block)
		}
		// else keeping block in terraform-docs-common
		return
	}

	// If we get here, it's an invalid TFC directive
	throw new Error(
		`Invalid TFC directive: "${directive}" at lines ${block.startLine}-${block.endLine}. ` +
			`Expected format: TFC:only`,
	)
}

/**
 * Process TFEnterprise (Terraform Enterprise) directive blocks
 * Implements cross-product behavior based on your test requirements
 *
 * @param {string} directive The directive part (e.g., "only")
 * @param {Object} block Block information with startNode, endNode, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processTFEnterpriseBlock(directive, block, tree, options) {
	const { repoSlug } = options

	// Handle "only" and "only name:something" format
	if (directive === 'only' || directive.startsWith('only ')) {
		// TFEnterprise:only kept only in terraform-enterprise, removed everywhere else
		if (repoSlug !== 'terraform-enterprise') {
			removeNodesInRange(tree, block)
		}
		// else keeping block (in terraform-enterprise)`)
		return
	}

	// If we get here, it's an invalid TFEnterprise directive
	throw new Error(
		`Invalid TFEnterprise directive: "${directive}" at lines ${block.startLine}-${block.endLine}. ` +
			`Expected format: TFEnterprise:only`,
	)
}
