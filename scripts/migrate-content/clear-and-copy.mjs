import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/**
 * Given a source directory path, and a destination directory path,
 * first ensure the parent directory for the destination exists. Then, clear the
 * destination directory, removing all files and subfolders. Finally, copy the
 * source directory to the destination.
 *
 * @param {string} src
 * @param {string} dest
 * @returns {void}
 */
export function clearAndCopy(src, dest) {
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
