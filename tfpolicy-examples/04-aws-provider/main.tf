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
  alias  = "pass"
  region = "us-east-1"
}

provider "aws" {
  alias  = "fail"
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  provider = aws.pass
  bucket   = "my-example-bucket"
}
