#!/usr/bin/env node
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Script to check for broken links using lychee in a Docker container
 * Usage:
 *   npm run broken-link                     # Checks ./content/ directory
 *   npm run broken-link terraform-plugin-framework  # Checks specific directory
 *   npm run broken-link dir1 dir2 dir3      # Checks multiple directories
 */

import { execSync } from 'node:child_process'

// Get command line arguments (skip the first two which are node and script path)
const args = process.argv.slice(2)

// Default to ./content/ if no arguments provided
const directories = args.length > 0 ? args : ['./content/']

// Convert directories to proper paths for lychee
const pathsToCheck = directories
	.map((dir) => {
		// If the directory doesn't start with ./ or /, prepend ./content/
		if (!dir.startsWith('./') && !dir.startsWith('/')) {
			return `./content/${dir}`
		}
		return dir
	})
	.join(' ')

console.log(`\n🔍 Checking for broken links in: ${pathsToCheck}\n`)

try {
	// Build the Docker command
	// const dockerCmd = `docker run --init -it --rm -w /input -v $(pwd):/input lycheeverse/lychee ${pathsToCheck} -b https://developer.hashicorp.com/ --exclude-all-private --exclude '\\.(svg|gif|jpg|png)' --accept 200,429 --timeout=60 --max-concurrency 24`
	const dockerCmd = `docker run --init -it --rm -w /input -v $(pwd):/input lycheeverse/lychee ${pathsToCheck} -b http://localhost:3000 --exclude-all-private --exclude '\\.(svg|gif|jpg|png)' --accept 200,429 --timeout=60 --max-concurrency 24`

	// Execute the command
	execSync(dockerCmd, { stdio: 'inherit' })

	console.log('\n✅ Link check completed successfully!')
} catch (error) {
	// If lychee finds broken links, it will exit with a non-zero code
	if (error.status > 0) {
		console.error('\n❌ Broken links were found. See above for details.')
		process.exit(1)
	} else {
		console.error(
			'\n❌ An error occurred while running the link checker:',
			error.message,
		)
		process.exit(1)
	}
}
