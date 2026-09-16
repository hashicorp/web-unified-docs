resource_policy "azurerm_network_interface" "require_nsg_association" {
  locals {
    associations = core::getresources("azurerm_network_interface_security_group_association", { network_interface_id = attrs.id })
  }

  enforce {
    condition     = core::length(local.associations) > 0
    error_message = "The Network Interface ${attrs.name} must be associated with a Network Security Group."
  }
}
