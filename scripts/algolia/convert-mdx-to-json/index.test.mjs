/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */
import path from 'node:path'
import { readdir } from 'node:fs/promises'

import { describe, test, expect, vi } from 'vitest'
import { getLatestProductVersionDirectories } from './index.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'

vi.mock('node:fs/promises', () => {
	return {
		readdir: vi.fn(),
	}
})

describe('getLatestProductVersionDirectories', () => {
	test('should return the latest version directories for versioned products', async () => {
		readdir.mockResolvedValue([
			{
				name: 'terraform-plugin-mux',
				path: 'public/content',
				isDirectory: () => {
					return true
				},
			},
			{
				name: 'terraform-enterprise',
				path: 'public/content',
				isDirectory: () => {
					return true
				},
			},
		])

		const result = await getLatestProductVersionDirectories(
			'public/content',
			versionMetadata,
		)
		expect(result).toEqual([
			path.join('public/content', 'terraform-plugin-mux', 'v0.14.x'),
			path.join('public/content', 'terraform-enterprise', 'v202410-1'),
		])
	})

	test('should return the directory path for versionless products', async () => {
		readdir.mockResolvedValue([
			{
				name: 'terraform-docs-common',
				isDirectory: () => {
					return true
				},
			},
		])

		const result = await getLatestProductVersionDirectories(
			'public/content',
			versionMetadata,
		)
		expect(result).toEqual([
			path.join('public/content', 'terraform-docs-common'),
		])
	})

	test('should return an empty array if readdir does not return an array', async () => {
		readdir.mockResolvedValue(null)

		const result = await getLatestProductVersionDirectories(
			'public/content',
			versionMetadata,
		)
		expect(result).toEqual([])
	})
})
