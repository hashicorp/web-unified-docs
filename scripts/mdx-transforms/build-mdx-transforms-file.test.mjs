import { expect, test, vi, afterEach, beforeEach } from 'vitest'
import { vol } from 'memfs'
import {
	buildFileMdxTransforms,
	applyFileMdxTransforms,
} from './build-mdx-transforms-file.mjs'
import versionMetadata from '__fixtures__/versionMetadata.json'
import fs from 'fs'

vi.mock('fs')
vi.mock('fs/promises')

afterEach(() => {
	vol.reset()
})

beforeEach(() => {
	vol.fromJSON({
		'/content/terraform/v1.19.x/test.mdx': mdxContent,
		'app/api/versionMetadata.json': JSON.stringify(versionMetadata),
	})
})

const mdxContent = `
# Hello World

export const ComplexComponent = () => <div>Hello to the world</div>

</ComplexComponent />
`

const transformedOutPath = '/content/terraform/v1.19.x/test.mdx'

test('test buildfileMdxTransforms', async () => {
	await buildFileMdxTransforms('/content/terraform/v1.19.x/test.mdx')
	const transformedContent = fs.readFileSync(transformedOutPath, 'utf8')
	expect(transformedContent).toContain(mdxContent)
})

test('test applyFileMdxTransforms', async () => {
	const entry = {
		filePath: '/content/terraform/v1.19.x/test.mdx',
		partialsDir: '../../partials',
		outPath: transformedOutPath,
	}
	const result = await applyFileMdxTransforms(entry, versionMetadata)
	expect(result).toStrictEqual({ error: null })

	const transformedContent = fs.readFileSync(entry.outPath, 'utf8')
	expect(transformedContent.trim()).toContain(mdxContent.trim())
})
