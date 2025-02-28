import { Ok, Err, errorResultToString } from '@utils/result'
import docsPathsAllVersions from '@api/docsPathsAllVersions.json'
import { getProductVersion } from './contentVersions'

export const getDocsPaths = async (
	productSlugs: string[],
	docsPathsData: typeof docsPathsAllVersions = docsPathsAllVersions,
) => {
	const paths = productSlugs
		.map((productSlug: string) => {
			const latestProductVersion = getProductVersion(productSlug, 'latest')

			if (!latestProductVersion.ok) {
				console.error(errorResultToString('API', latestProductVersion))
				return new Response('Not found', { status: 404 })
			}

			if (docsPathsData[productSlug]) {
				return docsPathsData[productSlug][latestProductVersion.value]
			}
			console.error(`Product, ${productSlug}, not found in docs paths`)
			return []
		})
		.flat()

	if (paths !== undefined && paths.length > 0) {
		return Ok(paths)
	}
	return Err('All docs paths not found')
}
