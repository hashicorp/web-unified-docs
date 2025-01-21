import { expect, describe, it, vi, beforeEach, afterAll } from 'vitest'
import { GET, GetParams } from './route'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersionMetadata } from '@utils/contentVersions'

vi.mock(import('@utils/contentVersions'), async (importOriginal) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersionMetadata: vi.fn(),
	}
})

describe('GET /[productSlug]/version-metadata', () => {
	let mockRequest: (product: GetParams['productSlug']) => ReturnType<typeof GET>
	let consoleMock
	beforeEach(() => {
		mockRequest = (product: GetParams['productSlug']) => {
			const url = new URL('http://localhost:8000/api/content/version-metadata')
			const req = new Request(url)
			return GET(req, { params: { productSlug: product } })
		}
		// spy on console.error so that we can examine it's calls
		consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {})
	})
	afterAll(() => {
		consoleMock.mockReset()
	})
	it('returns 404 for invalid products', async () => {
		// Obviously bogus product name
		const productSlug = 'invalid-product-name'

		// Simulate an error from getProductversionMetadata
		vi.mocked(getProductVersionMetadata).mockImplementationOnce(
			(productName: string) => {
				return Err(`Product, ${productName}, not found in version metadata`)
			},
		)

		const response = await mockRequest(productSlug)

		expect(consoleMock).toHaveBeenCalledWith(
			`API Error: Product, ${productSlug}, not found in version metadata`,
		)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns all versions for valid products', async () => {
		// Real product name
		const productSlug = Object.keys(PRODUCT_CONFIG)[0]

		const versionMetadata = [
			{
				version: 'v10.10.1',
				isLatest: true,
				releaseStage: 'stable',
			},
			{
				version: 'v10.10.0',
				isLatest: false,
				releaseStage: 'stable',
			},
		]

		// Fake the return value from getProductVersionMetadata
		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(versionMetadata))

		const response = await mockRequest(productSlug)

		expect(response.status).toBe(200)
		const { result } = await response.json()
		expect(result).toEqual(versionMetadata)
	})
})
