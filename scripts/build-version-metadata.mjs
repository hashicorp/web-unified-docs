import { readdirSync, writeFileSync } from "fs";
import { join } from "path";
// Third-party
import semver from "semver";

const versionMetadata = {};

const products = readdirSync(join("public", "products"));
for (const product of products) {
	versionMetadata[product] = [];
	const rawVersions = readdirSync(join("public", "products", product));

	// Semver sort versions
	const versions = rawVersions
		.filter((v) => {
			return semver.valid(normalizeVersion(v));
		})
		.sort((a, b) => {
			const [aVersion, bVersion] = [a, b].map(normalizeVersion);
			return semver.compare(aVersion, bVersion);
		})
		.reverse();

	for (const [idx, version] of versions.entries()) {
		/**
		 * TODO: implement meaningful releaseStage and isLatest.
		 * Maybe like a `_version-metadata.json` in each version directory?
		 */
		const releaseStage = "stable";
		const isLatest = idx === 0;
		versionMetadata[product].push({ version, releaseStage, isLatest });
	}
}

function normalizeVersion(version) {
	return version.replace(/\.x$/, ".0");
}

writeFileSync(
	join(
		"app",
		"api",
		"content",
		"[productSlug]",
		"version-metadata",
		"data.json"
	),
	JSON.stringify(versionMetadata, null, 2),
	"utf8"
);
