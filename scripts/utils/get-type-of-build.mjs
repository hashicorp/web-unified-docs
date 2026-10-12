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

export const buildType = (() => {
	if (process.env.VERCEL_ENV === 'production') {
		return BUILD_TYPE.prodBuild
	}

	if (process.env.INCREMENTAL_BUILD === 'true') {
		if (process.env.NODE_ENV === 'development') {
			return BUILD_TYPE.incBuildLocalDev
		}
		if (process.env.NODE_ENV === 'production') {
			return BUILD_TYPE.incBuildPRPreview
		}
	}

	return BUILD_TYPE.fullBuild
})()
