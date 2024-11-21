/* eslint-disable @typescript-eslint/no-unused-vars */
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import flatMap from 'unist-util-flatmap'
import is from 'unist-util-is'
import path from 'path'
import fs from 'fs'

import { URL } from 'url'
import * as pathToRegexp from 'path-to-regexp'
import { parseNetlifyRedirects } from '@hashicorp/netlify-to-nextjs-redirect-exporter'
import { isInternalUrl } from '../../utils/is-internal-url.mjs'

/**
 * Loads redirects from the file-system and "caches" them in memory.
 */
const cachedRedirects = {}
export const loadRedirects = async (version, redirectsDir) => {
	// Return the cached redirects if they are already present
	if (cachedRedirects[version]?.length > 0) {
		return cachedRedirects[version]
	}

	let redirectsSource = []

	// Attempt to load from redirects.js or redirects.next.js
	try {
		const redirectsPath = path.join(redirectsDir, 'redirects.js')
		const { default: imports } = await import(redirectsPath)
		if (Array.isArray(imports)) {
			redirectsSource = imports
		}
	} catch (err) {
		// noop
	}

	try {
		const redirectsPath = path.join(redirectsDir, 'redirects.next.js')
		if (redirectsSource.length === 0) {
			const { default: imports } = await import(redirectsPath)
			redirectsSource = imports
			if (Array.isArray(imports)) {
				redirectsSource = imports
			}
		}
	} catch (err) {
		// noop
	}

	// TODO: determine if this is needed
	// If neither are found, check for the netlify redirects file and parse that
	try {
		const netlifyRedirectsPath = path.join(redirectsDir, '_redirects')
		if (redirectsSource.length === 0 && fs.existsSync(netlifyRedirectsPath)) {
			const netlifyRedirects = fs.readFileSync(netlifyRedirectsPath, 'utf-8')
			let { redirects } = parseNetlifyRedirects(netlifyRedirects)

			// transform /* to /(.*) for path-to-regexp
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			redirects = redirects.map((e) => {
				return {
					...e,
					source: e.source.replace('/*', '/(.*)'),
				}
			})

			redirectsSource = redirects
		}
	} catch (err) {
		// noop
	}

	if (redirectsSource.length === 0) {
		return []
	}

	cachedRedirects[version] = redirectsSource.map((redirect, i, arr) => {
		const isExternalDestination = !redirect.destination.startsWith('/')
		const doesDestinationHaveTokens = redirect.destination.includes('/:')

		let destination = redirect.destination

		// External URLs can't be passed to pathToRegexp directly, so we have to parse the URL
		if (isExternalDestination) {
			if (doesDestinationHaveTokens) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		// If the matched destination has no tokens, we can just return it
		if (typeof matchedRedirect.destination === 'string') {
			return matchedRedirect.destination
		}

		// TS is not cooperating, so having to use typecasting here
		return matchedRedirect.destination(
			typeof matchedResult !== 'boolean' ? matchedResult.params : {},
		)
	}

	return false
}

/**
 * Remark plugin which accepts a list of redirects and applies them to any matching links
 */
const rewriteInternalRedirectsPlugin = ({ product, redirects }) => {
	return function transformer(tree) {
		return flatMap(tree, (node) => {
			if (!is(node, 'link') && !is(node, 'definition')) {
				return [node]
			}
			// Only check internal links
			if (
				node.url &&
				!node.url.startsWith('#') &&
				isInternalUrl(node.url, product)
			) {
				const urlToRedirect = node.url.startsWith('/')
					? node.url
					: new URL(node.url).pathname

				const redirectUrl = checkAndApplyRedirect(urlToRedirect, redirects)

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
	version,
	product,
	redirectsDir,
) => {
	const redirects = await loadRedirects(version, redirectsDir)
	const contents = await remark()
		.use(remarkMdx)
		.use(rewriteInternalRedirectsPlugin, {
			product,
			redirects,
		})
		.process(mdxString)
	return String(contents)
}
