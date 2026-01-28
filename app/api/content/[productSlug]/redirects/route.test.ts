/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { GET } from './route'

import * as utilsFileModule from '#utils/file'
import * as utilsContentVersionsModule from '#utils/contentVersions'
import { mockRequest } from '#utils/mockRequest'

vi.mock('#api/versionMetadata.json', () => {
	return {
		default: {
			'terraform-docs-common': [
				{
					version: 'v0.0.x',
					releaseStage: 'stable',
					isLatest: true,
				},
			],
		},
	}
})

const jsoncFixtureBefore = `
[
  // Test comment
  {
    "from": "/docs/cli",
    "to": "/docs/terraform-docs-common/cli",
  }
]
`

const jsoncFixtureAfter = `[{"from":"/docs/cli","to":"/docs/terraform-docs-common/cli"}]`

test('Return 404 if `product` does not exist', async () => {
	// eat error message
	vi.spyOn(console, 'error').mockImplementation(() => {})

	const productSlug = 'fake product'
	const response = await mockRequest(GET, { productSlug })

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test("Return 404 if not redirect DOESN'T exists for `latest` on `productSlug`", async () => {
	const productSlug = 'terraform'
	const response = await mockRequest(GET, { productSlug })

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('Return 200 and parse the jsonc into json if valid for UNVERSIONED product', async () => {
	const readFileSpy = vi.spyOn(utilsFileModule, 'findFileWithMetadata')
	readFileSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: jsoncFixtureBefore })
	})

	const productSlug = 'terraform-docs-common'
	const response = await mockRequest(GET, { productSlug })

	expect(response.status).toBe(200)
	const text = await response.text()
	expect(text).toBe(jsoncFixtureAfter)
})

test('Return 200 and parse the jsonc into json if valid for VERSIONED product', async () => {
	const readFileSpy = vi.spyOn(utilsFileModule, 'findFileWithMetadata')
	readFileSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: jsoncFixtureBefore })
	})

	const contentVersionsSpy = vi.spyOn(
		utilsContentVersionsModule,
		'getProductVersionMetadata',
	)
	contentVersionsSpy.mockImplementation(() => {
		return {
			ok: true,
			value: { releaseStage: 'stable', version: 'v202410-1', isLatest: false },
		}
	})

	const productSlug = 'terraform-enterprise'
	const response = await mockRequest(GET, { productSlug })

	expect(response.status).toBe(200)
	const text = await response.text()
	expect(text).toBe(jsoncFixtureAfter)
})
