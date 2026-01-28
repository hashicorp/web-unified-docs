/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect } from 'vitest'
import { getVersionFromFilePath } from '../version/index.mjs'

describe('getVersionFromFilePath', () => {
	test('should throw an error if file path is empty', () => {
		expect(() => {
			getVersionFromFilePath('')
		}).toThrow('File path is empty')
	})

	test('should return the correct version for a product version in the file path', () => {
		const filePath =
			'content/terraform-plugin-mux/v0.13.5/docs/plugin/mux/index.mdx'
		const version = getVersionFromFilePath(filePath)
		expect(version).toBe('v0.13.5')
	})

	test('should return the correct version for a product version with .x in the file path', () => {
		const filePath =
			'content/terraform-plugin-mux/v0.13.x/docs/plugin/mux/index.mdx'
		const version = getVersionFromFilePath(filePath)
		expect(version).toBe('v0.13.x')
	})

	test('should return the correct version for a Terraform Enterprise version in the file path', () => {
		const filePath =
			'content/terraform-enterprise/v202410-1/docs/enterprise/some-doc.mdx'
		const version = getVersionFromFilePath(filePath)
		expect(version).toBe('v202410-1')
	})

	test('should return false if the file path is for versionless docs', () => {
		const filePath =
			'content/terraform-docs-common/docs/cloud-docs/cost-estimation/gcp.mdx'
		const version = getVersionFromFilePath(filePath)
		expect(version).toBe(false)
	})
})
