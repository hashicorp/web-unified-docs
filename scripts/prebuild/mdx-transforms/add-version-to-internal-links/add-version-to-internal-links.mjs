/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import flatMap from 'unist-util-flatmap'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Rewrites internal links in a document tree to include version information.
 *
 * @param {Object} entry - The entry object containing file path information.
 * @param {Object} versionMetadata - Metadata containing version information for the product
 * @type VersionMetadata = Record<string, { version: string, releaseStage: "stable", isLatest: boolean }[]>
 * used to determine the latest version.
 *
 * @returns {Function} A transformer function that rewrites internal links in the document tree.
 */
export const rewriteInternalLinksPlugin = ({ entry, versionMetadata }) => {
	const relativePath = entry.filePath.split('content/')[1]
	/**
	 * product and version variables, which are assigned based on the
	 * specific indices those strings are expected to be in the filepath
	 */
	const [product, version] = relativePath.split('/')

	// Remove any release stage in parentheses)
	const cleanVersion = version.replace(/\s*\([^)]+\)/, '')

	if (PRODUCT_CONFIG[product].versionedDocs === false) {
		return
	}

	if (!versionMetadata[product]) {
		throw new Error(`No version metadata found for product: ${product}`)
	}
	const latestVersion = versionMetadata[product].find((version) => {
		return version.isLatest
	}).version
	const basePaths = PRODUCT_CONFIG[product].basePaths || []
	/**
	 * If the version in the filepath is the latest version or
	 * no base paths exist for the product, then skip rewriting internal links
	 */
	if (cleanVersion === latestVersion || !Object.entries(basePaths).length) {
		return
	}
	/**
	 * ensures link does not start with http:// or https://
	 * matches relative paths, absolute paths starting with /
	 * and paths starting with /${product} followed by any of the base paths
	 * found in repo-config.mjs
	 */
	const isLinkToRewritePattern = new RegExp(
		`^(?!https?:\\/\\/|http:\\/\\/)(((\\.+\\/)*)|\\/|\\/${product}(?:\\/${basePaths.join('|')})?\\/)`,
	)
	// Creates a regex pattern to match and replace internal links based on the provided base paths.
	const replacePattern = new RegExp(`/(${basePaths.join('|')})(/)?`)

	return function transformer(tree) {
		// Transforms the syntax tree by rewriting internal links to include the version.
		return flatMap(tree, (node) => {
			// Check if the node is a link and matches the pattern for links to rewrite
			if (node.type === 'link' && isLinkToRewritePattern.test(node.url)) {
				// Replace the matched part of the URL with the versioned path
				node.url = node.url.replace(replacePattern, `/$1/${cleanVersion}$2`)
			}
			// Return the node (those with and without a versioned path)
			return [node]
		})
	}
}

/**
 * An object containing a transformer function to rewrite internal links in MDX content.
 */
export const transformRewriteInternalLinks = async (
	content,
	entry,
	versionMetadata,
) => {
	const document = await remark()
		.use(remarkMdx)
		.use(rewriteInternalLinksPlugin, {
			entry,
			versionMetadata,
		})
		.process(content)
	return document.contents
}
