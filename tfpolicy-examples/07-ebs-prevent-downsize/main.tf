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

# This volume would pass the policy when size is increased
resource "aws_ebs_volume" "example" {
  availability_zone = "us-west-2a"
  size              = 50  # Increase this to 100 to pass, decrease to 25 to fail
  encrypted         = true

  tags = {
    Name = "example-volume"
  }
}

# Example: Increasing size (allowed)
# Change size from 50 to 100 - policy allows this

# Example: Decreasing size (blocked)
# Change size from 100 to 50 - policy prevents this to avoid data loss
