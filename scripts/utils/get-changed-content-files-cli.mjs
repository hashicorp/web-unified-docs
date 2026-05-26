/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { program } from 'commander'
import { getChangedContentFiles } from './get-changed-content-files.mjs'

program
	.option('--merge-base <sha>', 'Explicit diff base SHA (skips git merge-base computation)')
	.option('--include-partials <bool>', 'Fan out partial file changes (default: true)', 'true')
	.option('--output <path>', 'Override output file path')
	.parse()

const opts = program.opts()
;(async () => {
	await getChangedContentFiles({
		mergeBase: opts.mergeBase,
		includePartials: opts.includePartials !== 'false',
		outputFile: opts.output,
	})
})()
