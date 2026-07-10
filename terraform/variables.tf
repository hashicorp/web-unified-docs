variable "app_name" {
  description = "The name of the application. Used to name resources in Instana, such as dashboards and alerting rules."
  type        = string
  default     = "web-unified-docs"
}

variable "slack_app_id" {
  description = "Slack App ID (starts with A) for the Instana notification bot."
  type        = string
  default     = "A08AEK9NX41"
}

variable "slack_channel_name" {
  description = "The name of the slack channel to send alerts to"
  type        = string
  default     = "devdot-instana-digital-alerts"
}

variable "slack_channel_id" {
  description = "Slack channel ID"
  default     = "C0B9Y3JSL58"
  type        = string
}

variable "slack_team_name" {
  description = "The name of the slack team that contains the channel to send alerts to"
  type        = string
}

variable "slack_team_id" {
  description = "Slack team ID. You can find this by inspecting the URL of your Slack workspace (e.g. https://app.slack.com/client/<team ID>)"
  type        = string
}

variable "granularity_minutes" {
  description = "Evaluation granularity in minutes."
  type        = number
  default     = 5
}

variable "rum_alert_grace_period_minutes" {
  description = "Cooldown/grace period specified in minutes"
  type        = number
  default     = 5
}

variable "time_window_minutes" {
  description = "Violation sequence time window in minutes."
  type        = number
  default     = 5
}

variable "warning_threshold" {
  description = "Warning threshold for JS error count. Use 1 to mimic Datadog y > 0 behavior."
  type        = number
  default     = 1
}

variable "critical_threshold" {
  description = "Critical threshold for JS error count."
  type        = number
  default     = 2
}

variable "instana_agent_key" {
  description = "Agent key used to submit metrics to Instana. Obtained from: https://prod-hashicorp.instana.io/#/instanaagent/installation"
  type        = string
  sensitive   = true
}

variable "instana_otlp_endpoint" {
  description = "Instana OTLP endpoint for sending metrics to Instana."
  type        = string
}


variable "instana_application_violation_time_window_minutes" {
  description = "Violation sequence time window in minutes for application alerting."
  type        = number
  default     = 10
}

variable "instana_repo_sync_failed_warning_threshold" {
  description = "Warning threshold for repo-sync-failed application alert throughput."
  type        = number
  default     = 1
}

variable "instana_content_not_found_warning_threshold" {
  description = "Warning threshold for content-not-found application alert throughput."
  type        = number
  default     = 500
}


variable "github_repository" {
  description = "Canonical name of the GitHub repository to manage."
  type        = string
}
