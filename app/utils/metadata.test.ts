/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import { EventEmitter } from 'node:events'
import path from 'node:path'
import type { Metadata } from '#types'
import { vol } from 'memfs'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const {
	watch,
	portalFetch,
	gatherVersionMetadata,
	gatherAllVersionsDocsPaths,
	metadataWorker,
} = vi.hoisted(() => {
	return {
		watch: vi.fn(),
		portalFetch: vi.fn(),
		gatherVersionMetadata: vi.fn(),
		gatherAllVersionsDocsPaths: vi.fn(),
		metadataWorker: vi.fn(),
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
vi.mock('node:worker_threads', () => {
	return { Worker: metadataWorker }
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

const twoVersionsMetadata: Metadata = {
	versionMetadata: {
		vault: [
			{ version: 'v1.22.x', releaseStage: 'stable', isLatest: true },
			{ ...generatedMetadata.versionMetadata.vault[0], isLatest: false },
		],
	},
	docsPathsAllVersions: {
		vault: {
			...generatedMetadata.docsPathsAllVersions.vault,
			'v1.22.x': [
				{
					...generatedMetadata.docsPathsAllVersions.vault['v1.21.x'][0],
					itemPath: 'content/vault/v1.22.x/docs/index.mdx',
				},
			],
		},
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

function holdStartupCheck(): EventEmitter {
	const worker = new EventEmitter()
	metadataWorker.mockReturnValue(worker)
	return worker
}

async function waitForStartupCheck(): Promise<void> {
	const globals = globalThis as typeof globalThis & {
		__incBuildsMetadataCache?: { promise?: Promise<Metadata> }
	}
	await globals.__incBuildsMetadataCache?.promise
}

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
	metadataWorker.mockImplementation(() => {
		const worker = new EventEmitter()
		setImmediate(() => {
			worker.emit('message', { changed: false })
		})
		return worker
	})
})

afterEach(async () => {
	await waitForStartupCheck()
	vi.doUnmock('./incBuildsMetadata')
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
	vi.unstubAllEnvs()
	delete (globalThis as any).__incBuildsMetadataCache
})

describe('getMetadata', () => {
	test.each([
		['production', 'true', 'production'],
		['incremental preview', 'true', 'preview'],
		['full build', 'false', ''],
	])(
		'does not load development-only metadata code in %s',
		async (_scenario: string, incremental: string, vercelEnv: string) => {
			vi.stubEnv('NODE_ENV', 'production')
			vi.stubEnv('INCREMENTAL_BUILD', incremental)
			vi.stubEnv('VERCEL_ENV', vercelEnv)
			vi.doMock('./incBuildsMetadata', () => {
				throw new Error('Development-only metadata module was loaded')
			})
			writeGeneratedMetadataFiles()

			const { getMetadata } = await import('./metadata')

			expect(await getMetadata()).toEqual(generatedMetadata)
			expect(watch).not.toHaveBeenCalled()
			expect(metadataWorker).not.toHaveBeenCalled()
		},
	)

	test.each([
		['prodBuild', 'production', 'true', 'production', 0],
		[
			'prodBuild overriding development mode',
			'development',
			'true',
			'production',
			0,
		],
		['incBuildPRPreview', 'production', 'true', '', 0],
		['incBuildLocalDev', 'development', 'true', '', 1],
		[
			'fullBuild with incremental builds disabled',
			'development',
			'false',
			'',
			0,
		],
		['fullBuild in the test environment', 'test', 'true', '', 0],
	])(
		'loads generated metadata for %s',
		async (
			_scenario: string,
			nodeEnv: string,
			incremental: string,
			vercelEnv: string,
			expectedWatchCalls: number,
		) => {
			vi.stubEnv('NODE_ENV', nodeEnv)
			vi.stubEnv('INCREMENTAL_BUILD', incremental)
			vi.stubEnv('VERCEL_ENV', vercelEnv)
			writeGeneratedMetadataFiles()
			const { getMetadata } = await import('./metadata')

			expect(await getMetadata()).toEqual(generatedMetadata)
			expect(watch).toHaveBeenCalledTimes(expectedWatchCalls)
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

	test('reports both missing generated metadata files', async () => {
		vi.stubEnv('NODE_ENV', 'production')
		const { getMetadata } = await import('./metadata')

		await expect(getMetadata()).rejects.toThrow(
			`Missing generated metadata file(s): ${versionMetadataFile}, ${docsPathsAllVersionsFile}. Run \`npm run prebuild\` to generate them.`,
		)
	})

	test('initializes metadata once at server startup before any metadata request', async () => {
		writeGeneratedMetadataFiles()
		vi.stubEnv('NEXT_RUNTIME', 'nodejs')
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const worker = holdStartupCheck()
		const { register } = await import('../../instrumentation')

		await register()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})
		expect(watch).toHaveBeenCalledOnce()
		expect(log).toHaveBeenCalledWith('[watcher] loading existing metadata')
		expect(log).toHaveBeenCalledWith(
			'[watcher] checking startup metadata in the background',
		)

		await register()
		const { getMetadata } = await import('./metadata')
		expect(await getMetadata()).toEqual(generatedMetadata)
		expect(watch).toHaveBeenCalledOnce()
		expect(metadataWorker).toHaveBeenCalledOnce()

		worker.emit('message', { changed: false })
		await waitForStartupCheck()
		expect(await getMetadata()).toEqual(generatedMetadata)
		for (const message of [
			'[watcher] loading existing metadata',
			'[watcher] checking startup metadata in the background',
			'[watcher] completed startup metadata check',
		]) {
			expect(
				log.mock.calls.filter(([entry]: [unknown]) => {
					return entry === message
				}),
			).toHaveLength(1)
		}
	})

	test.each([
		['production server', 'production', 'nodejs', 'true', ''],
		['edge runtime', 'development', 'edge', 'true', ''],
		['non-incremental development', 'development', 'nodejs', 'false', ''],
		['Vercel production', 'development', 'nodejs', 'true', 'production'],
	])(
		'does not initialize local metadata at startup in %s',
		async (
			_scenario: string,
			nodeEnv: string,
			runtime: string,
			incremental: string,
			vercelEnv: string,
		) => {
			vi.stubEnv('NODE_ENV', nodeEnv)
			vi.stubEnv('NEXT_RUNTIME', runtime)
			vi.stubEnv('INCREMENTAL_BUILD', incremental)
			vi.stubEnv('VERCEL_ENV', vercelEnv)
			vi.doMock('./incBuildsMetadata', () => {
				throw new Error('Development-only metadata module was loaded')
			})
			const { register } = await import('../../instrumentation')

			await register()

			expect(watch).not.toHaveBeenCalled()
			expect(metadataWorker).not.toHaveBeenCalled()
		},
	)

	test('does not initialize metadata during route-discovery imports', async () => {
		writeGeneratedMetadataFiles()
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const readFile = vi.spyOn(fs, 'readFileSync')

		await import('./metadata')
		await import('./incBuildsMetadata')

		expect(watch).not.toHaveBeenCalled()
		expect(readFile).not.toHaveBeenCalled()
		expect(metadataWorker).not.toHaveBeenCalled()
		expect(gatherVersionMetadata).not.toHaveBeenCalled()
		expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
		expect(log).not.toHaveBeenCalled()
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

	test('serves cached metadata while checking an offline version addition in the background', async () => {
		writeGeneratedMetadataFiles()
		vol.fromJSON(
			{ 'vault/v1.22.x/docs/index.mdx': '# New version' },
			contentDir,
		)
		const worker = holdStartupCheck()
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})

		expect(first).toEqual(generatedMetadata)
		expect(await getMetadata()).toBe(first)
		expect(portalFetch).not.toHaveBeenCalled()
		expect(fs.promises.writeFile).not.toHaveBeenCalled()

		worker.emit('message', { changed: true, metadata: twoVersionsMetadata })
		await waitForStartupCheck()

		expect(await getMetadata()).toEqual(twoVersionsMetadata)
		expect(portalFetch).toHaveBeenCalledOnce()
		expect(portalFetch).toHaveBeenCalledWith(
			'https://portal.example/api/refresh',
			{ method: 'POST' },
		)
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			versionMetadataFile,
			JSON.stringify(twoVersionsMetadata.versionMetadata, null, 2),
		)
		expect(fs.promises.writeFile).toHaveBeenCalledWith(
			docsPathsAllVersionsFile,
			JSON.stringify(twoVersionsMetadata.docsPathsAllVersions, null, 2),
		)
	})

	test('starts the background check on the first cached metadata request', async () => {
		writeGeneratedMetadataFiles()
		const worker = holdStartupCheck()
		const { getMetadata } = await import('./metadata')
		expect(watch).not.toHaveBeenCalled()
		expect(await getMetadata()).toEqual(generatedMetadata)
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})

		expect(metadataWorker).toHaveBeenCalledWith(
			path.join(process.cwd(), 'app/utils/incBuildsMetadataWorker.mjs'),
			{ workerData: { contentDir, metadata: generatedMetadata } },
		)
		worker.emit('message', { changed: false })
		await waitForStartupCheck()
		expect(portalFetch).not.toHaveBeenCalled()
		expect(fs.promises.writeFile).not.toHaveBeenCalled()
	})

	test('does not repeat the startup check after a development module reload', async () => {
		writeGeneratedMetadataFiles()
		const log = vi.spyOn(console, 'log').mockImplementation(() => {})
		const firstModule = await import('./metadata')
		const first = await firstModule.getMetadata()
		await waitForStartupCheck()
		vi.resetModules()
		const secondModule = await import('./metadata')

		expect(await secondModule.getMetadata()).toBe(first)
		expect(await secondModule.getMetadata()).toBe(first)
		expect(watch).toHaveBeenCalledOnce()
		expect(metadataWorker).toHaveBeenCalledOnce()
		expect(portalFetch).not.toHaveBeenCalled()
		for (const message of [
			'[watcher] loading existing metadata',
			'[watcher] checking startup metadata in the background',
			'[watcher] completed startup metadata check',
		]) {
			expect(
				log.mock.calls.filter(([entry]: [unknown]) => {
					return entry === message
				}),
			).toHaveLength(1)
		}
	})

	test('shares an in-flight startup check after consumers reload', async () => {
		writeGeneratedMetadataFiles()
		const worker = holdStartupCheck()
		const firstModule = await import('./metadata')
		const first = await firstModule.getMetadata()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})
		vi.resetModules()
		const secondModule = await import('./metadata')

		expect(await secondModule.getMetadata()).toBe(first)
		expect(metadataWorker).toHaveBeenCalledOnce()
		worker.emit('message', { changed: false })
		await waitForStartupCheck()
	})

	test('logs a failed startup check and retries without blocking cached responses', async () => {
		writeGeneratedMetadataFiles()
		const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
		const worker = holdStartupCheck()
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})
		const failedCheck = waitForStartupCheck()
		worker.emit('error', new Error('Startup check failed'))
		await expect(failedCheck).rejects.toThrow('Startup check failed')
		expect(logError).toHaveBeenCalledWith(
			'[watcher] failed to check startup metadata',
			expect.objectContaining({ message: 'Startup check failed' }),
		)
		expect(portalFetch).not.toHaveBeenCalled()

		const retryWorker = holdStartupCheck()
		expect(await getMetadata()).toBe(first)
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledTimes(2)
		})
		retryWorker.emit('message', {
			changed: true,
			metadata: twoVersionsMetadata,
		})
		await waitForStartupCheck()
		expect(await getMetadata()).toEqual(twoVersionsMetadata)
		expect(portalFetch).toHaveBeenCalledOnce()
	})

	test.each([0, 1])(
		'reports a startup worker exiting with code %i without a result',
		async (code: number) => {
			writeGeneratedMetadataFiles()
			const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
			const worker = holdStartupCheck()
			const { getMetadata } = await import('./metadata')
			expect(await getMetadata()).toEqual(generatedMetadata)
			await vi.waitFor(() => {
				expect(metadataWorker).toHaveBeenCalledOnce()
			})
			const pending = waitForStartupCheck()
			worker.emit('exit', code)

			await expect(pending).rejects.toThrow(
				`Startup metadata worker exited without a result (code ${code})`,
			)
			expect(logError).toHaveBeenCalledWith(
				'[watcher] failed to check startup metadata',
				expect.any(Error),
			)
			expect(portalFetch).not.toHaveBeenCalled()
		},
	)

	test('logs an unsuccessful completion refresh without discarding updated metadata', async () => {
		writeGeneratedMetadataFiles()
		const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
		const worker = holdStartupCheck()
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})
		portalFetch.mockResolvedValueOnce({ ok: false, status: 503 })
		worker.emit('message', { changed: true, metadata: twoVersionsMetadata })
		await waitForStartupCheck()

		await vi.waitFor(() => {
			expect(logError).toHaveBeenCalledWith(
				'[watcher] failed to refresh Dev Portal',
				expect.objectContaining({
					message: 'Dev Portal refresh returned HTTP 503',
				}),
			)
		})
		expect(await getMetadata()).toEqual(twoVersionsMetadata)
		expect(metadataWorker).toHaveBeenCalledOnce()
		expect(portalFetch).toHaveBeenCalledOnce()
	})

	test('drains structural changes during the startup check before its completion refresh', async () => {
		writeGeneratedMetadataFiles()
		const worker = holdStartupCheck()
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		await vi.waitFor(() => {
			expect(metadataWorker).toHaveBeenCalledOnce()
		})
		mockMetadata(twoVersionsMetadata)
		let finish: (value: Metadata['docsPathsAllVersions']) => void
		gatherAllVersionsDocsPaths.mockImplementationOnce(() => {
			return new Promise<Metadata['docsPathsAllVersions']>(
				(resolve: typeof finish) => {
					finish = resolve
				},
			)
		})
		const addedFile = 'vault/v1.22.x/docs/index.mdx'
		vol.fromJSON({ [addedFile]: '# New version' }, contentDir)
		onChange('rename', addedFile)
		const resolved = vi.fn()
		const pending = getMetadata().then(resolved)
		worker.emit('message', { changed: false })
		await vi.waitFor(() => {
			expect(gatherAllVersionsDocsPaths).toHaveBeenCalledOnce()
		})

		expect(resolved).not.toHaveBeenCalled()
		expect(portalFetch).not.toHaveBeenCalled()
		const lateResolved = vi.fn()
		const lateRequest = getMetadata().then(lateResolved)
		await new Promise<void>((resolve: () => void) => {
			setImmediate(resolve)
		})
		const resolvedDuringRebuild = lateResolved.mock.calls.length > 0
		finish(twoVersionsMetadata.docsPathsAllVersions)
		await Promise.all([pending, lateRequest])

		expect(resolvedDuringRebuild).toBe(false)
		expect(await getMetadata()).toEqual(twoVersionsMetadata)
		expect(portalFetch).toHaveBeenCalledTimes(2)
		expect(metadataWorker).toHaveBeenCalledOnce()
	})

	describe('existing metadata freshness', () => {
		const oneHourMs = 60 * 60 * 1000
		const metadataFiles = [versionMetadataFile, docsPathsAllVersionsFile]

		function setFileAge(files: string[], ageMs: number): void {
			const now = Date.now()
			vi.spyOn(Date, 'now').mockReturnValue(now)
			const modifiedAt = new Date(now - ageMs)
			for (const file of files) {
				vol.utimesSync(file, modifiedAt, modifiedAt)
			}
		}

		test.each([oneHourMs - 1, oneHourMs, oneHourMs + 1])(
			'reuses existing metadata that is %i milliseconds old',
			async (ageMs: number) => {
				writeGeneratedMetadataFiles()
				setFileAge(metadataFiles, ageMs)
				const { getMetadata } = await import('./metadata')

				expect(await getMetadata()).toEqual(generatedMetadata)
				expect(gatherVersionMetadata).not.toHaveBeenCalled()
				expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
				expect(fs.promises.writeFile).not.toHaveBeenCalled()
			},
		)

		test.each([
			['version metadata', [versionMetadataFile]],
			['all-version paths', [docsPathsAllVersionsFile]],
			['both metadata files', metadataFiles],
		])(
			'serves old %s immediately and refreshes it after the startup check',
			async (_name: string, staleFiles: string[]) => {
				writeGeneratedMetadataFiles(twoProductsMetadata)
				setFileAge(staleFiles, oneHourMs + 1)
				const worker = holdStartupCheck()
				const { getMetadata } = await import('./metadata')

				const [first, second] = await Promise.all([
					getMetadata(),
					getMetadata(),
				])

				expect(first).toEqual(twoProductsMetadata)
				expect(second).toBe(first)
				expect(fs.promises.writeFile).not.toHaveBeenCalled()
				await vi.waitFor(() => {
					expect(metadataWorker).toHaveBeenCalledOnce()
				})
				worker.emit('message', { changed: true, metadata: generatedMetadata })
				await waitForStartupCheck()
				expect(await getMetadata()).toEqual(generatedMetadata)
				expect(portalFetch).toHaveBeenCalledOnce()
				for (const [file, metadata] of [
					[versionMetadataFile, generatedMetadata.versionMetadata],
					[docsPathsAllVersionsFile, generatedMetadata.docsPathsAllVersions],
				]) {
					expect(fs.promises.writeFile).toHaveBeenCalledWith(
						file,
						JSON.stringify(metadata, null, 2),
					)
				}
			},
		)

		test.each([
			['production', 'production', 'true', 'production'],
			['incremental preview', 'production', 'true', 'preview'],
			['full build', 'development', 'false', ''],
		])(
			'does not expire generated metadata during %s',
			async (
				_name: string,
				nodeEnv: string,
				incremental: string,
				vercelEnv: string,
			) => {
				vi.stubEnv('NODE_ENV', nodeEnv)
				vi.stubEnv('INCREMENTAL_BUILD', incremental)
				vi.stubEnv('VERCEL_ENV', vercelEnv)
				writeGeneratedMetadataFiles(twoProductsMetadata)
				setFileAge(metadataFiles, oneHourMs + 1)
				const { getMetadata } = await import('./metadata')

				expect(await getMetadata()).toEqual(twoProductsMetadata)
				expect(watch).not.toHaveBeenCalled()
				expect(gatherVersionMetadata).not.toHaveBeenCalled()
				expect(gatherAllVersionsDocsPaths).not.toHaveBeenCalled()
			},
		)
	})

	test('starts one watcher on the first metadata request', async () => {
		const { getMetadata } = await import('./metadata')
		expect(watch).not.toHaveBeenCalled()
		expect(gatherVersionMetadata).not.toHaveBeenCalled()

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
			const readdir = vi.spyOn(fs, 'readdirSync')
			const stat = vi.spyOn(fs, 'statSync')
			vol.writeFileSync(sourceFile, '# Edited')
			onChange(eventType, filename)
			onChange(eventType, filename)
			expect(await getMetadata()).toBe(first)
			expect(gatherVersionMetadata).toHaveBeenCalledOnce()
			expect(portalFetch).toHaveBeenCalledTimes(2)
			if (eventType === 'change') {
				expect(readdir).not.toHaveBeenCalled()
				expect(stat).not.toHaveBeenCalled()
			} else {
				expect(readdir).toHaveBeenCalledOnce()
			}
		},
	)

	test('checks directory rename events for nested file additions', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const readdir = vi.spyOn(fs, 'readdirSync')
		vol.writeFileSync(
			path.join(contentDir, 'vault/v1.21.x/docs/new.mdx'),
			'# New',
		)
		onChange('rename', 'vault/v1.21.x/docs')

		await getMetadata()
		expect(readdir).toHaveBeenCalledOnce()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})

	test('waits for a rename event to detect a deleted file', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		vol.unlinkSync(sourceFile)
		onChange('change', relativeFile)

		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()

		onChange('rename', relativeFile)
		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})

	test('waits for a rename event to detect a file addition reported first as change', async () => {
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		const readdir = vi.spyOn(fs, 'readdirSync')
		const addedFile = 'vault/v1.21.x/docs/new.mdx'
		vol.writeFileSync(path.join(contentDir, addedFile), '# New')
		onChange('change', addedFile)

		expect(await getMetadata()).toBe(first)
		expect(readdir).not.toHaveBeenCalled()
		expect(gatherVersionMetadata).toHaveBeenCalledOnce()

		onChange('rename', addedFile)
		await getMetadata()
		expect(readdir).toHaveBeenCalledOnce()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
	})

	test('does not inspect the filesystem on a file save', async () => {
		const { getMetadata } = await import('./metadata')
		const first = await getMetadata()
		const logError = vi.spyOn(console, 'error').mockImplementation(() => {})
		const readdir = vi.spyOn(fs, 'readdirSync')
		const stat = vi.spyOn(fs, 'statSync').mockImplementationOnce(() => {
			throw new Error('File inspection failed')
		})
		onChange('change', relativeFile)

		expect(await getMetadata()).toBe(first)
		expect(logError).not.toHaveBeenCalled()
		expect(readdir).not.toHaveBeenCalled()
		expect(stat).not.toHaveBeenCalled()
	})

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

	test('regenerates metadata when a file is moved within a product', async () => {
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const movedFile = 'vault/v1.21.x/docs/moved/index.mdx'
		vol.mkdirSync(path.dirname(path.join(contentDir, movedFile)), {
			recursive: true,
		})
		vol.renameSync(sourceFile, path.join(contentDir, movedFile))
		onChange('rename', relativeFile)
		onChange('rename', movedFile)

		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
		])
	})

	test('regenerates both products when a file is moved between products', async () => {
		vol.fromJSON({ 'consul/v1.22.x/docs/index.mdx': '# Consul' }, contentDir)
		mockMetadata(twoProductsMetadata)
		const { getMetadata } = await import('./metadata')
		await getMetadata()
		const movedFile = 'consul/v1.22.x/docs/moved.mdx'
		vol.renameSync(sourceFile, path.join(contentDir, movedFile))
		onChange('rename', relativeFile)
		onChange('rename', movedFile)

		await getMetadata()
		expect(gatherVersionMetadata).toHaveBeenCalledTimes(2)
		expect(gatherVersionMetadata).toHaveBeenLastCalledWith(contentDir, [
			'vault',
			'consul',
		])
	})

	test.each(['rename', 'add', 'delete'])(
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
