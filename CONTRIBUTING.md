# Contribute to HashiCorp documentation

This repository contains the content for the [HashiCorp product documentation on developer.hashicorp.com](https://developer.hashicorp.com).

The information in this file applies generally to all product documentation in the `hashicorp/web-unified-docs` public repository.

For more specific guidance about contributing to an individual product's docs, refer to the `README` in the product's directory.

## Table of Contents

- [We welcome contributions](#we-welcome-contributions)
- [Repository structure](#repository-structure)
  - [Versioned content](#versioned-content)
  - [Upcoming releases](#upcoming-releases)
- [Contributor workflows](#contributor-workflows)
  - [Update existing documentation](#update-published-documentation)
  - [Upcoming minor release](#upcoming-minor-release-documentation)
  - [Upcoming major release](#upcoming-major-release-documentation)
- [Edit markdown content](#edit-markdown-content)
   - [Markdown enhancements](#markdown-enhancements)
- [Edit navigation sidebars](#edit-navigation-sidebars)
- [Run the site locally](#run-the-site-locally)
- [Redirects](#redirects)
- [Troubleshooting](#troubleshooting)
  - [I cannot see my local changes](#i-cannot-see-my-local-changes)

## We welcome contributions

Documentation takes a village. If you find a typo or you feel like you can improve the HTML, CSS, or JavaScript, we welcome contributions. Feel free to open issues or pull requests like any normal GitHub project.

## Repository structure

We write documentation content in Markdown. You can find product folders in this repo's `content` directory. Updates to the repo's `main` branch appear on [https://developer.hashicorp.com](https://developer.hashicorp.com), usually within 10 minutes.

The following table lists the content directories for products currently available in this repo.

| Product                    | Directory                              | Versioned? |
| :------------------------- | :------------------------------------- | :--------: |
| Boundary                   | `./content/boundary`                   | &#9989;    |
| Consul                     | `./content/consul`                     | &#9989;    |
| HCP                        | `./content/hcp-docs`                   | &#10060;   |
| HCP Vault Dedicated        | `./content/hcp-docs`                   | &#10060;   |
| HCP Vault Secrets          | `./content/hcp-docs`                   | &#10060;   |
| HCP Packer                 | `./content/hcp-docs`                   | &#10060;   |
| Nomad                      | `./content/nomad`                      | &#9989;    |
| Sentinel                   | `./content/sentinel`                   | &#9989;    |
| Terraform                  | `./content/terraform`                  | &#9989;    |
| Terraform                  | `./content/terraform-cdk`              | &#9989;    |
| HCP Terraform agents       | `./content/terraform-docs-agents`      | &#9989;    |
| Terraform                  | `./content/terraform-docs-common`      | &#9989;    |
| Terraform                  | `./content/terraform-enterprise`       | &#9989;    |
| Terraform                  | `./content/terraform-mcp-server`       | &#9989;    |
| Terraform                  | `./content/terraform-migrate`          | &#9989;    |
| Terraform                  | `./content/terraform-plugin-framework` | &#9989;    |
| Terraform                  | `./content/terraform-plugin-log`       | &#9989;    |
| Terraform                  | `./content/terraform-plugin-mux`       | &#9989;    |
| Terraform                  | `./content/terraform-sdk`              | &#9989;    |
| Terraform                  | `./content/terraform-plugin-testing`   | &#9989;    |
| Vault                      | `./content/vault`                      | &#9989;    |
| Waypoint                   | `./content/hcp-docs`                   | &#10060;   |
| Well-architected framework | `./content/well-architected-framework` | &#10060;   |

### Versioned content

This repository contains documentation for specific versions of some products. For these products, the `./content/<product>` directory contains several sub-directories, each corresponding to a specific version.

### Branch naming conventions

Individual contributors should create working branches using one of the following:

- Community contributors:
  `<github_username>-<product_name>-<github_issue_number>`, such as
  `aimeeu-nomad-12345`.
- HashiCorp employees: `<name, initials, or GitHub username>-<ticket_number>`,
    such as `aimeeu-ce1001`.

### Upcoming releases

Internal employees may be asked to contribute to documentation to support future releases.

If you need to create documentation for embargoed content, including product or
conference announcements, use the private `web-unified-docs-internal` repository instead. Contact
your team's technical writer for guidance.

## Contributor workflows

The workflow to follow depends on the product version of the content you want to update.

- [Current or previous product release](#update-published-documentation)
- [Upcoming minor release](#upcoming-minor-release-documentation)
- [Upcoming major release](#upcoming-major-release-documentation)

### Before you begin

- Your Github username must be a member of the HashiCorp GitHub [core
  team](https://github.com/orgs/hashicorp/teams/core). You can open a request to
  join `hashicorp/core` in
  [Doormat](https://doormat.hashicorp.services/applications/access/github/role/doormat-github-access-core/options).
- Use Doormat to request `write` access to the `web-unified-docs` repository.
- You must have a valid [SSH key for your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).

If you want to preview your changes locally, install
[Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

### Update existing documentation

Use this workflow when you want to update existing documentation that is already published on [https://developer.hashicorp.com](https://developer.hashicorp.com).

1. Clone the repo. To save space and speed up contributions, we recommend cloning only the `main` branch and not downloading the history of other branches. This method is ideal when you want to edit published content, although it prevents checking out other remote branches.

   ```shell-session
   git clone --single-branch git@github.com:hashicorp/web-unified-docs.git
   ```

1. Create your local working branch.

   ```shell-session
   git checkout -b <working_branch_name>
   ```

   Be sure to follow the [individual contributor branch naming convention](#branch-naming-conventions).

1. Make your changes. If the product uses version folders, make your updates in
   the current release folder. Update content in prior release folders as
   needed.

   Content should adhere to the [Education style guide][edu-style-guide].

   If you need to create a new page, refer to [How to create a new page][new-page-guide] for instructions.

1. Optionally, preview your changes locally.

   From the `web-unified-docs` directory, run `make`. This command uses Docker
   to create the documentation website locally. The creation process takes time
   to gather the required elements. You must wait for both the
   `unified-devdot-api` and `dev-portal` containers to complete before you can
   successfully test content in the preview environment. Once the website
   creation process has finished, access the local preview at
   `http://localhost:3000`.

   To gracefully shut down the
   preview environment, run `make clean` in a separate terminal window. You can also run `make clean CLEAN_OPTION=full` to
   shutdown the environment and remove the local Docker images.

1. Commit your changes.

   ```shell-session
   git commit -a -m "<short description about the changes>"
   ```

1. When you are satisfied with your updates, push your local changes to the repo.

   ```shell-session
   git push origin <working_branch_name>
   ```

1. Create a pull request against `main`. Refer to GitHub's [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
   guide for instructions.

   Pull requests are automatically labeled and assigned to the product's
   documentation team for review.

1. A technical writer will review your PR and provide feedback. Incorporate the reviewer's feedback and then re-request review.

1. Merge your pull request after it has been approved.

Your content appears in published documentation about 10 minutes after your pull
request is merged.

### Upcoming minor release documentation

Use this workflow when you want to create or update content for an upcoming
minor or patch release. You want to publish this content when the release is cut.

Each product's tech writer team creates an assembly branch for the upcoming minor or patch release.
Most products use the `<product>/<exact_release_number>` format, but Vault uses `vault/<YYYYMM>`
Check with your team for the exact branch name.

1. Clone the repo. We recommend cloning only the upcoming minor release branch and not downloading the history of other branches. This means that you cannot locally check out other branches.

   ```shell-session
   git clone --single-branch --branch <minor_branch_name> git@github.com:hashicorp/web-unified-docs.git
   ```

   For example, if the upcoming Vault minor release branch is `vault/202511`,
   you would run `git clone --single-branch --branch vault/202511 git@github.com:hashicorp/web-unified-docs.git`.

1. Create your local working branch.

   ```shell-session
   git checkout -b <working_branch_name>
   ```

   Be sure to follow the [individual contributor branch naming convention](#branch-naming-conventions).

1. Make your changes in current release folder.

   Content should adhere to the [Education style guide][edu-style-guide].

   If you need to create a new page, refer to the [How to create a new page][new-page-guide] guide for instructions.

1. Optionally, preview your changes locally.

   From the `web-unified-docs` directory, run `make`. This command uses Docker
   to create the documentation website locally. The creation process takes time
   to gather the required elements. You must wait for both the
   `unified-devdot-api` and `dev-portal` containers to complete before you can
   successfully test content in the preview environment. Once the website
   creation process has finished, access the local preview at
   `http://localhost:3000`.

   To gracefully shut down the
   preview environment, run `make clean` in a separate terminal window. You can also run `make clean CLEAN_OPTION=full` to
   shutdown the environment and remove the local Docker images.

1. Commit your changes.

   ```shell-session
   git commit -a -m "<short description about the changes>"
   ```

1. When you are happy with your updates, push your local changes to the repo.

   ```shell-session
   git push origin <working_branch_name>
   ```

1. Create a pull request against the upcoming minor release branch, which is the
   branch you cloned in step one.

   Make sure you choose the upcoming minor release branch in the GitHub web UI's **base:**
   drop down list. Refer to GitHub's [Creating a pull
   request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
   guide for instructions.

   Pull requests are automatically labeled and assigned to the product's
   documentation team for review.

1. A technical writer will review your PR and provide feedback. Incorporate the reviewer's feedback and then re-request review.

1. Merge your pull request after it has been approved.

The product tech writer team is responsible for merging the upcoming minor or patch
release branch as part of the minor/patch version release process.

### Upcoming major release documentation

Use this workflow when you want to create or update content for an upcoming
major release. You want to publish this content when the release is cut.

Each product's tech writer team creates a branch for the upcoming major release with the `<product>/<exact_release_number>` format. 
Additionally, the tech writer creates the upcoming release version folder. Check with your team for
the name of the branch and folder.

1. Clone the repo. We recommend cloning only the upcoming major release branch and not downloading the history of other branches. This means that you cannot locally check out other branches.

   ```shell-session
   git clone --single-branch --branch <major_branch_name> git@github.com:hashicorp/web-unified-docs.git
   ```

   For example, if the upcoming Nomad major release branch is `nomad/2.0.0`,
   you would run `git clone --single-branch --branch nomad/2.0.0 git@github.com:hashicorp/web-unified-docs.git`.

1. Create your local working branch.

   ```shell-session
   git checkout -b <working_branch_name>
   ```

   Be sure to follow the [individual contributor branch naming convention](#branch-naming-conventions).

1. Make your changes in upcoming release folder.

   Content should adhere to the [Education style guide][edu-style-guide].

   If you need to create a new page, refer to the [How to create a new page][new-page-guide] guide for instructions.

1. Optionally, preview your changes locally.

   From the `web-unified-docs` directory, run `make`. This command uses Docker
   to create the documentation website locally. The creation process takes time
   to gather the required elements. You must wait for both the
   `unified-devdot-api` and `dev-portal` containers to complete before you can
   successfully test content in the preview environment. Once the website
   creation process has finished, access the local preview at
   `http://localhost:3000`.

   To gracefully shut down the
   preview environment, run `make clean` in a separate terminal window. You can also run `make clean CLEAN_OPTION=full` to
   shutdown the environment and remove the local Docker images.

1. Commit your changes.

   ```shell-session
   git commit -a -m "<short description about the changes>"
   ```

1. When you are happy with your updates, push your local changes to the repo.

   ```shell-session
   git push origin <working_branch_name>
   ```

1. Create a pull request against the upcoming majorrelease branch, which is the
   branch you cloned in step one.

   Make sure you choose the upcoming minor release branch in the GitHub web UI's **base:**
   drop down list. Refer to GitHub's [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
   guide for instructions.

   Pull requests are automatically labeled and assigned to the product's
   documentation team for review.

1. A technical writer will review your PR and provide feedback. Incorporate the reviewer's feedback and then re-request review.

1. Merge your pull request after it has been approved.

The product tech writer team is responsible for merging the upcoming major
release branch as part of the major version release process.

## Edit content

We write documentation content in [Markdown](https://www.markdownguide.org/cheat-sheet/).

To create a new page with Markdown, create a file ending in `.mdx` in the desired `./content/<product>/<subdirectory>`. The file path in the content directory becomes the content's URL route. For example, `content/docs/hello.mdx` will be served from the `/docs/hello` URL.

> **Important**: Files and directories will only be rendered and published to the website if they are [included in sidebar data](#edit-navigation-sidebars). Any file not included in sidebar data will not be rendered or published.

In order to render, pages require [YAML frontmatter](https://middlemanapp.com/basics/frontmatter/) that provide the content's title and description.

```yaml
---
title: 'My Title'
description: "A thorough, yet succinct description of the page's contents"
---
```

This repository's content guide includes detailed instructions on how to [create a new page and add it to the navigation sidebar][new-page-guide].

### Markdown enhancements

In our documentation, you can use custom markdown enhancements to produce pages with tabs, named code blocks, badges, and alert boxes.

Correct usage of these enhancements is documented in this repo's [content style
guide](.docs/style-guide/index.md). 

## Navigation sidebars

The structure of the sidebars is controlled by files in the `./content/<product>/<version>/<data>` directory. Each file contains a configuration for a section of product documentation. For example, `docs-nav-data.json` controls navigation in the product's `Documentation` section on developer.hashicorp.com.

The `.json` file must list all files in a directory and follow the same nested hierarchy. For example, given a directory with the following structure:

```text
.
├── docs
│   └── directory
│       ├── index.mdx
│       ├── file.mdx
│       ├── another-file.mdx
│       └── nested-directory
│           ├── index.mdx
│           └── nested-file.mdx
```

The navigation data should be formatted so that it aligns exactly.

```json
[
  {
    "title": "Directory",
    "routes": [
      {
        "title": "Overview",
        "path": "directory"
      },
      {
        "title": "File",
        "path": "directory/file"
      },
      {
        "title": "Another File",
        "path": "directory/another-file"
      },
      {
        "title": "Nested Directory",
        "routes": [
          {
            "title": "Overview",
            "path": "directory/nested-directory"
          },
          {
            "title": "Nested File",
            "path": "directory/nested-directory/nested-file"
          }
        ]
      }
    ]
  }
]
```

Within this data structure, ordering is flexible, but hierarchy is not. The structure of the sidebar must correspond to the structure of the content directory. So while you could put `file` and `another-file` in any order in the sidebar, or even leave one or both of them out, you could not decide to un-nest the `nested-directory` object without also un-nesting it in the filesystem.

In addition:

- The `title` property on each node in the `nav-data` tree is the human-readable name in the navigation.
- The `path` property on each leaf node in the `nav-data` tree is the URL path where the `.mdx` document will be rendered.
- An `index.mdx` file is not required for each subdirectory.
- If you use `index.mdx` files: you must add the file to the navigation `.json`, but the `.json` file can resolve it from the name of the directory. In the example, notice that it uses the `directory` path rather than `directory/index`. A common convention is to set the `title` of an index node to be `"Overview"`.

## Preview the site locally

From the `web-unified-docs` directory, run `make`. This command uses Docker
   to create the documentation website locally. The creation process takes time
   to gather the required elements. You must wait for both the
   `unified-devdot-api` and `dev-portal` containers to complete before you can
   successfully test content in the preview environment. Once the website
   creation process has finished, access the local preview at
   `http://localhost:3000`.

   To gracefully shut down the
   preview environment, run `make clean` in a separate terminal window. You can also run `make clean CLEAN_OPTION=full` to
   shutdown the environment and remove the local Docker images.

## Redirects

Find detailed guidance on redirects and formatting in the [redirects guide][redirects-guide].

## Troubleshooting

### I cannot see my local changes

If you use Docker to preview docs locally and cannot see local changes or
preview specific doc versions, you may be using an older/cached Docker image of
`web-unified-docs` or `dev-portal` with an unfixed build error. To force a
refresh of the Docker images, run `make clean CLEAN_OPTION=full` to purge the
local images and then rebuild with `make`.

## FAQs

- Once I created a PR, how do I preview the docs?

  Find the **Vercel Previews Deployed** comment and click on the **Visit Preview** to see the preview.

- Where can I get assistance? (For example, my PR was reviewed and approved, but
  I don’t have permission to merge the PR.)

  Reach out to one of the approvers on your pull request or contact your
  product's tech writing team.


[edu-style-guide]: ./docs/style-guide/index.md
[new-page-guide]: ./docs/content-guide/create-new-page.md
[redirects-guide]: ./docs/content-guide/redirects.md)