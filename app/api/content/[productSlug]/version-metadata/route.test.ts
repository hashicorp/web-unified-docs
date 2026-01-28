/**
 * Copyright IBM Corp. 2024, 2025
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
import { GET } from './route'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { Err, Ok } from '#utils/result'
import { getProductMetadata } from '#utils/contentVersions'
import { mockRequest } from '#utils/mockRequest'

vi.mock('#utils/contentVersions', async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductMetadata: vi.fn(),
	}
})

vi.mock('#api/versionMetadata.json', () => {
	return {
		default: {},
	}
})

describe('GET /[productSlug]/version-metadata', () => {
	let consoleMock: MockInstance<Console['error']>
	beforeEach(() => {
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
		vi.mocked(getProductMetadata).mockImplementationOnce(
			(productName: string) => {
				return Err(`Product, ${productName}, not found in version metadata`)
			},
		)

		const response = await mockRequest(GET, { productSlug })

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
		vi.mocked(getProductMetadata).mockReturnValue(Ok(versionMetadata))

		const response = await mockRequest(GET, { productSlug })

		expect(response.status).toBe(200)
		const { result } = await response.json()
		expect(result).toEqual(versionMetadata)
	})
})
