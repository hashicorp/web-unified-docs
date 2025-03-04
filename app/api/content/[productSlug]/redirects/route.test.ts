/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { GET } from './route'

import * as utilsFileModule from '@utils/file'
import * as utilsContentVersionsModule from '@utils/contentVersions'

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

test("Return 404 if `product` DOESN'T exist", async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	// eat error message
	vi.spyOn(console, 'error').mockImplementation(() => {})

	const productSlug = 'fake product'
	const request = mockRequest(
		`http://localhost:8080/api/content/${productSlug}/redirects`,
	)
	const response = await GET(request, { params: { productSlug } })

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test("Return 404 if not redirect DOESN'T exists for `latest` on `productSlug`", async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const productSlug = 'terraform'
	const request = mockRequest(
		`http://localhost:8080/api/content/${productSlug}/redirects`,
	)
	const response = await GET(request, { params: { productSlug } })

	expect(response.status).toBe(404)
	const text = await response.text()
	expect(text).toBe('Not found')
})

test('Return 200 and parse the jsonc into json if valid for UNVERSIONED product', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const readFileSpy = vi.spyOn(utilsFileModule, 'readFile')
	readFileSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: jsoncFixtureBefore })
	})

	const productSlug = 'terraform-docs-common'
	const request = mockRequest(
		`http://localhost:8080/api/content/${productSlug}/redirects`,
	)
	const response = await GET(request, { params: { productSlug } })

	expect(response.status).toBe(200)
	const text = await response.text()
	expect(text).toBe(jsoncFixtureAfter)
})

test('Return 200 and parse the jsonc into json if valid for VERSIONED product', async () => {
	const mockRequest = (url: string) => {
		return new Request(url)
	}

	const readFileSpy = vi.spyOn(utilsFileModule, 'readFile')
	readFileSpy.mockImplementation(() => {
		return Promise.resolve({ ok: true, value: jsoncFixtureBefore })
	})

	const contentVersionsSpy = vi.spyOn(
		utilsContentVersionsModule,
		'getProductVersion',
	)
	contentVersionsSpy.mockImplementation(() => {
		return { ok: true, value: 'v202410-1' }
	})

	const productSlug = 'ptfe-releases'
	const request = mockRequest(
		`http://localhost:8080/api/content/${productSlug}/redirects`,
	)
	const response = await GET(request, { params: { productSlug } })

	expect(response.status).toBe(200)
	const text = await response.text()
	expect(text).toBe(jsoncFixtureAfter)
})
