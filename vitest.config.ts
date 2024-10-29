import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			exclude: [
				...configDefaults.exclude,
				'**/migrate-content/**',
				'**/next.config.js',
				'**/redirects.js',
				'**/utils/**',
				'.github/**',
				'.next/**',
				'.eslintrc.js',
				'.stylelintrc.js',
				'next-env.d.ts',
			],
		},
	},
})
