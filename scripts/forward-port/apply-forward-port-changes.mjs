/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { pathToFileURL } from 'node:url'

/**
 * Rewrites the source-version segment of a file path to the target version.
 * e.g. content/terraform/v1.14.x/docs/file.mdx → content/terraform/v1.15.x/docs/file.mdx
 */
function toTargetPath(srcPath, sourceVersion, targetVersion) {
	return srcPath.replace(sourceVersion, targetVersion)
}

// filter out only the targetProduct files/directories from the changes object
function filterByTargetProduct(files, product) {
	const prefix = `content/${product}/`
	const filtered = {
		added: (files.added || []).filter((f) => {
			return f.startsWith(prefix)
		}),
		modified: (files.modified || []).filter((f) => {
			return f.startsWith(prefix)
		}),
		removed: (files.removed || []).filter((f) => {
			return f.startsWith(prefix)
		}),
	}

	const totalBefore =
		(files.added || []).length +
		(files.modified || []).length +
		(files.removed || []).length
	const totalAfter =
		filtered.added.length + filtered.modified.length + filtered.removed.length

	if (totalBefore > 0 && totalAfter === 0) {
		console.warn(
			`Warning: no changed files matched product directory 'content/${product}/'. ` +
				`Check the targetProduct value in your config or /forward-port comment.`,
		)
	} else if (totalBefore !== totalAfter) {
		console.log(
			`Filtered to ${totalAfter} file(s) for product '${product}' ` +
				`(excluded ${totalBefore - totalAfter} file(s) from other products)`,
		)
	}

	return filtered
}

/**
 * Applies forward-port changes: copies added/modified files from the source
 * version directory into the target version directory, and deletes the
 * target-version counterparts of removed files.
 *
 * @param {object} options
 * @param {string} options.changesFile - Path to the {added, modified, removed} JSON.
 * @param {string} options.targetProduct - Product directory name (e.g. terraform).
 * @param {string} options.sourceVersion - Source version segment (e.g. v1.14.x).
 * @param {string} options.targetVersion - Target version segment (e.g. v1.15.x).
 * @param {string} [options.sourceDir] - Directory to read source files from.
 * @returns {{ result?: { applied: number, deleted: number, skipped: number }, error?: string }}
 */
export function applyForwardPortChanges({
	changesFile,
	targetProduct,
	sourceVersion,
	targetVersion,
	sourceDir,
} = {}) {
	if (!changesFile || !targetProduct || !sourceVersion || !targetVersion) {
		return {
			error:
				'changesFile, targetProduct, sourceVersion, and targetVersion are required',
		}
	}

	let changedFiles
	try {
		changedFiles = JSON.parse(fs.readFileSync(changesFile, 'utf-8'))
	} catch (error) {
		return {
			error: `Error reading changes file at ${changesFile}: ${error.message}`,
		}
	}

	changedFiles = filterByTargetProduct(changedFiles, targetProduct)

	const { added = [], modified = [], removed = [] } = changedFiles

	let applied = 0
	let skipped = 0
	let deleted = 0

	// Added and modified: copy from source path to target path.
	for (const srcPath of [...added, ...modified]) {
		const destPath = toTargetPath(srcPath, sourceVersion, targetVersion)

		if (srcPath === destPath) {
			console.warn(
				`Skipping ${srcPath}: source and target paths are identical (version segment not found)`,
			)
			skipped++
			continue
		}

		const absoluteSrcPath = sourceDir ? path.join(sourceDir, srcPath) : srcPath
		if (!fs.existsSync(absoluteSrcPath)) {
			console.warn(`Skipping ${srcPath}: source file does not exist`)
			skipped++
			continue
		}

		fs.mkdirSync(path.dirname(destPath), { recursive: true })
		fs.copyFileSync(absoluteSrcPath, destPath)
		console.log(`  copied: ${srcPath} → ${destPath}`)
		applied++
	}

	// Removed: delete the target-version counterpart if it exists.
	for (const srcPath of removed) {
		const destPath = toTargetPath(srcPath, sourceVersion, targetVersion)

		if (srcPath === destPath) {
			console.warn(
				`Skipping removal of ${srcPath}: source and target paths are identical (version segment not found)`,
			)
			skipped++
			continue
		}

		if (!fs.existsSync(destPath)) {
			console.log(`  already absent: ${destPath}`)
			skipped++
			continue
		}

		fs.rmSync(destPath)
		console.log(`  deleted: ${destPath}`)
		deleted++
	}

	console.log(
		`\nForward-port complete: ${applied} copied, ${deleted} deleted, ${skipped} skipped`,
	)

	return { result: { applied, deleted, skipped } }
}

/**
 * Returns true when this module is executed directly by Node, e.g.
 * `node scripts/forward-port/apply-forward-port-changes.mjs`.
 */
function isRunFromCommandLine() {
	if (!process.argv[1]) {
		return false
	}

	return import.meta.url === pathToFileURL(process.argv[1]).href
}

if (isRunFromCommandLine()) {
	const { values } = parseArgs({
		options: {
			'changes-file': { type: 'string' },
			'target-product': { type: 'string' },
			'source-version': { type: 'string' },
			'target-version': { type: 'string' },
			'source-dir': { type: 'string' },
		},
		strict: true,
	})

	const outcome = applyForwardPortChanges({
		changesFile: values['changes-file'],
		targetProduct: values['target-product'],
		sourceVersion: values['source-version'],
		targetVersion: values['target-version'],
		sourceDir: values['source-dir'],
	})

	if (outcome.error) {
		console.error(`Error: ${outcome.error}`)
		process.exit(1)
	}
}
