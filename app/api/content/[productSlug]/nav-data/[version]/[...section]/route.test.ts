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
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { Err, Ok } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { readFile, parseJson } from '@utils/file'

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
		parseJson: vi.fn(),
	}
})

describe('GET /[productSlug]/[version]/[...section]', () => {
	let mockRequest: (params: GetParams) => ReturnType<typeof GET>
	let consoleMock: MockInstance<Console['error']>
	beforeEach(() => {
		mockRequest = (params: GetParams) => {
			const { productSlug, version, section } = params
			// The URL doesn't actually matter in testing, but for completeness
			// it's nice to have it match the real URL being used
			const url = new URL(
				`http://localhost:8000/api/content/${productSlug}/nav-data/${version}/${section.join('/')}`,
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
		const productSlug = 'fake product'
		vi.mocked(getProductVersion).mockReturnValue(
			Err(`Product, fake product, not found in contentDirMap`),
		)
		const response = await mockRequest({
			productSlug,
			version: '',
			section: [''],
		})

		expect(response.status).toBe(404)
		expect(consoleMock.mock.calls[0][0]).toMatch(
			new RegExp(`product, ${productSlug}, not found`, 'i'),
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
			productSlug,
			version,
			section: [''],
		})

		expect(consoleMock.mock.calls[0][0]).toMatch(
			new RegExp(`product, ${productSlug}, has no "${version}"`, 'i'),
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
			productSlug,
			version,
			section: [''],
		})

		expect(consoleMock.mock.calls[0][0]).toMatch(/failed to read file/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns a 404 for invalid JSON', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

		// Some real(ish) data for version
		const version = 'v20220610-01'

		const invalidJson = '{ a: 1234'

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Fake some data returned from disk
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(invalidJson)
		})

		// Fake some invalid markdown
		vi.mocked(parseJson).mockImplementation(() => {
			return Err(
				"Failed to parse JSON: SyntaxError: Expected property name or '}' in JSON at position 2\"",
			)
		})

		const response = await mockRequest({
			productSlug,
			version,
			section: [''],
		})

		expect(consoleMock.mock.calls[0][0]).toMatch(/SyntaxError/i)
		expect(response.status).toBe(404)
		await expect(response.text()).resolves.toMatch(/not found/i)
	})
	it('returns the markdown source of the requested docs', async () => {
		// Real product name
		const [productSlug] = Object.keys(PRODUCT_CONFIG)

		// Some real(ish) data for version
		const version = 'v1.9.x'

		// A snippet of the section nav data from content/terraform/v1.9.x/intro-nav-data.json
		const sectionData = [
			{ heading: 'Introduction to Terraform' },
			{ title: 'What is Terraform?', path: '' },
			{ title: 'Use Cases', path: 'use-cases' },
		]

		// Force the version(real-ish) to exist
		vi.mocked(getProductVersion).mockReturnValue(Ok(version))

		// Fake content returned from the filesystem
		vi.mocked(readFile).mockImplementation(async () => {
			return Ok(JSON.stringify(sectionData))
		})

		// Force `parseJson()` to return our test data
		vi.mocked(parseJson).mockImplementation(() => {
			return Ok(sectionData)
		})

		const response = await mockRequest({
			productSlug,
			version,
			section: ['intro'],
		})

		expect(consoleMock).not.toHaveBeenCalled()
		expect(response.status).toBe(200)
		const { result } = await response.json()
		expect(result).toEqual({ navData: sectionData })
		// A little fuzzy, but just make sure that our response (roughly)
		// contains the data we're expecting to see - which in this case would
		// be a heading for "Introduction to Terraform"
		expect(result.navData[0].heading).toMatch(/introduction to terraform/i)
	})
})
