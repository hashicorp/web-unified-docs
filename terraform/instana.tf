# @todo Remove this after apply - don't actually need to, but this will be a no-op
import {
  id = "d921s4i0j8og0p7ogbeg"
  to = instana_alerting_channel.slack
}
resource "instana_alerting_channel" "slack" {
  name = var.slack_channel_name
  slack_app = {
    app_id       = var.slack_app_id
    team_id      = var.slack_team_id
    team_name    = var.slack_team_name
    channel_id   = var.slack_channel_id
    channel_name = var.slack_channel_name
  }
}

resource "instana_application_config" "udr" {
  label          = var.app_name
  boundary_scope = "INBOUND"
  scope          = "INCLUDE_IMMEDIATE_DOWNSTREAM_DATABASE_AND_MESSAGING"
  tag_filter     = "service.name@dest EQUALS '${var.app_name}'"
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
      instana_alerting_channel.slack.id,
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
