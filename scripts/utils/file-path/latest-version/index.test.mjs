/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect, vi } from 'vitest'
import { isLatestVersion, getLatestVersion } from './index.mjs'
import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'

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

describe('isLatestVersion', () => {
	test('should throw an error if file path is empty', () => {
		expect(() => {
			return isLatestVersion('', {})
		}).toThrow('File path is empty')
	})

	test('should throw an error if version metadata is empty', () => {
		expect(() => {
			return isLatestVersion('some/path', null)
		}).toThrow('Version metadata is empty')
	})

	test('should return true if repo dir exists and is an empty array', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-docs-common')

		expect(
			isLatestVersion(
				'web-unified-docs/content/terraform-docs-common/docs/cloud-docs/vcs/bitbucket-data-center.mdx',
				versionMetadata,
			),
		).toBe(true)
	})

	test('should return true if file path version exists in version metadata and is the latest version', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-enterprise')
		getVersionFromFilePath.mockReturnValue('v202410-1')

		expect(
			isLatestVersion(
				'content/terraform-enterprise/v202410-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(true)
	})

	test('should return false if file path version exists in version metadata but is not the latest version', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-enterprise')
		getVersionFromFilePath.mockReturnValue('v202409-1')

		expect(
			isLatestVersion(
				'content/terraform-enterprise/v202409-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(false)
	})

	test('should return false if file path version does not exist in version metadata', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-enterprise')
		getVersionFromFilePath.mockReturnValue('v202509-1')

		expect(
			isLatestVersion(
				'content/terraform-enterprise/v202509-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(false)
	})
})

describe('getLatestVersion', () => {
	test('should throw an error if file path is empty', () => {
		expect(() => {
			getLatestVersion('', {})
		}).toThrow('File path is empty')
	})

	test('should throw an error if version metadata is empty', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-plugin-mux')
		const filePath =
			'content/terraform-plugin-mux/v0.13.5/docs/plugin/mux/index.mdx'
		expect(() => {
			getLatestVersion(filePath, null)
		}).toThrow('Version metadata is empty')
	})

	test('should throw an error if product directory does not match any products in version metadata', () => {
		const unknownProduct = 'unknown-product'
		getProductDirectoryFromFilePath.mockReturnValue(unknownProduct)
		const filePath = `content/${unknownProduct}/v0.13.5/random/docs/path`

		expect(() => {
			getLatestVersion(filePath, versionMetadata)
		}).toThrow(
			`Product directory ${unknownProduct} does not match any products in version metadata`,
		)
	})

	test('should return the latest version if product has versions', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-plugin-mux')
		const filePath =
			'web-unified-docs/content/terraform-plugin-mux/v0.13.x/docs/plugin/mux/index.mdx'
		const latestVersion = getLatestVersion(filePath, versionMetadata)
		expect(latestVersion).toBe('v0.14.x')
	})

	test('should return v0.0.x for versionless docs', () => {
		getProductDirectoryFromFilePath.mockReturnValue('terraform-docs-common')
		const filePath =
			'content/terraform-docs-common/docs/cloud-docs/cost-estimation/gcp.mdx'
		const latestVersion = getLatestVersion(filePath, versionMetadata)
		expect(latestVersion).toBe('v0.0.x')
	})
})
