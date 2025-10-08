# Web Unified Docs

This repository contains HashiCorp [product documentation and best
practices](https://developer.hashicorp.com). We publish content from the `main`
branch.

Note that the information in this file is generic and applies to documentation
for most products. Refer to individual product README files for product-specific
conventions and processes.

## Repository structure

Documentation content is written in Markdown. You can find product folders
in the `content` directory.

### Versioned content

Documentation for specific product versions is in folders within the
`content/<product>` directory.

Note that HCP documentation does not have versions.

### Branch naming conventions

Tech writers create upcoming release branches using these conventions:

- Upcoming major release branch: `<product>/<exact_release_number>`
- Upcoming minor release branch:  Most products use the
  `<product>/<exact_release_number>` format, but Vault uses `vault/<YYYYMMDD>`

Individual contributors should create working branches using one of the following:

- Community contributors:
  `<github_username>-<product_name>-<github_issue_number>`, such as
  `aimeeu-nomad-12345`.
- HashiCorp employees: `<name, initials, or GitHub username>-<ticket_number>`,
    such as `aimeeu-ce1001`.

## HashiCorp employee contributor guide

### Before you begin

- Your Github username must be a member of the HashiCorp GitHub [core team](https://github.com/orgs/hashicorp/teams/core). You can open a request to join `hashicorp/core` using using [Doormat](https://doormat.hashicorp.services/applications/access/github/role/doormat-github-access-core/options).
- You must have a valid [SSH key for your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent).

If you want to preview your changes locally, we recommend installing
[Docker](https://www.docker.com/) and [Docker
Compose](https://docs.docker.com/compose/).

### Update published documentation

Use this workflow when you want to update published documentation.

1. Clone the repo. We recommend cloning only `main` branch and not downloading the history of other branches. This means that you cannot locally check out other branches.

   ```shell-session
   git clone --single-branch git@github.com:hashicorp/web-unified-docs.git
   ```

1. Create your local working branch.

   ```shell-session
   git checkout -b <working_branch_name>
   ```

   Be sure to follow the individual contributor branch naming convention.

1. Make your changes.Fix in folder for current release.

Update content in prior release folders as needed.

Create PR against main.

Incorporate reviewer feedback as needed.

Merge to main for immediate publication.

 














## Community contributor guide

### Before you begin

- You must have a GitHub account and be logged into GitHub.
- [Fork this
  repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

### Clone your fork

1. Clone your fork.

   ```shell
   git clone git@github.com:<github_username>/web-unified-docs
   ```

2. Set the upstream repository.

   ```shell
   git remote add upstream https://github.com/hashicorp/web-unified-docs.git
   ```

### Update published documentation


1. Create your working branch off of `main`.

   ```shell
   git checkout -b 

Fix in folder for current release.

Update content in prior release folders as needed.

Create PR against main.

Incorporate reviewer feedback as needed.

Merge to main for immediate publication.