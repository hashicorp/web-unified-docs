/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/:path*.md',
				headers: [
					{ key: 'X-Robots-Tag', value: 'noindex' },
					{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
				],
			},
		]
	},
}

module.exports = nextConfig
