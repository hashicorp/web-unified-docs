#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Detects changed files using git diff and generates a manifest for Quick Preview builds.
 * This enables selective prebuild - only processing files that have changed.
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const CWD = process.cwd()
const MANIFEST_PATH = path.join(CWD, 'public/changedfiles.json')

/**
 * Get the list of changed files using git diff
 * @param {string} baseBranch - The branch to compare against (default: 'main')
 * @returns {string[]} - Array of changed file paths
 */
function getChangedFiles(baseBranch = 'main') {
	try {
		const changedSet = new Set()
		const deletedSet = new Set()

		// First, check for uncommitted changes (staged + unstaged)
		console.log('Checking for uncommitted changes...')
		const unstagedOutput = execSync('git diff --name-only', {
			encoding: 'utf-8',
			stdio: 'pipe',
		})
		const stagedOutput = execSync('git diff --cached --name-only', {
			encoding: 'utf-8',
			stdio: 'pipe',
		})

		// Add unstaged and staged changes
		unstagedOutput
			.split('\n')
			.filter(Boolean)
			.forEach((f) => {
				changedSet.add(f.trim())
			})
		stagedOutput
			.split('\n')
			.filter(Boolean)
			.forEach((f) => {
				changedSet.add(f.trim())
			})

		// Then, fetch and compare with origin/main for committed changes
		console.log(`Fetching latest changes from origin/${baseBranch}...`)
		try {
			execSync('git fetch origin', { stdio: 'pipe' })

			// Get changed files between current branch and base branch
			const diffOutput = execSync(
				`git diff --name-only --diff-filter=d origin/${baseBranch}...HEAD`,
				{ encoding: 'utf-8', stdio: 'pipe' },
			)

			// Get deleted files
			const deletedOutput = execSync(
				`git diff --name-only --diff-filter=D origin/${baseBranch}...HEAD`,
				{ encoding: 'utf-8', stdio: 'pipe' },
			)

			diffOutput
				.split('\n')
				.filter(Boolean)
				.forEach((f) => {
					changedSet.add(f.trim())
				})

			deletedOutput
				.split('\n')
				.filter(Boolean)
				.forEach((f) => {
					deletedSet.add(f.trim())
				})
		} catch (fetchError) {
			console.warn(
				`Could not fetch from origin/${baseBranch}: ${fetchError.message}`,
			)
			console.warn('Continuing with local changes only...')
		}

		const changed = Array.from(changedSet).map((f) => {
			return f.trim()
		})
		const deleted = Array.from(deletedSet).map((f) => {
			return f.trim()
		})

		return { changed, deleted }
	} catch (error) {
		// If git diff fails (e.g., not in a git repo),
		// fall back to detecting all local files
		console.warn(
			`Git diff failed: ${error.message}. Falling back to local file detection.`,
		)
		return detectLocalFiles()
	}
}

/**
 * Fallback: detect all local content files
 * Used when git diff is not available or fails
 */
function detectLocalFiles() {
	const contentDir = path.join(CWD, 'content')
	const allFiles = []

	function scanDirectory(dir) {
		const entries = fs.readdirSync(dir, { withFileTypes: true })
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name)
			if (entry.isDirectory()) {
				scanDirectory(fullPath)
			} else {
				// Get path relative to CWD
				const relativePath = path.relative(CWD, fullPath)
				allFiles.push(relativePath)
			}
		}
	}

	if (fs.existsSync(contentDir)) {
		scanDirectory(contentDir)
	}

	return { changed: allFiles, deleted: [] }
}

/**
 * Categorize changed files by type
 * @param {string[]} changedFiles - Array of changed file paths
 * @param {string[]} deletedFiles - Array of deleted file paths
 */
function categorizeFiles(changedFiles, deletedFiles) {
	const categories = {
		docs: [],
		navData: [],
		redirects: [],
		assets: [],
		other: [],
	}

	const deletedCategories = {
		docs: [],
		navData: [],
		redirects: [],
		assets: [],
		other: [],
	}

	// Categorize changed files
	for (const file of changedFiles) {
		if (!file.startsWith('content/')) {
			continue
		}

		if (file.endsWith('.mdx')) {
			categories.docs.push(file)
		} else if (file.includes('-nav-data.json')) {
			categories.navData.push(file)
		} else if (
			file.endsWith('redirects.jsonc') ||
			file.endsWith('redirects.json')
		) {
			categories.redirects.push(file)
		} else if (file.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|mp4|webm)$/i)) {
			categories.assets.push(file)
		} else {
			categories.other.push(file)
		}
	}

	// Categorize deleted files
	for (const file of deletedFiles) {
		if (!file.startsWith('content/')) {
			continue
		}

		if (file.endsWith('.mdx')) {
			deletedCategories.docs.push(file)
		} else if (file.includes('-nav-data.json')) {
			deletedCategories.navData.push(file)
		} else if (
			file.endsWith('redirects.jsonc') ||
			file.endsWith('redirects.json')
		) {
			deletedCategories.redirects.push(file)
		} else if (file.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|mp4|webm)$/i)) {
			deletedCategories.assets.push(file)
		} else {
			deletedCategories.other.push(file)
		}
	}

	return { changed: categories, deleted: deletedCategories }
}

/**
 * Generate the changedfiles.json manifest
 */
function generateManifest() {
	console.log('🔍 Detecting changed files...\n')

	const baseBranch = process.env.BASE_BRANCH || 'main'
	const { changed, deleted } = getChangedFiles(baseBranch)

	console.log(`Found ${changed.length} changed files`)
	console.log(`Found ${deleted.length} deleted files\n`)

	const categorized = categorizeFiles(changed, deleted)

	const manifest = {
		quickPreview: true,
		mode: 'git-diff',
		baseBranch,
		timestamp: new Date().toISOString(),
		stats: {
			changed: changed.length,
			deleted: deleted.length,
			docs: categorized.changed.docs.length,
			navData: categorized.changed.navData.length,
			redirects: categorized.changed.redirects.length,
			assets: categorized.changed.assets.length,
		},
		changed: categorized.changed,
		deleted: categorized.deleted,
	}

	// Ensure public directory exists
	const publicDir = path.join(CWD, 'public')
	if (!fs.existsSync(publicDir)) {
		fs.mkdirSync(publicDir, { recursive: true })
	}

	// Write manifest
	fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

	console.log('📋 Change Summary:')
	console.log(
		`  Docs:      ${categorized.changed.docs.length} changed, ${categorized.deleted.docs.length} deleted`,
	)
	console.log(
		`  Nav Data:  ${categorized.changed.navData.length} changed, ${categorized.deleted.navData.length} deleted`,
	)
	console.log(
		`  Redirects: ${categorized.changed.redirects.length} changed, ${categorized.deleted.redirects.length} deleted`,
	)
	console.log(
		`  Assets:    ${categorized.changed.assets.length} changed, ${categorized.deleted.assets.length} deleted`,
	)
	console.log(
		`  Other:     ${categorized.changed.other.length} changed, ${categorized.deleted.other.length} deleted`,
	)
	console.log(`\n✅ Manifest written to: ${MANIFEST_PATH}`)

	// Show sample of changed files (first 5 of each type)
	if (categorized.changed.docs.length > 0) {
		console.log('\n📄 Sample docs changed:')
		categorized.changed.docs.slice(0, 5).forEach((f) => {
			console.log(`  - ${f}`)
		})
		if (categorized.changed.docs.length > 5) {
			console.log(`  ... and ${categorized.changed.docs.length - 5} more`)
		}
	}

	return manifest
}

// Run the script
try {
	generateManifest()
} catch (error) {
	console.error('❌ Error generating manifest:', error.message)
	process.exit(1)
}
