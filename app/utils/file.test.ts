/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach, afterEach, describe, it } from 'vitest'
import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { FileType, ServedFrom } from '#types'
import type { Metadata } from '#types'

// Must run before the module is evaluated so the module-level SELF_URL constant
// picks up VERCEL_URL at load time.
const { buildMdxTransforms, getMetadata } = vi.hoisted(() => {
	process.env.VERCEL_URL = 'local-vercel-CDN'
	return {
		buildMdxTransforms: vi.fn(),
		getMetadata: vi.fn(),
	}
})

import { getAssetData, resolveCdnUrl } from './file'

vi.mock('./metadata', () => {
	return { getMetadata }
})

vi.mock(
	'../../scripts/prebuild/mdx-transforms/build-mdx-transforms.mjs',
	() => {
		return { buildMdxTransforms }
	},
)

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			vault: { versionedDocs: true, basePaths: ['docs', 'api-docs'] },
			'validated-designs': { versionedDocs: false },
			'terraform-plugin-log': { versionedDocs: true },
		},
	}
})

vi.mock('node:fs', () => {
	const fs = {
		copyFileSync: vi.fn(),
		existsSync: vi.fn(),
		mkdirSync: vi.fn(),
	}
	return { default: fs, ...fs }
})

vi.mock('fs/promises', () => {
	const fs = {
		access: vi.fn(),
		readFile: vi.fn(),
		writeFile: vi.fn(),
	}
	return { default: fs, ...fs }
})

import { access, readFile, writeFile } from 'node:fs/promises'

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
		vi.stubEnv(key, value)
	}

	return import('./file')
}

beforeEach(() => {
	vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
	vi.doUnmock('../../scripts/prebuild/add-version-to-nav-data.mjs')
	vi.doMock(
		'../../scripts/prebuild/mdx-transforms/build-mdx-transforms.mjs',
		() => {
			return { buildMdxTransforms }
		},
	)
	vi.unstubAllGlobals()
	vi.unstubAllEnvs()
	vi.resetAllMocks()
})

describe('FileType', () => {
	test('distinguishes the three text formats from assets', () => {
		expect(FileType).toEqual({
			Markdown: 'markdown',
			NavData: 'navData',
			Redirects: 'redirects',
			Asset: 'asset',
		})
	})
})

// ---------------------------------------------------------------------------
// fetchFile
// ---------------------------------------------------------------------------

describe('fetchFile - fullBuild', () => {
	test.each([
		['production', FileType.Markdown, 'true', 'production'],
		['production', FileType.NavData, 'true', 'production'],
		['incremental preview', FileType.Markdown, 'true', 'preview'],
		['incremental preview', FileType.NavData, 'true', 'preview'],
		['full build', FileType.Markdown, 'false', ''],
		['full build', FileType.NavData, 'false', ''],
	])(
		'does not load local content processors in %s for %s',
		async (
			_scenario: string,
			fileType: FileType,
			incremental: string,
			vercelEnv: string,
		) => {
			vi.doMock(
				'../../scripts/prebuild/mdx-transforms/build-mdx-transforms.mjs',
				() => {
					throw new Error('Development-only MDX transforms were loaded')
				},
			)
			vi.doMock('../../scripts/prebuild/add-version-to-nav-data.mjs', () => {
				throw new Error('Development-only navigation processing was loaded')
			})
			const { fetchFile } = await loadFileModuleWithEnv({
				NODE_ENV: 'production',
				INCREMENTAL_BUILD: incremental,
				VERCEL_ENV: vercelEnv,
				VERCEL_URL: 'local-vercel-CDN',
			})
			const filePath =
				fileType === FileType.Markdown
					? 'content/vault/v1.21.x/docs/index.mdx'
					: 'content/vault/v1.21.x/data/docs-nav-data.json'
			if (vercelEnv === 'preview') {
				vi.mocked(readFile).mockResolvedValue(
					JSON.stringify(
						makeChangedFiles({
							added: [filePath],
						}),
					),
				)
			}
			const mockResponse = new Response('body')
			vi.mocked(fetch).mockResolvedValue(mockResponse)

			const result = await fetchFile(filePath, fileType)

			expect(result).toEqual({
				ok: true,
				value: { response: mockResponse, servedFrom: ServedFrom.CurrentBuild },
			})
		},
	)

	test.each([FileType.Markdown, FileType.NavData, FileType.Redirects])(
		'fetches %s files from LOCAL CDN',
		async (fileType: FileType) => {
			const { fetchFile } = await loadFileModuleWithEnv({
				VERCEL_URL: 'local-vercel-CDN',
				INCREMENTAL_BUILD: undefined,
				VERCEL_ENV: undefined,
				UNIFIED_DOCS_PROD_URL: undefined,
			})

			const mockResponse = new Response('body')
			vi.mocked(fetch).mockResolvedValue(mockResponse)

			const result = await fetchFile(
				'content/vault/v1.21.x/docs/index.mdx',
				fileType,
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
		},
	)
})

describe('fetchFile - incBuildPRPreview', () => {
	const incrementalEnv = {
		VERCEL_URL: 'local-vercel-CDN',
		NODE_ENV: 'production',
		INCREMENTAL_BUILD: 'true',
		VERCEL_ENV: undefined,
		UNIFIED_DOCS_PROD_URL: 'https://prod-vercel-CDN',
	}

	test('returns Err when changedContentFiles.json cannot be read', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
		vi.mocked(readFile).mockRejectedValue(new Error('ENOENT'))

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Markdown,
		)

		expect(result).toEqual({
			ok: false,
			value: 'Failed to read changedContentFiles.json for incremental build',
		})
		expect(fetch).not.toHaveBeenCalled()
	})

	test('returns Err for a removed file', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({ removed: ['content/vault/v1.21.x/docs/index.mdx'] }),
			) as any,
		)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Markdown,
		)

		expect(result).toEqual({
			ok: false,
			value: 'File removed in current build',
		})
		expect(fetch).not.toHaveBeenCalled()
	})

	test('fetches from LOCAL CDN for an added file', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
		vi.mocked(readFile).mockResolvedValue(
			JSON.stringify(
				makeChangedFiles({ added: ['content/vault/v1.21.x/docs/index.mdx'] }),
			) as any,
		)
		const mockResponse = new Response('body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)

		const result = await fetchFile(
			'content/vault/v1.21.x/docs/index.mdx',
			FileType.Markdown,
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
		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
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
			FileType.Markdown,
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

	test.each([FileType.Markdown, FileType.NavData, FileType.Redirects])(
		'fetches unchanged %s files from PROD CDN',
		async (fileType: FileType) => {
			const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
			vi.mocked(readFile).mockResolvedValue(
				JSON.stringify(makeChangedFiles()) as any,
			)
			const mockResponse = new Response('prod body')
			vi.mocked(fetch).mockResolvedValue(mockResponse)

			const result = await fetchFile(
				'content/vault/v1.21.x/docs/index.mdx',
				fileType,
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
		},
	)

	test('asset file: changed file has first segment replaced with "content" for changedContentFiles lookup', async () => {
		// Asset paths come in as e.g. "asset/vault/v1.21.x/img/foo.png"
		// but changedContentFiles.json records them under "content/vault/v1.21.x/img/foo.png"

		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
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
		const { fetchFile } = await loadFileModuleWithEnv(incrementalEnv)
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

describe('fetchFile - incBuildLocalDev', () => {
	const localEnv = {
		NODE_ENV: 'development',
		INCREMENTAL_BUILD: 'true',
		VERCEL_ENV: undefined,
		VERCEL_URL: undefined,
		UNIFIED_DOCS_PROD_URL: undefined,
	}
	const markdownPath = 'content/vault/v1.21.x/docs/index.mdx'
	const outputPath = path.join('public', markdownPath)
	const metadata: Metadata = {
		versionMetadata: {
			vault: [
				{ version: 'v1.21.x', releaseStage: 'stable', isLatest: true },
				{ version: 'v1.20.x', releaseStage: 'beta', isLatest: false },
				{ version: 'v1.19.x', releaseStage: 'stable', isLatest: false },
			],
		},
		docsPathsAllVersions: {},
	}

	beforeEach(() => {
		vi.mocked(access).mockResolvedValue(undefined)
		getMetadata.mockResolvedValue(metadata)
		buildMdxTransforms.mockResolvedValue(undefined)
	})

	test('transforms the requested Markdown file and serves its local output', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		vi.mocked(readFile).mockResolvedValue('# Transformed')

		const result = await fetchFile(markdownPath, FileType.Markdown)

		expect(access).toHaveBeenCalledOnce()
		expect(access).toHaveBeenCalledWith(markdownPath)
		expect(readFile).toHaveBeenCalledOnce()
		expect(readFile).toHaveBeenCalledWith(outputPath, 'utf-8')
		expect(getMetadata).toHaveBeenCalledOnce()
		expect(buildMdxTransforms).toHaveBeenCalledOnce()
		expect(buildMdxTransforms).toHaveBeenCalledWith(
			path.join(process.cwd(), 'content'),
			path.join(process.cwd(), 'public', 'content'),
			metadata.versionMetadata,
			[path.join(process.cwd(), markdownPath)],
		)
		expect(result.ok).toBe(true)
		if (result.ok) {
			expect(result.value.servedFrom).toBe(ServedFrom.CurrentBuild)
			expect(await result.value.response.text()).toBe('# Transformed')
			expect(result.value.response.headers.get('content-type')).toBe(
				'text/markdown; charset=utf-8',
			)
		}
		expect(fetch).not.toHaveBeenCalled()
	})

	test('waits for Markdown transforms before reading the output', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		vi.mocked(readFile).mockResolvedValue('# Transformed')
		let finishTransform: () => void
		buildMdxTransforms.mockReturnValueOnce(
			new Promise<void>((resolve: () => void) => {
				finishTransform = resolve
			}),
		)

		const pending = fetchFile(markdownPath, FileType.Markdown)
		await vi.waitFor(() => {
			expect(buildMdxTransforms).toHaveBeenCalledOnce()
		})
		expect(readFile).not.toHaveBeenCalled()

		finishTransform()
		expect((await pending).ok).toBe(true)
		expect(readFile).toHaveBeenCalledOnce()
		expect(readFile).toHaveBeenCalledWith(outputPath, 'utf-8')
		expect(fetch).not.toHaveBeenCalled()
	})

	test('waits for the source file existence check before transforming Markdown', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		vi.mocked(readFile).mockResolvedValue('# Transformed')
		let finishAccess: () => void
		vi.mocked(access).mockReturnValueOnce(
			new Promise<void>((resolve: () => void) => {
				finishAccess = resolve
			}),
		)

		const pending = fetchFile(markdownPath, FileType.Markdown)
		await vi.waitFor(() => {
			expect(access).toHaveBeenCalledOnce()
		})
		expect(getMetadata).not.toHaveBeenCalled()
		expect(buildMdxTransforms).not.toHaveBeenCalled()
		expect(readFile).not.toHaveBeenCalled()

		finishAccess()
		expect((await pending).ok).toBe(true)
		expect(buildMdxTransforms).toHaveBeenCalledOnce()
		expect(readFile).toHaveBeenCalledWith(outputPath, 'utf-8')
	})

	test.each([
		{ product: 'vault', version: 'v1.19.x', prefix: 'v1.19.x/' },
		{ product: 'vault', version: 'v1.20.x (beta)', prefix: 'v1.20.x/' },
		{ product: 'vault', version: 'v1.21.x', prefix: '' },
		{ product: 'validated-designs', version: '', prefix: '' },
	])(
		'serves local $product $version navigation with in-memory version rewriting',
		async ({
			product,
			version,
			prefix,
		}: {
			product: string
			version: string
			prefix: string
		}) => {
			const { fetchFile } = await loadFileModuleWithEnv(localEnv)
			const filePath = path.join(
				'content',
				product,
				version,
				'data',
				'docs-nav-data.json',
			)
			const versionedPath = `${prefix || 'v1.21.x/'}already-versioned`
			const navData = [
				{ title: 'Introduction', path: 'intro' },
				{
					title: 'Nested',
					routes: [
						{ title: 'CLI', href: '/docs/commands' },
						{ title: 'API', href: '/api-docs/sys/health' },
						{ title: 'Versioned', path: versionedPath },
						{ title: 'External', href: 'https://developer.hashicorp.com' },
						{ title: 'Cross product', href: '/consul/docs' },
					],
				},
			]
			vi.mocked(readFile).mockResolvedValue(JSON.stringify(navData))

			const result = await fetchFile(filePath, FileType.NavData)

			expect(result.ok).toBe(true)
			if (result.ok) {
				expect(await result.value.response.json()).toEqual([
					{ title: 'Introduction', path: `${prefix}intro` },
					{
						title: 'Nested',
						routes: [
							{ title: 'CLI', href: `/docs/${prefix}commands` },
							{ title: 'API', href: `/api-docs/${prefix}sys/health` },
							{ title: 'Versioned', path: versionedPath },
							{ title: 'External', href: 'https://developer.hashicorp.com' },
							{ title: 'Cross product', href: '/consul/docs' },
						],
					},
				])
				expect(result.value.servedFrom).toBe(ServedFrom.CurrentBuild)
				expect(result.value.response.headers.get('content-type')).toBe(
					'application/json; charset=utf-8',
				)
			}
			expect(readFile).toHaveBeenCalledOnce()
			expect(readFile).toHaveBeenCalledWith(filePath, 'utf-8')
			expect(copyFileSync).not.toHaveBeenCalled()
			expect(mkdirSync).not.toHaveBeenCalled()
			expect(writeFile).not.toHaveBeenCalled()
			expect(access).not.toHaveBeenCalled()
			expect(getMetadata).toHaveBeenCalledTimes(product === 'vault' ? 1 : 0)
			expect(buildMdxTransforms).not.toHaveBeenCalled()
			expect(fetch).not.toHaveBeenCalled()
		},
	)

	test.each([
		[
			FileType.Redirects,
			'content/vault/v1.21.x/redirects.jsonc',
			'text/plain; charset=utf-8',
		],
	])(
		'reads local %s files as text without transforming them',
		async (fileType: FileType, filePath: string, contentType: string) => {
			const { fetchFile } = await loadFileModuleWithEnv(localEnv)
			const content = '{"local": true}'
			vi.mocked(readFile).mockResolvedValue(content)

			const result = await fetchFile(filePath, fileType)

			expect(readFile).toHaveBeenCalledOnce()
			expect(readFile).toHaveBeenCalledWith(filePath, 'utf-8')
			expect(result.ok).toBe(true)
			if (result.ok) {
				expect(result.value.servedFrom).toBe(ServedFrom.CurrentBuild)
				expect(await result.value.response.text()).toBe(content)
				expect(result.value.response.headers.get('content-type')).toBe(
					contentType,
				)
			}
			expect(getMetadata).not.toHaveBeenCalled()
			expect(buildMdxTransforms).not.toHaveBeenCalled()
			expect(access).not.toHaveBeenCalled()
			expect(fetch).not.toHaveBeenCalled()
		},
	)

	test('maps asset paths to content and preserves binary data', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		const content = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff])
		vi.mocked(readFile).mockResolvedValue(content)

		const result = await fetchFile(
			'asset/vault/v1.21.x/img/logo.png',
			FileType.Asset,
		)

		expect(readFile).toHaveBeenCalledOnce()
		expect(readFile).toHaveBeenCalledWith('content/vault/v1.21.x/img/logo.png')
		expect(result.ok).toBe(true)
		if (result.ok) {
			expect(result.value.servedFrom).toBe(ServedFrom.CurrentBuild)
			expect(new Uint8Array(await result.value.response.arrayBuffer())).toEqual(
				new Uint8Array(content),
			)
			expect(result.value.response.headers.get('content-type')).toBe(
				'image/png',
			)
		}
		expect(getMetadata).not.toHaveBeenCalled()
		expect(buildMdxTransforms).not.toHaveBeenCalled()
		expect(access).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test.each([
		[FileType.Markdown, markdownPath, `${markdownPath}, error: Error: ENOENT`],
		[
			FileType.NavData,
			'content/vault/v1.21.x/data/docs-nav-data.json',
			'content/vault/v1.21.x/data/docs-nav-data.json, error: Error: ENOENT',
		],
		[
			FileType.Redirects,
			'content/vault/v1.21.x/redirects.jsonc',
			'content/vault/v1.21.x/redirects.jsonc, error: Error: ENOENT',
		],
		[
			FileType.Asset,
			'asset/vault/v1.21.x/img/logo.png',
			'content/vault/v1.21.x/img/logo.png, error: Error: ENOENT',
		],
	])(
		'returns Err for missing local %s files without using the CDN',
		async (fileType: FileType, filePath: string, failedPath: string) => {
			const { fetchFile } = await loadFileModuleWithEnv(localEnv)
			if (fileType === FileType.Markdown) {
				vi.mocked(access).mockRejectedValueOnce(new Error('ENOENT'))
			} else {
				vi.mocked(readFile).mockRejectedValueOnce(new Error('ENOENT'))
			}

			expect(await fetchFile(filePath, fileType)).toEqual({
				ok: false,
				value: `Failed to read local file at path: ${failedPath}`,
			})
			expect(getMetadata).not.toHaveBeenCalled()
			expect(buildMdxTransforms).not.toHaveBeenCalled()
			if (fileType === FileType.Markdown) {
				expect(access).toHaveBeenCalledWith(filePath)
				expect(readFile).not.toHaveBeenCalled()
			}
			expect(fetch).not.toHaveBeenCalled()
		},
	)

	test('returns Err when local Markdown transformation fails', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		buildMdxTransforms.mockRejectedValueOnce(new Error('Transform failed'))

		expect(await fetchFile(markdownPath, FileType.Markdown)).toEqual({
			ok: false,
			value: `Failed to read local file at path: ${markdownPath}, error: Error: Transform failed`,
		})
		expect(readFile).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test.each([FileType.Markdown, FileType.NavData])(
		'returns Err when metadata cannot be loaded for local %s processing',
		async (fileType: FileType) => {
			const { fetchFile } = await loadFileModuleWithEnv(localEnv)
			const filePath =
				fileType === FileType.Markdown
					? markdownPath
					: 'content/vault/v1.21.x/data/docs-nav-data.json'
			vi.mocked(readFile).mockResolvedValue('[{"path":"intro"}]')
			getMetadata.mockRejectedValueOnce(new Error('Metadata unavailable'))

			expect(await fetchFile(filePath, fileType)).toEqual({
				ok: false,
				value: `Failed to read local file at path: ${filePath}, error: Error: Metadata unavailable`,
			})
			if (fileType === FileType.Markdown) {
				expect(readFile).not.toHaveBeenCalled()
			} else {
				expect(readFile).toHaveBeenCalledOnce()
				expect(readFile).toHaveBeenCalledWith(filePath, 'utf-8')
			}
			expect(buildMdxTransforms).not.toHaveBeenCalled()
			expect(copyFileSync).not.toHaveBeenCalled()
			expect(fetch).not.toHaveBeenCalled()
		},
	)

	test('returns Err when local navigation contains invalid JSON', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		const filePath = 'content/vault/v1.19.x/data/docs-nav-data.json'
		vi.mocked(readFile).mockResolvedValue('{')

		expect(await fetchFile(filePath, FileType.NavData)).toEqual({
			ok: false,
			value: expect.stringContaining(
				`Failed to read local file at path: ${filePath}, error: SyntaxError:`,
			),
		})
		expect(copyFileSync).not.toHaveBeenCalled()
		expect(writeFile).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test('waits for version metadata before returning transformed local navigation', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		const filePath = 'content/vault/v1.19.x/data/docs-nav-data.json'
		vi.mocked(readFile).mockResolvedValue('[{"path":"intro"}]')
		let finishMetadata: (value: Metadata) => void
		getMetadata.mockReturnValueOnce(
			new Promise<Metadata>((resolve: (value: Metadata) => void) => {
				finishMetadata = resolve
			}),
		)

		const pending = fetchFile(filePath, FileType.NavData)
		await vi.waitFor(() => {
			expect(getMetadata).toHaveBeenCalledOnce()
		})
		expect(readFile).toHaveBeenCalledOnce()
		expect(copyFileSync).not.toHaveBeenCalled()
		expect(writeFile).not.toHaveBeenCalled()

		finishMetadata(metadata)
		const result = await pending
		expect(result.ok).toBe(true)
		if (result.ok) {
			expect(await result.value.response.json()).toEqual([
				{ path: 'v1.19.x/intro' },
			])
		}
		expect(readFile).toHaveBeenCalledOnce()
		expect(readFile).toHaveBeenCalledWith(filePath, 'utf-8')
		expect(copyFileSync).not.toHaveBeenCalled()
		expect(writeFile).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test('returns Err when version metadata is missing for local navigation', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		const filePath = 'content/vault/v1.19.x/data/docs-nav-data.json'
		vi.mocked(readFile).mockResolvedValue('[{"path":"intro"}]')
		getMetadata.mockResolvedValueOnce({
			...metadata,
			versionMetadata: {},
		})

		expect(await fetchFile(filePath, FileType.NavData)).toEqual({
			ok: false,
			value: `Failed to read local file at path: ${filePath}, error: Error: No version metadata found for product: vault`,
		})
		expect(copyFileSync).not.toHaveBeenCalled()
		expect(writeFile).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test('returns Err when the transformed Markdown output cannot be read', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		vi.mocked(readFile).mockRejectedValueOnce(new Error('ENOENT'))

		expect(await fetchFile(markdownPath, FileType.Markdown)).toEqual({
			ok: false,
			value: `Failed to read local file at path: ${outputPath}, error: Error: ENOENT`,
		})
		expect(buildMdxTransforms).toHaveBeenCalledOnce()
		expect(fetch).not.toHaveBeenCalled()
	})
})

describe('getAssetData', () => {
	test('removes empty version segment from path for unversioned products', async () => {
		// For unversioned products, versionMetadata.version is '' which must not
		// produce a double-slash in the asset path (e.g. "assets/validated-designs//img/...")
		const unversionedFilePath = [
			'assets',
			'validated-designs',
			'',
			'img/vault/logo.png',
		]
		const unversionMetaData = {
			releaseStage: 'stable',
			version: '',
			isLatest: true,
		}

		const mockResponse = new Response('image body')
		vi.mocked(fetch).mockResolvedValue(mockResponse)
		await getAssetData(unversionedFilePath, unversionMetaData)
		console.log('here failing', fetch.mock.calls[0][0])
		expect(fetch.mock.calls[0][0]).not.toContain('//img')
	})
})

describe('findFileWithMetadata', () => {
	test('returns the file path and error when a fetch fails', async () => {
		const { findFileWithMetadata } = await loadFileModuleWithEnv({
			INCREMENTAL_BUILD: undefined,
			VERCEL_ENV: undefined,
		})
		vi.mocked(fetch).mockRejectedValueOnce(new Error('Fetch failed'))

		const result = await findFileWithMetadata(
			['content', 'vault', 'v1.21.x', 'docs/index.mdx'],
			{ version: 'v1.21.x', releaseStage: 'stable', isLatest: true },
			FileType.Markdown,
		)

		expect(result).toEqual({
			ok: false,
			value:
				'Failed to read file at path: content/vault/v1.21.x/docs/index.mdx, error: Error: Fetch failed',
		})
	})

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

		await findFileWithMetadata(filePath, versionMetaData, FileType.Markdown)

		expect(fetch.mock.calls[0][0]).not.toContain('//docs')
	})

	test.each([
		[FileType.Markdown, 'docs/index.mdx'],
		[FileType.NavData, 'data/docs-nav-data.json'],
		[FileType.Redirects, 'redirects.jsonc'],
	])(
		'loads %s content as text',
		async (fileType: FileType, contentPath: string) => {
			const { findFileWithMetadata } = await loadFileModuleWithEnv({
				VERCEL_URL: 'local-vercel-CDN',
				INCREMENTAL_BUILD: undefined,
				VERCEL_ENV: undefined,
				UNIFIED_DOCS_PROD_URL: undefined,
			})
			const filePath = ['content', 'vault', 'v1.21.x', contentPath]
			const versionMetaData = {
				releaseStage: 'stable',
				version: 'v1.21.x',
				isLatest: true,
			}
			vi.mocked(fetch).mockResolvedValue(new Response('file content'))

			const result = await findFileWithMetadata(
				filePath,
				versionMetaData,
				fileType,
			)

			expect(result).toEqual({
				ok: true,
				value: { text: 'file content', servedFrom: ServedFrom.CurrentBuild },
			})
			expect(fetch).toHaveBeenCalledWith(
				`https://local-vercel-CDN/${filePath.join('/')}`,
				expect.objectContaining({ cache: 'no-cache' }),
			)
		},
	)
})

describe('resolveCdnUrl', () => {
	test.each([
		[
			'local incremental development',
			'development',
			'',
			'http://localhost:8080/api/assets/validated-designs/latest',
		],
		[
			'production',
			'production',
			'production',
			'https://local-vercel-CDN/assets/validated-designs',
		],
	])(
		'uses /latest only for unversioned local incremental download links (%s)',
		async (
			_scenario: string,
			nodeEnv: string,
			vercelEnv: string,
			expectedBaseUrl: string,
		) => {
			const { resolveCdnUrl } = await loadFileModuleWithEnv({
				NODE_ENV: nodeEnv,
				INCREMENTAL_BUILD: 'true',
				VERCEL_ENV: vercelEnv,
				VERCEL_URL: nodeEnv === 'development' ? undefined : 'local-vercel-CDN',
				UNIFIED_DOCS_PORT: '8080',
			})

			expect(
				resolveCdnUrl(
					'[Guide]({{CDN_URL}}/pdf/Boundary-Administration-Guide.pdf)',
					'validated-designs',
					'',
				),
			).toBe(
				`[Guide](${expectedBaseUrl}/pdf/Boundary-Administration-Guide.pdf)`,
			)
		},
	)

	it('replaces {{CDN_URL}} with versioned assets URL for versioned products', () => {
		const result = resolveCdnUrl(
			'[Guide]({{CDN_URL}}/img/diagram.png)',
			'terraform-plugin-log',
			'v0.4.x',
		)
		expect(result).toBe(
			'[Guide](https://local-vercel-CDN/assets/terraform-plugin-log/v0.4.x/img/diagram.png)',
		)
	})

	it('replaces {{CDN_URL}} without version segment for unversioned products', () => {
		const result = resolveCdnUrl(
			'[Guide]({{CDN_URL}}/pdf/Boundary-Administration-Guide.pdf)',
			'validated-designs',
			'v0.0.x',
		)
		expect(result).toBe(
			'[Guide](https://local-vercel-CDN/assets/validated-designs/pdf/Boundary-Administration-Guide.pdf)',
		)
	})

	it('does not modify markdown without {{CDN_URL}}', () => {
		const result = resolveCdnUrl(
			'[External](https://example.com/file.pdf)',
			'validated-designs',
			'v0.0.x',
		)
		expect(result).toBe('[External](https://example.com/file.pdf)')
	})
})
