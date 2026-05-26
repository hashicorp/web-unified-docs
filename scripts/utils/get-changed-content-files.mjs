/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { getFilesUsingPartial } from './get-files-using-partial.mjs'

const OUTPUT_FILE = './changedContentFiles.json'
const GIT_STATUS = {
	ADDED: 'A',
	MODIFIED: 'M',
	DELETED: 'D',
	RENAMED: 'R',
	COPIED: 'C',
}

/**
 * Finds the merge base between the current branch and origin/main (or uses an
 * explicit mergeBase override), then returns the list of changed files grouped
 * by status.
 *
 * @param {object} [options]
 * @param {string} [options.mergeBase] - If provided, skip the git merge-base
 *   computation and use this SHA directly as the diff base. Use this in
 *   forward-port mode where the merge has already landed and origin/main has
 *   advanced past the base commit.
 * @param {boolean} [options.includePartials=true] - When false, skip the
 *   partial fan-out step. Use this in forward-port mode where only the
 *   directly-changed files should be ported.
 */
function buildChangedContentFiles({ mergeBase, includePartials = true } = {}) {
	// If an explicit mergeBase is provided (e.g. github.event.pull_request.base.sha
	// passed from the forward-port workflow), use it directly. Otherwise find
	// where the current branch chain diverged from origin/main — this handles the
	// stacked-branch case correctly for incremental builds.
	const resolvedMergeBase =
		mergeBase ??
		execSync('git merge-base HEAD origin/main', {
			encoding: 'utf-8',
		}).trim()

	// Get the diff between the merge base and HEAD.
	const diffOutput = execSync(
		`git diff --name-status ${resolvedMergeBase} HEAD -- content/`,
		{ encoding: 'utf-8' },
	).trim()

	const added = []
	const modified = []
	const removed = []

	if (!diffOutput) {
		return { added, modified, removed }
	}

	for (const line of diffOutput.split('\n')) {
		const parts = line.split('\t')
		const status = parts[0]

		if (status === GIT_STATUS.ADDED) {
			added.push(parts[1])
		} else if (status === GIT_STATUS.MODIFIED) {
			modified.push(parts[1])
		} else if (status === GIT_STATUS.DELETED) {
			removed.push(parts[1])
		} else if (status.startsWith(GIT_STATUS.RENAMED)) {
			// Rename: treat old path as removed, new path as added
			removed.push(parts[1])
			added.push(parts[2])
		} else if (status.startsWith(GIT_STATUS.COPIED)) {
			// Copy: treat the destination as added
			added.push(parts[2])
		}
	}

	// For any changed partial files, add all files that include them to the
	// modified list. This is skipped in forward-port mode (includePartials=false)
	// because only the directly-changed files should be ported.
	if (includePartials) {
		const changedPartials = [...added, ...modified].filter((f) => {
			return f.includes('/partials/')
		})

		for (const partial of changedPartials) {
			const filesUsingPartial = getFilesUsingPartial(partial)
			for (const file of filesUsingPartial) {
				// If the file isn't already in added or modified, add it to modified.
				if (!modified.includes(file) && !added.includes(file)) {
					modified.push(file)
				}
			}
		}
	}

	return { added, modified, removed }
}

/**
 * @param {object} [options]
 * @param {string} [options.mergeBase] - Explicit diff base SHA (forward-port mode).
 * @param {boolean} [options.includePartials=true] - Whether to fan out partial changes.
 * @param {string} [options.outputFile] - Override the output file path.
 */
export async function getChangedContentFiles(options = {}) {
	const { mergeBase, includePartials = true, outputFile } = options
	try {
		const changedFiles = buildChangedContentFiles({ mergeBase, includePartials })

		const outputPath = outputFile ?? path.join(process.cwd(), OUTPUT_FILE)
		await fs.promises.writeFile(
			outputPath,
			JSON.stringify(changedFiles, null, 2),
			{
				encoding: 'utf-8',
			},
		)

		console.log(`Changed content files written to ${outputPath}`)
		console.log(
			`  Added: ${changedFiles.added.length}, Modified: ${changedFiles.modified.length}, Removed: ${changedFiles.removed.length}`,
		)

		return changedFiles
	} catch (error) {
		console.error('Error getting changed content files:', error)
		process.exit(1)
	}
}


