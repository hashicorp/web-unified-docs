import { describe, it, expect, vi, afterEach } from 'vitest'
import { batchPostRecords } from './batch-post-records-to-algolia.mjs'
import algoliasearch from 'algoliasearch'
import path from 'path'
import fs from 'fs'

vi.mock('algoliasearch')

describe('batchPostRecords', () => {
	afterEach(() => {
		vi.resetAllMocks()
	})
	it('should read the records file and post records to Algolia', async () => {
		const mockAlgoliaClient = {
			initIndex: vi.fn().mockReturnValue({
				replaceAllObjects: vi.fn().mockResolvedValue({}),
			}),
		}
		algoliasearch.mockReturnValue(mockAlgoliaClient)
		const mockFile = path.join(
			process.cwd(),
			'scripts/algolia/batch-post-records/mockAlgoliaRecords.json',
		)

		process.env.ALGOLIA_API_KEY = 'fake_api_key'

		await batchPostRecords(mockFile)

		expect(algoliasearch).toHaveBeenCalledWith('YY0FFNI7MF', 'fake_api_key')
		expect(mockAlgoliaClient.initIndex).toHaveBeenCalledWith('spike_UDR')
		expect(
			mockAlgoliaClient.initIndex().replaceAllObjects,
		).toHaveBeenCalledWith(JSON.parse(fs.readFileSync(mockFile, 'utf-8')), {
			safe: true,
		})
	})

	it('should throw an error if posting records fails', async () => {
		const mockAlgoliaClient = {
			initIndex: vi.fn().mockReturnValue({
				replaceAllObjects: vi
					.fn()
					.mockRejectedValue(new Error('Algolia error')),
			}),
		}
		algoliasearch.mockReturnValue(mockAlgoliaClient)
		const mockFile = path.join(
			process.cwd(),
			'scripts/algolia/batch-post-records/mockAlgoliaRecords.json',
		)

		process.env.ALGOLIA_API_KEY = 'fake_api_key'

		try {
			await batchPostRecords(mockFile)
		} catch (e) {
			expect(e).toEqual(
				new Error('Failed to save objects: Error: Algolia error'),
			)
		}
	})
})
