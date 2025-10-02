/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect } from 'vitest'
import { transformExcludeContent } from './index.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

const runTransform = async (markdown, options) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transformExcludeContent, options)
		.process(markdown)
	return processor.contents
}

// Mock product configs
const vaultConfig = {
	supportsExclusionDirectives: true,
}

const terraformDocsCommonConfig = {
	supportsExclusionDirectives: true,
}

const terraformEnterpriseConfig = {
	supportsExclusionDirectives: true,
}

const noExclusionConfig = {
	supportsExclusionDirectives: undefined,
}

describe('transformExcludeContent - Vault Directives', () => {
	const vaultOptions = {
		filePath: 'vault/some-file.md',
		version: '1.20.x',
		repoSlug: 'vault',
		productConfig: vaultConfig,
	}

	it('should remove content when version condition is not met', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END: Vault:>=v1.21.x -->
This content should stay.
`
		const result = await runTransform(markdown, vaultOptions)
		expect(result).toBe('This content should stay.\n')
	})

	it('should keep content when version condition is met', async () => {
		const markdown = `
<!-- BEGIN: Vault:<=v1.21.x -->
This content should stay.
<!-- END: Vault:<=v1.21.x -->
Other content.
`
		const result = await runTransform(markdown, vaultOptions)
		expect(result.trim()).toBe(`<!-- BEGIN: Vault:<=v1.21.x -->

This content should stay.

<!-- END: Vault:<=v1.21.x -->

Other content.`)
	})

	it('should handle equality comparisons', async () => {
		const equalOptions = { ...vaultOptions, version: '1.20.x' }
		const markdown = `
<!-- BEGIN: Vault:=v1.20.x -->
This content should stay.
<!-- END: Vault:=v1.20.x -->
`
		const result = await runTransform(markdown, equalOptions)
		expect(result.trim()).toBe(`<!-- BEGIN: Vault:=v1.20.x -->

This content should stay.

<!-- END: Vault:=v1.20.x -->`)
	})

	it('should handle inequal comparisons', async () => {
		const equalOptions = { ...vaultOptions, version: '1.19.x' }
		const markdown = `
<!-- BEGIN: Vault:=v1.20.x -->
This content should be removed.
<!-- END: Vault:=v1.20.x -->
This content should stay.
`
		const result = await runTransform(markdown, equalOptions)
		expect(result.trim()).toBe(`This content should stay.`)
	})

	it('should handle less than comparisons', async () => {
		const markdown = `
<!-- BEGIN: Vault:<v1.19.x -->
This content should be removed.
<!-- END: Vault:<v1.19.x -->
`
		const result = await runTransform(markdown, vaultOptions)

		expect(result.trim()).toBe('')
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
		const result = await runTransform(markdown, vaultOptions)

		expect(result.trim()).toBe(`<!-- BEGIN: Vault:<=v1.21.x -->

This should stay.

<!-- END: Vault:<=v1.21.x -->

Final content.`)
	})
})

describe('transformExcludeContent - TFC/TFEnterprise Directives', () => {
	it('should keep TFC:only content in terraform-docs-common', async () => {
		const options = {
			filePath: 'terraform-docs-common/cloud-docs/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform-docs-common',
			productConfig: terraformDocsCommonConfig,
		}

		const markdown = `
<!-- BEGIN: TFC:only -->
This content should NOT be removed.
<!-- END: TFC:only -->
This content should stay.
`
		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(`<!-- BEGIN: TFC:only -->

This content should NOT be removed.

<!-- END: TFC:only -->

This content should stay.`)
	})

	it('should remove TFC:only content from terraform-enterprise', async () => {
		const options = {
			filePath: 'terraform-enterprise/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}

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

		const result = await runTransform(markdown, options)
		expect(result).toBe(expected)
	})

	// This is a good test in case partials are used and write to multiple unintended product directories
	it('should remove both TFC:only and TFEnterprise:only from terraform product', async () => {
		const options = {
			filePath: 'terraform/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform',
			productConfig: { supportsExclusionDirectives: true },
		}

		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only -->
This content should be removed.
<!-- END: TFEnterprise:only -->
This content should stay.
`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe('This content should stay.')
	})

	// Here adding in test for cross product support- this behavior is currently well documented in the README so if any change needs to happen later
	// it can
	it('should remove TFEnterprise:only with name parameter from terraform product', async () => {
		const options = {
			filePath: 'terraform/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform',
			productConfig: { supportsExclusionDirectives: true },
		}

		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
<!-- BEGIN: TFEnterprise:only name:revoke -->
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform/enterprise/api-docs/private-registry/manage-module-versions).
<!-- END: TFEnterprise:only name:revoke -->

This content should stay.
`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe('This content should stay.')
	})

	it('should remove TFC:only with name parameter from terraform-enterprise', async () => {
		const options = {
			filePath:
				'terraform-enterprise/v202409-2/docs/enterprise/projects/managing.md',
			version: 'v202409-2',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}

		const markdown = `
## Automatically destroy inactive workspaces

<!-- BEGIN: TFC:only name:pnp-callout -->
**Note:** Ephemeral workspace functionality is available in HCP Terraform Plus Edition.
<!-- END: TFC:only name:pnp-callout -->

You can configure HCP Terraform to automatically destroy.
`

		const result = await runTransform(markdown, options)
		expect(result).not.toContain('Ephemeral workspace')
		expect(result).toContain('You can configure HCP Terraform')
	})

	it('should throw an error for mismatched block name directives', async () => {
		const options = {
			filePath: 'terraform-enterprise/some-file.md',
			version: '1.20.x',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:other -->
`
		await expect(async () => {
			return await runTransform(markdown, options)
		}).rejects.toThrow('Mismatched block names')
	})
})

describe('transformExcludeContent - Error Handling', () => {
	const vaultOptions = {
		filePath: 'vault/some-file.md',
		version: '1.20.x',
		repoSlug: 'vault',
		productConfig: vaultConfig,
	}

	it('should throw error for unknown directive products', async () => {
		const markdown = `
<!-- BEGIN: INVALID:>=v1.21.x -->
This content should throw an error
<!-- END: INVALID:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Unknown directive product: "INVALID"')
	})

	it('should throw error for mismatched block names', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END: Vault:>=v1.22.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Mismatched block names')
	})

	it('should throw error for invalid vault directive format', async () => {
		const markdown = `
<!-- BEGIN: Vault:invalid -->
This content should throw an error.
<!-- END: Vault:invalid -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Invalid Vault directive: "invalid"')
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
<!-- BEGIN: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Nested BEGIN blocks not allowed')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: Vault:>=v1.21.x -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Empty BEGIN block')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await runTransform(markdown, vaultOptions)
		}).rejects.toThrow('Empty END block')
	})
})

describe('transformExcludeContent - Configuration', () => {
	it('should skip processing when supportsExclusionDirectives is false/undefined', async () => {
		const options = {
			filePath: 'some-product/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'some-product',
			productConfig: noExclusionConfig,
		}

		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->

This should be ignored.

<!-- END: Vault:>=v1.21.x -->

Content stays.
`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(markdown.trim())
	})

	it('should skip processing when no productConfig provided', async () => {
		const options = {
			filePath: 'some-product/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'some-product',
			// No productConfig
		}

		const markdown = `
<!-- BEGIN: Vault:>=v1.21.x -->

This should be ignored.

<!-- END: Vault:>=v1.21.x -->

Content stays.
`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(markdown.trim())
	})
})
