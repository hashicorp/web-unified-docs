policytest {
  targets = ["../policies/cloudtrail_s3_acl.policy.hcl"]
}

resource "aws_s3_bucket_acl" "pass" {
  skip = true

  attrs = {
    bucket = "cloudtrail-logs-private"
    acl    = "private"
  }
}

resource "aws_cloudtrail" "pass" {
  attrs = {
    name           = "secure-trail"
    s3_bucket_name = aws_s3_bucket_acl.pass.bucket
    enable_logging = true
  }
}

resource "aws_s3_bucket_acl" "fail" {
  skip = true

  attrs = {
    bucket = "cloudtrail-logs-public"
    acl    = "public-read"
  }
}

resource "aws_cloudtrail" "fail" {
  expect_failure = true

  attrs = {
    name           = "insecure-trail"
    s3_bucket_name = aws_s3_bucket_acl.fail.bucket
    enable_logging = true
  }
}
