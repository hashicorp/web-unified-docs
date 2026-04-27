/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

import { getFilesUsingPartial } from './get-files-using-partial.mjs'
import { getChangedContentFiles } from './get-changed-content-files.mjs'

const TERRAFORM_V1_14_PATH = 'content/terraform/v1.14.x'

vi.mock('node:child_process', () => {
	return {
		execSync: vi.fn(),
	}
})

vi.mock('node:fs', () => {
	return {
		writeFileSync: vi.fn(),
	}
})

vi.mock('./get-files-using-partial.mjs', () => {
	return {
		getFilesUsingPartial: vi.fn(),
	}
})

describe('getChangedContentFiles', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		delete process.env.BASE_SHA
		vi.spyOn(process, 'cwd').mockReturnValue('/mocked/path')
		vi.mocked(writeFileSync).mockImplementation(() => {
			return undefined
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('builds changed file groups from git diff and resolves partial usage', () => {
		vi.mocked(execSync).mockReturnValueOnce('merge-base-sha\n')
			.mockReturnValueOnce(`A\t${TERRAFORM_V1_14_PATH}/docs/new.mdx
M\t${TERRAFORM_V1_14_PATH}/docs/edited.mdx
D\t${TERRAFORM_V1_14_PATH}/docs/deleted.mdx
R100\t${TERRAFORM_V1_14_PATH}/docs/renamed-old.mdx\t${TERRAFORM_V1_14_PATH}/docs/renamed-new.mdx
C100\t${TERRAFORM_V1_14_PATH}/docs/source.mdx\t${TERRAFORM_V1_14_PATH}/docs/copied.mdx
M\t${TERRAFORM_V1_14_PATH}/docs/partials/beta.mdx
A\t${TERRAFORM_V1_14_PATH}/docs/partials/alpha.mdx`)

		vi.mocked(getFilesUsingPartial).mockImplementation(
			(partialPath: string) => {
				if (partialPath.endsWith('/partials/alpha.mdx')) {
					return [
						`${TERRAFORM_V1_14_PATH}/docs/alpha-consumer.mdx`,
						`${TERRAFORM_V1_14_PATH}/docs/new.mdx`,
					]
				}

				if (partialPath.endsWith('/partials/beta.mdx')) {
					return [
						`${TERRAFORM_V1_14_PATH}/docs/beta-consumer.mdx`,
						`${TERRAFORM_V1_14_PATH}/docs/edited.mdx`,
					]
				}

				return []
			},
		)

		const result = getChangedContentFiles()

		expect(execSync).toHaveBeenNthCalledWith(
			1,
			'git merge-base HEAD origin/main',
			{ encoding: 'utf-8' },
		)
		expect(execSync).toHaveBeenNthCalledWith(
			2,
			'git diff --name-status merge-base-sha HEAD -- content/',
			{ encoding: 'utf-8' },
		)

		expect(getFilesUsingPartial).toHaveBeenCalledTimes(2)
		expect(getFilesUsingPartial).toHaveBeenNthCalledWith(
			1,
			`${TERRAFORM_V1_14_PATH}/docs/partials/alpha.mdx`,
		)
		expect(getFilesUsingPartial).toHaveBeenNthCalledWith(
			2,
			`${TERRAFORM_V1_14_PATH}/docs/partials/beta.mdx`,
		)

		expect(result).toEqual({
			added: [
				`${TERRAFORM_V1_14_PATH}/docs/new.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/renamed-new.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/copied.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/partials/alpha.mdx`,
			],
			modified: [
				`${TERRAFORM_V1_14_PATH}/docs/edited.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/partials/beta.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/alpha-consumer.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/beta-consumer.mdx`,
			],
			removed: [
				`${TERRAFORM_V1_14_PATH}/docs/deleted.mdx`,
				`${TERRAFORM_V1_14_PATH}/docs/renamed-old.mdx`,
			],
		})

		expect(writeFileSync).toHaveBeenCalledWith(
			'/mocked/path/changedContentFiles.json',
			JSON.stringify(result, null, 2),
			{ encoding: 'utf-8' },
		)
	})

	it('uses BASE_SHA when present', () => {
		process.env.BASE_SHA = 'from-env'
		vi.mocked(execSync).mockReturnValue(
			`M\t${TERRAFORM_V1_14_PATH}/docs/index.mdx`,
		)
		vi.mocked(getFilesUsingPartial).mockReturnValue([])

		const result = getChangedContentFiles()

		expect(execSync).toHaveBeenCalledTimes(1)
		expect(execSync).toHaveBeenCalledWith(
			'git diff --name-status from-env HEAD -- content/',
			{ encoding: 'utf-8' },
		)
		expect(result).toEqual({
			added: [],
			modified: [`${TERRAFORM_V1_14_PATH}/docs/index.mdx`],
			removed: [],
		})
	})

	it('returns empty groups when there is no diff output', () => {
		process.env.BASE_SHA = 'from-env'
		vi.mocked(execSync).mockReturnValue('\n')

		const result = getChangedContentFiles()

		expect(getFilesUsingPartial).not.toHaveBeenCalled()
		expect(result).toEqual({ added: [], modified: [], removed: [] })
		expect(writeFileSync).toHaveBeenCalledTimes(1)
	})

	it('logs and exits when building changed files fails', () => {
		const error = new Error('git failed')
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		vi.mocked(execSync).mockImplementation(() => {
			throw error
		})

		vi.spyOn(process, 'exit').mockImplementation(
			(code?: string | number | null) => {
				throw new Error(`process.exit(${code})`)
			},
		)

		expect(() => {
			return getChangedContentFiles()
		}).toThrow('process.exit(1)')
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			'Error getting changed content files:',
			error,
		)
	})
})
