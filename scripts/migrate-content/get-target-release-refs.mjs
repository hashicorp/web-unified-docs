/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

// Third-party
import semver from 'semver'
// Local
import { fetchVersionMetadata } from './fetch-version-metadata.mjs'

/**
 * Given a `repoEntry` object, fetch version metadata from the content API,
 * Return an array of release ref objects for the repo.
 *
 * If the provided `targetVersions` array is non-empty, we filter the fetched
 * release refs, only returning those that match the provided target versions.
 *
 * If `targetVersions` is empty or undefined, we return all release refs.
 *
 * @param {Object} repoEntry
 * @param {*} repoEntry.repoSlug
 * @param {*} repoEntry.targetVersions
 * @param {*} repoEntry.repoConfig
 * @return {Promise<Array>} An array of release ref objects. Each object has
 * { ref, hash, versionString, version }, where `version` is a semver object,
 * and the rest of the properties are strings.
 */
export async function getTargetReleaseRefs({
	repoSlug,
	repoConfig,
	targetVersions,
}) {
	// Grab unique release refs from the content API
	const contentApiReleaseRefs = await getReleaseRefsFromContentAPI(
		repoSlug,
		repoConfig.semverCoerce,
	)
	// Filter the fetched release refs based on provided target versions
	const isTargetReleaseRefs = targetVersions?.length
		? ({ versionString }) => {
				return targetVersions.includes(versionString)
			}
		: () => {
				return true
			}
	const targetReleaseRefs = contentApiReleaseRefs.filter(isTargetReleaseRefs)
	return targetReleaseRefs
}

/**
 * Given a content source repo slug, and a corresponding repo config object,
 * Return an array of release refs derived from the existing content API.
 *
 * TODO: we probably need to retain some version metadata properties
 * in order for our versioning to work as it does upstream. Right now,
 * we only retain `version` (as `versionString`), `ref`, and `sha`.
 *
 * For example, maybe we should retain `isLatest` and `releaseStage`? And
 * maybe write these to `_version-metadata.json` or something, that can
 * then be collected in our `gather-version-metadata` script? This could
 * probably be separate from the initial migration scripts work...
 * but definitely needs to be accounted for.
 *
 * @param {string} contentSourceRepo A string representing the name of a
 * content source repository. For example, `boundary`, `terraform-enterprise`, etc.
 * @param {Function} semverCoerce A function that coerces a version string into
 * a semver version object. Nearly all repos use semver versioning, so this is
 * typically `semver.coerce`. However, exceptions may exist, such as for
 * Terraform Enterprise, so we allow this to be passed in.
 * @returns {Promise<Array>} An array of release ref objects. Each object
 * should have the shape `{ hash, ref, version, versionString}`, where
 * `hash`, `ref`, and `versionString` are strings, and `version` is a semver
 * version object.
 */
async function getReleaseRefsFromContentAPI(contentSourceRepo, semverCoerce) {
	// Fetch the version metadata from the existing content API
	const versionMetadata = await fetchVersionMetadata(contentSourceRepo)
	// Map version metadata to release ref entries
	const releaseRefs = versionMetadata.result.map((entry) => {
		return {
			versionString: entry.version,
			ref: entry.ref,
			hash: entry.sha,
		}
	})
	// Add a coerced semver version to each entry
	const releaseRefsWithVersions = releaseRefs.map((entry) => {
		return { ...entry, version: semverCoerce(entry.versionString) }
	})
	// Sort versions by semver
	const sortedReleaseRefs = releaseRefsWithVersions.sort((a, b) => {
		return semver.compare(a.version, b.version)
	})
	// Return the sorted refs derived from existing content API version metadata
	return sortedReleaseRefs
}
