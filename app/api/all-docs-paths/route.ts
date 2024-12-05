import { errorResultToString, Ok, Err } from '@utils/result'
import { getProductVersion } from '@utils/contentVersions'
import { ALL_REPO_CONFIG } from '../../../scripts/migrate-content/repo-config.mjs'
import fs from 'fs'
import path from 'path'

// TODO: add this as part of productConfig https://app.asana.com/0/1207899860738460/1208799860712577/f
const terraformDocs = [
	'ptfe-releases',
	'terraform-cdk',
	'terraform-docs-agents',
	'terraform-docs-common',
	'terraform-plugin-framework',
	'terraform-plugin-log',
	'terraform-plugin-mux',
	'terraform-plugin-sdk',
	'terraform-plugin-testing',
]

function getAllContentApiPaths(directory: string, productSlug: string) {
	const apiPaths = []
	// TODO: add this as part of productConfig https://app.asana.com/0/1207899860738460/1208799860712577/f
	const productName = terraformDocs.includes(productSlug)
		? 'terraform'
		: productSlug === 'hcp-docs'
			? 'hcp'
			: productSlug

	function traverseDirectory(currentPath: string, relativePath: string = '') {
		const items = fs.readdirSync(currentPath)

		items.forEach((item: string) => {
			const itemPath = path.join(currentPath, item)
			const itemRelativePath = path.join(relativePath, item)
			const stat = fs.statSync(itemPath)

			if (stat.isDirectory()) {
				traverseDirectory(itemPath, itemRelativePath)
			} else {
				const itemName = item.split('.')[0]

				if (itemName === 'index') {
					apiPaths.push({
						path: path.join(productName, relativePath),
						created_at: stat.mtime,
					})
					return
				}

				apiPaths.push({
					path: path.join(productName, relativePath, itemName),
					created_at: stat.mtime,
				})
			}
		})
	}

	traverseDirectory(directory)

	return apiPaths
}

export const getAllDocsPaths = async () => {
	const UDRDocsData = Object.keys(ALL_REPO_CONFIG)
		.map((productSlug: string) => {
			const latestProductVersion = getProductVersion(productSlug, 'latest')
			if (!latestProductVersion.ok) {
				console.error(errorResultToString('API', latestProductVersion))
				return new Response('Not found', { status: 404 })
			}

			const contentPath = path.join(
				'./content',
				productSlug,
				latestProductVersion.value,
				ALL_REPO_CONFIG[productSlug].contentDir,
			)

			const allPaths = getAllContentApiPaths(contentPath, productSlug)

			return allPaths
		})
		.flat()

	const getContentAPIDocsData = await fetch(
		'https://content.hashicorp.com/api/all-docs-paths',
	)
	const { result: contentAPIDocsData } = await getContentAPIDocsData.json()

	// Filter the result from the content API to take out the duplication paths between
	// the content API and UDR
	const filteredContentAPIDocsData = contentAPIDocsData.filter(
		(item: { path: string; created_at: string }) => {
			return !UDRDocsData.find(
				(URDItem: { path: string; created_at: string }) => {
					return URDItem.path === item.path
				},
			)
		},
	)

	const allDocsData = [...filteredContentAPIDocsData, ...UDRDocsData]
	if (allDocsData !== undefined && allDocsData.length > 0) {
		return Ok(allDocsData)
	}

	return Err('All docs paths not found')
}

export async function GET() {
	const docsPaths = await getAllDocsPaths()

	if (!docsPaths.ok) {
		console.error(errorResultToString('API', docsPaths))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({
		result: docsPaths.value,
	})
}
