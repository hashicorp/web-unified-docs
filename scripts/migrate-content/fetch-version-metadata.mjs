// Define the base URL for the existing content API
const EXISTING_CONTENT_API = `https://content.hashicorp.com`

/**
 * Given a content source repo slug,
 * Return an array of version metadata fetched from the existing content API.
 *
 * @param {string} contentSourceRepo
 * @returns {Promise<Array>} An array of version metadata objects. Each object
 * includes `{ version, ref, sha }`, as well as additional properties that are
 * expected to be unused.
 */
export async function fetchVersionMetadata(contentSourceRepo) {
	// Determine the endpoint to fetch from, based on the content source repo
	const endpoint = getVersionMetadataEndpoint(contentSourceRepo)
	// Run fetch
	const response = await fetch(endpoint)
	const responseJson = await response.json()
	/**
	 * Throw an error if we encounter an unexpected status code or result
	 * Note that status codes such as 404 should have already thrown from
	 * the `fetch` call, checking `status_code` here is extra insurance.
	 */
	if (responseJson.meta?.status_code !== 200 || !responseJson.result) {
		throw new Error(
			`Failed to fetch version metadata for ${contentSourceRepo}. Received unexpected result: ${JSON.stringify(
				responseJson
			)}.`
		)
	}
	// Return the response result
	return responseJson
}

/**
 * Given a content source repo slug,
 * Return the endpoint on the existing content API from which we can
 * fetch version metadata for the provided content source repo.
 *
 * @param {string} contentSourceRepo
 * @returns {string}
 */
function getVersionMetadataEndpoint(contentSourceRepo) {
	return `${EXISTING_CONTENT_API}/api/content/${contentSourceRepo}/version-metadata?partial=true`
}
