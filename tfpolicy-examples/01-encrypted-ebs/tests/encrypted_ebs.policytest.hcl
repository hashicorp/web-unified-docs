policytest {
  targets = ["../policies/encrypted_ebs.policy.hcl"]
}

data "aws_kms_key" "approved" {
  attrs = {
    key_id = "alias/approved-ebs-key"
    id     = "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012"
    arn    = "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012"
  }
}

resource "aws_ebs_volume" "pass" {
  attrs = {
    availability_zone = "us-east-1a"
    size              = 10
    encrypted         = true
    kms_key_id        = data.aws_kms_key.approved.id
  }
}

resource "aws_ebs_volume" "fail_not_encrypted" {
  expect_failure = true

  attrs = {
    availability_zone = "us-east-1a"
    size              = 10
    encrypted         = false
  }
}

resource "aws_ebs_volume" "fail_wrong_key" {
  expect_failure = true

  attrs = {
    availability_zone = "us-east-1a"
    size              = 10
    encrypted         = true
    kms_key_id        = "arn:aws:kms:us-east-1:123456789012:key/wrong-key-id"
  }
}