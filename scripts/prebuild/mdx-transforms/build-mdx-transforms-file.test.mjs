/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach } from 'vitest'
import { fs, vol } from 'memfs'
import {
	buildFileMdxTransforms,
	applyFileMdxTransforms,
} from './build-mdx-transforms-file.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'
import * as repoConfig from '#productConfig.mjs'
import { copyInternalOnlyProductDocs } from '../copy-internal-only-product-docs.mjs'

vi.mock('node:fs')
vi.mock('../copy-internal-only-product-docs.mjs', () => {
	return {
		copyInternalOnlyProductDocs: vi.fn(),
	}
})

const mdxContent = `---
page_title: 'Plugin Development - Framework: Paths'
---

# Paths

An exact location within a [schema](/plugin/framework/schemas)
`

const transformedMdxContent = `---
page_title: 'Plugin Development - Framework: Paths'
---
# Paths

An exact location within a [schema](/plugin/framework/schemas)`

beforeEach(() => {
	vol.fromJSON({
		'content/terraform/v1.19.x/test.mdx': mdxContent,
		'public/content/terraform/v1.19.x/test.mdx': transformedMdxContent,
		'app/api/versionMetadata.json': JSON.stringify(versionMetadata),
		'content/terraform/v1.19.x/partials': {},
	})
})

const transformedOutPath = 'public/content/terraform/v1.19.x/test.mdx'

test('test buildfileMdxTransforms', async () => {
	await buildFileMdxTransforms('content/terraform/v1.19.x/test.mdx')
	const transformedContent = fs.readFileSync(transformedOutPath, 'utf8')
	expect(transformedContent).toContain(transformedMdxContent)
})

test('test applyFileMdxTransforms', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		terraform: {
			basePaths: ['cli', 'internals', 'intro', 'language'],
		},
	})
	const entry = {
		filePath: 'content/terraform/v1.19.x/test.mdx',
		partialsDir: '../../partials',
		outPath: transformedOutPath,
	}
	const result = await applyFileMdxTransforms(entry, versionMetadata)
	expect(result).toStrictEqual({ error: null })

	const transformedContent = fs.readFileSync(entry.outPath, 'utf8')
	expect(transformedContent.trim()).toContain(transformedMdxContent.trim())
})

test('buildFileMdxTransforms copies internal-only docs for internal products', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		terraform: {
			versionedDocs: true,
			internalProduct: true,
			basePaths: ['cli', 'internals', 'intro', 'language'],
		},
	})

	await buildFileMdxTransforms('content/terraform/v1.19.x/test.mdx')

	expect(copyInternalOnlyProductDocs).toHaveBeenCalledOnce()
	expect(copyInternalOnlyProductDocs).toHaveBeenCalledWith(
		'content',
		'public/content',
		expect.stringMatching(/public\/assets$/),
	)
})

test('buildFileMdxTransforms applies content exclusion using the file repoSlug', async () => {
	vi.spyOn(repoConfig, 'PRODUCT_CONFIG', 'get').mockReturnValue({
		'terraform-enterprise': {
			versionedDocs: true,
			contentDir: 'docs',
			supportsExclusionDirectives: true,
		},
	})

	const exclusionContent = `---
page_title: Exclusion test
---

<!-- BEGIN: TFEnterprise:only -->
Keep this content.
<!-- END: TFEnterprise:only -->
<!-- BEGIN: TFC:only -->
Remove this content.
<!-- END: TFC:only -->
`

	vol.fromJSON({
		'content/terraform-enterprise/2.0.x/docs/test.mdx': exclusionContent,
		'app/api/versionMetadata.json': JSON.stringify(versionMetadata),
		'content/terraform-enterprise/2.0.x/docs/partials': {},
	})

	await buildFileMdxTransforms(
		'content/terraform-enterprise/2.0.x/docs/test.mdx',
	)

	const output = fs.readFileSync(
		'public/content/terraform-enterprise/2.0.x/docs/test.mdx',
		'utf8',
	)
	expect(output).toContain('Keep this content.')
	expect(output).not.toContain('Remove this content.')
})
