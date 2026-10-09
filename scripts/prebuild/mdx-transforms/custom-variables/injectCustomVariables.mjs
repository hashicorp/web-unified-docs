/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import flatMap from 'unist-util-flatmap'

/**
 * Goes through the tree, finds nodes containing {{ var }} placeholders,
 * and replaces them with the value for the current product.
 *
 * @param {Object} tree Remark AST
 * @param {Object} variableMap Map of varName -> { repoSlug: value }
 * @param {Array} contentNodesToReplace Array of [varName, nodeTextValue, startIndex, endIndex] tuples
 * @param {string} repoSlug The current product repo slug (e.g. 'terraform-docs-common')
 */
export function injectCustomVariables(
	tree,
	variableMap,
	contentNodesToReplace,
	repoSlug,
) {
	if (Object.keys(variableMap).length === 0) {
		throw new Error('Could not inject custom variables - variable map is empty')
	}

	return flatMap(tree, (node) => {
		// Only allow variables inside paragraph nodes
		if (node.type !== 'paragraph') {
			return [node]
		}

		const currentContentString = node.children[0].value
		let newContentString = currentContentString
		// Running offset: tracks how much the string has grown or shrunk so far.
		// Each replacement shifts all subsequent stored indices by
		// (variableContent.length - tokenLength), where tokenLength = varName.length + 6
		// for the '{{ ' and ' }}' surrounding the variable name.
		let offset = 0

		// Look through contentNodesToReplace to see if there is a need to replace a node
		for (let i = 0; i < contentNodesToReplace.length; i++) {
			const contentNodeToReplace = contentNodesToReplace[i]
			if (contentNodeToReplace[1] !== node.children[0].value) {
				continue
			} else {
				const [varName, , startIndex, endIndex] = contentNodeToReplace
				const variableContent = variableMap[varName]?.[repoSlug]
				if (variableContent === undefined) {
					throw new Error(
						`No value defined for variable '{{ ${varName} }}' for product '${repoSlug}'`,
					)
				}

				const adjustedStart = startIndex + offset
				const adjustedEnd = endIndex + offset
				newContentString =
					newContentString.slice(0, adjustedStart) +
					variableContent +
					newContentString.slice(adjustedEnd)

				// tokenLength = '{{ ' + varName + ' }}' = varName.length + 6
				const tokenLength = varName.length + 6
				offset += variableContent.length - tokenLength
			}
		}

		// console.log(counter)
		// update the node value
		console.log('Current content: ', currentContentString)
		console.log('Updated content: ', newContentString)
		console.log()
		// If there were variables, newContentString should be changed
		// Otherwise, newContentString should stay the same
		// Is it this simple though? Injecting partials involved remark processing/node additions
		node.children[0].value = newContentString
		return [node]
	})
}
