/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

// this is a courtesy wrapper to prepend error messages
class ExcludeTerraformContentError extends Error {
	constructor(message, markdownSource) {
		super(
			`[strip-terraform-enterprise-content] ${message}` +
				`\n- ${markdownSource}` +
				`\n- ${markdownSource}`,
		)
		this.name = 'ExcludeTerraformContentError'
	}
}

export const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
export const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/
export const DIRECTIVE_RE = /(?<exclusion>TFC|TFEnterprise):only/i

export function transformExcludeTerraformContent({ filePath }) {
	return function transformer(tree) {
		// accumulate the content exclusion blocks
		/** @type ({ start: number; block: string; end: number })[] */
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
					throw new ExcludeTerraformContentError(
						`Unexpected END block: line ${nodeIndex}`,
						tree,
					)
				}

				const beginMatch = nodeValue.match(BEGIN_RE)

				if (beginMatch) {
					matching = true

					if (!beginMatch.groups?.block) {
						throw new ExcludeTerraformContentError(
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
					throw new ExcludeTerraformContentError(
						`Unexpected BEGIN block: line ${nodeIndex}`,
						tree,
					)
				}

				const endMatch = nodeValue.match(END_RE)
				if (endMatch) {
					const latestMatch = matches[matches.length - 1]

					if (!endMatch.groups?.block) {
						throw new ExcludeTerraformContentError(
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
						throw new ExcludeTerraformContentError(
							'Mismatched block names',
							tree,
						)
					}

					// Push the ending index of the block into the match result and set matching to false
					latestMatch.end = nodeIndex
					block = ''
					matching = false
				}
			}
		})

		// iterate through the list of matches backwards to remove lines
		matches.reverse().forEach(({ start, end, block }) => {
			const [flag] = block.split(/\s+/)
			const directive = flag.match(DIRECTIVE_RE)

			// TODO: line start and end do not take into account front matter, as it is just tree parsing and technically front matter is not part of the MDX tree
			if (!directive) {
				throw new ExcludeTerraformContentError(
					`Directive block ${block} could not be parsed between lines ${start} and ${end}`,
					tree,
				)
			}

			if (
				(directive[0].includes('TFC:only') &&
					!filePath.includes('terraform-docs-common')) ||
				(directive[0].includes('TFEnterprise:only') &&
					!filePath.includes('terraform-enterprise'))
			) {
				// If the directive is TFC:only or TFEnterprise:only, remove the lines in the range recursively
				function removeNodesInRange(nodes) {
					for (let i = nodes.length - 1; i >= 0; i--) {
						const node = nodes[i]
						if (
							node.position &&
							node.position.start.line >= start &&
							node.position.end.line <= end
						) {
							nodes.splice(i, 1)
						} else if (node.children && Array.isArray(node.children)) {
							removeNodesInRange(node.children, node)
						}
					}
				}
				removeNodesInRange(tree.children, tree)
			}
		})

		return tree
	}
}
