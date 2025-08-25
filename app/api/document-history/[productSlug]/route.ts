/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductVersionMetadata } from '@utils/contentVersions'
import docsPathsAllVersions from '@api/docsPathsAllVersions.json'
import { ProductParam } from '@api/types'
import { findFileWithMetadata, parseJsonc } from '@utils/file'
import { pathToRegexp } from 'path-to-regexp'

export type GetParams = ProductParam & {
	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	docsPath: string[]
}
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug, docsPath } = params
	const { ok, value: versionMetadata } = getProductVersionMetadata(
		productSlug,
		'latest',
	)

	if (!ok) {
		return new Response('Not found', { status: 404 })
	}
	const { value: redirectsJson } = await findFileWithMetadata(
		['content', productSlug, versionMetadata.version, 'redirects.jsonc'],
		versionMetadata,
	)
	const { value: redirects } = parseJsonc(redirectsJson)

	const productInfo = docsPathsAllVersions[productSlug]
	const [redirect] = redirects
		.map(({ source, destination }: { source: string; destination: string }) => {
			const url = destination.startsWith('https://')
				? new URL(destination).pathname
				: destination
			return {
				source: pathToRegexp(source),
				destination: pathToRegexp(url),
			}
		})
		.filter(
			({ source, destination }: { source: RegExp; destination: RegExp }) => {
				return [source, destination].some((re: RegExp) => {
					return re.test('/' + [productSlug, ...docsPath].join('/'))
				})
			},
		)

	const matchedPaths = Object.entries(productInfo).flatMap(
		([, paths]: [string, { path: string }[]]) => {
			return paths
				.filter(({ path }: { path: string }) => {
					// Use the source of the direct to find old locations
					return (
						redirect.source.test(path) &&
						// We don't care about the current path, so let's exlude that
						path !== ['/', productSlug, ...docsPath].join('/') &&
						// We don't care about paths that match the destination either
						!redirect.destination.test(path)
					)
				})
				.map(({ path }: { path: string }) => {
					return path
				})
		},
	)
	return Response.json(matchedPaths)
}
