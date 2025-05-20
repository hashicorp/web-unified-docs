/* eslint-disable */
// @ts-nocheck
// TODO: fix types

// for creating custom remark plugin
import { is } from 'unist-util-is' // Use 4.1.0; 5+ is ESM
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'
import type { Link, Definition } from 'mdast'
import type { Plugin } from 'unified'

import { IGNORE_PATTERNS } from './main'

export const remarkTransformCloudDocsLinks: Plugin = () => {
	const test = (node: Node): node is Link | Definition => {
		return is<Link>(node, 'link') || is<Definition>(node, 'definition')
	}

	return function (tree) {
		visit(tree, test, (node) => {
			// early exit if any urls match any ignored patterns
			if (IGNORE_PATTERNS.some((e) => e.test(node.url))) {
				return
			}

			// Match urls beginning with `/cloud-docs` or `/terraform/cloud-docs`
			if (/^(\/terraform)?\/cloud-docs/i.test(node.url)) {
				node.url = node.url.replace('cloud-docs', 'enterprise')
			}
		})
	}
}
