import { vi, describe, it, expect, afterEach, beforeEach } from 'vitest'
import { buildFileMdxTransforms } from './build-mdx-transforms-file.mjs'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import versionMetadata from '../../__fixtures__/versionMetadata.json'

vi.mock(import('fs'), async (importOriginal) => {
	const mod = await importOriginal()
	return {
		...mod,
		readFileSync: vi.fn(),
		writeFileSync: vi.fn(),
		mkdirSync: vi.fn().mockImplementation((dir) => {
			return dir.split('/')[0]
		}),
		existsSync: vi.fn(),
	}
})

const mdxContent = `
---
title: Hello World
description: A lengthy description
---
# Hello World

Hello from the world`.trim()

describe('buildFileMdxTransforms', () => {
	let error
	beforeEach(() => {
		// spy on error and logging so that we can examine their calls
		error = vi.spyOn(console, 'error').mockImplementation(() => {})
	})
	afterEach(() => {
		error.mockReset()
	})
	it('applies the MDX transform chain to the file specified', async () => {
		const contentPath = '/content/terraform/v1.19.x/test.mdx'
		vi.mocked(existsSync).mockReturnValueOnce(true)
		vi.mocked(readFileSync)
			.mockReturnValueOnce(JSON.stringify(versionMetadata))
			.mockReturnValueOnce(mdxContent)
		await buildFileMdxTransforms(contentPath)

		expect(error).not.toHaveBeenCalled()
		expect(writeFileSync.mock.calls[0][0]).toMatch(contentPath)
		expect(writeFileSync.mock.calls[0][1].trim()).toEqual(mdxContent)
	})
	it('reports an error when trying to transform nonexistent files', async () => {
		const contentPath = '/content/terraform/missing-file.mdx'
		vi.mocked(existsSync).mockReturnValueOnce(false)

		await buildFileMdxTransforms(contentPath)
		expect(error.mock.calls[0][0]).to.match(/unable to read/i)
	})
})
