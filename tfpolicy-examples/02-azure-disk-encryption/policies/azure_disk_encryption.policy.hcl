input "require_encryption" {
  type        = bool
  description = "Whether to require encryption on managed disks"
  default     = true
}

resource_policy "azurerm_managed_disk" "require_encryption" {
  enforcement_level = "mandatory_overridable"

  enforce {
    condition     = !input.require_encryption || attrs.encryption_settings_collection[0].enabled == true
    error_message = "The managed disk must have encryption settings enabled."
  }
}
