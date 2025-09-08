/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { algoliasearch } from 'algoliasearch'
import fs from 'node:fs'

export async function batchPostRecords(searchObjectsFile) {
	const client = algoliasearch(
		process.env.ALGOLIA_APP_ID,
		process.env.ALGOLIA_API_KEY,
	)

	const data = fs.readFileSync(searchObjectsFile, 'utf-8')
	const searchObjects = JSON.parse(data)

	// add the UDR records to algolia index prod_DEVDOT_omni
	try {
		console.log(
			`🚧 Adding ${searchObjects.length} records to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index...`,
		)
		await client.batch({
			indexName: process.env.ALGOLIA_INDEX_NAME,
			batchWriteParams: {
				requests: searchObjects,
			},
		})
		console.log(
			`✅ Adding ${searchObjects.length} records to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index.`,
		)
	} catch (e) {
		throw new Error(`Failed to add records: ${e}`)
	}
}
