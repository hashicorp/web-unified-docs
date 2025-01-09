import { expect, describe, it, vi } from 'vitest'
import { GET } from './route'

describe('GET /[productSlug]/[version]/[...docsPath]', () => {
	it('returns a 404 for nonexistent products', async () => {
		const mockRequest = (url: string) => {
			return new Request(url)
		}

		// eat error message
		vi.spyOn(console, 'error').mockImplementation(() => {})

		const productSlug = 'fake product'
		const request = mockRequest(
			`http://localhost:8080/api/content/${productSlug}`,
		)
		const response = await GET(request, {
			params: { productSlug, version: '', docsPath: [''] },
		})

		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
})
