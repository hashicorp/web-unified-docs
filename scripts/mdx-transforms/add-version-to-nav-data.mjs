import fs from 'node:fs'
import path from 'node:path'

const product = process.argv[2]

export async function addVersionToNavData() {
	if (!product.length) {
		throw new Error(
			`Please provide at least one repository slug as an argument. For example, to add version to Terraform nav data, you can run "node migrate-content.mjs terraform".`,
		)
	}

	const productDir = path.join(process.cwd(), 'content', product)
	console.log({ productDir })
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
								} else if (
									key === 'href' &&
									!obj[key].startsWith('http') &&
									obj[key] !== ''
								) {
									obj[key] = `${version}${obj[key]}`
								} else if (
									key === 'path' &&
									!obj[key].startsWith('http') &&
									obj[key] !== ''
								) {
									obj[key] = `${version}/${obj[key]}`
								}
							}
						}

						updatePaths(jsonData)
						console.log({ navData: jsonData })
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
