/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

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
				'.github/**',
				'.next/**',
				'scripts/utils/**',
				'eslint.config.mjs',
				'app/layout.tsx',
				'app/page.tsx',
				'next-env.d.ts',
			],
		},
	},
})
