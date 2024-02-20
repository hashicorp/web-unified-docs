import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const versionMetadata = {};

const products = readdirSync(join("public", "products"));
for (const product of products) {
  versionMetadata[product] = [];
  const versions = readdirSync(join("public", "products", product));
  for (const version of versions) {
    versionMetadata[product].push({ version });
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
