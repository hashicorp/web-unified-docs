locals {
  vercel_env = {
    INSTANA_OTLP_ENDPOINT = {
      value          = var.instana_otlp_endpoint
      comment        = "Instana OTel endpoint for build metrics to Instana."
      client_visible = false
      sensitive      = false
      targets        = ["production", "preview"]
    },
    INSTANA_OTLP_AGENT_TOKEN = {
      value          = var.instana_agent_key
      comment        = "Instana OTel agent key. Used to submit build metrics to Instana for tracking build times."
      client_visible = false
      sensitive      = true
      targets        = ["production", "preview"]
    },
  }
}

# Enviornment variables
#
# The `vercel_project_environment_variable` resource is used here isntead of
# `vercel_project_environment_variables` because the former allows us to just
# add the env vars we want to manage, while the latter would completely replace
# anything not included in the array specified in the configuration.
resource "vercel_project_environment_variable" "sensitive" {
  for_each = local.vercel_env
  project_id = var.vercel_project_id
  team_id    = var.vercel_team_id
  key        = each.value.client_visible && !startswith(each.key, "NEXT_PUBLIC_") ? format("NEXT_PUBLIC_%s", each.key) : each.key
  value      = each.value.value
  target     = coalesce(try(each.value.targets, null), ["production"])
  sensitive  = each.value.sensitive
  comment    = trimspace("${try(each.value.comment, "")} ${format("Managed by Terraform workspace %s. Do not edit manually.", terraform.workspace)}")
}
