/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { createReadStream, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

/**
 * @method processJson
 *
 * The processJson function takes an array of JSON objects and converts it to an
 * assocative array of arrays so we can eventually compare keys across arrays.
 *
 * Expected schema:
 * [
 *   '{"file": "filename_1", "shortname": "shortname_1", "commit": "last_commit_date_1"}',
 *   '{"file": "filename_2", "shortname": "shortname_2", "commit": "last_commit_date_2"}',
 *   ...
 *   '{"file": "filename_N", "shortname": "shortname_N", "commit": "last_commit_date_N"}',
 * ]
 *
 * @param {Object} rawResults Array of JSON objects
 */
export function processJson(rawResults) {
	var results = []
	var jsonData

	rawResults.forEach((outputLine) => {
		jsonData = JSON.parse(outputLine)
		results[jsonData.shortname] = [jsonData.commit, jsonData.file]
	})

	return results
}

/**
 * @method flattenArray
 *
 * The flattenArray function takes an array of JSON objects, flattens it, and
 * removes any blank lines to ensure that each array entry corresponds to exactly
 * one JSON object. The helper scripts may write data faster than runBashCmdAsync
 * pushes to the result array, so we flatten any results before trying to process
 * anything.
 *
 * @param {Array} rawResults Array of JSON objects, may have multiple objects
 *                           per entry
 */
export function flattenArray(rawResults) {
	var results = []

	if (rawResults == null) {
		return results
	}

	if (!Array.isArray(rawResults)) {
		return results.push(rawResults)
	}

	rawResults.forEach((outputLine) => {
		if (Array.isArray(outputLine)) {
			results.push(...flattenArray(outputLine))
		} else if (outputLine.includes('\n')) {
			results.push(...flattenArray(outputLine.split('\n')))
		} else if (outputLine.length > 0) {
			results.push(outputLine)
		}
	})

	return results
}

/**
 * @method sameSHA
 *
 * The sameSHA function takes two file paths and an algorithm key and compares
 * the SHA of the two files to determine if they are the same.
 *
 * @param {String} file1              Local, absolute path to a file
 * @param {String} file2              Local, absolute path to a file
 * @param {String} [algoKey='sha256'] Crytographic algorithm for SHA creation;
 */
export async function sameSHA(file1, file2, algoKey) {
	var hash1, hash2, hexHash1, hexHash2
	var stream1, stream2
	var algo

	if (algoKey == null) {
		algo = 'sha256'
	} else {
		algo = algoKey
	}

	await new Promise((resolve, reject) => {
		hash1 = createHash(algo)
		stream1 = createReadStream(file1)
		stream1.on('error', reject)
		stream1.on('data', (chunk) => {
			return hash1.update(chunk)
		})
		stream1.on('end', () => {
			return resolve((hexHash1 = hash1.digest('hex')))
		})
	})

	await new Promise((resolve, reject) => {
		hash2 = createHash(algo)
		stream2 = createReadStream(file2)
		stream2.on('error', reject)
		stream2.on('data', (chunk) => {
			return hash2.update(chunk)
		})
		stream2.on('end', () => {
			return resolve((hexHash2 = hash2.digest('hex')))
		})
	})

	return hexHash1 == hexHash2
}

/**
 * @method printHelp
 *
 * The printHelp function takes an optional file path and prints the content to
 * the screen. Calling helpFile without a file path prints the basica usage
 * string.
 *
 * @param {String} helpFile Local, absolute path to a file
 */
export function printHelp(helpFile) {
	const basicHelp =
		'Usage: node sync-ga-to-rc.mjs -slug <product> -ga <ga_version> -rc <rc_version>'

	try {
		var helpText = readFileSync(helpFile, 'utf8')
		console.log(helpText)
	} catch (err) {
		console.log('\n' + basicHelp + '\n')
		throw err
	}
}
