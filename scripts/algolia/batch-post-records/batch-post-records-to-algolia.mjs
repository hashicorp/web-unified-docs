import algoliasearch from 'algoliasearch'
import fs from 'fs'

export async function batchPostRecords(searchObjectsFile) {
	const ALGOLIA_APP_ID = 'YY0FFNI7MF'
	const ALGOLIA_INDEX_NAME = 'spike_UDR'

	const searchClient = algoliasearch(
		ALGOLIA_APP_ID,
		process.env.ALGOLIA_API_KEY,
	)
	const searchIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME)

	const data = fs.readFileSync(searchObjectsFile, 'utf-8')
	const searchObjects = JSON.parse(data)

	// save the objects to algolia
	try {
		await searchIndex.replaceAllObjects(searchObjects, { safe: true })
	} catch (e) {
		throw new Error(`Failed to save objects: ${e}`)
	}
}
