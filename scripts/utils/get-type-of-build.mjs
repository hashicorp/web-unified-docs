/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

export const BUILD_TYPE = Object.freeze({
	incBuildLocalDev: 'incBuildLocalDev',
	incBuildPRPreview: 'incBuildPRPreview',
	prodBuild: 'prodBuild',
	fullBuild: 'fullBuild',
})

export function getBuildType() {
	// Destructure to prevent Bun from inlining NODE_ENV during compilation.
	const { VERCEL_ENV, INCREMENTAL_BUILD, NODE_ENV } = process.env

	if (VERCEL_ENV === 'production') {
		return BUILD_TYPE.prodBuild
	}

	if (INCREMENTAL_BUILD === 'true') {
		if (NODE_ENV === 'development') {
			return BUILD_TYPE.incBuildLocalDev
		}
		if (NODE_ENV === 'production') {
			return BUILD_TYPE.incBuildPRPreview
		}
	}

	return BUILD_TYPE.fullBuild
}
