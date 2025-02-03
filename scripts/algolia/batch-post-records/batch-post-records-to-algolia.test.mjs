import { describe, it, expect, vi, afterEach } from 'vitest'
import { batchPostRecords } from './batch-post-records-to-algolia.mjs'
import algoliasearch from 'algoliasearch'
import path from 'path'
import fs from 'fs'

vi.mock('algoliasearch')

const mockFile = path.join(process.cwd(), '__fixtures__/algoliaRecords.json')

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

		process.env.ALGOLIA_API_KEY = 'fake_api_key'
		process.env.ALGOLIA_APP_ID = 'TEST_ID'
		process.env.ALGOLIA_INDEX_NAME = 'test_index'

		await batchPostRecords(mockFile)

		expect(algoliasearch).toHaveBeenCalledWith('TEST_ID', 'fake_api_key')
		expect(mockAlgoliaClient.initIndex).toHaveBeenCalledWith('test_index')
		expect(
			mockAlgoliaClient.initIndex().replaceAllObjects,
		).toHaveBeenCalledWith(JSON.parse(fs.readFileSync(mockFile)), {
			safe: true,
		})
		expect(
			mockAlgoliaClient.initIndex().replaceAllObjects,
		).toHaveBeenCalledOnce()
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

		process.env.ALGOLIA_API_KEY = 'fake_api_key'
		process.env.ALGOLIA_APP_ID = 'TEST_ID'
		process.env.ALGOLIA_INDEX_NAME = 'test_index'

		try {
			await batchPostRecords(mockFile)
		} catch (e) {
			expect(e).toEqual(
				new Error('Failed to save objects: Error: Algolia error'),
			)
		}
	})
})
