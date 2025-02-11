import { describe, it, expect, vi } from 'vitest'
import { transformStripTerraformEnterpriseContent } from './strip-terraform-enterprise-content.mjs'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

describe('transformStripTerraformEnterpriseContent', () => {
	it('should remove content within TFC:only blocks', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:only -->
This content should stay.
`
		const result = await remark()
			.use(remarkMdx)
			.use(transformStripTerraformEnterpriseContent, {
				filePath: 'ptfe-releases/some-file.md',
			})
			.process(markdown)

		expect(result.contents).toBe('This content should stay.\n')
	})

	it('should throw an error for mismatched block names', async () => {
		const mockConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END: TFC:other -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('Mismatched block names')
		expect(mockConsole).toHaveBeenCalledOnce()
	})

	it('should throw an error for unexpected END block', async () => {
		const markdown = `
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('Unexpected END block')
	})

	it('should throw an error for unexpected BEGIN block', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
<!-- BEGIN: TFC:only -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('Unexpected BEGIN block')
	})

	it('should throw an error if no block could be parsed from BEGIN comment', async () => {
		const markdown = `
<!-- BEGIN:  -->
This content should be removed.
<!-- END: TFC:only -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('No block could be parsed from BEGIN comment')
	})

	it('should throw an error if no block could be parsed from END comment', async () => {
		const markdown = `
<!-- BEGIN: TFC:only -->
This content should be removed.
<!-- END:  -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('No block could be parsed from END comment')
	})

	it('should throw an error for blocks that do not match directive', async () => {
		const markdown = `
<!-- BEGIN: TFE:only -->
This content should be removed.
<!-- END: TFE:only -->
`
		await expect(async () => {
			return await remark()
				.use(remarkMdx)
				.use(transformStripTerraformEnterpriseContent, {
					filePath: 'ptfe-releases/some-file.md',
				})
				.process(markdown)
		}).rejects.toThrow('Directive could not be parsed')
	})
})
