<!--
## Imporant Information

**Merge branch**

Make sure you create your PR against the correct **base** branch. Refer to
GitHub's [Change the branch range and destination repository guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#changing-the-branch-range-and-destination-repository) for how to
select the base branch when creating a pull request.

If your content is an update to:

- Currently published content

  Choose **base: main** when you are updating published documentation, and you
  want your changes published when the PR is merged. We publish Nomad content
  from the `main` branch.
- Upcoming Nomad release

  Choose the branch for the Nomad release that your content is for. Nomad
  release branches use the `nomad/<exact-release-number>` format. If you are not
  able to find the upcoming Nomad release branch that you are looking for,
  contact the tech writer that works with the Nomad team.

**Backports**

This repo stores previous version docs in folders instead of branches. There are
no backport labels.  If you backported your code PR to previous branches, update
the docs content in the corresponding folders. For example, if the current
release is 1.10.x and you backported your code to 1.9.x and 1.8.x, update the docs content
in the v1.10.x, v1.9.x, and v1.8.x folders.
-->

## Description

<!-- Please describe why you're making this change and point out any important details the reviewers
should be aware of. 

Include the target release and prior versions if applicable.
-->

## Links
<!--
Please include links to GitHub issues, documentation, or similar which is relevant to this PR. If
this is a bug fix, please ensure related issues are linked so they will close when this PR is
merged.
Jira: [<jira-ticket-number>]
GitHub Issue: <issue-link>

The bot does publish a root-level link to the deploy preview, but it's nice to include a direct link to your content so the reviewers don't have to navigate to your pages.
-->

## Contributor checklists

Review urgency:

- [ ] ASAP (bug fixes, broken content, imminent releases)
- [ ] 3 days (small changes, easy reviews)
- [ ] 1 week (default)
- [ ] Best effort (very non-urgent)

Pull request:

- [ ] Opened against the correct base branch
- [ ] Verify that all status checks have passed
- [ ] Verify that preview environment has successfully deployed
- [ ] Add all required reviewers if they are not part of assigned groups

Content:

- [ ] Add redirects for any moved or removed pages
- [ ] Follow the [Education style guide](https://github.com/hashicorp/web-unified-docs/tree/main/docs/style-guide)
- [ ] Look at the local or Vercel build to make sure the content renders correctly

## Reviewer checklist

- [ ] PR is against the correct base branch
- [ ] Content is technically correct
- [ ] Guides work and step order makes sense
- [ ] Content follows the Education content and style guides
