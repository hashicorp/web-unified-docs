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

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import grayMatter from 'gray-matter'

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
		console.error(
			`❌ Error getting created date for ${filePath}:`,
			error.message,
		)
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
			`❌ Error getting last modified date for ${filePath}:`,
			error.message,
		)
		return null
	}
}

const parseMarkdownFrontMatter = (filePath) => {
	try {
		const {
			content: markdownSource,
			matter,
			data: metadata,
		} = grayMatter.read(filePath)
		return { markdownSource, matter, metadata }
	} catch (error) {
		console.error(
			`❌ Failed to parse Markdown front-matter for ${filePath}: ${error}`,
		)
		return null
	}
}

/**
 * Add or update date metadata in MDX frontmatter
 * @param {string} filePath - Path to the MDX file
 */
function addDateMetadata(filePath) {
	const createdDate = getCreatedDate(filePath)
	const lastModifiedDate = getLastModifiedDate(filePath)

	if (!createdDate || !lastModifiedDate) {
		console.warn(`⚠️  Skipping ${filePath}: Could not retrieve git dates`)
		return
	}

	const { markdownSource, matter, metadata } =
		parseMarkdownFrontMatter(filePath)
	let frontmatter = matter

	// Check if file has frontmatter
	if (Object.keys(metadata).length === 0) {
		console.warn(`⚠️  Skipping ${filePath}: No frontmatter found`)
		return
	}

	// Remove existing auto-generated metadata if present
	const autoGenRegex =
		/# START AUTO GENERATED METADATA, DO NOT EDIT\ncreated_at:.*\nlast_modified:.*\n# END AUTO GENERATED METADATA/g
	frontmatter = frontmatter.replace(autoGenRegex, '')

	// Add new metadata at the end of frontmatter (before the closing ---)
	const metadataBlock = `# START AUTO GENERATED METADATA, DO NOT EDIT\ncreated_at: ${createdDate}\nlast_modified: ${lastModifiedDate}\n# END AUTO GENERATED METADATA\n`

	// Ensure frontmatter ends with a newline before adding metadata
	if (!frontmatter.endsWith('\n')) {
		frontmatter += '\n'
	}

	frontmatter += metadataBlock

	// Reconstruct the file
	const newContent = `---${frontmatter}---\n${markdownSource}`

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
