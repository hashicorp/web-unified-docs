terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-west-2"
}

# KMS key for EBS encryption
resource "aws_kms_key" "ebs" {
  description             = "KMS key for EBS volume encryption"
  deletion_window_in_days = 10
}

resource "aws_kms_alias" "ebs" {
  name          = "alias/approved-ebs-key"
  target_key_id = aws_kms_key.ebs.key_id
}

# Data source to retrieve the KMS key
data "aws_kms_key" "approved" {
  key_id = aws_kms_alias.ebs.name
}

# This volume would pass the policy (encrypted with approved key)
resource "aws_ebs_volume" "pass" {
  availability_zone = "us-west-2a"
  size              = 10
  encrypted         = true
  kms_key_id        = data.aws_kms_key.approved.id
}

# This volume would fail the policy (not encrypted)
resource "aws_ebs_volume" "fail_not_encrypted" {
  availability_zone = "us-west-2b"
  size              = 10
  encrypted         = false
}

# This volume would fail the policy (encrypted but wrong key)
resource "aws_ebs_volume" "fail_wrong_key" {
  availability_zone = "us-west-2c"
  size              = 10
  encrypted         = true
  # Using default AWS managed key instead of approved key
}