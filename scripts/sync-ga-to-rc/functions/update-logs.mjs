/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { appendFileSync } from 'node:fs'

/**
 * @method writeToFile
 *
 * The writeToFile function takes a string or assocative array of JSON objects
 * and writes the data to a file with one entry per line.
 *
 * Expected schema for JSON array:
 * [
 *   "key_1": ["commit_date", "absolute_path_to_file"],
 *   "key_2": ["commit_date", "absolute_path_to_file"],
 *   ...
 *   "key_N": ["commit_date", "absolute_path_to_file"],
 * ]
 *
 * @param {String} filePath  Absolute file path to target file
 * @param {Object} data      Associative array/map of arrays
 */
export function writeToFile(filePath, data) {
	if (filePath == null) {
		return
	}
	if (data == null) {
		return
	}

	const dateIndex = 0
	const fileIndex = 1

	var listEntry = ''

	if (Array.isArray(data)) {
		Object.values(data).forEach((entry) => {
			listEntry = '[' + entry[dateIndex] + '] ' + entry[fileIndex]
			appendFileSync(filePath, listEntry + '\n')
		})
	} else {
		appendFileSync(filePath, data + '\n')
	}
}

/**
 * @method writeConflictList
 *
 * The writeConflictList function takes an assocative array of strings with path
 * and commit info of potential conflicts for manual review and writes the data
 * to a file.
 *
 * Expected schema:
 * [
 *   "key_1": "multi_line string_1",
 *   "key_2": "multi_line string_2",
 *   ...
 *   "key_N": "multi_line string_N",
 * ]
 *
 * Expected file entry string format:
 *
 * {short_file_path}:
 *   GA: [{ga_commit_date}] {full_ga_path}
 *   RC: [{rc_commit_date}] {full_rc_path}
 *
 * For example:
 *
 * /content/partials/tips/change-tracker.mdx:
 *   GA: [2025-08-15 16:38:58] /local/repo/path/web-unified-docs/content/vault/v1.20.x/content/docs/sync/gcpsm.mdx
 *   RC: [2025-08-23 10:52:06] /local/repo/path/web-unified-docs/content/vault/v1.21.x (rc)/content/docs/sync/gcpsm.mdx
 *
 * @param {String} filePath  Absolute file path to target file
 * @param {Object} data      Associative array/map of string
 */
export function writeConflictList(filePath, data) {
	if (filePath == null) {
		return
	}
	if (data == null) {
		return
	}

	if (Array.isArray(data)) {
		Object.values(data).forEach((entry) => {
			appendFileSync(filePath, entry + '\n')
		})
	} else {
		appendFileSync(filePath, data + '\n')
	}
}
