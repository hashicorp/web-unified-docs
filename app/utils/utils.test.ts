import { expect, test, vi, afterEach, beforeEach } from 'vitest'
import { vol } from 'memfs'
import {
	getProductVersionMetadata,
	getProductVersion,
} from '@utils/contentVersions'
import { searchNavDataFiles } from './searchNavDataFiles'
import versionMetadata from '../../__fixtures__/versionMetadata.json'
import fs from 'node:fs'

// Mock fs module
vi.mock('node:fs')
vi.mock('node:fs/promises')

vi.mock('@api/version-metadata', () => {
	return versionMetadata
})

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

	const result = getProductVersion('noproduct', 'v1.19.x')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for non-existent version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "v1.19.x" version',
	}

	const result = getProductVersion('terraform', 'v1.19.x')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return correct version for existing version', () => {
	const expected = {
		ok: true,
		value: 'v1.5.x',
	}

	const result = getProductVersion('terraform', 'v1.5.x')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return latest version', () => {
	const product = 'terraform'
	const [expected] = versionMetadata[product]

	const { value } = getProductVersion(product, 'latest')
	expect(value).toStrictEqual(expected.version)
})

test('getProductVersionMetadata should return metadata for existing product', () => {
	const product = 'terraform'

	const expected = {
		ok: true,
		value: versionMetadata[product],
	}

	const result = getProductVersionMetadata(product)
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

	const result = getProductVersion('terraform', '')
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for null version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "null" version',
	}

	const result = getProductVersion('terraform', null)
	expect(result).toStrictEqual(expected)
})

test('getProductVersion should return error for undefined version', () => {
	const expected = {
		ok: false,
		value: 'Product, terraform, has no "undefined" version',
	}

	const result = getProductVersion('terraform', 'undefined')
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

test('should return versions where the fullPath is found in nav-data.json', async () => {
	const product = 'terraform'
	const fullPath = '/some/path'
	const expected = ['v1.18.x', 'v1.19.x']

	vol.fromJSON({
		'/content/terraform/v1.19.x/data/nav-data.json': JSON.stringify({
			paths: ['/some/path'],
		}),
		'/content/terraform/v1.18.x/data/enterprise-nav-data.json': JSON.stringify({
			paths: ['/some/path'],
		}),
	})

	const result = await searchNavDataFiles(product, fullPath, '/')
	expect(result).toStrictEqual(expected)
})

test('should handle directory not found (ENOENT error)', async () => {
	const consoleLogSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	const product = 'nonexistent'
	const fullPath = '/some/path'

	vol.fromJSON({}, '/content')

	const result = await searchNavDataFiles(product, fullPath)
	expect(result).toStrictEqual([])
	expect(consoleLogSpy).toHaveBeenCalledWith(
		expect.stringContaining('Directory not found'),
	)
	consoleLogSpy.mockRestore()
})

test('should handle file reading error', async () => {
	const consoleLogSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
	const product = 'terraform'
	const fullPath = '/some/path'

	vol.fromJSON({
		'/content/terraform/v1.19.x/data/nav-data.json': 'bad perms',
	})
	// Similate a permission error
	fs.chmodSync('/content/terraform/v1.19.x/data/nav-data.json', 0o000)

	const result = await searchNavDataFiles(product, fullPath, '/')
	expect(result).toStrictEqual([])
	expect(consoleLogSpy).toHaveBeenCalledWith(
		'An error occurred while searching for the file /content/terraform/v1.19.x/data/nav-data.json',
	)
	consoleLogSpy.mockRestore()
})

test('should handle other errors', async () => {
	const product = 'terraform'
	const fullPath = '/some/path'

	// Mock fs.promises.readdir to throw an error
	vi.spyOn(fs.promises, 'readdir').mockRejectedValueOnce(
		new Error('Some error'),
	)

	try {
		await searchNavDataFiles(product, fullPath)
	} catch (error) {
		expect(error.message).toBe('Some error')
	}
})
