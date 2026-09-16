provider_policy "aws" "official_source" {
  enforce {
    condition     = meta.source == "hashicorp/aws"
    error_message = "Only the official HashiCorp AWS provider is permitted."
  }
}
