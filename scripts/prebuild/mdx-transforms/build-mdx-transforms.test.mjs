/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { fs, vol } from 'memfs'
import { buildMdxTransforms } from './build-mdx-transforms.mjs'
import * as repoConfig from '#productConfig.mjs'

vi.mock('node:fs')
vi.mock('node:fs/promises')

describe('applyMdxTransforms - Integration Tests', () => {
	const mockVersionMetadata = {
		vault: [
			{ version: 'v1.19.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.20.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.21.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true },
		],
		'terraform-docs-common': [
			{ version: 'v1.20.x', releaseStage: 'stable', isLatest: true },
		],
		'terraform-enterprise': [
			{ version: 'v202409-2', releaseStage: 'stable', isLatest: true },
		],
	}

	beforeEach(() => {
		vol.reset()
		vi.clearAllMocks()
	})

	afterEach(() => {
		vol.reset()
	})

	describe('Global Partials Processing', () => {
		test('should process global partials and include content in output', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: false,
				},
			})

			const globalPartialContent = `---
page_title: Global Partial
---

This is global partial content that should be included.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include 'global-test.mdx'

Regular content after partial.
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/global-test.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputContent = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(outputContent).toContain(
				'This is global partial content that should be included',
			)
			expect(outputContent).toContain('Regular content after partial')
			expect(outputContent).not.toContain('@include')
		})

		test('should process nested global partials correctly', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: false,
				},
			})

			const nestedPartialContent = `---
page_title: Nested Partial
---

Nested partial content.`

			const parentPartialContent = `---
page_title: Parent Partial
---

Parent partial start.

@include 'nested.mdx'

Parent partial end.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include 'parent.mdx'

Main content.
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/parent.mdx': parentPartialContent,
				'/content/vault/v1.20.x/docs/partials/nested.mdx': nestedPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputContent = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(outputContent).toContain('Parent partial start')
			expect(outputContent).toContain('Nested partial content')
			expect(outputContent).toContain('Parent partial end')
			expect(outputContent).toContain('Main content')
		})
	})

	describe('Content Exclusion After Partials', () => {
		test('should process exclusion directives in global partials', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: Versioned Content
---

This content is always visible.

<!-- BEGIN: Vault:>=v1.21.x -->
This content is only for v1.21.x and later.
<!-- END: Vault:>=v1.21.x -->

This content is also always visible.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include 'versioned-content.mdx'
`

			// Test with v1.20.x - should exclude v1.21.x content
			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/versioned-content.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV120 = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV120).toContain('This content is always visible')
			expect(outputV120).not.toContain(
				'This content is only for v1.21.x and later',
			)
			expect(outputV120).toContain('This content is also always visible')

			// Reset and test with v1.21.x - should include v1.21.x content
			vol.reset()
			vol.fromJSON({
				'/content/vault/v1.21.x/docs/test.mdx': mainContent,
				'/content/vault/v1.21.x/docs/partials/versioned-content.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV121 = fs.readFileSync(
				'/output/vault/v1.21.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV121).toContain('This content is always visible')
			expect(outputV121).toContain('This content is only for v1.21.x and later')
			expect(outputV121).toContain('This content is also always visible')
		})

		test('should process exclusion directives in main file with included partials', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: New Feature
---

Partial content here.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

<!-- BEGIN: Vault:>=v1.21.x -->
@include 'new-feature.mdx'
<!-- END: Vault:>=v1.21.x -->

Regular content.
`

			// Test with v1.20.x - should exclude entire block including partial
			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/new-feature.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV120 = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV120).not.toContain('Partial content here')
			expect(outputV120).toContain('Regular content')

			// Test with v1.21.x - should include partial
			vol.reset()
			vol.fromJSON({
				'/content/vault/v1.21.x/docs/test.mdx': mainContent,
				'/content/vault/v1.21.x/docs/partials/new-feature.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV121 = fs.readFileSync(
				'/output/vault/v1.21.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV121).toContain('Partial content here')
			expect(outputV121).toContain('Regular content')
		})

		test('should handle multiple exclusion blocks in same partial', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: Complex Partial
---

Partial header.

<!-- BEGIN: Vault:>=v1.21.x -->
This is v1.21.x specific content.
<!-- END: Vault:>=v1.21.x -->

Middle content.

<!-- BEGIN: Vault:>=v1.22.x -->
This is v1.22.x specific content.
<!-- END: Vault:>=v1.22.x -->

Partial footer.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include 'complex.mdx'

Always visible content.
`

			// Test with v1.20.x - should exclude both version-specific blocks
			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/complex.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV120 = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV120).toContain('Partial header')
			expect(outputV120).not.toContain('This is v1.21.x specific content')
			expect(outputV120).toContain('Middle content')
			expect(outputV120).not.toContain('This is v1.22.x specific content')
			expect(outputV120).toContain('Partial footer')
			expect(outputV120).toContain('Always visible content')

			// Test with v1.21.x - should include v1.21.x content but exclude v1.22.x
			vol.reset()
			vol.fromJSON({
				'/content/vault/v1.21.x/docs/test.mdx': mainContent,
				'/content/vault/v1.21.x/docs/partials/complex.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV121 = fs.readFileSync(
				'/output/vault/v1.21.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV121).toContain('Partial header')
			expect(outputV121).toContain('This is v1.21.x specific content')
			expect(outputV121).toContain('Middle content')
			expect(outputV121).not.toContain('This is v1.22.x specific content')
			expect(outputV121).toContain('Partial footer')
			expect(outputV121).toContain('Always visible content')

			// Test with v1.22.x - should include all content
			vol.reset()
			vol.fromJSON({
				'/content/vault/v1.22.x/docs/test.mdx': mainContent,
				'/content/vault/v1.22.x/docs/partials/complex.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const outputV122 = fs.readFileSync(
				'/output/vault/v1.22.x/docs/test.mdx',
				'utf8',
			)
			expect(outputV122).toContain('Partial header')
			expect(outputV122).toContain('This is v1.21.x specific content')
			expect(outputV122).toContain('Middle content')
			expect(outputV122).toContain('This is v1.22.x specific content')
			expect(outputV122).toContain('Partial footer')
			expect(outputV122).toContain('Always visible content')
		})

		test('should preserve content after Vault:>=v1.21.x wrapping partial in v1.20.x', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			// Realistic partial content for a new feature
			const partialContent = `## New Authentication Method

The LDAP authentication method now supports advanced filtering.

### Configuration

\`\`\`hcl
auth "ldap" {
  url = "ldap://ldap.example.com"
  user_filter = "(cn={{.Username}})"
}
\`\`\`

### API Endpoints

- \`POST /auth/ldap/config\` - Configure the LDAP auth method
- \`GET /auth/ldap/config\` - Read the LDAP configuration
`

			const mainContent = `---
page_title: Authentication Methods
---

# Authentication Methods

Vault supports multiple authentication methods.

## Token Authentication

Token authentication is the default method in Vault.

<!-- BEGIN: Vault:>=v1.21.x -->

@include 'ldap-advanced.mdx'

<!-- END: Vault:>=v1.21.x -->

## AppRole Authentication

AppRole is designed for machine authentication.

### Configuration Steps

1. Enable the AppRole auth method
2. Create a role with policies
3. Generate role credentials
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/auth-methods.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/ldap-advanced.mdx':
					partialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const output = fs.readFileSync(
				'/output/vault/v1.20.x/docs/auth-methods.mdx',
				'utf8',
			)

			// Content before Vault:>=v1.21.x should be present
			expect(output).toContain('## Token Authentication')
			expect(output).toContain('Token authentication is the default method')

			// Vault:>=v1.21.x content (the entire partial) should be removed in v1.20.x
			expect(output).not.toContain('## New Authentication Method')
			expect(output).not.toContain('LDAP authentication method')
			expect(output).not.toContain('auth "ldap"')
			expect(output).not.toContain('POST /auth/ldap/config')

			// CRITICAL: Content after Vault:>=v1.21.x block should be preserved
			// This is the bug - when all nodes in range are removed, insideRange stays true
			expect(output).toContain('## AppRole Authentication')
			expect(output).toContain('AppRole is designed for machine authentication')
			expect(output).toContain('### Configuration Steps')
			expect(output).toContain('Enable the AppRole auth method')
		})
	})

	describe('Error Cases', () => {
		test('should handle error when partial file does not exist', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: false,
				},
			})

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include 'nonexistent.mdx'
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
			})

			// Mock console.error to suppress error output during test
			const consoleErrorSpy = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {})
			const processExitSpy = vi
				.spyOn(process, 'exit')
				.mockImplementation(() => {})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			expect(processExitSpy).toHaveBeenCalledWith(1)
			expect(consoleErrorSpy).toHaveBeenCalled()

			consoleErrorSpy.mockRestore()
			processExitSpy.mockRestore()
		})

		test('should handle error with malformed exclusion directive in partial', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: Bad Directive
---

<!-- BEGIN: Vault:INVALID -->
This has an invalid directive.
<!-- END: Vault:INVALID -->`

			const mainContent = `---
page_title: Test Page
---

@include 'bad-directive.mdx'
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/bad-directive.mdx':
					globalPartialContent,
			})

			const consoleErrorSpy = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {})
			const processExitSpy = vi
				.spyOn(process, 'exit')
				.mockImplementation(() => {})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			expect(processExitSpy).toHaveBeenCalledWith(1)
			expect(consoleErrorSpy).toHaveBeenCalled()

			consoleErrorSpy.mockRestore()
			processExitSpy.mockRestore()
		})

		test('should handle error with mismatched exclusion BEGIN/END in partial', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: Mismatched
---

<!-- BEGIN: Vault:>=v1.21.x -->
Content here
<!-- END: Vault:>=v1.22.x -->`

			const mainContent = `---
page_title: Test Page
---

@include 'mismatched.mdx'
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test.mdx': mainContent,
				'/content/vault/v1.20.x/docs/partials/mismatched.mdx':
					globalPartialContent,
			})

			const consoleErrorSpy = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {})
			const processExitSpy = vi
				.spyOn(process, 'exit')
				.mockImplementation(() => {})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			expect(processExitSpy).toHaveBeenCalledWith(1)
			expect(consoleErrorSpy).toHaveBeenCalled()

			consoleErrorSpy.mockRestore()
			processExitSpy.mockRestore()
		})
	})
	describe('Global Partials Skip Content Exclusion', () => {
		test('should skip content exclusion for files in global/partials directory', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			// Global partial should NOT have exclusion directives processed
			// It should remain as-is with the directives intact
			const globalPartialContent = `---
page_title: Global Partial
---

This is always visible.

<!-- BEGIN: Vault:>=v1.21.x -->
This directive should NOT be processed in the global partial file itself.
<!-- END: Vault:>=v1.21.x -->

More content.`

			const mainContent = `---
page_title: Test Page
---

# Test Page

@include '../../../global/partials/mock-global-partial.mdx'
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/test-page.mdx': mainContent,
				'/content/vault/global/partials/mock-global-partial.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			// The global partial file itself should NOT be processed for exclusions
			// It should be written as-is with directives intact
			const globalPartialOutput = fs.readFileSync(
				'/output/vault/global/partials/mock-global-partial.mdx',
				'utf8',
			)
			expect(globalPartialOutput).toContain('<!-- BEGIN: Vault:>=v1.21.x -->')
			expect(globalPartialOutput).toContain(
				'This directive should NOT be processed in the global partial file itself.',
			)
			expect(globalPartialOutput).toContain('<!-- END: Vault:>=v1.21.x -->')

			// However, when included in the main file, the exclusion directives SHOULD be processed
			const mainOutput = fs.readFileSync(
				'/output/vault/v1.20.x/docs/test-page.mdx',
				'utf8',
			)
			expect(mainOutput).toContain('This is always visible')
			expect(mainOutput).not.toContain(
				'This directive should NOT be processed in the global partial file itself.',
			)
			expect(mainOutput).toContain('More content')
			// The directives themselves should be removed from the included content
			expect(mainOutput).not.toContain('<!-- BEGIN: Vault:>=v1.21.x -->')
			expect(mainOutput).not.toContain('<!-- END: Vault:>=v1.21.x -->')
		})
	})

	// we don't need cross product support right now since this product doesn't have global partials
	// but ill keep it around just in case
	describe('Terraform Product Exclusions', () => {
		test('should remove TFC:only block wrapping @include in terraform-enterprise', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				'terraform-enterprise': {
					contentDir: 'docs',
					versionedDocs: true,
					supportsExclusionDirectives: true,
				},
			})

			const partialContent = `-> **Note:** Ephemeral workspace (automatic destroy runs) functionality is available in HCP Terraform **Plus** Edition. Refer to [HCP Terraform pricing](https://www.hashicorp.com/products/terraform/pricing) for details.
`

			const mainContent = `---
page_title: Managing Projects
---

## Automatically destroy inactive workspaces

<!-- BEGIN: TFC:only name:pnp-callout -->

@include 'tfc-package-callouts/ephemeral-workspaces.mdx'

<!-- END: TFC:only name:pnp-callout -->

You can configure HCP Terraform to automatically destroy.
`

			vol.fromJSON({
				'/content/terraform-enterprise/v202409-2/docs/enterprise/projects/managing.mdx':
					mainContent,
				'/content/terraform-enterprise/v202409-2/docs/partials/tfc-package-callouts/ephemeral-workspaces.mdx':
					partialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const output = fs.readFileSync(
				'/output/terraform-enterprise/v202409-2/docs/enterprise/projects/managing.mdx',
				'utf8',
			)

			// The TFC:only block should be removed in terraform-enterprise
			expect(output).not.toContain('Ephemeral workspace')
			expect(output).not.toContain('Plus Edition')
			expect(output).toContain('You can configure HCP Terraform')
		})

		test('should process TFC:only directives in global partials', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				'terraform-docs-common': {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const globalPartialContent = `---
page_title: Product Specific
---

<!-- BEGIN: TFC:only -->
This is TFC-only content.
<!-- END: TFC:only -->

<!-- BEGIN: TFEnterprise:only -->
This is TFE-only content.
<!-- END: TFEnterprise:only -->

Common content.`

			const mainContent = `---
page_title: Test Page
---

@include 'product-specific.mdx'
`

			vol.fromJSON({
				'/content/terraform-docs-common/v1.20.x/docs/test.mdx': mainContent,
				'/content/terraform-docs-common/v1.20.x/docs/partials/product-specific.mdx':
					globalPartialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const output = fs.readFileSync(
				'/output/terraform-docs-common/v1.20.x/docs/test.mdx',
				'utf8',
			)
			expect(output).toContain('This is TFC-only content')
			expect(output).not.toContain('This is TFE-only content')
			expect(output).toContain('Common content')
		})

		test('should preserve content after TFC:only wrapping partial in terraform-enterprise', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				'terraform-enterprise': {
					contentDir: 'docs',
					versionedDocs: true,
					supportsExclusionDirectives: true,
				},
			})

			// Realistic partial content matching actual changelog structure
			const partialContent = `### 2022-10-06

-   Updated the [Policies API](/enterprise/api-docs/policies) with support for Open Policy Agent (OPA) policies.
-   Update [Policy Sets](/enterprise/api-docs/policy-sets) with support for OPA policy sets.
-   Updated [Policy Checks](/enterprise/api-docs/policy-checks) to add support for listing policy evaluations and policy set outcomes.
-   Update [Run Tasks Stage](/enterprise/api-docs/run-tasks/run-task-stages-and-results) to include the new \`policy_evaluations\` attribute in the output.
`

			const mainContent = `---
page_title: API Changelog - API Docs - Terraform Enterprise
---

# API Changelog

Keep track of changes to the API for Terraform Cloud and Terraform Enterprise.

## 2022-10-17

-   Updated the Organizations API with force-delete-workspaces.
-   Updated the Workspaces API with a safe delete endpoint.

### 2022-10-12

-   Update Policy Checks with result counts.
-   Update Team Membership API to include adding users.

<!-- BEGIN: TFC:only name:opa-policies -->

@include 'opa-policies.mdx'

<!-- END: TFC:only name:opa-policies -->

### 2022-09-21

-   Update State Versions with optional json-state-outputs.
-   Update State Version Outputs with a detailed-type attribute.

### 2022-07-26

-   Updated the Run status list with fetching and queuing.
-   Update Run Tasks to include the new stages attribute.
`

			vol.fromJSON({
				'/content/terraform-enterprise/v202301-1/docs/enterprise/api-docs/changelog.mdx':
					mainContent,
				'/content/terraform-enterprise/v202301-1/docs/partials/opa-policies.mdx':
					partialContent,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const output = fs.readFileSync(
				'/output/terraform-enterprise/v202301-1/docs/enterprise/api-docs/changelog.mdx',
				'utf8',
			)

			// Content before TFC:only should be present
			expect(output).toContain('### 2022-10-12')
			expect(output).toContain('Update Policy Checks with result counts')

			// TFC:only content (the entire partial) should be removed in terraform-enterprise
			expect(output).not.toContain('### 2022-10-06')
			expect(output).not.toContain('Open Policy Agent (OPA)')
			expect(output).not.toContain('policy_evaluations')

			// CRITICAL: Content after TFC:only block should be preserved
			// This is the bug - when all nodes in range are removed, insideRange stays true
			expect(output).toContain('### 2022-09-21')
			expect(output).toContain(
				'Update State Versions with optional json-state-outputs',
			)
			expect(output).toContain('### 2022-07-26')
			expect(output).toContain(
				'Updated the Run status list with fetching and queuing',
			)
		})
	})

	describe('Multiple Files Processing', () => {
		test('should process multiple files with partials and exclusions', async () => {
			vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
				vault: {
					versionedDocs: true,
					basePaths: ['docs'],
					supportsExclusionDirectives: true,
				},
			})

			const sharedPartial = `---
page_title: Shared Partial
---

Shared partial content.`

			const versionedPartial = `---
page_title: Versioned Partial
---

<!-- BEGIN: Vault:>=v1.21.x -->
New feature documentation.
<!-- END: Vault:>=v1.21.x -->`

			const file1 = `---
page_title: File 1
---

@include 'shared.mdx'
`

			const file2 = `---
page_title: File 2
---

@include 'versioned.mdx'
`

			vol.fromJSON({
				'/content/vault/v1.20.x/docs/file1.mdx': file1,
				'/content/vault/v1.20.x/docs/file2.mdx': file2,
				'/content/vault/v1.20.x/docs/partials/shared.mdx': sharedPartial,
				'/content/vault/v1.20.x/docs/partials/versioned.mdx': versionedPartial,
			})

			await buildMdxTransforms('/content', '/output', mockVersionMetadata)

			const output1 = fs.readFileSync(
				'/output/vault/v1.20.x/docs/file1.mdx',
				'utf8',
			)
			expect(output1).toContain('Shared partial content')

			const output2 = fs.readFileSync(
				'/output/vault/v1.20.x/docs/file2.mdx',
				'utf8',
			)
			expect(output2).not.toContain('New feature documentation')
		})

		describe('Partial Content Edge Cases - Multi-line Partials', () => {
			test('should remove multi-line partial wrapped in TFC:only directive', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-enterprise': {
						contentDir: 'docs',
						versionedDocs: true,
						supportsExclusionDirectives: true,
					},
				})

				// Multi-line partial (2 lines) - this was the bug case
				const partialContent = `-> **Note:** Ephemeral workspace (automatic destroy runs) functionality is available in Terraform Cloud **Plus** Edition. Refer to [Terraform Cloud pricing](https://www.hashicorp.com/products/terraform/pric
ing) for details.
`

				const mainContent = `---
page_title: Notification Configurations
---

## Workspace Notifications

<!-- BEGIN: TFC:only name:pnp-callout -->

@include 'tfc-package-callouts/ephemeral-workspaces.mdx'

<!-- END: TFC:only name:pnp-callout -->

Automatic destroy run notifications contain the following information.
`

				vol.fromJSON({
					'/content/terraform-enterprise/v202311-1/docs/enterprise/api-docs/notification-configurations.mdx':
						mainContent,
					'/content/terraform-enterprise/v202311-1/docs/partials/tfc-package-callouts/ephemeral-workspaces.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', mockVersionMetadata)

				const output = fs.readFileSync(
					'/output/terraform-enterprise/v202311-1/docs/enterprise/api-docs/notification-configurations.mdx',
					'utf8',
				)

				// The multi-line partial content should be removed
				expect(output).not.toContain('Ephemeral workspace')
				expect(output).not.toContain('Plus Edition')
				expect(output).not.toContain('pricing')
				expect(output).toContain('Automatic destroy run notifications')
			})

			test('should remove partial with multiple paragraphs', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-enterprise': {
						contentDir: 'docs',
						versionedDocs: true,
						supportsExclusionDirectives: true,
					},
				})

				const partialContent = `**Note:** First paragraph.

Second paragraph with more content.

Third paragraph.
`

				const mainContent = `---
page_title: Test
---

## Section

<!-- BEGIN: TFC:only -->

@include 'multi-para.mdx'

<!-- END: TFC:only -->

Keep this content.
`

				vol.fromJSON({
					'/content/terraform-enterprise/v202402-1/docs/test.mdx': mainContent,
					'/content/terraform-enterprise/v202402-1/docs/partials/multi-para.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', mockVersionMetadata)

				const output = fs.readFileSync(
					'/output/terraform-enterprise/v202402-1/docs/test.mdx',
					'utf8',
				)

				expect(output).not.toContain('First paragraph')
				expect(output).not.toContain('Second paragraph')
				expect(output).not.toContain('Third paragraph')
				expect(output).toContain('Keep this content')
			})

			test('should remove partial with nested markdown (lists, code blocks)', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-enterprise': {
						contentDir: 'docs',
						versionedDocs: true,
						supportsExclusionDirectives: true,
					},
				})

				const partialContent = `**Features:**

- Item 1
- Item 2
- Item 3

\`\`\`bash
echo "test"
\`\`\`
`

				const mainContent = `---
page_title: Test
---

<!-- BEGIN: TFC:only -->

@include 'nested.mdx'

<!-- END: TFC:only -->

Regular content.
`

				vol.fromJSON({
					'/content/terraform-enterprise/v202310-1/docs/test.mdx': mainContent,
					'/content/terraform-enterprise/v202310-1/docs/partials/nested.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', mockVersionMetadata)

				const output = fs.readFileSync(
					'/output/terraform-enterprise/v202310-1/docs/test.mdx',
					'utf8',
				)

				expect(output).not.toContain('Features:')
				expect(output).not.toContain('Item 1')
				expect(output).not.toContain('echo "test"')
				expect(output).toContain('Regular content')
			})

			test('should handle partial with many lines (high line numbers)', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-enterprise': {
						contentDir: 'docs',
						versionedDocs: true,
						supportsExclusionDirectives: true,
					},
				})

				// Partial spanning 20+ lines
				const partialContent = `Line 1 content.

Line 3 content.

Line 5 content.

Line 7 content.

Line 9 content.

Line 11 content.

Line 13 content.

Line 15 content.

Line 17 content.

Line 19 content.
`

				const mainContent = `---
page_title: Test
---

## Section

<!-- BEGIN: TFC:only -->

@include 'long.mdx'

<!-- END: TFC:only -->

Keep this.
`

				vol.fromJSON({
					'/content/terraform-enterprise/v202301-1/docs/test.mdx': mainContent,
					'/content/terraform-enterprise/v202301-1/docs/partials/long.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', mockVersionMetadata)

				const output = fs.readFileSync(
					'/output/terraform-enterprise/v202301-1/docs/test.mdx',
					'utf8',
				)

				expect(output).not.toContain('Line 1 content')
				expect(output).not.toContain('Line 9 content')
				expect(output).not.toContain('Line 19 content')
				expect(output).toContain('Keep this')
			})

			test('should keep multi-line partial in terraform-docs-common when wrapped in TFC:only', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-docs-common': {
						versionedDocs: true,
						basePaths: ['docs'],
						supportsExclusionDirectives: true,
					},
				})

				const partialContent = `-> **Note:** Multi-line
partial content for TFC.
`

				const mainContent = `---
page_title: Test
---

<!-- BEGIN: TFC:only -->

@include 'tfc-feature.mdx'

<!-- END: TFC:only -->

Regular content.
`

				vol.fromJSON({
					'/content/terraform-docs-common/v1.9.x/docs/cloud-docs/test.mdx':
						mainContent,
					'/content/terraform-docs-common/v1.9.x/docs/partials/tfc-feature.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', mockVersionMetadata)

				const output = fs.readFileSync(
					'/output/terraform-docs-common/v1.9.x/docs/cloud-docs/test.mdx',
					'utf8',
				)

				// TFC:only content should be KEPT in terraform-docs-common
				expect(output).toContain('Multi-line')
				expect(output).toContain('partial content for TFC')
				expect(output).toContain('Regular content')
			})

			test('should keep TFEnterprise:only content wrapping partial in terraform-enterprise', async () => {
				vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
					'terraform-enterprise': {
						contentDir: 'docs',
						versionedDocs: true,
						supportsExclusionDirectives: true,
					},
				})

				// Partial content from api-code-blocks/authentication.mdx
				const partialContent = `Requests to the [\`/api/v1/ping\`](/terraform/enterprise/api-docs/ping) and [\`/api/v1/usage/bundle\`](/terraform/enterprise/api-docs/usage-bundle) endpoints must be authenticated with a bearer token generated specifically for them using the \`tfectl admin api-token generate\` command. For more information on the token creation, and management, refer to the [tfectl documentation](/terraform/enterprise/deploy/reference/cli).

Use the HTTP Header \`Authorization\` with the value \`Bearer <token>\`.
`

				const mainContent = `---
page_title: API documentation for Terraform Enterprise
---

Before planning an API integration, consider whether the [HCP Terraform and Terraform Enterprise provider](https://registry.terraform.io/providers/hashicorp/tfe/latest/docs) meets your needs.

The [HashiCorp API stability policy](/terraform/enterprise/api-docs/stability-policy) ensures backward compatibility for stable endpoints.

<!-- BEGIN: TFEnterprise:only name:api-overview -->

## System endpoints

The API includes endpoints for system-level operations, such as health checks and usage reporting. System endpoints have different authentication and rate limiting requirements than application endpoints. Refer to the following documentation for details about system endpoints:

-   [\`/api/v1/ping\`](/terraform/enterprise/api-docs/ping). Call this endpoint to verify system operation.
-   [\`/api/v1/usage/bundle\`](/terraform/enterprise/api-docs/usage-bundle). Call this endpoint to retrieve a usage data bundle.

<!-- END: TFEnterprise:only name:api-overview  -->

## Authentication

-   [Organization tokens](/terraform/enterprise/users-teams-organizations/api-tokens#organization-api-tokens) — each organization can have one API token at a time.
    <!-- BEGIN: TFC:only -->
-   [Audit trails token](/terraform/enterprise/users-teams-organizations/api-tokens#audit-trails-tokens) - each organization can have a single token.    <!-- END: TFC:only -->    <!-- BEGIN: TFEnterprise:only name:system-endpoints-auth -->

### System endpoints

@include "api-code-blocks/authentication.mdx"

<!-- END: TFEnterprise:only name:system-endpoints-auth -->

### Blob storage authentication
`

				vol.fromJSON({
					'/content/terraform-enterprise/v202507-1/docs/enterprise/api-docs/index.mdx':
						mainContent,
					'/content/terraform-enterprise/v202507-1/docs/partials/api-code-blocks/authentication.mdx':
						partialContent,
				})

				await buildMdxTransforms('/content', '/output', {
					'terraform-enterprise': [
						{ version: 'v202507-1', releaseStage: 'stable', isLatest: true },
					],
				})

				const output = fs.readFileSync(
					'/output/terraform-enterprise/v202507-1/docs/enterprise/api-docs/index.mdx',
					'utf8',
				)

				// TFEnterprise:only blocks should be KEPT in terraform-enterprise
				expect(output).toContain('## System endpoints')
				expect(output).toContain('Requests to the [`/api/v1/ping`]')
				expect(output).toContain('tfectl admin api-token generate')
				expect(output).toContain('### Blob storage authentication')

				// TFC:only content should be REMOVED in terraform-enterprise
				expect(output).not.toContain('Audit trails token')

				// Should not contain the @include directive
				expect(output).not.toContain('@include')
			})
		})
	})
})
