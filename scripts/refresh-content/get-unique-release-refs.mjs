import semver from "semver";

/**
 * TODO: CLEAN THIS UP A BIT.
 *
 * @param {*} releaseRefs
 * @param {*} repoConfig
 */
export function getUniqueReleaseRefs(releaseRefs, repoConfig) {
	//
	if (repoConfig.patch !== "generic") {
		throw new Error("TODO: need to handle non-generic patch case");
	}
	//
	const uniqueRefs = {};
	//
	const sortedRefs = releaseRefs.sort((a, b) => {
		return semver.compare(a.version, b.version);
	});
	//
	for (const refEntry of sortedRefs) {
		const versionString = refEntry.versionString;
		const genericVersionString = versionString.replace(/\d+$/, "x");
		if (!uniqueRefs[genericVersionString]) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		}
		//
		const existingRef = uniqueRefs[genericVersionString];
		// If the existing ref is a tag, and the incoming ref is a release branch,
		// use the incoming ref
		if (
			existingRef.ref.startsWith("refs/tags") &&
			refEntry.ref.startsWith("refs/remotes/origin")
		) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		} else if (
			existingRef.ref.startsWith("refs/remotes/origin") &&
			refEntry.ref.startsWith("refs/tags")
		) {
			continue;
		}
		// If both the existing ref and incoming refs are release branches,
		// prefer the one using the `generic` patch
		if (
			existingRef.ref.startsWith("refs/remotes/origin") &&
			refEntry.ref.startsWith("refs/remotes/origin")
		) {
			if (existingRef.versionString.endsWith("x")) {
				continue;
			} else if (refEntry.versionString.endsWith("x")) {
				uniqueRefs[genericVersionString] = refEntry;
				continue;
			}
		}
		// If the existing ref and the incoming ref are different versions,
		// use the latest one
		if (semver.gt(refEntry.version, existingRef.version)) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		} else if (semver.lt(refEntry.version, existingRef.version)) {
			continue;
		}

		// Otherwise, just continue, using the existing ref
		continue;
	}
	const uniqueRefsArray = Object.values(uniqueRefs)
		.sort((a, b) => {
			return semver.compare(a.version, b.version);
		})
		.map((refEntry) => {
			const versionString = refEntry.versionString;
			const genericVersionString = versionString.replace(/\d+$/, "x");
			return { ...refEntry, versionString: genericVersionString };
		});

	console.log(
		sortedRefs.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	);
	console.log(
		uniqueRefsArray.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	);
	return uniqueRefsArray;
}
