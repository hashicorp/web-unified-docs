/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import { describe, it, expect } from 'vitest'
import { transformCustomVariables } from './custom-variables.mjs'

const runTransform = async (markdown, options) => {
	const processor = await remark()
		.use(remarkMdx)
		.use(transformCustomVariables, options)
		.process(markdown)
	return processor.contents
}

function createTestContent(variableMarkdown, text) {
	return `${variableMarkdown}\n${text}`
}

const defaultTransformOptions = {
	directivePairingValidated: false,
	repoSlug: 'terraform-enterprise',
	filePath: 'testProduct/test-file.md',
}

// Mock variable partial definitions
const validLocalVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise: 'Terraform Enterprise'
  - terraform-docs-common: 'HCP Terraform'

product-content:
  - terraform-enterprise: 'This is local TFE'
  - terraform-docs-common: 'This is local TFC'

<!-- END: name:variables -->
`

const validGlobalVariablesMarkdown = `
<!-- BEGIN: name:global-variables -->

product-name:
  - terraform-enterprise: 'Terraform Enterprise Global'
  - terraform-docs-common: 'HCP Terraform Global'

product-content:
  - terraform-enterprise: 'This is global TFE'
  - terraform-docs-common: 'This is global TFC'

<!-- END: name:global-variables -->
`

describe('Transform Custom Variables - Variable Usage', () => {
	// no vars
	it('should not replace any variables since there is no variable usage', async () => {
		const contentMarkdown = `This is test markdown with no variables.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(contentMarkdown)
	})

	// e.g. {{var}}
	it('should not replace any variables since the variable input syntax does not match', async () => {
		const contentMarkdown = `This is test markdown with wrong {{product-name}} syntax.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(contentMarkdown)
	})

	// single {{ var }} from one product
	it('should replace product-name with the value in terraform-enterprise', async () => {
		const contentMarkdown = `This is test markdown for {{ product-name }}. {{ product-content }}.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const expectedResult = `This is test markdown for Terraform Enterprise. This is local TFE.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// single {{ var }} from different product
	it('should replace product-name with the value in terraform-docs-common', async () => {
		const contentMarkdown = `This is test markdown for {{ product-name }}.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const options = {
			...defaultTransformOptions,
			repoSlug: 'terraform-docs-common',
		}
		const expectedResult = `This is test markdown for HCP Terraform.`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(expectedResult)
	})

	// two vars from one product
	it('should replace product-name and product-content with the value in terraform-enterprise', async () => {
		const contentMarkdown = `This is test markdown for {{ product-name }}. {{ product-content }}.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const expectedResult = `This is test markdown for Terraform Enterprise. This is local TFE.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// multiple var use
	it('should replace product-name and product-content with the value in terraform-docs-common multiple times', async () => {
		const contentMarkdown = `This is test markdown for {{ product-name }}. Inside {{ product-name }}, you can find {{ product-content }} and {{ product-content }}.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const options = {
			...defaultTransformOptions,
			repoSlug: 'terraform-docs-common',
		}
		const expectedResult = `This is test markdown for HCP Terraform. Inside HCP Terraform, you can find This is local TFC and This is local TFC.`

		const result = await runTransform(markdown, options)
		expect(result.trim()).toBe(expectedResult)
	})

	// same line within surrounding text
	it('should replace product-name with the value in terraform-enterprise and maintain surrounding text', async () => {
		const contentMarkdown = `This is test markdown for {{ product-name }} where {{ product-name }} should be the product and contain {{ product-content }} somewhere.`
		const markdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const expectedResult = `This is test markdown for Terraform Enterprise where Terraform Enterprise should be the product and contain This is local TFE somewhere.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// headers
	it('should replace variables found within headers', async () => {})

	// case for code blocks?
	it('should replace variables found within code blocks', async () => {})
	// case for urls/links?
	// case for markdown syntax - bold, italic, strong, etc
})

describe('Transform Custom Variables - Multiple Variable Definition', () => {
	// global -> local definition
	it('should substitute global variables and then local variables', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localMarkdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const globalMarkdown = createTestContent(
			validGlobalVariablesMarkdown,
			contentMarkdown,
		)
		const markdown = globalMarkdown + '\n' + localMarkdown
		const expectedResult = `This is test markdown for Terraform Enterprise Global with This is global TFE.\n\nThis is test markdown for Terraform Enterprise with This is local TFE.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// local -> global definition
	it('should substitute local variables twice', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localMarkdown = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const globalMarkdown = createTestContent(
			validGlobalVariablesMarkdown,
			contentMarkdown,
		)
		const markdown = localMarkdown + '\n' + globalMarkdown
		const expectedResult = `This is test markdown for Terraform Enterprise with This is local TFE.\n\nThis is test markdown for Terraform Enterprise with This is local TFE.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// global -> local, but local doesn't redefine all of global
	it('should substitute a mix of local and global variables', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const globalMarkdown = createTestContent(
			validGlobalVariablesMarkdown,
			contentMarkdown,
		)
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise: 'TFE'

<!-- END: name:variables -->
`
		const localMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const markdown = globalMarkdown + '\n' + localMarkdown
		const expectedResult = `This is test markdown for Terraform Enterprise Global with This is global TFE.\n\nThis is test markdown for TFE with This is global TFE.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// local -> inline local
	it('should substitute the initial local variables, then the redefined local variables', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise: 'Terraform Enterprise NEW'

product-content:
  - terraform-enterprise: 'Wow! This is such a cool feature!'

<!-- END: name:variables -->
`
		const localMarkdownInitial = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const localMarkdownRedefined = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const markdown = localMarkdownInitial + '\n' + localMarkdownRedefined
		const expectedResult = `This is test markdown for Terraform Enterprise with This is local TFE.\n\nThis is test markdown for Terraform Enterprise NEW with Wow! This is such a cool feature!.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})

	// new variable introduced
	it('should substitute a new variable directly defined in the content for the first time', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

new-variable:
  - terraform-enterprise: 'very cool sentence'

<!-- END: name:variables -->
`
		const newVariableContent = `Here is a {{ new-variable }}.`
		const localMarkdownInitial = createTestContent(
			validLocalVariablesMarkdown,
			contentMarkdown,
		)
		const localMarkdownRedefined = createTestContent(
			localVariablesMarkdown,
			contentMarkdown + '\n\n' + newVariableContent,
		)
		const markdown = localMarkdownInitial + '\n' + localMarkdownRedefined
		const expectedResult = `This is test markdown for Terraform Enterprise with This is local TFE.\n\nThis is test markdown for Terraform Enterprise with This is local TFE.\n\nHere is a very cool sentence.`

		const result = await runTransform(markdown, defaultTransformOptions)
		expect(result.trim()).toBe(expectedResult)
	})
})

describe('Transform Custom Variables - Error Handling', () => {
	// {{ var }} use
	it('should error for a variable that is used before being defined', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const invalidMarkdown =
			contentMarkdown + '\n\n' + validLocalVariablesMarkdown
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: 'product-name' not found. Make sure you define the variable and/or import variables.mdx prior to use.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable that is used, but has never been defined', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const invalidMarkdown = contentMarkdown
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: 'product-name' not found. Make sure you define the variable and/or import variables.mdx prior to use.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error when trying to use a variable that does not contain a value for the current repoSlug', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: No value defined for variable '{{ product-content }}' for product 'terraform-enterprise'. Ensure that a local/global 'variables.mdx' is defined inside the partials directory of terraform-enterprise and that '{{ product-content }}' exists within.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	// "varName: or var-name:"
	it('should error for a variable name that does not end with a :', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name
  - terraform-enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - product-name is not a valid definition. Please define the variable with alphabetical characters and/or '-' between words like 'varName:' or 'var-name:'`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable name that contains numbers', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name9:
  - terraform-enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - product-name9: is not a valid definition. Please define the variable with alphabetical characters and/or '-' between words like 'varName:' or 'var-name:'`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable name that contains special characters besides -', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product_name:
  - terraform-enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - product_name: is not a valid definition. Please define the variable with alphabetical characters and/or '-' between words like 'varName:' or 'var-name:'`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	// " - product: value"
	it('should error for the lack of variable entries in a given variable name', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

test:
  - terraform-enterprise: 'Terraform Enterprise'

value:

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'value' must contain a list of '- product: value' entries.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a empty value in a variable entry', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

test:
  - terraform-enterprise: 'Terraform Enterprise'

value:
  - terraform-enterprise:

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'value: terraform-enterprise' has no value. Please provide a value for each product entry.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	// bad syntax of a mapping entry
	it('should error for a variable entry that does not start with a list (-) marker', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

test:
  - terraform-enterprise: 'Terraform Enterprise'

value:
  terraform-enterprise: 'Terraform Value'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'value' must contain a list of '- product: value' entries.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	// format as a '- product: value' error
	it('should error for a variable entry that does not separate key: value with a :', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'terraform-enterprise 'Terraform'' must be formatted as a '- product: value' entry in variables.mdx.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable entry name that contains spaces', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'terraform enterprise' is not a valid entry name. Entry names must only contain alphabetical characters and a single '-' separator between words like 'product' or 'my-product'.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable entry name that contains numbers', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise9: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'terraform-enterprise9' is not a valid entry name. Entry names must only contain alphabetical characters and a single '-' separator between words like 'product' or 'my-product'.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable entry name that contains special characters besides -', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform_enterprise: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'terraform_enterprise' is not a valid entry name. Entry names must only contain alphabetical characters and a single '-' separator between words like 'product' or 'my-product'.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for a variable entry name that has a trailing -', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->

product-name:
  - terraform-enterprise-: 'Terraform'

product-content:
  - terraform: 'This is Terraform'

<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - 'terraform-enterprise-' is not a valid entry name. Entry names must only contain alphabetical characters and a single '-' separator between words like 'product' or 'my-product'.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	// <-- BEGIN: name:variables --> <-- END: name:variables -->
	it('should error for an empty declared variable block', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->
<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Couldn't create custom variable map - expected a document, but the input is empty. Make sure the variables and content inside variables.mdx is not empty and follow proper partials & YAML formatting.`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for missing a local variable BEGIN block directive', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Unexpected END block at line 2. No matching BEGIN block found`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for missing a local variable END block directive', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Unclosed BEGIN block: "name:variables" opened at line 2`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for missing a global variable BEGIN block directive', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:global-variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Unclosed BEGIN block: "name:global-variables" opened at line 2`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for missing a global variable END block directive', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- END: name:global-variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Unexpected END block at line 2. No matching BEGIN block found`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for mismatched BEGIN/END variable block directives', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:global-variables -->
<!-- END: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Mismatched block names: BEGIN="name:global-variables" at line 2, END="name:variables" at line 3`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})

	it('should error for nested BEGIN variable block directives', async () => {
		const contentMarkdown =
			'This is test markdown for {{ product-name }} with {{ product-content }}.'
		const localVariablesMarkdown = `
<!-- BEGIN: name:global-variables -->
<!-- BEGIN: name:variables -->
`
		const invalidMarkdown = createTestContent(
			localVariablesMarkdown,
			contentMarkdown,
		)
		const expectedError = `Custom Variables Transform failed in testProduct/test-file.md: Nested BEGIN blocks not allowed. Found BEGIN at line 3, previous BEGIN at line 2`

		await expect(async () => {
			return await runTransform(invalidMarkdown, defaultTransformOptions)
		}).rejects.toThrow(expectedError)
	})
})

describe('Transform Custom Variables - Edge Cases', () => {
	// directivePairingValidated = true + correct variable block
	it('should properly replace variables assuming variable directives were validated', async () => {})
})
