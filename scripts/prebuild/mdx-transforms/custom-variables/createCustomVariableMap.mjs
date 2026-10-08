/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

const BEGIN_VARIABLE_REGEX = /<!--\s*BEGIN:\s*name:variables\s*-->/
const END_VARIABLE_REGEX = /<!--\s*END:\s*name:variables\s*-->/
const VARIABLE_REGEX = /{{\s[a-z]+(?:-[a-z]+)*\s}}/g

/**
 * Creates a mapping of var[product] to product specific content
 * Stores a [varName, nodeContent, startIndex, endIndex] entry for post traversal replacement
 *
 * @param {Object} tree Remark AST
 * @return {[Object, [Array]]}
 */
export function createCustomVariableMap(tree) {
	const definedVariables = new Set() // strings or regex? Going with strings for now.
	const variableMapEntries = []
	const nodesWithContentToBeReplaced = []
	let readVariables = false
	let variableName = ''

	// In the tree, we want to parse the variable partial into (variable, product, value) entries
	// while also looking for {{ var }} and storing nodes that are within definedVariables
	// handle edge cases
	// 1. var not in definedVariables -> Error
	// 2. {{ global }} exclusive for global partials, but shouldn't matter since we process after partial injection
	visit(tree, (node) => {
		console.log('---PARSING TREE---')
		console.log('Node: ', node)
		const type = node.type
		const value = node?.value

		// empty node? Is this even possible?
		if (!value) {
			return
		}

		// VARIABLE DECLARATION PARSING
		// CAUTION: WHAT IF THERE ISN'T A CORRESPONDING BEGIN/END TAG
		// SHOULD I REMOVE THESE NODES THAT ARE EXPLICITLY FOR VARIABLES?
		// starting indicator of custom variables
		if (type === 'jsx' && BEGIN_VARIABLE_REGEX.test(value)) {
			readVariables = true
			return
		}

		// ending indicator of custom variables
		if (type === 'jsx' && END_VARIABLE_REGEX.test(value)) {
			readVariables = false
			return
		}

		// reading in variable name
		if (readVariables && type === 'text') {
			variableName = value.trim().slice(0, -1) // remove whitespace & ":" e.g. "product: "
			return
		}

		// reading in the values of the variables IF there is a variableName defined
		if (readVariables && variableName && type === 'code') {
			const variableValues = value.trim().split('\n') // split apart the various variable values
			// console.log(variableValues)
			for (const e of variableValues) {
				let [key, val] = e.split(':')
				key = key.slice(1).trim() // remove "- " from "- var" -> "var"
				val = val.trim().slice(1, -1) // remove whitespace & extra quotes from " 'val'" -> "val"
				// console.log(key, val)

				// add the new entries to be mapped later
				variableMapEntries.push([variableName, key, val])
				definedVariables.add(variableName)
			}
			variableName = '' // reset variable name
			return
		}

		// TRACKING NODES WHERE VARS ARE FOUND
		// {{ vars }} are always found within text nodes
		if (!readVariables && type === 'text') {
			const containsOneOrMoreVariables = VARIABLE_REGEX.test(value)
			VARIABLE_REGEX.lastIndex = 0 // need to reset index as it moves after testing
			if (containsOneOrMoreVariables) {
				// Find all instances of {{ var }}
				// store a [varName, value, startIndex, endIndex] entry in nodesWithContentToBeReplaced
				const matches = [...value.matchAll(VARIABLE_REGEX)]
				for (const m of matches) {
					const variableString = m[0] // '{{ some-string }}'
					const startIndex = m['index']
					const endIndex = startIndex + variableString.length
					// console.log(m)
					// console.log(variableString)
					// console.log(startIndex, endIndex)

					// Go through the variableString to see if the declared variable is defined
					// Quicker to error out while building rather than fully traversing and then finding out
					const declaredVariable = variableString.slice(3, -3) // remove '{{ ' and ' }}'
					// console.log(declaredVariable)
					if (!definedVariables.has(declaredVariable)) {
						throw new Error(
							`Couldn't create custom variable map - '${declaredVariable}' not defined in /partials/variables.mdx`,
						)
					}
					nodesWithContentToBeReplaced.push([
						declaredVariable,
						value,
						startIndex,
						endIndex,
					])
				}
			}
			return
		}
	})

	// Form the variable map out of variableMapEntries
	const variableMap = variableMapEntries.reduce(
		(map, [varName, product, content]) => {
			// if the variable varName doesn't exist, create a new object for the entry
			if (!map[varName]) {
				map[varName] = {}
			}
			// add the entry
			map[varName][product] = content
			return map
		},
		{},
	)

	// console.log(variableMap)
	// console.log(nodesWithContentToBeReplaced)
	return [variableMap, nodesWithContentToBeReplaced]
}
