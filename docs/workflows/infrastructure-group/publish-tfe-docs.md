# Terraform Enterprise quarterly releases

This page describes the process for publishing Terraform Enterprise documentation. Terraform Enterprise adheres to the following semantic versioning scheme:

`MILESTONE.MAJOR.PATCH`

The team releases a milestone or major version once a quarter and releases patches as they become available.

## Artifacts for next major release

After the release of a major verson, the release engineer runs a GitHub [workflow]((https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/copy-cloud-docs-for-tfe.yml)) in the `web-unified-docs-internal` repository that creates the following artifacts:

- A branch named `tfe-release/<milestone>.<major>.x` for assembling the release notes and documentation updates. This is the branch that you merge into `main` to publish the docs.
- A branch named `HCPTF-diff/<milestone>.<major>.x` that contains a diff of all of the new content from HCP TF slated for the next Terraform Enterprise release. This branch will be updated with latest changes before next release.
- A PR named `HCP TF changes for TFE release <milestone>.<major>.x` for merging content updates into the release notes into the assembly branch. Review this PR and merge into the assembly branch.
- A PR named `TFE Release <milestone>.<major>.x` for merging the release notes into the assembly branch.

Refer to the [TFE Release 1.0.0](https://github.com/hashicorp/web-unified-docs-internal/pull/299) to see examples of the app deadline artifacts.

## Get the release date

Check the `#proj-tfe-releases` channel for a message from the team manager about important dates. For example:

```
TFE v1.1.0 -Feature release is planned on the week of Nov 9th
More details -
-> Application Code Deadline: October 20
-> Backport Deadline: October 25
-> GA Release Publish: week of November 9
```

Ask for the dates in the channel if it has been more than six weeks since the last milestone or major version and the manager hasn't posted the dates yet. You should also verify that the dates haven't changed closer to the standing date.

**Application Code Deadline**: Also called **app deadline**, this is the Terraform Enterprise code freeze and occurs 1.5 to 2 weeks before the release date. App deadline is also when the release engineer runs a GitHub [workflow]((https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/create-tfe-release-notes.yml)) in the `web-unified-docs-internal` repository. The workkflow creates the release notes and updates the `HCPTF-diff/<milestone>.<major>.x` branch with latest changes from terraform common docs.

**Backport Deadline**: This is an engineering deadline and isn't actionable for IPG team members.

**GA Release Publish**: On this date, merge the assembly branch into `main` to publish the documentation.

## Before app deadline

Make sure to merge any PRs against the `terraform-docs-common` folder that should be included in the upcoming Terraform Enterprise release.

Apply any exclusion tags to prevent HCP Terraform-specifc content from publishing to the enterprise docs. Refer to [Exclusion tag syntax](#exclusion-tag-syntax) for details.

## Before GA release

Review and merge the `HCP TF changes for TFE release <milestone>.<major>.x` PR into the `tfe-release/<milestone>.<major>.x` branch. During your review, verify that all of the changes are appropriate for Terraform Enterprise. If you’re unsure about an item, you can also ask in `#proj-tfe-releases`.

If you need to update any existing documentation or apply exclusion tags, you must also apply the changes to the corresponding files in the `terraform-docs-common` so that the next synchronization doesn't overwrite your changes. It's rare, but if you edit a file in the `terraform-docs-common` folder as part of your review, someone may edit and merge the same file in the public repository, resulting in collisions when merging to `main`. You may need to track down the author or reach out to one of the development teams to resolve merge conflicts that emerge in this scenario.   

Review and merge any other PRs opened against the release branch.

Review the `TFE Release <milestone>.<major>.x` release notes PR. The release engineer is responsible for merging the PR. The release engineer also prepares the release notes section of the docs. Refer to [Release notes guidance](#release-notes-guidance) for assistance.

## On the day of the release

The release engineer merges `tfe-release/<milestone>.<major>.x` release branch into `main`. The merge triggers an automation that synchronizes the `web-unified-docs` and `web-unified-docs-interal` repositories, which publishes the docs to production.

Verify that the new version and related changes appear on the website. 
---

## Appendix

This section contains supplementary information for publishing Terraform Enterprise docs.

### Manually create docs artifacts for the release

#### Create the artifacts for next release

The [Copy Cloud Docs For TFE](https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/copy-cloud-docs-for-tfe.yml) action creates the branches and PRs necessary for publishing a new version of the Terraform Enterprise documenation. Complete the following steps to manually run the actions:

1. Log into GitHub and navigate to the `web-unified-docs-internal` repository.
1. Click **Actions**, then choose **Copy Cloud Docs For TFE** from the **Actions** sidebar.
1. Open the **Run workflow** dropdown and choose the branch to use to run the workflow. This is `main` in almost all cases.
1. Specify the following values:
   - Enter the upcoming version of the TFE release.

#### Create the release notes PR

The [Create TFE Release Notes](https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/create-tfe-release-notes.yml) action creates the release notes PR. Complete the following steps to manually run the actions:

1. Log into GitHub and navigate to the `web-unified-docs-internal` repository.
1. Click **Actions**, then choose **Create TFE Release Notes** from the **Actions** sidebar.
1. Open the **Run workflow** dropdown and choose the branch to use to run the workflow. This is `main` in almost all cases.
1. Specify the following values:
   - Enter the upcoming version of the TFE release.
   - Enter the release branch for the upcoming release. Omit the suffix. You must specify an existing release branch.
   - Enter the tag of the most recent TFE release. The workflow uses this version to generate the change log.

### Exclusion tag syntax

Most content in the Terraform Enterprise documentation is sourced from the `terraform-docs-common` folder shared with HCP Terraform, but some features, such as operating HCP Terraform in Europe and tiered pricing, are specific to the SaaS offering. There is also sometimes a lag between when a feature releases in HCP Terraform and lands in Terraform Enterprise. For this reason, you will need to mark content in the `terraform-docs-common` folder as HCP Terraform-only to exclude it from the Terraform Enterprise documentation. Conversely, you can apply an exclusion tag to prevent information that should only appear in Terraform Enterprise.

You can exclude page-level content as well as entire MDX files.

#### Exclude content on a page

Use HTML comment tags and add the `BEGIN: TFC:only` and `END: TFC:only` exclusion directives to exclude content from displaying in the Terraform Enterprise docs:

```mdx
<!-- BEGIN: TFC:only name:<feature-name> -->

Content to exclude from Terraform Enterprise.

<!-- END:   TFC:only name:<feature-name>  -->
```

Conversely, you can exclude content from displaying on the HCP Terraform docs using `BEGIN: TFEnterprise:only` and `END: TFEnterprise:only` exclusion directives:

```mdx
<!-- BEGIN: TFEnterprise:only name:<feature-name> -->

Content to exclude from HCP Terraform.

<!-- END:   TFEnterprise:only name:<feature-name>  -->
```

Except for the `BEGIN:` and `END:` directives, the content of each tag must be identical, otherwise the platform recognizes them as different directives and returns an error. The `name` attribute is optional, but it is especially helpful for staying organized when the page contains several exclusions.

You can exclude MDX components, such as callouts, but there must be a line break between the components and the exclusion directives:

```mdx
<!-- BEGIN: TFC:only name:<feature-name> -->

<Note>

Message here.

</Note>

<!-- END: TFC:only name:<feature-name> -->
```

You can also exclude content mid-sentence, but pay extra attention to your spacing and punctuation:

```mdx
Project-level permissions apply to all workspaces<!-- BEGIN: TFC:only name:stacks-tfe --> and Stacks<!-- END: TFC:only name:stacks-tfe --> within a specific project.
```

#### Exclude an entire MDX file

To exclude an entire file from Terraform Enterprise, add `tfc_only: true` to the page's front matter. For example:

```
---
page_title: HCP Terraform in Europe
description: >-
  HCP Terraform is available in HCP Europe, letting you manage Terraform resources in Europe with familiar workflows while adhering to additional data and privacy regulations
tfc_only: true
---
```

### Release notes guidance

Releasen notes should help readers understand what has changed, why, and what actions they need to take as a result. It's rarely ever appropriate to include a changelog entry without any edits in the release notes. 

#### Include important and impactful updates

The release notes are an opportunity to explain and advertise changes that significantly impact the user experience. Our changelog records every single change, but the release notes should only contain updates that do the following:

- Address a salient user concern, such as security fixes
- Let users do something new 
- Significantly improve the user experience, such as major UI updates and performance improvements
- Require or recommend that users take action, such as deprecated functionality and recommended upgrades 

Omit minor UI changes and internal changes that don't directly affect the experience. 

#### Focus on features 

Start the update with a complete sentence that describes what part of the system has been changed. Don’t start with "Added", "Fixed", or "Changed", which is implied by the section title. 

**Needs work**: 

```
Added Prometheus format for usage metrics.
```

**Better**: 

```
Usage metrics are available in Prometheus format.
```

#### Explain what and why 

Practitioners may not understand new Terraform-specific feature names or internal jargon. Newer users may also need help understanding the impact of a new feature. Explain new features and their value in plain language. If you must include Terraform-specific jargon, explain the terminology. 

For bug fixes, you may need to compare the fix to pain points in the previous version. Where possible, link to related documentation or tutorials. 

**Needs work**:

```mdx
Added support for cloud integration when using the CLI.
```

**Better**: 

```
You can now use the [Terraform CLI integration](/terraform/cli/cloud) to run Terraform Enterprise from the command line. We recommend using this native integration for Terraform versions 1.1 or later because it provides an improved user experience and various enhancements.
```


**Needs Work**: 

```
Added variable sets.
```

**Better**: 

```
You can now define sets of variables and reuse them across multiple workspaces. For example, you could define a set of variables that contain  provider credentials and automatically apply it to all of the workspaces that use the provider. Refer to [Variable sets](/terraform/cloud-docs/workspaces/variables) for more information. 
```


#### Group related updates

When applicable, combine content about the same part of the system into a single entry. Chunking related updates makes it easier for users to understand everything that has changed in components they care about.

**Needs work**: 

```
Added warning to notify users of older provider documentation.
Added an outline to the public provider documentation page.
```

**Better**: 

```
The private registry UI now displays a warning message for old versions of provider documentation with a link to the latest version. The UI includes an outline for provider documentation that lets you navigate more quickly between sections.
```
 
#### Refer to the reader as "you"

Per the style guide, [address the reader as "you"](../../style-guide/general/point-of-view.md#address-the-reader-as-you). 

#### Format single updates as a paragraph

A list with one item isn’t a list. If there is only one update in a section, format it as a paragraph.