/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */
import path from 'node:path'
import { URL } from 'node:url'

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import flatMap from 'unist-util-flatmap'
import is from 'unist-util-is'

import * as pathToRegexp from 'path-to-regexp'

/**
 * Loads redirects from the file-system and "caches" them in memory.
 */
const cachedRedirects = {}
export const loadRedirects = async (version = 'default', redirectsDir) => {
	// Return the cached redirects if they are already present
	if (cachedRedirects[version]?.length > 0) {
		return cachedRedirects[version]
	}

	let redirectsSource = []

	// Attempt to load from redirects.js
	try {
		const redirectsPath = path.join(redirectsDir, 'redirects.js')
		const { default: imports } = await import(redirectsPath)
		if (Array.isArray(imports)) {
			redirectsSource = imports
		}
	} catch {
		// noop
	}

	if (redirectsSource.length === 0) {
		return []
	}

	cachedRedirects[version] = redirectsSource.map((redirect) => {
		const isExternalDestination = !redirect.destination.startsWith('/')
		const doesDestinationHaveTokens = redirect.destination.includes('/:')

		let destination = redirect.destination

		// External URLs can't be passed to pathToRegexp directly, so we have to parse the URL
		if (isExternalDestination) {
			if (doesDestinationHaveTokens) {
				destination = (params) => {
					const destUrl = new URL(redirect.destination)
					const destCompile = pathToRegexp.compile(destUrl.pathname)

					const newPath = destCompile(params)

					destUrl.pathname = newPath

					return destUrl.href
				}
			}
		} else {
			destination = pathToRegexp.compile(redirect.destination)
		}

		return {
			source: pathToRegexp.match(redirect.source),
			destination,
		}
	})

	return cachedRedirects[version]
}

/**
 * Checks for a matching redirect with the given URL and, if found,
 * applies the matching redirect.
 *
 * @param url URL to check for redirects with and apply to
 * @param redirects List of redirects which will be tested against the URL
 * @returns The redirected URL
 */
export const checkAndApplyRedirect = (url, redirects) => {
	let matchedResult = false
	let matchedRedirect

	redirects.some((redirect) => {
		matchedResult = redirect.source(url)
		if (matchedResult) {
			matchedRedirect = redirect
			return true
		}
	})

	if (matchedRedirect && matchedResult) {
		return matchedRedirect.destination(
			typeof matchedResult !== 'boolean' ? matchedResult.params : {},
		)
	}

	return false
}

/**
 * Remark plugin which accepts a list of redirects and applies them to any matching links
 */
export const rewriteInternalRedirectsPlugin = ({ redirects }) => {
	return function transformer(tree) {
		return flatMap(tree, (node) => {
			if (!is(node, 'link') && !is(node, 'definition')) {
				return [node]
			}
			// Only check internal links
			if (node.url && !node.url.startsWith('#') && node.url.startsWith('/')) {
				const redirectUrl = checkAndApplyRedirect(node.url, redirects)

				if (redirectUrl) {
					node.url = redirectUrl
				}
			}

			return [node]
		})
	}
}

/**
 * Loads the redirects defined in redirects.js or redirects.next.js and attempts to apply them to any
 * matching links in the document.
 */
export const transformRewriteInternalRedirects = async (
	mdxString,
	version = 'default',
	redirectsDir,
) => {
	const redirects = await loadRedirects(version, redirectsDir)
	const contents = await remark()
		.use(remarkMdx)
		.use(rewriteInternalRedirectsPlugin, {
			redirects,
		})
		.process(mdxString)
	return String(contents)
}
