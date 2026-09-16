policytest {
  targets = ["../policies/aws_provider.policy.hcl"]
}

provider "aws" "pass" {
  meta = {
    source = "hashicorp/aws"
  }

  attrs = {
    region = "us-east-1"
  }
}

provider "aws" "fail" {
  expect_failure = true

  meta = {
    source = "untrusted-registry.com/fake/aws"
  }

  attrs = {
    region = "us-east-1"
  }
}
