import path from 'path'
import { execSync } from 'child_process'

/**
 * Given a directory that is expected to be a git repository, list all the refs
 * in that repository.
 *
 * @param {string} repoDir The path to the repository directory.
 * @returns {Array<{ hash: string, ref: string }>}
 */
export function getGitRefs(repoDir) {
	// List all the refs with `git show-ref`, and parse each ref and hash
	const output = execSync('git show-ref', {
		cwd: repoDir,
	}).toString()
	// Split the output to lines, and filter out empty lines
	const outputLines = output.split('\n').filter((l) => l !== '')
	// Parse the hash and ref from each line
	const refsList = outputLines.map((line) => {
		const [hash, ref] = line.split(' ')
		return { hash, ref }
	})
	//
	console.log(`Found ${refsList.length} refs in ${path.dirname(repoDir)}.`)
	console.log(refsList.map((r) => r.ref).slice(-50))
	// Return the list of { hash, ref } objects
	return refsList
}
