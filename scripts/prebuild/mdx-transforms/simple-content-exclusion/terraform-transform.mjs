/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	parseExclusionBlocks,
	removeNodesInRange,
	ContentExclusionError,
	DIRECTIVE_PRODUCTS,
} from './shared-utils.mjs'

// Terraform-specific error class
export class ExcludeTerraformContentError extends ContentExclusionError {
	constructor(message, markdownSource) {
		super(message, markdownSource, 'strip-terraform-enterprise-content')
		this.name = 'ExcludeTerraformContentError'
	}
}

// Terraform-specific directive pattern
export const DIRECTIVE_RE = /(?<exclusion>TFC|TFEnterprise):only/i

export function transformExcludeTerraformContent({ filePath }) {
	return function transformer(tree) {
		// Use shared parsing logic
		const matches = parseExclusionBlocks(tree, ExcludeTerraformContentError)

		// Process matches with terraform-specific logic
		// Iterates through the list of matches backwards to remove lines
		// without affecting line numbers of earlier matches
		matches.reverse().forEach(({ start, end, block }) => {
			const [flag] = block.split(/\s+/)
			const directive = flag.match(DIRECTIVE_RE)

			// TODO: line start and end do not take into account front matter, as it is just tree parsing and technically front matter is not part of the MDX tree
			if (!directive) {
				// Check if this is a product we should handle
				const productMatch = flag.match(/^(\w+):/)

				if (productMatch && DIRECTIVE_PRODUCTS.includes(productMatch[1])) {
					return // Skip this directive - it's for another product
				}
				throw new ExcludeTerraformContentError(
					`Directive block ${block} could not be parsed between lines ${start} and ${end}`,
					tree,
				)
			}

			// Apply terraform-specific exclusion logic
			if (
				(directive[0].includes('TFC:only') &&
					!filePath.includes('terraform-docs-common')) ||
				(directive[0].includes('TFEnterprise:only') &&
					!filePath.includes('terraform-enterprise'))
			) {
				// Use shared node removal logic
				removeNodesInRange(tree, start, end)
			}
		})

		return tree
	}
}
