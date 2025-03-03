/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { expect, test, vi } from 'vitest'
import { getDocsPaths } from './allDocsPaths'
import docsPathsMock from '../../__fixtures__/docsPathsAllVersionsMock.json'

test('getDocsPaths should return an error for an empty productSlugs array', async () => {
	const response = await getDocsPaths([], docsPathsMock)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getDocsPaths should return an error if there are no paths for an empty productSlugs array', async () => {
	// @ts-expect-error - Testing error case
	const response = await getDocsPaths([], {})
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getDocsPaths should return filtered docs paths when a non-empty productSlugs array is provided', async () => {
	const response = await getDocsPaths(
		['terraform-plugin-framework'],
		docsPathsMock,
	)
	const mockValue = Object.values(
		docsPathsMock['terraform-plugin-framework']['v1.13.x'],
	).flat()
	expect(response).toEqual({ ok: true, value: mockValue })
})

test('getDocsPaths should return an error if there are no paths for a non-empty productSlugs array', async () => {
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	// @ts-expect-error - Testing error case
	const response = await getDocsPaths(['terraform-plugin-framework'], {})
	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'Product, terraform-plugin-framework, not found in docs paths',
	)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})
