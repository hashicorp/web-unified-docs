/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { SemVer, gt, gte, lt, lte, eq } from 'semver'
import { removeNodesInRange } from './ast-utils.mjs'

/**
 * Process Vault-specific directive blocks
 * Only processes Vault directives in vault files - ignores them elsewhere
 *
 * @param {string} directive The directive part (e.g., ">=v1.21.x")
 * @param {Object} block Block information with start, end, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processVaultBlock(directive, block, tree, options) {
	const { repoSlug } = options // can pull out { repoSlug, version } if needed

	// Only process Vault blocks in vault files - ignore them elsewhere
	if (repoSlug !== 'vault') {
		return // Skip vault directive in a non-vault file
	}

	// Parse Vault version directive pattern: >=v1.21.x
	const versionMatch = directive.match(/^(<=|>=|<|>|=)v(\d+\.\d+\.x)$/)
	if (versionMatch) {
		processVaultVersionDirective(versionMatch, block, tree, options)
		return
	}

	// If we get here, it's an invalid Vault directive
	throw new Error(
		`Invalid Vault directive: "${directive}" at lines ${block.start}-${block.end}. ` +
			`Expected format: Vault:>=vX.Y.x`,
	)
}

/**
 * Process Vault version directives (e.g., Vault:>=v1.21.x)
 */
function processVaultVersionDirective(versionMatch, block, tree, options) {
	const { version } = options
	const [, comparator, directiveVersion] = versionMatch

	if (!version) {
		throw new Error(
			`Version directive requires version option at lines ${block.start}-${block.end}`,
		)
	}

	try {
		const currentVersion = normalizeSemver(version)
		const targetVersion = normalizeSemver(directiveVersion)
		const comparisonFn = getComparisonFunction(comparator)

		const shouldKeepContent = comparisonFn(currentVersion, targetVersion)

		// If version comparison fails, remove the content
		if (!shouldKeepContent) {
			removeNodesInRange(tree, block.start, block.end)
		}
	} catch (error) {
		throw new Error(
			`Version comparison failed for "${block.content}" at lines ${block.start}-${block.end}: ${error.message}`,
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
	return new SemVer(normalized)
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
