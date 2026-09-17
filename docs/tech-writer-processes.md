# Web Unified Docs content-related processes

> [!NOTE]
> Click the GitHub UI's **Outline** button, which is next to the **Edit this file** button,
> to toggle this page's outline.

## Repo workflows

- PR labeler  
  - [Code](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/label-content-prs.yml) by Sarah Chavis  
  - Automatic labeling when PR created  
- Issue form and labeler  
  - [Code](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/label-issues.yml) by Aimee Ukasick. Lengthly explanation in the [merged PR description](https://github.com/hashicorp/web-unified-docs/pull/1028).
- Create release PR  
  - [Code](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/create-release-pr.yml) by Sarah Chavis  
  - From Sarah: The action creates a PR to merge the release branch into main, but having a robot create the PR means you can (hopefully) create and approve the publication PR on your own the same way we used to approve backports in the product repos. It's a strictly manual workflow, so you need to open it on the actions page to run it.
- Preview to GA toggle (folder rename) action by Sarah Chavis
  - [Code](https://github.com/hashicorp/web-unified-docs/actions/workflows/create-ga-pr.yml)
- Forward port workflow
  - [Workflow file](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/forward-port-pr.yml)
  - Replaces the old Sync GA to RC branch script. When a merged PR carries a
    `forward-port:<slug>` label, the workflow automatically opens a PR that
    copies the changed files from the source version folder into a target
    version folder, such as an upcoming RC or beta release folder. You can also
    manually trigger the forward port workflow from the GitHub Actions UI.
  - Full setup and usage instructions are in the [forward-port-README](https://github.com/hashicorp/web-unified-docs/blob/main/scripts/forward-port/forward-port-README.md)
- Broken link monitoring system  
  - [BROKEN_LINK_MONITORING.md](./BROKEN_LINK_MONITORING.md)  
- How to use redirects  
  - [redirects.md](./content-guide/redirects.md)  
- PR templates  
  - Jonathan Frappier created the PR template links.  
  - You may create product-based PR templates. Refer to the [PULL_REQUEST_TEMPLATE folder](https://github.com/hashicorp/web-unified-docs/tree/main/.github/PULL_REQUEST_TEMPLATE) for examples.

## Repo structure

- Publish branch is `main`.  
- Each documentation project has its own directory.  
  - For products other than HCP, published versions are in directories, not
    branches. Published version folder name has a specific format.  
    - GA: `<version>`  such as v1.10.x, v1.11.x, v2.1.x  
    - beta: `<version>` (beta) such as v2.1.x (beta)  
    - RC: `<version>` (RC) such as v2.1.x (RC)  
  - Folders that do not have the specific name format are not published, such as Vault’s global/partials folder.  
  - If we no longer want to publish an older version but keep the content in the repo, we change the folder name to something that does not fit the published version naming convention, such as `v1.0.x-archive`.  
- Branch naming conventions  
  - Release branch names must start with must start with `<product>/`.  
  - Upcoming major release  
    - `<product>/<exact-release-number>`
    - for example: `nomad/2.0.0`  
  - Upcoming minor release  
    - This varies by product but must start with `<product>/`.  
    - Vault creates minor release branches by YYYYMM. For example: `vault/202509`  
    - Nomad creates minor release branches using the release number. For example: `nomad/1.11.1`  

## Workflows

These are generic workflows for major and minor releases.

### Upcoming major release

1. Major release branch and release folder. As close in time to when the content will be created:  
   - Create the upcoming major release branch. Use the
     `<product_name>/<release_number_exact>` naming convention. For example,
     `nomad/2.1.0`.
   - Immediately after you create the upcoming release branch, create a release
     folder in that branch. Use the `<release_number>.x (beta)` convention if
     you plan to publish beta docs. For
     example, if your upcoming release is 2.1.0:  
     - branch name: `nomad/2.1.0`  
     - folder name: `v2.1.x (beta)` → your team may use (RC) instead of (beta).
       Web unified docs will publish this as a new version after you merge your release
       branch to main.  If you do not plan to publish beta or RC docs, use a
       folder name that reflects the upcoming release. For example, `v2.1.x`.
2. Forward port PRs from current main to the upcoming release branch.
   - Follow the forward port process when open, current version PRs meet the following
     conditions:

     1. The PR will merge to `main`.
     2. The PR content should be copied from the current version folder to the
        upcoming major release branch's next version folder. For example, from
        `main` branch `nomad/v2.0.x` folder to `nomad/2.1.0` branch
        `nomad/v2.1.x` folder.

     Refer to the
     [forward-port-README](../scripts/forward-port/forward-port-README.md) for setup and usage.  

3. Release process  
   - A day before or the same day that Eng cuts the beta  
     - Merge from `main` to ensure the release branch is current.  
     - Compare current version folder and beta release folder. Copy new and
       updated to the  beta release folder.  
     - Create a PR to merge the release branch to `main`. Sarah created an action to do this. Make sure you approve the PR but do not yet merge.  
   - After Eng cuts the beta  
     - Merge the release branch PR into `main`. This action publishes the beta content and deletes the release branch.  
     - Any docs updates between beta and GA should be PRs to `main`.  
   - When Eng cuts the GA  
     - In `main`, create a PR to change the name of the beta release folder to remove the beta or RC tag.

### Upcoming minor release

1. Create minor release branch as close in time to when the content will be created.  
   1. Nomad example: `nomad/1.11.1`  
   2. Vault example: `vault/202512`  
2. Forward port: If there is an active upcoming major release branch, be sure to follow the
   forward port PRs process in the [Upcoming major release section](#upcoming-major-release).
3. Release process  
   1. A day before or the same day that Eng cuts the minor release  
      - Merge from `main` to ensure the release branch is current.  
      - Create a PR to merge the release branch to `main`. Sarah created an action to do this. Make sure you approve the PR but do not yet merge.  
   2. After Eng cuts the minor release  
      - Merge the release branch PR into main. This action publishes the content and deletes the minor release branch.
