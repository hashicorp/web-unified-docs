/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'
import { SemVer, gt, gte, lt, lte, eq } from 'semver'
// import { DIRECTIVE_PRODUCTS } from '../shared.mjs'

// this is a courtesy wrapper to prepend error messages
class ExcludeContentError extends Error {
	constructor(message, markdownSource, product) {
		super(
			`[strip-${product}-content] ${message}` +
			`\n- ${markdownSource}` +
			`\n- ${markdownSource}`,
		)
		this.name = 'ExcludeContentError'
	}
}

export const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
export const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/
export const DIRECTIVE_RE =
	/^(?<product>Vault):(?<comparator><=|>=|<|>|=)v(?<version>(\d+)\.(\d+)\.x)$/i

// Adding the directive products parameter to allow for extensibility in tests
export function transformExcludeContent({
	filePath,
	version,
	product,
	supportsExclusionDirectives
}) {
	return function transformer(tree) {
		// accumulate the content exclusion blocks
		/** @type ({ start: number; block: string; end: number })[] */
		const matches = []
		let matching = false
		let block = ''

		// This can be set in productConfig.mjs to enable exclusion directives
		if (!supportsExclusionDirectives) {
			return tree
		}

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
					throw new ExcludeContentError(
						`Unexpected END block: line ${nodeIndex}`,
						tree,
						product
					)
				}

				const beginMatch = nodeValue.match(BEGIN_RE)

				if (beginMatch) {
					matching = true

					if (!beginMatch.groups?.block) {
						throw new ExcludeContentError(
							'No block could be parsed from BEGIN comment',
							tree,
							product
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
					throw new ExcludeContentError(
						`Unexpected BEGIN block: line ${nodeIndex}`,
						tree,
						product
					)
				}

				const endMatch = nodeValue.match(END_RE)
				if (endMatch) {
					const latestMatch = matches[matches.length - 1]

					if (!endMatch.groups?.block) {
						throw new ExcludeContentError(
							'No block could be parsed from END comment',
							tree,
							product
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
						throw new ExcludeContentError('Mismatched block names', tree, product)
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

			if (!directive?.groups) {
				// Check if this is a product we should handle
				const productMatch = flag.match(/^(\w+):/)

				// If the product matches the current one we care about 'Vault' then
				// continue with further checks on the version and comparator
				if (productMatch && productMatch[1] === 'Vault') {
					// This is our product, but directive didn't match - check if it's a version format issue
					const versionFormatCheck = flag.match(/^(\w+):(<=|>=|<|>|=)v(.+)$/)

					if (versionFormatCheck) {
						const [, , , versionPart] = versionFormatCheck
						// Check if version format is invalid (not X.Y.x pattern)
						if (!versionPart.match(/^\d+\.\d+\.x$/)) {
							throw new ExcludeContentError(
								`Invalid version format in directive: ${flag}. Expected format: vX.Y.x`,
								tree,
								product
							)
						}
					}
					// If we get here, it's some other directive format error
					throw new ExcludeContentError(
						`Invalid directive format: ${flag}`,
						tree,
						product
					)
				}

				// else if is not in the product list, throw this error
				throw new ExcludeContentError(
					`Directive block ${block} could not be parsed between lines ${start} and ${end}`,
					tree,
					product
				)
			}

			// This is the version that is parsed from reading the filename
			const currentVersion = version || ''

			// This is the directive that is parsed from the exclusion block
			const { comparator, version: directiveVersion } = directive.groups

			try {
				const versionSemVer = getTfeSemver(currentVersion)
				const directiveSemVer = getTfeSemver(directiveVersion)
				const compare = getComparisonFn(comparator, tree, product)

				const shouldKeepContent = compare(versionSemVer, directiveSemVer)

				// If the version comparison fails, remove the content
				if (!shouldKeepContent) {
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
			} catch (error) {
				throw new ExcludeContentError(
					`Version comparison failed: ${error.message}`,
					tree,
					product
				)
			}
		})
		return tree
	}
}

const getTfeSemver = (version) => {
	// Handle version strings like "1.20.x" by converting to "1.20.0"
	const normalized = version.replace(/\.x$/, '.0')
	return new SemVer(normalized)
}

const getComparisonFn = (operator, document, product) => {
	switch (operator) {
		case '<=':
			return (a, b) => {
				return lte(a, b)
			}
		case '>=':
			return (a, b) => {
				return gte(a, b)
			}
		case '<':
			return (a, b) => {
				return lt(a, b)
			}
		case '>':
			return (a, b) => {
				return gt(a, b)
			}
		case '=':
			return (a, b) => {
				return eq(a, b)
			}
		default:
			throw new ExcludeContentError(
				'Invalid comparator: ' + operator,
				document,
				product
			)
	}
}
