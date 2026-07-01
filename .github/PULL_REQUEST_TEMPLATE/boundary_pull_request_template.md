<!--
**Merge branch**

Make sure your PR uses the correct **base** branch for the merge destination.

For more information, refer to **Change the branch range and destination repository** (https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

To update:

- Existing content

  Choose **base: main** to update existing documentation.
  Your content will be published when the PR is merged.

- Content for an upcoming Boundary release

  Choose the branch for the relevant upcoming Boundary release.
  Boundary release branches use the `boundary/<exact-release-number>` format.
  Your content will be published when the upcoming release goes live.

If you are not sure which base branch to use, or you cannot find the release branch you are looking for:

  - Choose the `main` branch.
  - Add the "do not merge" label.
  - Convert the PR to a DRAFT.
  - Explain the update in the **Description**.

**Back porting to older versions**

This repo stores versioned documentation in folders instead of branches.
There are no backport labels.
If your update applies to multiple versions, you must update the content in each of the corresponding version folders.

For example, you make an update to the Boundary code in the current release, 0.21.0, and back port it to versions 0.20.x and 0.19.x.
To document the update for each of the relevant versions, you would update the documentation in the v0.21.x, v0.20.x, and v0.19.x folders.
-->

## Description

<!--
Describe why you're making this change and point out any important details the reviewers
should be aware of.
-->

## Links
<!--
Include links to any associated pull requests, GitHub issues, or documentation that is relevant to this update.

// GH-Jira integration generates the link and updates the Jira ticket.
Jira: [<jira-ticket-number>]  // for example, Jira: [ICU-1234]

GitHub Issue: <issue-link>
-->

Code PR:
Jira:
GitHub issue:
RFC/PRD:

## Contributor checklists

<!--
Help your reviewer understand the type of review you need by selecting the scope and urgency.
-->

Review urgency:

- [ ] ASAP: Bug fixes, broken content, imminent releases
- [ ] 3 days: Small changes, easy reviews
- [ ] 1 week: Default expectation
- [ ] Best effort: No urgency

Pull request:

- [ ] Verify that the PR is set to merge into the correct base branch
- [ ] Verify that all status checks passed
- [ ] Verify that the preview environment deployed successfully
- [ ] Add additional reviewers if they are not part of assigned groups

Content:

- [ ] I added redirects for any moved or removed pages
- [ ] I followed the [Education style guide](https://github.com/hashicorp/web-unified-docs/tree/main/docs/style-guide)
- [ ] I looked at the local or Vercel build to make sure the content rendered correctly
