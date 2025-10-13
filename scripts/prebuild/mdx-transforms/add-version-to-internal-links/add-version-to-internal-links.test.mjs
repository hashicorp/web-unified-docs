/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { transformRewriteInternalLinks } from './add-version-to-internal-links.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'

// Mock PRODUCT_CONFIG
vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			terraform: {
				basePaths: ['cli', 'internals', 'intro', 'language'],
				versionedDocs: true,
			},
			'terraform-enterprise': {
				basePaths: ['enterprise'],
				versionedDocs: true,
			},
			'terraform-cdk': {
				basePaths: ['cdktf'],
				versionedDocs: true,
			},
			'terraform-docs-agents': {
				basePaths: ['cloud-docs/agents'],
				versionedDocs: true,
			},
			'terraform-plugin-framework': {
				basePaths: ['plugin/framework'],
				versionedDocs: true,
			},
			'terraform-plugin-log': {
				basePaths: ['plugin/log'],
				versionedDocs: true,
			},
			'terraform-plugin-mux': {
				basePaths: ['plugin/mux'],
				versionedDocs: true,
			},
			'terraform-plugin-sdk': {
				basePaths: ['plugin/sdkv2'],
				versionedDocs: true,
			},
			'terraform-plugin-testing': {
				basePaths: ['plugin/testing'],
				versionedDocs: true,
			},
			'terraform-docs-common': {
				basePaths: [],
				versionedDocs: false,
			},
		},
	}
})

describe('transformRewriteInternalLinks', () => {
	it('should not rewrite internal links for paths other than the basePaths', async () => {
		const content = `[Link to plugin/mux](/plugin/mux/some-page)`
		const entry = {
			filePath: 'content/terraform/v1.8.x/docs/language/data-sources/index.mdx',
		}
		const expectedOutput = `[Link to plugin/mux](/plugin/mux/some-page)\n`

		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite links if the version is the latest', async () => {
		const latestVersion = versionMetadata['terraform'].find((version) => {
			return version.isLatest
		}).version
		const content = `[Link to latest version](/terraform/cli/some-page)[Link to another page](/terraform/language/another-page)`
		const entry = {
			filePath: `content/terraform/${latestVersion}/some-file.mdx`,
		}
		const expectedOutput =
			'[Link to latest version](/terraform/cli/some-page)[Link to another page](/terraform/language/another-page)\n'

		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite external links', async () => {
		const content = `[External link](https://example.com)`
		const entry = {
			filePath: 'content/terraform/v1.5.x/some-file.mdx',
		}
		const expectedOutput = '[External link](https://example.com)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links with basePaths', async () => {
		const content = `[Link to base path](/terraform/language/some-page)`
		const entry = {
			filePath: 'content/terraform/v1.8.x/docs/language/some-file.mdx',
		}
		const expectedOutput =
			'[Link to base path](/terraform/language/v1.8.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-enterprise', async () => {
		const content = `[Link to enterprise](/enterprise/some-page)`
		const entry = {
			filePath: 'content/terraform-enterprise/v202201/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to enterprise](/enterprise/v202201/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-cdk', async () => {
		const content = `[Link to cdktf](/cdktf/some-page)`
		const entry = {
			filePath: 'content/terraform-cdk/v0.0.1/docs/some-file.mdx',
		}
		const expectedOutput = `[Link to cdktf](/cdktf/v0.0.1/some-page)\n`
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-docs-agents', async () => {
		const content = `[agent pool](/terraform/cloud-docs/agents/agent-pools).`
		const entry = {
			filePath:
				'content/terraform-docs-agents/v1.10.x/docs/cloud-docs/agents/hooks.mdx',
		}
		const expectedOutput =
			'[agent pool](/terraform/cloud-docs/agents/v1.10.x/agent-pools).\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite internal links for a product with no basePaths array', async () => {
		const content = `[Link to cloud-docs](/cloud-docs/some-page)`
		const entry = {
			filePath: 'content/terraform-docs-common/docs/some-file.mdx',
		}
		const expectedOutput = content + '\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-plugin-framework', async () => {
		const content = `[Link to plugin/framework](/plugin/framework/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-framework/v1.3.x/docs/plugin/framework/handling-data/attributes/bool.mdx',
		}
		const expectedOutput =
			'[Link to plugin/framework](/plugin/framework/v1.3.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-plugin-log', async () => {
		const content = `[Link to plugin/log](/plugin/log/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-log/v0.7.x/docs/plugin/log/managing.mdx',
		}
		const expectedOutput =
			'[Link to plugin/log](/plugin/log/v0.7.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-plugin-mux', async () => {
		const content = `[Link to plugin/mux](/plugin/mux/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-mux/v0.11.x/docs/plugin/mux/combining-protocol-version-6-providers.mdx',
		}
		const expectedOutput = `[Link to plugin/mux](/plugin/mux/v0.11.x/some-page)\n`
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-plugin-sdk', async () => {
		const content = `[Link to plugin/sdkv2](/plugin/sdkv2/some-page)`
		const entry = {
			filePath: 'content/terraform-plugin-sdk/v2.31.x/docs/some-file.mdx',
		}
		const expectedOutput = `[Link to plugin/sdkv2](/plugin/sdkv2/v2.31.x/some-page)\n`
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite internal links for terraform-plugin-testing', async () => {
		const content = `[Link to plugin/testing](/plugin/testing/some-page)`
		const entry = {
			filePath: 'content/terraform-plugin-testing/v1.5.x/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to plugin/testing](/plugin/testing/v1.5.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should remove release stage in parentheses from version', async () => {
		const content = `[Link to plugin/testing](/plugin/testing/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-testing/v1.5.x (alpha)/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to plugin/testing](/plugin/testing/v1.5.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not modify version if there is no parentheses', async () => {
		const content = `[Link to plugin/testing](/plugin/testing/some-page)`
		const entry = {
			filePath: 'content/terraform-plugin-testing/v1.5.x/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to plugin/testing](/plugin/testing/v1.5.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should remove multiple spaces before parentheses', async () => {
		const content = `[Link to plugin/testing](/plugin/testing/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-testing/v1.5.x    (alpha)/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to plugin/testing](/plugin/testing/v1.5.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should handle version with parentheses but no space', async () => {
		const content = `[Link to plugin/testing](/plugin/testing/some-page)`
		const entry = {
			filePath:
				'content/terraform-plugin-testing/v1.5.x(alpha)/docs/some-file.mdx',
		}
		const expectedOutput =
			'[Link to plugin/testing](/plugin/testing/v1.5.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite links if they already contain a version that starts with v', async () => {
		const content = `[Link to versioned path](/terraform/language/v1.7.x/some-page)`
		const entry = {
			filePath: 'content/terraform/v1.8.x/docs/language/some-file.mdx',
		}
		const expectedOutput =
			'[Link to versioned path](/terraform/language/v1.7.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite links if they already contain a version that does not start with v', async () => {
		const content = `[Link to versioned path](/terraform/language/1.7.x/some-page)`
		const entry = {
			filePath: 'content/terraform/1.8.x/docs/language/some-file.mdx',
		}
		const expectedOutput =
			'[Link to versioned path](/terraform/language/1.7.x/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should not rewrite links if they already contain a special terraform version', async () => {
		const content = `[Link to versioned path](/terraform/language/v202509-01/some-page)`
		const entry = {
			filePath: 'content/terraform/v202509-02/docs/language/some-file.mdx',
		}
		const expectedOutput =
			'[Link to versioned path](/terraform/language/v202509-01/some-page)\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})

	it('should rewrite definitions that include links', async () => {
		const content = `[definition]: /terraform/language/some-page`
		const entry = {
			filePath: 'content/terraform/v1.5.x/docs/language/some-file.mdx',
		}
		const expectedOutput =
			'[definition]: /terraform/language/v1.5.x/some-page\n'
		const result = await transformRewriteInternalLinks(
			content,
			entry,
			versionMetadata,
		)
		expect(result).toBe(expectedOutput)
	})
})
