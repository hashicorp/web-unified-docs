import { expect, test, vi, afterEach } from 'vitest'
import {
	gatherAllDocsPaths,
	getProductPaths,
} from './gather-all-docs-paths.mjs'
import * as repoConfig from '../app/utils/productConfig.mjs'

afterEach(() => {
	vi.restoreAllMocks()
})

// gatherAllDocsPaths tests

test('gatherAllDocsPaths returns the paths', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		terraform: {
			assetDir: 'public',
			contentDir: 'docs',
			dataDir: 'data',
			productSlug: 'terraform',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	const versionMetadata = {
		terraform: [
			{ version: 'v1.9.x', releaseStage: 'stable', isLatest: true },
			{ version: 'v1.8.x', releaseStage: 'stable', isLatest: false },
		],
	}
	const result = await gatherAllDocsPaths(versionMetadata)

	expect(result.terraform).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ path: 'terraform/cli/auth' }),
		]),
	)
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
	const versionMetadata = {}
	await expect(gatherAllDocsPaths(versionMetadata)).rejects.toThrow(
		'No version metadata found for product',
	)
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
