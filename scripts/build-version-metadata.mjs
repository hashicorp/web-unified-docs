import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const versionMetadata = {};

const products = readdirSync(join("public", "products"));
for (const product of products) {
	versionMetadata[product] = [];
	const versions = readdirSync(join("public", "products", product));
	for (const [idx, version] of versions.entries()) {
		/**
		 * TODO: implement meaningful releaseStage and isLatest.
		 * Maybe like a `_version-metadata.json` in each version directory?
		 */
		const releaseStage = "stable";
		const isLatest = idx === versions.length - 1;
		versionMetadata[product].push({ version, releaseStage, isLatest });
	}
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
