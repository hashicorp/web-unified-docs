/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

// Regex patterns for BEGIN/END comments
const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/

/**
 * Parse all directive blocks from AST in a single pass
 * Simple, explicit error handling for malformed blocks
 *
 * @param {Object} tree Remark AST
 * @returns {Array} Array of block objects with start, end, and content
 */
export function parseDirectiveBlocks(tree) {
	const blocks = []
	let currentBlock = null

	visit(tree, (node) => {
		const nodeValue = node.value
		const lineNumber = node.position?.end?.line

		if (!nodeValue || !lineNumber) {
			return
		}

		// Handle BEGIN blocks
		const beginMatch = nodeValue.match(BEGIN_RE)
		if (beginMatch) {
			if (currentBlock) {
				throw new Error(
					`Nested BEGIN blocks not allowed. Found BEGIN at line ${lineNumber}, previous BEGIN at line ${currentBlock.start}`,
				)
			}

			const blockContent = beginMatch.groups?.block
			if (!blockContent?.trim()) {
				throw new Error(`Empty BEGIN block at line ${lineNumber}`)
			}

			currentBlock = {
				start: lineNumber,
				content: blockContent.trim(),
				end: null,
			}
			return
		}

		// Handle END blocks
		const endMatch = nodeValue.match(END_RE)
		if (endMatch) {
			if (!currentBlock) {
				throw new Error(
					`Unexpected END block at line ${lineNumber}. No matching BEGIN block found`,
				)
			}

			const endContent = endMatch.groups?.block
			if (!endContent?.trim()) {
				throw new Error(`Empty END block at line ${lineNumber}`)
			}

			if (endContent.trim() !== currentBlock.content) {
				throw new Error(
					`Mismatched block names: BEGIN="${currentBlock.content}" at line ${currentBlock.start}, ` +
						`END="${endContent.trim()}" at line ${lineNumber}`,
				)
			}

			// Complete the block
			currentBlock.end = lineNumber
			blocks.push(currentBlock)
			currentBlock = null
		}
	})

	// Check for unclosed blocks
	if (currentBlock) {
		throw new Error(
			`Unclosed BEGIN block: "${currentBlock.content}" opened at line ${currentBlock.start}`,
		)
	}

	return blocks
}

/**
 * Remove nodes from AST within specified line range
 *
 * @param {Object} tree Remark AST
 * @param {number} startLine Start line (inclusive)
 * @param {number} endLine End line (inclusive)
 */
export function removeNodesInRange(tree, startLine, endLine) {
	function removeFromNodes(nodes) {
		if (!Array.isArray(nodes)) {
			return
		}

		for (let i = nodes.length - 1; i >= 0; i--) {
			const node = nodes[i]

			// Check if node is in range
			if (
				node.position &&
				node.position.start.line >= startLine &&
				node.position.end.line <= endLine
			) {
				nodes.splice(i, 1)
			} else if (node.children) {
				// Recursively check children
				removeFromNodes(node.children)
			}
		}
	}

	removeFromNodes(tree.children)
}
