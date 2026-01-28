/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */
import path from 'node:path'

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { batchPostRecords } from './batch-post-records-to-algolia.mjs'
import { algoliasearch } from 'algoliasearch'
import algoliaRecords from '__fixtures__/algoliaRecords.json'
import { fs, vol } from 'memfs'

vi.mock('algoliasearch')

const mockFilePath = path.join(
	process.cwd(),
	'__fixtures__/algoliaRecords.json',
)

beforeEach(() => {
	vol.fromJSON({
		[mockFilePath]: JSON.stringify(algoliaRecords),
	})
	process.env.ALGOLIA_API_KEY = 'fake_api_key'
	process.env.ALGOLIA_APP_ID = 'TEST_ID'
	process.env.ALGOLIA_INDEX_NAME = 'test_index'
})

describe('batchPostRecords', () => {
	afterEach(() => {
		vi.resetAllMocks()
		vol.reset() // Reset the state of in-memory fs
	})

	it('should read the records file and post records to Algolia', async () => {
		const mockAlgoliaClient = {
			batch: vi.fn().mockReturnValue({}),
		}
		algoliasearch.mockReturnValue(mockAlgoliaClient)
		const algoliaRecords = JSON.parse(fs.readFileSync(mockFilePath))
		await batchPostRecords(mockFilePath)

		expect(algoliasearch).toHaveBeenCalledWith('TEST_ID', 'fake_api_key')
		expect(mockAlgoliaClient.batch).toHaveBeenCalledWith({
			batchWriteParams: {
				requests: algoliaRecords,
			},
			indexName: 'test_index',
		})

		expect(algoliaRecords[0]).toHaveProperty('action', 'addObject')
		expect(algoliaRecords[0].body).toHaveProperty('_tags', [
			'terraform-plugin-framework',
			'web-unified-docs',
		])
	})

	it('should throw an error if posting records fails', async () => {
		const mockAlgoliaClient = {
			batch: vi.fn().mockRejectedValue(new Error('Algolia error')),
		}
		algoliasearch.mockReturnValue(mockAlgoliaClient)

		try {
			await batchPostRecords(mockFilePath)
		} catch (e) {
			expect(e).toEqual(
				new Error('Failed to add records: Error: Algolia error'),
			)
		}
	})
})
