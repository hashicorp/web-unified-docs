// Third-party
import semver from 'semver'

// Define the base URL for the existing content API
const EXISTING_CONTENT_API = `https://content.hashicorp.com`

/**
 * Given a content source repo slug, and a corresponding repo config object,
 * Return an array of release refs derived from the existing content API.
 *
 * @param {string} contentSourceRepo
 *
 * Note: Nearly all repos use semver versioning. PTFE is one exception.
 * If semver versioning is not being used, the repo config must provide
 * a `semverCoerce` function, which given some custom version string,
 * returns a semver version object.
 *
 * Where semver versioning is used, this function can be omitted, and
 * we'll use `semver.coerce`.
 * @param {Function} semverCoerce
 * @returns {Promise<Array>} An array of release ref objects. Each object
 * should have the shape `{ hash, ref, version, versionString}`, where
 * `hash`, `ref`, and `versionString` are strings, and `version` is a semver
 * version object
 */
export async function getReleaseRefsFromContentAPI(
	contentSourceRepo,
	semverCoerce
) {
	// Fetch the version metadata from the existing content API
	const versionMetadata = await fetchVersionMetadata(contentSourceRepo)
	// Map version metadata to release ref entries
	// We drop a bunch of properties that we don't care about at this point.
	/**
	 * TODO: maybe we should care about more properties?
	 *
	 * For example, maybe we should care about`isLatest` and `releaseStage`?
	 * And write these to `_version-metadata.json` or something, that can
	 * then be collection in our `gather-version-metadata` script? This could
	 * probably be separate from the initial migration scripts work...
	 * but definitely needs to be accounted for.
	 */
	const releaseRefs = versionMetadata.map((entry) => ({
		versionString: entry.version,
		ref: entry.ref,
		hash: entry.sha,
	}))
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

/**
 * Given a content source repo slug,
 * Return an array of version metadata fetched from the existing content API.
 *
 * @param {string} contentSourceRepo
 * @returns {Promise<Array>} An array of version metadata objects. Each object
 * includes `{ version, ref, sha }`, as well as additional properties that are
 * expected to be unused.
 */
async function fetchVersionMetadata(contentSourceRepo) {
	const endpoint = getVersionMetadataEndpoint(contentSourceRepo)
	const response = await fetch(endpoint)
	if (!response.ok) {
		throw new Error(`Failed to fetch version metadata for ${contentSourceRepo}`)
	}
	const responseJson = await response.json()
	if (responseJson.meta?.status_code !== 200 || !responseJson.result) {
		throw new Error(
			`Failed to fetch version metadata for ${contentSourceRepo}. Received unexpected result: ${JSON.stringify(
				responseJson
			)}.`
		)
	}
	return responseJson.result.map(({ version, ref, sha }) => ({
		version,
		ref,
		sha,
	}))
}

/**
 * Given a content source repo slug,
 * Return the endpoint on the existing content API from which we can
 * fetch version metadata for the provided content source repo.
 *
 * @param {string} contentSourceRepo
 * @returns
 */
function getVersionMetadataEndpoint(contentSourceRepo) {
	return `${EXISTING_CONTENT_API}/api/content/${contentSourceRepo}/version-metadata?partial=true`
}
