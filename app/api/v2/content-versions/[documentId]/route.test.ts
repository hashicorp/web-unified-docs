import { it, beforeEach, describe, expect, afterEach, vi } from 'vitest'
import { GET, GetParams } from './route'
import { fs, vol } from 'memfs'

vi.mock('node:fs/promises', async () => {
	const memfs: { fs: typeof fs } = await vi.importActual('memfs')

	return memfs.fs.promises
})

describe('Content versions API v2', () => {
	let mockRequest: (params: GetParams) => ReturnType<typeof GET>
	beforeEach(() => {
		mockRequest = ({ id }: GetParams) => {
			const url = new URL(
				`http://localhost:8000/api/v2/content-versions?id=${id}`,
			)
			const req = new Request(url)
			return GET(req, { params: { id } })
		}
	})
	afterEach(() => {
		vi.restoreAllMocks()
		vol.reset()
	})
	it('throws a 400 error if document ID is missing', async () => {
		const response = await mockRequest({})

		expect(response.status).toBe(400)
		await expect(response.text()).resolves.toMatch(/document ID is required/i)
	})
	it('returns versions and paths where the requested document exists', async () => {
		const consulDocumentId = '123e4567-e89b-12d3-a456-426614174000'
		const vaultDocumentId = '25e6324f-5a4a-418a-892f-e8d0fecb02e4'

		vol.fromJSON({
			[`./app/api/docsPathsAllVersions.json`]: JSON.stringify({
				consul: {
					'v1.21.x': [
						{
							path: 'consul/docs/use-case/service-discovery',
							id: consulDocumentId,
						},
						{
							path: 'consul/docs/concepts/random-file',
						},
					],
					'v1.20.x': [
						{
							path: 'consul/docs/concepts/service-discovery',
							id: consulDocumentId,
						},
					],
				},
				vault: {
					'v0.11.x': [
						{
							path: 'vault/docs/path2',
							id: vaultDocumentId,
						},
					],
					'v0.10.x': [
						{
							path: 'vault/docs/path1',
							id: vaultDocumentId,
						},
					],
				},
			}),
		})

		const response = await mockRequest({ id: consulDocumentId })
		expect(response.status).toBe(200)
		await expect(response.json()).resolves.toEqual([
			['v1.21.x', 'consul/docs/use-case/service-discovery'],
			['v1.20.x', 'consul/docs/concepts/service-discovery'],
		])
	})
})
