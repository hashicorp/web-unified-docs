import { expect, test, vi } from 'vitest'
import { getDocsPaths } from './allDocsPaths'
import docsPathsMock from '../../__fixtures__/docsPaths.json'

test('getDocsPaths should return all docs paths for an empty productSlugs array', async () => {
	const response = await getDocsPaths([], docsPathsMock)
	expect(response).toEqual({
		ok: true,
		value: Object.values(docsPathsMock).flat(),
	})
})

test('getDocsPaths should return an error if there are no paths for an empty productSlugs array', async () => {
	const response = await getDocsPaths([], {})
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})

test('getDocsPaths should return filtered docs paths when a non-empty productSlugs array is provided', async () => {
	const response = await getDocsPaths(['terraform'], docsPathsMock)
	const mockValue = Object.values(docsPathsMock['terraform']).flat()
	expect(response).toEqual({ ok: true, value: mockValue })
})

test('getDocsPaths should return an error if there are no paths for a non-empty productSlugs array', async () => {
	const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})

	const response = await getDocsPaths(['terraform'], {})
	expect(mockConsole).toHaveBeenCalledOnce()
	expect(mockConsole).toHaveBeenLastCalledWith(
		'Product, terraform, not found in docs paths',
	)
	expect(response).toEqual({ ok: false, value: 'All docs paths not found' })
})
