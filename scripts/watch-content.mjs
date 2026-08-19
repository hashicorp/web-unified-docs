/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

const contentDir = path.resolve('content')



fs.watch(contentDir, { recursive: true }, async () => {
	console.log("changed file")

	try {
		await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
			method: 'POST',
		})
	} catch {
		// ignore the error
	}
})

console.log(`Watching for file changes in ${contentDir}...`)
