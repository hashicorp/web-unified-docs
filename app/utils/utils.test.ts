/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, afterEach } from 'vitest'
import {
	getProductMetadata,
	getProductVersionMetadata,
} from '#utils/contentVersions'
import { findDocVersions } from './findDocVersions'
import versionMetadata from '__fixtures__/versionMetadata.json'
import docsPathsMock from '__fixtures__/docsPathsAllVersionsMock.json'

afterEach(() => {
	// Reset all mocks after each test
	vi.resetAllMocks()
})

vi.mock('#api/versionMetadata.json', () => {
	return {
		default: '',
	}
})

vi.mock('#api/docsPathsAllVersions.json', () => {
	return {
		default: {},
	}
})

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			terraform: { contentDir: 'docs', versionedDocs: true },
		},
	}
})

test('getProductVersion should return error for non-existent product', () => {
	const expected = {
		ok: false,
		value: 'Product, noproduct, not found in version metadata',
	}

	const result = getProductVersionMetadata(
		'noproduct',
		'v1.19.x',
		versionMetadata,
	)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for non-existent version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "v1.19.x" version',
	}

	const result = getProductVersionMetadata(
		'terraform',
		'v1.19.x',
		versionMetadata,
	)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return correct version for existing version', () => {
	const expected = {
		ok: true,
		value: {
			version: 'v1.5.x',
			releaseStage: 'stable',
			isLatest: false,
		},
	}

	const result = getProductVersionMetadata(
		'terraform',
		'v1.5.x',
		versionMetadata,
	)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return latest version', () => {
	const product = 'terraform'
	const [expected] = versionMetadata[product]

	const { value } = getProductVersionMetadata(
		product,
		'latest',
		versionMetadata,
	)
	expect(value).toStrictEqual(expected)
})

test('getProductVersionMetadata should return metadata for existing product', () => {
	const product = 'terraform'

	const expected = {
		ok: true,
		value: versionMetadata[product],
	}

	const result = getProductMetadata(product, versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return error for non-existent product', () => {
	const expected = {
		ok: false,
		value: 'Product, noproduct, not found in version metadata',
	}

	const result = getProductMetadata('noproduct')
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return error for empty product name', () => {
	const expected = {
		ok: false,
		value: 'Product, , not found in version metadata',
	}

	const result = getProductMetadata('')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for empty version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "" version',
	}

	const result = getProductVersionMetadata('terraform', '', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for null version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "null" version',
	}

	const result = getProductVersionMetadata('terraform', null, versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for undefined version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "undefined" version',
	}

	const result = getProductVersionMetadata(
		'terraform',
		'undefined',
		versionMetadata,
	)
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return empty array for product with no versions', () => {
	const expected = {
		ok: false,
		value: 'Product, emptyproduct, not found in version metadata',
	}

	const result = getProductMetadata('emptyproduct')
	expect(result).toStrictEqual(expected)
})

test('should return versions where the fullPath is found in docsPathsAllVersions.json', async () => {
	const product = 'terraform-plugin-testing'
	const fullPath = 'acceptance-tests/plan-checks/custom'
	const expected = [
		'v1.11.x',
		'v1.10.x',
		'v1.9.x',
		'v1.8.x',
		'v1.7.x',
		'v1.6.x',
	]

	const result = findDocVersions(product, fullPath, docsPathsMock)
	expect(result).toStrictEqual(expected)
})

test('should handle directory not found (ENOENT error)', async () => {
	const consoleLogSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	const product = 'nonexistent'
	const fullPath = '/some/path'

	const result = findDocVersions(product, fullPath, docsPathsMock)
	expect(result).toStrictEqual([])
	expect(consoleLogSpy).toHaveBeenCalledWith(
		expect.stringContaining('Product, nonexistent, not found in docs paths'),
	)
	consoleLogSpy.mockRestore()
})
