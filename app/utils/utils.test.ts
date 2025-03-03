import { expect, test, vi, afterEach, beforeEach } from 'vitest'
import { vol } from 'memfs'
import {
	getProductVersionMetadata,
	getProductVersion,
} from '@utils/contentVersions'
import { findDocVersions } from './findDocVersions'
import versionMetadata from '../../__fixtures__/versionMetadata.json'
import docsPathsMock from '../../__fixtures__/docsPathsAllVersionsMock.json'

beforeEach(() => {
	// Reset the state of in-memory fs
	vol.reset()
})

afterEach(() => {
	// Reset all mocks after each test
	vi.resetAllMocks()
})

test('getProductVersion should return error for non-existent product', () => {
	const expected = {
		ok: false,
		value: 'Product, noproduct, not found in version metadata',
	}

	const result = getProductVersion('noproduct', 'v1.19.x', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for non-existent version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "v1.19.x" version',
	}

	const result = getProductVersion('terraform', 'v1.19.x', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return correct version for existing version', () => {
	const expected = {
		ok: true,
		value: 'v1.5.x',
	}

	const result = getProductVersion('terraform', 'v1.5.x', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return latest version', () => {
	const product = 'terraform'
	const [expected] = versionMetadata[product]

	const { value } = getProductVersion(product, 'latest', versionMetadata)
	expect(value).toStrictEqual(expected.version)
})

test('getProductVersionMetadata should return metadata for existing product', () => {
	const product = 'terraform'

	const expected = {
		ok: true,
		value: versionMetadata[product],
	}

	const result = getProductVersionMetadata(product, versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return error for non-existent product', () => {
	const expected = {
		ok: false,
		value: 'Product, noproduct, not found in version metadata',
	}

	const result = getProductVersionMetadata('noproduct')
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return error for empty product name', () => {
	const expected = {
		ok: false,
		value: 'Product, , not found in version metadata',
	}

	const result = getProductVersionMetadata('')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for empty version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "" version',
	}

	const result = getProductVersion('terraform', '', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for null version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "null" version',
	}

	const result = getProductVersion('terraform', null, versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for undefined version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "undefined" version',
	}

	const result = getProductVersion('terraform', 'undefined', versionMetadata)
	expect(result).toStrictEqual(expected)
})

test('getProductVersionMetadata should return empty array for product with no versions', () => {
	const expected = {
		ok: false,
		value: 'Product, emptyproduct, not found in version metadata',
	}

	const result = getProductVersionMetadata('emptyproduct')
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
