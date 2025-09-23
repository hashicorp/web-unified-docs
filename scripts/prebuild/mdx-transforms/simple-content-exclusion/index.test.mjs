/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import {
	transformExcludeContent,
	transformExcludeTerraformContent,
	transformExcludeVaultContent,
} from './index.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

// Mock DIRECTIVE_PRODUCTS
vi.mock('../shared-utils.mjs', async (importOriginal) => {
	const actual = await importOriginal()
	return {
		...actual,
		DIRECTIVE_PRODUCTS: ['Vault', 'TFC', 'TFEnterprise'],
	}
})

const runTransform = async (transform, markdown, options = {}) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transform, options)
		.process(markdown)
	return processor.contents
}

describe('Content Exclusion', () => {
	describe('Unified Transform', () => {
		it('should handle terraform content exclusion', async () => {
			const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
This content should stay.
`
			const result = await runTransform(transformExcludeContent, markdown, {
				filePath: 'terraform-enterprise/some-file.md',
			})

			expect(result).toBe('This content should stay.\n')
		})

		it('should handle vault content exclusion', async () => {
			const markdown = `
<!-- BEGIN: Vault:>=v1.20.x -->
This content should be removed for older versions.
<!-- END: Vault:>=v1.20.x -->
This content should stay.
`
			const result = await runTransform(transformExcludeContent, markdown, {
				filePath: 'vault/some-file.md',
				version: '1.19.x',
			})

			expect(result).toBe('This content should stay.\n')
		})

		it('should handle mixed terraform and vault directives', async () => {
			const markdown = `
<!-- BEGIN: TFC:only -->
Terraform content.
<!-- END: TFC:only -->
<!-- BEGIN: Vault:>=v1.20.x -->
Vault content.
<!-- END: Vault:>=v1.20.x -->
Regular content.
`
			const result = await runTransform(transformExcludeContent, markdown, {
				filePath: 'vault/some-file.md',
				version: '1.19.x',
			})

			// TFC content should be removed (not in terraform-docs-common)
			// Vault content should be removed (version too low)
			expect(result.trim()).not.toContain('Terraform content')
			expect(result.trim()).not.toContain('Vault content')
			expect(result.trim()).toContain('Regular content')
		})
	})

	describe('Individual Terraform Transform', () => {
		it('should remove TFC:only content from terraform-enterprise files', async () => {
			const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
This content should stay.
`
			const result = await runTransform(
				transformExcludeTerraformContent,
				markdown,
				{
					filePath: 'terraform-enterprise/some-file.md',
				},
			)

			expect(result).toBe('This content should stay.\n')
		})

		it('should keep TFC:only content in terraform-docs-common files', async () => {
			const markdown = `
<!-- BEGIN: TFC:only -->
This content should NOT be removed.
<!-- END: TFC:only -->
This content should stay.
`
			const result = await runTransform(
				transformExcludeTerraformContent,
				markdown,
				{
					filePath: 'terraform-docs-common/cloud-docs/some-file.md',
				},
			)

			expect(result.trim()).toContain('This content should NOT be removed')
			expect(result.trim()).toContain('This content should stay')
		})
	})

	describe('Individual Vault Transform', () => {
		it('should handle vault version comparisons', async () => {
			const markdown = `
<!-- BEGIN: Vault:>=v1.20.x -->
This content should be removed for older versions.
<!-- END: Vault:>=v1.20.x -->
This content should stay.
`
			const result = await runTransform(
				transformExcludeVaultContent,
				markdown,
				{
					filePath: 'vault/some-file.md',
					version: '1.19.x',
				},
			)

			expect(result).toBe('This content should stay.\n')
		})

		it('should keep vault content when version meets criteria', async () => {
			const markdown = `
<!-- BEGIN: Vault:>=v1.20.x -->
This content should NOT be removed for newer versions.
<!-- END: Vault:>=v1.20.x -->
This content should stay.
`
			const result = await runTransform(
				transformExcludeVaultContent,
				markdown,
				{
					filePath: 'vault/some-file.md',
					version: '1.21.x',
				},
			)

			expect(result.trim()).toContain('This content should NOT be removed')
			expect(result.trim()).toContain('This content should stay')
		})
	})

	describe('Error Handling', () => {
		it('should throw error for mismatched BEGIN/END blocks', async () => {
			const markdown = `
<!-- BEGIN: TFC:only -->
This content has mismatched blocks.
<!-- END: TFC:other -->
`
			await expect(async () => {
				return await runTransform(transformExcludeTerraformContent, markdown, {
					filePath: 'terraform-enterprise/some-file.md',
				})
			}).rejects.toThrow('Mismatched block names')
		})

		it('should throw error for unexpected END block', async () => {
			const markdown = `
<!-- END: TFC:only -->
`
			await expect(async () => {
				return await runTransform(transformExcludeTerraformContent, markdown, {
					filePath: 'terraform-enterprise/some-file.md',
				})
			}).rejects.toThrow('Unexpected END block')
		})

		it('should throw error for invalid vault version format', async () => {
			const markdown = `
<!-- BEGIN: Vault:>=v1.20 -->
Invalid version format.
<!-- END: Vault:>=v1.20 -->
`
			await expect(async () => {
				return await runTransform(transformExcludeVaultContent, markdown, {
					filePath: 'vault/some-file.md',
					version: '1.19.x',
				})
			}).rejects.toThrow('Invalid version format')
		})
	})
})
