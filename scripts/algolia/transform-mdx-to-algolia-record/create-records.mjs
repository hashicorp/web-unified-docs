import { PRODUCT_CONFIG } from '../../../app/utils/productConfig.mjs'
import { collectHeadings } from './headings/collect-headings.mjs'
import { collectCodeListItems } from './code-list-items/collect-code-list-items.mjs'

export async function createAlgoliaRecordObject(
	markdownFile,
	frontmatter,
	filePath,
) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	}

	const docsPath = filePath.split('/docs/')[1].replace('.mdx', '')
	const repoDir = filePath.split('content/')[1].split('/')[0]
	const productSlug = PRODUCT_CONFIG[repoDir].productSlug

	const objectID = `docs_${productSlug}/${docsPath}`
	const headings = await collectHeadings(markdownFile)
	const codeListItems = await collectCodeListItems(markdownFile)

	return {
		objectID,
		page_title: frontmatter.page_title,
		type: 'docs',
		products: [productSlug],
		description: frontmatter.description ?? '',
		headings,
		codeListItems,
		_tags: [repoDir],
	}
}
