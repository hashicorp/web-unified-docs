input "allowed_instance_types" {
  type        = list(string)
  description = "List of allowed EC2 instance types"
  default     = ["t3.micro", "t3.small"]
  sensitive   = false
  nullable    = false
}

resource_policy "aws_instance" "instance_type_check" {
  input "environment" {
    type        = string
    description = "The environment name (dev, staging, prod)"
    default     = "dev"
  }

  enforce {
    condition     = core::contains(input.allowed_instance_types, attrs.instance_type)
    error_message = "Instance type ${attrs.instance_type} is not allowed in ${input.environment} environment. Allowed types: ${core::join(", ", input.allowed_instance_types)}"
  }
}
