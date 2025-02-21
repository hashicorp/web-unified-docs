import { batchPostRecords } from './batch-post-records-to-algolia.mjs'
import path from 'path'

const ALGOLIA_RECORDS_FILE = path.join(
	process.cwd(),
	'scripts/algolia/batch-post-records/algoliaRecords.json',
)

// only run in CI env
if (process.env.CI) {
	batchPostRecords(ALGOLIA_RECORDS_FILE)
}
