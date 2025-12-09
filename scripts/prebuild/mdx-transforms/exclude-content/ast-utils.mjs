/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

// Regex patterns for BEGIN/END comments
const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/

// Helper to check if a node is a comment node (jsx, html, or code containing HTML comment)
// Remark sometimes parses indented HTML comments as code nodes instead of jsx nodes
function isCommentNode(node) {
	// Check if it's a code node containing an HTML comment
	if (
		(node.type === 'code' && node.value) ||
		node.type === 'jsx' ||
		node.type === 'html'
	) {
		return (
			node.value.trim().startsWith('<!--') && node.value.trim().endsWith('-->')
		)
	}
	return false
}

/**
 * Parse all directive blocks from AST in a single pass
 *
 * @param {Object} tree Remark AST
 * @returns {Array} Array of block objects with startNode, endNode, and content
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
					`Nested BEGIN blocks not allowed. Found BEGIN at line ${lineNumber}, previous BEGIN at line ${currentBlock.startLine}`,
				)
			}

			const blockContent = beginMatch.groups?.block
			if (!blockContent?.trim()) {
				throw new Error(`Empty BEGIN block at line ${lineNumber}`)
			}

			currentBlock = {
				startNode: node,
				startLine: lineNumber,
				content: blockContent.trim(),
				endNode: null,
				endLine: null,
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
					`Mismatched block names: BEGIN="${currentBlock.content}" at line ${currentBlock.startLine}, ` +
						`END="${endContent.trim()}" at line ${lineNumber}`,
				)
			}

			// Complete the block
			currentBlock.endNode = node
			currentBlock.endLine = lineNumber
			blocks.push(currentBlock)
			currentBlock = null
		}
	})

	// Check for unclosed blocks
	if (currentBlock) {
		throw new Error(
			`Unclosed BEGIN block: "${currentBlock.content}" opened at line ${currentBlock.startLine}`,
		)
	}

	return blocks
}

/**
 * Remove nodes from AST within specified block using node references
 *
 * This uses actual node object references to identify the range, avoiding
 * issues with overlapping line numbers from multiple partials.
 *
 * @param {Object} tree Remark AST
 * @param {Object} block Block object with startNode and endNode references
 */
export function removeNodesInRange(tree, block) {
	const { startNode, endNode } = block

	function removeFromNodes(nodes, depth = 0, parentInsideRange = false) {
		if (!Array.isArray(nodes)) {
			return parentInsideRange
		}

		const indicesToRemove = []
		let insideRange = parentInsideRange

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]

			// Check if this is the START node
			if (node === startNode) {
				insideRange = true
				indicesToRemove.push(i)
				continue
			}

			// Check if this is the END node
			if (node === endNode) {
				indicesToRemove.push(i)
				insideRange = false
				continue
			}

			// Recursively check children
			const wasInsideRange = insideRange
			if (node.children) {
				insideRange = removeFromNodes(node.children, depth + 1, insideRange)

				// After recursion, decide whether to remove the parent node
				const nodeIsComment = isCommentNode(node)

				// If we were inside range and still are, remove the parent (fully in range)
				if (wasInsideRange && insideRange && !nodeIsComment) {
					indicesToRemove.push(i)
					continue
				}

				// If range ENDED inside this node's children (END found in children),
				// only remove parent if it's now empty (all children were removed)
				if (wasInsideRange && !insideRange) {
					if (!node.children || node.children.length === 0) {
						indicesToRemove.push(i)
					}
					continue
				}

				// If range STARTED inside this node's children (BEGIN found in children),
				// the parent node CONTAINS the range start and should NOT be removed
				if (!wasInsideRange && insideRange) {
					continue
				}
			}

			// If we're inside the range and this node isn't a boundary comment, remove it
			if (insideRange) {
				indicesToRemove.push(i)
			}
		}

		// Remove marked nodes in reverse order to maintain indices
		for (let i = indicesToRemove.length - 1; i >= 0; i--) {
			nodes.splice(indicesToRemove[i], 1)
		}

		return insideRange
	}

	removeFromNodes(tree.children)
}
