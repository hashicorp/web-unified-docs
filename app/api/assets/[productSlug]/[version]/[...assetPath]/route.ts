import { getAssetData } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'

export type GetParams = {
	/**
	 * The product that docs are being requested for (i.e "terraform")
	 */
	productSlug: string

	/**
	 * Can be a semver version (i.e: `v10.0.1`) or a ptfe dated version (i.e: `v20220610-01`)
	 */
	version: string

	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	assetPath: string[]
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, assetPath } = params

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	const productVersionResult = getProductVersion(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: parsedVersion } = productVersionResult

	const parsedAssetPath = assetPath.join('/')

	const assetLoc = [`assets`, productSlug, parsedVersion, parsedAssetPath]
	const assetData = await getAssetData(assetLoc)

	if (!assetData.ok) {
		console.error(`API Error: No asset found at ${assetLoc}`)
		return new Response('Not found', { status: 404 })
	}

	// TODO: should we add caching headers?
	return new Response(assetData.value.buffer, {
		headers: {
			'Content-Type': assetData.value.contentType,
		},
	})
}
