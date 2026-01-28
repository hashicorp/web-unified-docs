/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Given an array of items, an asynchronous function to apply to each item
 * as part of a `.map()` call, and a batch size,
 *
 * Execute the asynchronous function on each item in the array, working
 * in parallel batches of the specified size, and return the results once done.
 *
 * @param {string} batchName
 * @param {unknown[]} arrayToBatch
 * @param {function} asyncMapFn
 * @param {number} batchSize
 * @returns {Promise<unknown[]>}
 */
export async function batchPromises(
	batchName,
	arrayToBatch,
	asyncMapFn,
	{ batchSize = 64, loggingEnabled = true } = {
		batchSize: 64,
		loggingEnabled: true,
	},
) {
	let batches = []
	for (let i = 0, j = arrayToBatch.length; i <= j - 1; i += batchSize) {
		batches.push(arrayToBatch.slice(i, i + batchSize))
	}

	let results = []
	const tenPercBatchLen = Math.ceil(batches.length / 10)
	for (var n = 0; n < batches.length; n++) {
		const thisBatch = batches[n]
		const batchResults = await Promise.all(thisBatch.map(asyncMapFn))

		if (n % tenPercBatchLen === 0 || n === batches.length - 1) {
			let batchesDone = Math.min(batchSize * (n + 1), arrayToBatch.length)

			if (loggingEnabled) {
				console.log(
					`${batchName} ${batchesDone} / ${arrayToBatch.length} completed...`,
				)
			}
		}

		results = results.concat(batchResults)
	}

	return results
}
