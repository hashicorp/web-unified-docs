/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

module.exports = [
	{
		source: '/before-rewrite',
		destination: '/after-rewrite',
		permanent: true,
	},
	{
		source: '/example2',
		destination: '/example2-destination',
		permanent: true,
	},
	{
		source: '/test-external/:product',
		destination: 'https://hashicorp.com/products/:product',
		permanent: true,
	},
]
