/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import is from 'unist-util-is'
import visit from 'unist-util-visit'

export const sigils = {
	'=>': 'success',
	'->': 'info',
	'~>': 'warning',
	'!>': 'danger',
}

export const paragraphCustomAlertsPlugin = () => {
	return function transformer(tree) {
		visit(tree, 'paragraph', (pNode, _, parent) => {
			let prevTextNode
			visit(pNode, 'text', (textNode) => {
				Object.keys(sigils).forEach((symbol) => {
					// If this content has already been run through remark, -> will get escaped to \->
					// and split into multiple text nodes, so we need to check for that
					const isEscapedInfo =
						symbol === '->' &&
						prevTextNode?.value === '-' &&
						textNode.value.startsWith('> ')

					if (textNode.value.startsWith(`${symbol} `) || isEscapedInfo) {
						// Remove the literal sigil symbol from string contents
						if (isEscapedInfo) {
							prevTextNode.value = ''
							textNode.value = textNode.value.replace('> ', '')
						} else {
							textNode.value = textNode.value.replace(`${symbol} `, '')
						}

						// Wrap matched nodes with <div> (containing proper attributes)
						parent.children = parent.children.map((node) => {
							return is(pNode, node)
								? {
										type: node.type,
										children: [
											{
												type: 'jsx',
												value: `<div className="alert alert-${sigils[symbol]} g-type-body">`,
											},
											{
												type: 'paragraph',
												children: [
													{
														type: 'text',
														value: '\n\n',
													},
													node,
													{
														type: 'text',
														value: '\n\n',
													},
												],
											},
											{
												type: 'jsx',
												value: '</div>',
											},
										],
									}
								: node
						})
					}
				})
				prevTextNode = textNode
			})
		})
	}
}

/**
 * Applying the paragraph-custom-alerts plugin here as some of the shortcodes are getting improperly escaped during stringification
 */

export const transformParagraphCustomAlerts = async (mdxString) => {
	const contents = await remark()
		.use(remarkMdx)
		.use(paragraphCustomAlertsPlugin)
		.process(mdxString)
	return String(contents)
}
