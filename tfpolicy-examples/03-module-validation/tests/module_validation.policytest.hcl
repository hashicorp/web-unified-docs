policytest {
  targets = ["../policies/module_validation.policy.hcl"]
}

module "aws_vpc" "pass" {
  meta = {
    source  = "app.terraform.io/my-org/vpc/aws"
    version = "2.1.0"
  }

  attrs = {
    enable_flow_log = true
  }
}

module "aws_vpc" "fail_version" {
  expect_failure = true

  meta = {
    source  = "app.terraform.io/my-org/vpc/aws"
    version = "1.9.0"
  }

  attrs = {
    enable_flow_log = true
  }
}

module "aws_vpc" "fail_source" {
  expect_failure = true

  meta = {
    source  = "terraform-aws-modules/vpc/aws"
    version = "2.1.0"
  }

  attrs = {
    enable_flow_log = true
  }
}
