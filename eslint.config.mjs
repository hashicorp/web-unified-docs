import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
	{ ignores: ['.next', '**/dist'] },
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
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
