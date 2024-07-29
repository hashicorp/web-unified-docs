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
	 * Nearly all repos use semver versioning. PTFE is one exception.
	 * If semver versioning is not being used, the repo config must provide
	 * a `semverCoerce` function, which given some custom version string,
	 * returns a semver version object.
	 *
	 * Where semver versioning is used, this function can be omitted, and
	 * we'll use `semver.coerce`.
	 */
	const semverCoerce = repoConfig.semverCoerce || semver.coerce;
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
			const rawVersionString = repoConfig.versionStringFromRef(releaseRef.ref);
			const versionString =
				repoConfig.patch === "generic"
					? rawVersionString.replace(/\d+$/, "x")
					: rawVersionString;
			return { ...releaseRef, rawVersionString, versionString };
		})
		.filter((entry) => Boolean(entry.versionString));
	console.log(`Found ${rawReleaseRefs.length} pattern-matched release refs.`);
	//
	const releaseRefs = rawReleaseRefs
		.map((releaseRef) => {
			const versionSemver = semverCoerce(releaseRef.versionString);
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
			const earliestVersion = semverCoerce(repoConfig.earliestVersion);
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
