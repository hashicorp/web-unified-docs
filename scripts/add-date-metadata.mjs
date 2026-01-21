#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Script to add created_at and last_modified metadata to MDX files based on git history
 * Usage:
 *   node scripts/add-date-metadata.mjs ./content/terraform/v1.5.x/docs/cli/cloud/migrating.mdx
 *   node scripts/add-date-metadata.mjs ./content/terraform/v1.5.x/
 *   node scripts/add-date-metadata.mjs "./content/terraform/v1.15.x (alpha)/docs/cli/index.mdx"
 */

import fs from 'node:fs'
import path from 'node:path'
import { addDateMetadata } from './utils/get-dates-and-metadata.mjs'

/**
 * Process a single file or all MDX files in a directory
 * @param {string} target - File or directory path
 */
function processTarget(target) {
	const targetPath = path.resolve(target)

	if (!fs.existsSync(targetPath)) {
		console.error(`❌ Error: Path does not exist: ${targetPath}`)
		process.exit(1)
	}

	const stats = fs.statSync(targetPath)

	if (stats.isFile()) {
		// Process single file
		if (path.extname(targetPath) === '.mdx') {
			addDateMetadata(targetPath)
		} else {
			console.error(`❌ Error: File must have .mdx extension: ${targetPath}`)
			process.exit(1)
		}
	} else if (stats.isDirectory()) {
		// Process all MDX files in directory recursively
		const files = fs.readdirSync(targetPath, {
			withFileTypes: true,
			recursive: true,
		})

		const mdxFiles = files
			.filter((file) => {
				return file.isFile() && path.extname(file.name) === '.mdx'
			})
			.map((file) => {
				return path.join(file.path, file.name)
			})

		if (mdxFiles.length === 0) {
			console.warn(`⚠️  No MDX files found in ${targetPath}`)
			return
		}

		console.log(`Found ${mdxFiles.length} MDX file(s) to process\n`)

		mdxFiles.forEach((filePath) => {
			addDateMetadata(filePath)
		})

		console.log(`\n✅ Processed ${mdxFiles.length} file(s)`)
	}
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
	console.error('❌ Error: Please provide a file or directory path')
	console.log('\nUsage:')
	console.log('  node scripts/add-date-metadata.mjs <file.mdx>')
	console.log('  node scripts/add-date-metadata.mjs <directory>')
	process.exit(1)
}

const target = args[0]
processTarget(target)
