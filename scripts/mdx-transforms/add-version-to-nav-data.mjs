import fs from 'node:fs'
import path from 'node:path'

const product = process.argv[2]

// ${contentApiBaseUrl}/api/content/${product}/${fullPath}`
// api/content/terraform/nav-data/v1.8.x/cli
// nav node: <product>/<subpath>/<version>/path
// example: { "path": "graph" }

const terraformBasePaths = [
	'/cdktf',
	'/cli',
	'/cloud-docs',
	'/cloud-docs/agents',
	'/docs',
	'/enterprise',
	'/internals',
	'/intro',
	'/language',
	'/plugin',
	'/plugin/framework',
	'/plugin/log',
	'/plugin/mux',
	'/plugin/sdkv2',
	'/plugin/testing',
	'/registry',
	'/downloads',
]

// href allows linking outside of content subpath
// path is for content inside of subpath
export async function addVersionToNavData() {
	if (!product.length) {
		throw new Error(
			`Please provide at least one repository slug as an argument. For example, to add version to Terraform nav data, you can run "node migrate-content.mjs terraform".`,
		)
	}

	const productDir = path.join(process.cwd(), 'content', product)

	async function searchDirectory(directory) {
		let files
		try {
			files = await fs.promises.readdir(directory, { withFileTypes: true })
		} catch (err) {
			if (err.code === 'ENOENT') {
				console.error(`Directory not found: ${directory}`)
				return
			}
			throw err
		}

		for (const file of files) {
			const fullPathToFile = path.join(directory, file.name)

			if (file.isDirectory()) {
				// Only search in directories that match the pattern <version>/data
				const versionDataPattern = new RegExp(
					`^v\\d+\\.\\d+\\.x$|v[0-9]{6}-\\d+`,
					'i',
				)
				if (versionDataPattern.test(file.name)) {
					const dataDir = path.join(directory, file.name, 'data')

					await searchDirectory(dataDir)
				}
			} else if (file.isFile() && file.name.endsWith('nav-data.json')) {
				try {
					const data = await fs.promises.readFile(fullPathToFile, 'utf-8')
					const jsonData = JSON.parse(data)

					const versionMatch = fullPathToFile.match(
						/\/content\/[^/]+\/([^/]+)\/data\//,
					)
					if (versionMatch) {
						const version = versionMatch[1]

						// Update href or path properties
						const updatePaths = (obj) => {
							for (const key in obj) {
								if (typeof obj[key] === 'object') {
									updatePaths(obj[key])
								} else if (key === 'href' && !obj[key].startsWith('http')) {
									const basePath = terraformBasePaths.find((basePath) => {
										return obj[key].startsWith(basePath)
									})

									// if the href starts with a basepath, e.g. "/cli", add version after the basepath
									if (basePath && basePath.length) {
										obj[key] =
											`${basePath}/${version}${obj[key].substring(basePath.length)}`
									} else {
										obj[key] = `${version}${obj[key]}`
									}
								} else if (key === 'path') {
									obj[key] = `${version}/${obj[key]}`
									return
								}
							}
						}

						updatePaths(jsonData)

						// Write the updated JSON back to the file
						await fs.promises.writeFile(
							fullPathToFile,
							JSON.stringify(jsonData, null, 2),
							'utf-8',
						)
					}
				} catch (parseError) {
					console.error(
						`Error parsing JSON in file ${fullPathToFile}:`,
						parseError,
					)
				}
			}
		}
	}

	await searchDirectory(productDir)
}

await addVersionToNavData(product)
