/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { getUrlFromFilePath } from './index.mjs'
import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'
import { PRODUCT_CONFIG } from '__fixtures__/productConfig.mjs'
import allDocsPathsJsonMock from '__fixtures__/docsPathsAllVersionsMock.json'

vi.mock('../product-directory/index.mjs', () => {
	return {
		getProductDirectoryFromFilePath: vi.fn(),
	}
})

vi.mock('../version/index.mjs', () => {
	return {
		getVersionFromFilePath: vi.fn(),
	}
})

describe('getUrlFromFilePath', () => {
	it('should return the correct URL for a valid file path', () => {
		const filePath =
			'content/terraform-plugin-framework/v1.14.x/docs/plugin/framework/acctests.mdx'
		const repoDir = 'terraform-plugin-framework'
		const versionValue = 'v1.14.x'
		const expectedUrl = 'terraform/plugin/framework/acctests'

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		getVersionFromFilePath.mockReturnValue(versionValue)

		const result = getUrlFromFilePath(
			filePath,
			allDocsPathsJsonMock,
			PRODUCT_CONFIG,
		)
		expect(result).toBe(expectedUrl)
	})

	it('should throw an error if the product is not found', () => {
		const filePath = '/path/to/unknown/file.mdx'
		const repoDir = 'unknown'

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		getVersionFromFilePath.mockReturnValue('v1')

		expect(() => {
			return getUrlFromFilePath(filePath, allDocsPathsJsonMock, PRODUCT_CONFIG)
		}).toThrow(`Product not found for ${repoDir}`)
	})

	it('should use v0.0.x for versionless products (terraform-docs-common)', () => {
		const filePath = 'content/terraform-docs-common/docs/plugin/debugging.mdx'
		const repoDir = 'terraform-docs-common'
		const expectedUrl = 'terraform/plugin/debugging'

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		// versionedDocs: false, so should use v0.0.x

		const result = getUrlFromFilePath(
			filePath,
			allDocsPathsJsonMock,
			PRODUCT_CONFIG,
		)
		expect(result).toBe(expectedUrl)
	})

	it('should use v0.0.x for versionless products (hcp-docs)', () => {
		const filePath =
			'content/hcp-docs/content/docs/vagrant/reclaim-vagrant-cloud.mdx'
		const repoDir = 'hcp-docs'
		const expectedUrl = 'hcp/docs/vagrant/reclaim-vagrant-cloud'

		// Add hcp-docs to product config for this test only
		const mockProductConfig = {
			...PRODUCT_CONFIG,
			'hcp-docs': {
				versionedDocs: false,
				productSlug: 'hcp',
			},
		}

		// Add hcp-docs to allDocsPaths for this test only
		const mockAllDocsPaths = {
			...allDocsPathsJsonMock,
			'hcp-docs': {
				'v0.0.x': [
					{
						path: expectedUrl,
						itemPath: filePath,
						created_at: '2025-06-03T18:02:21+00:00',
					},
				],
			},
		}

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		// versionedDocs: false, so should use v0.0.x

		const result = getUrlFromFilePath(
			filePath,
			mockAllDocsPaths,
			mockProductConfig,
		)
		expect(result).toBe(expectedUrl)
	})

	it('should throw an error if no docs paths found for product', () => {
		const filePath = 'content/terraform-plugin-framework/v1.14.x/docs/test.mdx'
		const repoDir = 'terraform-plugin-framework'
		const versionValue = 'v1.14.x'
		const allDocsPathsEmpty = {}

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		getVersionFromFilePath.mockReturnValue(versionValue)

		expect(() => {
			return getUrlFromFilePath(filePath, allDocsPathsEmpty, PRODUCT_CONFIG)
		}).toThrow(`No docs paths found for product: ${repoDir}`)
	})

	it('should throw an error if version not found for product', () => {
		const filePath = 'content/terraform-plugin-framework/v99.99.x/docs/test.mdx'
		const repoDir = 'terraform-plugin-framework'
		const versionValue = 'v99.99.x'

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		getVersionFromFilePath.mockReturnValue(versionValue)

		expect(() => {
			return getUrlFromFilePath(filePath, allDocsPathsJsonMock, PRODUCT_CONFIG)
		}).toThrow(
			`Version ${versionValue} not found for product ${repoDir}. File path: ${filePath}`,
		)
	})

	it('should throw an error if no matching path found for file', () => {
		const filePath =
			'content/terraform-plugin-framework/v1.14.x/docs/nonexistent-file.mdx'
		const repoDir = 'terraform-plugin-framework'
		const versionValue = 'v1.14.x'

		getProductDirectoryFromFilePath.mockReturnValue(repoDir)
		getVersionFromFilePath.mockReturnValue(versionValue)

		expect(() => {
			return getUrlFromFilePath(filePath, allDocsPathsJsonMock, PRODUCT_CONFIG)
		}).toThrow(
			`No matching path found for file: ${filePath} in version ${versionValue} of ${repoDir}`,
		)
	})
})
