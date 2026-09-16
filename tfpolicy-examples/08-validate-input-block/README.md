# Input Block Validation Example

This example demonstrates how to use `input` blocks at the root level of policy files to parameterize policies.

## Overview

Input blocks allow you to define variables that can be referenced throughout your policies, similar to how Terraform's `variable` blocks work. This makes policies more flexible and reusable across different environments and configurations.

## Policy Structure

The policy file (`policies/input_validation.policy.hcl`) demonstrates:

1. **Input Blocks**: Two input variables defined at the root level
   - `allowed_instance_types`: A list of allowed EC2 instance types
   - `environment`: The environment name (dev, staging, prod)

2. **Resource Policy**: Uses the input variables to validate instance types
   - References inputs using `input.<label>` syntax
   - Validates that instance types are in the allowed list

## Input Configuration

```hcl
input "allowed_instance_types" {
  type        = list(string)
  description = "List of allowed EC2 instance types"
  default     = ["t3.micro", "t3.small"]
  sensitive   = false
  nullable    = false
}

input "environment" {
  type        = string
  description = "The environment name (dev, staging, prod)"
  default     = "dev"
}
```

## Setting Input Values

Input values can be set through multiple methods (in order of precedence):

1. **Policy set parameters** in HCP Terraform
2. **Environment variables** with `TFPOLICY_INPUT_` prefix:
   ```bash
   export TFPOLICY_INPUT_allowed_instance_types='["t3.micro","t3.small","t3.medium"]'
   export TFPOLICY_INPUT_environment="production"
   ```
3. **Environment variables** matching the input name exactly
4. **Default values** specified in the input block

## Running the Tests

Run the tests with default input values:

```bash
tfpolicy test --policies=policies --tests=tests
```

Run tests with custom input values:

```bash
export TFPOLICY_INPUT_allowed_instance_types='["t3.micro","t3.small","t3.medium"]'
export TFPOLICY_INPUT_environment="production"
tfpolicy test --policies=policies --tests=tests
```

## Test Cases

The test file includes four test cases:

1. **allowed_default**: Tests with `t3.micro` (should pass)
2. **allowed_small**: Tests with `t3.small` (should pass)
3. **disallowed_large**: Tests with `t3.large` (should fail - not in default list)
4. **disallowed_xlarge**: Tests with `m5.xlarge` (should fail - not in default list)

## Expected Output

```
Success! 4 passed, 0 failed.
```

## Key Features Demonstrated

- **Root-level input blocks**: Defined at the same level as policy blocks
- **Type constraints**: Using `list(string)` and `string` types
- **Default values**: Providing fallback values when inputs aren't set
- **Input references**: Using `input.<label>` syntax in policies
- **Environment-specific configuration**: Using inputs to parameterize policies
