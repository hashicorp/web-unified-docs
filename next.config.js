/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/content/ptfe-releases/:path',
				destination: '/api/content/terraform-enterprise/:path',
			},
		]
	},
}

module.exports = nextConfig
