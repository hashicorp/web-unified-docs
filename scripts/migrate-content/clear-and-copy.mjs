/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

/**
 * **CAUTION**: the `dest` path passed to this function will be deleted.
 * Ensure that the path is correct, and that you have a backup of the
 * data in that directory if necessary.
 *
 * Given a source directory path, and a destination directory path,
 * first ensure the parent directory for the destination exists.
 * Then, clear the destination directory, removing all files and subfolders.
 * Finally, copy the source directory to the destination.
 *
 * The clearing and copying is achieved with `rm` and `cp` commands,
 * run by `execSync`. Output from these commands is logged, and `execSync`
 * will throw an error if it encounters a non-zero exit code. We intentionally
 * do not catch errors, as we want them to halt any script using this function.
 *
 * @param {string} src Full path to the source directory to copy.
 * @param {string} dest Full path to the destination directory. This directory
 * will be completed deleted, before copying `src` into it.
 * @returns {void}
 */
export function clearAndCopy(src, dest) {
	// Ensure the parent for the destination directory exists
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(path.dirname(dest), { recursive: true })
	}
	// Clear any previously copied files
	execSync(`rm -rf ${dest}`, { stdio: 'inherit' })
	// Copy the director
	execSync(`cp -r ${src} ${dest}`, {
		stdio: 'inherit',
	})
}
