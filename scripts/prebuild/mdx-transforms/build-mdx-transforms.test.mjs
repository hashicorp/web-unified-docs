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
	})
})
