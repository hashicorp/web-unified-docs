/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */
import { readFile } from 'fs/promises'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = {
	/**
	 * Unique identifier for the document to be retrieved.
	 */
	id?: string
}

export async function GET(_: Request, { params }: { params: GetParams }) {
	const { id } = params
	if (!id) {
		return new Response('Document ID is required', { status: 400 })
	}
	const fileContents = await readFile(
		'./app/api/docsPathsAllVersions.json',
		'utf8',
	)
	const allDocsVersions = JSON.parse(fileContents)

	const docVersions = Object.values(allDocsVersions)
		.flatMap((versionGroup) => {
			return Object.entries(versionGroup).flatMap(([version, files]) => {
				return files.map(({ id: documentId, path }) => {
					return { version, documentId, path }
				})
			})
		})
		.filter(({ documentId }) => {
			return documentId === id
		})
		.map(({ version, path }) => {
			return [version, path]
		})

	return Response.json(docVersions, { status: 200 })
}
