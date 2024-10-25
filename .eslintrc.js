/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
	root: true,
	extends: './node_modules/@hashicorp/platform-cli/config/.eslintrc.js',

	rules: {
		curly: 'error',
	},

	globals: {
		vi: 'readonly',
	},

	overrides: [
		{
			files: ['**/*.ts?(x)'],
			rules: {
				'arrow-body-style': ['warn', 'always'],
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-inferrable-types': 'off',
				'@typescript-eslint/typedef': [
					'warn',
					{
						arrowParameter: true,
						parameter: true,
					},
				],
			},
		},
	],
}
