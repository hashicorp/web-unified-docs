import { readFile, parseJsonc } from '@utils/file'

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

	// Determine the content directory based on the "product" (actually repo) slug
	if (!contentDirMap[productSlug]) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)

		return new Response('Not found', { status: 404 })
	}

	// TODO: this is just the base case for TFDC
	// we also need to handle ptfe-releases, etc
	const filePath = ['content', `${productSlug}`, 'redirects.jsonc']
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
