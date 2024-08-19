import semver from 'semver'

/**
 * TODO: CLEAN THIS UP A BIT.
 *
 * @param {*} releaseRefs
 * @param {*} repoConfig
 */
export function getUniqueReleaseRefs(releaseRefs, repoConfig) {
	//
	const uniqueRefs = {}
	//
	const sortedRefs = releaseRefs.sort((a, b) => {
		return semver.compare(a.version, b.version)
	})
	//
	for (const refEntry of sortedRefs) {
		const versionString = refEntry.versionString
		if (!uniqueRefs[versionString]) {
			uniqueRefs[versionString] = refEntry
			continue
		}
		//
		const existingRef = uniqueRefs[versionString]
		// If the existing ref is a tag, and the incoming ref is a release branch,
		// use the incoming ref
		if (
			existingRef.ref.startsWith('refs/tags') &&
			refEntry.ref.startsWith('refs/remotes/origin')
		) {
			uniqueRefs[versionString] = refEntry
			continue
		} else if (
			existingRef.ref.startsWith('refs/remotes/origin') &&
			refEntry.ref.startsWith('refs/tags')
		) {
			continue
		}
		// If both the existing ref and incoming refs are release branches,
		// and repoConfig.patch is set to `generic`,
		// prefer the one using the `generic` patch
		if (
			repoConfig.patch === 'generic' &&
			existingRef.ref.startsWith('refs/remotes/origin') &&
			refEntry.ref.startsWith('refs/remotes/origin')
		) {
			if (existingRef.versionString.endsWith('x')) {
				continue
			} else if (refEntry.versionString.endsWith('x')) {
				uniqueRefs[versionString] = refEntry
				continue
			}
		}
		// If the existing ref and the incoming ref are different versions,
		// use the latest one
		if (semver.gt(refEntry.version, existingRef.version)) {
			uniqueRefs[versionString] = refEntry
			continue
		} else if (semver.lt(refEntry.version, existingRef.version)) {
			continue
		}

		// Otherwise, just continue, using the existing ref
		continue
	}
	const uniqueRefsArray = Object.values(uniqueRefs).sort((a, b) => {
		return semver.compare(a.version, b.version)
	})

	console.log(
		sortedRefs.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	)
	console.log(
		uniqueRefsArray.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	)
	return uniqueRefsArray
}
