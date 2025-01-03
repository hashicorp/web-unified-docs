import { expect, test, vi, afterEach } from 'vitest'
import docsPathsMock from '../../../../__fixtures__/docsPaths.json'
import { GET } from './route'
import * as getDocsPaths from '@utils/allDocsPaths'

afterEach(() => {
	vi.restoreAllMocks()
})

test('GET should return a 200 response for happy path', async () => {
	vi.spyOn(getDocsPaths, 'getDocsPaths').mockResolvedValueOnce({
		ok: true,
		value: Object.values(docsPathsMock).flat(),
	})
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(`http://localhost:8080/api/all-docs-paths`)

	const response = await GET(request, { params: { productSlugs: undefined } })

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
	const response = await GET(request, { params: { productSlugs: undefined } })

	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'API Error: All docs paths not found',
	)
	expect(response.status).toEqual(404)
})
