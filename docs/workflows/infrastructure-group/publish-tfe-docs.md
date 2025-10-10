# Terraform Enterprise quarterly releases

This page describes the process for publishing Terraform Enterprise documentation. Terraform Enterprise adheres to the following semantic versioning scheme:

`MILESTONE.MAJOR.PATCH`

The team releases a milestone or major version once a quarter and releases patches as they become available.

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

**Application Code Deadline**: Also called **app deadline**, this is the Terraform Enterprise code freeze and occurs 1.5 to 2 weeks before the release date. App deadline is also when the release engineer runs a GitHub workflow in the `web-unified-docs-internal` repository that creates the following artifacts:

- A branch named `tfe-release/<milestone>.<major>.x` for assembling the release notes and documentation updates. This is the branch that you merge into `main` to publish the docs.
- A branch named `HCPTF-diff/<milestone>.<major>.x` that contains a diff of all of the new content from HCP TF slated for the next Terraform Enterprise release.
- A PR named `HCP TF changes for TFE release <milestone>.<major>.x` for merging content updates into the release notes into the assembly branch. Review this PR and merge into the assembly branch.
- A PR named `TFE Release <milestone>.<major>.x` for merging the release notes into the assembly branch.

Refer to the [TFE Release 1.0.0](https://github.com/hashicorp/web-unified-docs-internal/pull/299) to see examples of the app deadline artifacts.

**Backport Deadline**: This is an engineering deadline and isn't actionable for IPG team members.

**GA Release Publish**: On this date, merge the assembly branch into `main` to publish the documentation.

## Before app deadline

Make sure to merge any PRs against the `terraform-docs-common` folder that should be included in the upcoming Terraform Enterprise release.

Apply any exclusion tags to prevent HCP Terraform-specifc content from publishing to the enterprise docs. Refer to [Exclusion tag syntax](#exclusion-tag-syntax) for details.

## Before GA release

Review and merge the `HCP TF changes for TFE release <milestone>.<major>.x` PR into the `tfe-release/<milestone>.<major>.x` branch. During your review, verify that all of the changes are appropriate for Terraform Enterprise. If you’re unsure about an item, you can also ask in `#proj-tfe-releases`.

If you need to update any existing documentation, or if you need to apply exclusion tags, you must also apply the changes to the corresponding files in the public `web-unified-docs` repository so that the next synchronization doesn't overwrite your changes.

Review and merge any other PRs opened against the release branch.

Review and merge the `TFE Release <milestone>.<major>.x` release notes PR. The release engineer is responsible for merging the PR. The release engineer also prepares the release notes section of the docs.

## On the day of the release

The release engineer merges `tfe-release/<milestone>.<major>.x` release branch into `main`. The merge triggers an automation that synchronizes the `web-unified-docs` and `web-unified-docs-interal` repositories, which publishes the docs to production.

Verify that the new version and related changes appear on the website. 
---

## Appendix

This section contains supplementary information for publishing Terraform Enterprise docs.

### Manually create docs artifacts for the release

The [Create TFE Release Notes](https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/create-tfe-release-notes.yml) action creates the release notes PR and triggers the [Copy Cloud Docs For TFE](https://github.com/hashicorp/web-unified-docs-internal/actions/workflows/copy-cloud-docs-for-tfe.yml) action. These actions create the branches and PRs necessary for publishing a new version of the Terraform Enterprise documenation. Complete the following steps to manually run the actions:

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
