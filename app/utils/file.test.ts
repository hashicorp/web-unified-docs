/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach, afterEach, describe } from 'vitest'
import { ServedFrom } from '#api/types'

// Must run before the module is evaluated so the module-level SELF_URL constant
// picks up VERCEL_URL at load time.
vi.hoisted(() => {
	process.env.VERCEL_URL = 'local-vercel-CDN'
})

import { fetchFile, FileType } from './file'

vi.mock('fs/promises', () => {
	return {
		readFile: vi.fn(),
	}
})

import { readFile } from 'fs/promises'

const makeChangedFiles = (
	overrides: Partial<{
		added: string[]
		modified: string[]
		removed: string[]
	}> = {},
) => {
	return {
		added: [],
		modified: [],
		removed: [],
		...overrides,
	}
}

beforeEach(() => {
	vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
	vi.unstubAllGlobals()
	vi.unstubAllEnvs()
	vi.resetAllMocks()
})

// ---------------------------------------------------------------------------
// fetchFile
// ---------------------------------------------------------------------------

describe('fetchFile — INCREMENTAL_BUILD not set', () => {
	test('fetches the file from LOCAL CDN', async () => {
		const mockResponse = new Response('body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.CurrentBuild },
		})
		expect(fetch).toHaveBeenCalledOnce()
		expect(fetch).toHaveBeenCalledWith(
			'https://local-vercel-CDN/content/vault/v1.21.x/docs/index.mdx',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})
})

describe('fetchFile — INCREMENTAL_BUILD=true', () => {
	beforeEach(() => {
		vi.stubEnv('INCREMENTAL_BUILD', 'true')
		vi.stubEnv('UNIFIED_DOCS_PROD_URL', 'https://prod-vercel-CDN')
	})

	test('returns Err when changedContentFiles.json cannot be read', async () => {
		vi.mocked(readFile).mockRejectedValue(new Error('ENOENT'))

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: false,
			value: 'Failed to read changedContentFiles.json for incremental build',
		})
		expect(fetch).not.toHaveBeenCalled()
	})

	test('returns Err for a removed file', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({ removed: ['content/vault/v1.21.x/docs/index.mdx'] }),
			) as any,
		)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: false,
			value: 'File removed in current build',
		})
		expect(fetch).not.toHaveBeenCalled()
	})

	test('fetches from LOCAL CDN for an added file', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({ added: ['content/vault/v1.21.x/docs/index.mdx'] }),
			) as any,
		)
		const mockResponse = new Response('body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.CurrentBuild },
		})
		expect(fetch).toHaveBeenCalledOnce()
		expect(fetch).toHaveBeenCalledWith(
			'https://local-vercel-CDN/content/vault/v1.21.x/docs/index.mdx',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})

	test('fetches from LOCAL CDN for a modified file', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({
					modified: ['content/vault/v1.21.x/docs/index.mdx'],
				}),
			) as any,
		)
		const mockResponse = new Response('body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.CurrentBuild },
		})
		expect(fetch).toHaveBeenCalledOnce()
		expect(fetch).toHaveBeenCalledWith(
			'https://local-vercel-CDN/content/vault/v1.21.x/docs/index.mdx',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})

	test('fetches from PROD CDN for an unchanged file', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(makeChangedFiles()) as any,
		)
		const mockResponse = new Response('prod body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Content,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.Production },
		})
		expect(fetch).toHaveBeenCalledOnce()
		expect(fetch).toHaveBeenCalledWith(
			'https://prod-vercel-CDN/content/vault/v1.21.x/docs/index.mdx',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})

	test('asset file: changed file has first segment replaced with "content" for changedContentFiles lookup', async () => {
		// Asset paths come in as e.g. "asset/vault/v1.21.x/img/foo.png"
		// but changedContentFiles.json records them under "content/vault/v1.21.x/img/foo.png"
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({ modified: ['content/vault/v1.21.x/img/foo.png'] }),
			) as any,
		)
		const mockResponse = new Response('asset body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'asset/vault/v1.21.x/img/foo.png',
			FileType.Asset,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.CurrentBuild },
		})
		expect(fetch).toHaveBeenCalledWith(
			'https://local-vercel-CDN/asset/vault/v1.21.x/img/foo.png',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})

	test('asset file: fetches from PROD CDN for unchanged asset', async () => {
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(makeChangedFiles()) as any,
		)
		const mockResponse = new Response('asset body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'asset/vault/v1.21.x/img/foo.png',
			FileType.Asset,
		)

		expect(result).toEqual({
			ok: true,
			value: { response: mockResponse, servedFrom: ServedFrom.Production },
		})
		expect(fetch).toHaveBeenCalledWith(
			'https://prod-vercel-CDN/asset/vault/v1.21.x/img/foo.png',
			expect.objectContaining({ cache: 'no-cache' }),
		)
	})
})
