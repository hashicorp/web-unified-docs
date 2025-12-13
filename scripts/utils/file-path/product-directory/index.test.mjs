/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect } from 'vitest'
import { getProductDirectoryFromFilePath } from './index.mjs'

describe('getProductDirectoryFromFilePath', () => {
	test('should return null for an empty file path', () => {
		const result = getProductDirectoryFromFilePath('')
		expect(result).toBeNull()
	})

	test('should return the repository name from a valid file path', () => {
		const filePath =
			'web-unified-docs/content/terraform-enterprise/v202410-1/docs/enterprise/cost-estimation/aws.mdx'
		const result = getProductDirectoryFromFilePath(filePath)
		expect(result).toBe('terraform-enterprise')
	})

	test('should return the correct repository name when there is no version', () => {
		const filePath =
			'web-unified-docs/content/terraform-docs-common/docs/cloud-docs/migrate/index.mdx'
		const result = getProductDirectoryFromFilePath(filePath)
		expect(result).toBe('terraform-docs-common')
	})

	test('should return null for a file path without a "content" directory ', () => {
		const filePath = 'repo-name/some/other/path/file.txt'
		const result = getProductDirectoryFromFilePath(filePath)
		expect(result).toBe(null)
	})
})
