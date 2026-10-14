/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs/promises'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import {
	addVersionToNavData,
	addVersionToNavDataPaths,
} from './add-version-to-nav-data.mjs'

const { getBasePaths } = vi.hoisted(() => {
	return { getBasePaths: vi.fn() }
})

vi.mock('node:fs/promises', () => {
	return {
		default: {
			readFile: vi.fn(),
			writeFile: vi.fn(),
		},
	}
})

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			vault: {
				versionedDocs: true,
				get basePaths() {
					return getBasePaths()
				},
			},
			'validated-designs': { versionedDocs: false },
		},
	}
})

const versionMetadata = {
	vault: [
		{ version: 'v1.21.x', releaseStage: 'stable', isLatest: true },
		{ version: 'v1.20.x', releaseStage: 'beta', isLatest: false },
		{ version: 'v1.19.x', releaseStage: 'stable', isLatest: false },
	],
}

beforeEach(() => {
	vi.clearAllMocks()
	getBasePaths.mockReturnValue(['docs', 'api-docs'])
	vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
	vi.restoreAllMocks()
})

describe('addVersionToNavDataPaths', () => {
	test.each([
		['v1.19.x', 'v1.19.x/'],
		['v1.20.x (beta)', 'v1.20.x/'],
		['v1.21.x', ''],
	])('rewrites %s navigation without filesystem I/O', (version, prefix) => {
		const versionedPath = `${prefix || 'v1.21.x/'}already-versioned`
		const navData = [
			{
				title: 'Nested',
				routes: [
					{ path: 'intro' },
					{ path: versionedPath },
					{ href: '/docs/commands' },
					{ href: '/api-docs/sys/health' },
					{ href: 'https://developer.hashicorp.com' },
					{ href: '/consul/docs' },
				],
			},
		]

		const result = addVersionToNavDataPaths(
			navData,
			'vault',
			version,
			versionMetadata,
		)

		expect(result).toBe(navData)
		expect(result).toEqual([
			{
				title: 'Nested',
				routes: [
					{ path: `${prefix}intro` },
					{ path: versionedPath },
					{ href: `/docs/${prefix}commands` },
					{ href: `/api-docs/${prefix}sys/health` },
					{ href: 'https://developer.hashicorp.com' },
					{ href: '/consul/docs' },
				],
			},
		])
		expect(fs.readFile).not.toHaveBeenCalled()
		expect(fs.writeFile).not.toHaveBeenCalled()
		expect(getBasePaths).toHaveBeenCalledTimes(prefix ? 1 : 0)
	})

	test.each([{ basePaths: undefined }, { basePaths: [] }])(
		'preserves rewriting when base paths are $basePaths',
		({ basePaths }) => {
			getBasePaths.mockReturnValue(basePaths)
			const navData = [{ path: 'intro' }, { href: '/docs/commands' }]

			expect(
				addVersionToNavDataPaths(navData, 'vault', 'v1.19.x', versionMetadata),
			).toEqual([{ path: 'v1.19.x/intro' }, { href: '/docs/commands' }])
			expect(getBasePaths).toHaveBeenCalledOnce()
		},
	)

	test.each([
		[{}, 'No version metadata found for product: vault'],
		[{ vault: [] }, 'No latest version found for product: vault'],
	])('throws when version metadata is incomplete', (metadata, error) => {
		expect(() => {
			addVersionToNavDataPaths(
				[{ path: 'intro' }],
				'vault',
				'v1.19.x',
				metadata,
			)
		}).toThrow(error)
	})
})

describe('addVersionToNavData', () => {
	test.each([
		['v1.19.x', 'v1.19.x/'],
		['v1.20.x (beta)', 'v1.20.x/'],
		['v1.21.x', ''],
	])('preserves prebuild file rewriting for %s', async (version, prefix) => {
		const filePath = `/repo/public/content/vault/${version}/data/docs-nav-data.json`
		fs.readFile.mockResolvedValue('[{"path":"intro"}]')

		await addVersionToNavData(filePath, versionMetadata)

		expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8')
		expect(fs.writeFile).toHaveBeenCalledWith(
			filePath,
			JSON.stringify([{ path: `${prefix}intro` }], null, 2),
			'utf-8',
		)
	})

	test('does not read or rewrite unversioned files', async () => {
		await addVersionToNavData(
			'/repo/public/content/validated-designs/data/docs-nav-data.json',
			{},
		)

		expect(fs.readFile).not.toHaveBeenCalled()
		expect(fs.writeFile).not.toHaveBeenCalled()
	})

	test.each([
		[{}, 'No version metadata found for product: vault'],
		[{ vault: [] }, 'No latest version found for product: vault'],
	])(
		'logs incomplete version metadata without writing output',
		async (metadata, error) => {
			const filePath =
				'/repo/public/content/vault/v1.19.x/data/docs-nav-data.json'
			fs.readFile.mockResolvedValue('[{"path":"intro"}]')

			await addVersionToNavData(filePath, metadata)

			expect(console.error).toHaveBeenCalledWith(
				`Error parsing JSON in file ${filePath}:`,
				expect.objectContaining({ message: error }),
			)
			expect(fs.writeFile).not.toHaveBeenCalled()
		},
	)

	test('logs malformed JSON without writing output', async () => {
		const filePath =
			'/repo/public/content/vault/v1.19.x/data/docs-nav-data.json'
		fs.readFile.mockResolvedValue('{')

		await addVersionToNavData(filePath, versionMetadata)

		expect(console.error).toHaveBeenCalledWith(
			`Error parsing JSON in file ${filePath}:`,
			expect.any(SyntaxError),
		)
		expect(fs.writeFile).not.toHaveBeenCalled()
	})
})
