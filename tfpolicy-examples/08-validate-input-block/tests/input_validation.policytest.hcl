policytest {
  targets = ["../policies/input_policy.policy.hcl"]
}

# Test with default input values (should pass)
resource "aws_instance" "allowed_default" {
  expect_failure = false
  attrs = {
    instance_type = "t3.micro"
  }
  meta = {}
}

# Test with allowed instance type from default list (should pass)
resource "aws_instance" "allowed_small" {
  expect_failure = false
  attrs = {
    instance_type = "t3.small"
  }
  meta = {}
}

# Test with disallowed instance type (should fail)
resource "aws_instance" "disallowed_large" {
  expect_failure = true
  attrs = {
    instance_type = "t3.large"
  }
  meta = {}
}

# Test with completely different instance type (should fail)
resource "aws_instance" "disallowed_xlarge" {
  expect_failure = true
  attrs = {
    instance_type = "m5.xlarge"
  }
  meta = {}
}
