/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import remark from 'remark'
import visit from 'unist-util-visit'
import is from 'unist-util-is'

/**
 * A remark plugin that finds <li/> nodes that start with inline code,
 * and extracts the inline code's text content.
 *
 * Text content for each inline code item is pushed to the provided
 * `collector` variable, which is required for the plugin to function.
 */
const codeListItemCollector = ({ collector }) => {
	/**
	 * unist-util-is for `paragraph` nodes
	 */
	function isParagraph(node) {
		return is(node, 'paragraph')
	}

	/**
	 * unist-util-is for `inlineCode` nodes
	 */
	function isInlineCode(node) {
		return is(node, 'inlineCode')
	}
	return function transformer(tree) {
		visit(tree, 'listItem', (node) => {
			// If the list node has no children, skip it
			if (!node.children) {
				return
			}
			// We expect the child node to be a paragraph, with nested children.
			const childNode = node.children[0]
			if (!isParagraph(childNode) || !childNode.children) {
				return
			}
			// We expect the nested child to be an inline code node.
			const nestedChild = childNode.children[0]
			if (!isInlineCode(nestedChild)) {
				return
			}
			// If we have found <li> → <p> → <code>, then we extract the text.
			collector.push(nestedChild.value)
		})
	}
}

/**
 * Given some MDX content,
 * find all <li> nodes that start with inline code, and
 * Return an array of text values for all those bits of inline code lists.
 *
 * For context, in many MDX documents, we list parameters or options as
 * lists, with each items starting with <code>. The text content of those <code>
 * elements often represents relatively important parameters or options.
 * Being able to extract the text means we can do things like search index it.
 */
export async function collectCodeListItems(content) {
	const codeListItems = []

	/**
	 * Run remark using the extraction plugin,
	 * then return the collected array of `codeListItems`
	 */
	return remark()
		.use(codeListItemCollector, { collector: codeListItems })
		.process(content)
		.then(() => {
			return codeListItems
		})
}
