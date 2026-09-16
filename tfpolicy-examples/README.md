# Terraform Policy Examples

This directory contains working examples extracted from the Terraform Policy documentation. Each example demonstrates different policy patterns and use cases.

## Directory Structure

```
tfpolicy-examples/
├── 01-encrypted-ebs/          # Basic resource policy for AWS EBS encryption
├── 02-azure-disk-encryption/  # Resource policy with nested attributes
├── 03-module-validation/      # Module policy with version constraints
├── 04-aws-provider/           # Provider policy validation
├── 05-cloudtrail-s3-acl/      # Resource relationships with core::getresources()
├── 06-azure-multi/            # Multiple policies with custom plugins
├── 07-ebs-prevent-downsize/   # Update operations with prior_attrs
└── 08-validate-input-block/   # Input blocks for parameterized policies
```

## Examples Overview

### 1. Encrypted EBS Volumes
**Path:** `01-encrypted-ebs/`

Demonstrates a basic resource policy that ensures all AWS EBS volumes are encrypted.

**Run tests:**
```bash
cd 01-encrypted-ebs
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

### 2. Azure Managed Disk Encryption
**Path:** `02-azure-disk-encryption/`

Shows how to validate nested attributes in Azure managed disks.

**Run tests:**
```bash
cd 02-azure-disk-encryption
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

### 3. Module Source and Version Validation
**Path:** `03-module-validation/`

Demonstrates module policy with meta-attributes and semver constraints.

**Run tests:**
```bash
cd 03-module-validation
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

### 4. AWS Provider Validation
**Path:** `04-aws-provider/`

Shows provider policy that validates provider sources.

**Run tests:**
```bash
cd 04-aws-provider
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

### 5. CloudTrail S3 Bucket ACL
**Path:** `05-cloudtrail-s3-acl/`

Demonstrates using `core::getresources()` to validate relationships between resources.

**Run tests:**
```bash
cd 05-cloudtrail-s3-acl
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

### 6. Multiple Policies with Custom Plugins
**Path:** `06-azure-multi/`

Advanced example showing multiple policies and custom Go plugins.

**Build plugin:**
```bash
cd 06-azure-multi/plugins/src/cidr_utils
go mod init cidr_utils
go mod tidy
go build -o ../../bin/cidr_utils main.go
```

**Run tests:**
```bash
cd 06-azure-multi
tfpolicy validate --policies=policies/


### 7. Prevent EBS Volume Downsizing
**Path:** `07-ebs-prevent-downsize/`

Demonstrates using `operations` parameter to control when policies are enforced and `prior_attrs` to access previous resource state. Prevents dangerous operations like reducing volume sizes.

**Run tests:**
```bash
cd 07-ebs-prevent-downsize
tfpolicy validate --policies=policies/
tfpolicy test --policies=policies/ --tests=tests/
```

tfpolicy test --policies=policies/ --tests=tests/
```

## Prerequisites

- Terraform Policy CLI (`tfpolicy`)
- For example 6: Go 1.21+ (for building the plugin)

## Usage

Each example directory contains:
- `policies/` - Policy files (`.policy.hcl`)
- `tests/` - Test files (`.policytest.hcl`)
- `main.tf` or `example-main.tf` - Sample Terraform configuration

You can use these examples as templates for your own policies or run them directly to see how Terraform Policy works.

## Documentation

For more information, refer to the [Terraform Policy documentation](https://developer.hashicorp.com/terraform/policy).
