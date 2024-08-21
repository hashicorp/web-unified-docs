// Third-party
import semver from 'semver'

/**
 * Given a semver version object, and a repoConfig object which may
 * contain an `earliestVersion` string property,
 * Return a boolean indicating whether the provided `version` is greater
 * or equal to the `earliestVersion`.
 *
 * If `earliestVersion` is undefined, return `true`.
 * If `earliestVersion` is defined but cannot be coerced into a semver
 * version, throw an error.
 *
 * @param {Object} version A valid semver object
 * @param {Object} repoConfig
 * @param {Function} repoConfig.semverCoerce A function that will be used
 * to coerce the `earliestVersion` string into a semver object.
 * @param {string} repoConfig.earliestVersion A string representing the
 * earliest version that should be considered in range.
 * @returns
 */
export function getIsVersionInRange(version, repoConfig) {
	// Destructure the optional earliestVersion & semverCoerce from repoConfig
	const { earliestVersion, semverCoerce } = repoConfig
	// If the repoConfig does not specify an earliestVersion, then all
	// versions are considered in range.
	if (typeof earliestVersion === 'undefined') {
		return true
	}
	// If an earlier version is specified, first test if it's a valid semver
	// version. If not, throw an error.
	const semverEarliestVersion = semverCoerce(earliestVersion)
	if (!semverEarliestVersion) {
		throw new Error(
			`Error: Earliest version "${earliestVersion}" is not a valid semver version.`
		)
	}
	// At this point, we know we have a valid `earliestVersion` semver object.
	// Compare this entry's version to determine if it is greater than or equal
	// (gte) the specified earlier version. If it is, include, if not, drop.
	const isInRange = semver.gte(version, semverEarliestVersion)
	return isInRange
}
