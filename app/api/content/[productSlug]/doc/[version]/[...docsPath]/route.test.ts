import { expect, describe, it, vi, beforeEach, afterAll } from 'vitest'
import { GET, GetParams } from './route'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { readFile, parseMarkdownFrontMatter } from '@utils/file'

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
		parseMarkdownFrontMatter: vi.fn(),
	}
})

describe('GET /[productSlug]/[version]/[...docsPath]', () => {
	let mockRequest: (params: GetParams) => ReturnType<typeof GET>
	let consoleMock
	beforeEach(() => {
		mockRequest = (params: GetParams) => {
			const { productSlug, version, docsPath } = params
			// The URL doesn't actually matter in testing, but for completeness
			// it's nice to have it match the real URL being used
			const url = new URL(
				`http://localhost:8000/api/content/${productSlug}/doc/${version}/${docsPath.join('/')}`,
			)
			const req = new Request(url)
			return GET(req, { params })
		}
		// spy on console.error so that we can examine it's calls
		consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {})
	})
	afterAll(() => {
		consoleMock.mockReset()
	})
	it('returns a 404 for nonexistent products', async () => {
		const response = await mockRequest({
			docsPath: [''],
			productSlug: 'fake product',
			version: '',
		})

		expect(response.status).toBe(404)
		expect(consoleMock).toHaveBeenCalledWith(
			`API Error: Product, fake product, not found in contentDirMap`,
		)
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
		const response = await mockRequest({
			docsPath: [''],
			productSlug,
			version,
		})

		expect(consoleMock).toHaveBeenCalledWith(
			`API Error: Product, ${productSlug}, has no "${version}" version`,
		)
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

		const response = await mockRequest({
			docsPath: [''],
			productSlug,
			version,
		})

		expect(consoleMock).toHaveBeenCalledWith(
			`API Error: No content found at ${[
				'content',
				productSlug,
				version,
				'docs',
				'.mdx',
				'content',
				productSlug,
				version,
				'docs',
				'',
				'index.mdx',
			].join(',')}`,
		)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for invalid markdown', async () => {
		// Real product name
		const productSlug = Object.keys(PRODUCT_CONFIG)[0]

		// Some real(ish) data for version
		const version = 'v20220610-01'

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Fake missing content on disk
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(`# Hello World`)
		})

		// Fake some invalid markdown
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Err('Failed to parse Markdown front-matter')
		})

		const response = await mockRequest({
			docsPath: [''],
			productSlug,
			version,
		})

		expect(consoleMock).toHaveBeenCalledWith(
			`API Error: Failed to parse Markdown front-matter`,
		)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns the markdown source of the requested docs', async () => {
		// Real product name
		const productSlug = Object.keys(PRODUCT_CONFIG)[0]

		// Some real(ish) data for version
		const version = 'v20220610-01'

		const markdownSource = '# Hello World'

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Fake content returned from the filesystem
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(markdownSource)
		})

		// Mock markdown parser returning valid content
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Ok({ markdownSource, metadata: {} })
		})

		const response = await mockRequest({
			docsPath: [''],
			productSlug,
			version,
		})

		expect(consoleMock).not.toHaveBeenCalled()
		expect(response.status).toBe(200)
		const { meta, result } = await response.json()
		expect(meta.status_code).toBe(200)
		expect(result.product).toBe(productSlug)
		expect(result.version).toBe(version)
		expect(result.markdownSource).toBe(markdownSource)
	})
})
