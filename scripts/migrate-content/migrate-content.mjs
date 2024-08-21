import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import semver from 'semver'
// Local
import { clearAndCopy } from './clear-and-copy.mjs'
import { cloneRepoShallow } from './clone-repo-shallow.mjs'
import { getReleaseRefsFromContentAPI } from './get-release-refs-from-content-api.mjs'
import { ALL_REPO_CONFIG } from './repo-config.mjs'

const TEMP_DIR = '.content-source-repos'
const OUTPUT_DIR = path.join(process.cwd(), '.migrated-content')

/**
 * Examples running this script from project root:
 *
 * Extract all Terraform content
 * node ./scripts/migrate-content/migrate-content.mjs terraform
 *
 * Extract Terraform v1.1.x content
 * node ./scripts/migrate-content/migrate-content.mjs terraform:v1.1.x
 *
 * Extract content for many products
 * node ./scripts/migrate-content/migrate-content.mjs boundary consul terraform
 */

// Validate input arguments
const args = process.argv.slice(2)
if (args.length === 0) {
	throw new Error(
		`Please provide at least one repository slug as an argument. For example, to extract Terraform content, you can run "node migrate-content.mjs terraform". You can optionally pass specific versions to extract from each content repository. For example, to extract Terraform v1.1.x content, you can run "node migrate-content.mjs terraform:v1.1.x".`
	)
}
const allRepoSlugs = Object.keys(ALL_REPO_CONFIG)
const targetRepos = []
for (const arg of args) {
	const [repo, versionsPart] = arg.split(':')
	if (!allRepoSlugs.includes(repo)) {
		throw new Error(
			`Invalid repo slug "${repo}". Repo slugs must be one of: ${JSON.stringify(
				allRepoSlugs
			)}`
		)
	}
	const repoConfig = ALL_REPO_CONFIG[repo]
	const targetVersions = versionsPart ? versionsPart.split(',') : []
	targetRepos.push({ repo, targetVersions, repoConfig })
}

// Run the main script
await migrateContent(targetRepos)
/**
 * TODO: add another step to process versioned assets in some way.
 *
 * Possible approach:
 * - Assets can either be versioned, or shared across versions
 * - Versioned assets in `public/assets/${repoName}/${version}/...`. The
 *   `migrateContent` script is expected to handle ALL assets this way, even
 *   if they are shared across versions.
 * - Shared assets in `public/assets/${repoName}/common`. This directory will
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

/**
 * This script is intended to migrate content from the "content source" repos
 * that power the docs content in our existing `content.hashicorp.com` API.
 *
 * TODO: this script is _not_ done. There are at least a few edge cases that
 * still need to be handled. For example, in older versions of many products,
 * content is in a `pages` directory, rather than `content`. Our existing
 * scripts in `mktg-content-workflows` somehow account for this, we'll need
 * to do the same during migration in order to maintain parity in what
 * content we're serving.
 *
 * TODO: write up edge cases, either below or in a separate file... maybe
 * add Asana tasks for them... and then we can probably move forward and merge
 * this script knowing that it's still a work in progress.
 */
async function migrateContent(targetRepos) {
	// Ensure the temporary directory exists, this is where repos will be cloned.
	if (!fs.existsSync(TEMP_DIR)) {
		fs.mkdirSync(TEMP_DIR, { recursive: true })
	}
	// Log that we're starting the extraction process for the target repos
	console.log(`Extracting content from the follow repositories:`)
	console.log(`Target repos: ${JSON.stringify(targetRepos)}`)
	/**
	 * Iterate over content source repos, cloning the repo,
	 * and extracting content from the relevant `releaseRefs`.
	 */
	for (const repoEntry of targetRepos) {
		const { repo, targetVersions, repoConfig } = repoEntry
		// Log that we're starting on this specific repo
		console.log(`Migrating content for "${repo}"...`)
		// Grab unique release refs from the content API
		const contentApiReleaseRefs = await getReleaseRefsFromContentAPI(
			repo,
			repoConfig.semverCoerce
		)
		// Filter the fetched release refs based on provided target versions
		const isTargetReleaseRefs = targetVersions.length
			? ({ versionString }) => targetVersions.includes(versionString)
			: ({ version }) => isVersionWithinConfigRange(version, repoConfig)
		const targetReleaseRefs = contentApiReleaseRefs.filter(isTargetReleaseRefs)
		// If we've filtered out all release refs, log and skip this repo
		if (targetReleaseRefs.length === 0) {
			console.log(`No target versions found for "${repo}". Skipping...`)
			continue
		}
		// We have release refs to extract, so clone the content repo
		// If the repo is already cloned, we'll check out the `main` branch.
		const repoDir = cloneRepoShallow(TEMP_DIR, 'hashicorp', repo)
		console.log(
			`Extracting content from the "${repo}" repo at the following refs:`
		)
		console.log(
			targetReleaseRefs.map(
				({ versionString, ref }) => `${versionString} (${ref})`
			)
		)
		/**
		 * For each release ref, check out the ref, and copy the content, data,
		 * and assets from the content source repository into this project.
		 */
		for (let i = targetReleaseRefs.length - 1; i >= 0; i--) {
			extractFromFilesystem(repo, repoDir, targetReleaseRefs[i], repoConfig)
		}
		console.log(`✅ Done extracting content from ${repo}.`)
	}
	console.log(`✅ Done extracting content from all target repositories.`)
	return true
}

/**
 * TODO: write description
 *
 * @param {*} version
 * @param {*} repoConfig
 * @returns
 */
function isVersionWithinConfigRange(version, repoConfig) {
	const { earliestVersion, semverCoerce } = repoConfig
	if (!earliestVersion) {
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

/**
 *
 */
function extractFromFilesystem(repoName, repoDir, releaseRef, repoConfig) {
	//
	console.log(
		`Checking out ref "${releaseRef.ref}" (hash "${releaseRef.hash}")...`
	)
	// Check out the hash corresponding to this release ref
	execSync(`git checkout ${releaseRef.hash}`, {
		stdio: 'inherit',
		cwd: repoDir,
	})
	/**
	 * Determine the website directory path. The content, assets, and data
	 * for the website are expected to exist within this directory.
	 */
	const websiteDirPath = path.join(repoDir, repoConfig.websiteDir)
	// TODO: make the code below a little more clear
	/**
	 * Copy the assets directory to a new destination in the public folder
	 * Note that we do _not_ attempt to handle versioned assets in any clever
	 * way here. We simply copy them over. We expect that subsequent scripts
	 * could be run on the copied assets and content in order to resolve
	 * duplicate assets across versions.
	 */
	console.log('Copying assets....')
	const assetDirPath = path.join(websiteDirPath, repoConfig.assetDir)
	const assetDest = path.join(
		OUTPUT_DIR,
		'assets',
		repoName,
		releaseRef.versionString,
		repoConfig.assetDir.replace('public', '')
	)
	// Execute the copy, clearing out the target directory first
	clearAndCopy(assetDirPath, assetDest)
	// Copy content into versioned destination directory
	console.log('Copying content....')
	const contentDirPath = path.join(websiteDirPath, repoConfig.contentDir)
	const contentDest = path.join(
		OUTPUT_DIR,
		'products',
		repoName,
		releaseRef.versionString,
		repoConfig.contentDir
	)
	// Execute the copy, clearing out the target directory first
	clearAndCopy(contentDirPath, contentDest)
	// Copy data into versioned destination directory
	console.log('Copying data....')
	const dataDirPath = path.join(websiteDirPath, repoConfig.dataDir)
	const dataDest = path.join(
		OUTPUT_DIR,
		'products',
		repoName,
		releaseRef.versionString,
		repoConfig.dataDir
	)
	// Execute the copy, clearing out the target directory first
	clearAndCopy(dataDirPath, dataDest)
	//
	return
}
