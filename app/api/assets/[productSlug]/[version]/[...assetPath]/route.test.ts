import { test, expect, vi } from 'vitest'
import { GET } from './route'
import { getAssetData } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'

vi.mock('@utils/file')
vi.mock('@utils/contentVersions')
// vi.mock('@utils/result')
vi.mock('@utils/productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			terraform: {},
		},
	}
})

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

	vi.mocked(getProductVersion).mockReturnValueOnce({ ok: false, value: '' })

	const response = await GET(request, {
		params: { productSlug, version, assetPath },
	})

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

	const request = new Request('http://localhost:8080')

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

	vi.mocked(getProductVersion).mockReturnValueOnce({
		ok: true,
		value: 'v1.1.x',
	})

	vi.mocked(getAssetData).mockResolvedValueOnce(assetData)

	const response = await GET(request, { params })

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

	const request = new Request('http://localhost:8080')

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

	vi.mocked(getProductVersion).mockReturnValueOnce({
		ok: true,
		value: 'v1.1.x',
	})

	vi.mocked(getAssetData).mockResolvedValueOnce(assetData)

	const response = await GET(request, { params })

	expect(response.status).toBe(200)
	const buffer = Buffer.from(await response.arrayBuffer())
	expect(buffer).toStrictEqual(assetData.value.buffer)
})
