locals {
  approved_kms_key = core::getdatasource("aws_kms_key", {
    key_id = "alias/approved-ebs-key"
  })
}

policy {
  terraform_config {
  }
}

resource_policy "aws_ebs_volume" "ebs_encrypted" {
  enforce {
    condition     = attrs.encrypted == true
    error_message = "EBS volume is not encrypted"
  }
}

resource_policy "aws_ebs_volume" "approved_kms_key" {
  filter = attrs.encrypted == true

  enforce {
    condition     = attrs.kms_key_id == local.approved_kms_key.id
    error_message = "EBS volume must use the approved KMS key: ${local.approved_kms_key.id}"
  }
}
