import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
// Local
import { clearAndCopy } from './clear-and-copy.mjs'
import { cloneRepoShallow } from './clone-repo-shallow.mjs'
import { getGitRefs } from './get-git-refs.mjs'
import { getReleaseRefs } from './get-release-refs.mjs'
import { getUniqueReleaseRefs } from './get-unique-release-refs.mjs'
import { ALL_REPO_CONFIG } from './repo-config.mjs'

const TEMP_DIR = '.content-source-repos'
const OUTPUT_DIR = path.join(process.cwd(), '.migrated-content')

main()

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
 */
function main() {
	// Ensure the temporary directory exists, this is where repos will be cloned.
	if (!fs.existsSync(TEMP_DIR)) {
		fs.mkdirSync(TEMP_DIR, { recursive: true })
	}
	/**
	 * TODO: update to all of `Object.keys(ALL_REPO_CONFIG)`
	 * For now, feels helpful to test a subset of repos, even one at a time.
	 */
	const targetRepos = ['sentinel']
	const repoSlugs = Object.keys(ALL_REPO_CONFIG).filter((slug) => {
		return targetRepos.includes(slug)
	})
	console.log(`Target repos: ${repoSlugs.join(', ')}`)
	/**
	 * Iterate over content source repos, cloning the repo,
	 * and extracting content from the relevant `releaseRefs`.
	 */
	for (const repoSlug of repoSlugs) {
		console.log(`Migrating content for "${repoSlug}"...`)
		const repoConfig = ALL_REPO_CONFIG[repoSlug]
		const repoDir = cloneRepoShallow(TEMP_DIR, 'hashicorp', repoSlug)
		extractAllVersionedDocs(repoDir, repoSlug, repoConfig)
	}
}

/**
 *
 */
function extractAllVersionedDocs(repoDir, repoName, repoConfig) {
	/**
	 * TODO: probably makes more sense to grab the refs for each known version
	 * from the content API directly:
	 * https://web-platform-dashboard-hashicorp.vercel.app/
	 *
	 * Example case: some release branch `release/vX.Y.Z` may already exist, but
	 * may not yet have a corresponding release tag. Concrete example: sentinel.
	 *
	 * In this case, we'd want to ignore the release branch. With the info we
	 * have available in git, we might technically be able to detect this type
	 * of case (eg look for tags in a separate step, cross-check etc), but given
	 * our goal is parity with the existing API, seems more pragmatic to ask the
	 * existing content API what refs are currently powering the docs for each
	 * version.
	 *
	 * As-is, we get git refs from git commands... should re-do the steps to
	 * get `uniqueReleaseRefs`, I think!
	 */
	const refsList = getGitRefs(repoDir)
	const releaseRefs = getReleaseRefs(refsList, repoConfig)
	const uniqueReleaseRefs = getUniqueReleaseRefs(releaseRefs, repoConfig)
	/**
	 * For each release ref, check out the ref, and copy the content from
	 * the website directory into this project.
	 */
	for (let i = uniqueReleaseRefs.length - 1; i >= 0; i--) {
		// Extract content, data, and assets from the repo
		extractFromFilesystem(repoName, repoDir, uniqueReleaseRefs[i], repoConfig)
	}
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
	// Copy the assets directory to a new destination in the public folder
	/**
	 * TODO: need to account for versioning here... Possible approach:
	 * - Assets can either be versioned, or shared across versions
	 * - Versioned assets in `public/assets/${repoName}/${version}/...`
	 * - Shared assets in `public/assets/${repoName}/common`
	 *
	 * Starting with the newest version, copy all assets to the shared directory
	 * Working back through earlier versions:
	 * - If an identical assets exists in `common`, skip it
	 * - Else, copy the asset to the specific version directory
	 *
	 * Then, to fetch assets:
	 * - Front-end will *always* use a versioned URL, leading to an API route
	 * - We receive the request, and fetch both the common and versioned URLs
	 *   from the Vercel CDN. We return whichever one exists.
	 */
	const assetDirPath = path.join(websiteDirPath, repoConfig.assetDir)
	const assetDest = path.join(
		OUTPUT_DIR,
		'assets',
		repoName,
		releaseRef.versionString,
		repoConfig.assetDir.replace('public', '')
	)
	// Execute the copy
	clearAndCopy(assetDirPath, assetDest)
	// Copy content into versioned destination directory
	const contentDirPath = path.join(websiteDirPath, repoConfig.contentDir)
	const contentDest = path.join(
		OUTPUT_DIR,
		'products',
		repoName,
		releaseRef.versionString,
		repoConfig.contentDir
	)
	clearAndCopy(contentDirPath, contentDest)
	// Copy data into versioned destination directory
	const dataDirPath = path.join(websiteDirPath, repoConfig.dataDir)
	const dataDest = path.join(
		OUTPUT_DIR,
		'products',
		repoName,
		releaseRef.versionString,
		repoConfig.dataDir
	)
	clearAndCopy(dataDirPath, dataDest)
	//
	return
}
