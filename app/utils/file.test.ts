/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi, beforeEach, afterEach, describe, it } from 'vitest'
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
			'validated-designs': { versionedDocs: false },
			'terraform-plugin-log': { versionedDocs: true },
		},
	}
})

vi.mock('fs/promises', () => {
	return {
		access: vi.fn(),
		readFile: vi.fn(),
	}
})

import { access, readFile } from 'node:fs/promises'

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
			vault: [{ version: 'v1.21.x', releaseStage: 'stable', isLatest: true }],
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
			{ exitOnError: false },
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
		[
			FileType.NavData,
			'content/vault/v1.21.x/data/docs-nav-data.json',
			'application/json; charset=utf-8',
		],
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
			'content/vault/v1.21.x/data/docs-nav-data.json',
		],
		[
			FileType.Redirects,
			'content/vault/v1.21.x/redirects.jsonc',
			'content/vault/v1.21.x/redirects.jsonc',
		],
		[
			FileType.Asset,
			'asset/vault/v1.21.x/img/logo.png',
			'content/vault/v1.21.x/img/logo.png',
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
				expect(access).toHaveBeenCalledWith(markdownPath)
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

	test('returns Err when metadata cannot be loaded for a local Markdown transform', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		getMetadata.mockRejectedValueOnce(new Error('Metadata unavailable'))

		expect(await fetchFile(markdownPath, FileType.Markdown)).toEqual({
			ok: false,
			value: `Failed to read local file at path: ${markdownPath}, error: Error: Metadata unavailable`,
		})
		expect(readFile).not.toHaveBeenCalled()
		expect(buildMdxTransforms).not.toHaveBeenCalled()
		expect(fetch).not.toHaveBeenCalled()
	})

	test('returns Err when the transformed Markdown output cannot be read', async () => {
		const { fetchFile } = await loadFileModuleWithEnv(localEnv)
		vi.mocked(readFile).mockRejectedValueOnce(new Error('ENOENT'))

		expect(await fetchFile(markdownPath, FileType.Markdown)).toEqual({
			ok: false,
			value: `Failed to read local file at path: ${outputPath}`,
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
