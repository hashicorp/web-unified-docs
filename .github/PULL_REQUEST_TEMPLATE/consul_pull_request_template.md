<!--
**Merge branch**

Make sure you create your PR against the correct **base** branch. For instructions, refer to
GitHub's **Change the branch range and destination repository guide** (https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

If your content is an update to:

- Currently published content

  Choose **base: main** when you are updating published documentation, and you
  want your changes published when the PR is merged. We publish Consul content
  from the `main` branch.

- Upcoming Consul release

  Choose the branch for the Consul release that your content is for. Consul
  release branches use the `consul/<exact-release-number>` format. If you are not
  able to find the upcoming Consul release branch that you are looking for,
  contact the tech writer that works with the Consul team.

**Backports**

This repo stores previous version docs in folders instead of branches. There are
no backport labels.  If you backported your code PR to previous branches, update
the docs content in the corresponding folders. For example, if the current
release is 1.22.x and you backported your code to 1.21.x and 1.20.x, update the docs content
in the v1.22.x, v1.21.x, and v1.20.x folders.
-->

## Description

<!-- Please describe why you're making this change and point out any important details the reviewers
should be aware of. 

Include the target release as well as prior versions if applicable.
-->

## Links
<!--
Please include links to GitHub issues, documentation, or similar which is relevant to this PR. If
this is a bug fix, please ensure related issues are linked so they will close when this PR is
merged.

Jira: [<jira-ticket-number>]  // for example, Jira: [CE-1001] GH-Jira integration generates the link and updates the Jira ticket.
GitHub Issue: <issue-link>
Deploy previews:

The bot does publish a root-level link to the deploy preview, 
but it's nice to include a direct link to your content so the reviewers don't have to navigate to your pages.
-->

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
