/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect, vi } from 'vitest'
import { getProductSlugFromFilePath } from './index.mjs'
import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { PRODUCT_CONFIG } from '__fixtures__/productConfig.mjs'

vi.mock('../product-directory/index.mjs', () => {
	return {
		getProductDirectoryFromFilePath: vi.fn(),
	}
})

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'terraform-docs-common': { productSlug: 'terraform' },
			'terraform-plugin-testing': { productSlug: 'terraform' },
		},
	}
})

describe('getProductSlugFromFilePath', () => {
	test('should return the correct product slug for a valid file path', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-plugin-testing')
		const filePath =
			'web-unified-docs/content/terraform-plugin-testing/v1.2.x/docs/plugin/testing/migrating.mdx'
		const result = getProductSlugFromFilePath(filePath, PRODUCT_CONFIG)
		expect(result).toBe('terraform')
	})

	test('should throw an error when the file path is valid and the product slug is not found', () => {
		getProductDirectoryFromFilePath.mockReturnValue('repo3')
		const filePath = '/path/to/repo3/file'
		expect(() => {
			return getProductSlugFromFilePath(filePath, PRODUCT_CONFIG)
		}).toThrow('Product not found for repo3')
	})

	test('should throw an error if the file path is an empty string', () => {
		getProductDirectoryFromFilePath.mockReturnValue(null)
		const filePath = ''
		expect(() => {
			return getProductSlugFromFilePath(filePath, PRODUCT_CONFIG)
		}).toThrow('Product not found for null')
	})

	test('should return the correct product slug for a valid product file path', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-docs-common')
		const filePath =
			'web-unified-docs/content/terraform-docs-common/docs/cloud-docs/cost-estimation/gcp.mdx'
		const result = getProductSlugFromFilePath(filePath, PRODUCT_CONFIG)
		expect(result).toBe('terraform')
	})
})
