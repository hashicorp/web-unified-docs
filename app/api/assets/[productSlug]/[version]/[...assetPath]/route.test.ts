/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { GET } from './route'
import { getAssetData } from '#utils/file'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { mockRequest } from '#utils/mockRequest'

vi.mock('#utils/file')
vi.mock('#utils/contentVersions')
vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			terraform: {},
		},
	}
})

vi.mock('#api/versionMetadata.json', () => {
	return {}
})

test("Return 404 if `product` doesn't exist", async () => {
	// eat error message
	vi.spyOn(console, 'error').mockImplementation(() => {})

	const productSlug = 'fake product'
	const version = 'v1.1.x'
	const assetPath = ['test.png']
	const response = await mockRequest(GET, {
		productSlug,
		version,
		assetPath,
	})

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test("Return 404 if `version` doesn't exist for `productSlug`", async () => {
	const productSlug = 'terraform'
	const version = 'fake_version'
	const assetPath = ['test.png']

	vi.mocked(getProductVersionMetadata).mockReturnValueOnce({
		ok: false,
		value: '',
	})

	const response = await mockRequest(GET, { productSlug, version, assetPath })

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('Return 200 and an image for a valid `product`, `version`, and `assetPath`', async () => {
	const params = {
		productSlug: 'terraform',
		version: 'v1.1.x',
		assetPath: ['test.png'],
	}

	const assetData: {
		ok: true
		value: { buffer: Buffer; contentType: string }
	} = {
		ok: true,
		value: {
			buffer: Buffer.from(new ArrayBuffer(0)),
			contentType: 'image/png',
		},
	}

	vi.mocked(getProductVersionMetadata).mockReturnValueOnce({
		ok: true,
		value: 'v1.1.x',
	})

	vi.mocked(getAssetData).mockResolvedValueOnce(assetData)

	const response = await mockRequest(GET, params)

	expect(response.status).toBe(200)
	const buffer = Buffer.from(await response.arrayBuffer())
	expect(buffer).toStrictEqual(assetData.value.buffer)
})

test('Return 200 and an image for the `version` being `latest` and the rest of the data valid', async () => {
	const params = {
		productSlug: 'terraform',
		version: 'latest',
		assetPath: ['test.png'],
	}

	const assetData: {
		ok: true
		value: { buffer: Buffer; contentType: string }
	} = {
		ok: true,
		value: {
			buffer: Buffer.from(new ArrayBuffer(0)),
			contentType: 'image/png',
		},
	}

	vi.mocked(getProductVersionMetadata).mockReturnValueOnce({
		ok: true,
		value: 'v1.1.x',
	})

	vi.mocked(getAssetData).mockResolvedValueOnce(assetData)

	const response = await mockRequest(GET, params)

	expect(response.status).toBe(200)
	const buffer = Buffer.from(await response.arrayBuffer())
	expect(buffer).toStrictEqual(assetData.value.buffer)
})
