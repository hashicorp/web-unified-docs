import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

/**
 * Given the path to a directory,
 *
 * Return a list of all files in the directory, walking the directory
 * recursively, in parallel, to surface all files within subdirectories.
 *
 * @param {string} dir
 * @returns {Promise<string[]>} a list of all files in the directory
 */
export default async function listFiles(dir) {
	// Gather all entries in the directory, which may be files or nested dirs
	const entries = await readdir(dir)
	// Map over each entry, keep files as-is, and recursively walk directories
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.resolve(dir, entry)
			const isDirectory = (await stat(fullPath)).isDirectory()
			return isDirectory ? listFiles(fullPath) : fullPath
		}),
	)
	// Flatten the array, exploding lists of files yielded from directories
	return files.flat()
}
