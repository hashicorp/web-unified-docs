/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import visit from 'unist-util-visit'

export let tableCount = 0

export const CountTablesPlugin = () => {
	return function transformer(tree) {
		visit(tree, 'table', () => {
			tableCount++
		})
	}
}
