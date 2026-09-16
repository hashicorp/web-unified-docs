resource_policy "aws_ebs_volume" "prevent_downsize" {
  operations = ["update"]

  enforce {
    condition     = attrs.size >= prior_attrs.size
    error_message = "EBS volume size cannot be reduced from ${prior_attrs.size}GB to ${attrs.size}GB. Downsizing volumes can cause data loss."
  }
}
