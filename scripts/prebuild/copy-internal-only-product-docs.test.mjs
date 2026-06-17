/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { copyInternalOnlyProductDocs } from './copy-internal-only-product-docs.mjs'
import { listFiles } from '#scriptUtils/list-files.mjs'

vi.mock('#scriptUtils/list-files.mjs', () => {
	return {
		listFiles: vi.fn(),
	}
})

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			consul: {
				contentDir: 'content',
				versionedDocs: true,
			},
			'hcp-docs': {
				contentDir: 'content',
				versionedDocs: false,
			},
			'test-product': {
				contentDir: 'docs',
				versionedDocs: true,
			},
		},
	}
})

describe('copyInternalOnlyProductDocs', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('copies content and assets for internal-only imports when source paths exist', async () => {
		const sourceDir = '/workspace/content'
		const destDir = '/workspace/public/content'
		const destDirAssets = '/workspace/public/assets'
		const versionConfigPath =
			'/workspace/content/consul/v1.0.x/version-config.json'

		vi.mocked(listFiles).mockResolvedValue([versionConfigPath])

		const readSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(
			JSON.stringify({
				imports: [
					{
						'content-root': 'test-product',
						slug: 'test-product',
						version: 'v2.0.x',
					},
				],
			}),
		)
		const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		const copySpy = vi.spyOn(fs, 'cpSync').mockImplementation(() => {})

		await copyInternalOnlyProductDocs(sourceDir, destDir, destDirAssets)

		const expectedContentSource = path.join(
			destDir,
			'test-product',
			'v2.0.x',
			'docs',
		)
		const expectedContentDest = path.join(
			destDir,
			'consul',
			'v1.0.x',
			'content',
			'test-product',
		)
		const expectedAssetsSource = path.join(
			destDirAssets,
			'test-product',
			'v2.0.x',
			'img',
		)
		const expectedAssetsDest = path.join(
			destDirAssets,
			'consul',
			'v1.0.x',
			'img',
			'test-product',
		)

		expect(readSpy).toHaveBeenCalledWith(versionConfigPath, 'utf8')
		expect(existsSpy).toHaveBeenCalledWith(expectedContentSource)
		expect(existsSpy).toHaveBeenCalledWith(expectedAssetsSource)
		expect(copySpy).toHaveBeenCalledWith(
			expectedContentSource,
			expectedContentDest,
			{
				recursive: true,
			},
		)
		expect(copySpy).toHaveBeenCalledWith(
			expectedAssetsSource,
			expectedAssetsDest,
			{
				recursive: true,
			},
		)
	})

	it('skips copy when import entries are incomplete or source paths do not exist', async () => {
		const sourceDir = '/workspace/content'
		const destDir = '/workspace/public/content'
		const destDirAssets = '/workspace/public/assets'
		const versionConfigPath =
			'/workspace/content/hcp-docs/v0.0.x/version-config.json'

		vi.mocked(listFiles).mockResolvedValue([versionConfigPath])

		vi.spyOn(fs, 'readFileSync').mockReturnValue(
			JSON.stringify({
				imports: [
					{ slug: 'test-product', version: 'v2.0.x' },
					{ 'content-root': 'test-product', slug: 'test-product' },
					{
						'content-root': 'test-product',
						slug: 'test-product',
						version: 'v2.0.x',
					},
				],
			}),
		)
		vi.spyOn(fs, 'existsSync').mockReturnValue(false)
		const copySpy = vi.spyOn(fs, 'cpSync').mockImplementation(() => {})

		await copyInternalOnlyProductDocs(sourceDir, destDir, destDirAssets)

		expect(copySpy).not.toHaveBeenCalled()
	})
})
