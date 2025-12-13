<!--
**Merge branch**

Make sure you create your PR against the correct **base** branch. For instructions, refer to
GitHub's **Change the branch range and destination repository guide** (https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

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

- Upcoming Nomad release but not sure which one

  - Choose the `main` branch.
  - Add the "do not merge" label.
  - Convert the PR to a DRAFT.
  - Put an explanation in the **Description** section.

  The tech writer coordinates with Nomad engineering and updates
  the docs PR base branch when the code is slotted into an upcoming release.

**Backports**

This repo stores previous version docs in folders instead of branches. There are
no backport labels.  If you backported your code PR to previous branches, update
the docs content in the corresponding folders. For example, if the current
release is 1.10.x and you backported your code to 1.9.x and 1.8.x, update the docs content
in the v1.10.x, v1.9.x, and v1.8.x folders. If you can't find the relevant files in previous versions,
add a note to your PR description. The tech writer will help ensure that the previous versions
receive the correct updates.
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
**Please link to the related Nomad repo code PR!** if there is one. 
The tech writer does look at the code PR description, Jira ticket, and/or GH issue before reviewing docs content.

Include links to GitHub issues, documentation, or similar which is relevant to this PR. If
this is a docs bug fix, please ensure related issues are linked so they will close when this PR is
merged.

// GH-Jira integration generates the link and updates the Jira ticket.
Jira: [<jira-ticket-number>]  // for example, Jira: [NMD-1234] 

GitHub Issue: <issue-link>

Deploy previews: The bot does publish a root-level link to the deploy preview, 
but it's nice to include a direct link to your content so the reviewers don't have to navigate to your pages.
-->

Nomad Code PR:
Jira:
GitHub Issue:
Deploy Previews:

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
