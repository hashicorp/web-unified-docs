/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

terraform {
  required_version = ">= 1.15.0"

  required_providers {
    instana = {
      source  = "instana/instana"
      version = ">= 7.3.1"
    }
    github = {
      source  = "integrations/github"
      version = ">= 6.12.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "hashicorp-mktg"
    workspaces {
      name = "web-unified-docs"
    }
  }
}

provider "instana" {
  # Provider api token and endpoint come from varsets in HCP:
  # INSTANA_API_TOKEN
  # INSTANA_ENDPOINT
  # INSTANA_TLS_SKIP_VERIFY
}

provider "github" {
  owner = "hashicorp"
  # PAT comes from env var in HCP:
  # GITHUB_TOKEN
}
