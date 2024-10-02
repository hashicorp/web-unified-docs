import { Command } from 'commander'
import { diffLinesUnified, diff } from 'jest-diff'
import stripAnsi from 'strip-ansi'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const versionMetadataPath = path.resolve(
	__dirname,
	'../../app/api/versionMetadata.json'
)
const versionMetadata = JSON.parse(
	fs.readFileSync(versionMetadataPath, 'utf-8')
)

const program = new Command()

program
	.option('-n, --new-api-url <url>', 'New API URL')
	.option('-o, --old-api-url <url>', 'Old API URL')
	.option('-v, --version <version>', 'Version')
	.option('-p, --product <product>', 'Product')
	.option(
		'-a, --api <api>',
		'API type: "content", "nav-data", "version-metadata", or "content-versions"',
		'content'
	)
	.option(
		'-d, --diff <type>',
		'Diff type for API type "content": "metadata", "markdown", or "everything"',
		'markdown'
	)
	.option('-r, --drop-keys <keys>', 'Result keys to drop', (value) =>
		value.split(',')
	)
	.option('-t, --num-of-tests <number>', 'Number of tests', parseInt)
	.option('-s, --save-output', 'Save output', false)

program.parse(process.argv)
const options = program.opts()

const mainContentDirectory = './content'

const contentDirMap = {
	boundary: 'content',
	consul: 'content',
	'hcp-docs': 'content',
	nomad: 'content',
	packer: 'content',
	'ptfe-releases': 'docs',
	sentinel: 'content',
	terraform: 'docs',
	'terraform-cdk': 'docs',
	'terraform-docs-agents': 'docs',
	'terraform-docs-common': 'docs',
	'terraform-plugin-framework': 'docs',
	'terraform-plugin-log': 'docs',
	'terraform-plugin-mux': 'docs',
	'terraform-plugin-sdk': 'docs',
	'terraform-plugin-testing': 'docs',
	vagrant: 'content',
	vault: 'content',
	waypoint: 'content',
}

function getAllContentApiPaths(directory) {
	const apiPaths = []

	function traverseDirectory(currentPath, relativePath = '') {
		const items = fs.readdirSync(currentPath)

		items.forEach((item) => {
			const itemPath = path.join(currentPath, item)
			const itemRelativePath = path.join(relativePath, item)
			const stat = fs.statSync(itemPath)

			if (stat.isDirectory()) {
				traverseDirectory(itemPath, itemRelativePath)
			} else {
				const itemName = item.split('.')[0]

				if (itemName === 'index') {
					apiPaths.push(relativePath)
					return
				}

				apiPaths.push(path.join(relativePath, itemName))
			}
		})
	}

	traverseDirectory(directory)

	return apiPaths
}

for (const [product, versions] of Object.entries(versionMetadata)) {
	if (options.product && options.product !== product) {
		continue
	}

	for (const versionMetadata of versions) {
		if (options.version && options.version !== versionMetadata.version) {
			continue
		}

		if (options.api === 'version-metadata') {
			const newApiURL = `${options.newApiUrl}/api/content/${product}/version-metadata`
			const oldApiURL = `${options.oldApiUrl}/api/content/${product}/version-metadata?partial=true`

			const newApiResponse = await fetch(newApiURL)
			const oldApiResponse = await fetch(oldApiURL)

			const newApiData = await newApiResponse.json()
			const oldApiData = await oldApiResponse.json()

			const diffOptions = {
				contextLines: 1,
				expand: false,
			}

			const newApiDataStrings = JSON.stringify(
				newApiData.result,
				null,
				2
			).split('\n')
			const oldApiDataStrings = JSON.stringify(
				oldApiData.result,
				null,
				2
			).split('\n')

			const difference = diffLinesUnified(
				oldApiDataStrings,
				newApiDataStrings,
				diffOptions
			)

			const outputString = `Testing API URL:\n${newApiURL}\n${difference}`

			console.log(outputString)
			if (options.saveOutput) {
				const outputFileDirPath = path.join(__dirname, 'test-output')

				if (!fs.existsSync(outputFileDirPath)) {
					fs.mkdirSync(outputFileDirPath)
				}

				const apiURLFileName = newApiURL.replace(/\//g, '_').replace(/:/g, '-')
				const outputFile = path.join(outputFileDirPath, `${apiURLFileName}.txt`)

				const strippedOutputString = stripAnsi(outputString)
				fs.writeFileSync(outputFile, strippedOutputString)
			}

			break
		} else if (options.api === 'nav-data') {
			const newApiURL = `${options.newApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}`
			const oldApiURL = `${options.oldApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}`

			const newApiResponse = await fetch(newApiURL)
			const oldApiResponse = await fetch(oldApiURL)

			const newApiData = await newApiResponse.json()
			const oldApiData = await oldApiResponse.json()

			const diffOptions = {
				contextLines: 1,
				expand: false,
			}

			const newApiDataStrings = JSON.stringify(
				newApiData.result,
				null,
				2
			).split('\n')
			const oldApiDataStrings = JSON.stringify(
				oldApiData.result,
				null,
				2
			).split('\n')

			const difference = diffLinesUnified(
				oldApiDataStrings,
				newApiDataStrings,
				diffOptions
			)

			const outputString = `Testing API URL:\n${newApiURL}\n${difference}`

			console.log(outputString)
			if (options.saveOutput) {
				const outputFileDirPath = path.join(__dirname, 'test-output')

				if (!fs.existsSync(outputFileDirPath)) {
					fs.mkdirSync(outputFileDirPath)
				}

				const apiURLFileName = newApiURL.replace(/\//g, '_').replace(/:/g, '-')
				const outputFile = path.join(outputFileDirPath, `${apiURLFileName}.txt`)

				const strippedOutputString = stripAnsi(outputString)
				fs.writeFileSync(outputFile, strippedOutputString)
			}

			break
		} else if (options.api === 'content') {
			const productContentDir = contentDirMap[product]
			const contentPath = path.join(
				mainContentDirectory,
				product,
				versionMetadata.version,
				productContentDir
			)

			if (!fs.existsSync(contentPath)) {
				console.log(`Directory ${contentPath} does not exist`)
				continue
			}

			const apiPaths = getAllContentApiPaths(contentPath)

			const randomIndexes = []
			const numOfRandomIndexes =
				Math.min(options.numOfTests, apiPaths.length) || 1

			// let apiPathsLeft = [...apiPaths];
			while (randomIndexes.length < numOfRandomIndexes) {
				const randomIndex = Math.floor(Math.random() * apiPaths.length)

				// apiPathsLeft.splice(randomIndex, 1);
				if (!randomIndexes.includes(randomIndex)) {
					randomIndexes.push(randomIndex)
				}
			}

			for (let i = 0; i < randomIndexes.length; i++) {
				const randomIndex = randomIndexes[i]
				const apiURL = `/api/content/${product}/doc/${versionMetadata.version}/${apiPaths[randomIndex]}`

				const newApiURL = `${options.newApiUrl}${apiURL}`
				const oldApiURL = `${options.oldApiUrl}${apiURL}`

				let newApiResponse
				let oldApiResponse
				try {
					newApiResponse = await fetch(newApiURL)
					oldApiResponse = await fetch(oldApiURL)

					if (!newApiResponse.ok || !oldApiResponse.ok) {
						console.log(
							`Error fetching API URL:\n${newApiURL}\n${newApiResponse.statusText}`
						)
						continue
					}
				} catch (error) {
					console.log(`Error fetching API URL:\n${apiURL}\n${error}`)
					continue
				}

				let newApiData
				let oldApiData
				try {
					newApiData = await newApiResponse.json()
					oldApiData = await oldApiResponse.json()
				} catch (error) {
					console.log(`Error decoding JSON for URL:\n${apiURL}\n${error}`)
					continue
				}

				const diffOptions = {
					contextLines: 1,
					expand: false,
				}

				let difference
				if (options.diff === 'everything') {
					const newApiDataStrings = JSON.stringify(
						newApiData.result,
						null,
						2
					).split('\n')
					const oldApiDataStrings = JSON.stringify(
						oldApiData.result,
						null,
						2
					).split('\n')

					difference = diff(oldApiDataStrings, newApiDataStrings, diffOptions)
				} else if (options.diff === 'metadata') {
					const {
						// eslint-disable-next-line no-unused-vars
						markdownSource: _newApiMarkdownSource,
						...newApiDataWithoutMarkdown
					} = newApiData.result
					const {
						// eslint-disable-next-line no-unused-vars
						markdownSource: _oldApiMarkdownSource,
						...oldApiDataWithoutMarkdown
					} = oldApiData.result

					const newApiDataStrings = JSON.stringify(
						newApiDataWithoutMarkdown,
						null,
						2
					).split('\n')
					const oldApiDataStrings = JSON.stringify(
						oldApiDataWithoutMarkdown,
						null,
						2
					).split('\n')

					difference = diff(oldApiDataStrings, newApiDataStrings, diffOptions)
				} else if (options.diff === 'markdown') {
					const newApiDataStrings = newApiData.result.markdownSource.split('\n')
					// .map((line, index) => `${index + 1}: ${line}`) // Add line numbers
					const oldApiDataStrings = oldApiData.result.markdownSource.split('\n')
					// .map((line, index) => `${index + 1}: ${line}`) // Add line numbers

					difference = diffLinesUnified(
						oldApiDataStrings,
						newApiDataStrings,
						diffOptions
					)
				}

				const outputString = `Test ${i + 1} of ${
					randomIndexes.length
				}; Testing API URL:\n${apiURL}\n${difference}`

				console.log(outputString)

				if (options.saveOutput) {
					const outputFileDirPath = path.join(__dirname, 'test-output')

					if (!fs.existsSync(outputFileDirPath)) {
						fs.mkdirSync(outputFileDirPath)
					}

					const apiURLFileName = apiURL.replace(/\//g, '_').replace(/:/g, '-')
					const outputFile = path.join(
						outputFileDirPath,
						`${apiURLFileName}.txt`
					)

					const strippedOutputString = stripAnsi(outputString)
					fs.writeFileSync(outputFile, strippedOutputString)
				}
			}
		}

		break
	}

	break
}
