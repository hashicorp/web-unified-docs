import fs from 'fs'
import path from 'path'
import buildFileMdxTransforms from './mdx-transforms/build-mdx-transforms-file.mjs'

const contentDir = path.resolve('content')

fs.watch(contentDir, { recursive: true }, async (eventType, filename) => {
	if (filename && path.extname(filename) === '.mdx') {
		const filePath = path.join(contentDir, filename)
		console.log(`File changed: ${filePath}`)
		try {
			await buildFileMdxTransforms(filePath)
		} catch (error) {
			console.error(`Error processing file ${filePath}:`, error)
		}
	}
})

console.log(`Watching for file changes in ${contentDir}...`)
