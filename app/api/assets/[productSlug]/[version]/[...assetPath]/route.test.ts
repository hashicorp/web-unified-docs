import { expect, test, vi } from 'vitest'
import { GET } from './route'

import * as utilsFileModule from '@utils/file'

test("Return 404 if `product` doesn't exist", async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	// eat error message
	vi.spyOn(console, 'error').mockImplementation(() => {})

	const productSlug = 'fake product'
	const version = 'v1.1.x'
	const assetPath = ['test.png']
	const request = mockRequest(
		`http://localhost:8080/api/assets/${productSlug}/${version}/${assetPath.join('/')}`,
	)
	const response = await GET(request, {
		params: { productSlug, version, assetPath },
	})

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test("Return 404 if `version` doesn't exist for `productSlug`", async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const productSlug = 'terraform'
	const version = 'fake_version'
	const assetPath = ['test.png']
	const request = mockRequest(
		`http://localhost:8080/api/assets/${productSlug}/${version}/${assetPath.join('/')}`,
	)
	const response = await GET(request, {
		params: { productSlug, version, assetPath },
	})

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('Return 200 and an image for a valid `product`, `version`, and `assetPath`', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const assetData = {
		buffer: Buffer.from(new ArrayBuffer(0)),
		contentType: 'image/png',
	}

	const getAssetDataSpy = vi.spyOn(utilsFileModule, 'getAssetData')
	getAssetDataSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: assetData })
	})

	const productSlug = 'terraform'
	const version = 'v1.1.x'
	const assetPath = ['test.png']
	const request = mockRequest(
		`http://localhost:8080/api/assets/${productSlug}/${version}/${assetPath.join('/')}`,
	)
	const response = await GET(request, {
		params: { productSlug, version, assetPath },
	})

	expect(response.status).toBe(200)
	const buffer = Buffer.from(await response.arrayBuffer())
	expect(buffer).toStrictEqual(assetData.buffer)
})

test('Return 200 and an image for the `version` being `latest` and the rest of the data valid', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const assetData = {
		buffer: Buffer.from(new ArrayBuffer(0)),
		contentType: 'image/png',
	}

	const getAssetDataSpy = vi.spyOn(utilsFileModule, 'getAssetData')
	getAssetDataSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: assetData })
	})

	const productSlug = 'terraform'
	const version = 'latest'
	const assetPath = ['test.png']
	const request = mockRequest(
		`http://localhost:8080/api/assets/${productSlug}/${version}/${assetPath.join('/')}`,
	)
	const response = await GET(request, {
		params: { productSlug, version, assetPath },
	})

	expect(response.status).toBe(200)
	const buffer = Buffer.from(await response.arrayBuffer())
	expect(buffer).toStrictEqual(assetData.buffer)
})
