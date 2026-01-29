/**
 * Copyright IBM Corp. 2024, 2026
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

	it('should handle situations when the folder name includes extra text', async () => {
		const modifiedOptions = { ...vaultOptions, version: 'v1.21.x (rc)' }
		const markdown = `
<!-- BEGIN: Vault:=v1.21.x -->
This content should stay.
<!-- END: Vault:=v1.21.x -->
Other content.
`
		const result = await runTransform(markdown, modifiedOptions)
		expect(result.trim()).toBe(`<!-- BEGIN: Vault:=v1.21.x -->

This content should stay.

<!-- END: Vault:=v1.21.x -->

Other content.`)
	})

	it('should handle short versions correctly', async () => {
		const markdown = `
<!-- BEGIN: Vault:>=v2.x -->
This should be removed.
<!-- END: Vault:>=v2.x -->
<!-- BEGIN: Vault:<=v2.x -->
This should stay.
<!-- END: Vault:<=v2.x -->
Final content.
`
		const result = await runTransform(markdown, vaultOptions)

		expect(result.trim()).toBe(`<!-- BEGIN: Vault:<=v2.x -->

This should stay.

<!-- END: Vault:<=v2.x -->

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

	it('should remove TFC:only content from terraform-enterprise but when wrapped in list item/special text', async () => {
		const options = {
			filePath: 'terraform-enterprise/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}

		const markdown = `

## 2025-05-1

-   Add \`agent-pool\` relationship to the [run task API](/terraform/enterprise/api-docs/run-tasks/run-tasks), which you can use to assign a run task to an agent pool.
    <!-- BEGIN: TFC:only name:premium -->
-   Add \`private-run-tasks\` to [feature entitlements](/terraform/enterprise/api-docs#feature-entitlements).
    <!-- END: TFC:only name:premium -->
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform/enterprise/api-docs/private-registry/manage-module-versions).

`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(`## 2025-05-1

-   Add \`agent-pool\` relationship to the [run task API](/terraform/enterprise/api-docs/run-tasks/run-tasks), which you can use to assign a run task to an agent pool.
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform/enterprise/api-docs/private-registry/manage-module-versions).`)
	})

	// This is fine in case partials are used and write to multiple unintended product directories in terraform
	// But update/remove this test and add in specific functionality if the opposite of this cross product behavior is needed
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

	it('should remove TFEnterprise:only from terraform-docs-common but when wrapped in list item/special text', async () => {
		const options = {
			filePath: 'terraform-docs-common/cloud-docs/some-file.md',
			version: 'v1.20.x',
			repoSlug: 'terraform-docs-common',
			productConfig: terraformDocsCommonConfig,
		}

		const markdown = `

## 2025-05-1

-   Add \`agent-pool\` relationship to the [run task API](/terraform/enterprise/api-docs/run-tasks/run-tasks), which you can use to assign a run task to an agent pool.		
	<!-- BEGIN: TFEnterprise:only name:revoke -->
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform/enterprise/api-docs/private-registry/manage-module-versions).
	<!-- END: TFEnterprise:only name:revoke -->
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform-docs-common/api-docs/private-registry/manage-module-versions).

This content should stay.
`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(`## 2025-05-1

-   Add \`agent-pool\` relationship to the [run task API](/terraform/enterprise/api-docs/run-tasks/run-tasks), which you can use to assign a run task to an agent pool.		
-   You can now revoke, and revert the revocation of, module versions. Learn more about [Managing module versions](/terraform-docs-common/api-docs/private-registry/manage-module-versions).

This content should stay.`)
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

describe('transformExcludeContent - Real World Edge Cases (Bug Fixes)', () => {
	// Bug 1: END comment indented inside list item causes following content to be removed
	// From: content/terraform-enterprise/1.0.x/docs/enterprise/api-docs/changelog.mdx:394
	it('should preserve content after TFC:only block when END comment is indented in list item', async () => {
		const options = {
			filePath:
				'terraform-enterprise/1.0.x/docs/enterprise/api-docs/changelog.mdx',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}

		const markdown = `### 2022-06-23

<!-- BEGIN: TFC:only name:health-assessments -->

-   Added the [Assessments](/terraform/enterprise/api-docs/assessment-results).

-   Updated [Workspace](/terraform/enterprise/api-docs/workspaces#create-a-workspace) and
    [Notification Configurations](/terraform/enterprise/api-docs/notification-configurations#notification-triggers) to account for assessments.
    <!-- END: TFC:only name:health-assessments -->

-   Added new query parameter(s) to [List Runs endpoint](/terraform/enterprise/api-docs/run#list-runs-in-a-workspace).

### 2022-06-21`

		const expected = `### 2022-06-23

-   Added new query parameter(s) to [List Runs endpoint](/terraform/enterprise/api-docs/run#list-runs-in-a-workspace).

### 2022-06-21`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(expected.trim())
	})

	// Bug 2: BEGIN comment indented inside list item causes entire list to be removed
	// From: content/terraform-enterprise/v202506-1/docs/enterprise/api-docs/changelog.mdx:160
	it('should preserve content before and after TFC:only block when BEGIN comment is indented in list item', async () => {
		const options = {
			filePath:
				'terraform-enterprise/v202506-1/docs/enterprise/api-docs/changelog.mdx',
			repoSlug: 'terraform-enterprise',
			productConfig: terraformEnterpriseConfig,
		}

		const markdown = `-   Add documentation for configuring organization and workspace data retention policies through the API and on the different [types of data retention policies](/terraform/enterprise/api-docs/data-retention-policies).
    <!-- BEGIN: TFC:only name:explorer -->

## 2024-2-8

-   Add [Explorer API documentation](/terraform/enterprise/api-docs/explorer)
    <!-- END: TFC:only name:explorer -->
<!-- BEGIN: TFC:only -->
## 2024-1-30

-   Update the [Audit trails](/terraform/enterprise/api-docs/audit-trails) documentation to expand on the payloads for each event.
<!-- END: TFC:only -->
## 2024-1-24

-   Introduce configurable data retention policies at the site-wide level and extend data retention policies at the organization and workspace levels.`

		const expected = `-   Add documentation for configuring organization and workspace data retention policies through the API and on the different [types of data retention policies](/terraform/enterprise/api-docs/data-retention-policies).

## 2024-1-24

-   Introduce configurable data retention policies at the site-wide level and extend data retention policies at the organization and workspace levels.`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(expected.trim())
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
