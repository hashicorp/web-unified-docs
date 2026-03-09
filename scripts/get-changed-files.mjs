/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const OUTPUT_FILE = './changedFiles.json'

/**
 * Finds the merge base between the current branch and origin/main,
 * then returns the list of changed files grouped by status.
 */
function buildChangedFiles() {
	// In CI (GitHub Actions), BASE_SHA is set from github.event.pull_request.base.sha.
	let mergeBase = process.env.BASE_SHA
	if (!mergeBase) {
		mergeBase = execSync('git merge-base HEAD origin/main', {
			encoding: 'utf-8',
		}).trim()
	}

	// Get the diff between the merge base and HEAD.
	// --name-status outputs lines like: A\tpath/to/file or R100\told/path\tnew/path
	const diffOutput = execSync(`git diff --name-status ${mergeBase} HEAD`, {
		encoding: 'utf-8',
	}).trim()

	const added = []
	const modified = []
	const removed = []

	if (!diffOutput) {
		return { added, modified, removed }
	}

	for (const line of diffOutput.split('\n')) {
		const parts = line.split('\t')
		const status = parts[0]

		if (status === 'A') {
			added.push(parts[1])
		} else if (status === 'M') {
			modified.push(parts[1])
		} else if (status === 'D') {
			removed.push(parts[1])
		} else if (status.startsWith('R')) {
			// Rename: treat old path as removed, new path as added
			removed.push(parts[1])
			added.push(parts[2])
		} else if (status.startsWith('C')) {
			// Copy: treat the destination as added
			added.push(parts[2])
		}

		// TODO: If a partial file was changed, then we need to add all files that include that partial to the modified list.
	}

	return { added, modified, removed }
}

export async function getChangedFiles() {
	try {
		const changedFiles = buildChangedFiles()

		const output = { changedFiles }

		const outputPath = path.join(process.cwd(), OUTPUT_FILE)
		await fs.promises.writeFile(outputPath, JSON.stringify(output, null, 2), {
			encoding: 'utf-8',
		})

		console.log(`Changed files written to ${outputPath}`)
		console.log(
			`  Added: ${changedFiles.added.length}, Modified: ${changedFiles.modified.length}, Removed: ${changedFiles.removed.length}`,
		)

		return output
	} catch (error) {
		console.error('Error getting changed files:', error)
		process.exit(1)
	}
}
