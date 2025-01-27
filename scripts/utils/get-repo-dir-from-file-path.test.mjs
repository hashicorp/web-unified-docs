import { describe, test, expect } from 'vitest'
import { getRepoNameFromFilePath } from './get-repo-dir-from-file-path.mjs'

describe('getRepoNameFromFilePath', () => {
	test('should return null for an empty file path', () => {
		const result = getRepoNameFromFilePath('')
		expect(result).toBeNull()
	})

	test('should return the repository name from a valid file path', () => {
		const filePath =
			'web-unified-docs/content/ptfe-releases/v202410-1/docs/enterprise/cost-estimation/aws.mdx'
		const result = getRepoNameFromFilePath(filePath)
		expect(result).toBe('ptfe-releases')
	})

	test('should return the correct repository name when there is no version', () => {
		const filePath =
			'web-unified-docs/content/terraform-docs-common/docs/cloud-docs/migrate/index.mdx'
		const result = getRepoNameFromFilePath(filePath)
		expect(result).toBe('terraform-docs-common')
	})

	test('should return null for a file path without a "content" directory ', () => {
		const filePath = 'repo-name/some/other/path/file.txt'
		const result = getRepoNameFromFilePath(filePath)
		expect(result).toBe(null)
	})
})
