/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { buildFileMdxTransforms } from './prebuild/mdx-transforms/build-mdx-transforms-file.mjs'
import { copyNavDataFile } from '#scriptUtils/copy-nav-data-file.mjs'
import { copySingleAssetFile } from '#scriptUtils/copy-asset-files.mjs'
import { gatherVersionMetadata } from './prebuild/gather-version-metadata.mjs'
import { isFileAnImage } from '#scriptUtils/copy-asset-files.mjs'

const contentDir = path.resolve('content')

fs.watch(contentDir, { recursive: true }, async (eventType, filename) => {
	if (filename && path.extname(filename) === '.mdx') {
		const filePath = path.join(contentDir, filename)

		if (filePath.includes('/partials/')) {
			console.log(`Partial file changed: ${filePath}`)

			// Traverse up the directory tree to find the "docs" folder
			let currentDir = path.dirname(filePath)
			let docsDir = null
			while (currentDir !== path.resolve(currentDir, '..')) {
				if (path.basename(currentDir) === 'docs') {
					docsDir = currentDir
					break
				}
				currentDir = path.resolve(currentDir, '..')
			}

			if (docsDir) {
				const files = fs.readdirSync(docsDir, {
					withFileTypes: true,
					recursive: true,
				})

				// Find all MDX files that include the changed partial and transform them
				for (const file of files) {
					if (file.isFile() && path.extname(file.name) === '.mdx') {
						const fullPath = path.join(file.path, file.name)

						const fileContent = fs.readFileSync(fullPath, 'utf-8')

						const partialName = `@include '${filePath.split('/partials/')[1]}'`
						if (fileContent.includes(partialName)) {
							console.log('')

							try {
								console.log(
									`- File containing partial "${partialName}" changed: ${fullPath}`,
								)

								await buildFileMdxTransforms(fullPath)
							} catch (error) {
								console.error(`Error processing file ${fullPath}:`, error)
							}
						}
					}
				}

				if (files.length !== 0) {
					await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
						method: 'POST',
					})
				}
			}
		} else {
			console.log(`- File changed: ${filePath}\n`)

			try {
				await buildFileMdxTransforms(filePath)

				await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
					method: 'POST',
				})
			} catch (error) {
				console.error(`Error processing file ${filePath}:`, error)
			}
		}
	} else if (filename.includes('nav-data.json')) {
		const filePath = path.join(contentDir, filename)
		console.log(`Nav data file changed: ${filePath}`)
		const versionMetadata = await gatherVersionMetadata(contentDir)

		try {
			await copyNavDataFile(filePath, versionMetadata)

			await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
				method: 'POST',
			})
		} catch (error) {
			console.error(`Error processing file ${filePath}:`, error)
		}
	} else if (isFileAnImage(filename)) {
		const filePath = path.join(contentDir, filename)
		console.log(`Asset file changed: ${filePath}`, eventType)
		try {
			copySingleAssetFile(filePath)

			await fetch(`${process.env.DEV_PORTAL_URL}/api/refresh`, {
				method: 'POST',
			})
		} catch (error) {
			console.error(`Error processing file ${filePath}:`, error)
		}
	}
})

console.log(`Watching for file changes in ${contentDir}...`)
