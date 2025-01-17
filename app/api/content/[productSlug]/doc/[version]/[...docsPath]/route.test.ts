import { expect, describe, it, vi, beforeEach } from 'vitest'
import { GET, GetParams } from './route'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { readFile } from '@utils/file'

vi.mock(import('@utils/contentVersions'), async (importOriginal) => {
	const mod = await importOriginal() // type is inferred
	return {
		...mod,
		getProductVersion: vi.fn(),
	}
})

vi.mock(import('@utils/file'), async (importOriginal) => {
	const mod = await importOriginal() // type is inferred
	return {
		...mod,
		readFile: vi.fn(),
	}
})

// Keep the mapped types up here, so that things don't become a mess of
// TypeScript spaghetti
declare type HttpGet = typeof GET
describe('GET /[productSlug]/[version]/[...docsPath]', () => {
	let mockRequest: (path: string, params: GetParams) => ReturnType<HttpGet>
	beforeEach(() => {
		mockRequest = (path: string, params: GetParams) => {
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
	it('returns a 404 for nonexistent versions', async () => {
		// Real product name
		const productSlug = Object.keys(PRODUCT_CONFIG)[0]

		// Some junk data for version
		const version = 'lorem ipsum dolor sit amet'
		vi.mocked(getProductVersion).mockReturnValue(
			Err(`Product, ${productSlug}, has no "${version}" version`),
		)
		const response = await mockRequest('', {
			docsPath: [''],
			productSlug,
			version,
		})

		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for missing content', async () => {
		// Real product name
		const productSlug = Object.keys(PRODUCT_CONFIG)[0]

		// Some real(ish) data for version
		const version = 'v20220610-01'

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Fake missing content on disk
		vi.mocked(readFile).mockImplementation(async (filePath: string[]) => {
			return Err(`Failed to read file at path: ${filePath.join('/')}`)
		})

		const response = await mockRequest('', {
			docsPath: [''],
			productSlug,
			version,
		})

		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
})
