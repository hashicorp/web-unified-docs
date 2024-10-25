import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

/**
 * Clone the repository into the target directory, using the `gh` CLI.
 *
 * You must be authenticated, and have read access to the target repository,
 * in order for this to work. We use a shallow clone since there are only a
 * small percentage of refs with content we'll actually use. If the clone
 * command fails, we'll throw an error, and we expect this to stop the script.
 *
 * Note that if the repository already exists, we do _not_ clone it again.
 * It is therefore _possible_ the directory is a stale clone of the repo,
 * or even something else entirely. We expect the consumer of this function
 * to handle such scenarios, for example by starting from an empty directory.
 *
 * @param {string} targetDir The directory where the repository will be cloned.
 * @param {string} repoOwner The owner of the repository.
 * @param {string} repoSlug The name of the repository.
 * @param {string} cloneArgs Additional arguments to pass to the `gh repo clone` command.
 * @returns {string} The path to the repository directory.
 */
export function cloneRepo(targetDir, repoOwner, repoSlug, cloneArgs) {
	/**
	 * Assuming the `gh repo clone` command will be successful, we expect
	 * the repository directory to be given the same name as the repository.
	 */
	const repoDir = path.join(targetDir, repoSlug)
	const repoDirExists = fs.existsSync(repoDir)
	// If the repository already exists, we skip cloning
	if (!repoDirExists) {
		console.log(`📡 Cloning "${repoSlug}" into "${targetDir}"...`)
		execSync(
			`git clone ${cloneArgs} https://github.com/${repoOwner}/${repoSlug}`,
			{
				stdio: 'inherit', // Nice to see progress for large repos
				cwd: targetDir,
			},
		)
	} else {
		console.log(`🔄 Directory already exists at "${repoDir}". Skipping clone.`)
	}
	// Return the path to the previously-existing or newly-cloned directory
	return repoDir
}
