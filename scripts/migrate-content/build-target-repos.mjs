/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Given an array of argument strings, parse the intended target content
 * source repos and versions from args, and
 * Return an array of target repo objects.
 *
 * @param {string[]} args
 * @returns {Array<{ repo: string, targetVersions: string[], repoConfig: Record<string, any> }>}
 */
export function buildTargetRepos(args) {
	/**
	 * Validate that we have arguments. We need at least one repo slug.
	 *
	 * Note that in theory, we could try to migrate content for _all_ repos
	 * when no args are provided. However, this is rarely a practical use case,
	 * since it takes a ton of time and produces an overwhelming number of
	 * changes in git.
	 */
	if (args.length === 0) {
		throw new Error(
			`Please provide at least one repository slug as an argument. For example, to extract Terraform content, you can run "node migrate-content.mjs terraform". You can optionally pass specific versions to extract from each content repository. For example, to extract Terraform v1.1.x content, you can run "node migrate-content.mjs terraform:v1.1.x".`,
		)
	}
	// Parse repoSlug and versions from args
	const targetRepos = args.map((arg) => {
		const [repoSlug, versionsPart] = arg.split(':')
		const targetVersions = versionsPart ? versionsPart.split(',') : []
		return { repoSlug, targetVersions }
	})
	// Validate repo slugs
	const allRepoSlugs = Object.keys(PRODUCT_CONFIG)
	const invalidRepoSlugs = targetRepos
		.map((repoEntry) => {
			return repoEntry.repoSlug
		})
		.filter((repoSlug) => {
			return !allRepoSlugs.includes(repoSlug)
		})
	// Throw an error if any invalid repo slugs are found
	if (invalidRepoSlugs.length > 0) {
		throw new Error(
			`Invalid repo slugs: ${JSON.stringify(
				invalidRepoSlugs,
			)}. Repo slugs must be one of: ${JSON.stringify(
				allRepoSlugs,
			)}. Please remove any invalid repo slugs.`,
		)
	}
	// At this point we know we have all valid repos, add repoConfig to each
	const targetReposWithConfig = targetRepos.map((repoEntry) => {
		return {
			repoSlug: repoEntry.repoSlug,
			targetVersions: repoEntry.targetVersions,
			repoConfig: PRODUCT_CONFIG[repoEntry.repoSlug],
		}
	})
	// Return the array of target repo objects
	return targetReposWithConfig
}
