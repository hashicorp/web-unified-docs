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

vi.mock('fs/promises', () => {
	return {
		readFile: vi.fn(),
	}
})

import { readFile } from 'node:fs/promises'

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

const loadFileModuleWithEnv = async (
	env: Partial<Record<string, string | undefined>>,
) => {
	vi.resetModules()

	for (const [key, value] of Object.entries(env)) {
		if (value === undefined) {
			delete process.env[key]
		} else {
			process.env[key] = value
		}
	}

	return import('./file')
}

beforeEach(() => {
	vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
	vi.unstubAllGlobals()
	vi.resetAllMocks()
})

// ---------------------------------------------------------------------------
// fetchFile
// ---------------------------------------------------------------------------

describe('fetchFile - INCREMENTAL_BUILD not set', () => {
	test('fetches the file from LOCAL CDN', async () => {
		const { fetchFile, FileType } = await loadFileModuleWithEnv({
			VERCEL_URL: 'local-vercel-CDN',
			INCREMENTAL_BUILD: undefined,
			VERCEL_ENV: undefined,
			UNIFIED_DOCS_PROD_URL: undefined,
		})

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

describe('fetchFile - INCREMENTAL_BUILD=true', () => {
	const incrementalEnv = {
		VERCEL_URL: 'local-vercel-CDN',
		INCREMENTAL_BUILD: 'true',
		VERCEL_ENV: 'preview',
		UNIFIED_DOCS_PROD_URL: 'https://prod-vercel-CDN',
	}

	test('returns Err when changedContentFiles.json cannot be read', async () => {
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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

		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile, FileType } = await loadFileModuleWithEnv(incrementalEnv)
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

describe('findFileWithMetadata', () => {
	test('removes empty segments from URL path', async () => {
		const { findFileWithMetadata } = await loadFileModuleWithEnv({
			VERCEL_URL: 'local-vercel-CDN',
			INCREMENTAL_BUILD: undefined,
			VERCEL_ENV: undefined,
			UNIFIED_DOCS_PROD_URL: undefined,
		})

		const filePath = [
			'content',
			'terraform-docs-common',
			'',
			'docs',
			'cloud-docs/index.mdx',
		]
		const versionMetaData = {
			releaseStage: 'stable',
			version: '',
			isLatest: true,
		}

		const mockResponse = new Response('body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		await findFileWithMetadata(filePath, versionMetaData)

		expect(fetch.mock.calls[0][0]).not.toContain('//docs')
	})
})
