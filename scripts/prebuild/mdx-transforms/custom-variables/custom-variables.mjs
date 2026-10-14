/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	findAndReplaceCustomVariables,
	removeVariableNodesFromContent,
} from './custom-variable-utils.mjs'

// need to figure out what this is supposed to check for
export function transformCustomVariables(options = {}) {
	const { directivePairingValidated, repoSlug } = options

	return function transformer(tree) {
		// look to see if there is a variables.mdx defined within partials
		// is this check needed? variables are technically optional

		// otherwise, proceed
		try {
			findAndReplaceCustomVariables(tree, repoSlug, directivePairingValidated)
			const updatedTree = removeVariableNodesFromContent(tree)
			return updatedTree
		} catch (e) {
			throw new Error(
				`Custom Variables Transform failed in ${options.filePath}: ${e.message}`,
			)
		}
	}
}
