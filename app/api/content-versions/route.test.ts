import { expect, test } from 'vitest'
import { GET } from './route'

test('should return 400 if `product` query parameter is missing', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?fullPath=doc#docs/internals',
	)
	const response = await GET(request)
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe(
		'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
	)
})

test('should return 400 if `fullPath` query parameter is missing', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?product=vault',
	)
	const response = await GET(request)
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe(
		'Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.',
	)
})

test('should return versions if `product` and `fullPath` query parameters are valid', async () => {
	const mockedResponse = {
		versions: ['v202401-1', 'v202401-2'],
	}
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/content-versions?product=ptfe-releases&fullPath=doc%23enterprise%2Freleases%2F2024%2Fv202401-1`,
	)
	const response = await GET(request)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual(mockedResponse)
})

test('should return 200 and empty array if no content exists for the query params', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?product=nonexistent&fullPath=doc#docs/internals',
	)
	const response = await GET(request)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual({ versions: [] })
})

test('should return 200 and array of strings', async () => {
	const mockedResponse = {
		versions: [
			'v0.12.x',
			'v0.13.x',
			'v0.14.x',
			'v0.15.x',
			'v0.16.x',
			'v0.17.x',
			'v0.18.x',
			'v0.19.x',
			'v0.20.x',
		],
	}
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/content-versions?product=terraform-cdk&fullPath=doc%23cdktf%2Fapi-reference%2Fpython`,
	)
	const response = await GET(request)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual(mockedResponse)
})

/**
 * This repo is out of sync with the ptfe-releases repo,
 * so the endpoint below only returns two versions.
 * The current Content API returns this response:
 * {
 *  "versions": [
 *    "v202401-1",
 *    "v202401-2",
 *    "v202410-1",
 *    "v202402-1",
 *    "v202402-2",
 *    "v202404-1",
 *    "v202404-2",
 *    "v202405-1",
 *    "v202406-1",
 *    "v202407-1",
 *    "v202408-1",
 *    "v202409-1",
 *    "v202409-2",
 *    "v202409-3"
 *   ]
 * }
 * If this test fails in the future,
 * the fix may be updating mockedResponse
 */
test('should return 200 and array of strings for nav data', async () => {
	const mockedResponse = {
		versions: ['v202401-1', 'v202401-2'],
	}
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/content-versions?product=ptfe-releases&fullPath=doc%23enterprise%2Freleases%2F2024%2Fv202401-1`,
	)
	const response = await GET(request)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual(mockedResponse)
})
