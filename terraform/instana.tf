resource "instana_application_config" "udr" {
  label          = var.app_name
  boundary_scope = "ALL"
  scope          = "INCLUDE_ALL_DOWNSTREAM"
  tag_filter     = "otel_resource.service.name@dest EQUALS '${var.otel_service_name}'"
}

locals {
  application = [{
    application_id = instana_application_config.udr.id
    inclusive      = true
    service        = []
  }]
  application_alert_channels = {
    CRITICAL = []
    WARNING = [
      var.slack_alerting_channel_id,
    ]
  }
}

resource "instana_application_alert_config" "repo_sync_failed_alert" {
  name            = "${var.github_repository} repo-sync failed"
  tag_filter      = "endpoint.name@dest EQUALS 'repo-sync-failed'"
  description     = "A ${var.github_repository}-internal repo sync failed: https://github.com/hashicorp/${var.github_repository}-internal/actions/workflows/repo-sync.yml."
  evaluation_type = "PER_AP"
  application     = local.application
  alert_channels  = local.application_alert_channels
  time_threshold = {
    violations_in_period = {
      time_window = var.instana_application_violation_time_window_minutes * 60000
      violations  = 1
    }
  }
  rules = [{
    rule = {
      throughput = {
        aggregation = "SUM"
        metric_name = "calls"
      }
    }
    threshold_operator = ">="
    threshold = {
      warning = {
        static = {
          value = var.instana_repo_sync_failed_warning_threshold
        }
      }
    }
  }]
  boundary_scope = "INBOUND"
}
