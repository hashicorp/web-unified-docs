import { expect, test, vi } from 'vitest'
import { vol } from 'memfs'
import {
	gatherAllDocsPaths,
	getProductPaths,
} from './gather-all-docs-paths.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'

vi.mock('fs', async () => {
	const memfs = await vi.importActual('memfs')
	return { default: memfs.fs }
})

vol.fromNestedJSON({
	'content/terraform/v1.9.x/docs/cli': {
		'auth.mdx': '#Test',
	},
	'content/ptfe-releases/v202410-1/docs': {},
	'content/terraform-cdk/v0.20.x/docs': {},
	'content/terraform-docs-agents/v1.14.x/docs': {},
	'content/terraform-docs-common/docs': {},
	'content/terraform-plugin-framework/v1.5.x/docs': {},
	'content/terraform-plugin-log/v0.9.x/docs': {},
	'content/terraform-plugin-mux/v0.14.x/docs': {},
	'content/terraform-plugin-sdk/v2.32.x/docs': {},
	'content/terraform-plugin-testing/v1.6.x/docs': {},
	'app/api/all-docs-paths/hcp-docs-test': {
		'hcp-docs-test.mdx': `#HCP docs test document`,
	},
	'app/api/all-docs-paths/terraform-test': {
		'terraform-test.mdx': `#Terraform docs test document`,
	},
	'app/api/all-docs-paths/consul-test': {
		'consul-test.mdx': `#Consul docs test document`,
	},
})

vi.mock('../app/utils/productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'ptfe-releases': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			terraform: {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-cdk': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-docs-agents': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-docs-common': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-plugin-framework': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-plugin-log': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-plugin-mux': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-plugin-sdk': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
			'terraform-plugin-testing': {
				contentDir: 'docs',
				productSlug: 'terraform',
			},
		},
	}
})

// gatherAllDocsPaths tests

test('gatherAllDocsPaths returns the paths', async () => {
	const result = await gatherAllDocsPaths(versionMetadata)

	expect(result.terraform).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ path: 'terraform/cli/auth' }),
		]),
	)
})

test('gatherAllDocsPaths throws an error if no version metadata is found for a product', async () => {
	await expect(gatherAllDocsPaths('nonexistent-product')).rejects.toThrow(
		'No version metadata found for product',
	)
})

// getProductPaths tests

test('getProductPaths should determine correct productName for hcp-docs', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/hcp-docs-test',
		'hcp',
	)

	expect(apiPaths[0].path).toBe('hcp/hcp-docs-test')
})

test('getProductPaths should determine correct productName for terraform products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/terraform-test',
		'terraform',
	)

	expect(apiPaths[0].path).toBe('terraform/terraform-test')
})

test('getProductPaths should have the default productName for all other products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/consul-test',
		'consul',
	)

	expect(apiPaths[0].path).toBe('consul/consul-test')
})
