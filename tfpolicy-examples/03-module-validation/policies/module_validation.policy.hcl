module_policy "aws_vpc" "registry_check" {
  enforcement_level = "advisory"

  enforce {
    condition     = core::startswith(meta.source, "app.terraform.io/my-org/")
    error_message = "The VPC module should be sourced from the internal private registry (app.terraform.io/my-org/)."
  }
  
  enforce {
    condition     = core::semverconstraint(meta.version, ">= 2.0.0")
    error_message = "The VPC module should be version 2.0.0 or higher for latest features and security fixes."
  }
}