variable "app_name" {
  description = "Short display label for the application. Used to name Instana resources such as dashboards and alerting rules."
  type        = string
  default     = "web-unified-docs"
}

variable "otel_service_name" {
  description = "The OpenTelemetry `service.name` attribute emitted by the application. Must match DEFAULT_SERVICE_NAME in scripts/emit-otel-span.mjs."
  type        = string
  default     = "web-unified-docs-hashicorp.vercel.app"
}

variable "slack_alerting_channel_id" {
  description = "Instana alerting channel ID for Slack notifications. This resource is owned by an external Terraform workspace; do not manage it here."
  type        = string
  default     = "d921s4i0j8og0p7ogbeg"
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
