import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
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
				'eslint.config.mjs',
				'next-env.d.ts',
			],
		},
	},
})
