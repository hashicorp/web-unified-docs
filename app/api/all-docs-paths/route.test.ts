import { expect, test, vi, afterEach } from 'vitest'
import docsPathsMock from '../../../__fixtures__/docsPathsAllVersionsMock.json'
import { GET } from './route'
import * as getDocsPaths from '@utils/allDocsPaths'

afterEach(() => {
	vi.restoreAllMocks()
})

test('GET should return a 200 response with no products', async () => {
	vi.spyOn(getDocsPaths, 'getDocsPaths').mockResolvedValueOnce({
		ok: true,
		value: Object.values(docsPathsMock).flat(),
	})
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)

	const response = await GET(request)

	expect(response.status).toBe(200)
})

test('GET should return a 200 response for one product in the search params', async () => {
	vi.spyOn(getDocsPaths, 'getDocsPaths').mockResolvedValueOnce({
		ok: true,
		value: docsPathsMock['terraform-plugin-framework']['v1.13.x'],
	})
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/all-docs-paths?products=terraform-plugin-framework`,
	)

	const response = await GET(request)

	expect(response.status).toBe(200)
})

test('GET should return a 200 response for multiple products in the search params', async () => {
	vi.spyOn(getDocsPaths, 'getDocsPaths').mockResolvedValueOnce({
		ok: true,
		value: [
			...docsPathsMock['terraform-plugin-framework']['v1.13.x'],
			...docsPathsMock['terraform-plugin-mux']['v0.18.x'],
		],
	})
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/all-docs-paths?=terraform-plugin-framework&products=terraform-plugin-mux`,
	)

	const response = await GET(request)

	expect(response.status).toBe(200)
})

test('GET should return error if docsPaths are not found', async () => {
	vi.spyOn(getDocsPaths, 'getDocsPaths').mockResolvedValueOnce({
		ok: false,
		value: 'All docs paths not found',
	})
	global.fetch = vi.fn()
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)
	const response = await GET(request)

	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: All docs paths not found',
	)
	expect(response.status).toEqual(404)
})
