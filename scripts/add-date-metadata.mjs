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
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Get the creation date of a file from git history
 * @param {string} filePath - Path to the file
 * @returns {string|null} ISO 8601 formatted date or null if not found
 */
function getCreatedDate(filePath) {
	try {
		// Get the first commit date for the file
		const result = execSync(
			`git log --follow --format=%aI --reverse -- "${filePath}" | head -1`,
			{ encoding: 'utf-8' },
		)
		return result.trim() || null
	} catch (error) {
		console.error(`Error getting created date for ${filePath}:`, error.message)
		return null
	}
}

/**
 * Get the last modified date of a file from git history
 * @param {string} filePath - Path to the file
 * @returns {string|null} ISO 8601 formatted date or null if not found
 */
function getLastModifiedDate(filePath) {
	try {
		// Get the most recent commit date for the file
		const result = execSync(`git log --format=%aI -1 -- "${filePath}"`, {
			encoding: 'utf-8',
		})
		return result.trim() || null
	} catch (error) {
		console.error(
			`Error getting last modified date for ${filePath}:`,
			error.message,
		)
		return null
	}
}

/**
 * Add or update date metadata in MDX frontmatter
 * @param {string} filePath - Path to the MDX file
 */
function addDateMetadata(filePath) {
	console.log(`Processing: ${filePath}`)

	const createdDate = getCreatedDate(filePath)
	const lastModifiedDate = getLastModifiedDate(filePath)

	if (!createdDate || !lastModifiedDate) {
		console.warn(`⚠️  Skipping ${filePath}: Could not retrieve git dates`)
		return
	}

	let content = fs.readFileSync(filePath, 'utf-8')

	// Check if file has frontmatter
	if (!content.startsWith('---')) {
		console.warn(`⚠️  Skipping ${filePath}: No frontmatter found`)
		return
	}

	// Split content into frontmatter and body
	const parts = content.split('---')
	if (parts.length < 3) {
		console.warn(`⚠️  Skipping ${filePath}: Invalid frontmatter structure`)
		return
	}

	let frontmatter = parts[1]
	const body = parts.slice(2).join('---')

	// TODO: if the frontmatter already has a created_at then skip adding it
	// TODO: Maybe take into account the release stage file path?
	// TODO: How should we deploy this? All at once? Or with only a specific product and version to make sure that the whole flow to dev-portal metadata works correctly
	// TODO: Maybe a bug in scripts/prebuild/gather-all-versions-docs-paths.mjs?
	// TODO: Check the flow of null values for when serving through the API

	// Remove existing auto-generated metadata if present
	const autoGenRegex =
		/# auto generated metadata, do not change!\ncreated_at:.*\nlast_modified:.*\n# end of auto generated metadata\n/g
	frontmatter = frontmatter.replace(autoGenRegex, '')

	// Add new metadata at the end of frontmatter (before the closing ---)
	const metadataBlock = `# auto generated metadata, do not change!
created_at: ${createdDate}
last_modified: ${lastModifiedDate}
# end of auto generated metadata
`

	// Ensure frontmatter ends with a newline before adding metadata
	if (!frontmatter.endsWith('\n')) {
		frontmatter += '\n'
	}

	frontmatter += metadataBlock

	// Reconstruct the file
	const newContent = `---${frontmatter}---${body}`

	fs.writeFileSync(filePath, newContent, 'utf-8')
	console.log(`✅ Updated: ${filePath}`)
}

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
