/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach } from 'vitest'
import { fs, vol } from 'memfs'
import { buildFileMdxTransforms } from './build-mdx-transforms-file.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'

vi.mock('node:fs')
vi.mock('node:fs/promises')

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
