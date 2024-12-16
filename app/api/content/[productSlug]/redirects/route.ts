import { getProductVersion } from '@utils/contentVersions'
import { readFile, parseJsonc } from '@utils/file'
import { errorResultToString } from '@utils/result'

const contentDirMap: Record<string, string> = {
	boundary: 'content',
	consul: 'content',
	'hcp-docs': 'content',
	nomad: 'content',
	packer: 'content',
	'ptfe-releases': 'docs',
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
	const { productSlug } = params

	if (!contentDirMap[productSlug]) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)

		return new Response('Not found', { status: 404 })
	}

	// TODO: Move this to a better check once our repoConfig file is done
	let filePath = []
	if (productSlug !== 'terraform-docs-common') {
		const productVersionResult = getProductVersion(productSlug, 'latest')

		if (!productVersionResult.ok) {
			console.error(errorResultToString('API', productVersionResult))
			return new Response('Not found', { status: 404 })
		}

		filePath = [
			'content',
			productSlug,
			productVersionResult.value,
			'redirects.jsonc',
		]
	} else {
		filePath = ['content', productSlug, 'redirects.jsonc']
	}

	const readFileResult = await readFile(filePath)
	if (!readFileResult.ok) {
		return new Response('Not found', { status: 404 })
	}

	const redirects = parseJsonc(readFileResult.value)
	if (!redirects.ok) {
		console.error(
			`API Error: Product, ${productSlug}, redirects.jsonc could not be parsed`,
		)

		return new Response('Server error', { status: 500 })
	}

	return new Response(JSON.stringify(redirects.value), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
