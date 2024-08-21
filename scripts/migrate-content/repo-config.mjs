import semver from 'semver'

/**
 * TODO: CONFIRM WE CAN IGNORE WAYPOINT COMMUNITY EDITION
 *
 * Waypoint Community documentation is no longer published, as the Community
 * edition of Waypoint is no longer actively maintained. HCP Waypoint docs
 * are maintained in the `hashicorp/hcp-docs` repository.
 *
 * Community documentation still exists in the `hashicorp/waypoint` repo.
 *
 * I'm almost certain can not worry about migrating Waypoint Community
 * since the docs are not longer published on `developer.hashicorp.com`,
 * but probably wouldn't hurt to double-check.
 */

/**
 * TODO: NOTE ON `PAGES` DIRECTORIES IN OLDER CONTENT VERSIONS
 *
 * When attempting to migrate older content versions, we sometimes
 * see errors like: `<product>/website/content: No such file or directory`.
 *
 * This likely relates to older versions of Sentinel docs still using
 * the `pages` directory to store content... `mktg-content-workflows`
 * somehow accounts for this... so our migration scripts probably need
 * to account for it as well.
 */

/**
 * TODO: CONSIDER APPROACH TO VARIABLE CONTENT DIRECTORIES
 *
 * In the current API, powered by mktg-content-workflows, we have repo-config
 * that handles these differences.
 *
 * During migration, does it makes sense to mirror differences in this repo?
 * Or...  would be nice to not have to deal with these cases?
 *
 * Maybe during the process of migrating docs to this repo, we standardize
 * the directory structure? As long as the API routes are still drop-in
 * replacements for the previous API, maybe that'd make sense... rather than
 * migrating repo-config, we migrate in a way that requires less (maybe zero)
 * "repo-config".
 *
 * @type Record<string, { assetDir: string, contentDir: string, dataDir: string, semverCoerce: Function, websiteDir: string }>
 */
export const ALL_REPO_CONFIG = {
	boundary: {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * Boundary content seems to be successfully copied into `content` and
		 * `public/assets` as expected. Further investigation and testing is
		 * of course needed, we've only confirmed that the migration script works.
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	consul: {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v1.8.x (and likely earlier) with error:
		 * `consul/website/content: No such file or directory`
		 * This likely indicates that older versions of `consul` docs are still
		 * located in `pages` directories. Need to confirm.
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'hcp-docs': {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * Maybe worth noting: versioned docs is not enabled for `hcp-docs`.
		 * `branchForLatest` is set to `main`. We treat the single version
		 * as `v0.0.x` in our version metadata in the current content API:
		 * https://content.hashicorp.com/api/content/hcp-docs/version-metadata?partial=true
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: '.',
	},
	nomad: {
		/**
		 * 	🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v0.12.x (and likely earlier) with error:
		 * `nomad/website/content: No such file or directory`
		 * This likely indicates that older versions of `nomad` docs are still
		 * located in `pages` directories. Need to confirm.
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	packer: {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 *
		 * TODO: for Packer, will probably need to do _something_ to sort out
		 * the Packer plugin documentation. We didn't fully complete the migration
		 * to Packer integrations, so I think there might still be plugin docs
		 * we need to fetch from third-party repos?
		 *
		 * Or this may be a non-issue, I'm not actually sure.
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'ptfe-releases': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',

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
		websiteDir: 'website',
	},
	sentinel: {
		/**
		 * Initial migration attempt:
		 *
		 * Fails for v0.16.x (and likely earlier) with error:
		 * `sentinel/website/content: No such file or directory`
		 * This likely indicates that older versions of `consul` docs are still
		 * located in `pages` directories. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'public',
		/**
		 * TODO: consider implications of Sentinel's `contentDir`.
		 *
		 * Sentinel content is located in `website/content/sentinel`.
		 * Copying over the content is easy enough, but for internal links,
		 * and search object IDs, and other concerns that involve the content file
		 * path, it's a bit of an outlier, so will probably present some
		 * interesting challenges.
		 */
		contentDir: 'content/sentinel',
		dataDir: 'data',

		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	terraform: {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		/**
		 * New config to cut-off at old versions.
		 *
		 * TODO: determine if this cut-off is appropriate.
		 * Not sure how our current system handles this, but it does it somehow!
		 * Also for Terraform specifically, am curious about the
		 * `v1.1 *and earlier*` text in our version selector...
		 * where's the `and earlier` coming from?
		 */
		earliestVersion: 'v1.1.0',
		/**
		 * The "generic" vs "exact" patch versions seems like something we probably
		 * want to not have to worry about in the future... right now it only seems
		 * to apply to TFE, and also Packer for some reason, and it seems like there
		 * might be other ways to approach it in both cases. But trying to change it
		 * at the same time as running the migration seems like it'd be tough.
		 */
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-cdk': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-docs-agents': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-docs-common': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-plugin-framework': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-plugin-log': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-plugin-mux': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-plugin-sdk': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	'terraform-plugin-testing': {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'docs',
		websiteDir: 'website',
	},
	vagrant: {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		contentDir: 'content',
		websiteDir: 'website',
	},
	vault: {
		/**
		 * Initial migration attempt:
		 *
		 * 🚧 TODO
		 */
		assetDir: 'public',
		contentDir: 'content',
		dataDir: 'data',
		earliestVersion: 'v1.4.0',
		websiteDir: 'website',
	},
}
