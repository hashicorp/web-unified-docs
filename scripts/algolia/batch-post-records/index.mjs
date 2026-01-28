/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { batchPostRecords } from './batch-post-records-to-algolia.mjs'
import path from 'node:path'

const ALGOLIA_RECORDS_FILE = path.join(
	process.cwd(),
	'scripts/algolia/batch-post-records/algoliaRecords.json',
)

batchPostRecords(ALGOLIA_RECORDS_FILE)
