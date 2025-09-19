/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'
import { SemVer, gt, gte, lt, lte, eq } from 'semver'
import { DIRECTIVE_PRODUCTS } from '../shared.mjs'

// this is a courtesy wrapper to prepend error messages
class ExcludeVaultContentError extends Error {
	constructor(message, markdownSource) {
		super(
			`[strip-vault-content] ${message}` +
				`\n- ${markdownSource}` +
				`\n- ${markdownSource}`,
		)
		this.name = 'ExcludeVaultContentError'
	}
}

export const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
export const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/
export const DIRECTIVE_RE =
	/^(?<product>VLT):(?<comparator><=|>=|<|>|=)v(?<version>(\d+)\.(\d+)\.x)$/i

// Adding the directive products parameter to allow for extensibility in tests
export function transformExcludeVaultContent({ filePath, version }) {
	return function transformer(tree) {
		// accumulate the content exclusion blocks
		/** @type ({ start: number; block: string; end: number })[] */
		const matches = []
		let matching = false
		let block = ''

		visit(tree, (node) => {
			const nodeValue = node.value
			const nodeIndex = node.position?.end?.line

			if (!nodeValue || !nodeIndex || !filePath.includes('vault')) {
				return
			}

			if (!matching) {
				// Wait for a BEGIN block to be matched

				// throw if an END block is matched first
				const endMatch = nodeValue.match(END_RE)
				if (endMatch) {
					throw new ExcludeVaultContentError(
						`Unexpected END block: line ${nodeIndex}`,
						tree,
					)
				}

				const beginMatch = nodeValue.match(BEGIN_RE)

				if (beginMatch) {
					matching = true

					if (!beginMatch.groups?.block) {
						throw new ExcludeVaultContentError(
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
					throw new ExcludeVaultContentError(
						`Unexpected BEGIN block: line ${nodeIndex}`,
						tree,
					)
				}

				const endMatch = nodeValue.match(END_RE)
				if (endMatch) {
					const latestMatch = matches[matches.length - 1]

					if (!endMatch.groups?.block) {
						throw new ExcludeVaultContentError(
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
						throw new ExcludeVaultContentError('Mismatched block names', tree)
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

				// If the product matches the current one we care about 'VLT' then
				// continue with further checks on the version and comparator
				if (productMatch && productMatch[1] === 'VLT') {
					// This is our product, but directive didn't match - check if it's a version format issue
					const versionFormatCheck = flag.match(/^(\w+):(<=|>=|<|>|=)v(.+)$/)

					if (versionFormatCheck) {
						const [, , , versionPart] = versionFormatCheck
						// Check if version format is invalid (not X.Y.x pattern)
						if (!versionPart.match(/^\d+\.\d+\.x$/)) {
							throw new ExcludeVaultContentError(
								`Invalid version format in directive: ${flag}. Expected format: vX.Y.x`,
								tree,
							)
						}
					}
					// If we get here, it's some other directive format error
					throw new ExcludeVaultContentError(
						`Invalid directive format: ${flag}`,
						tree,
					)
				}

				// otherwise if it is in the directive products list, skip it
				else if (productMatch && DIRECTIVE_PRODUCTS.includes(productMatch[1])) {
					return // Skip this directive - it's for another product
				}

				// else if is not in the product list, throw this error
				throw new ExcludeVaultContentError(
					`Directive block ${block} could not be parsed between lines ${start} and ${end}`,
					tree,
				)
			}

			// This is the version that is parsed from reading the filename
			const currentVersion = version || ''

			// This is the directive that is parsed from the exclusion block
			const { comparator, version: directiveVersion } = directive.groups

			try {
				const versionSemVer = getTfeSemver(currentVersion)
				const directiveSemVer = getTfeSemver(directiveVersion)
				const compare = getComparisonFn(comparator, tree)

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
				throw new ExcludeVaultContentError(
					`Version comparison failed: ${error.message}`,
					tree,
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

const getComparisonFn = (operator, document) => {
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
			throw new ExcludeVaultContentError(
				'Invalid comparator: ' + operator,
				document,
			)
	}
}
