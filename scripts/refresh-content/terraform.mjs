import fs from "fs";
import path from "path";
import { execSync } from "child_process";
// Third-party
import semver from "semver";

const TEMP_DIR = ".content-source-repos";

/**
 * TODO: we have different content directory structures across repos.
 *
 * In the current API, powered by mktg-content-workflows, we have repo-config
 * that handles these differences. In the short term, it probably makes sense
 * to mirror that type of config in this repository.
 *
 * On the other hand, it would be nice to not have to deal with these cases...
 * Maybe during the process of migrating docs to this repo, we standardize
 * the directory structure? As long as the API routes are still drop-in
 * replacements for the previous API, maybe that'd make sense... rather than
 * migrating repo-config, we migrate in a way that requires less (maybe zero)
 * "repo-config".
 *
 * Related thought: migration scripting probably makes sense? Script would:
 * - Pull down the content source repo
 * - Iterate over known versions (based on our existing live content API), and
 *   for each known version of content...
 * - Check out the ref for that version
 * - Copy content into `public/products`, with the content directory now
 *   normalized (probably to `content`, since that's most common?)
 *
 * @type Record<string, { websiteDir: string, contentDir: string }>
 */
const allRepoConfig = {
	// boundary: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// consul: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "hcp-docs": {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// nomad: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// packer: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "ptfe-releases": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// sentinel: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	terraform: {
		assetDir: "img",
		contentDir: "docs",
		dataDir: "data",
		releaseRefPattern:
			/^(refs\/heads\/|refs\/remotes\/origin\/)?(v\d+[.]\d+)$/i,
		websiteDir: "website",
		patch: "generic",
	},
	// "terraform-cdk": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-docs-agents": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-docs-common": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-framework": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-log": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-mux": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-sdk": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-testing": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// vagrant: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// vault: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// waypoint: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
};

main();

function main() {
	// Ensure the temporary directory exists, this is where repos will be cloned.
	if (!fs.existsSync(TEMP_DIR)) {
		fs.mkdirSync(TEMP_DIR, { recursive: true });
	}
	/**
	 * TODO: work through ALL repositories. Could iterate over `repoConfig`?
	 *
	 * For now, doing hashicorp/terraform only. Code below could likely
	 * be extracted to a function, and called for each repository.
	 */
	const repoOwner = "hashicorp";
	const repoName = "terraform";
	//
	const repoDir = shallowCloneRepo(TEMP_DIR, repoOwner, repoName);
	//
	const refsList = listGitRefs(path.join(TEMP_DIR, repoName));
	//
	const repoConfig = allRepoConfig[repoName];
	/**
	 * Filter for release refs. These are refs which we would have extracted
	 * with our content API, so content in these refs should be published
	 * to our docs website.
	 */
	const releaseRefs = refsList.filter(({ ref }) =>
		repoConfig.releaseRefPattern.test(ref)
	);
	/**
	 * For each release ref, check out the ref, and copy the content from
	 * the website directory into this project.
	 */
	for (let i = releaseRefs.length - 1; i > releaseRefs.length - 2; i--) {
		const releaseRef = releaseRefs[i];
		// Check out the hash corresponding to this release ref
		execSync(`git checkout ${releaseRef.hash}`, {
			stdio: "inherit",
			cwd: repoDir,
		});
		// Extract content, data, and assets from the repo

		extractFromContentRepo(repoName, repoDir, releaseRef, repoConfig);
	}
	/**
	 * TODO: many more content source repos for Terraform
	 * ...
	 */
}

/**
 *
 */
function extractFromContentRepo(repoName, repoDir, releaseRef, repoConfig) {
	//
	const versionString = versionStringFromReleaseRef(releaseRef, repoConfig);
	/**
	 * Determine the website directory path. The content, assets, and data
	 * for the website are expected to exist within this directory.
	 */
	const websiteDirPath = path.join(repoDir, repoConfig.websiteDir);
	// Copy the assets directory to a new destination in the public folder
	/**
	 * TODO: need to account for versioning here... maybe start with the newest
	 * version, and work backwards... if we hit a file conflict, then rename
	 * with the version number?
	 */
	const assetDirPath = path.join(websiteDirPath, repoConfig.assetDir);
	const assetDest = path.join(
		process.cwd(),
		"public",
		"assets",
		repoName,
		versionString,
		repoConfig.assetDir
	);
	// Execute the copy
	clearAndCopyDir(assetDirPath, assetDest);
	// Copy content into versioned destination directory
	const contentDirPath = path.join(websiteDirPath, repoConfig.contentDir);
	const contentDest = path.join(
		process.cwd(),
		"public",
		"products",
		repoName,
		versionString,
		repoConfig.contentDir
	);
	clearAndCopyDir(contentDirPath, contentDest);
	// Copy data into versioned destination directory
	const dataDirPath = path.join(websiteDirPath, repoConfig.dataDir);
	const dataDest = path.join(
		process.cwd(),
		"public",
		"products",
		repoName,
		versionString,
		repoConfig.dataDir
	);
	clearAndCopyDir(dataDirPath, dataDest);
	//
	return;
}

/**
 *
 */
function listGitRefs(repoDir) {
	// List all the refs with `git show-ref`, and parse each ref and hash
	const gitShowRefsOutput = execSync("git show-ref", {
		cwd: repoDir,
	}).toString();
	const refsList = gitShowRefsOutput
		.split("\n") // git show-ref logs a hash and ref on each line
		.filter((l) => l !== "") // Filter out empty lines
		.map((line) => {
			// Parse the hash and ref from each line
			const [hash, ref] = line.split(" ");
			return { hash, ref };
		});
	//
	return refsList;
}

/**
 *
 */
function shallowCloneRepo(cwd, repoOwner, repoName) {
	/**
	 * Clone the repository if it doesn't already exist. We use a shallow
	 * clone since there's only a small percentage of refs we'll actually use.
	 */
	if (!fs.existsSync(path.join(cwd, repoName))) {
		execSync(`gh repo clone ${repoOwner}/${repoName} -- --filter=blob:none`, {
			stdio: "inherit",
			cwd,
		});
	}
	//
	return path.join(cwd, repoName);
}

/**
 * TODO: version format varies for PTFE, need to account for this...
 * probably best to do with `repoConfig` rather than conditional...
 */
function versionStringFromReleaseRef(releaseRef, repoConfig) {
	const rawVersionString = repoConfig.releaseRefPattern.exec(releaseRef.ref)[2];
	const versionSemver = semver.coerce(rawVersionString);
	let versionString;
	if (repoConfig.patch === "generic") {
		const { major, minor } = versionSemver;
		versionString = `v${major}.${minor}.x`;
	} else {
		const { major, minor, patch } = versionSemver;
		versionString = `v${major}.${minor}.${patch}`;
	}
	return versionString;
}

/**
 * Given a source directory path, and a destination directory path,
 * ensure the parent directory for the destination exists, then clear the
 * destination directory, and finally copy the source directory to the
 * destination.
 *
 * @param {string} src
 * @param {string} dest
 */
function clearAndCopyDir(src, dest) {
	// Ensure the parent for the destination directory exists
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(path.dirname(dest), { recursive: true });
	}
	// Clear any previously copied files
	execSync(`rm -rf ${dest}`, { stdio: "inherit" });
	// Copy the directory
	execSync(`cp -r ${src} ${dest}`, {
		stdio: "inherit",
	});
}
