/**
 * Given an array of items, an asynchronous function to apply to each item
 * as part of a `.map()` call, and a batch size,
 *
 * Execute the asynchronous function on each item in the array, working
 * in parallel batches of the specified size, and return the results once done.
 *
 * @param {unknown[]} arrayToBatch
 * @param {function} asyncMapFn
 * @param {number} batchSize
 * @returns {Promise<unknown[]>}
 */
async function batchPromises(arrayToBatch, asyncMapFn, batchSize) {
	let batches = [];
	let results = [];
	for (var i = 0, j = arrayToBatch.length; i < j - 1; i += batchSize) {
		batches.push(arrayToBatch.slice(i, i + batchSize));
	}
	for (var n = 0; n < batches.length; n++) {
		const thisBatch = batches[n];
		const batchResults = await Promise.all(thisBatch.map(asyncMapFn));
		/**
		 * TODO: maybe preferable to log on time-based intervals? As-is, with small
		 * batch sizes and large numbers of items, can get very noisy.
		 */
		console.log(`${batchSize * (n + 1)} / ${arrayToBatch.length} completed...`);
		results = results.concat(batchResults);
	}
	return results;
}

export default batchPromises;
