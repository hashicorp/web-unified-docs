import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
// Local
import { buildTargetRepos } from './build-target-repos.mjs'
import { clearAndCopy } from './clear-and-copy.mjs'
import { cloneRepo } from './clone-repo.mjs'
import { getTargetReleaseRefs } from './get-target-release-refs.mjs'

/**
 * GH_CLONE_DIR temporarily holds cloned repos while we extract content
 * This directory can be deleted after running any migration scripts.
 */
const GH_CLONE_DIR = '.content-source-repos'

/**
 * MIGRATION_OUTPUT_ROOT is the root directory for extracted content.
 * For now, we set it to a temporary `.migrated-content` directory.
 * Later, when we're actually ready to run migrations, we'll want to
 * output migrated content to `content` and `public` folders at the root
 * of this repo, so we'll change MIGRATION_OUTPUT_ROOT to `process.cwd()`.
 */
const MIGRATION_OUTPUT_ROOT = path.join(process.cwd(), '.migrated-content')
/**
 * MIGRATION_CONTENT_DIR is where extracted content & data will be placed.
 * This means `.mdx` files, `-nav-data.json` files, and redirects.
 */
const MIGRATION_CONTENT_DIR = path.join(MIGRATION_OUTPUT_ROOT, 'content')
/**
 * MIGRATION_ASSETS_DIR is where extracted assets will be placed.
 * In this context "assets" mostly just means images, though many products
 * have a few other types of assets as well, even if they're not as common.
 */
const MIGRATION_ASSETS_DIR = path.join(MIGRATION_OUTPUT_ROOT, 'public/assets')

/**
 * This script is intended to migrate content from "content source" repos
 * into this project.
 *
 * This script uses our existing `content.hashicorp.com` API to determine which
 * git refs provided the version content that is currently live on dev dot.
 * This script then clones the content source repo, checks out those git refs
 * fetched from our existing content API, and extracts content from each point
 * in git history.
 *
 * During extraction, content, data, and redirects are written into
 * `MIGRATION_CONTENT_DIR`. Assets are written into `MIGRATION_ASSETS_DIR`.
 * For example, after running this script with `content` and `public/assets`
 * respectively, we expect the following structure:
 * - content/${repoSlug}/${version}/content/<filepath>.mdx - MDX content
 * - content/${repoSlug}/${version}/data/<section>-nav-data.json - Nav data
 * - content/${repoSlug}/${version}/redirects.js - all redirects in one file
 * - public/assets/${repoSlug}/${version}/<filepath>.<ext> - assets, eg images
 *
 * EXAMPLES
 *
 * Running this script from project root:
 *
 * Extract all Terraform content:
 * `node ./scripts/migrate-content/migrate-content.mjs terraform`
 * Extract Terraform v1.1.x content:
 * `node ./scripts/migrate-content/migrate-content.mjs terraform:v1.1.x`
 * Extract content for many products at once:
 * `node ./scripts/migrate-content/migrate-content.mjs boundary consul terraform`
 */

/**
 * TODO: this script is _not_ done. There are at least a few edge cases that
 * still need to be handled.
 *
 * For example, in older versions of many products, content is in a `pages`
 * directory, rather than `content`. Our existing scripts in
 * `mktg-content-workflows` somehow account for this, we'll need to do the same
 * during migration in order to maintain parity in what content we're serving.
 *
 * To discover all these edge cases and examples, we'll need to go beyond
 * running the migration scripts, and actually testing that after migrating
 * content, our new API returns responses that match the existing
 * `content.hashicorp.com` API.
 */

/**
 * TODO: add another step to process versioned assets in some way.
 * Asana task: https://app.asana.com/0/1207899860738460/1207910088307871/f
 *
 * Possible approach:
 * - Assets can either be versioned, or shared across versions
 * - Versioned assets in `public/assets/${repoSlug}/${version}/...`. The
 *   `migrateContent` script is expected to handle ALL assets this way, even
 *   if they are shared across versions.
 * - Shared assets in `public/assets/${repoSlug}/common`. This directory will
 *   start empty, and we'll use a script to populate it with shared assets.
 *
 * Starting with the newest version directory:
 * - For each asset...
 * - Check whether an identical asset exists in _any_ previous version. Must
 *   share file name, and must be the same image (TODO: figure out how to check
 *   this, visual diff tool would probably come in handy!). If the asset does
 *   match, then copy the asset to "shared", and remove it from _all_ versioned
 *   directories in which it appears. Create a map of "versioned asset path"
 *   to "shared asset path", which we'll later use in a remark plugin to rewrite
 *   asset paths.
 * - If the asset doesn't exist in any previous version, retain it in the
 *   versioned directory. This asset will _not_ be added to the map.
 *
 * Then, we'll run a remark plugin to rewrite asset paths in content:
 *
 * - For each asset path in the content:
 * - If the asset path is in the map, rewrite the path to the shared asset path.
 * - If the asset path is not in the map, rewrite it to a versioned path.
 *
 * After running this script, we should expect to have a decent chunk of assets
 * moved into the "shared" directory. As well, we should expect that the asset
 * paths referenced in MDX will now be _actual_ paths that can be fetched
 * directly from our content API. This should remove the need for complex asset
 * path rewriting... (though we'll probably still need to mess with things a
 * bit to make `next-image` happy, maybe? I feel like it needs image dimensions
 * or something but I can't remember exactly).
 */

// Parse and validate input arguments
const args = process.argv.slice(2)
const targetRepos = buildTargetRepos(args)

// Run the main script
await migrateContent(targetRepos, GH_CLONE_DIR, {
	content: MIGRATION_CONTENT_DIR,
	assets: MIGRATION_ASSETS_DIR,
})

/**
 * Given an array of { repo, targetVersions, repoConfig } objects,
 * as well as an object that specifics target directories,
 * Extract content from the target repos at the specified versions.
 *
 * @param {Array<{ repo: string, targetVersions: string[], repoConfig: Record<string, any> }>} targetRepos
 * @param {string} ghCloneDir
 * @param {Object} outputDirs
 * @param {string} outputDirs.content
 * @param {string} outputDirs.assets
 * @returns
 */
async function migrateContent(targetRepos, ghCloneDir, outputDirs) {
	// Ensure the temporary directory exists, this is where repos will be cloned.
	if (!fs.existsSync(ghCloneDir)) {
		fs.mkdirSync(ghCloneDir, { recursive: true })
	}
	// Log that we're starting the extraction process for the target repos
	const targetsDebug = targetRepos.map((t) => {
		const targetVersionsDebug = t.targetVersions.length
			? t.targetVersions.join(',')
			: '(all versions)'
		return `${t.repoSlug}:${targetVersionsDebug}`
	})
	console.log(
		`ℹ️ Running migration for content source repos:\n${JSON.stringify(
			targetsDebug,
			null,
			2
		)}`
	)
	/**
	 * Iterate over content source repos, cloning each repo,
	 * and extracting content from the relevant `releaseRefs`.
	 */
	for (const repoEntry of targetRepos) {
		const { repoSlug, repoConfig } = repoEntry
		// Log that we're starting on this specific repo
		console.log(`💼 Migrating content for "${repoSlug}"...`)
		// Determine the target release refs for this repo
		const targetReleaseRefs = await getTargetReleaseRefs(repoEntry)
		// If we have no target release refs, log and skip this repo
		if (targetReleaseRefs.length === 0) {
			console.log(`🔄 No target versions found for "${repoSlug}". Skipping...`)
			continue
		}
		/**
		 * Otherwise, we have release refs to extract.
		 * Start by shallow cloning the repo.
		 */
		const cloneArgs = '--depth=1 --filter=blob:none'
		const cloneDir = cloneRepo(ghCloneDir, 'hashicorp', repoSlug, cloneArgs)
		/**
		 * For each release ref, check out the ref, and copy the content, data,
		 * and assets from the content source repository into this project.
		 *
		 * Note these must be done serially, as we're using the same cloned
		 * repository directory to check out different points in git history
		 * corresponding to each release ref.
		 */
		const refDebugStrings = targetReleaseRefs.map(
			(t) => `${t.versionString} (${t.ref})`
		)
		console.log(
			`🛠️  Extracting content from the "${repoSlug}" repo at refs:
			${JSON.stringify(refDebugStrings, null, 2)}`
		)
		for (let i = targetReleaseRefs.length - 1; i >= 0; i--) {
			const targetRef = targetReleaseRefs[i]
			await migrateRepoContentAtRef({
				repoSlug,
				cloneDir,
				targetRef,
				repoConfig,
				outputDirs,
			})
			console.log(
				`🟢 Finished extracting "${repoSlug}" content from "${targetRef.ref}".`
			)
		}
		console.log(`🟢 Finished migrating content from "${repoSlug}".`)
	}
	// Log out that we're done with all repos, then return
	console.log(`✅ Finished migrating all target repos and versions.`)
	/**
	 * TODO: i feel like this script should just exit anyways, but it seems
	 * to be doing so inconsistently. Probably an `await` thing but I'm not
	 * sure what. Need to investigate further. Can uncomment `process.exit()`
	 * for now as a stopgap when it's annoying.
	 */
	// process.exit()
	return true
}

/**
 * TODO: write description
 *
 * @param {Object} config
 * @param {*} config.repoSlug
 * @param {*} config.cloneDir
 * @param {*} config.targetRef
 * @param {*} config.repoConfig
 * @param {*} config.outputDirs
 * @return {void}
 */
async function migrateRepoContentAtRef({
	repoSlug,
	cloneDir,
	targetRef,
	repoConfig,
	outputDirs,
}) {
	/**
	 * `git checkout` out the hash corresponding to this release ref
	 */
	console.log(`🥡 Checking out ref "${targetRef.ref}" (${targetRef.hash})...`)
	execSync(`git restore . && git clean -f`, { cwd: cloneDir })
	execSync(`git checkout ${targetRef.hash}`, {
		stdio: 'inherit',
		cwd: cloneDir,
	})
	/**
	 * Determine the website directory path. The content, assets, and data
	 * for the website are expected to exist within this directory.
	 *
	 * Based on this website path, set up source directory paths.
	 * Based on incoming repoConfig, releaseRef version, and outputDirs,
	 * set up destination directory paths.
	 */
	const websiteDirPath = path.join(cloneDir, repoConfig.websiteDir)
	const assetsSrc = path.join(websiteDirPath, repoConfig.assetDir)
	const assetsDest = path.join(
		outputDirs.assets,
		repoSlug,
		targetRef.versionString,
		repoConfig.assetDir.replace('public', '')
	)
	const contentSrc = path.join(websiteDirPath, repoConfig.contentDir)
	const contentDest = path.join(
		outputDirs.content,
		repoSlug,
		targetRef.versionString,
		repoConfig.contentDir
	)
	const dataSrc = path.join(websiteDirPath, repoConfig.dataDir)
	const dataDest = path.join(
		outputDirs.content,
		repoSlug,
		targetRef.versionString,
		repoConfig.dataDir
	)
	/**
	 * Execute the copy commands in parallel, clearing out directories first
	 */
	await Promise.all([
		clearAndCopy(assetsSrc, assetsDest),
		clearAndCopy(contentSrc, contentDest),
		clearAndCopy(dataSrc, dataDest),
	])
	return true
}
