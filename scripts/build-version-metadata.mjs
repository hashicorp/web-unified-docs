import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const versionMetadata = {};

const products = readdirSync(join("public", "products"));
for (const product of products) {
	versionMetadata[product] = [];
	const versions = readdirSync(join("public", "products", product));
	let idx = 0;
	for (const version of versions) {
		/**
		 * TODO: implement meaningful releaseStage and isLatest.
		 * Maybe like a `_version-metadata.json` in each version directory?
		 */
		const releaseStage = "stable";
		const isLatest = idx === 0;
		versionMetadata[product].push({ version, releaseStage, isLatest });
		idx++;
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
