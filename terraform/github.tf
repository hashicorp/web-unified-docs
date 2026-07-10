locals {
  secrets = {
    INSTANA_OTLP_AGENT_TOKEN = var.instana_agent_key
    INSTANA_OTLP_ENDPOINT    = var.instana_otlp_endpoint
  }
  variables = {}
}

resource "github_actions_variable" "this" {
  for_each      = local.variables
  repository    = var.github_repository
  variable_name = each.key
  value         = each.value
}

# Github Actions Secrets
# These values are sensitive, and are redacted from the Terraform logs
resource "github_actions_secret" "this" {
  for_each    = local.secrets
  repository  = var.github_repository
  secret_name = each.key
  value       = sensitive(each.value)
}
