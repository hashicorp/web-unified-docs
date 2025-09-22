/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { transformExcludeContent } from './index.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

const supportsExclusionDirectives = (product) => {
	return product === 'vault' ||
		product === 'terraform-enterprise' ||
		product === 'terraform-docs-common'
}

const runTransform = async (markdown, version, filePath, product) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transformExcludeContent, {
			filePath,
			version,
			product,
			supportsExclusionDirectives: supportsExclusionDirectives(product)
		})
		.process(markdown)
	return processor.contents
}

const vaultVersion = '1.20.x'
const filePath = 'vault/some-file.md'

describe('transformExcludeContent with Versions', () => {
	it('should remove content when version condition is not met', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END: Vault:>=v1.21.x -->
This content should stay.
`
		const result = await runTransform(markdown, vaultVersion, filePath, 'vault')

		expect(result).toBe('This content should stay.\n')
	})

	it('should throw an error for mismatched block names', async () => {
		const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END: Vault:>=v1.22.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('Mismatched block names')
		expect(mockConsole).toHaveBeenCalledOnce()
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
<!-- BEGIN: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('No block could be parsed from BEGIN comment')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('No block could be parsed from END comment')
	})

	it('should throw error for names not in directiveProducts array', async () => {
		const markdown = `
<!-- BEGIN: INVALID:>=v1.21.x -->
This content should throw an error
<!-- END: INVALID:>=v1.21.x -->
Other content.
	`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow(
			'Invalid directive product: INVALID in block INVALID:>=v1.21.x between lines 2 and 4. Did you mean one of: TFEnterprise, TFC, Vault?',
		)
	})

	it('should keep content when version condition is met', async () => {
		const markdown = `
<!-- BEGIN: Vault:<=v1.21.x -->
This content should stay.
<!-- END: Vault:<=v1.21.x -->
Other content.
`
		const result = await runTransform(markdown, vaultVersion, filePath, 'vault')

		expect(result.trim()).toBe(`<!-- BEGIN: Vault:<=v1.21.x -->

This content should stay.

<!-- END: Vault:<=v1.21.x -->

Other content.`)
	})

	it('should handle equality comparisons', async () => {
		const equalVersion = '1.20.x'
		const markdown = `
<!-- BEGIN: Vault:=v1.20.x -->
This content should stay.
<!-- END: Vault:=v1.20.x -->
`
		const result = await runTransform(markdown, equalVersion, filePath, 'vault')

		expect(result.trim()).toBe(`<!-- BEGIN: Vault:=v1.20.x -->

This content should stay.

<!-- END: Vault:=v1.20.x -->`)
	})

	it('should handle less than comparisons', async () => {
		const markdown = `
<!-- BEGIN: Vault:<v1.19.x -->
This content should be removed.
<!-- END: Vault:<v1.19.x -->
`
		const result = await runTransform(markdown, vaultVersion, filePath, 'vault')

		expect(result.trim()).toBe('')
	})

	it('should throw an error for invalid version format', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.x -->
This content should throw an error.
<!-- END: Vault:>=v1.x -->
`

		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow(
			'Invalid version format in directive: Vault:>=v1.x. Expected format: vZ.Y.x',
		)
	})

	it('should throw an error for invalid comparator', async () => {
		const markdown = `
<!-- BEGIN: Vault:!v1.20.x -->
This content should throw an error.
<!-- END: Vault:!v1.20.x -->
`

		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath, 'vault')
		}).rejects.toThrow('Invalid comparator in directive: Vault:!v1.20.x. Expected one of: <=, >=, <, >, =')
	})

	it('should handle multiple version blocks correctly', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This should be removed.
<!-- END: Vault:>=v1.21.x -->
<!-- BEGIN: Vault:<=v1.21.x -->
This should stay.
<!-- END: Vault:<=v1.21.x -->
Final content.
`
		const result = await runTransform(markdown, vaultVersion, filePath, 'vault')

		expect(result.trim()).toBe(`<!-- BEGIN: Vault:<=v1.21.x -->

This should stay.

<!-- END: Vault:<=v1.21.x -->

Final content.`)
	})

// 	it('should ignore Terraform product directives and leave them untouched', async () => {
// 		const markdown = `
// <!-- BEGIN: TFC:only -->
// This TFC content should be ignored by Vault transform.
// <!-- END: TFC:only -->
// <!-- BEGIN: TFEnterprise:only -->
// This TFEnterprise content should also be ignored.
// <!-- END: TFEnterprise:only -->
// <!-- BEGIN: Vault:>=v1.21.x -->
// This Vault content should be removed.
// <!-- END: Vault:>=v1.21.x -->
// Regular content that stays.
// `
// 		const result = await runTransform(markdown, vaultVersion, filePath, 'vault')

// 		expect(result.trim()).toBe(`<!-- BEGIN: TFC:only -->

// This TFC content should be ignored by Vault transform.

// <!-- END: TFC:only -->

// <!-- BEGIN: TFEnterprise:only -->

// This TFEnterprise content should also be ignored.

// <!-- END: TFEnterprise:only -->

// Regular content that stays.`)
// 	})
})

const ptfeFilePath = 'terraform-enterprise/some-file.md'
const ptfeVersion = 'v1.20.x'

describe('transformExcludeContent with Only', () => {
	it('should remove content within TFC:only blocks', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
This content should stay.
`
		const result = await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')

		expect(result).toBe('This content should stay.\n')
	})

	it('should throw an error for mismatched block names', async () => {
		const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:other -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')
		}).rejects.toThrow('Mismatched block names')
		expect(mockConsole).toHaveBeenCalledOnce()
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
<!-- BEGIN: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-docs-common')
		}).rejects.toThrow('No block could be parsed from END comment')
	})

	it('should throw an error for blocks that do not match directive', async () => {
		const markdown = `
<!-- BEGIN: TFE:only -->
This content should be removed.
<!-- END: TFE:only -->
`

		await expect(async () => {
			return await runTransform(markdown, ptfeFilePath)
		}).rejects.toThrow(
			/Directive block TFE:only could not be parsed between lines 2 and 4/,
		)
	})

	it('should remove TFC:only content and leave TFEnterprise:only content for terraform-enterprise', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only -->
This content should NOT be removed.
<!-- END: TFEnterprise:only -->
This content should stay.`

		const expected = `<!-- BEGIN: TFEnterprise:only -->

This content should NOT be removed.

<!-- END: TFEnterprise:only -->

This content should stay.
`

		const result = await runTransform(markdown, ptfeVersion, ptfeFilePath, 'terraform-enterprise')
		expect(result).toBe(expected)
	})

	it('should remove TFEnterprise:only and TFC:only content for terraform product', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only -->
This content should be removed.
<!-- END: TFEnterprise:only -->
This content should stay.
`

		const filePath = 'terraform/some-file.md'
		const expected = `This content should stay.`

		const result = await runTransform(markdown, ptfeVersion, filePath, 'terraform')

		expect(result.trim()).toBe(expected.trim())
	})

	it('should remove NESTED TFEnterprise:only and TFC:only content for terraform product', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
	<!-- BEGIN: TFEnterprise:only name:revoke -->
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform/enterprise/api-docs/private-registry/manage-module-versions).
		<!-- END: TFEnterprise:only name:revoke -->

This content should stay.
`

		const filePath = 'terraform/some-file.md'
		const expected = `This content should stay.`

		const result = await runTransform(markdown, ptfeVersion, filePath, 'terraform')

		expect(result.trim()).toBe(expected.trim())
	})

	it('should remove TFEnterprise:only and TFC:only content for terraform-cdk product', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only -->
This content should be removed.
<!-- END: TFEnterprise:only -->
This content should stay.
`

		const filePath = 'terraform-cdk/some-file.md'
		const expected = `
This content should stay.
`

		const result = await runTransform(markdown, ptfeVersion, filePath, 'terraform-cdk')
		expect(result.trim()).toBe(expected.trim())
	})

	it('should remove TFEnterprise:only content for terraform-docs-common', async () => {
		const markdown = `
<!-- BEGIN: TFEnterprise:only -->
This content should be removed.
<!-- END: TFEnterprise:only -->
This content should stay.
`

		const filePath = 'terraform-docs-common/cloud-docs/some-file.md'
		const expected = `
This content should stay.
`

		const result = await runTransform(markdown, ptfeVersion, filePath, 'terraform-docs-common')
		expect(result.trim()).toBe(expected.trim())
	})

	it('should leave TFC:only content for terraform-docs-common', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should NOT be removed.
<!-- END: TFC:only -->
This content should stay.
`

		const filePath = 'terraform-docs-common/cloud-docs/some-file.md'
		const expected = `
<!-- BEGIN: TFC:only -->

This content should NOT be removed.

<!-- END: TFC:only -->

This content should stay.
`

		const result = await runTransform(markdown, ptfeVersion, filePath, 'terraform-docs-common')
		expect(result.trim()).toBe(expected.trim())
	})
})
