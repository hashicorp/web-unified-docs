locals {
  environment = {
    INSTANA_OTLP_AGENT_TOKEN = {
        value          = var.instana_agent_key
        sensitive      = true
        comment        = "Instana OTel agent key. Used to submit build metrics to Instana for tracking build times"
        client_visible = false
        targets        = ["production", "preview"]
    },
    INSTANA_OTLP_ENDPOINT = {
        value          = var.instana_otlp_endpoint
        sensitive      = false
        comment        = "Instana OTel endpoint for build metrics to Instana"
        client_visible = false
        targets        = ["production", "preview"]
    },
  }
}

# Vercel Project Environment Variables
resource "vercel_project_environment_variable" "this" {
  for_each = local.environment

  project_id = var.vercel_project_id
  team_id    = var.vercel_team_id
  key        = each.value.client_visible && !startswith(each.key, "NEXT_PUBLIC_") ? format("NEXT_PUBLIC_%s", each.key) : each.key
  value      = each.value.value
  target     = coalesce(try(each.value.targets, null), ["production"])
  sensitive  = each.value.sensitive != null ? each.value.sensitive : true
  comment    = "${try(each.value.comment, "")} ${format(" - Managed by Terraform workspace %s. Do not edit manually.", terraform.workspace)}"
}
