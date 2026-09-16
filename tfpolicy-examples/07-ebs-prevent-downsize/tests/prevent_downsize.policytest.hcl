policytest {
  targets = ["../policies/prevent_downsize.policy.hcl"]
}

resource "aws_ebs_volume" "pass_increase" {
  prior_attrs = {
    availability_zone = "us-east-1a"
    size              = 50
    encrypted         = true
  }

  attrs = {
    availability_zone = "us-east-1a"
    size              = 100
    encrypted         = true
  }
}

resource "aws_ebs_volume" "pass_same_size" {
  prior_attrs = {
    availability_zone = "us-east-1a"
    size              = 50
    encrypted         = true
  }

  attrs = {
    availability_zone = "us-east-1a"
    size              = 50
    encrypted         = true
  }
}

resource "aws_ebs_volume" "fail_decrease" {
  expect_failure = true

  prior_attrs = {
    availability_zone = "us-east-1a"
    size              = 100
    encrypted         = true
  }

  attrs = {
    availability_zone = "us-east-1a"
    size              = 50
    encrypted         = true
  }
}
