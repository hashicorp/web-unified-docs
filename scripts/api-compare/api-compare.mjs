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
		value.split(',').map((key) => key.trim())
	)
	.option('-t, --num-of-tests <number>', 'Number of tests', parseInt, 10)
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

function sortObjectByKeys(obj) {
	if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
		return Object.keys(obj)
			.sort()
			.reduce((result, key) => {
				result[key] = sortObjectByKeys(obj[key])
				return result
			}, {})
	} else if (Array.isArray(obj)) {
		return obj.map(sortObjectByKeys)
	}
	return obj
}

function saveTestOutputIfSelected(outputString, newApiURL) {
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
}

async function fetchApiTypeVersionAndNav(options, product, versionMetadata) {
	let newApiURL
	let oldApiURL

	if (options.api === 'version-metadata') {
		newApiURL = `${options.newApiUrl}/api/content/${product}/version-metadata`
		oldApiURL = `${options.oldApiUrl}/api/content/${product}/version-metadata?partial=true`
	} else if (options.api === 'nav-data') {
		newApiURL = `${options.newApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}`
		oldApiURL = `${options.oldApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}`
	}

	const newApiResponse = await fetch(newApiURL)
	const oldApiResponse = await fetch(oldApiURL)

	const newApiData = await newApiResponse.json()
	const oldApiData = await oldApiResponse.json()

	const newApiDataStrings = JSON.stringify(
		sortObjectByKeys(newApiData.result),
		null,
		2
	).split('\n')
	const oldApiDataStrings = JSON.stringify(
		sortObjectByKeys(oldApiData.result),
		null,
		2
	).split('\n')

	return { newApiDataStrings, oldApiDataStrings, newApiURL }
}

const testsPassed = []
const testsFailed = []
for (const [product, versions] of Object.entries(versionMetadata)) {
	if (options.product && options.product !== product) {
		continue
	}

	for (const versionMetadata of versions) {
		if (options.version && options.version !== versionMetadata.version) {
			continue
		}

		if (options.api === 'version-metadata' || options.api === 'nav-data') {
			const { newApiDataStrings, oldApiDataStrings, newApiURL } =
				await fetchApiTypeVersionAndNav(options, product, versionMetadata)

			const diffOptions = {
				contextLines: 1,
				expand: false,
			}

			const difference = diffLinesUnified(
				oldApiDataStrings,
				newApiDataStrings,
				diffOptions
			)

			const outputString = `Testing API URL:\n${newApiURL}\n${difference}`
			console.log(outputString)

			saveTestOutputIfSelected(outputString, newApiURL)
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

				if (options.dropKeys) {
					options.dropKeys.forEach((key) => {
						delete newApiData.result[key]
						delete oldApiData.result[key]
					})
				}

				let diffFunc
				let newApiDataStrings
				let oldApiDataStrings
				if (options.diff === 'everything') {
					newApiDataStrings = JSON.stringify(
						sortObjectByKeys(newApiData.result),
						null,
						2
					).split('\n')
					oldApiDataStrings = JSON.stringify(
						sortObjectByKeys(oldApiData.result),
						null,
						2
					).split('\n')

					diffFunc = diff
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

					newApiDataStrings = JSON.stringify(
						sortObjectByKeys(newApiDataWithoutMarkdown),
						null,
						2
					).split('\n')
					oldApiDataStrings = JSON.stringify(
						sortObjectByKeys(oldApiDataWithoutMarkdown),
						null,
						2
					).split('\n')

					diffFunc = diff
				} else if (options.diff === 'markdown') {
					newApiDataStrings = newApiData.result.markdownSource.split('\n')
					// .map((line, index) => `${index + 1}: ${line}`) // Add line numbers
					oldApiDataStrings = oldApiData.result.markdownSource.split('\n')
					// .map((line, index) => `${index + 1}: ${line}`) // Add line numbers

					diffFunc = diffLinesUnified
				}

				const difference = diffFunc(oldApiDataStrings, newApiDataStrings, {
					contextLines: 1,
					expand: false,
				})

				const outputString = `Test ${i + 1} of ${
					randomIndexes.length
				}; Testing API URL:\n${apiURL}`

				console.log(outputString)

				if (difference.includes('Compared values have no visual difference.')) {
					testsPassed.push(i + 1)
					console.log('✅ No visual difference found.\n')
				} else {
					testsFailed.push(i + 1)
					console.log(`${difference}\n`)
				}

				saveTestOutputIfSelected(outputString, newApiURL)
			}
		}

		break
	}

	break
}

if (options.api === 'content') {
	console.log(
		`Tests passed: ${testsPassed.length} of ${options.numOfTests} ${
			testsPassed.length === options.numOfTests ? '🎉' : ''
		}`
	)
}
