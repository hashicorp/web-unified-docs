terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "East US"
}

resource "azurerm_virtual_network" "example" {
  name                = "example-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_network_security_group" "example" {
  name                = "web-nsg"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

# This subnet would pass the CIDR policy (no overlap with reserved ranges)
resource "azurerm_subnet" "pass" {
  name                 = "allowed-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.2.0/24"]
}

# This subnet would fail the CIDR policy (overlaps with reserved range)
resource "azurerm_subnet" "fail" {
  name                 = "reserved-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.0.0/24"]
}

# This network interface would pass the NSG policy (has NSG association)
resource "azurerm_network_interface" "pass" {
  name                = "web-nic-01"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.pass.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_interface_security_group_association" "pass" {
  network_interface_id      = azurerm_network_interface.pass.id
  network_security_group_id = azurerm_network_security_group.example.id
}

# This network interface would fail the NSG policy (no NSG association)
resource "azurerm_network_interface" "fail" {
  name                = "rogue-nic-02"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.pass.id
    private_ip_address_allocation = "Dynamic"
  }
}
