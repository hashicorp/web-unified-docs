/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { getDocsPaths } from './allDocsPaths'
import docsPathsMock from '__fixtures__/docsPathsAllVersionsMock.json'
import { getProductVersionMetadata } from './contentVersions'
import { Ok } from '#utils/result'

// I tried to use the same import path as in the actual file
// (#utils/contentVersions) but Vitest was not picking up the mock,
// so I used a relative path instead... :(
vi.mock('./contentVersions', async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersionMetadata: vi.fn(),
	}
})

vi.mock('#api/versionMetadata.json', () => {
	return {
		default: {},
	}
})

vi.mock('#api/docsPathsAllVersions.json', () => {
	return {
		default: {},
	}
})

test('getDocsPaths should return an error for an empty productSlugs array', async () => {
	const response = await getDocsPaths([], docsPathsMock)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getDocsPaths should return an error if there are no paths for an empty productSlugs array', async () => {
	const response = await getDocsPaths([], {})
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getDocsPaths should return filtered docs paths when a non-empty productSlugs array is provided', async () => {
	const metadata = {
		version: 'v1.14.x',
		isLatest: false,
		releaseStage: 'stable',
	}

	vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(metadata))

	const response = await getDocsPaths(
		['terraform-plugin-framework'],
		docsPathsMock,
	)

	const mockValue = Object.values(
		docsPathsMock['terraform-plugin-framework']['v1.14.x'],
	).flat()
	expect(response).toEqual({ ok: true, value: mockValue })
})

test('getDocsPaths should return an error if there are no paths for a non-empty productSlugs array', async () => {
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	const response = await getDocsPaths(['terraform-plugin-framework'], {})
	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'Product, terraform-plugin-framework, version v1.14.x, not found in docs paths',
	)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})
