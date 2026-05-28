/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

const SITE_BASE = 'https://developer.hashicorp.com'

/**
 * Display name overrides keyed by productSlug.
 */
const PRODUCT_DISPLAY_NAMES = {
	boundary: 'Boundary',
	consul: 'Consul',
	hcp: 'HCP',
	nomad: 'Nomad',
	packer: 'Packer',
	sentinel: 'Sentinel',
	terraform: 'Terraform',
	vagrant: 'Vagrant',
	vault: 'Vault',
	'well-architected-framework': 'Well-Architected Framework',
}

/**
 * Display name overrides for sub-products, keyed by "{productSlug}/{basePath}".
 */
const SUB_PRODUCT_DISPLAY_NAMES = {
	// Consul
	'consul/api-docs': 'Consul API',
	'consul/commands': 'Consul Commands',
	'consul/docs': 'Consul',
	// Nomad
	'nomad/api-docs': 'Nomad API',
	'nomad/commands': 'Nomad Commands',
	'nomad/docs': 'Nomad',
	'nomad/intro': 'Introduction to Nomad',
	'nomad/plugins': 'Nomad Plugins',
	'nomad/tools': 'Nomad Tools',
	// Packer
	'packer/docs': 'Packer',
	'packer/guides': 'Packer Guides',
	'packer/plugins': 'Packer Plugins',
	// Terraform
	'terraform/enterprise': 'Terraform Enterprise',
	'terraform/cloud-docs': 'HCP Terraform',
	'terraform/cloud-docs/agents': 'HCP Terraform Agents',
	'terraform/cli': 'Terraform CLI',
	'terraform/language': 'Terraform Language',
	'terraform/internals': 'Terraform Internals',
	'terraform/intro': 'Introduction to Terraform',
	'terraform/cdktf': 'CDK for Terraform',
	'terraform/mcp-server': 'Terraform MCP Server',
	'terraform/migrate': 'Terraform Migrate',
	'terraform/docs': 'Terraform General',
	'terraform/plugin': 'Terraform Plugin Development',
	'terraform/registry': 'Terraform Registry',
	'terraform/plugin/framework': 'Terraform Plugin Framework',
	'terraform/plugin/log': 'Terraform Plugin Log',
	'terraform/plugin/mux': 'Terraform Plugin Mux',
	'terraform/plugin/sdkv2': 'Terraform Plugin SDK',
	'terraform/plugin/testing': 'Terraform Plugin Testing',
	// Vagrant
	'vagrant/docs': 'Vagrant',
	'vagrant/intro': 'Introduction to Vagrant',
	'vagrant/vagrant-cloud': 'Vagrant Cloud',
	'vagrant/vmware': 'Vagrant VMware',
	// Vault
	'vault/api-docs': 'Vault API',
	'vault/docs': 'Vault',
}

/**
 * Recursively collect all leaf entries (with a path) from a nav tree.
 */
export function collectEntries(routes) {
	const entries = []
	for (const item of routes) {
		if (item.hidden) {
			continue
		}
		if (!item.title) {
			continue
		}
		if (item.routes) {
			entries.push(...collectEntries(item.routes))
		} else if (item.path != null) {
			entries.push({ title: item.title, path: item.path })
		}
	}
	return entries
}

/**
 * Resolve the URL base path for a given nav data file.
 */
export function resolveBasePath(navFileName, config) {
	const navBasePath = navFileName.replace(/-nav-data\.json$/, '')
	const { basePaths, navDataPath } = config

	if (basePaths && basePaths.length === 1) {
		return basePaths[0]
	}
	if (basePaths && basePaths.includes(navBasePath)) {
		return navBasePath
	}
	if (navDataPath) {
		return navDataPath
	}
	return navBasePath
}

/**
 * Find the latest version for a versioned product.
 */
function findLatestVersion(contentDir, repoSlug, versionMetadata) {
	if (versionMetadata?.[repoSlug]) {
		const latest = versionMetadata[repoSlug].find((v) => {
			return v.isLatest
		})
		if (latest) {
			return latest.version
		}
	}
	const productDir = path.join(contentDir, repoSlug)
	if (!fs.existsSync(productDir)) {
		return null
	}
	const dirs = fs
		.readdirSync(productDir)
		.filter((d) => {
			return fs.statSync(path.join(productDir, d)).isDirectory()
		})
		.sort()
	return dirs.at(-1) || null
}

/**
 * Generate llms.txt markdown for a single sub-product (one basePath).
 */
export function generateSubProductLlmsTxt(
	name,
	productSlug,
	basePath,
	navDataFiles,
) {
	const lines = []
	lines.push(`# ${name} Documentation`)
	lines.push('')
	lines.push(`> Documentation for ${name}.`)
	lines.push('')

	for (const { navData } of navDataFiles) {
		const urlBase = `${SITE_BASE}/${productSlug}/${basePath}`

		for (const item of navData) {
			if (item.heading) {
				continue
			}

			if (!item.routes && item.path != null && item.title && !item.hidden) {
				const url = item.path === '' ? urlBase : `${urlBase}/${item.path}`
				lines.push(`- [${item.title}](${url})`)
				continue
			}

			if (item.routes && item.title) {
				lines.push(`## ${item.title}`)
				lines.push('')
				for (const entry of collectEntries(item.routes)) {
					lines.push(`- [${entry.title}](${urlBase}/${entry.path})`)
				}
				lines.push('')
			}
		}
	}

	return lines.join('\n')
}

/**
 * Generate a product-level index llms.txt that links to sub-product files.
 */
export function generateProductIndexLlmsTxt(
	productName,
	productSlug,
	subProducts,
) {
	const lines = []
	lines.push(`# ${productName} Documentation`)
	lines.push('')
	lines.push(`> Documentation for ${productName}.`)
	lines.push('')
	lines.push('## Sections')
	lines.push('')

	for (const { name, basePath } of subProducts) {
		const url = `${SITE_BASE}/${productSlug}/${basePath}/llms.txt`
		lines.push(`- [${name}](${url}): Documentation for ${name}`)
	}
	lines.push('')

	return lines.join('\n')
}

/**
 * Generate the root-level llms.txt that links to all product indexes.
 */
export function generateRootLlmsTxt(productSlugs) {
	const lines = []
	lines.push('# HashiCorp Developer Documentation')
	lines.push('')
	lines.push(
		'> HashiCorp provides infrastructure automation software for multi-cloud environments.',
	)
	lines.push('')
	lines.push('## Products')
	lines.push('')

	for (const slug of productSlugs) {
		const name = PRODUCT_DISPLAY_NAMES[slug] || slug
		lines.push(
			`- [${name}](${SITE_BASE}/${slug}/llms.txt): Documentation for ${name}`,
		)
	}
	lines.push('')

	return lines.join('\n')
}

/**
 * Generate llms.txt files for all products.
 *
 * - Single-basePath products: one llms.txt with all page links
 * - Multi-basePath products: an index llms.txt + one llms.txt per basePath
 * - Root llms.txt linking to all products
 */
export async function buildLlmsTxt(contentDir, contentDirOut, versionMetadata) {
	// Collect nav data grouped by productSlug → basePath
	// { [productSlug]: { [basePath]: navDataFile[] } }
	const products = {}

	for (const [repoSlug, config] of Object.entries(PRODUCT_CONFIG)) {
		let dataDir

		if (config.versionedDocs === false) {
			dataDir = path.join(contentDir, repoSlug, 'data')
		} else {
			const version = findLatestVersion(contentDir, repoSlug, versionMetadata)
			if (!version) {
				continue
			}
			dataDir = path.join(contentDir, repoSlug, version, 'data')
		}

		if (!fs.existsSync(dataDir)) {
			continue
		}

		const navFiles = fs.readdirSync(dataDir).filter((f) => {
			return f.endsWith('-nav-data.json')
		})

		if (navFiles.length === 0) {
			continue
		}

		const { productSlug } = config
		if (!products[productSlug]) {
			products[productSlug] = {}
		}

		for (const navFile of navFiles) {
			const basePath = resolveBasePath(navFile, config)
			if (!products[productSlug][basePath]) {
				products[productSlug][basePath] = []
			}
			products[productSlug][basePath].push({
				navData: JSON.parse(
					fs.readFileSync(path.join(dataDir, navFile), 'utf-8'),
				),
			})
		}
	}

	// Generate files
	const productSlugs = []
	let fileCount = 0

	for (const [productSlug, basePaths] of Object.entries(products)) {
		const productName = PRODUCT_DISPLAY_NAMES[productSlug] || productSlug
		const basePathKeys = Object.keys(basePaths)
		productSlugs.push(productSlug)

		if (basePathKeys.length === 1) {
			// Single basePath — flat file with all links
			const basePath = basePathKeys[0]
			const name =
				SUB_PRODUCT_DISPLAY_NAMES[`${productSlug}/${basePath}`] || productName
			const content = generateSubProductLlmsTxt(
				name,
				productSlug,
				basePath,
				basePaths[basePath],
			)

			const outputDir = path.join(contentDirOut, productSlug)
			fs.mkdirSync(outputDir, { recursive: true })
			fs.writeFileSync(path.join(outputDir, 'llms.txt'), content, 'utf-8')
			fileCount++

			console.log(
				`  ${productSlug}/llms.txt (${Buffer.byteLength(content)} bytes)`,
			)
		} else {
			// Multi basePath — index + sub-product files
			const subProducts = basePathKeys.map((bp) => {
				return {
					name:
						SUB_PRODUCT_DISPLAY_NAMES[`${productSlug}/${bp}`] ||
						`${productName} ${bp
							.split('/')
							.pop()
							.split('-')
							.map((w) => {
								return w[0].toUpperCase() + w.slice(1)
							})
							.join(' ')}`,
					basePath: bp,
				}
			})

			// Write index
			const indexContent = generateProductIndexLlmsTxt(
				productName,
				productSlug,
				subProducts,
			)
			const productDir = path.join(contentDirOut, productSlug)
			fs.mkdirSync(productDir, { recursive: true })
			fs.writeFileSync(path.join(productDir, 'llms.txt'), indexContent, 'utf-8')
			fileCount++

			console.log(
				`  ${productSlug}/llms.txt (index, ${Buffer.byteLength(indexContent)} bytes)`,
			)

			// Write each sub-product
			for (const { name, basePath } of subProducts) {
				const content = generateSubProductLlmsTxt(
					name,
					productSlug,
					basePath,
					basePaths[basePath],
				)

				const subDir = path.join(contentDirOut, productSlug, basePath)
				fs.mkdirSync(subDir, { recursive: true })
				fs.writeFileSync(path.join(subDir, 'llms.txt'), content, 'utf-8')
				fileCount++

				console.log(
					`  ${productSlug}/${basePath}/llms.txt (${Buffer.byteLength(content)} bytes)`,
				)
			}
		}
	}

	// Root llms.txt
	const rootContent = generateRootLlmsTxt(productSlugs)
	fs.writeFileSync(path.join(contentDirOut, 'llms.txt'), rootContent, 'utf-8')
	fileCount++
	console.log(`  llms.txt (root, ${Buffer.byteLength(rootContent)} bytes)`)

	console.log(`\nGenerated ${fileCount} llms.txt files.`)
}
