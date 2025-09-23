/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

// Shared regex patterns for parsing BEGIN/END comments
export const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
export const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/

/**
 * List of product codes that are supported in content exclusion directives
 * This array defines which products can have content inclusion/exclusion blocks
 *
 * To add content inclusions/exclusions for a new product:
 * 1. Add the product code to this array (e.g., 'CONSUL', 'NOMAD')
 * 2. Create a corresponding plugin in the content-exclusion directory
 * 3. Register the plugin in the dispatcher
 *
 * @type {string[]} Array of supported product codes
 */
export const DIRECTIVE_PRODUCTS = ['Vault', 'TFC', 'TFEnterprise']

/**
 * Base error class for content exclusion errors
 */
export class ContentExclusionError extends Error {
	constructor(message, markdownSource, transform = 'content-exclusion') {
		super(
			`[${transform}] ${message}` +
				`\n- ${markdownSource}` +
				`\n- ${markdownSource}`,
		)
		this.name = 'ContentExclusionError'
	}
}

/**
 * Parses BEGIN/END comment blocks from the AST
 * This extracts the shared parsing logic from both terraform and vault transforms
 *
 * @param {Object} tree - The remark AST
 * @param {Function} errorClass - Error class to throw, gets replaced by ExcludeTerraformContentError, etc)
 * @returns {Array} Array of accumulated matched blocks: [{start: number, end: number, block: string}]
 */
export function parseExclusionBlocks(tree, errorClass = ContentExclusionError) {
	const matches = []
	let matching = false
	let block = ''

	visit(tree, (node) => {
		const nodeValue = node.value
		const nodeIndex = node.position?.end?.line

		if (!nodeValue || !nodeIndex) {
			return
		}

		if (!matching) {
			// Wait for a BEGIN block to be matched

			// throw if an END block is matched first
			const endMatch = nodeValue.match(END_RE)
			if (endMatch) {
				throw new errorClass(`Unexpected END block: line ${nodeIndex}`, tree)
			}

			const beginMatch = nodeValue.match(BEGIN_RE)
			if (beginMatch) {
				matching = true

				if (!beginMatch.groups?.block) {
					throw new errorClass(
						'No block could be parsed from BEGIN comment',
						tree,
					)
				}

				block = beginMatch.groups.block

				matches.push({
					start: nodeIndex,
					block: beginMatch.groups.block,
					end: -1,
				})
			}
		} else {
			// If we are actively matching within a block, monitor for the end

			// throw if a BEGIN block is matched again
			const beginMatch = nodeValue.match(BEGIN_RE)
			if (beginMatch) {
				throw new errorClass(`Unexpected BEGIN block: line ${nodeIndex}`, tree)
			}

			const endMatch = nodeValue.match(END_RE)
			if (endMatch) {
				const latestMatch = matches[matches.length - 1]

				if (!endMatch.groups?.block) {
					throw new errorClass(
						'No block could be parsed from END comment',
						tree,
					)
				}

				// If we reach and end with an un-matching block name, throw an error
				if (endMatch.groups.block !== block) {
					const errMsg =
						`Mismatched block names: Block opens with "${block}", and closes with "${endMatch.groups.block}".` +
						`\n` +
						`Please make sure opening and closing block names are matching. Blocks cannot be nested.` +
						`\n` +
						`- Open:  ${latestMatch.start}: ${block}` +
						`\n` +
						`- Close: ${nodeIndex}: ${endMatch.groups.block}` +
						`\n`
					console.error(errMsg)
					throw new errorClass('Mismatched block names', tree)
				}

				// Push the ending index of the block into the match result and set matching to false
				latestMatch.end = nodeIndex
				block = ''
				matching = false
			}
		}
	})

	return matches
}

/**
 * Removes nodes from the AST within the specified line range
 * This is the shared node removal logic extracted from both transforms
 *
 * @param {Object} tree - The remark AST
 * @param {number} start - Start line number
 * @param {number} end - End line number
 */
export function removeNodesInRange(tree, start, end) {
	function removeNodes(nodes) {
		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i]
			if (
				node.position &&
				node.position.start.line >= start &&
				node.position.end.line <= end
			) {
				nodes.splice(i, 1)
			} else if (node.children && Array.isArray(node.children)) {
				removeNodes(node.children, node)
			}
		}
	}
	removeNodes(tree.children, tree)
}
