// Third-party
import semver from "semver";

/**
 * TODO: CLEAN THIS UP A BIT.
 *
 * @param {*} refsList
 * @param {*} repoConfig
 */
export function getReleaseRefs(refsList, repoConfig) {
	/**
	 * Find the relevant release refs.
	 *
	 * Release refs are refs used to populate our existing content API. We want
	 * to mirror the content in our existing API in this repository, so we want
	 * to extract content from any refs that match the previous releaseRefPattern.
	 */
	const rawReleaseRefs = refsList
		.filter(({ ref }) => repoConfig.releaseRefPattern.test(ref))
		.map((releaseRef) => {
			const versionString = repoConfig.versionStringFromRef(releaseRef.ref);
			return { ...releaseRef, versionString };
		})
		.filter((entry) => Boolean(entry.versionString));
	console.log(`Found ${rawReleaseRefs.length} pattern-matched release refs.`);
	//
	const releaseRefs = rawReleaseRefs
		.map((releaseRef) => {
			const versionSemver = semver.coerce(releaseRef.versionString);
			return {
				...releaseRef,
				version: versionSemver,
			};
		})
		.filter(({ version }) => {
			//
			if (!repoConfig.earliestVersion) {
				return true;
			}
			//
			const earliestVersion = semver.coerce(repoConfig.earliestVersion);
			if (!earliestVersion) {
				throw new Error(
					`Error: Earliest version "${repoConfig.earliestVersion}" is not a valid semver version.`
				);
			} else {
				//
				const isInRange = semver.gte(version, earliestVersion);
				return isInRange;
			}
		});

	console.log(`Found ${releaseRefs.length} release refs with valid versions.`);
	return releaseRefs;
}
