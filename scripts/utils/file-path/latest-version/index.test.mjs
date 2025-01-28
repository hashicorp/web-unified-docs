import { describe, test, expect, vi } from 'vitest'
import { isLatestVersion } from './index.mjs'
import { getProductDirectoryFromFilePath } from '../product-directory/index.mjs'
import { getVersionFromFilePath } from '../version/index.mjs'
import versionMetadata from '../../../../__fixtures__/versionMetadata.json'

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
		getProductDirectoryFromFilePath.mockReturnValue('ptfe-releases')
		getVersionFromFilePath.mockReturnValue('v202410-1')

		expect(
			isLatestVersion(
				'content/ptfe-releases/v202410-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(true)
	})

	test('should return false if file path version exists in version metadata but is not the latest version', () => {
		getProductDirectoryFromFilePath.mockReturnValue('ptfe-releases')
		getVersionFromFilePath.mockReturnValue('v202409-1')

		expect(
			isLatestVersion(
				'content/ptfe-releases/v202409-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(false)
	})

	test('should return false if file path version does not exist in version metadata', () => {
		getProductDirectoryFromFilePath.mockReturnValue('ptfe-releases')
		getVersionFromFilePath.mockReturnValue('v202509-1')

		expect(
			isLatestVersion(
				'content/ptfe-releases/v202509-1/docs/enterprise/cost-estimation/gcp.mdx',
				versionMetadata,
			),
		).toBe(false)
	})
})
