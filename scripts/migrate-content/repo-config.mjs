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
 * I'm almost certain we don't need to worry about migrating Waypoint Community
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
	// boundary: {
	// 	/**
	// 	 * ✅ Initial migration attempt: SEEMS TO WORK
	// 	 *
	// 	 * Boundary content seems to be successfully copied into `content` and
	// 	 * `public/assets` as expected. Further investigation and testing is
	// 	 * of course needed, we've only confirmed that the migration script works.
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	// consul: {
	// 	/**
	// 	 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v1.8.x (and likely earlier) with error:
	// 	 * `consul/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	// 'hcp-docs': {
	// 	/**
	// 	 * ✅ Initial migration attempt: SEEMS TO WORK
	// 	 *
	// 	 * Maybe worth noting: versioned docs is not enabled for `hcp-docs`.
	// 	 * `branchForLatest` is set to `main`. We treat the single version
	// 	 * as `v0.0.x` in our version metadata in the current content API:
	// 	 * https://content.hashicorp.com/api/content/hcp-docs/version-metadata?partial=true
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: '.',
	// },
	// nomad: {
	// 	/**
	// 	 *  🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v0.12.x (and likely earlier) with error:
	// 	 * `nomad/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	// packer: {
	// 	/**
	// 	 *  🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v1.5.6 (and likely earlier) with error:
	// 	 * `packer/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 */
	// 	/**
	// 	 * TODO: for Packer, will probably need to do _something_ to sort out
	// 	 * the Packer plugin documentation. We didn't fully complete the migration
	// 	 * to Packer integrations, so I think there might still be plugin docs
	// 	 * we need to fetch from third-party repos?
	// 	 *
	// 	 * Or this may be a non-issue, I'm not actually sure.
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	'ptfe-releases': {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * TODO: handle `terraform-docs-common` and the `copy-docs` workflow.
		 * In our current system, this copies a subset of `cloud-docs` into
		 * `ptfe-releases`. We need to retain some form of this workflow
		 * in our new setup, both during migration, and as a script that can
		 * be run in the future to sync `cloud-docs` content
		 * from `terraform-docs-common` into `ptfe-releases`.
		 *
		 * For more details see this gist:
		 * https://gist.github.com/zchsh/73c36d4248880cb1a66216b2b00f89ed
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
			const [year, date, patch] = versionParts.slice(1)
			const semverString = `v${year}.${parseInt(date)}.${patch}`
			return semver.coerce(semverString)
		},
		websiteDir: 'website',
	},
	// sentinel: {
	// 	/**
	// 	 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v0.16.x (and likely earlier) with error:
	// 	 * `sentinel/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 * See note at top of this document on `pages` directories for details.
	// 	 */
	// 	assetDir: 'public',
	// 	/**
	// 	 * TODO: consider implications of Sentinel's `contentDir`.
	// 	 *
	// 	 * Sentinel content is located in `website/content/sentinel`.
	// 	 * Copying over the content is easy enough, but for internal links,
	// 	 * and search object IDs, and other concerns that involve the content file
	// 	 * path, it's a bit of an outlier, so will probably present some
	// 	 * interesting challenges.
	// 	 */
	// 	contentDir: 'content/sentinel',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	terraform: {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * TODO: determine how to handle non-"stable" releases. For example,
		 * `terraform` has `v1.10.x` releases that currently have the version
		 * number `v1.10.0-alpha20240814`, the `releaseStage` `alpha`. This
		 * will need to be accounted for in our new content API.
		 *
		 * TODO: `display` version for `v1.1.x` is "v1.1 and earlier". Ref:
		 * https://content.hashicorp.com/api/content/terraform/version-metadata?partial=true
		 * How should we handle this in our unified docs repo setup?
		 * Maybe another data point in favour of some kind of
		 * `_version-metadata.json` file at the top level of each versioned
		 * content directory? Eg we'd write out a file to:
		 * - content/${repoSlug}/${version}/_version-metadata.json
		 * This file would have _some_ of the metadata we already have here:
		 * https://content.hashicorp.com/api/content/terraform/version-metadata?partial=true
		 * and would be collected via our `gather-version-metadata` script.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-cdk': {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * TODO: `terraform-cdk` doesn't seem to have an asset directory.
		 * Need to confirm this is true across ALL versions... if not,
		 * need to figure out a workaround to only copy it in some versions,
		 * without silently ignoring missing assets directories in other contexts.
		 * Maybe like a `versionsWithoutAssets` array or something?
		 */
		assetDir: '',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-docs-agents': {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v1.5.x (and likely earlier) with error:
		 * `terraform-docs-agents/website/img: No such file or directory`
		 * This likely indicates that older versions of docs have a different
		 * directory structure that needs to be accounted for. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-docs-common': {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 *
		 * Maybe worth noting: versioned docs is not enabled for `terraform-docs-common`.
		 * `branchForLatest` is set to `main`. We treat the single version
		 * as `v0.0.x` in our version metadata in the current content API:
		 * https://content.hashicorp.com/api/content/terraform-docs-common/version-metadata?partial=true
		 */
		/**
		 * TODO: `terraform-docs-common` has _both_ an `img` folder, _and_ a
		 * `public` folder. Need to investigate how these are used, and whether
		 * we need to move both over (eg assetDirs could be an array?)
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-plugin-framework': {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v0.7.x (and likely earlier) with error:
		 * `terraform-plugin-framework/website/img: No such file or directory`
		 * `terraform-plugin-framework/website/docs: No such file or directory`
		 * `terraform-plugin-framework/website/data: No such file or directory`
		 * This likely indicates that older versions of docs have a different
		 * directory structure that needs to be accounted for. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-plugin-log': {
		/**
		 * ✅ Initial migration attempt: SEEMS TO WORK
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-plugin-mux': {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v0.6.x (and likely earlier) with error:
		 * `terraform-plugin-mux/website/img: No such file or directory`
		 * `terraform-plugin-mux/website/docs: No such file or directory`
		 * `terraform-plugin-mux/website/data: No such file or directory`
		 * This likely indicates that older versions of docs have a different
		 * directory structure that needs to be accounted for. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-plugin-sdk': {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v2.15.x (and likely earlier) with error:
		 * `terraform-plugin-sdk/website/img: No such file or directory`
		 * `terraform-plugin-sdk/website/docs: No such file or directory`
		 * `terraform-plugin-sdk/website/data: No such file or directory`
		 * This likely indicates that older versions of docs have a different
		 * directory structure that needs to be accounted for. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	'terraform-plugin-testing': {
		/**
		 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
		 *
		 * Fails for v1.0.x (and likely earlier) with error:
		 * `terraform-plugin-testing/website/img: No such file or directory`
		 * `terraform-plugin-testing/website/data: No such file or directory`
		 * This likely indicates that older versions of docs have a different
		 * directory structure that needs to be accounted for. Need to confirm.
		 * See note at top of this document on `pages` directories for details.
		 */
		assetDir: 'img',
		contentDir: 'docs',
		dataDir: 'data',
		semverCoerce: semver.coerce,
		websiteDir: 'website',
	},
	// vagrant: {
	// 	/**
	// 	 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v2.2.15 (and likely earlier) with error:
	// 	 * `vagrant/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 * See note at top of this document on `pages` directories for details.
	// 	 *
	// 	 * TODO: revisit `exact` patch setup for Vagrant. Is it necessary?
	// 	 * See: https://gist.github.com/zchsh/f123819e5d0005f14fff3a518bcade35
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
	// vault: {
	// 	/**
	// 	 * 🟢🟢🟡 Initial migration attempt: CONTENT NOT FOUND on older versions
	// 	 *
	// 	 * Fails for v1.6.x (and likely earlier) with error:
	// 	 * `vault/website/content: No such file or directory`
	// 	 * This likely indicates that older versions of docs have a different
	// 	 * directory structure that needs to be accounted for. Need to confirm.
	// 	 * See note at top of this document on `pages` directories for details.
	// 	 */
	// 	assetDir: 'public',
	// 	contentDir: 'content',
	// 	dataDir: 'data',
	// 	semverCoerce: semver.coerce,
	// 	websiteDir: 'website',
	// },
}
