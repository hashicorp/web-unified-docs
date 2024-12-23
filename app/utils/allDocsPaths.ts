import { Ok, Err } from '@utils/result'
import docsPaths from '@api/docsPaths.json'

export const getDocsPaths = async (productSlugs: string[]) => {
	if (productSlugs.length === 0) {
		return Ok(Object.values(docsPaths).flat())
	}

	const paths = productSlugs
		.map((productSlug: string) => {
			if (docsPaths[productSlug]) {
				return docsPaths[productSlug]
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
