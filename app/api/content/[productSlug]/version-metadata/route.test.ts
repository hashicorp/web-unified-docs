/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
	expect,
	describe,
	it,
	vi,
	beforeEach,
	afterAll,
	MockInstance,
} from 'vitest'
import { GET, GetParams } from './route'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersionMetadata } from '@utils/contentVersions'

vi.mock(import('@utils/contentVersions'), async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersionMetadata: vi.fn(),
	}
})

describe('GET /[productSlug]/version-metadata', () => {
	let mockRequest: (product: GetParams['productSlug']) => ReturnType<typeof GET>
	let consoleMock: MockInstance<Console['error']>
	beforeEach(() => {
		mockRequest = (product: GetParams['productSlug']) => {
			// The URL doesn't actually matter in testing, but for completeness
			// it's nice to have it match the real URL being used
			const url = new URL(
				`http://localhost:8000/api/content/${product}/version-metadata`,
			)
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

		expect(consoleMock.mock.calls[0][0]).toMatch(
			new RegExp(`product, ${productSlug}, not found`, 'i'),
		)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns all versions for valid products', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

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
