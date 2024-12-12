import { expect, test, vi, afterEach } from 'vitest'
import { GET } from './route'
import { getProductPaths, getAllDocsPaths } from '@utils/allDocsPaths'
import * as repoConfig from '@utils/productConfig.mjs'

afterEach(() => {
	vi.restoreAllMocks()
})

// getProductPaths tests

test('getProductPaths should determine correct productName for hcp-docs', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/__fixtures__/hcp-docs-test',
		'hcp',
	)

	expect(apiPaths[0].path).toBe('hcp/hcp-docs-test')
})

test('getProductPaths should determine correct productName for terraform products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/__fixtures__/terraform-test',
		'terraform',
	)

	expect(apiPaths[0].path).toBe('terraform/terraform-test')
})

test('getProductPaths should have the default productName for all other products', () => {
	const apiPaths = getProductPaths(
		'app/api/all-docs-paths/__fixtures__/consul-test',
		'consul',
	)

	expect(apiPaths[0].path).toBe('consul/consul-test')
})

// getAllDocsPaths tests

test('getAllDocsPaths should have an ok status for happy path', async () => {
	const result = await getAllDocsPaths()

	expect(result.ok).toBe(true)
})

test('getAllDocsPaths should return an error if the product version is not found', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		boundary: {
			assetDir: 'public',
			contentDir: 'content',
			dataDir: 'data',
			productSlug: 'boundary',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	await getAllDocsPaths()
	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: Product, boundary, not found in version metadata',
	)
})

test('getAllDocsPaths should return an error if there are no docs paths found', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({})
	global.fetch = vi.fn()

	const result = await getAllDocsPaths()
	expect(result).toEqual({ ok: false, value: 'All docs paths not found' })
})

// GET tests

test('GET should return a 200 response for happy path', async () => {
	const response = await GET()

	expect(response.status).toBe(200)
})

test('GET should return error if docsPaths are not found', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({})
	global.fetch = vi.fn()
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	const response = await GET()

	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: All docs paths not found',
	)
	expect(response.status).toEqual(404)
})
