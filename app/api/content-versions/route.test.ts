/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { GET } from './route'
import { mockRequest } from '#utils/mockRequest'
import { findDocVersions } from '#utils/findDocVersions'

import { vol } from 'memfs'

// Mock fs module
vi.mock('node:fs')
vi.mock('node:fs/promises')

// Mock PRODUCT_CONFIG
vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'terraform-cdk': {
				assetDir: '',
				basePaths: ['cdktf'],
				contentDir: 'docs',
				dataDir: 'data',
				productSlug: 'terraform',
				versionedDocs: true,
				websiteDir: 'website',
			},
		},
	}
})

vi.mock('#utils/findDocVersions', () => {
	return {
		findDocVersions: vi.fn(),
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
	const response = await mockRequest(
		GET,
		{},
		'content-versions?fullPath=doc%23cdktf%2Fapi-reference%2Fpython',
	)
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe(
		'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
	)
})

test('should return 400 if `fullPath` query parameter is missing', async () => {
	const response = await mockRequest(GET, {}, 'content-versions?product=vault')
	expect(response.status).toBe(400)
	const text = await response.text()
	expect(text).toBe(
		'Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.',
	)
})

test('should return 404 if the product is invalid', async () => {
	vol.fromJSON({})

	const response = await mockRequest(
		GET,
		{},
		'content-versions?product=nonexistent&fullPath=doc%23cdktf%2Fapi-reference%2Fpython',
	)
	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('should return 200 and array of strings on valid params', async () => {
	vi.mocked(findDocVersions).mockReturnValue(['v0.20.x', 'v0.21.x'])

	const mockedResponse = {
		versions: ['v0.20.x', 'v0.21.x'],
	}
	const response = await mockRequest(
		GET,
		{},
		'content-versions?product=terraform-cdk&fullPath=doc%23cdktf%2Fapi-reference%2Fpython',
	)
	expect(response.status).toBe(200)
	const json = await response.json()
	expect(json).toEqual(mockedResponse)
})
