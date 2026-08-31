/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import flatMap from 'unist-util-flatmap'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

const CDN_URL_PLACEHOLDER = '{{CDN_URL}}'

const getSelfUrl = () => {
	return process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: `http://localhost:${process.env.UNIFIED_DOCS_PORT}`
}

/**
 * Derives the public assets base URL for a given entry.
 *
 * Versioned products:   ${selfUrl}/assets/<product>/<version>
 * Unversioned products: ${selfUrl}/assets/<product>
 *
 * @param {string} repoSlug - The product key, e.g. "terraform-plugin-log"
 * @param {string} version - The raw version string, e.g. "v0.4.x" or "" for unversioned
 * @returns {string} - e.g. "http://localhost:3000/assets/terraform-plugin-log/v0.4.x"
 */
const getAssetsBaseUrl = (repoSlug, version) => {
	const selfUrl = getSelfUrl()
	const isVersioned = PRODUCT_CONFIG[repoSlug]?.versionedDocs
	const versionSegment = isVersioned && version ? `/${version}` : ''
	return `${selfUrl}/assets/${repoSlug}${versionSegment}`
}

/**
 * Remark plugin that rewrites markdown link and definition URLs containing
 * {{CDN_URL}} to resolved public asset URLs.
 *
 * {{CDN_URL}} is replaced with `${selfUrl}/assets/<product>[/<version>]`,
 * where version is only included for products with versionedDocs: true.
 *
 * @param {Object} options
 * @param {Object} options.entry - The file entry object from the MDX transform pipeline.
 * @param {string} options.entry.repoSlug - The product key, e.g. "terraform-plugin-log"
 * @param {string} options.entry.version - The version string, e.g. "v0.4.x" or "" for unversioned
 */
export const rewriteCdnUrlPlugin = ({ entry }) => {
	const { repoSlug, version } = entry
	return function transformer(tree) {
		const assetsBaseUrl = getAssetsBaseUrl(repoSlug, version)
		return flatMap(tree, (node) => {
			if (
				(node.type === 'link' || node.type === 'definition') &&
				typeof node.url === 'string' &&
				node.url.includes(CDN_URL_PLACEHOLDER)
			) {
				node.url = node.url.replace(CDN_URL_PLACEHOLDER, assetsBaseUrl)
			}
			return [node]
		})
	}
}

export const transformRewriteCdnUrl = async (content, entry) => {
	const document = await remark()
		.use(remarkMdx)
		.use(rewriteCdnUrlPlugin, { entry })
		.process(content)
	return document.contents
}
