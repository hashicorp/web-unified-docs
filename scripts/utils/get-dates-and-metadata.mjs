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
 */
export function addDateMetadata(filePath) {
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
