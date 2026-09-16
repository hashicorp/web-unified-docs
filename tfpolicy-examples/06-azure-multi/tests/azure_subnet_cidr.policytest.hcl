policytest {
  targets = ["../policies/azure_subnet_cidr.policy.hcl"]
}

resource "azurerm_subnet" "pass" {
  attrs = {
    name                 = "example-subnet"
    address_prefixes     = ["10.0.2.0/24"]
    virtual_network_name = "example-vnet"
    resource_group_name  = "example-rg"
  }
}

resource "azurerm_subnet" "fail" {
  expect_failure = true

  attrs = {
    name                 = "reserved-subnet"
    address_prefixes     = ["10.0.0.0/24"]
    virtual_network_name = "example-vnet"
    resource_group_name  = "example-rg"
  }
}
