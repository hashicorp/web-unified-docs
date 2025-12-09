/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { Command } from 'commander'
import { diffLinesUnified, diff } from 'jest-diff'
import { PRODUCT_CONFIG as contentDirMap } from '#productConfig.mjs'
import stripAnsi from 'strip-ansi'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const versionMetadataPath = path.resolve(
	__dirname,
	'../../app/api/versionMetadata.json',
)
const versionMetadata = JSON.parse(
	fs.readFileSync(versionMetadataPath, 'utf-8'),
)

const docsPathsAllVersionsPaths = path.resolve(
	__dirname,
	'../../app/api/docsPathsAllVersions.json',
)
const apiPaths = JSON.parse(fs.readFileSync(docsPathsAllVersionsPaths, 'utf-8'))

const program = new Command()

program
	.option(
		'-n, --new-api-url <url>',
		'New API URL',
		'https://web-unified-docs-hashicorp.vercel.app',
	)
	.option(
		'-o, --old-api-url <url>',
		'Old API URL',
		'https://content.hashicorp.com',
	)
	.option('-v, --version <version>', 'Version')
	.option('-p, --product <product>', 'Product')
	.option(
		'-a, --api <api>',
		'API type: "content", "nav-data", "version-metadata", "content-versions", or "all-docs-paths"',
		'version-metadata',
	)
	.option('-d, --drop-keys <keys>', 'Result keys to drop', (value) => {
		return value.split(',').map((key) => {
			return key.trim()
		})
	})
	.option('-s, --save-output', 'Save output', false)

program.parse(process.argv)
const options = program.opts()

const mainContentDirectory = './content'

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

const testsPassed = []
const testsFailed = []
const totalTests = []
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

			const newApiDataStrings = JSON.stringify(
				sortObjectByKeys(newApiData.result),
				null,
				2,
			).split('\n')
			const oldApiDataStrings = JSON.stringify(
				sortObjectByKeys(oldApiData.result),
				null,
				2,
			).split('\n')

			const diffOptions = {
				contextLines: 1,
				expand: false,
			}

			const difference = diffLinesUnified(
				oldApiDataStrings,
				newApiDataStrings,
				diffOptions,
			)

			const outputString = `Testing API URL:\n${newApiURL}\n${difference}`
			console.log(outputString)

			saveTestOutputIfSelected(outputString, newApiURL)
			break
		} else if (options.api === 'nav-data') {
			const newApiURL = `${options.newApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}/${contentDirMap[product].navDataPath}`
			const oldApiURL = `${options.oldApiUrl}/api/content/${product}/nav-data/${versionMetadata.version}/${contentDirMap[product].navDataPath}`

			const newApiResponse = await fetch(newApiURL)
			const oldApiResponse = await fetch(oldApiURL)

			const newApiData = await newApiResponse.json()
			const oldApiData = await oldApiResponse.json()

			const newDataToCompare = newApiData.result?.navData
			const oldDataToCompare = oldApiData.result?.navData

			const diffOptions = {
				contextLines: 1,
				expand: false,
			}

			const difference = diff(oldDataToCompare, newDataToCompare, diffOptions)

			const outputString = `Testing API URL:\n${newApiURL}\n${difference}`
			console.log(outputString)

			if (difference.includes('Compared values have no visual difference.')) {
				testsPassed.push(newApiURL)
				console.log('✅ No visual difference found.\n')
			} else {
				testsFailed.push(newApiURL)
				console.log(`${difference}\n`)
			}

			totalTests.push(newApiURL)
			saveTestOutputIfSelected(outputString, newApiURL)
		} else if (options.api === 'content') {
			const productContentDir = contentDirMap[product].contentDir
			const isVersionedProduct = contentDirMap[product].versionedDocs
			const metadataVersion = isVersionedProduct ? versionMetadata.version : ''
			const contentPath = path.join(
				mainContentDirectory,
				product,
				metadataVersion,
				productContentDir,
			)

			if (!fs.existsSync(contentPath)) {
				console.log(`Directory ${contentPath} does not exist`)
				continue
			}

			const randomIndexes = []
			const numOfRandomIndexes =
				Math.min(options.numOfTests, apiPaths.length) || 1

			while (randomIndexes.length < numOfRandomIndexes) {
				const randomIndex = Math.floor(Math.random() * apiPaths.length)

				if (!randomIndexes.includes(randomIndex)) {
					randomIndexes.push(randomIndex)
				}
			}

			const apiPathsForProductAndVersion =
				apiPaths[product][versionMetadata.version]

			for (const pathObject of apiPathsForProductAndVersion) {
				// Take product out of the path so the doc can be found
				const pathWithoutBasePaths = pathObject.path.replace(
					`${contentDirMap[product].productSlug}/`,
					'',
				)
				const apiURL = `/api/content/${product}/doc/${versionMetadata.version}/${pathWithoutBasePaths}`

				const oldApiURL = `${options.oldApiUrl}${apiURL}`
				const newApiURL = `${options.newApiUrl}${apiURL}`

				let newApiResponse
				let oldApiResponse
				try {
					newApiResponse = await fetch(newApiURL)
					oldApiResponse = await fetch(oldApiURL)

					if (!newApiResponse.ok || !oldApiResponse.ok) {
						console.log(
							`Error fetching API URL:\n${newApiURL}\n${newApiResponse.statusText}`,
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

				const newDataToCompare = {
					markdownSource: newApiData.result?.markdownSource,
					metadata: newApiData.result?.metadata,
				}
				const oldDataToCompare = {
					markdownSource: oldApiData.result?.markdownSource,
					metadata: oldApiData.result?.metadata,
				}

				const difference = diff(oldDataToCompare, newDataToCompare, {
					contextLines: 1,
					expand: false,
				})

				const outputString = `Testing API URL:\n${newApiURL}\n${difference}`

				console.log(outputString)

				if (difference.includes('Compared values have no visual difference.')) {
					testsPassed.push(newApiURL)
					console.log('✅ No visual difference found.\n')
				} else {
					testsFailed.push(newApiURL)
					console.log(`${difference}\n`)
				}

				totalTests.push(newApiURL)
				saveTestOutputIfSelected(outputString, newApiURL)
			}
		}
	}
}

if (options.api === 'content-versions') {
	const newApiURL = new URL(options.newApiUrl)
	const oldApiURL = new URL(options.oldApiUrl)

	let newApiResponse, oldApiResponse
	try {
		newApiResponse = await fetch(newApiURL)
		oldApiResponse = await fetch(oldApiURL)

		if (!newApiResponse.ok) {
			console.log(
				`Error fetching API response:\n${newApiURL}\n${newApiResponse.statusText}`,
			)
		}
		if (!oldApiResponse.ok) {
			console.log(
				`Error fetching API response:\n${oldApiURL}\n${oldApiResponse.statusText}`,
			)
		}
	} catch (error) {
		console.log(`Error fetching API response\n${error}`)
	}

	let newApiData, oldApiData
	try {
		newApiData = await newApiResponse.json()
		oldApiData = await oldApiResponse.json()
	} catch (error) {
		console.log(`Error decoding JSON\n${error}`)
	}

	// sort the versions to normalize the responses because the APIs return content versions in different orders
	const newSortedVersions = newApiData.versions.sort()
	const oldSortedVersions = oldApiData.versions.sort()

	const difference = diff(newSortedVersions, oldSortedVersions)

	const outputString = `Testing API URL\n${difference}`
	console.log(outputString)

	if (difference.includes('Compared values have no visual difference.')) {
		testsPassed.push(newApiURL)
		console.log('✅ No visual difference found.\n')
	} else {
		testsFailed.push(newApiURL)
		console.log(`${difference}\n`)
	}

	totalTests.push(newApiURL)
	saveTestOutputIfSelected(outputString, newApiURL)
}

if (options.api === 'all-docs-paths') {
	const allProducts = [
		'boundary',
		'consul',
		'hcp-docs',
		'nomad',
		'packer',
		'terraform-enterprise',
		'sentinel',
		'terraform',
		'terraform-cdk',
		'terraform-docs-agents',
		'terraform-docs-common',
		'terraform-plugin-framework',
		'terraform-plugin-log',
		'terraform-plugin-mux',
		'terraform-plugin-sdk',
		'terraform-plugin-testing',
		'vagrant',
		'vault',
		'waypoint',
	]
	let newApiURL
	let oldApiURL
	if (options.product) {
		newApiURL = `${options.newApiUrl}/api/all-docs-paths?products=${options.product}`

		const contentAPIFilter = allProducts.map((repo) => {
			if (repo !== options.product) {
				return `filterOut=${repo}`
			}
		})
		const contentAPIFilterString = contentAPIFilter.join('&')

		oldApiURL = `${options.oldApiUrl}/api/all-docs-paths?${contentAPIFilterString}`
	} else {
		newApiURL = `${options.newApiUrl}/api/all-docs-paths`
		oldApiURL = `${options.oldApiUrl}/api/all-docs-paths`
	}

	let newApiResponse, oldApiResponse
	try {
		newApiResponse = await fetch(newApiURL)
		oldApiResponse = await fetch(oldApiURL)

		if (!newApiResponse.ok) {
			console.log(
				`Error fetching API response:\n${newApiURL}\n${newApiResponse.statusText}`,
			)
		}
		if (!oldApiResponse.ok) {
			console.log(
				`Error fetching API response:\n${oldApiURL}\n${oldApiResponse.statusText}`,
			)
		}
	} catch (error) {
		console.log(`Error fetching API response\n${error}`)
	}

	let newApiData, oldApiData
	try {
		newApiData = await newApiResponse.json()
		oldApiData = await oldApiResponse.json()
	} catch (error) {
		console.log(`Error decoding JSON\n${error}`)
	}

	// Filter out just the paths to compare and sort them alphabetically
	const newDataToCompare = newApiData.result
		.map((item) => {
			return item.path
		})
		.sort()
	const oldDataToCompare = oldApiData.result
		.map((item) => {
			return item.path
		})
		.sort()

	const diffOptions = {
		contextLines: 1,
		expand: false,
	}

	const difference = diff(oldDataToCompare, newDataToCompare, diffOptions)

	const outputString = `Testing API URL:\n${newApiURL}`
	console.log(outputString)

	if (difference.includes('Compared values have no visual difference.')) {
		console.log('✅ No visual difference found.\n')
	} else {
		console.log(`${difference}\n`)
	}

	saveTestOutputIfSelected(outputString, newApiURL)
}

if (
	options.api === 'content' ||
	options.api === 'nav-data' ||
	options.api === 'content-versions'
) {
	console.log(
		`Tests passed: ${testsPassed.length} of ${options.numOfTests ?? totalTests.length} ${
			testsPassed.length === (options.numOfTests ?? totalTests.length)
				? '🎉'
				: ''
		}`,
	)
}
