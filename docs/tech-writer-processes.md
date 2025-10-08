# Tech writer processes

Note that you can see this page's outline by clicking the GitHub UI's **Outline**
button, which is next to the **Edit this file** button.

## Repo workflows

- PR labeler  
  - [Code](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/label-content-prs.yml) by Sarah Chavis  
  - Automatic labeling when PR created  
- Issue labeler  
  - Not yet merged; code done in fork by Aimee but need more input from each product on where that product’s community users should open docs issues.  
- Create release PR  
  - [Code](https://github.com/hashicorp/web-unified-docs/blob/main/.github/workflows/create-release-pr.yml) by Sarah Chavis  
  - From Sarah: The action creates a PR to merge the release branch into main, but having a robot create the PR means you can (hopefully) create and approve the publication PR on your own the same way we used to approve backports in the product repos. It's a strictly manual workflow, so you need to open it on the actions page to run it.  
- Broken link monitoring system  
  - [https://github.com/hashicorp/web-unified-docs/blob/main/docs/BROKEN\_LINK\_MONITORING.md](https://github.com/hashicorp/web-unified-docs/blob/main/docs/BROKEN_LINK_MONITORING.md)  
- How to use redirects  
  - [https://github.com/hashicorp/web-unified-docs/blob/main/docs/redirects.md](https://github.com/hashicorp/web-unified-docs/blob/main/docs/redirects.md)  
- Sarah is working on a workflow to add a specific informational comment to Vault PRs. We can expand this to other products as needed.  
- Sarah is working on workflows to merge PR content to upcoming release branches when PR merges.  
- Sarah is working on a workflow to compare current release folder with next major release folder so we don’t have to do a manual compare  
- PR templates  
  - Jonathan Frappier has a PR for this.  
  - Expand PR templates: Put publication target in PR template for individual product.

## Repo structure

- Publish branch is `main`.  
- Each documentation project has its own directory.  
  - For products other than HCP, published versions are in directories, not branches. Published version folder name has specific format  
    - GA: `<version>`  such as v1.10.x, v1.11.x, v2.0.x  
    - beta: `<version>` (beta) such as v2.0.x (beta)  
    - RC: `<version>` (RC) such as v2.0.x (RC)  
  - Folders that do not have the specific name format are not published, such as Vault’s global/partials folder.  
  - if we no longer want to publish an older version but keep the content in the repo, we change the folder name to something that does not fit the published version naming convention, such as archive-v1-1-x.  
- Branch naming conventions  
  - Release branch names must start with must start with `<product>`/.  
  - Upcoming major release  
    - `<product>/<exact-release-number>`
    - for example: nomad/2.0.0  
  - Upcoming minor release  
    - This varies by product but must start with `<product>`/.  
    - Vault creates minor release branches by YYYYMM. For example: vault/202509  
    - Nomad creates minor release branches using the release number. For example: nomad/1.11.1  

## Tech writer workflows

This is based on Nomad. If other products have different workflows, add them here and make this product-based.

### Upcoming major release

1. Major release branch and release folder. As close in time to when the content will be created:  
   - Create the upcoming major release branch. Use the `<product\_name>`/`<release\_number\_exact>` naming convention. For example, nomad/2.0.0  
   - Immediately after you create the upcoming release branch, create a release folder in that branch. Use the `<release\_number>`.x (beta) convention. For example, if your upcoming release is 2.0.0:  
     - branch name: nomad/2.0.0  
     - folder name: v2.0.x (beta) → your team may use (RC) instead of (beta).  UDR will publish this as a new version after you merge your release branch to main.  
2. Recurring tasks  
   - Merge main into the release branch at least weekly. Sarah created a script for this. Make sure branch permissions are such that TW can merge from main without a PR.  
   - Manually compare current release folder with upcoming release folder and copy new current release content to upcoming release folder so you do not lose current release content updates that were made after you created the release branch (remember that the upcoming release folder does not exist in main).  
3. Release process  
   - A day before or the same day that Eng cuts the beta  
     - Merge from main to ensure the release branch is up to date.  
     - Compare current version folder and beta release folder. Copy new content to the  beta release folder.  
     - Create a PR to merge the release branch to main. Sarah created an action to do this. Make sure you approve the PR but do not yet merge.  
   - After Eng cuts the beta  
     - Merge the release branch PR into main. This action publishes the beta content and deletes the release branch.  
     - Any docs updates between beta and GA should be PRs to main.  
   - When Eng cuts the GA  
     - In main, create a PR to change the name of the beta release folder to remove the beta or RC tag.

### Upcoming minor release

1. Create minor release branch as close in time to when the content will be created.  
   1. Nomad example: nomad/1.11.1  
   2. Vault example: vault/202512  
2. Recurring tasks  
   1. Merge main into the release branch at least weekly. Sarah created a script for this. Make sure branch permissions are such that TW can merge from main without a PR.  
3. Release process  
   1. A day before or the same day that Eng cuts the minor release  
      - Merge from main to ensure the release branch is up to date.  
      - Create a PR to merge the release branch to main. Sarah created an action to do this. Make sure you approve the PR but do not yet merge.  
   2. After Eng cuts the minor release  
      - Merge the release branch PR into main. This action publishes the content and deletes the minor release branch.

