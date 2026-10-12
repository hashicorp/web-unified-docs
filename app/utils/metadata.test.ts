/**
 * Copyright (c) IBM Corp.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from '#types'
import { vol } from 'memfs'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const {
	watch,
	portalFetch,
	gatherVersionMetadata,
	gatherAllVersionsDocsPaths,
} = vi.hoisted(() => {
	return {
		watch: vi.fn(),
		portalFetch: vi.fn(),
		gatherVersionMetadata: vi.fn(),
		gatherAllVersionsDocsPaths: vi.fn(),
	}
})

vi.mock('node:fs', async () => {
	const { fs: memoryFs } = await import('memfs')
	return { default: { ...memoryFs, watch } }
})
vi.mock('../../scripts/prebuild/gather-version-metadata.mjs', () => {
	return { gatherVersionMetadata }
})
vi.mock('../../scripts/prebuild/gather-all-versions-docs-paths.mjs', () => {
	return { gatherAllVersionsDocsPaths }
})

const generatedMetadata: Metadata = {
	versionMetadata: {
		vault: [{ version: 'v1.21.x', releaseStage: 'stable', isLatest: true }],
	},
	docsPathsAllVersions: {
		vault: {
			'v1.21.x': [
				{
					path: 'vault/docs',
					itemPath: 'content/vault/v1.21.x/docs/index.mdx',
					created_at: '2026-01-01',
					last_modified: null,
				},
			],
		},
	},
}

const twoProductsMetadata: Metadata = {
	versionMetadata: {
		...generatedMetadata.versionMetadata,
		consul: [{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true }],
	},
	docsPathsAllVersions: {
		...generatedMetadata.docsPathsAllVersions,
		consul: { 'v1.22.x': [] },
	},
}

function mockMetadata(metadata: Metadata): void {
	gatherVersionMetadata.mockImplementation(
		async (_directory: string, products?: string[]) => {
			return Object.fromEntries(
				Object.entries(metadata.versionMetadata).filter(
					([product]: [string, Metadata['versionMetadata'][string]]) => {
						return products === undefined || products.includes(product)
					},
				),
			)
		},
	)
	gatherAllVersionsDocsPaths.mockImplementation(
		async (_versions: unknown, _realDates: boolean, products: string[]) => {
			return Object.fromEntries(
				Object.entries(metadata.docsPathsAllVersions).filter(
					([product]: [string, Metadata['docsPathsAllVersions'][string]]) => {
						return products.includes(product)
					},
				),
			)
		},
	)
}

const contentDir = path.join(process.cwd(), 'content')
const versionMetadataFile = path.join(
	process.cwd(),
	'app/api/versionMetadata.json',
)
const docsPathsAllVersionsFile = path.join(
	process.cwd(),
	'app/api/docsPathsAllVersions.json',
)
const relativeFile = 'vault/v1.21.x/docs/index.mdx'
const sourceFile = path.join(contentDir, relativeFile)

function writeGeneratedMetadataFiles(
	metadata: Metadata = generatedMetadata,
): void {
	vol.writeFileSync(
		versionMetadataFile,
		JSON.stringify(metadata.versionMetadata),
	)
	vol.writeFileSync(
		docsPathsAllVersionsFile,
		JSON.stringify(metadata.docsPathsAllVersions),
	)
}

let onChange: (eventType: string, filename: string | null) => void

beforeEach(() => {
	vi.resetModules()
	vi.resetAllMocks()
	vol.reset()
	vi.spyOn(fs.promises, 'writeFile').mockResolvedValue(undefined)
	vol.fromJSON({ [relativeFile]: '# Original' }, contentDir)
	vol.mkdirSync(path.dirname(versionMetadataFile), { recursive: true })
	delete (globalThis as any).__incBuildsMetadataCache
	vi.stubEnv('NODE_ENV', 'development')
	vi.stubEnv('INCREMENTAL_BUILD', 'true')
	vi.stubEnv('VERCEL_ENV', '')
	vi.stubEnv('DEV_PORTAL_URL', 'https://portal.example')
	vi.stubGlobal('fetch', portalFetch)
	portalFetch.mockResolvedValue({ ok: true })
	watch.mockImplementation(
		(_directory: string, _options: unknown, callback: typeof onChange) => {
			onChange = callback
			return {}
		},
	)
	gatherVersionMetadata.mockResolvedValue(generatedMetadata.versionMetadata)
	gatherAllVersionsDocsPaths.mockResolvedValue(
		generatedMetadata.docsPathsAllVersions,
	)
})

afterEach(() => {
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
	vi.unstubAllEnvs()
	delete (globalThis as any).__incBuildsMetadataCache
})

describe('getMetadata', () => {
	test.each([
		['production', 'true', 'production'],
		['development', 'true', 'preview'],
		['development', 'false', ''],
		['test', 'true', ''],
	])(
		'uses JSON for NODE_ENV=%s, INCREMENTAL_BUILD=%s, VERCEL_ENV=%s',
		async (nodeEnv: string, incremental: string, vercelEnv: string) => {
			vi.stubEnv('NODE_ENV', nodeEnv)
			vi.stubEnv('INCREMENTAL_BUILD', incremental)
			vi.stubEnv('VERCEL_ENV', vercelEnv)
			writeGeneratedMetadataFiles()
			const { getMetadata } = await import('./metadata')

			expect(await getMetadata()).toEqual(generatedMetadata)
			expect(watch).toHaveBeenCalledTimes(
				nodeEnv === 'development' &&
					incremental === 'true' &&
					vercelEnv !== 'preview'
					? 1
					: 0,
			)
			expect(gatherVersionMetadata).not.toHaveBeenCalled()
			expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
		},
	)

	test.each([
		['version metadata', versionMetadataFile],
		['all-version paths', docsPathsAllVersionsFile],
	])(
		'throws when %s JSON is missing outside incremental local development',
		async (_name: string, missingFile: string) => {
			vi.stubEnv('NODE_ENV', 'test')
			vi.stubEnv('INCREMENTAL_BUILD', 'false')
			writeGeneratedMetadataFiles()
			vol.unlinkSync(missingFile)

			const { getMetadata } = await import('./metadata')

			await expect(getMetadata()).rejects.toThrow(
				`Missing generated metadata file(s): ${missingFile}`,
			)
			expect(gatherVersionMetadata).not.toHaveBeenCalled()
			expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
		},
	)

	test('caches generated metadata outside incremental local development', async () => {
		vi.stubEnv('NODE_ENV', 'test')
		vi.stubEnv('INCREMENTAL_BUILD', 'false')
		writeGeneratedMetadataFiles()
		const { getMetadata } = await import('./metadata')

		const [first, second] = await Promise.all([getMetadata(), getMetadata()])

		expect(first).toEqual(second)
		expect(second).not.toBe(first)
		expect(second.versionMetadata).toBe(first.versionMetadata)
		expect(second.docsPathsAllVersions).toBe(first.docsPathsAllVersions)
		expect((globalThis as any).__incBuildsMetadataCache).toBeUndefined()
		expect(
			(globalThis as any).__unifiedDocsProductionMetadataCache,
		).toBeUndefined()
	})

	test('loads existing metadata files instead of generating metadata', async () => {
		writeGeneratedMetadataFiles()
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const { getMetadata } = await import('./metadata')

		const first = await getMetadata()
		expect(first).toEqual(generatedMetadata)
		expect(log).toHaveBeenCalledWith('[watcher] loading existing metadata')
		expect(gatherVersionMetadata).not.toHaveBeenCalled()
		expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
		expect(fs.promises.writeFile).not.toHaveBeenCalled()

		writeGeneratedMetadataFiles(twoProductsMetadata)
		expect(await getMetadata()).toBe(first)
		expect(first).toEqual(generatedMetadata)
	})

	test('starts the watcher on module load and generates one shared cache lazily', async () => {
		const { getMetadata } = await import('./metadata')
		expect(gatherVersionMetadata).not.toHaveBeenCalled()
		expect(watch).toHaveBeenCalledOnce()

		const [first, second] = await Promise.all([getMetadata(), getMetadata()])
		expect(first).toEqual(generatedMetadata)
		expect(second).toBe(first)
		expect(await getMetadata()).toBe(first)
		expect(watch).toHaveBeenCalledOnce()
		expect(watch).toHaveBeenCalledWith(
			expect.any(String),
			{ recursive: true, persistent: false },
			expect.any(Function),
		)
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
		expect(gatherAllVersionsDocsPaths).toHaveBeenCalledWith(
			generatedMetadata.versionMetadata,
			false,
			Object.keys(generatedMetadata.versionMetadata),
			{ verbose: false },
		)
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			versionMetadataFile,
			JSON.stringify(generatedMetadata.versionMetadata, null, 2),
		)
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			docsPathsAllVersionsFile,
			JSON.stringify(generatedMetadata.docsPathsAllVersions, null, 2),
		)
		expect(
			(globalThis as any).__unifiedDocsProductionMetadataCache,
		).toBeUndefined()
	})

	test('refreshes the Dev Portal and logs changed files', async () => {
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		portalFetch.mockRejectedValueOnce(new Error('Refresh failed'))
		vol.writeFileSync(sourceFile, '# Edited')
		onChange('change', relativeFile)

		await vi.waitFor(() => {
			expect(portalFetch).toHaveBeenCalledWith(
				'https://portal.example/api/refresh',
				{ method: 'POST' },
			)
			expect(logError).toHaveBeenCalledWith(
				'[watcher] failed to refresh Dev Portal',
				expect.objectContaining({ message: 'Refresh failed' }),
			)
		})
		expect(log).toHaveBeenCalledWith(`[watcher] reloading ${sourceFile}`)
		expect(await getMetadata()).toBe(first)
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
	})

	test('shares the cache after consumers reload', async () => {
		const firstModule = await import('./metadata')
		const first = await firstModule.getMetadata()
		vi.resetModules()
		const secondModule = await import('./metadata')
		expect(await secondModule.getMetadata()).toBe(first)
		expect(watch).toHaveBeenCalledOnce()
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
	})

	test('replaces a watcher retained from the previous cache shape', async () => {
		const close = vi.fn()
		;(globalThis as any).__incBuildsMetadataCache = {
			promise: Promise.resolve(generatedMetadata),
			watcher: { close },
		}
		const { getMetadata } = await import('./metadata')
		expect(await getMetadata()).toBe(generatedMetadata)
		expect(close).toHaveBeenCalledOnce()
		expect(watch).toHaveBeenCalledOnce()
		vol.writeFileSync(sourceFile, '# Edited')
		onChange('change', relativeFile)
		expect(await getMetadata()).toBe(generatedMetadata)
		expect(gatherVersionMetadata).not.toHaveBeenCalled()
	})

	test('regenerates structural changes in the background before the next request', async () => {
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		await vi.waitFor(() => {
			expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		})
		expect(log).toHaveBeenCalledWith('[watcher] reloading vault metadata')
		const second = await getMetadata()
		expect(second).toBe(first)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
		])

		vol.unlinkSync(path.join(contentDir, addedFile))
		onChange('rename', null)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
	})

	test('checks and regenerates only the changed product, preserving other products', async () => {
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		writeGeneratedMetadataFiles(twoProductsMetadata)
		mockMetadata(twoProductsMetadata)
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		const readdir = vi.spyOn(fs, 'readdirSync')
		const updatedMetadata: Metadata = {
			versionMetadata: {
				...twoProductsMetadata.versionMetadata,
				vault: [{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true }],
			},
			docsPathsAllVersions: {
				...twoProductsMetadata.docsPathsAllVersions,
				vault: { 'v1.22.x': [] },
			},
		}
		mockMetadata(updatedMetadata)
		vol.mkdirSync(path.join(contentDir, 'vault/v1.22.x'))
		onChange('rename', 'vault/v1.22.x')
		const second = await getMetadata()

		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
		])
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			versionMetadataFile,
			JSON.stringify(updatedMetadata.versionMetadata, null, 2),
		)
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			docsPathsAllVersionsFile,
			JSON.stringify(updatedMetadata.docsPathsAllVersions, null, 2),
		)
		expect(gatherAllVersionsDocsPaths).toHaveBeenLastCalledWith(
			{ vault: updatedMetadata.versionMetadata.vault },
			false,
			['vault'],
			{ verbose: false },
		)
		expect(readdir).toHaveBeenCalledWith(path.join(contentDir, 'vault'), {
			recursive: true,
		})
		expect(readdir).not.toHaveBeenCalledWith(
			path.join(contentDir, 'consul'),
			expect.anything(),
		)
		expect(second).toEqual(updatedMetadata)
		expect(second).toBe(first)
		expect(second.versionMetadata.consul).toBe(first.versionMetadata.consul)
		expect(second.docsPathsAllVersions.consul).toBe(
			first.docsPathsAllVersions.consul,
		)
	})

	test('does not wait for updated metadata files to be written', async () => {
		writeGeneratedMetadataFiles()
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const updatedMetadata: Metadata = {
			versionMetadata: {
				vault: [{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true }],
			},
			docsPathsAllVersions: { vault: { 'v1.22.x': [] } },
		}
		mockMetadata(updatedMetadata)
		let finishWrites: () => void = () => {}
		const writesPending = new Promise<void>((resolve: () => void) => {
			finishWrites = resolve
		})
		const writeFile = vi.mocked(fs.promises.writeFile)
		writeFile.mockReturnValue(writesPending)
		vol.mkdirSync(path.join(contentDir, 'vault/v1.22.x'))
		onChange('rename', 'vault/v1.22.x')

		const metadata = await getMetadata()
		await vi.waitFor(() => {
			expect(writeFile).toHaveBeenCalledTimes(2)
		})
		expect(metadata.versionMetadata.vault).toEqual(
			updatedMetadata.versionMetadata.vault,
		)
		finishWrites()
	})

	test('waits for a background rebuild before resolving concurrent requests', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		let finish: (value: Metadata['docsPathsAllVersions']) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise<Metadata['docsPathsAllVersions']>(
				(resolve: typeof finish) => {
					finish = resolve
				},
			)
		})
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledTimes(2)
		})
		const resolved = vi.fn()
		const first = getMetadata().then(resolved)
		const second = getMetadata()
		await Promise.resolve()
		expect(resolved).not.toHaveBeenCalled()

		finish(generatedMetadata.docsPathsAllVersions)
		const metadata = await second
		await first
		expect(resolved).toHaveBeenCalledWith(metadata)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})

	test('coalesces changes to multiple products into one scoped rebuild', async () => {
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		mockMetadata(twoProductsMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		for (const product of ['vault', 'consul']) {
			const addedDir = `${product}/new-directory`
			vol.mkdirSync(path.join(contentDir, addedDir))
			onChange('rename', addedDir)
			onChange('rename', addedDir)
		}
		expect(await getMetadata()).toEqual(twoProductsMetadata)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
			'consul',
		])
	})

	test('identifies only changed products when the watcher supplies no filename', async () => {
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		mockMetadata(twoProductsMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		vol.mkdirSync(path.join(contentDir, 'vault/new-directory'))
		onChange('rename', null)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
		])
	})

	test('adds product metadata without rebuilding existing products', async () => {
		mockMetadata(generatedMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		mockMetadata(twoProductsMetadata)
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		onChange('rename', 'consul')
		expect(await getMetadata()).toEqual(twoProductsMetadata)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'consul',
		])
	})

	test('ignores changes outside configured product folders', async () => {
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		vol.fromJSON({ 'unconfigured/docs/index.mdx': '# Other' }, contentDir)
		onChange('rename', 'unconfigured/docs/index.mdx')
		expect(await getMetadata()).toBe(first)
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
	})

	test.each([
		['change', relativeFile],
		['rename', relativeFile],
		['change', null],
		['rename', null],
	])(
		'ignores edited saves reported as %s with filename %s',
		async (eventType: string, filename: string | null) => {
			const { getMetadata } = await import('./metadata')
			const first = await getMetadata()
			vol.writeFileSync(sourceFile, '# Edited')
			onChange(eventType, filename)
			onChange(eventType, filename)
			expect(await getMetadata()).toBe(first)
			expect(gatherVersionMetadata).toHaveBeenCalledOnce()
		},
	)

	test('ignores an atomic save even when the contents change', async () => {
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		vol.unlinkSync(sourceFile)
		onChange('rename', relativeFile)
		vol.writeFileSync(sourceFile, '# Edited')
		onChange('rename', relativeFile)
		expect(await getMetadata()).toBe(first)
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
	})

	test('invalidates file additions, renames, removals, and empty directory additions', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)

		const renamedFile = 'vault/v1.21.x/docs/renamed.mdx'
		vol.renameSync(
			path.join(contentDir, addedFile),
			path.join(contentDir, renamedFile),
		)
		onChange('rename', addedFile)
		onChange('rename', renamedFile)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)

		vol.unlinkSync(path.join(contentDir, renamedFile))
		onChange('rename', renamedFile)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(4)

		vol.mkdirSync(path.join(contentDir, 'vault/v1.22.x'))
		onChange('rename', 'vault/v1.22.x')
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(5)
	})

	test.each(['change', 'add', 'delete'])(
		'reloads on file additions and removals reported as %s',
		async (eventType: string) => {
			const { getMetadata } = await import('./metadata')
			const first = await getMetadata()
			const addedFile = 'vault/v1.21.x/docs/new.mdx'

			vol.writeFileSync(path.join(contentDir, addedFile), '# New')
			onChange(eventType, addedFile)
			const added = await getMetadata()
			expect(added).toBe(first)
			expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)

			vol.unlinkSync(path.join(contentDir, addedFile))
			onChange(eventType, addedFile)
			const removed = await getMetadata()
			expect(removed).toBe(added)
			expect(removed).toEqual(generatedMetadata)
			expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
		},
	)

	test('retries after failed generation', async () => {
		gatherAllVersionsDocsPaths.mockRejectedValueOnce(
			new Error('Generation failed'),
		)
		const { getMetadata } = await import('./metadata')
		await expect(getMetadata()).rejects.toThrow('Generation failed')
		expect(await getMetadata()).toEqual(generatedMetadata)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})

	test.each([true, false])(
		'does not return a generation invalidated while in flight (new request: %s)',
		async (startNewRequest: boolean) => {
			let finish: (value: typeof generatedMetadata.docsPathsAllVersions) => void
			gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
				return new Promise<typeof generatedMetadata.docsPathsAllVersions>(
					(resolve: typeof finish) => {
						finish = resolve
					},
				)
			})
			const { getMetadata } = await import('./metadata')
			const pending = getMetadata()
			await vi.waitFor(() => {
				expect(gatherAllVersionsDocsPaths).toHaveBeenCalledOnce()
			})
			const addedFile = 'vault/v1.21.x/docs/new.mdx'
			vol.writeFileSync(path.join(contentDir, addedFile), '# New')
			onChange('rename', addedFile)
			const latest = startNewRequest ? getMetadata() : undefined
			finish(generatedMetadata.docsPathsAllVersions)
			const result = await pending
			if (startNewRequest) {
				expect(result).toBe(await latest)
			}
			expect(await getMetadata()).toBe(result)
			expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		},
	)

	test.each(['change', 'rename'])(
		'ignores saves reported as %s during generation',
		async (eventType: string) => {
			let finish: (value: typeof generatedMetadata.docsPathsAllVersions) => void
			gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
				return new Promise<typeof generatedMetadata.docsPathsAllVersions>(
					(resolve: typeof finish) => {
						finish = resolve
					},
				)
			})
			const { getMetadata } = await import('./metadata')
			const pending = getMetadata()
			await vi.waitFor(() => {
				expect(gatherAllVersionsDocsPaths).toHaveBeenCalledOnce()
			})
			vol.writeFileSync(sourceFile, '# Edited')
			onChange(eventType, relativeFile)
			finish(generatedMetadata.docsPathsAllVersions)
			const first = await pending
			expect(await getMetadata()).toBe(first)
			expect(gatherVersionMetadata).toHaveBeenCalledOnce()
		},
	)

	test('logs background failures, rejects waiting requests, and retries the affected product', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
		let fail: (error: Error) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise(
				(_resolve: (value: unknown) => void, reject: typeof fail) => {
					fail = reject
				},
			)
		})
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledTimes(2)
		})
		const rejected = expect(getMetadata()).rejects.toThrow('Generation failed')
		fail(new Error('Generation failed'))
		await rejected
		expect(logError).toHaveBeenCalledWith(
			'[watcher] failed to reload vault',
			expect.objectContaining({ message: 'Generation failed' }),
		)
		expect(await getMetadata()).toEqual(generatedMetadata)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
		])
	})

	test('drains changes arriving during a rebuild before resolving requests', async () => {
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		mockMetadata(twoProductsMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		let finish: (value: Metadata['docsPathsAllVersions']) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise<Metadata['docsPathsAllVersions']>(
				(resolve: typeof finish) => {
					finish = resolve
				},
			)
		})
		vol.mkdirSync(path.join(contentDir, 'vault/new-directory'))
		onChange('rename', 'vault/new-directory')
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledTimes(2)
		})
		const pending = getMetadata()
		vol.mkdirSync(path.join(contentDir, 'consul/new-directory'))
		onChange('rename', 'consul/new-directory')
		const concurrent = getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		finish({ vault: generatedMetadata.docsPathsAllVersions.vault })

		const result = await pending
		expect(result).toEqual(twoProductsMetadata)
		expect(await concurrent).toBe(result)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'consul',
		])
	})

	test('rebuilds the same product again when it changes during generation', async () => {
		mockMetadata(generatedMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		let finish: (value: Metadata['docsPathsAllVersions']) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise<Metadata['docsPathsAllVersions']>(
				(resolve: typeof finish) => {
					finish = resolve
				},
			)
		})
		vol.mkdirSync(path.join(contentDir, 'vault/new-directory'))
		onChange('rename', 'vault/new-directory')
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledTimes(2)
		})
		const pending = getMetadata()
		const updatedMetadata: Metadata = {
			versionMetadata: {
				vault: [{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true }],
			},
			docsPathsAllVersions: { vault: { 'v1.22.x': [] } },
		}
		mockMetadata(updatedMetadata)
		vol.mkdirSync(path.join(contentDir, 'vault/v1.22.x'))
		onChange('rename', 'vault/v1.22.x')
		finish(generatedMetadata.docsPathsAllVersions)

		expect(await pending).toEqual(updatedMetadata)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
		expect(gatherVersionMetadata).toHaveBeenNthCalledWith(2, contentDir, [
			'vault',
		])
		expect(gatherVersionMetadata).toHaveBeenNthCalledWith(3, contentDir, [
			'vault',
		])
	})
})
