/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi } from 'vitest'
import { findDocVersions } from './findDocVersions'

vi.mock('#api/docsPathsAllVersions.json', () => {
	return {
		default: {},
	}
})

describe('findDocVersions', () => {
	it('should return an array of versions where the fullPath exists', () => {
		const mockDocsPathsData = {
			productA: {
				'1.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
				'2.0': [{ path: '/docs/path2', itemPath: '', created_at: '' }],
				'3.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
			},
		}

		const result = findDocVersions('productA', '/docs/path1', mockDocsPathsData)
		expect(result).toEqual(['1.0', '3.0'])
	})

	it('should return an empty array if the product is not found', () => {
		const mockDocsPathsData = {
			productA: {
				'1.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
			},
		}

		const result = findDocVersions('productB', '/docs/path1', mockDocsPathsData)
		expect(result).toEqual([])
	})

	it('should return an empty array if the fullPath does not exist in any version', () => {
		const mockDocsPathsData = {
			productA: {
				'1.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
				'2.0': [{ path: '/docs/path2', itemPath: '', created_at: '' }],
			},
		}

		const result = findDocVersions(
			'productA',
			'/docs/nonexistent',
			mockDocsPathsData,
		)
		expect(result).toEqual([])
	})

	it('should not add duplicate versions to the result', () => {
		const mockDocsPathsData = {
			productA: {
				'1.0': [
					{ path: '/docs/path1', itemPath: '', created_at: '' },
					{ path: '/docs/path1', itemPath: '', created_at: '' },
				],
			},
		}

		const result = findDocVersions('productA', '/docs/path1', mockDocsPathsData)
		expect(result).toEqual(['1.0'])
	})

	it('should use the default docsPathsAllVersions data if no custom data is provided', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
		const result = findDocVersions('nonexistentProduct', '/docs/path1')
		expect(result).toEqual([])
		expect(spy).toHaveBeenCalledWith(
			'Product, nonexistentProduct, not found in docs paths',
		)
		spy.mockRestore()
	})

	it('should not return a version if the path contains the full path but  does not end with it', () => {
		const mockDocsPathsData = {
			productA: {
				'1.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
				'2.0': [
					{ path: '/docs/path1-extra-long', itemPath: '', created_at: '' },
				],
				'3.0': [{ path: '/docs/path1', itemPath: '', created_at: '' }],
			},
		}

		const result = findDocVersions('productA', '/docs/path1', mockDocsPathsData)
		expect(result).toEqual(['1.0', '3.0'])
	})
})
