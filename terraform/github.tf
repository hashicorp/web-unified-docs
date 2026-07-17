/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

 locals {
  repositories = toset([
    var.github_repository,
    "${var.github_repository}-internal",
  ])

  secrets = {
    INSTANA_OTLP_AGENT_TOKEN = var.instana_agent_key
    INSTANA_OTLP_ENDPOINT    = var.instana_otlp_endpoint
  }

  variables = {}

  repo_variable_bindings = {
    for binding in flatten([
      for repo in local.repositories : [
        for var_name, var_value in local.variables : {
          key        = "${repo}:${var_name}"
          repository = repo
          name       = var_name
          value      = var_value
        }
      ]
    ]) : binding.key => binding
  }

  repo_secret_bindings = {
    for binding in flatten([
      for repo in local.repositories : [
        for secret_name, secret_value in local.secrets : {
          key        = "${repo}:${secret_name}"
          repository = repo
          name       = secret_name
          value      = secret_value
        }
      ]
    ]) : binding.key => binding
  }
}

resource "github_actions_variable" "this" {
  for_each      = local.repo_variable_bindings
  repository    = each.value.repository
  variable_name = each.value.name
  value         = each.value.value
}

# Github Actions Secrets
# These values are sensitive, and are redacted from the Terraform logs
resource "github_actions_secret" "this" {
  for_each    = local.repo_secret_bindings
  repository  = each.value.repository
  secret_name = each.value.name
  value       = sensitive(each.value.value)
}
