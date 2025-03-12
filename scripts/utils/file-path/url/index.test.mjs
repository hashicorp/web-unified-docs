import { describe, it, expect, vi } from 'vitest'
import { getUrlFromFilePath } from './index.mjs'
import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'
import { PRODUCT_CONFIG } from '../../../../__fixtures__/productConfig.mjs'
import allDocsPathsJsonMock from '../../../../__fixtures__/docsPathsAllVersionsMock.json'

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
})
