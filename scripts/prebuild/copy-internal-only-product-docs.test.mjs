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
			'terraform-enterprise': {
				contentDir: 'docs',
				versionedDocs: true,
				supportsExclusionDirectives: true,
			},
			'terraform-docs-common': {
				contentDir: 'docs',
				versionedDocs: false,
				supportsExclusionDirectives: true,
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

	it('resolves exclusion directives in copied files using the consuming product context', async () => {
		const sourceDir = '/workspace/content'
		const destDir = '/workspace/public/content'
		const destDirAssets = '/workspace/public/assets'
		const versionConfigPath =
			'/workspace/content/terraform-enterprise/v2.0.x/version-config.json'
		const copiedMdxPath = path.join(
			destDir,
			'terraform-enterprise',
			'v2.0.x',
			'docs',
			'test-product',
			'shared.mdx',
		)

		const sharedMdx = `---
page_title: Shared
---

<!-- BEGIN: TFEnterprise:only -->
TFE only content.
<!-- END: TFEnterprise:only -->
<!-- BEGIN: TFC:only -->
TFC only content.
<!-- END: TFC:only -->
`

		vi.mocked(listFiles)
			.mockResolvedValueOnce([versionConfigPath])
			.mockResolvedValue([copiedMdxPath])

		vi.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
			if (String(filePath) === versionConfigPath) {
				return JSON.stringify({
					imports: [
						{
							'content-root': 'test-product',
							slug: 'test-product',
							version: 'v3.0.x',
						},
					],
				})
			}
			return sharedMdx
		})
		vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		vi.spyOn(fs, 'cpSync').mockImplementation(() => {})
		const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})

		await copyInternalOnlyProductDocs(sourceDir, destDir, destDirAssets)

		expect(writeSpy).toHaveBeenCalledOnce()
		const [writtenPath, writtenContent] = writeSpy.mock.calls[0]
		expect(writtenPath).toBe(copiedMdxPath)
		// TFEnterprise:only is kept when copied into terraform-enterprise
		expect(writtenContent).toContain('TFE only content.')
		// TFC:only is removed because the consuming product is not terraform-docs-common
		expect(writtenContent).not.toContain('TFC only content.')
	})

	it('resolves exclusion directives differently for a different consuming product', async () => {
		const sourceDir = '/workspace/content'
		const destDir = '/workspace/public/content'
		const destDirAssets = '/workspace/public/assets'
		const versionConfigPath =
			'/workspace/content/terraform-docs-common/version-config.json'
		const copiedMdxPath = path.join(
			destDir,
			'terraform-docs-common',
			'docs',
			'test-product',
			'shared.mdx',
		)

		const sharedMdx = `---
page_title: Shared
---

<!-- BEGIN: TFEnterprise:only -->
TFE only content.
<!-- END: TFEnterprise:only -->
<!-- BEGIN: TFC:only -->
TFC only content.
<!-- END: TFC:only -->
`

		vi.mocked(listFiles)
			.mockResolvedValueOnce([versionConfigPath])
			.mockResolvedValue([copiedMdxPath])

		vi.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
			if (String(filePath) === versionConfigPath) {
				return JSON.stringify({
					imports: [
						{
							'content-root': 'test-product',
							slug: 'test-product',
							version: 'v3.0.x',
						},
					],
				})
			}
			return sharedMdx
		})
		vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		vi.spyOn(fs, 'cpSync').mockImplementation(() => {})
		const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})

		await copyInternalOnlyProductDocs(sourceDir, destDir, destDirAssets)

		expect(writeSpy).toHaveBeenCalledOnce()
		const [, writtenContent] = writeSpy.mock.calls[0]
		// TFC:only is kept when copied into terraform-docs-common
		expect(writtenContent).toContain('TFC only content.')
		// TFEnterprise:only is removed because the consuming product is not terraform-enterprise
		expect(writtenContent).not.toContain('TFE only content.')
	})

	it('does not rewrite copied files that contain no exclusion directives', async () => {
		const sourceDir = '/workspace/content'
		const destDir = '/workspace/public/content'
		const destDirAssets = '/workspace/public/assets'
		const versionConfigPath =
			'/workspace/content/terraform-enterprise/v2.0.x/version-config.json'
		const copiedMdxPath = path.join(
			destDir,
			'terraform-enterprise',
			'v2.0.x',
			'docs',
			'test-product',
			'plain.mdx',
		)

		vi.mocked(listFiles)
			.mockResolvedValueOnce([versionConfigPath])
			.mockResolvedValue([copiedMdxPath])

		vi.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
			if (String(filePath) === versionConfigPath) {
				return JSON.stringify({
					imports: [
						{
							'content-root': 'test-product',
							slug: 'test-product',
							version: 'v3.0.x',
						},
					],
				})
			}
			return '# Plain content with no directives.\n'
		})
		vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		vi.spyOn(fs, 'cpSync').mockImplementation(() => {})
		const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})

		await copyInternalOnlyProductDocs(sourceDir, destDir, destDirAssets)

		expect(writeSpy).not.toHaveBeenCalled()
	})
})
