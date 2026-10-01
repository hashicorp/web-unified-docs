/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

const contentDir = path.resolve('content')

fs.watch(contentDir, { recursive: true }, async (eventType, filename) => {
	const filePath = filename ? path.join(contentDir, filename) : contentDir
	console.log(
		`Content changed (${eventType}): ${filePath}. Reloading Dev Portal...`,
	)

	try {
		await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
			method: 'POST',
		})
	} catch (error) {
		console.error('Error refreshing Dev Portal:', error)
	}
})

console.log(`Watching for file changes in ${contentDir}...`)
