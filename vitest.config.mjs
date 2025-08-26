/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		exclude: [
			...configDefaults.exclude,
			'__tests__/**', // Integration tests - run separately
		],
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
				'__tests__/**', // Integration tests - exclude from coverage
			],
		},
	},
})
