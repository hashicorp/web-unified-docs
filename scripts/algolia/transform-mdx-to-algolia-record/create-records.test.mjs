/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createAlgoliaRecordObject } from './create-records.mjs'
import { collectHeadings } from './headings/collect-headings.mjs'
import { collectCodeListItems } from './code-list-items/collect-code-list-items.mjs'
import { getProductDirectoryFromFilePath } from '#scriptUtils/file-path/product-directory/index.mjs'
import { join } from 'path'

vi.mock('./headings/collect-headings.mjs', async (importOriginal) => {
	const mod = await importOriginal()
	return {
		...mod,
		collectHeadings: vi.fn(),
	}
})

vi.mock(
	'./code-list-items/collect-code-list-items.mjs',
	async (importOriginal) => {
		const mod = await importOriginal()
		return {
			...mod,
			collectCodeListItems: vi.fn(),
		}
	},
)

vi.mock(
	'#scriptUtils/file-path/product-directory/index.mjs',
	async (importOriginal) => {
		const mod = await importOriginal()
		return {
			...mod,
			getProductDirectoryFromFilePath: vi.fn(),
		}
	},
)

/**
 * Dummy page content and metadata. Really not the point of these tests, just
 * exists to satisfy function parameters
 */
const dummyMarkdown = `# Sample Markdown
This is a sample markdown file for testing.
`
const dummyFrontMatter = {
	page_title: 'Sample Page Title',
	description: 'This is a sample description for the Algolia record.',
}

describe('Build Algolia Records', () => {
	beforeEach(() => {
		vi.mocked(collectHeadings).mockResolvedValue([])
		vi.mocked(collectCodeListItems).mockResolvedValue([])
	})

	it('creates a unique object ID for non-versioned products', async () => {
		getProductDirectoryFromFilePath.mockReturnValue(
			'well-architected-framework',
		)
		const path =
			'content/well-architected-framework/docs/docs/secure-systems/zero-trust-security.mdx'
		const {
			body: { objectID },
		} = await createAlgoliaRecordObject(
			dummyMarkdown,
			dummyFrontMatter,
			join(__dirname, '../', path),
		)
		expect(objectID).toBe(
			'docs_well-architected-framework/docs/secure-systems/zero-trust-security',
		)
	})

	it('creates a unique object ID for versioned products', async () => {
		getProductDirectoryFromFilePath.mockReturnValue('vault')
		const path = 'content/vault/v1.21.x/content/api-docs/auth/spiffe.mdx'
		const {
			body: { objectID },
		} = await createAlgoliaRecordObject(
			dummyMarkdown,
			dummyFrontMatter,
			join(__dirname, '../', path),
		)
		expect(objectID).not.toContain('v1.21.x')
		expect(objectID).toBe('docs_vault/api-docs/auth/spiffe')
	})
})
