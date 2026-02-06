<!--
**Merge branch**

Make sure your PR uses the correct **base** branch as the destination.
For more information, refer to GitHub's **Change the branch range and destination repository guide** (https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

To update:

- Existing content

  Choose **base: main** to update existing documentation.
  Your content will be published when the PR is merged.

- Content for an upcoming Boundary release

  Choose the branch for the Boundary release your update documents.
  Boundary release branches use the `boundary/<exact-release-number>` format.

If you are not sure which base branch to use, or you cannot find the release branch you are looking for:

  - Choose the `main` branch.
  - Add the "do not merge" label.
  - Convert the PR to a DRAFT.
  - Put an explanation in the **Description** section.

**Back porting to older versions**

This repo stores versioned documentation in folders instead of branches.
There are no backport labels.
If your update applies to multiple versions, update the content in each of the corresponding version folders.

For example, if the current release is 0.21.x and you back ported your code to 0.20.x and 0.19.x, update the content in the v0.21.x, v0.20.x, and v0.19.x folders.
If you can't find the relevant files in previous versions, add a note for the tech writer in your PR description.
-->

## Description

<!--
Please describe why you're making this change and point out any important details the reviewers
should be aware of. A robust description helps the tech writer create a fabulous release note.
If your code PR has a splendid description, link to the code PR in the links section so that
the tech writer can update this PR's description.

Include the target release as well as prior versions if applicable.
-->

## Links
<!--
**Please link to the related Boundary repo code PR!** if there is one.
The tech writer does look at the code PR description, Jira ticket, and/or GH issue before reviewing docs content.

Include links to GitHub issues, documentation, or similar which is relevant to this PR. If
this is a docs bug fix, please ensure related issues are linked so they will close when this PR is
merged.

// GH-Jira integration generates the link and updates the Jira ticket.
Jira: [<jira-ticket-number>]  // for example, Jira: [ICU-1234]

GitHub Issue: <issue-link>

Deploy previews: The bot does publish a root-level link to the deploy preview, but the preview URL changes with each build.
-->

Boundary code PR:
Jira:
GitHub Issue:

## Contributor checklists

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

## Reviewer checklist

- [ ] This PR is set to merge into the correct base branch.
- [ ] The content does not contain technical inaccuracies.
- [ ] The content follows the Education content and style guides.
- [ ] I have verified and tested changes to instructions for end users.
