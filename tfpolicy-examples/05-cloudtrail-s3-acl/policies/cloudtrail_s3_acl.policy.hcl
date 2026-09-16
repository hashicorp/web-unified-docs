resource_policy "aws_cloudtrail" "must_be_private" {
  enforcement_level = "mandatory_overridable"

  locals {
    s3_bucket_acl = core::getresources("aws_s3_bucket_acl", {
      bucket = attrs.s3_bucket_name
    })
  }

  enforce {
    condition     = core::length(local.s3_bucket_acl) > 0 && local.s3_bucket_acl[0].acl == "private"
    error_message = "CloudTrail S3 bucket must have a private ACL."
  }
}