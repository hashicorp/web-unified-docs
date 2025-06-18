/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { transformExcludeTerraformContent } from './index.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

const runTransform = async (markdown, filePath) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transformExcludeTerraformContent, {
			filePath,
		})
		.process(markdown)
	return processor.contents
}

const ptfeFilePath = 'terraform-enterprise/some-file.md'

describe('transformExcludeTerraformContent', () => {
	it('should remove content within TFC:only blocks', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
This content should stay.
`
		const result = await runTransform(markdown, ptfeFilePath)

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
			return await runTransform(markdown, ptfeFilePath)
		}).rejects.toThrow('Mismatched block names')
		expect(mockConsole).toHaveBeenCalledOnce()
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeFilePath)
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
<!-- BEGIN: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeFilePath)
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeFilePath)
		}).rejects.toThrow('No block could be parsed from BEGIN comment')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await runTransform(markdown, ptfeFilePath)
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

		const result = await runTransform(markdown, ptfeFilePath)
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

		const result = await runTransform(markdown, filePath)

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

		const result = await runTransform(markdown, filePath)

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

		const result = await runTransform(markdown, filePath)
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

		const result = await runTransform(markdown, filePath)
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

		const result = await runTransform(markdown, filePath)
		expect(result.trim()).toBe(expected.trim())
	})
})
