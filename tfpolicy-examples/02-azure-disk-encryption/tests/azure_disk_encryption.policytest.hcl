policytest {
  targets = ["../policies/azure_disk_encryption.policy.hcl"]
}

# Top-level inputs apply to all test cases by default
inputs {
  require_encryption = true
}

resource "azurerm_managed_disk" "pass" {
  attrs = {
    name                 = "test-disk"
    location             = "East US"
    resource_group_name  = "test-rg"
    storage_account_type = "Standard_LRS"
    create_option        = "Empty"
    disk_size_gb         = 10
    encryption_settings_collection = [
      {
        enabled = true
      }
    ]
  }
}

resource "azurerm_managed_disk" "fail" {
  expect_failure = true

  attrs = {
    name                 = "test-disk-unencrypted"
    location             = "East US"
    resource_group_name  = "test-rg"
    storage_account_type = "Standard_LRS"
    create_option        = "Empty"
    disk_size_gb         = 10
    encryption_settings_collection = [
      {
        enabled = false
      }
    ]
  }
}

resource "azurerm_managed_disk" "pass_no_requirement" {
  # Override input for this specific test case
  inputs {
    require_encryption = false
  }

  attrs = {
    name                 = "test-disk-optional"
    location             = "East US"
    resource_group_name  = "test-rg"
    storage_account_type = "Standard_LRS"
    create_option        = "Empty"
    disk_size_gb         = 10
    encryption_settings_collection = [
      {
        enabled = false
      }
    ]
  }
}