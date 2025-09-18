/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { transformExcludeVaultContent } from './index.mjs'
// import { DIRECTIVE_PRODUCTS } from '../build-mdx-transforms.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

// Mock for testing custom directive products
vi.mock('../build-mdx-transforms.mjs', async (importOriginal) => {
	const actual = await importOriginal()
	return {
		...actual,
		DIRECTIVE_PRODUCTS: ['VLT', 'TFC', 'TFEnterprise'], // Default for most tests
	}
})

const runTransform = async (markdown, version, filePath) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transformExcludeVaultContent, {
			filePath,
			version,
		})
		.process(markdown)
	return processor.contents
}

const vaultVersion = '1.20.x'
const filePath = 'vault/some-file.md'

describe('transformExcludeVaultContent', () => {
	it('should remove content when version condition is not met', async () => {
		const markdown = `
<!-- BEGIN: VLT:>=v1.21.x -->
This content should be removed.
<!-- END: VLT:>=v1.21.x -->
This content should stay.
`
		const result = await runTransform(markdown, vaultVersion, filePath)

		expect(result).toBe('This content should stay.\n')
	})

	it('should throw an error for mismatched block names', async () => {
		const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
		const markdown = `
<!-- BEGIN: VLT:>=v1.21.x -->
This content should be removed.
<!-- END: VLT:>=v1.22.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow('Mismatched block names')
		expect(mockConsole).toHaveBeenCalledOnce()
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: VLT:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: VLT:>=v1.21.x -->
<!-- BEGIN: VLT:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: VLT:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow('No block could be parsed from BEGIN comment')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: VLT:>=v1.21.x -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow('No block could be parsed from END comment')
	})

	// These edge cases may have to be handled
	it('should throw error for names not in directiveProducts array', async () => {
		const markdown = `
<!-- BEGIN: INVALID:>=v1.21.x -->
This content should throw an error
<!-- END: INVALID:>=v1.21.x -->
Other content.
	`
		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow(
			'Directive block INVALID:>=v1.21.x could not be parsed between lines 2 and 4',
		)
	})

	it('should keep content when version condition is met', async () => {
		const markdown = `
<!-- BEGIN: VLT:<=v1.21.x -->
This content should stay.
<!-- END: VLT:<=v1.21.x -->
Other content.
`
		const result = await runTransform(markdown, vaultVersion, filePath)

		expect(result.trim()).toBe(`<!-- BEGIN: VLT:<=v1.21.x -->

This content should stay.

<!-- END: VLT:<=v1.21.x -->

Other content.`)
	})

	it('should handle equality comparisons', async () => {
		const equalVersion = '1.20.x'
		const markdown = `
<!-- BEGIN: VLT:=v1.20.x -->
This content should stay.
<!-- END: VLT:=v1.20.x -->
`
		const result = await runTransform(markdown, equalVersion, filePath)

		expect(result.trim()).toBe(`<!-- BEGIN: VLT:=v1.20.x -->

This content should stay.

<!-- END: VLT:=v1.20.x -->`)
	})

	it('should handle less than comparisons', async () => {
		const markdown = `
<!-- BEGIN: VLT:<v1.19.x -->
This content should be removed.
<!-- END: VLT:<v1.19.x -->
`
		const result = await runTransform(markdown, vaultVersion, filePath)

		expect(result.trim()).toBe('')
	})

	// This may have to get removed
	it('should throw an error for invalid version format', async () => {
		const markdown = `
	<!-- BEGIN: VLT:>=v1.invalid -->
	This content should be removed.
	<!-- END: VLT:>=v1.invalid -->
	`

		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow(
			'Invalid version format in directive: VLT:>=v1.invalid. Expected format: vX.Y.x',
		)
	})

	it('should throw an error for invalid comparator', async () => {
		const markdown = `
	<!-- BEGIN: VLT:!v1.20.x -->
	This content should be removed.
	<!-- END: VLT:!v1.20.x -->
	`

		await expect(async () => {
			return await runTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow(/Invalid directive format: VLT:!v1.20.x/)
	})

	it('should handle multiple version blocks correctly', async () => {
		const markdown = `
<!-- BEGIN: VLT:>=v1.21.x -->
This should be removed.
<!-- END: VLT:>=v1.21.x -->
<!-- BEGIN: VLT:<=v1.21.x -->
This should stay.
<!-- END: VLT:<=v1.21.x -->
Final content.
`
		const result = await runTransform(markdown, vaultVersion, filePath)

		expect(result.trim()).toBe(`<!-- BEGIN: VLT:<=v1.21.x -->

This should stay.

<!-- END: VLT:<=v1.21.x -->

Final content.`)
	})

	it('should ignore Terraform product directives and leave them untouched', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This TFC content should be ignored by Vault transform.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only -->
This TFEnterprise content should also be ignored.
<!-- END: TFEnterprise:only -->
<!-- BEGIN: VLT:>=v1.21.x -->
This Vault content should be removed.
<!-- END: VLT:>=v1.21.x -->
Regular content that stays.
`
		const result = await runTransform(markdown, vaultVersion, filePath)

		expect(result.trim()).toBe(`<!-- BEGIN: TFC:only -->

This TFC content should be ignored by Vault transform.

<!-- END: TFC:only -->

<!-- BEGIN: TFEnterprise:only -->

This TFEnterprise content should also be ignored.

<!-- END: TFEnterprise:only -->

Regular content that stays.`)
	})

	it('should throw an error for directives with products not in directiveProducts array', async () => {
		// Override DIRECTIVE_PRODUCTS for this test only
		vi.doMock('../build-mdx-transforms.mjs', async (importOriginal) => {
			const actual = await importOriginal()
			return {
				...actual,
				DIRECTIVE_PRODUCTS: ['VLT', 'TFC'], // CONSUL not included
			}
		})

		// Need to re-import the transform after mocking
		const { transformExcludeVaultContent: mockTransform } = await import(
			'./index.mjs'
		)

		const markdown = `
<!-- BEGIN: CONSUL:>=v1.15.x -->
This should cause an error - CONSUL not in directiveProducts.
<!-- END: CONSUL:>=v1.15.x -->
`
		const customRunTransform = async (markdown, version, filePath) => {
			const processor = await remark()
				.use(remarkMdx)
				.use(mockTransform, { filePath, version })
				.process(markdown)
			return processor.contents
		}

		await expect(async () => {
			return await customRunTransform(markdown, vaultVersion, filePath)
		}).rejects.toThrow(
			'Directive block CONSUL:>=v1.15.x could not be parsed between lines 2 and 4',
		)
	})
})
