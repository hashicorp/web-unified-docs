import fs from "fs";
import path from "path";
// Third-party
import grayMatter from "gray-matter";
// Local
import listFiles from "../utils/list-files.mjs";
import { includePartials } from "./include-partials/include-partials.mjs";
import batchPromises from "../utils/batch-promises.mjs";

/**
 * Given a target directory,
 * Apply MDX transforms to all `.mdx` files found in the directory and its
 * subdirectories. Each `.mdx` file will be modified in place.
 *
 * Note: we expect the following directory structure:
 * - `products/<repoSlug>/<version>/<contentDir>/<...file>.mdx`
 * And we expect the `partials` directory to be located at:
 * - `products/<repoSlug>/<version>/<contentDir>/partials`
 *
 * @param {string} targetDir
 * @param {string?} outputDir the directory to write transformed files to.
 * Optional, if omitted, files will be transformed in place.
 */
export default async function buildMdxTransforms(targetDir, outputDir) {
	// Walk the directory to get a list of all files
	const allFiles = await listFiles(targetDir);
	// Filter for `.mdx` files
	const mdxFiles = allFiles.filter(
		(filePath) => path.extname(filePath) === ".mdx"
	);
	// Map over each `.mdx` file, and prepare the file for transformation
	const mdxFileEntries = mdxFiles.map((filePath) => {
		const relativePath = path.relative(targetDir, filePath);
		const [repoSlug, version, contentDir] = relativePath.split("/");
		const partialsDir = path.join(
			targetDir,
			repoSlug,
			version,
			contentDir,
			"partials"
		);
		/**
		 * If an outputDir has been provided, we come up with an output path
		 * for this file. Otherwise, we leave outPath null, files will be
		 * transformed in place.
		 */
		const outPath = outputDir ? path.join(outputDir, relativePath) : null;
		return { filePath, partialsDir, outPath };
	});
	console.log(`🪄 Running MDX transforms on ${mdxFileEntries.length} files...`);
	/**
	 * Apply MDX transforms to each file entry
	 */
	const batchSize = 16;
	const results = await batchPromises(
		mdxFileEntries,
		applyMdxTransforms,
		batchSize
	);

	const errors = results
		.filter((result) => result.error !== null)
		.map(({ error }) => error);
	if (errors.length > 0) {
		console.error(`❗ Encountered ${errors.length} errors:`);
		errors.forEach((error) => {
			console.error(`❌ ${error}`);
		});
	}
	// Log out that the script has complete
	console.log(`✅ Applied MDX transforms to ${mdxFileEntries.length} files.`);
}

/**
 * Given an `.mdx` file entry, read the file in, apply MDX transforms,
 * and then write it out.
 *
 * If an `outPath` is provided, the file will be written to that path.
 * Otherwise, the file will be written in place, to `entry.filePath`.
 *
 * If an error is encountered during MDX transforms, we catch the error,
 * and return it as a string. If there are no errors, we return { error: null}.
 *
 * @param {object} entry
 * @param {string} entry.filePath
 * @param {string} entry.partialsDir
 * @param {string?} entry.outPath
 * @return {object} { error: string | null }
 */
async function applyMdxTransforms(entry) {
	try {
		const { filePath, partialsDir, outPath } = entry;
		const fileString = fs.readFileSync(filePath, "utf8");
		const { data, content } = grayMatter(fileString);
		let transformedContent = content;
		if (content.includes("@include")) {
			transformedContent = await includePartials(
				content,
				partialsDir,
				filePath
			);
		}
		const transformedFileString = grayMatter.stringify(
			transformedContent,
			data
		);
		/**
		 * If an output path has been provided, write the transformed file there.
		 * Otherwise, rewrite the file in place.
		 */
		if (outPath) {
			//
			const outDir = path.dirname(outPath);
			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir, { recursive: true });
			}
			fs.writeFileSync(outPath, transformedFileString);
		} else {
			fs.writeFileSync(filePath, transformedFileString);
		}
		return { error: null };
	} catch (e) {
		return { error: String(e).split("\n")[0] };
	}
}
