/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

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
import { Err, Ok } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { PRODUCT_CONFIG } from '__fixtures__/productConfig.mjs'
import { readFile, parseMarkdownFrontMatter } from '@utils/file'

vi.mock(import('@utils/contentVersions'), async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersion: vi.fn(),
	}
})

vi.mock(import('@utils/file'), async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		readFile: vi.fn(),
		parseMarkdownFrontMatter: vi.fn(),
	}
})

// Mock the versionMetadata json import in the route file
vi.mock('@api/versionMetadata.json', () => {
	return {
		default: {},
	}
})

// Mock the docsPathsAllVersions json import in the route file
vi.mock('@api/docsPathsAllVersions.json', () => {
	return {
		default: {
			'terraform-plugin-framework': {},
			'ptfe-releases': {},
		},
	}
})

// Mock the product config import in the route file
vi.mock('@utils/productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'ptfe-releases': { contentDir: 'docs' },
			'terraform-plugin-framework': { contentDir: 'docs' },
		},
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

	it('returns a 404 for non-existent versions', async () => {
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

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

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
		const productSlug = 'terraform-plugin-framework'
		const version = 'v1.13.x'
		const markdownSource = '# Hello World'
		const expectedPath = [
			'content',
			productSlug,
			version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'plugin/framework/internals/rpcs.mdx',
		]

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
			docsPath: ['plugin', 'framework', 'internals', 'rpcs'],
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
	})

	it('checks both possible content locations for githubFile path', async () => {
		const [productSlug] = Object.keys(PRODUCT_CONFIG)
		const version = 'v20220610-01'
		const markdownSource = '# Hello World'

		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

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
