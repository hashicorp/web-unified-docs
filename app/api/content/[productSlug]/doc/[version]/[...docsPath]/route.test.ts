/**
 * Copyright IBM Corp. 2024, 2025
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
import { GET } from './route'
import { Err, Ok } from '#utils/result'
import { getProductVersionMetadata } from '#utils/contentVersions'
import { PRODUCT_CONFIG } from '__fixtures__/productConfig.mjs'
import { parseMarkdownFrontMatter, findFileWithMetadata } from '#utils/file'
import { mockRequest } from '#utils/mockRequest'

vi.mock('#utils/contentVersions', async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersionMetadata: vi.fn(),
	}
})

vi.mock('#utils/file', async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		readFile: vi.fn(),
		parseMarkdownFrontMatter: vi.fn(),
		findFileWithMetadata: vi.fn(),
	}
})

// Mock the versionMetadata json import in the route file
vi.mock('#api/versionMetadata.json', () => {
	return {
		default: {},
	}
})

// Mock the docsPathsAllVersions json import in the route file
vi.mock('#api/docsPathsAllVersions.json', () => {
	return {
		default: {
			'terraform-plugin-framework': {},
			'terraform-enterprise': {},
		},
	}
})

// Mock the product config import in the route file
vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'terraform-enterprise': { contentDir: 'docs', versionedDocs: true },
			'terraform-plugin-framework': { contentDir: 'docs', versionedDocs: true },
		},
	}
})

describe('GET /[productSlug]/[version]/[...docsPath]', () => {
	let consoleMock: MockInstance<Console['error']>
	beforeEach(() => {
		// spy on console.error so that we can examine it's calls
		consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {})
	})
	afterAll(() => {
		consoleMock.mockReset()
	})

	it('returns a 404 for nonexistent products', async () => {
		const fakeProductSlug = 'fake product'
		const response = await mockRequest(GET, {
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
		vi.mocked(getProductVersionMetadata).mockReturnValue(
			Err(`Product, ${productSlug}, has no "${version}" version`),
		)
		const response = await mockRequest(GET, {
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
		const metadata = {
			version: 'v20220610-01',
			isLatest: false,
			releaseStage: 'stable',
		}

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

		// Fake missing content on disk
		vi.mocked(findFileWithMetadata).mockReturnValue(
			Promise.resolve(Err(`Failed to find file at path`)),
		)

		const response = await mockRequest(GET, {
			docsPath: [''],
			productSlug,
			version: metadata.version,
		})

		expect(consoleMock.mock.calls[0][0]).toMatch(/no content found/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})

	it('returns a 404 for invalid markdown', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

		// Some real(ish) data for version
		const metadata = {
			version: 'v20220610-01',
			isLatest: false,
			releaseStage: 'stable',
		}

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

		// Fake the return of some invalid markdown from the filesystem
		vi.mocked(findFileWithMetadata).mockReturnValue(
			Promise.resolve(Ok(`[[test]`)),
		)

		// Fake some invalid markdown
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Err('Failed to parse Markdown front-matter')
		})

		const response = await mockRequest(GET, {
			docsPath: [''],
			productSlug,
			version: metadata.version,
		})

		expect(consoleMock.mock.calls[0][0]).toMatch(/failed to parse markdown/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})

	it('returns the markdown source of the requested docs', async () => {
		const productSlug = 'terraform-plugin-framework'
		const metadata = {
			version: 'v1.13.x',
			isLatest: false,
			releaseStage: 'stable',
		}
		const markdownSource = '# Hello World'
		const expectedPath = [
			'content',
			productSlug,
			metadata.version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'plugin/framework/internals/rpcs.mdx',
		]

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

		// Fake content returned from the filesystem
		vi.mocked(findFileWithMetadata).mockReturnValue(
			Promise.resolve(Ok(markdownSource)),
		)

		// Mock markdown parser returning valid content
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Ok({ markdownSource, metadata: {} })
		})

		const response = await mockRequest(GET, {
			docsPath: ['plugin', 'framework', 'internals', 'rpcs'],
			productSlug,
			version: metadata.version,
		})

		expect(consoleMock).not.toHaveBeenCalled()
		expect(response.status).toBe(200)
		const { meta, result } = await response.json()
		expect(meta.status_code).toBe(200)
		expect(result.product).toBe(productSlug)
		expect(result.version).toBe(metadata.version)
		expect(result.markdownSource).toBe(markdownSource)
		expect(result.githubFile).toBe(expectedPath.join('/'))
	})

	it('returns the markdown source of the requested docs, even if includes .mdx', async () => {
		const productSlug = 'terraform-plugin-framework'
		const metadata = {
			version: 'v1.13.x',
			isLatest: false,
			releaseStage: 'stable',
		}
		const markdownSource = '# Hello World'
		const expectedPath = [
			'content',
			productSlug,
			metadata.version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'plugin/framework/internals/rpcs.mdx',
		]

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

		// Fake content returned from the filesystem
		vi.mocked(findFileWithMetadata).mockReturnValue(
			Promise.resolve(Ok(markdownSource)),
		)

		// Mock markdown parser returning valid content
		vi.mocked(parseMarkdownFrontMatter).mockImplementation(() => {
			return Ok({ markdownSource, metadata: {} })
		})

		const response = await mockRequest(GET, {
			docsPath: ['plugin', 'framework', 'internals', 'rpcs.mdx'],
			productSlug,
			version: metadata.version,
		})

		expect(consoleMock).not.toHaveBeenCalled()
		expect(response.status).toBe(200)
		const { meta, result } = await response.json()
		expect(meta.status_code).toBe(200)
		expect(result.product).toBe(productSlug)
		expect(result.version).toBe(metadata.version)
		expect(result.markdownSource).toBe(markdownSource)
		expect(result.githubFile).toBe(expectedPath.join('/'))
	})

	it('checks both possible content locations for githubFile path', async () => {
		const [productSlug] = Object.keys(PRODUCT_CONFIG)
		const metadata = {
			version: 'v20220610-01',
			isLatest: false,
			releaseStage: 'stable',
		}
		const markdownSource = '# Hello World'

		vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

		// First attempt fails, second succeeds (testing index.mdx path)
		vi.mocked(findFileWithMetadata)
			.mockReturnValueOnce(Promise.resolve(Err('File not found')))
			.mockReturnValueOnce(Promise.resolve(Ok(markdownSource)))

		vi.mocked(parseMarkdownFrontMatter).mockReturnValue(
			Ok({ markdownSource, metadata: {} }),
		)

		const response = await mockRequest(GET, {
			docsPath: ['docs', 'example'],
			productSlug,
			version: metadata.version,
		})

		const { result } = await response.json()
		const expectedPath = [
			'content',
			productSlug,
			metadata.version,
			PRODUCT_CONFIG[productSlug].contentDir,
			'docs',
			'example',
			'index.mdx',
		]

		// Verify the githubFile path is correct
		expect(result.githubFile).toBe(expectedPath.join('/'))
	})
})
