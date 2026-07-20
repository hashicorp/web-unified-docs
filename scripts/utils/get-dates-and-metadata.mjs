/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import grayMatter from 'gray-matter'
import fs from 'node:fs'

/**
 * Get the creation date of a file from git history
 * @param {string} filePath - Path to the file
 * @returns {string|null} ISO 8601 formatted date or null if not found
 */
export function getCreatedDate(filePath) {
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
export function getLastModifiedDate(filePath) {
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

export const parseMarkdownFrontMatter = (filePath) => {
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
 * @param {string|null} defaultDate - Default date to use in precommit script
 */
export function addDateMetadata(filePath, defaultDate) {
	let createdDate = getCreatedDate(filePath)
	let lastModifiedDate
	if (defaultDate === null) {
		lastModifiedDate = getLastModifiedDate(filePath)
	} else {
		lastModifiedDate = new Date(defaultDate).toISOString()
	}

	// This handles the case where a file is newly created and has no git history yet
	// we want to set created_at to the defaultDate provided by the precommit script
	if (!createdDate && defaultDate !== null) {
		createdDate = new Date(defaultDate).toISOString()
	}

	if (!createdDate || !lastModifiedDate) {
		console.warn(`⚠️  Skipping ${filePath}: Could not retrieve git dates`)
		return
	}

	const parseResult = parseMarkdownFrontMatter(filePath)
	if (parseResult === null) {
		console.warn(`⚠️  Skipping ${filePath}: Could not parse frontmatter`)
		return
	}
	const { markdownSource, matter, metadata } = parseResult
	let frontmatter = matter

	// Check if file has frontmatter
	if (Object.keys(metadata).length === 0 || frontmatter === undefined) {
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
