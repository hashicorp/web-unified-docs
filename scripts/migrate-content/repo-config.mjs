import semver from 'semver'

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
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		semverCoerce: semver.coerce,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	consul: {
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		semverCoerce: semver.coerce,

		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	'hcp-docs': {
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		patch: 'generic',
		/**
		 * Note: Versioned docs is not enabled for `hcp-docs`.
		 * `branchForLatest` is set to `main`.
		 */
		releaseRefPattern: /^refs\/remotes\/origin\/main$/i,
		semverCoerce: semver.coerce,
		// TODO: ignore no-unused-vars when var starts with `_`
		// eslint-disable-next-line no-unused-vars
		versionStringFromRef: (_ref) => 'v0.0.0',
		websiteDir: '.',
	},
	nomad: {
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		semverCoerce: semver.coerce,

		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	/**
	 * TODO: for Packer, will probably need to do _something_ to sort out
	 * the Packer plugin documentation. We didn't fully complete the migration
	 * to Packer integrations, so I think there might still be plugin docs
	 * we need to fetch from third-party repos?
	 *
	 * Or this may be a non-issue, I'm not actually sure.
	 */
	packer: {
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		semverCoerce: semver.coerce,

		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	'ptfe-releases': {
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		patch: 'exact',
		releaseRefPattern: /^refs\/(tags\/)v\d\d\d\d\d\d-[\d]+$/i,
		/**
		 * Note: we need to sort versions for various reasons. Nearly all
		 * our documentation is semver-versioned. PTFE is not. Rather than
		 * implement custom sorting from the ground up, we can coerce PTFE
		 * date-based versions into semver, purely for the purpose of sorting.
		 */
		semverCoerce: (versionString) => {
			const versionRegex = /v(\d\d\d\d)(\d\d)-([\d]+)/
			const versionParts = versionRegex.exec(versionString)
			// TODO: would be nice to ignore unused vars if they start with `_`
			// eslint-disable-next-line no-unused-vars
			const [_match, year, date, patch] = versionParts
			const semverString = `v${year}.${parseInt(date)}.${patch}`
			return semver.coerce(semverString)
		},
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/v(\d\d\d\d\d\d-[\d]+)$/i)[1]
			return `v${versionString}`
		},

		websiteDir: 'website',
	},
	sentinel: {
		assetDir: 'public',
		/**
		 * Note: Sentinel content is located in `website/content/sentinel`.
		 * Copying over the content is easy enough, but for internal links,
		 * and search object IDs, and other concerns that involve the content file
		 * path, it's a bit of an outlier, so will probably present some
		 * interesting challenges.
		 */
		contentDir: 'content/sentinel',
		dataDir: 'data',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		semverCoerce: semver.coerce,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(\d+\.\d+\.[x,\d]+)$/)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	terraform: {
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		/**
		 * New config to cut-off at old versions. Not sure how our current
		 * system handles this, but it does it somehow! Also for Terraform
		 * specifically, am curious about the `v1.1 *and earlier*` text in our
		 * version selector... where's the `and earlier` coming from?
		 */
		earliestVersion: 'v1.1.0',
		/**
		 * The "generic" vs "exact" patch versions seems like something we probably
		 * want to not have to worry about in the future... right now it only seems
		 * to apply to TFE, and also Packer for some reason, and it seems like there
		 * might be other ways to approach it in both cases. But trying to change it
		 * at the same time as running the migration seems like it'd be tough.
		 */
		patch: 'generic',
		releaseRefPattern: /^(refs\/heads\/|refs\/remotes\/origin\/)?(v\d+\.\d+)$/i,
		semverCoerce: semver.coerce,
		versionStringFromRef: (ref) => {
			const versionString = ref.match(/(v\d+\.\d+)$/)[1]
			return versionString + '.x'
		},
		websiteDir: 'website',
	},
	'terraform-cdk': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-docs-agents': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-docs-common': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-plugin-framework': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-plugin-log': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-plugin-mux': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-plugin-sdk': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	'terraform-plugin-testing': {
		contentDir: 'docs',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	vagrant: {
		contentDir: 'content',
		websiteDir: 'website',
		releaseRefPattern: /^(refs\/heads\/)?v\d+[.]\d+$/i,
	},
	vault: {
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		earliestVersion: 'v1.4.0',
		patch: 'generic',
		releaseRefPattern:
			/^refs\/(remotes\/origin\/release\/|tags\/v)(\d+\.\d+\.[x,\d]+)$/i,
		versionStringFromRef: (ref) => {
			const versionRegex = /(\d+\.\d+\.[x,\d]+)$/
			if (!versionRegex.test(ref)) {
				return null
			}
			const versionString = ref.match(versionRegex)[1]
			return `v${versionString}`
		},
		websiteDir: 'website',
	},
	/**
	 * Note: waypoint documentation is no longer published, as the Community
	 * edition of Waypoint is no longer actively maintained. HCP Waypoint docs
	 * are maintained in the `hashicorp/hcp-docs` repository.
	 */
}
