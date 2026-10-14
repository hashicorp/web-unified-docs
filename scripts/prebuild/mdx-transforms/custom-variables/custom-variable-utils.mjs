/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import flatMap from 'unist-util-flatmap'
import visit from 'unist-util-visit'
import { parseDirectiveBlocks } from '../exclude-content/ast-utils.mjs'
import { load } from 'js-yaml'

// The block name as it appears in a BEGIN/END comment. Single source of truth
// for the three regexes below
const VARIABLE_BLOCK_NAME = 'name:(?:global-)?variables'

// Matches the content of a parsed directive block (see parseDirectiveBlocks),
// e.g. 'name:variables'. Anchored so product-tagged blocks such as
// 'TFC:only name:variables' are not treated as variables blocks
export const VARIABLE_BLOCK_CONTENT_REGEX = new RegExp(
	`^${VARIABLE_BLOCK_NAME}$`,
)

// Same whitespace rules as BEGIN_RE / END_RE in exclude-content/ast-utils.mjs,
// so both transforms agree on which comments are BEGIN/END markers
const BEGIN_VARIABLE_DECLARATIVE_REGEX = new RegExp(
	`^(\\s+)?<!--\\s+BEGIN:\\s+${VARIABLE_BLOCK_NAME}\\s+-->(\\s+)?$`,
)
const END_VARIABLE_DECLARATIVE_REGEX = new RegExp(
	`^(\\s+)?<!--\\s+END:\\s+${VARIABLE_BLOCK_NAME}\\s+-->(\\s+)?$`,
)
const VARIABLE_NAME_REGEX = /^[a-zA-Z]+(?:-[a-zA-Z]+)*:[\r\n]/
const VARIABLE_SYNTAX_REGEX = /{{\s[a-zA-Z]+(?:-[a-zA-Z]+)*\s}}/g

/**
 * Concatenates the text content of a node and its descendants
 *
 * @param {Object} node Remark AST node
 * @return {string}
 */
function getNodeContent(node) {
	if (typeof node.value === 'string') {
		return node.value
	}
	return (node.children ?? []).map(getNodeContent).join('')
}

function isVariableStartDeclarative(value, type) {
	return (
		(type === 'jsx' || type === 'html') &&
		BEGIN_VARIABLE_DECLARATIVE_REGEX.test(value)
	)
}

function isVariableEndDeclarative(value, type) {
	return (
		(type === 'jsx' || type === 'html') &&
		END_VARIABLE_DECLARATIVE_REGEX.test(value)
	)
}

function parseVariableContent(content) {
	// Use js-yaml to try and parse the content from yaml into json
	let document = {}
	try {
		// { json: true } enables the parser to override duplicates and replace earlier definitions
		document = load(content, { json: true })
	} catch (e) {
		console.log(e)
		// Catch all for any malformed structuring in variables.mdx
		throw new Error(
			"Couldn't create custom variable map - Make sure the variables and content inside variables.mdx follow proper partials & YAML formatting.",
		)
	}

	// console.log(document)
	return document
}

function extractVariableMapEntriesFromDocument(document, definedVariables) {
	const variableMapEntries = []

	// Iterating through the JSON document to extract & store necessary info for the variable map
	const variableObjectEntries = Object.entries(document)
	for (const [variableName, variableEntries] of variableObjectEntries) {
		// Enforcing the "- product: value" syntax
		if (!Array.isArray(variableEntries) || variableEntries === null) {
			throw new Error(
				`Couldn't create custom variable map - '${variableName}' must contain a list of '- product: value' entries`,
			)
		}

		// Check if each variableEntry is a proper object of { product: content },
		// then push into the map. Also guard against null values (e.g. '- product:' with no value).
		for (const entry of variableEntries) {
			if (typeof entry !== 'object') {
				throw new Error(
					`Couldn't create custom variable map - '${entry}' must be formatted as a '- product: value' entry in variables.mdx`,
				)
			}
			const productEntries = Object.entries(entry)
			for (const [product, content] of productEntries) {
				if (content === null) {
					throw new Error(
						`Couldn't create custom variable map - '${variableName}: ${product}' has no value. Please provide a value for each product entry.`,
					)
				}
				variableMapEntries.push([variableName, product, String(content)])
			}
		}

		// Parsed properly, so we can store the variable name as defined
		definedVariables.add(variableName)
	}

	return variableMapEntries
}

function getVariablesToReplace(value, definedVariables) {
	const variablesToBeReplaced = []
	// Find all instances of {{ var }}
	// store a [varName, startIndex, endIndex] entry in nodesWithContentToBeReplaced
	const matches = [...value.matchAll(VARIABLE_SYNTAX_REGEX)]
	for (const m of matches) {
		const variableString = m[0] // '{{ some-string }}'
		const startIndex = m['index']
		const endIndex = startIndex + variableString.length

		// Go through the variableString to see if the declared variable is defined
		// Quicker to error out while building rather than fully traversing and then finding out
		const declaredVariable = variableString.slice(3, -3) // remove '{{ ' and ' }}'
		if (!definedVariables.has(declaredVariable)) {
			throw new Error(
				`'${declaredVariable}' not found. Make sure you define the variable and/or import variables.mdx prior to use.`,
			)
		}
		variablesToBeReplaced.push([declaredVariable, startIndex, endIndex])
	}

	return variablesToBeReplaced
}

/**
 * Takes {{ var }} placeholders and replaces them with the value for the current product.
 *
 * @param {Object} tree Remark AST
 * @param {Object} variableMap Map of varName -> { repoSlug: value }
 * @param {Array} contentNodesToReplace Array of [varName, nodeTextValue, startIndex, endIndex] tuples
 * @param {string} repoSlug The current product repo slug (e.g. 'terraform-docs-common')
 */
export function replaceCustomVariables(
	node,
	variablesToReplace,
	variableMap,
	repoSlug,
) {
	if (Object.keys(variableMap).length === 0) {
		throw new Error('Could not inject custom variables - variable map is empty')
	}

	const currentContentString = node.value
	let newContentString = currentContentString
	// Running offset: tracks how much the string has grown or shrunk so far.
	// Each replacement shifts all subsequent stored indices by
	// (variableContent.length - tokenLength), where tokenLength = varName.length + 6
	// for the '{{ ' and ' }}' surrounding the variable name.
	let offset = 0

	// Go through variablesToReplace to reconstruct the content string
	for (let i = 0; i < variablesToReplace.length; i++) {
		const [varName, startIndex, endIndex] = variablesToReplace[i]
		const variableContent = variableMap[varName]?.[repoSlug]
		if (variableContent === undefined) {
			throw new Error(
				`No value defined for variable '{{ ${varName} }}' for product '${repoSlug}'. Ensure that a local/global 'variables.mdx' is defined inside the partials directory of ${repoSlug} and that '{{ ${varName} }}' exists within.`,
			)
		}

		const adjustedStart = startIndex + offset
		const adjustedEnd = endIndex + offset
		newContentString =
			newContentString.slice(0, adjustedStart) +
			variableContent +
			newContentString.slice(adjustedEnd)

		// tokenLength = '{{ ' + varName + ' }}' = 3 + varName.length + 3 = varName.length + 6
		const tokenLength = varName.length + 6
		offset += variableContent.length - tokenLength
	}

	// update the node value
	console.log('Current content: ', currentContentString)
	console.log('Updated content: ', newContentString)
	console.log()

	// replace the value for the current text node
	node.value = newContentString
	return
}

export function findAndReplaceCustomVariables(
	tree,
	repoSlug,
	directivePairingValidated,
) {
	const definedVariables = new Set() // strings or regex? Going with strings for now.
	const variableMap = {}
	let variablesContent = ''
	let readVariables = false
	let isGlobal = false

	// CAUTION: WHAT IF THERE ISN'T A CORRESPONDING BEGIN/END TAG
	// error: consider start block w/o end block
	// error: consider end block w/o start block
	// done to check if the variables directive is structured properly
	// If we decide to go with a different variables.mdx structure, we should remove this
	if (!directivePairingValidated) {
		parseDirectiveBlocks(tree)
	}

	// Traverse the tree to form the variables yaml structure + replace
	visit(tree, (node) => {
		const type = node.type
		const value = node?.value

		// starting indicator of custom variables
		// should check for global variables here
		if (isVariableStartDeclarative(value, type)) {
			readVariables = true

			// set isGlobal to true if 'global' is found
			isGlobal = value.includes('global')
			console.log(isGlobal)
			return
		}

		// remark turns the YAML between the BEGIN/END markers into paragraph and list nodes,
		// dropping indentation and "- " markers, so rebuild the YAML text from those nodes
		// paragraph -> top-level/first variable name, e.g. "product-name:"
		if (readVariables && type === 'paragraph') {
			const variableName = `${getNodeContent(node)}\n`
			// Malformed variable name (e.g. ':' or " :" or "::")
			// REGEX to check if a variable name is valid
			if (!VARIABLE_NAME_REGEX.test(variableName)) {
				throw new Error(
					`Couldn't create custom variable map - ${variableName} is not a valid definition. Please define the variable with alphabetical characters and/or '-' between words like 'varName:' or 'var-name:'`,
				)
			}
			variablesContent += variableName
			return visit.SKIP
		}

		// list -> "  - product: 'value'" entries for the preceding variable name
		if (readVariables && type === 'list') {
			for (const listItem of node.children) {
				// remark merges an unindented line that follows a list item into that item
				// e.g. "blah: 'hello'\nsome-string:", so any line after
				// the first one is the next variable name
				const [entry, ...variableNames] = getNodeContent(listItem).split('\n')
				variablesContent += `  - ${entry}\n` // note: spaces before '-' matters...
				for (const name of variableNames) {
					variablesContent += `${name}\n`
				}
			}
			return visit.SKIP
		}

		// ending indicator of custom variables
		if (isVariableEndDeclarative(value, type)) {
			// parse the variables content
			const variablesDocument = parseVariableContent(variablesContent)
			variablesContent = '' // reset the content to prevent duplicate parsing

			// format the document into desired variable map entries
			const variableMapEntries = extractVariableMapEntriesFromDocument(
				variablesDocument,
				definedVariables,
			)

			// update the variable map
			for (const [varName, product, content] of variableMapEntries) {
				// first definition of a variable - setup object
				if (!variableMap[varName]) {
					variableMap[varName] = {}
				}

				// for global - only update if there isn't a value already
				if (isGlobal && variableMap[varName][product]) {
					continue
				}

				// add or update the entry
				variableMap[varName][product] = content
			}

			console.log('=== Updated Variable Map ===')
			console.log(variableMap)

			readVariables = false
			isGlobal = false
			return
		}

		// check if current content contains any variables
		// {{ vars }} can be found in text/code; Should we ignore in code?
		// how do we handle URLs?
		if (type === 'text' || type === 'code') {
			const containsOneOrMoreVariables = VARIABLE_SYNTAX_REGEX.test(value)
			VARIABLE_SYNTAX_REGEX.lastIndex = 0 // need to reset index as it moves after testing
			if (containsOneOrMoreVariables) {
				const variablesToReplace = getVariablesToReplace(
					value,
					definedVariables,
				)
				// do the replacement
				replaceCustomVariables(node, variablesToReplace, variableMap, repoSlug)
			}
			return
		}
		return
	})

	return
}

/*
	Functionality
	1. Look for <!-- BEGIN: name:variables --> to indicate start of variable nodes + mark flag true + remove
	2. Delete the children + the current block
	3. Repeat while the flag is active
	4. Look for <!-- END: name:variables --> to indicate end of variables nodes + mark flag false + remove
*/
export function removeVariableNodesFromContent(tree) {
	if (!tree) {
		throw new Error(
			'Could not remove variable nodes - Remark AST tree not found',
		)
	}

	let isVariableNode = false
	return flatMap(tree, (node) => {
		const type = node.type
		const value = node?.value

		// Starting declarative for custom variables
		if (isVariableStartDeclarative(value, type)) {
			isVariableNode = true
			return []
		}

		// Ending declaration for custom variables`
		if (isVariableEndDeclarative(value, type)) {
			isVariableNode = false
			return []
		}

		// Remove the variable content - Needs to be after END, so it doesn't remove every node after BEGIN
		if (isVariableNode) {
			return []
		}

		// Return the content as is
		return [node]
	})
}
