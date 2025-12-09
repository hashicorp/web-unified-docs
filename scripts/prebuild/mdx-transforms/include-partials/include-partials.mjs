/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

// Third-party
import remark from 'remark'
import remarkMdx from 'remark-mdx'
// Local
import { remarkIncludePartialsPlugin } from './remark-include-partials.mjs'

/**
 * Given an MDX file string, as well as a path to partials directory,
 * Return the MDX file string with all `@include` statements replaced with the
 * file contents of the referenced partials.
 *
 * If the partialsDir is not provided, or if any of the partials referenced
 * cannot be located, we will throw an error.
 *
 * @param {string} mdxString The MDX string in which `@include` partials will be processsed
 * @param {string} partialsDir The directory in which partials are located
 * @param {string} filePath The file path to the MDX file being processed, used to log errors.
 * @returns {string} the provided mdxString with partials inlined
 */
export async function includePartials(mdxString, partialsDir, filePath) {
	const contents = await remark()
		.use(remarkMdx)
		.use(remarkIncludePartialsPlugin, { partialsDir, filePath })
		.process(mdxString)
	return String(contents)
}
