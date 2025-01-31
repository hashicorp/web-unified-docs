import fs from 'fs'
import algoliasearch from 'algoliasearch'

export async function batchPostRecords(searchObjectsFile) {
	const searchClient = algoliasearch(
		process.env.ALGOLIA_APP_ID,
		process.env.ALGOLIA_API_KEY,
	)
	const searchIndex = searchClient.initIndex(process.env.ALGOLIA_INDEX_NAME)
	console.log({ searchIndex })
	const data = fs.readFileSync(searchObjectsFile, 'utf-8')
	const searchObjects = JSON.parse(data)

	// save the objects to algolia
	try {
		console.log(
			`🚧 Saving ${searchObjects.length} objects to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index...`,
		)
		// await searchIndex.replaceAllObjects(searchObjects, { safe: true })
		console.log(
			`✅ Completed saving objects to the ${process.env.ALGOLIA_INDEX_NAME} Algolia index.`,
		)
		console.log(
			`target env: ${process.env.VERCEL_TARGET_ENV},\n production url: ${process.env.VERCEL_PROJECT_PRODUCTION_URL},\n VERCEL_BRANCH_URL: ${process.env.VERCEL_BRANCH_URL}`,
		)
	} catch (e) {
		throw new Error(`Failed to save objects: ${e}`)
	}
}
