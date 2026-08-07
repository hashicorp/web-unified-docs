/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */


locals {
  vercel_env = {
    INSTANA_OTLP_ENDPOINT = {
      value          = var.instana_otlp_endpoint
      comment        = "Instana OTel endpoint for build metrics to Instana."
      client_visible = false
      sensitive      = false
      targets        = ["production", "preview"]
    },
    INSTANA_AGENT_TOKEN = {
      value          = var.instana_agent_key
      comment        = "Instana agent key used to authenticate to Instana when submitting metrics and telemetry."
      client_visible = false
      sensitive      = true
      targets        = ["production", "preview"]
    },
  }
}

# Environment variables
#
# The `vercel_project_environment_variable` resource is used here instead of
# `vercel_project_environment_variables` because the former allows us to just
# add the env vars we want to manage, while the latter would completely replace
# anything not included in the array specified in the configuration.
resource "vercel_project_environment_variable" "sensitive" {
  for_each   = local.vercel_env
  project_id = var.vercel_project_id
  team_id    = var.vercel_team_id
  key        = each.value.client_visible && !startswith(each.key, "NEXT_PUBLIC_") ? format("NEXT_PUBLIC_%s", each.key) : each.key
  value      = each.value.value
  target     = coalesce(try(each.value.targets, null), ["production"])
  sensitive  = each.value.sensitive
  comment    = trimspace("${try(each.value.comment, "")} ${format("Managed by Terraform workspace %s. Do not edit manually.", terraform.workspace)}")
}
