/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { parseArgs } from 'node:util'
import { getChangedContentFiles } from './get-changed-content-files.mjs'

const { values } = parseArgs({
	options: {
		'merge-base': { type: 'string' },
		'include-partials': { type: 'string', default: 'true' },
		output: { type: 'string' },
	},
	strict: true,
})

;(async () => {
	await getChangedContentFiles({
		mergeBase: values['merge-base'],
		includePartials: values['include-partials'] !== 'false',
		outputFile: values.output,
	})
})()
