/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { SemVer, gt, gte, lt, lte, eq } from 'semver'
import {
	parseExclusionBlocks,
	removeNodesInRange,
	ContentExclusionError,
	DIRECTIVE_PRODUCTS,
} from './shared-utils.mjs'

// Vault-specific error class
export class ExcludeVaultContentError extends ContentExclusionError {
	constructor(message, markdownSource) {
		super(message, markdownSource, 'strip-vault-content')
		this.name = 'ExcludeVaultContentError'
	}
}

// Vault-specific directive pattern
export const DIRECTIVE_RE =
	/^(?<product>Vault):(?<comparator><=|>=|<|>|=)v(?<version>(\d+)\.(\d+)\.x)$/i

export function transformExcludeVaultContent({ filePath, version }) {
	return function transformer(tree) {
		// Use shared parsing logic, but only for vault files
		// TODO: it can speed up processing but it can skip files
		// that might have vault content in non-vault paths (is
		// that a use case we care about?)
		if (!filePath.includes('vault')) {
			return tree
		}

		const matches = parseExclusionBlocks(tree, ExcludeVaultContentError)

		// Process matches with vault-specific logic
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
				const versionSemVer = getSemver(currentVersion)
				const directiveSemVer = getSemver(directiveVersion)
				const compare = getComparisonFn(comparator, tree)

				const shouldKeepContent = compare(versionSemVer, directiveSemVer)

				// If the version comparison fails, remove the content
				if (!shouldKeepContent) {
					// Use shared node removal logic
					removeNodesInRange(tree, start, end)
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

const getSemver = (version) => {
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
