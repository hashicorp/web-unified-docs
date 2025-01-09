import { expect, describe, it, vi, beforeEach } from 'vitest'
import { GET } from './route'

// Keep the mapped types up here, so that things don't become a mess of
// TypeScript spaghetti
declare type HttpGet = typeof GET
declare type HttpGetParams = Parameters<HttpGet>[1]['params']

describe('GET /[productSlug]/[version]/[...docsPath]', () => {
	let mockRequest: (path: string, params: HttpGetParams) => ReturnType<HttpGet>
	beforeEach(() => {
		mockRequest = (path: string, params: HttpGetParams) => {
			const url = new URL(`http://localhost:8000/api/content${path}`)
			const req = new Request(url)
			return GET(req, { params })
		}
		// eat error message
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})
	it('returns a 404 for nonexistent products', async () => {
		const response = await mockRequest('', {
			docsPath: [''],
			productSlug: 'fake product',
			version: '',
		})

		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
})
