/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { gt, gte, lt, lte, eq, coerce } from 'semver'
import { removeNodesInRange } from './ast-utils.mjs'

/**
 * Process a generic version directive block (e.g. ">=v1.21.x").
 *
 * Only processes the directive when the file being processed belongs to the
 * directive's target product - directives for other products are ignored so
 * the same content can be shared without unintended pruning.
 *
 * Generalizes the previous Vault-specific processor.
 *
 * @param {string} targetSlug Product slug the directive is scoped to (e.g. 'vault')
 * @param {string} directive The directive part (e.g. ">=v1.21.x")
 * @param {Object} block Block information with startNode, endNode, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processVersionDirective(
	targetSlug,
	directive,
	block,
	tree,
	options,
) {
	const { repoSlug } = options

	// Only process version directives in their target product - ignore elsewhere
	if (repoSlug !== targetSlug) {
		return
	}

	// Parse version directive pattern: >=v1.21.x, >=v2.x.x, or >=v2.x
	const versionMatch =
		directive.match(/^(<=|>=|<|>|=)v(\d+\.\d+\.x)$/) ||
		directive.match(/^(<=|>=|<|>|=)v(\d+\.x\.x)$/) ||
		directive.match(/^(<=|>=|<|>|=)v(\d+\.x)$/)
	if (versionMatch) {
		processVersionComparison(versionMatch, block, tree, options)
		return
	}

	// If we get here, it's an invalid version directive
	throw new Error(
		`Invalid "${block.content}" directive at lines ${block.startLine}-${block.endLine}. ` +
			`Expected format: <Product>:>=vX.Y.x`,
	)
}

/**
 * Compare the current file version against the directive version
 */
function processVersionComparison(versionMatch, block, tree, options) {
	const { version } = options
	const [, comparator, directiveVersion] = versionMatch

	if (!version) {
		throw new Error(
			`Version directive requires version option at lines ${block.startLine}-${block.endLine}`,
		)
	}

	try {
		const currentVersion = normalizeSemver(version)
		const targetVersion = normalizeSemver(directiveVersion)
		const comparisonFn = getComparisonFunction(comparator)

		const shouldKeepContent = comparisonFn(currentVersion, targetVersion)

		// If version comparison fails, remove the content
		if (!shouldKeepContent) {
			removeNodesInRange(tree, block)
		}
	} catch (error) {
		throw new Error(
			`Version comparison failed for "${block.content}" at lines ${block.startLine}-${block.endLine}: ${error.message}`,
		)
	}
}

/**
 * Normalize version string for semver comparison
 */
function normalizeSemver(version) {
	// To normalize this for versions that include extra text like "v1.21.x (rc)",
	// just split by white space and take the first part
	version = version.split(' ')[0]
	const normalized = version.replace(/^v/, '').replace(/\.x$/, '.0')
	// Use semver.coerce to handle versions like "v2.x" for proper version sorting
	return coerce(normalized)
}

/**
 * Get comparison function for operator
 */
function getComparisonFunction(operator) {
	const functions = {
		'<=': lte,
		'>=': gte,
		'<': lt,
		'>': gt,
		'=': eq,
	}

	const fn = functions[operator]
	if (!fn) {
		throw new Error(`Invalid comparison operator: ${operator}`)
	}
	return fn
}
