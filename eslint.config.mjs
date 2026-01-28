/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'

export default [
	{
		ignores: [
			'.next',
			'**/dist',
			'eslint.config.mjs',
			'content',
			'public',
			'vitest.config.mjs',
			'.github/actions/copy-cloud-docs-for-tfe/out/index.js',
		],
	},
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			'no-barrel-files': noBarrelFiles,
		},
	},
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		rules: {
			curly: 'error',
			'arrow-body-style': ['warn', 'always'],
			'no-barrel-files/no-barrel-files': 'warn',
			'valid-typeof': ['warn', { requireStringLiterals: true }],
			'no-restricted-exports': [
				'warn',
				{ restrictDefaultExports: { direct: true } },
			],
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
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
]
