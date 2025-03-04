/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import algoliasearch from 'algoliasearch'

export async function batchPostRecords(searchObjectsFile) {
	const searchClient = algoliasearch(
		process.env.ALGOLIA_APP_ID,
		process.env.ALGOLIA_API_KEY,
	)
	const searchIndex = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME)

	const data = fs.readFileSync(searchObjectsFile, 'utf-8')
	const searchObjects = JSON.parse(data)

	// save the objects to algolia
	try {
		console.log(
			`🚧 Saving ${searchObjects.length} objects to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index...`,
		)
		await searchIndex.replaceAllObjects(searchObjects, { safe: true })
		console.log(
			`✅ Completed saving objects to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index.`,
		)
	} catch (e) {
		throw new Error(`Failed to save objects: ${e}`)
	}
}
