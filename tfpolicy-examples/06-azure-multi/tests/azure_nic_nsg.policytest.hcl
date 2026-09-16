policytest {
  targets = ["../policies/azure_nic_nsg.policy.hcl"]
}

resource "azurerm_network_interface" "pass" {
  attrs = {
    name = "web-nic-01"
    id   = "/subscriptions/sub1/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/web-nic-01"
  }
}

resource "azurerm_network_interface_security_group_association" "nic_link" {
  attrs = {
    network_interface_id      = azurerm_network_interface.pass.id
    network_security_group_id = "/subscriptions/sub1/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityGroups/web-nsg"
  }
}

resource "azurerm_network_interface" "fail" {
  expect_failure = true

  attrs = {
    name = "rogue-nic-02"
    id   = "/subscriptions/sub1/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/rogue-nic-02"
  }
}
