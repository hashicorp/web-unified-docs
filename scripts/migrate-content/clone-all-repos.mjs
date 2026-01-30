/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'child_process'
// Local
import { cloneRepo } from './clone-repo.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { getTargetReleaseRefs } from './get-target-release-refs.mjs'

/**
 * This is intended as a SEPARATE script, not used in main migration scripts.
 *
 * Intent here is to provide a convenience for testing out migrations across
 * all content source repositories. Rather than having to wait for individual
 * repos to clone as you test each one individually, you can start this script,
 * walk away and have a beverage or nutrition break or whatever, and come back
 * to a snappier content migration testing experience.
 *
 * We start with a shallow clone for each repo, but we also fetch the known
 * release refs from the existing content API, and check those out too.
 * This makes subsequent checking out of refs a lil faster. It also takes a LOT
 * longer than just shallow cloning, but since the intent is to leave this
 * running while you go about other things, it feels worth the tradeoff.
 */

/**
 * GH_CLONE_TEMP_DIR temporarily holds cloned repos while we extract content
 * This directory can be deleted after running any migration scripts.
 */
const GH_CLONE_TEMP_DIR = '.content-source-repos'

// Run the clone & checkout refs for slugs of all repos in `PRODUCT_CONFIG`
main(Object.keys(PRODUCT_CONFIG), GH_CLONE_TEMP_DIR)

/**
 * Given an array of repoSlugs, and a temp directory in which to clone repos,
 * Shallow clone each repo into the temp directory, then for each repo, grab
 * the target release refs from our content API, and `git checkout` each ref
 * so that content at those refs is available for quick access later.
 *
 * @param {string[]} repoSlugs
 * @param {string} tempDir
 */
async function main(repoSlugs, tempDir) {
	for (const repoSlug of repoSlugs) {
		const repoConfig = PRODUCT_CONFIG[repoSlug]
		const cloneArgs = '--depth=1 --filter=blob:none'
		const cloneDir = cloneRepo(tempDir, 'hashicorp', repoSlug, cloneArgs)
		const targetReleaseRefs = await getTargetReleaseRefs({
			repoSlug,
			repoConfig,
		})
		for (let i = targetReleaseRefs.length - 1; i >= 0; i--) {
			const targetRef = targetReleaseRefs[i]
			console.log(
				`🥡 Checking out ref "${targetRef.ref}" (${targetRef.hash})...`,
			)
			execSync(`git restore . && git clean -f`, { cwd: cloneDir })
			execSync(`git checkout ${targetRef.hash}`, {
				stdio: 'inherit',
				cwd: cloneDir,
			})
			console.log(`✅ Checked out ref "${targetRef.ref}" (${targetRef.hash}).`)
		}
	}
}
