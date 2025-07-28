/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { PRODUCT_CONFIG } from '../../../app/utils/productConfig.mjs'
import { collectHeadings } from './headings/collect-headings.mjs'
import { collectCodeListItems } from './code-list-items/collect-code-list-items.mjs'
import { getProductDirectoryFromFilePath } from '../../utils/file-path/product-directory/index.mjs'

/**
 * @typedef {Object} FrontMatter
 * @property {string} page_title - The title of the page.
 * @property {string} description - The description of the page.
 * @property {string} [source] - The optional source of the page, e.g. terraform-docs-common
 */

/**
 * Creates an Algolia record object from the given markdown file and frontmatter.
 *
 * @param {string} markdownFile - The content of the markdown file.
 * @param {FrontMatter} frontmatter - The frontmatter metadata of the markdown file.
 * @param {string} filePath - The file path of the markdown file.
 * @returns {Promise<Object>} The Algolia record object.
 * @throws {Error} If the file path is empty.
 */
export async function createAlgoliaRecordObject(
	markdownFile,
	frontmatter,
	filePath,
) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	}

	/**
	 * extracts directory name from the file path
	 * filePath: 'public/content/terraform-enterprise/v202410-1/docs/enterprise/application-administration/github-app-integration.mdx'
	 * directory: 'terraform-enterprise'
	 */
	const directory = getProductDirectoryFromFilePath(filePath)
	/**
	 * uses directory name to get product slug in product config
	 */
	const productSlug = PRODUCT_CONFIG[directory].productSlug
	/**
	 * extracts file path from docs directory and removes .mdx extension
	 * filePath: 'public/content/terraform-enterprise/v202410-1/docs/enterprise/application-administration/github-app-integration.mdx'
	 * docsPath: 'enterprise/application-administration/github-app-integration'
	 */
	const contentDir = PRODUCT_CONFIG[directory].contentDir
	const docPath = filePath.split(`/${contentDir}/`)[1].replace('.mdx', '')

	const objectID = `docs_${productSlug}/${docPath}`
	const headings = await collectHeadings(markdownFile)
	const codeListItems = await collectCodeListItems(markdownFile)

	return {
		action: 'addObject',
		body: {
			objectID,
			page_title: frontmatter.page_title,
			type: 'docs',
			products: [productSlug],
			description: frontmatter.description ?? '',
			headings,
			codeListItems,
			_tags: [directory, 'web-unified-docs'],
		},
	}
}
