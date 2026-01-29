---
name: extract-examples
description: Extracts, validates, and exports code examples from documentation. Ensures examples are syntactically correct.
argument-hint: <file-paths>
disable-model-invocation: true
---

# Extract Examples Skill

Extracts, validates, and exports code examples from documentation. Ensures examples are syntactically correct, complete, and runnable.

## Usage

```bash
/extract-examples <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to extract from (required)
  - Single file: `/extract-examples docs/modules.mdx`
  - Multiple files: `/extract-examples docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/extract-examples docs/**/*.mdx`

- **--validate** or **-v**: Validate syntax of extracted code (optional)
  - Checks HCL, YAML, JSON, Shell syntax
  - Reports errors and warnings
  - Example: `/extract-examples docs/*.mdx --validate`

- **--export** or **-e**: Export directory for extracted code (optional)
  - Creates files from code blocks
  - Organizes by language
  - Example: `--export /tmp/examples/`

- **--language** or **-l**: Filter by specific language (optional)
  - Values: `hcl`, `yaml`, `json`, `bash`, `shell`, `go`, `python`, etc.
  - Example: `--language hcl`

- **--create-tests**: Generate test harness (optional)
  - Creates test files for examples
  - Includes validation scripts
  - Example: `--create-tests`

## What This Skill Does

This skill extracts all code examples from documentation, validates them, and optionally exports them as runnable files.

**Phase 8 Support:** This skill directly supports Phase 8 (Code Example Validation) from REVIEW_PHASES.md by extracting and validating code syntax. Use `--validate` flag to run syntax checks on extracted code.

### Extraction Process

1. **Code Block Discovery**
   - Scans markdown for fenced code blocks
   - Extracts language tags
   - Captures code content
   - Records source location (file, line number)

2. **Language Classification**
   - Groups by programming language
   - Identifies terraform/HCL
   - Finds shell scripts
   - Categorizes YAML/JSON configs

3. **Syntax Validation**
   - HCL: Uses Terraform fmt/validate
   - YAML: Checks YAML syntax
   - JSON: Validates JSON structure
   - Shell: Checks shell syntax with shellcheck

4. **Quality Checks**
   - Finds placeholder values (TODO, CHANGEME, XXX)
   - Identifies incomplete examples
   - Checks for proper formatting
   - Validates file paths and references

5. **Export Organization**
   - Creates language-specific directories
   - Generates numbered/named files
   - Preserves context in comments
   - Creates README for each export

6. **Test Harness Generation** (optional)
   - Creates validation scripts
   - Generates test structure
   - Includes run instructions
   - Sets up CI-compatible tests

## Examples

### Extract and display examples
```bash
/extract-examples docs/modules.mdx
```
Lists all code examples found.

### Extract and validate syntax
```bash
/extract-examples docs/**/*.mdx --validate
```
Validates all HCL, YAML, JSON examples.

### Export to files
```bash
/extract-examples docs/section/*.mdx --export /tmp/examples/
```
Creates runnable files organized by language.

### Filter by language
```bash
/extract-examples docs/**/*.mdx --language hcl --validate
```
Extracts and validates only HCL/Terraform code.

### Create test harness
```bash
/extract-examples docs/**/*.mdx --export /tmp/tests/ --create-tests
```
Exports code and generates test files.

### Comprehensive extraction
```bash
/extract-examples docs/**/*.mdx --validate --export /tmp/extracted/
```
Extract, validate, and export all examples.

## Output Format

### Display Mode (Default)

```
Code Examples Extraction Report
================================

Files Scanned: 5
Total Code Blocks: 23

Breakdown by Language:
- HCL/Terraform: 12 blocks (52%)
- YAML: 5 blocks (22%)
- Bash/Shell: 4 blocks (17%)
- JSON: 2 blocks (9%)

---

HCL/Terraform Examples (12)
============================

1. docs/modules.mdx:45-58 (14 lines)
   Context: Module structure example
   ```hcl
   module "vpc" {
     source  = "terraform-aws-modules/vpc/aws"
     version = "3.0.0"

     name = "my-vpc"
     cidr = "10.0.0.0/16"
   }
   ```
   ✅ Syntactically valid
   ⚠️ Contains placeholder: "my-vpc" (consider using example.com patterns)

2. docs/modules.mdx:78-95 (18 lines)
   Context: Module output configuration
   ```hcl
   output "vpc_id" {
     description = "The ID of the VPC"
     value       = module.vpc.vpc_id
   }
   ```
   ✅ Syntactically valid
   ✅ No placeholders

[... more examples ...]

---

YAML Examples (5)
=================

1. docs/workflows.mdx:123-145 (23 lines)
   Context: GitHub Actions workflow
   ```yaml
   name: Terraform Deployment
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Terraform Init
           run: terraform init
   ```
   ✅ Syntactically valid YAML
   ✅ No placeholders

[... more examples ...]

---

Shell/Bash Examples (4)
=======================

1. docs/workflows.mdx:189-195 (7 lines)
   Context: Initialization script
   ```bash
   terraform init
   terraform plan -out=tfplan
   terraform apply tfplan
   ```
   ✅ Valid shell commands
   ⚠️ No error handling (consider adding set -e)

[... more examples ...]
```

### Validation Mode (--validate)

```
Code Validation Report
======================

HCL/Terraform (12 examples)
---------------------------
✅ Valid: 10 (83%)
❌ Invalid: 2 (17%)

Errors Found:
-------------

docs/modules.mdx:145
  ❌ Syntax error: missing closing brace
  Line 12: expected '}', got EOF

  Fix:
  ```diff
  + }
  ```

docs/workflows.mdx:234
  ❌ Invalid attribute: "source_version"
  Line 5: unsupported attribute "source_version"

  Fix: Use "version" instead of "source_version"

YAML (5 examples)
-----------------
✅ Valid: 5 (100%)

JSON (2 examples)
-----------------
✅ Valid: 2 (100%)

Shell (4 examples)
------------------
✅ Valid: 4 (100%)
⚠️ Warnings: 2

Warnings:
---------

docs/workflows.mdx:189
  ⚠️ SC2086: Quote variables to prevent globbing
  Line 2: terraform plan -out=$PLAN_FILE

  Suggestion: terraform plan -out="$PLAN_FILE"

---

Quality Issues
==============

Placeholder Values Found (5):
------------------------------
- docs/modules.mdx:48: "my-vpc" → Consider "example-vpc"
- docs/modules.mdx:67: "TODO: Add description"
- docs/workflows.mdx:145: "CHANGEME"
- docs/workflows.mdx:189: "your-bucket-name"
- docs/centralize-packages.mdx:56: "XXX"

Incomplete Examples (2):
------------------------
- docs/modules.mdx:234: Missing variable definitions
- docs/workflows.mdx:312: Incomplete configuration (no backend)

---

Summary
=======

Total Examples: 23
Valid: 21 (91%)
Invalid: 2 (9%)
Warnings: 2
Placeholder Issues: 5

Fix 2 syntax errors before publishing.
Review 5 placeholder values for better examples.
```

### Export Mode (--export)

```
Exporting Code Examples
========================

Export Directory: /tmp/examples/
Files Created: 23

Directory Structure:
--------------------
/tmp/examples/
├── README.md
├── hcl/
│   ├── example-001-modules-vpc.tf
│   ├── example-002-modules-output.tf
│   ├── example-003-modules-variables.tf
│   └── ... (9 more files)
├── yaml/
│   ├── example-001-workflow-deploy.yaml
│   ├── example-002-workflow-test.yaml
│   └── ... (3 more files)
├── shell/
│   ├── example-001-init.sh
│   ├── example-002-deploy.sh
│   └── ... (2 more files)
└── json/
    ├── example-001-config.json
    └── example-002-settings.json

File Details:
-------------

hcl/example-001-modules-vpc.tf
  Source: docs/modules.mdx:45-58
  Context: Module structure example
  Lines: 14
  Status: ✅ Valid

hcl/example-002-modules-output.tf
  Source: docs/modules.mdx:78-95
  Context: Module output configuration
  Lines: 18
  Status: ✅ Valid

[... more files ...]

---

README.md Created
=================

Export includes:
- README.md with index of all examples
- Source file references
- Context for each example
- Run instructions

To use these examples:
1. cd /tmp/examples/hcl/
2. terraform init
3. terraform plan

---

Next Steps
==========

1. Review extracted examples
2. Fix 2 syntax errors identified
3. Replace 5 placeholder values
4. Run validation: cd /tmp/examples && ./validate-all.sh
```

### Test Harness Mode (--create-tests)

```
Test Harness Created
====================

Test Directory: /tmp/examples/tests/
Test Files: 23

Test Structure:
---------------
/tmp/examples/tests/
├── test-runner.sh           (Main test script)
├── validate-all.sh          (Validation script)
├── hcl/
│   ├── test-001-vpc.sh
│   ├── test-002-output.sh
│   └── ...
├── yaml/
│   ├── test-001-workflow.sh
│   └── ...
└── shell/
    ├── test-001-init.sh
    └── ...

Test Coverage:
--------------
- HCL: terraform fmt + terraform validate
- YAML: yamllint + schema validation
- JSON: jq validation
- Shell: shellcheck + syntax check

Running Tests:
--------------
# Run all tests
cd /tmp/examples/tests
./test-runner.sh

# Run specific language tests
./test-runner.sh hcl
./test-runner.sh yaml

# CI/CD integration
./test-runner.sh --ci  # Exits with error code on failure

Test Output:
------------
✅ PASS: hcl/example-001-modules-vpc.tf
✅ PASS: hcl/example-002-modules-output.tf
❌ FAIL: hcl/example-012-incomplete.tf (missing variable)
✅ PASS: yaml/example-001-workflow.yaml
[...]

Summary: 21/23 passed (91%)
```

## Export File Format

Exported files include context comments:

```hcl
# Source: docs/modules.mdx:45-58
# Context: Module structure example
# Generated: 2024-01-15T10:30:00Z
#
# This example demonstrates how to structure a Terraform module
# with proper versioning and configuration.

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
}
```

## Validation Tools Used

**HCL/Terraform:**
- `terraform fmt -check`
- `terraform validate`
- HCL parser

**YAML:**
- `yamllint`
- YAML parser
- Schema validation (when available)

**JSON:**
- `jq` validation
- JSON parser

**Shell:**
- `shellcheck`
- Bash syntax check
- POSIX compatibility check

## Best Practices

**Documentation testing workflow:**
```bash
# 1. Extract and validate all examples
/extract-examples docs/**/*.mdx --validate

# 2. Fix any syntax errors
#    (Edit documentation)

# 3. Export to test directory
/extract-examples docs/**/*.mdx --export /tmp/tests/ --create-tests

# 4. Run tests
cd /tmp/tests
./test-runner.sh

# 5. Fix any failing examples
#    (Edit documentation)

# 6. Re-validate
/extract-examples docs/**/*.mdx --validate
```

**Pre-release validation:**
```bash
# Validate all examples before publishing
/extract-examples docs/**/*.mdx --validate

# Must pass before release
```

**CI/CD integration:**
```bash
# In CI pipeline
/extract-examples docs/**/*.mdx --validate --export /tmp/tests/ --create-tests
cd /tmp/tests && ./test-runner.sh --ci || exit 1
```

## Integration with Other Skills

**Phase 8 Workflow (Code Example Validation):**
```bash
# Phase 8: Validate code examples with tooling
/extract-examples docs/file.mdx --validate --export /tmp/examples/

# Run formatters (requires tools installed)
cd /tmp/examples/terraform && terraform fmt -check
cd /tmp/examples/packer && packer fmt -check

# Run validators
cd /tmp/examples/terraform && terraform validate
cd /tmp/examples/packer && packer validate

# Document results in review
```

**With /review:**
```bash
# Review includes code quality check
/review docs/file.mdx --phases 2

# Extract and validate examples separately
/extract-examples docs/file.mdx --validate

# Fix issues and re-review
/review docs/file.mdx --phases 2
```

**With /create-doc:**
```bash
# Create new doc with example template
/create-doc docs/new.mdx --with-example

# Add code examples (manual)

# Validate examples
/extract-examples docs/new.mdx --validate
```

**Documentation testing pipeline:**
```bash
# 1. Full review
/review docs/**/*.mdx

# 2. Extract and test examples
/extract-examples docs/**/*.mdx --validate --export /tmp/tests/ --create-tests

# 3. Run tests
cd /tmp/tests && ./test-runner.sh
```

## Common Issues Detected

**Syntax errors:**
- Missing braces, brackets
- Invalid attribute names
- Type mismatches
- Indentation errors

**Incomplete examples:**
- Missing variable definitions
- Incomplete configuration
- Missing required attributes
- Undefined references

**Placeholder values:**
- TODO comments
- CHANGEME markers
- XXX placeholders
- Generic names (my-*, test-*)

**Quality issues:**
- No error handling in shell scripts
- Unquoted variables
- Hard-coded values
- Missing comments

## When to Use This Skill

Use `/extract-examples` when:
- ✅ **Running Phase 8 reviews** (Code Example Validation from REVIEW_PHASES.md)
- ✅ Validating documentation before release
- ✅ Creating test suites for examples
- ✅ Ensuring examples are runnable
- ✅ Finding syntax errors in code blocks
- ✅ Exporting examples for external use
- ✅ Setting up CI/CD validation
- ✅ Auditing code quality across docs

## Reference Files

This skill aligns with:
- **`AGENTS.md`** - Code example standards
- **`REVIEW_PHASES.md`** - Phase 2 (technical accuracy) and **Phase 8 (Code Example Validation)**

## Notes

- Validation requires appropriate tools installed (terraform, yamllint, etc.)
- Export preserves source attribution
- Test harness is CI/CD compatible
- Works with all markdown code block formats
- Respects language tags for syntax detection
- Can handle multi-file examples
- Generates comprehensive reports
- Exported files are immediately runnable (when valid)
