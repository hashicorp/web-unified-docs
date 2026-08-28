/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Matches semantic-like versions with(or without) a leading v,
 * including two-part aliases like v2.x. or 2.x
 */
export const VERSION_IN_PATH_REGEX = /^v?\d+\.(?:\d+|\w+)(?:\.(?:\d+|\w+))?$/i

/** Matches Terraform Enterprise release versions like v202410-1. */
export const TFE_VERSION_IN_PATH_REGEX = /^v[0-9]{6}-\d+$/i

/** Returns true when the provided path segment is any recognized version format. */
export function isVersionPathSegment(value) {
	if (!value) {
		return false
	}

	return (
		TFE_VERSION_IN_PATH_REGEX.test(value) || VERSION_IN_PATH_REGEX.test(value)
	)
}
