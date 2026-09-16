policy {
  plugins {
    network = {
      source = "../plugins/bin/cidr_utils"
    }
  }
}

resource_policy "azurerm_subnet" "no_cidr_overlap" {
  locals {
    reserved_cidrs = ["10.0.0.0/24", "10.0.1.0/24"]
  }

  enforce {
    condition     = !plugin::network::cidr_overlaps(attrs.address_prefixes[0], local.reserved_cidrs)
    error_message = "Subnet CIDR ${attrs.address_prefixes[0]} overlaps with reserved ranges."
  }
}
