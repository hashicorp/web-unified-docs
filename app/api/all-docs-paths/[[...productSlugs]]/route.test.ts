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

// getAllDocsPaths tests

test('getAllDocsPaths should have an ok status for happy path', async () => {
	const result = await getAllDocsPaths([])

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

	await getAllDocsPaths([])
	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: Product, boundary, not found in version metadata',
	)
})

test('getAllDocsPaths should return an error if there are no docs paths found', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({})
	global.fetch = vi.fn()

	const result = await getAllDocsPaths([])
	expect(result).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getAllDocsPath should filter results based on productSlugs', async () => {
	const result = await getAllDocsPaths(['terraform'])

	expect(result.ok).toBe(true)
	// Should not have any paths for other docs (ex. terraform-docs-common AKA terraform/cloud-docs)
	expect(result.value).not.toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				path: 'terraform/cloud-docs',
			}),
		]),
	)
})

// GET tests

test('GET should return a 200 response for happy path', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)

	const response = await GET(request, { params: { productSlugs: undefined } })

	expect(response.status).toBe(200)
})

test('GET should return error if docsPaths are not found', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({})
	global.fetch = vi.fn()
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)
	const response = await GET(request, { params: { productSlugs: undefined } })

	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: All docs paths not found',
	)
	expect(response.status).toEqual(404)
})

test('GET should filter results based on productSlugs', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)

	const response = await GET(request, {
		params: { productSlugs: ['terraform'] },
	})
	const result = await response.json()

	expect(response.status).toBe(200)
	// Should not have any paths for other docs (ex. terraform-docs-common AKA terraform/cloud-docs)
	expect(result).not.toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				path: 'terraform/cloud-docs',
			}),
		]),
	)
})
