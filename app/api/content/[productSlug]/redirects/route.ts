/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { getProductVersion } from '@utils/contentVersions'
import { readFile, parseJsonc } from '@utils/file'
import { errorResultToString } from '@utils/result'

const contentDirMap: Record<string, string> = {
	boundary: 'content',
	consul: 'content',
	'hcp-docs': 'content',
	nomad: 'content',
	packer: 'content',
	'terraform-enterprise': 'docs',
	sentinel: 'content',
	terraform: 'docs',
	'terraform-cdk': 'docs',
	'terraform-docs-agents': 'docs',
	'terraform-docs-common': 'docs',
	'terraform-plugin-framework': 'docs',
	'terraform-plugin-log': 'docs',
	'terraform-plugin-mux': 'docs',
	'terraform-plugin-sdk': 'docs',
	'terraform-plugin-testing': 'docs',
	vagrant: 'content',
	vault: 'content',
	waypoint: 'content',
}

export async function GET(
	request: Request,
	{ params }: { params: { productSlug: string } },
) {
	let product = params.productSlug

	if (product === 'ptfe-releases') {
		product = 'terraform-enterprise'
	}

	if (!contentDirMap[product]) {
		console.error(`API Error: Product, ${product}, not found in contentDirMap`)

		return new Response('Not found', { status: 404 })
	}

	// TODO: Move this to a better check once our repoConfig file is done
	let filePath = []
	if (product !== 'terraform-docs-common') {
		const productVersionResult = getProductVersion(product, 'latest')

		if (!productVersionResult.ok) {
			console.error(errorResultToString('API', productVersionResult))
			return new Response('Not found', { status: 404 })
		}

		filePath = [
			'content',
			product,
			productVersionResult.value,
			'redirects.jsonc',
		]
	} else {
		filePath = ['content', product, 'redirects.jsonc']
	}

	const readFileResult = await readFile(filePath)
	if (!readFileResult.ok) {
		return new Response('Not found', { status: 404 })
	}

	const redirects = parseJsonc(readFileResult.value)
	if (!redirects.ok) {
		console.error(
			`API Error: Product, ${product}, redirects.jsonc could not be parsed`,
		)

		return new Response('Server error', { status: 500 })
	}

	return new Response(JSON.stringify(redirects.value), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
