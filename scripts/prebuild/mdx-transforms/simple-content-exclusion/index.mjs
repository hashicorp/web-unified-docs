/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { transformExcludeTerraformContent } from './terraform-transform.mjs'
import { transformExcludeVaultContent } from './vault-transform.mjs'

/**
 * Simple unified content exclusion transform that applies both terraform and vault transforms
 *
 * @param {Object} options - Transform options containing filePath, version, etc.
 * @returns {Function} Remark transformer function
 */
export function transformExcludeContent(options = {}) {
	return function transformer(tree) {
		// Apply terraform transform
		const terraformTransform = transformExcludeTerraformContent(options)
		tree = terraformTransform(tree)

		// Apply vault transform
		const vaultTransform = transformExcludeVaultContent(options)
		tree = vaultTransform(tree)

		return tree
	}
}

// Individual exports for backward compatibility or separate usage
export { transformExcludeTerraformContent } from './terraform-transform.mjs'
export { transformExcludeVaultContent } from './vault-transform.mjs'
