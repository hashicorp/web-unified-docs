import path from 'node:path'
import { vol } from 'memfs'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const { watch, gatherVersionMetadata, gatherAllVersionsDocsPaths } = vi.hoisted(
	() => {
		return {
			watch: vi.fn(),
			gatherVersionMetadata: vi.fn(),
			gatherAllVersionsDocsPaths: vi.fn(),
		}
	},
)

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

const generatedMetadata = {
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
				},
			],
		},
	},
}

const contentDir = path.join(process.cwd(), 'content')
const relativeFile = 'vault/v1.21.x/docs/index.mdx'
const sourceFile = path.join(contentDir, relativeFile)

let onChange: (eventType: string, filename: string | null) => void

beforeEach(() => {
	vi.resetModules()
	vi.resetAllMocks()
	vol.reset()
	vol.fromJSON({ [relativeFile]: '# Original' }, contentDir)
	delete (globalThis as any).__unifiedDocsMetadataCache
	vi.stubEnv('NODE_ENV', 'development')
	vi.stubEnv('INCREMENTAL_BUILD', 'true')
	vi.stubEnv('VERCEL_ENV', '')
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
	vi.unstubAllEnvs()
	delete (globalThis as any).__unifiedDocsMetadataCache
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
			const { getMetadata } = await import('./metadata')
			const versions = await import('#api/versionMetadata.json')
			const paths = await import('#api/docsPathsAllVersions.json')

			expect(await getMetadata()).toEqual({
				versionMetadata: versions.default,
				docsPathsAllVersions: paths.default,
			})
			expect(watch).not.toHaveBeenCalled()
			expect(gatherVersionMetadata).not.toHaveBeenCalled()
			expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
		},
	)

	test('generates lazily and shares one cached result across concurrent requests', async () => {
		const { getMetadata } = await import('./metadata')
		expect(gatherVersionMetadata).not.toHaveBeenCalled()
		expect(watch).not.toHaveBeenCalled()

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
		)
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
		;(globalThis as any).__unifiedDocsMetadataCache = {
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

	test('invalidates structural changes reported as rename and regenerates on the next request', async () => {
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()
		const second = await getMetadata()
		expect(second).not.toBe(first)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)

		vol.unlinkSync(path.join(contentDir, addedFile))
		onChange('rename', null)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(3)
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
			const latest = startNewRequest ? await getMetadata() : undefined
			finish(generatedMetadata.docsPathsAllVersions)
			const result = await pending
			if (startNewRequest) {
				expect(result).toBe(latest)
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

	test('does not evict a newer generation when an invalidated one fails', async () => {
		let fail: (error: Error) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise(
				(_resolve: (value: unknown) => void, reject: typeof fail) => {
					fail = reject
				},
			)
		})
		const { getMetadata } = await import('./metadata')
		const pending = getMetadata()
		const rejected = expect(pending).rejects.toThrow('Generation failed')
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledOnce()
		})
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('rename', addedFile)
		const latest = await getMetadata()
		fail(new Error('Generation failed'))
		await rejected
		expect(await getMetadata()).toBe(latest)
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})
})
