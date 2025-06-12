/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, afterEach } from 'vitest'
import {
	gatherAllVersionsDocsPaths,
	getProductPaths,
} from './gather-all-versions-docs-paths.mjs'
import * as repoConfig from '../app/utils/productConfig.mjs'
import { vol } from 'memfs'
import { EOL } from 'os'

vi.mock('node:fs')

afterEach(() => {
	vi.restoreAllMocks()
	vol.reset()
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

test('getProductPaths parses file id from frontmatter if present', async () => {
	const product = 'terraform-enterprise'
	const documentId = '10db84d9-9775-4e1f-9b8d-9df21031a4a3'
	const directory = `./content/${product}/v202505-1/docs/enterprise/api-docs`
	vol.fromJSON({
		[`${directory}/account.mdx`]: `---${EOL}id: ${documentId}${EOL}---`,
	})
	vi.mock('util', () => {
		return {
			promisify: vi.fn(() => {
				return vi.fn(() => {
					return {
						// Happy Holidays! :) ....honestly just an arbitary date in the correct format
						stdout: '2025-12-25T00:00:00-00:00',
					}
				})
			}),
		}
	})
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		[product]: {
			assetDir: 'img',
			basePaths: ['enterprise'],
			contentDir: 'docs',
			dataDir: 'data',
			productSlug: 'terraform',
			semverCoerce: () => {},
			versionedDocs: true,
			websiteDir: 'website',
			navDataPath: '',
		},
	})
	const [{ id }] = await getProductPaths(directory, product)
	expect(id).toBeDefined()
	expect(id).toEqual(documentId)
})
