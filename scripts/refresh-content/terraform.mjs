import fs from "fs";
import path from "path";
import { execSync } from "child_process";
// Third-party
import semver from "semver";
// Local
import { ALL_REPO_CONFIG } from "./repo-config.mjs";

const TEMP_DIR = ".content-source-repos";

main();

function main() {
	// Ensure the temporary directory exists, this is where repos will be cloned.
	if (!fs.existsSync(TEMP_DIR)) {
		fs.mkdirSync(TEMP_DIR, { recursive: true });
	}
	//
	let repoName;
	let repoDir;
	let targetVersion;
	let repoConfig;
	// Testing out Boundary content, extracting a specific version
	// repoName = "boundary";
	// targetVersion = "v0.16.x";
	// repoDir = shallowCloneRepo(TEMP_DIR, "hashicorp", repoName);
	// extractVersionedDocs(
	// 	repoDir,
	// 	repoName,
	// 	ALL_REPO_CONFIG[repoName],
	// 	targetVersion
	// );
	repoName = "boundary";
	repoConfig = ALL_REPO_CONFIG[repoName];
	repoDir = shallowCloneRepo(TEMP_DIR, "hashicorp", repoName);
	extractAllVersionedDocs(repoDir, repoName, repoConfig);
	// Testing out Terraform content, extracting all versions
	// repoName = "terraform";
	// repoConfig = ALL_REPO_CONFIG[repoName]
	// repoDir = shallowCloneRepo(TEMP_DIR, "hashicorp", repoName);
	// extractAllVersionedDocs(repoDir, repoName, repoConfig);
}

/**
 *
 */
function extractAllVersionedDocs(repoDir, repoName, repoConfig) {
	//
	const releaseRefs = getReleaseRefs(repoName, repoDir, repoConfig);
	const uniqueReleaseRefs = getUniqueReleaseRefs(releaseRefs, repoConfig);
	/**
	 * For each release ref, check out the ref, and copy the content from
	 * the website directory into this project.
	 */
	for (let i = uniqueReleaseRefs.length - 1; i > 0; i--) {
		// Extract content, data, and assets from the repo
		extractFromFilesystem(repoName, repoDir, uniqueReleaseRefs[i], repoConfig);
	}
}

/**
 *
 */
function extractVersionedDocs(repoDir, repoName, repoConfig, targetVersion) {
	//
	const releaseRefs = getReleaseRefs(repoName, repoDir, repoConfig);
	//
	const targetRef = releaseRefs.find((r) => r.versionString === targetVersion);
	if (!targetRef) {
		throw new Error(
			`Error: Could not find release ref for version "${targetVersion}".`
		);
	}
	// Extract content, data, and assets from the repo
	extractFromFilesystem(repoName, repoDir, targetRef, repoConfig);
}

/**
 * TODO: need to implement
 *
 * - getReleaseRefs
 * - semver sort
 *
 * @param {*} repoName
 * @param {*} repoDir
 * @param {*} repoConfig
 */
function getUniqueReleaseRefs(releaseRefs, repoConfig) {
	//
	if (repoConfig.patch !== "generic") {
		throw new Error("TODO: need to handle non-generic patch case");
	}
	//
	const uniqueRefs = {};
	//
	const sortedRefs = releaseRefs.sort((a, b) => {
		return semver.compare(a.version, b.version);
	});
	//
	for (const refEntry of sortedRefs) {
		const versionString = refEntry.versionString;
		const genericVersionString = versionString.replace(/\d+$/, "x");
		if (!uniqueRefs[genericVersionString]) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		}
		//
		const existingRef = uniqueRefs[genericVersionString];
		// If the existing ref is a tag, and the incoming ref is a release branch,
		// use the incoming ref
		if (
			existingRef.ref.startsWith("refs/tags") &&
			refEntry.ref.startsWith("refs/remotes/origin")
		) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		} else if (
			existingRef.ref.startsWith("refs/remotes/origin") &&
			refEntry.ref.startsWith("refs/tags")
		) {
			continue;
		}
		// If the existing ref and the incoming ref are different versions,
		// use the latest one
		if (semver.gt(refEntry.version, existingRef.version)) {
			uniqueRefs[genericVersionString] = refEntry;
			continue;
		} else if (semver.lt(refEntry.version, existingRef.version)) {
			continue;
		}

		// Otherwise, just continue, using the existing ref
		continue;
	}
	const uniqueRefsArray = Object.values(uniqueRefs)
		.sort((a, b) => {
			return semver.compare(a.version, b.version);
		})
		.map((refEntry) => {
			const versionString = refEntry.versionString;
			const genericVersionString = versionString.replace(/\d+$/, "x");
			return { ...refEntry, versionString: genericVersionString };
		});

	console.log(
		sortedRefs.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	);
	console.log(
		uniqueRefsArray.map(({ ref, versionString }) => ({
			ref,
			versionString,
		}))
	);
	return uniqueRefsArray;
}

/**
 *
 */
function getReleaseRefs(repoName, repoDir, repoConfig) {
	//
	const refsList = getRefs(repoDir);
	//
	console.log(`Found ${refsList.length} refs in ${repoName}.`);
	console.log(refsList.map((r) => r.ref).slice(-50));
	/**
	 * Find the relevant release refs.
	 *
	 * Release refs are refs used to populate our existing content API. We want
	 * to mirror the content in our existing API in this repository, so we want
	 * to extract content from any refs that match the previous releaseRefPattern.
	 */
	const rawReleaseRefs = refsList
		.filter(({ ref }) => repoConfig.releaseRefPattern.test(ref))
		.map((releaseRef) => {
			const versionString = repoConfig.versionStringFromRef(releaseRef.ref);
			return { ...releaseRef, versionString };
		});
	console.log(`Found ${rawReleaseRefs.length} pattern-matched release refs.`);
	//
	const releaseRefs = rawReleaseRefs
		.map((releaseRef) => {
			const versionSemver = semver.coerce(releaseRef.versionString);
			return {
				...releaseRef,
				version: versionSemver,
			};
		})
		.filter(({ version }) => {
			//
			if (!repoConfig.earliestVersion) {
				return true;
			}
			//
			const earliestVersion = semver.coerce(repoConfig.earliestVersion);
			if (!earliestVersion) {
				throw new Error(
					`Error: Earliest version "${repoConfig.earliestVersion}" is not a valid semver version.`
				);
			} else {
				//
				const isInRange = semver.gte(version, earliestVersion);
				return isInRange;
			}
		});

	console.log(`Found ${releaseRefs.length} release refs with valid versions.`);
	return releaseRefs;
}

/**
 *
 */
function extractFromFilesystem(repoName, repoDir, releaseRef, repoConfig) {
	//
	console.log(
		`Checking out ref "${releaseRef.ref}" (hash "${releaseRef.hash}")...`
	);
	// Check out the hash corresponding to this release ref
	execSync(`git checkout ${releaseRef.hash}`, {
		stdio: "inherit",
		cwd: repoDir,
	});
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
		releaseRef.versionString,
		repoConfig.assetDir.replace("public/", "")
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
		releaseRef.versionString,
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
		releaseRef.versionString,
		repoConfig.dataDir
	);
	clearAndCopyDir(dataDirPath, dataDest);
	//
	return;
}

/**
 *
 */
function getRefs(repoDir) {
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
 * Clone the repository into the temporary directory, using the `gh` CLI.
 *
 * You must be authenticated, and have read access to the target repository,
 * in order for this to work. We use a shallow clone since there are only a
 * small percentage of refs with content we'll actually use.
 *
 * Note that if the repository already exists, we do _not_ clone it again.
 */
function shallowCloneRepo(cwd, repoOwner, repoName) {
	const repoDir = path.join(cwd, repoName);
	/**
	 * Clone the repository if it doesn't already exist.
	 */
	if (!fs.existsSync(repoDir)) {
		execSync(`gh repo clone ${repoOwner}/${repoName} -- --filter=blob:none`, {
			stdio: "inherit", // Nice to see progress for large repos
			cwd,
		});
	}
	//
	return repoDir;
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
