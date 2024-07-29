/**
 * TODO: we have different content directory structures across repos.
 *
 * In the current API, powered by mktg-content-workflows, we have repo-config
 * that handles these differences. In the short term, it probably makes sense
 * to mirror that type of config in this repository.
 *
 * On the other hand, it would be nice to not have to deal with these cases...
 * Maybe during the process of migrating docs to this repo, we standardize
 * the directory structure? As long as the API routes are still drop-in
 * replacements for the previous API, maybe that'd make sense... rather than
 * migrating repo-config, we migrate in a way that requires less (maybe zero)
 * "repo-config".
 *
 * Related thought: migration scripting probably makes sense? Script would:
 * - Pull down the content source repo
 * - Iterate over known versions (based on our existing live content API), and
 *   for each known version of content...
 * - Check out the ref for that version
 * - Copy content into `public/products`, with the content directory now
 *   normalized (probably to `content`, since that's most common?)
 *
 * @type Record<string, { websiteDir: string, contentDir: string }>
 */
export const ALL_REPO_CONFIG = {
	boundary: {
		assetDir: "public",
		contentDir: "content",
		dataDir: "data",
		patch: "generic",
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1];
			return `v${versionString}`;
		},
		websiteDir: "website",
	},
	consul: {
		assetDir: "public",
		contentDir: "content",
		dataDir: "data",
		patch: "generic",
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1];
			return `v${versionString}`;
		},
		websiteDir: "website",
	}
	// "hcp-docs": {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// nomad: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// packer: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "ptfe-releases": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// sentinel: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	terraform: {
		assetDir: "img",
		contentDir: "docs",
		dataDir: "data",
		/**
		 * New config to cut-off at old versions. Not sure how our current
		 * system handles this, but it does it somehow! Also for Terraform
		 * specifically, am curious about the `v1.1 *and earlier*` text in our
		 * version selector... where's the `and earlier` coming from?
		 */
		earliestVersion: "v1.1.0",
		/**
		 * The "generic" vs "exact" patch versions seems like something we probably
		 * want to not have to worry about in the future... right now it only seems
		 * to apply to TFE, and also Packer for some reason, and it seems like there
		 * might be other ways to approach it in both cases. But trying to change it
		 * at the same time as running the migration seems like it'd be tough.
		 */
		patch: "generic",
		releaseRefPattern: /^(refs\/heads\/|refs\/remotes\/origin\/)?(v\d+\.\d+)$/i,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(v\d+\.\d+)$/)[1];
			return versionString + ".x";
		},
		websiteDir: "website",
	},
	// "terraform-cdk": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-docs-agents": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-docs-common": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-framework": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-log": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-mux": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-sdk": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// "terraform-plugin-testing": {
	// 	contentDir: "docs",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	// vagrant: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
	vault: {
		assetDir: "public",
		contentDir: "content",
		dataDir: "data",
		earliestVersion: "v1.4.0",
		patch: "generic",
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		versionStringFromRef: (ref) => {
			const versionRegex = /(\d+\.\d+\.[x,\d]+)$/;
			if (!versionRegex.test(ref)) {
				return null;
			}
			const versionString = ref.match(versionRegex)[1];
			return `v${versionString}`;
		},
		websiteDir: "website",
	},
	// waypoint: {
	// 	contentDir: "content",
	// 	websiteDir: "website",
	// 	releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	// },
};
