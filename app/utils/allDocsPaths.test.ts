/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { getDocsPaths } from './allDocsPaths'
import docsPathsMock from '__fixtures__/docsPathsAllVersionsMock.json'
import { getProductVersionMetadata } from '@utils/contentVersions'
import { Ok } from '@utils/result'

vi.mock(import('@utils/contentVersions'), async (importOriginal: any) => {
	const mod = await importOriginal()
	return {
		...mod,
		getProductVersionMetadata: vi.fn(),
	}
})

vi.mock('@api/versionMetadata.json', () => {
	return {
		default: {},
	}
})

vi.mock('@api/docsPathsAllVersions.json', () => {
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
	// Some real(ish) data for version
	const version = 'v1.14.x'
	vi.mocked(getProductVersionMetadata).mockReturnValue(Ok(version))

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
		'Product, terraform-plugin-framework, not found in docs paths',
	)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})
