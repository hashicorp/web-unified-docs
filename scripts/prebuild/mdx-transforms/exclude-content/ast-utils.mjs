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
 * This handles nodes from included partials which may not have position data
 * matching the parent file's line numbers. We track when we enter/exit the
 * removal range based on the BEGIN/END comments.
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

		const indicesToRemove = []
		let insideRange = false

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			const hasPosition = node.position?.start?.line && node.position?.end?.line

			if (hasPosition) {
				const nodeStart = node.position.start.line
				const nodeEnd = node.position.end.line

				// Check if this node marks the start of the range
				if (nodeStart >= startLine && nodeEnd <= endLine && !insideRange) {
					insideRange = true
				}

				// If node is fully within range, mark for removal
				if (nodeStart >= startLine && nodeEnd <= endLine) {
					indicesToRemove.push(i)
				}
				// If we're inside range but node has position that indicates it's from a partial
				// (position data doesn't match parent file), remove it
				else if (insideRange) {
					// Node from partial - has position data from partial file, not parent
					indicesToRemove.push(i)
				}

				// Check if this node marks the end of the range
				if (nodeEnd === endLine) {
					insideRange = false
				}
			} else {
				// Node without position (e.g., from included partial)
				// Remove it if we're currently inside the range
				if (insideRange) {
					indicesToRemove.push(i)
				}
			}

			// Recursively check children for nodes not being removed
			if (node.children && !indicesToRemove.includes(i)) {
				removeFromNodes(node.children)
			}
		}

		// Remove marked nodes in reverse order to maintain indices
		for (let i = indicesToRemove.length - 1; i >= 0; i--) {
			nodes.splice(indicesToRemove[i], 1)
		}
	}

	removeFromNodes(tree.children)
}
