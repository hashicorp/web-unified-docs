import fs from 'fs'
import path from 'path'
import buildFileMdxTransforms from './mdx-transforms/build-mdx-transforms-file.mjs'

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
			}
		} else {
			console.log(`- File changed: ${filePath}\n`)

			try {
				await buildFileMdxTransforms(filePath)
			} catch (error) {
				console.error(`Error processing file ${filePath}:`, error)
			}
		}
	}
})

console.log(`Watching for file changes in ${contentDir}...`)
