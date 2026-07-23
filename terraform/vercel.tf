locals {
  vercel_variables = {
    INSTANA_OTLP_ENDPOINT = {
        value          = var.instana_otlp_endpoint
        comment        = "Instana OTel endpoint for build metrics to Instana"
        client_visible = false
        targets        = ["production", "preview"]
    },
  }

  vercel_secrets = {
    INSTANA_OTLP_AGENT_TOKEN = {
        value          = var.instana_agent_key
        comment        = "Instana OTel agent key. Used to submit build metrics to Instana for tracking build times"
        client_visible = false
        targets        = ["production", "preview"]
    },
  }
}

# The sensitive and non-sensitive env vars have to be split up otherwise terraform
# just makes everything as sensitive. Which is irritating for API URLs etc.

# Sensitive env vars
resource "vercel_project_environment_variable" "sensitive" {
  for_each = local.vercel_secrets

  project_id = var.vercel_project_id
  team_id    = var.vercel_team_id
  key        = each.value.client_visible && !startswith(each.key, "NEXT_PUBLIC_") ? format("NEXT_PUBLIC_%s", each.key) : each.key
  value      = each.value.value
  target     = coalesce(try(each.value.targets, null), ["production"])
  sensitive  = true
  comment    = "${try(each.value.comment, "")} ${format(" - Managed by Terraform workspace %s. Do not edit manually.", terraform.workspace)}"
}

# Non-sensitive env vars
resource "vercel_project_environment_variable" "non-sensitive" {
  for_each = local.vercel_variables

  project_id = var.vercel_project_id
  team_id    = var.vercel_team_id
  key        = each.value.client_visible && !startswith(each.key, "NEXT_PUBLIC_") ? format("NEXT_PUBLIC_%s", each.key) : each.key
  value      = each.value.value
  target     = coalesce(try(each.value.targets, null), ["production"])
  sensitive  = false
  comment    = "${try(each.value.comment, "")} ${format(" - Managed by Terraform workspace %s. Do not edit manually.", terraform.workspace)}"
}
