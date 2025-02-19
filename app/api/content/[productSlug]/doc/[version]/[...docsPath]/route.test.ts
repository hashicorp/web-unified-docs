import {
	expect,
	describe,
	it,
	vi,
	beforeEach,
	afterAll,
	MockInstance,
} from 'vitest'
import { GET, GetParams } from './route'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { readFile, parseMarkdownFrontMatter } from '@utils/file'
import { statSync } from 'fs'
import { join } from 'path'

vi.mock('fs', () => {
	return {
		statSync: vi.fn(),
	}
})

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
	let consoleMock: MockInstance<Console['error']>
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
		const fakeProductSlug = 'fake product'
		const response = await mockRequest({
			docsPath: [''],
			productSlug: fakeProductSlug,
			version: '',
		})

		expect(response.status).toBe(404)
		expect(consoleMock.mock.calls[0][0]).toMatch(
			new RegExp(`Product, ${fakeProductSlug}, not found`, 'i'),
		)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for nonexistent versions', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

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

		expect(consoleMock.mock.calls[0][0]).toMatch(
			new RegExp(`Product, ${productSlug}, has no "${version}" version`, 'i'),
		)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for missing content', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

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

		expect(consoleMock.mock.calls[0][0]).toMatch(/no content found/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for invalid markdown', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

		// Some real(ish) data for version
		const version = 'v20220610-01'
		const mockDate = new Date('2024-01-01T00:00:00.000Z')

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Mock statSync to return a fixed date
		vi.mocked(statSync).mockReturnValue({
			birthtime: mockDate,
		} as any)

		// Fake the return of some invalid markdown from the filesystem
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(`[[test]`)
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

		expect(consoleMock.mock.calls[0][0]).toMatch(/failed to parse markdown/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns the markdown source of the requested docs', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

		// Some real(ish) data for version
		const version = 'v20220610-01'

		const markdownSource = '# Hello World'
		const mockDate = new Date('2024-01-01T00:00:00.000Z')
		const expectedPath = [
			'content',
			productSlug,
			version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'index.mdx',
		]

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Mock statSync to return a fixed date
		vi.mocked(statSync).mockReturnValue({
			birthtime: mockDate,
		} as any)

		// Fake content returned from the filesystem
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(markdownSource)
		})

		// Mock markdown parser returning valid content
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Ok({ markdownSource, metadata: {} })
		})

		const response = await mockRequest({
			docsPath: ['index'],
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
		expect(result.githubFile).toBe(expectedPath.join('/'))
		expect(result.created_at).toBe(mockDate.toISOString())

		// Verify statSync was called with the correct full path
		expect(statSync).toHaveBeenCalledWith(
			join(process.cwd(), expectedPath.join('/')),
		)
	})
	it('checks both possible content locations for githubFile path', async () => {
		const [productSlug] = Object.keys(PRODUCT_CONFIG)
		const version = 'v20220610-01'
		const markdownSource = '# Hello World'
		const mockDate = new Date('2024-01-01T00:00:00.000Z')

		vi.mocked(getProductVersion).mockReturnValue(Ok(version))
		vi.mocked(statSync).mockReturnValue({
			birthtime: mockDate,
		} as any)

		// First attempt fails, second succeeds (testing index.mdx path)
		vi.mocked(readFile)
			.mockImplementationOnce(async () => {
				return Err('File not found')
			})
			.mockImplementationOnce(async () => {
				return Ok(markdownSource)
			})

		vi.mocked(parseMarkdownFrontMatter).mockReturnValue(
			Ok({ markdownSource, metadata: {} }),
		)

		const response = await mockRequest({
			docsPath: ['docs', 'example'],
			productSlug,
			version,
		})

		const { result } = await response.json()
		const expectedPath = [
			'content',
			productSlug,
			version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'docs',
			'example',
			'index.mdx',
		]

		// Verify the githubFile path is correct
		expect(result.githubFile).toBe(expectedPath.join('/'))
	})
})
