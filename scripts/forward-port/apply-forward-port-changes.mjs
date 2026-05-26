/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { program } from 'commander'

program
	.requiredOption('--changes-file <path>', 'Path to changedContentFiles.json')
	.requiredOption('--target-product <product>', 'Target product, e.g. vault, boundary, etc.')
	.requiredOption('--source-version <version>', 'Source version directory segment, e.g. v1.14.x')
	.requiredOption('--target-version <version>', 'Target version directory segment, e.g. v1.15.x')
	.option(
		'--source-dir <path>',
		'Base directory to read source files from (default: current working directory). ' +
			'Use this when the source files were saved to a temp location before switching checkouts.',
	)
	.parse()

const { changesFile, targetProduct, sourceVersion, targetVersion, sourceDir } = program.opts()



/**
 * Rewrites the source-version segment of a file path to the target version.
 * e.g. content/terraform/v1.14.x/docs/file.mdx → content/terraform/v1.15.x/docs/file.mdx
 */
function toTargetPath(srcPath) {
	return srcPath.replace(sourceVersion, targetVersion)
}

// filter out only the targetProduct files/directories from the changesFile
function filterByTargetProduct(files, product) {
	const prefix = `content/${product}/`
	const filtered = {
		added: (files.added || []).filter((f) => f.startsWith(prefix)),
		modified: (files.modified || []).filter((f) => f.startsWith(prefix)),
		removed: (files.removed || []).filter((f) => f.startsWith(prefix)),
	}

	const totalBefore =
		(files.added || []).length + (files.modified || []).length + (files.removed || []).length
	const totalAfter = filtered.added.length + filtered.modified.length + filtered.removed.length

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

let changedFiles
try {
	changedFiles = JSON.parse(fs.readFileSync(changesFile, 'utf-8'))
} catch (error) {
	console.error(`Error reading changes file at ${changesFile}:`, error)
	process.exit(1)
}
changedFiles = filterByTargetProduct(changedFiles, targetProduct)

const { added = [], modified = [], removed = [] } = changedFiles

let applied = 0
let skipped = 0
let deleted = 0

// Added and modified: copy from source path to target path.
for (const srcPath of [...added, ...modified]) {
	const destPath = toTargetPath(srcPath)

	if (srcPath === destPath) {
		console.warn(`Skipping ${srcPath}: source and target paths are identical (version segment not found)`)
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
	const destPath = toTargetPath(srcPath)

	if (srcPath === destPath) {
		console.warn(`Skipping removal of ${srcPath}: source and target paths are identical (version segment not found)`)
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
