terraform {
  required_version = ">= 1.2.0"
}

module "pass" {
  source  = "app.terraform.io/my-org/vpc/aws"
  version = "2.1.0"

  vpc_cidr        = "10.10.0.0/16"
  enable_flow_log = true
}

module "fail_version" {
  source  = "app.terraform.io/my-org/vpc/aws"
  version = "1.9.0"

  vpc_cidr        = "10.20.0.0/16"
  enable_flow_log = true
}

module "fail_source" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "2.1.0"

  vpc_cidr        = "10.30.0.0/16"
  enable_flow_log = true
}
