export function getVersionFromFilePath(filePath) {
	if (!filePath.length) {
		throw new Error('File path is empty')
	}

	const version = filePath.split('content/')[1].split('/')[1]

	/** This REGEX is used to parse a product version from a URL */
	const VERSION_IN_PATH_REGEX = /v\d+\.\d+\.(\d+|\w+)/i

	/** This REGEX is used to parse a Terraform Enterprise version from a URL */
	const TFE_VERSION_IN_PATH_REGEX = /v[0-9]{6}-\d+/i

	if (
		VERSION_IN_PATH_REGEX.test(filePath) ||
		TFE_VERSION_IN_PATH_REGEX.test(filePath)
	) {
		return version
	}
}
