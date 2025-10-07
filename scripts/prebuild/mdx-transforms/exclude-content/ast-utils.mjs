/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

// Regex patterns for BEGIN/END comments
const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/

/**
 * Helper to check if a node is a comment node (jsx, html, or code containing HTML comment)
 * Remark sometimes parses indented HTML comments as code nodes instead of jsx nodes
 */
function isCommentNode(node) {
	if (node.type === 'jsx' || node.type === 'html') {
		return true
	}
	// Check if it's a code node containing an HTML comment
	if (node.type === 'code' && node.value) {
		return (
			node.value.trim().startsWith('<!--') && node.value.trim().endsWith('-->')
		)
	}
	return false
}

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
	function removeFromNodes(nodes, depth = 0, parentInsideRange = false) {
		if (!Array.isArray(nodes)) {
			return parentInsideRange
		}

		const indicesToRemove = []
		let insideRange = parentInsideRange
		let lastEndLine = null // Track the line number where we last found an END comment

		const debug = process.env.DEBUG_AST_REMOVAL === 'true'
		const indent = '  '.repeat(depth)

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			const hasPosition = node.position?.start?.line && node.position?.end?.line

			// Recursively check children FIRST to find any nested END comments
			// before deciding whether to remove this node
			// const hadChildren = !!node.children
			const wasInsideRange = insideRange
			if (node.children) {
				if (debug && hasPosition) {
					const nodeStart = node.position.start.line
					const nodeEnd = node.position.end.line
					console.log(
						`${indent}[${i}] ${node.type} @ ${nodeStart}-${nodeEnd}, insideRange=${insideRange}`,
					)
					console.log(`${indent}  → Recursing into children`)
				}
				insideRange = removeFromNodes(node.children, depth + 1, insideRange)

				// After recursion, children have already been removed.
				// Determine whether to remove the parent node:
				const nodeIsComment = isCommentNode(node)

				// If we were inside range and still are, remove the parent (fully in range)
				if (wasInsideRange && insideRange && !nodeIsComment) {
					indicesToRemove.push(i)
					if (debug) {
						console.log(
							`${indent}  → REMOVE ${node.type} (fully in excluded range)`,
						)
					}
					continue
				}

				// If range ENDED inside this node's children (END found in children),
				// only remove parent if it's now empty (all children were removed).
				// Example: list containing [listItem1 (removed), listItem2 with END (removed), listItem3 (kept)]
				// → Keep the list since listItem3 remains
				if (wasInsideRange && !insideRange) {
					if (!node.children || node.children.length === 0) {
						indicesToRemove.push(i)
						if (debug) {
							console.log(
								`${indent}  → REMOVE ${node.type} (empty after exclusion)`,
							)
						}
					} else {
						if (debug) {
							console.log(
								`${indent}  → KEEP ${node.type} (has remaining children after exclusion)`,
							)
						}
					}
					continue
				}

				// If range STARTED inside this node's children (BEGIN found in children),
				// the parent node CONTAINS the range start and should NOT be removed.
				// Example: listItem containing [paragraph, BEGIN comment] - keep the listItem, only BEGIN removed
				if (!wasInsideRange && insideRange) {
					if (debug) {
						console.log(
							`${indent}  → KEEP ${node.type} (contains BEGIN comment)`,
						)
					}
					continue
				}
			}

			if (hasPosition) {
				const nodeStart = node.position.start.line
				const nodeEnd = node.position.end.line

				if (debug && !node.children) {
					console.log(
						`${indent}[${i}] ${node.type} @ ${nodeStart}-${nodeEnd}, insideRange=${insideRange}`,
					)
				}

				// Check if we've moved past the end of the range
				// Only check this for comment nodes (jsx/html/code), as content nodes
				// from partials can have any line numbers
				const nodeIsComment = isCommentNode(node)
				if (
					insideRange &&
					nodeIsComment &&
					nodeStart >= startLine &&
					nodeStart > endLine
				) {
					insideRange = false
					if (debug) {
						console.log(`${indent}  → Reset insideRange (moved past range)`)
					}
				}

				// If we're NOT inside a range, check if this node starts one
				if (!insideRange) {
					// Special case: if we just found an END comment on this same line (lastEndLine),
					// do NOT start a new range. This prevents removing unrelated BEGIN comments
					// that happen to be on the same line as the END comment (e.g., line 24 has both
					// "<!-- END: TFC:only -->" and "<!-- BEGIN: TFEnterprise:only -->")
					if (lastEndLine !== null && nodeEnd === lastEndLine) {
						if (debug && nodeIsComment) {
							console.log(
								`${indent}  → SKIP comment (on same line ${nodeEnd} as END comment we just processed)`,
							)
						}
					}
					// Check if this node marks the start of the range
					// Only jsx/html/code nodes can be BEGIN comments
					else if (
						nodeIsComment &&
						nodeStart >= startLine &&
						nodeEnd <= endLine
					) {
						insideRange = true
						indicesToRemove.push(i)
						if (debug) {
							console.log(
								`${indent}  → Set insideRange, REMOVE (BEGIN comment)`,
							)
						}
					}
				}
				// If we're inside a range, all nodes are from the partial (except the END comment)
				else {
					// Check if this is the END comment
					// END comments are jsx/html/code nodes with position data from the parent file
					if (nodeIsComment && nodeStart >= startLine && nodeEnd === endLine) {
						indicesToRemove.push(i)
						insideRange = false
						lastEndLine = nodeEnd // Remember the line where we found the END comment
						if (debug) {
							console.log(
								`${indent}  → REMOVE (END comment), reset insideRange, remember lastEndLine=${nodeEnd}`,
							)
						}
					}
					// Otherwise, it's a partial node - remove it
					else {
						indicesToRemove.push(i)
						if (debug) {
							console.log(`${indent}  → REMOVE (partial node)`)
						}
					}
				}
			} else {
				// Node without position (e.g., from included partial)
				// Remove it if we're currently inside the range
				if (debug) {
					console.log(
						`${indent}[${i}] ${node.type} @ no-pos, insideRange=${insideRange}`,
					)
				}
				if (insideRange) {
					indicesToRemove.push(i)
					if (debug) {
						console.log(`${indent}  → REMOVE (no position, insideRange)`)
					}
				}
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
