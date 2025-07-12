/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { GET } from './route'

import { vol } from 'memfs'

// Mock fs module
vi.mock('node:fs')
vi.mock('node:fs/promises')

// Mock PRODUCT_CONFIG
vi.mock('@utils/productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'terraform-enterprise': {
				assetDir: 'img',
				basePaths: ['enterprise'],
				contentDir: 'docs',
				dataDir: 'data',
				productSlug: 'terraform',
				versionedDocs: true,
				websiteDir: 'website',
			},
		},
	}
})

vi.mock('../../docsPathsAllVersions.json', () => {
	return {
		default: {
			'terraform-enterprise': {
				'v202505-1': [
					{
						path: 'terraform/enterprise/api-docs/account',
						itemPath:
							'content/terraform-enterprise/v202505-1/docs/enterprise/api-docs/account.mdx',
						id: '92a97263-e804-474f-9eb6-86fd0d53f33c',
						created_at: '2025-05-29T11:04:37-04:00',
					},
				],
				'v202505-2': [
					{
						path: 'terraform/enterprise/api-docs/account-2',
						itemPath:
							'content/terraform-enterprise/v202505-1/docs/enterprise/api-docs/account.mdx',
						id: '92a97263-e804-474f-9eb6-86fd0d53f33c',
						created_at: '2025-05-29T11:04:37-04:00',
					},
				],
				'v202505-3': [
					{
						path: 'terraform/enterprise/api-docs/account',
						itemPath:
							'content/terraform-enterprise/v202505-1/docs/enterprise/api-docs/account.mdx',
						id: '92a97263-e804-474f-9eb6-86fd0d53f33d',
						created_at: '2025-05-29T11:04:37-04:00',
					},
				],
			},
		},
	}
})

beforeEach(() => {
	// Reset the state of in-memory fs
	vol.reset()
})

afterEach(() => {
	// Reset all mocks after each test
	vi.resetAllMocks()
})

test('should return 400 if `product` query parameter is missing', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?id=test',
	)
	const response = await GET(request)
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe(
		'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
	)
})

test('should return 400 if `id` query parameter is missing', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?product=terraform-enterprise',
	)
	const response = await GET(request)
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe('Missing `id` query parameter.')
})

test('should return 404 if the product is invalid', async () => {
	vol.fromJSON({})

	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		'http://localhost:8080/api/content-versions?product=nonexistent&id=test',
	)
	const response = await GET(request)
	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('should return 200 and array of strings on valid params', async () => {
	const mockedResponse = {
		versions: [
			{
				version: 'v202505-1',
				path: 'terraform/enterprise/api-docs/account',
			},
			{
				version: 'v202505-2',
				path: 'terraform/enterprise/api-docs/account-2',
			},
		],
	}

	const mockRequest = (url: string) => {
		return new Request(url)
	}
	const request = mockRequest(
		`http://localhost:8080/api/content-versions?product=terraform-enterprise&id=92a97263-e804-474f-9eb6-86fd0d53f33c`,
	)
	const response = await GET(request)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual(mockedResponse)
})
