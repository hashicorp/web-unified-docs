import { describe, test, expect } from 'vitest'
import { isLatestVersion } from '../latest-version/index.mjs'
import versionMetadata from '../../../../__fixtures__/versionMetadata.json'
import {
	getLatestVersionFromFilePath,
	getVersionFromFilePath,
} from './get-version-from-file-path.mjs'

describe('isLatestVersion', () => {
	test.only('should return undefined when file path is empty', () => {
		const result = isLatestVersion('', versionMetadata)
		expect(result).toBeUndefined()
	})

	test('should return true when filePath is valid and version is latest', () => {
		const result = isLatestVersion(
			'public/content/terraform/v1.9.x/docs/intro/core-workflow.mdx',
			versionMetadata,
		)
		expect(result).toBe(true)
	})

	test('should return false when version is not the latest', () => {
		const result = isLatestVersion(
			'public/content/ptfe-releases/v202207-2/docs/enterprise/run/api.mdx',
			versionMetadata,
		)
		expect(result).toBe(false)
	})

	test('should return true when file is in versionless directory', () => {
		const result = isLatestVersion(
			'public/content/terraform-docs-common/docs/docs/partnerships.mdx',
			versionMetadata,
		)
		expect(result).toBe(true)
	})

	describe('getLatestVersionFromFilePath', () => {
		test('should return undefined when file path is empty', () => {
			const result = getLatestVersionFromFilePath('', versionMetadata)
			expect(result).toBeUndefined()
		})

		test('should return the latest version for a versioned product', () => {
			const result = getLatestVersionFromFilePath(
				'public/content/terraform/v1.9.x/docs/intro/core-workflow.mdx',
				versionMetadata,
			)
			expect(result).toBe('1.9.0')
		})

		test('should return null when the file path is for a versionless product', () => {
			const result = getLatestVersionFromFilePath(
				'public/content/terraform-docs-common/docs/docs/partnerships.mdx',
				versionMetadata,
			)
			expect(result).toBeNull()
		})

		describe('getVersionFromFilePath', () => {
			test('should return undefined when file path is empty', () => {
				const result = getVersionFromFilePath('')
				expect(result).toBeUndefined()
			})

			test('should return valid semver version when file path contains version', () => {
				const result = getVersionFromFilePath(
					'public/content/terraform/v1.9.x/docs/intro/core-workflow.mdx',
				)
				expect(result).toBe('1.9.0')
			})

			test('should return null when file path does not contain a valid version', () => {
				const result = getVersionFromFilePath(
					'public/content/terraform-docs-common/docs/docs/partnerships.mdx',
				)
				expect(result).toBeNull()
			})
		})
	})
})
