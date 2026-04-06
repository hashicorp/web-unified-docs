/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, afterEach } from 'vitest'
import fs from 'node:fs'
import {
	gatherAllVersionsDocsPaths,
	resolveVersionDirectoryName,
} from './gather-all-versions-docs-paths.mjs'
import * as repoConfig from '#productConfig.mjs'

afterEach(() => {
	vi.restoreAllMocks()
})

// gatherAllVersionsDocsPaths tests

test('gatherAllDocsPaths returns the paths', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		'terraform-plugin-framework': {
			assetDir: 'img',
			basePaths: ['plugin/framework'],
			contentDir: 'docs',
			dataDir: 'data',
			productSlug: 'terraform',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	const versionMetadata = {
		'terraform-plugin-framework': [
			{ version: 'v1.13.x', releaseStage: 'stable', isLatest: true },
			{ version: 'v1.12.x', releaseStage: 'stable', isLatest: false },
		],
	}
	const result = await gatherAllVersionsDocsPaths(versionMetadata)

	expect(result['terraform-plugin-framework']).toEqual(
		expect.objectContaining({
			'v1.13.x': expect.arrayContaining([
				expect.objectContaining({
					path: 'terraform/plugin/framework/acctests',
				}),
			]),
		}),
	)
})

test('gatherAllDocsPaths throws an error if no version metadata is found for a product', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		test: {
			assetDir: 'public',
			contentDir: 'content',
			dataDir: 'data',
			productSlug: 'test',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	const versionMetadata = {}
	await expect(gatherAllVersionsDocsPaths(versionMetadata)).rejects.toThrow(
		'No version metadata found for product',
	)
})

test('resolveVersionDirectoryName uses latest directory for latest metadata when it exists', () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		terraform: {
			assetDir: 'img',
			basePaths: ['terraform'],
			contentDir: 'docs',
			dataDir: 'data',
			productSlug: 'terraform',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
		},
	})
	vi.spyOn(fs, 'existsSync').mockReturnValue(true)
	vi.spyOn(fs, 'statSync').mockReturnValue({
		isDirectory: () => {
			return true
		},
	})

	const resolvedDirectory = resolveVersionDirectoryName('terraform', {
		version: 'v1.21.x',
		releaseStage: 'stable',
		isLatest: true,
	})

	expect(resolvedDirectory).toBe('latest')
})
