import { expect, test, vi, afterEach } from 'vitest'
import {
	gatherAllDocsPaths,
	getProductPaths,
} from './gather-all-docs-paths.mjs'
import versionMetadata from '../app/api/versionMetadata.json'
import * as repoConfig from '../app/utils/productConfig.mjs'

afterEach(() => {
	vi.restoreAllMocks()
})

// gatherAllDocsPaths tests

test.only('gatherAllDocsPaths returns the paths', async () => {
	const result = await gatherAllDocsPaths(versionMetadata)
	expect(result).toContain('terraform/enterprise/api-docs/account')
})

test('gatherAllDocsPaths throws an error if no version metadata is found for a product', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		test: {
			assetDir: 'public',
			contentDir: 'content',
			dataDir: 'data',
			productSlug: 'test',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	// const result = await gatherAllDocsPaths(versionMetadataMock)
	expect(async () => {
		return await gatherAllDocsPaths(versionMetadata)
	}).toThrow()
})

// getProductPaths tests

test('getProductPaths should determine correct productName for hcp-docs', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/[[...productSlugs]]/__fixtures__/hcp-docs-test',
		'hcp',
	)

	expect(apiPaths[0].path).toBe('hcp/hcp-docs-test')
})

test('getProductPaths should determine correct productName for terraform products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/[[...productSlugs]]/__fixtures__/terraform-test',
		'terraform',
	)

	expect(apiPaths[0].path).toBe('terraform/terraform-test')
})

test('getProductPaths should have the default productName for all other products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/[[...productSlugs]]/__fixtures__/consul-test',
		'consul',
	)

	expect(apiPaths[0].path).toBe('consul/consul-test')
})
