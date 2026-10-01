/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { parseArgs } from 'node:util'
import { pathToFileURL } from 'node:url'
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
	// In CI, GIT_MERGE_BASE is pre-computed by the workflow's "Fetch connection to main for merge-base"
	// step and exported via $GITHUB_ENV. We do this in the workflow (not here) because actions/checkout
	// creates a partial (blobless) clone where git merge-base can fail due to lazy-fetch issues with
	// "promised" commit objects. Shell git in the workflow step has full credentials and works reliably.
	//
	// Locally, GIT_MERGE_BASE is not set, so we fetch and compute it here.
	let resolvedMergeBase = mergeBase || process.env.GIT_MERGE_BASE
	if (!resolvedMergeBase) {
		try {
			resolvedMergeBase = execSync('git merge-base HEAD origin/main', {
				encoding: 'utf-8',
			}).trim()
		} catch (error) {
			throw new Error(
				`Failed to find merge-base with origin/main. Ensure origin main is fetched before running this script.\n` +
					`stderr: ${error.stderr?.trim() || '(none)'}`,
			)
		}
	}

	// Get the diff between the merge base and HEAD.
	let diffOutput
	try {
		diffOutput = execSync(
			`git diff --name-status ${resolvedMergeBase} HEAD -- content/`,
			{ encoding: 'utf-8' },
		).trim()
	} catch (error) {
		throw new Error(
			`Failed to diff merge-base (${resolvedMergeBase}) against HEAD.\n` +
				`stderr: ${error.stderr?.trim() || '(none)'}`,
		)
	}

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
 * Returns true when this module is executed directly by Node, e.g.
 * `node scripts/utils/get-changed-content-files.mjs`.
 */
function isRunFromCommandLine() {
	if (!process.argv[1]) {
		return false
	}

	return import.meta.url === pathToFileURL(process.argv[1]).href
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
		const changedFiles = buildChangedContentFiles({
			mergeBase,
			includePartials,
		})

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

if (isRunFromCommandLine()) {
	const { values } = parseArgs({
		options: {
			'merge-base': { type: 'string' },
			'include-partials': { type: 'string', default: 'true' },
			output: { type: 'string' },
		},
		strict: true,
	})
	void getChangedContentFiles({
		mergeBase: values['merge-base'],
		includePartials: values['include-partials'] !== 'false',
		outputFile: values.output,
	})
}
