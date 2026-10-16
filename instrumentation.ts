/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

// Start local inc dev watcher here to prevent the module from loading multiple times and starting multiple watchers
export async function register(): Promise<void> {
	if (
		process.env.NEXT_RUNTIME === 'nodejs' &&
		process.env.NODE_ENV === 'development'
	) {
		const { BUILD_TYPE, buildType } = await import('./app/utils/buildType')
		if (buildType === BUILD_TYPE.incBuildLocalDev) {
			const { startIncBuildsWatcher } = await import(
				'./app/utils/incBuildsMetadata'
			)
			startIncBuildsWatcher()
		}
	}
}
