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
		rules: {
			curly: 'error',
			'@typescript-eslint/no-explicit-any': 'off',
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
]
