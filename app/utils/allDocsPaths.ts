import { Ok, Err } from '@utils/result'
import docsPaths from '@api/docsPaths.json'

type DocsPathsData = {
	[productSlug: string]: { path: string; created_at: string }[]
}

export const getDocsPaths = async (
	productSlugs: string[],
	docsPathsData: DocsPathsData = docsPaths,
) => {
	if (productSlugs.length === 0) {
		const paths = Object.values(docsPathsData).flat()
		if (paths !== undefined && paths.length > 0) {
			return Ok(paths)
		}
		return Err('All docs paths not found')
	}

	const paths = productSlugs
		.map((productSlug: string) => {
			if (docsPathsData[productSlug]) {
				return docsPathsData[productSlug]
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
