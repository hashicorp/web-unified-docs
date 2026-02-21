---
name: code-review
description: Validates code examples in documentation using formatters and validators (terraform fmt, packer validate, etc). Phase 8 from REVIEW_PHASES.md.
argument-hint: <file-paths> [--fix]
allowed-tools: Bash(terraform *), Bash(packer *), Bash(vault *), Bash(nomad *), Bash(consul *)
---

# Code Review Skill (Phase 8)

Validates all code examples in documentation files using tool-based validation (formatters, validators). This is Phase 8 from REVIEW_PHASES.md and should be run separately from the standard 7-phase review.

## Goal

Ensure all code examples are syntactically correct and validated by tooling. This phase requires executing formatters and validators, so it must be run with tools that can execute Bash commands.

## Usage

```bash
/code-review <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to validate (required)
  - Single file: `/code-review docs/modules.mdx`
  - Multiple files: `/code-review docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/code-review docs/**/*.mdx`

- **--fix** or **-f**: Automatically apply formatter fixes (default: false)
  - Without flag: Report validation issues only
  - With flag: Run formatters and fix issues

## What This Skill Does

This skill validates code examples in documentation by:

1. **Extracting all code blocks** from the specified documentation files
2. **Identifying code types** (Terraform, Packer, HCL, Bash, etc.)
3. **Running formatters/linters** for each code type:
   - Terraform: `terraform fmt -check` (or `terraform fmt -write` with `--fix`)
   - Packer: `packer fmt -check` (or `packer fmt` with `--fix`)
   - Vault policies: `vault policy fmt -check`
   - Nomad: `nomad fmt -check`
   - Consul: `consul validate`
4. **Running validators** where possible:
   - Terraform: `terraform validate`
   - Packer: `packer validate`
5. **Checking for common issues**:
   - Missing braces or closing fences
   - Incomplete code blocks
   - Unclear placeholder values
   - Production-looking values in examples
6. **Recording validation results** with tool versions

## Phase 8 Review Checklist

For each code example in the documentation:

- [ ] Verify every code block is complete (no missing braces, closing fences, or required context)
- [ ] Run formatters/linters where possible (`terraform fmt -check`, `packer fmt -check`)
- [ ] Run validators where possible (`terraform validate`, `packer validate`)
- [ ] Replace examples that cannot validate in isolation with self-contained examples
- [ ] Confirm placeholder values are clearly marked (e.g., `your-organization`) and do not look production-ready
- [ ] Record the command output and tool versions used for validation

## When to Use

Run Phase 8 code review:

- **After completing Phases 1-7** of documentation review
- **When explicitly requested** (not part of standard "full review")
- **For documents with code examples** including Terraform, Packer, Vault policies, Nomad jobs, or CLI commands
- **Before publishing** to ensure all examples are valid

## How It Works

### Step 1: Extract Code Blocks

Parse the MDX file and extract all code blocks with language identifiers:

```markdown
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```
```

### Step 2: Write to Temporary Files

For each code block, create a temporary file in the scratchpad directory:

```bash
# Example for Terraform code
/private/tmp/claude/.../scratchpad/terraform_example_1.tf
/private/tmp/claude/.../scratchpad/packer_example_1.pkr.hcl
```

### Step 3: Run Validators

Execute appropriate validation tools based on code type:

**Terraform:**
```bash
terraform fmt -check terraform_example_1.tf
terraform init -backend=false
terraform validate
```

**Packer:**
```bash
packer fmt -check packer_example_1.pkr.hcl
packer validate packer_example_1.pkr.hcl
```

**Vault Policies:**
```bash
vault policy fmt -check policy_example_1.hcl
```

**Nomad:**
```bash
nomad fmt -check job_example_1.nomad
nomad validate job_example_1.nomad
```

### Step 4: Report Results

Generate a validation report showing:

- ✅ Code blocks that passed validation
- ❌ Code blocks with errors (with specific error messages)
- ⚠️ Code blocks that cannot be validated in isolation (with explanation)
- 📝 Formatter suggestions (with `--fix` flag will apply these)
- 🔧 Tool versions used for validation

### Step 5: Apply Fixes (with --fix flag)

If `--fix` is specified:

1. Run formatters to fix style issues
2. Update code blocks in the original MDX file with formatted code
3. Report which code blocks were updated

## Example Output

```
Code Validation Results for docs/modules.mdx
============================================

Tool Versions:
- Terraform: v1.7.0
- Packer: v1.10.0

Code Block 1 (lines 42-65): Terraform Configuration
✅ PASSED: terraform fmt
✅ PASSED: terraform validate
Status: Valid

Code Block 2 (lines 94-110): Packer Template
❌ FAILED: packer fmt
Error: Inconsistent indentation at line 8
Suggestion: Run with --fix to apply formatter

Code Block 3 (lines 138-152): Vault Policy
⚠️ SKIPPED: Cannot validate in isolation (requires Vault server)
Note: Manual verification recommended

Summary:
- 3 code blocks found
- 1 passed validation
- 1 has formatting issues
- 1 cannot be validated automatically
```

## Limitations

Some code examples cannot be validated in isolation:

- **Examples requiring external resources**: Database connections, API endpoints, existing infrastructure
- **Examples with file references**: Packer file provisioners referencing local paths
- **Examples requiring authentication**: Cloud provider credentials, Vault tokens
- **Partial examples**: Code snippets showing only relevant portions

For these cases, the skill will:
1. Identify them and mark as "Cannot validate in isolation"
2. Perform basic syntax checking where possible
3. Suggest making examples self-contained if feasible
4. Document why validation was skipped

## Integration with Review Workflow

Phase 8 is **separate** from the standard 7-phase review process:

- **Phases 1-7**: Content, structure, style, SEO (run with `/review-doc`)
- **Phase 8**: Code validation (run with `/code-review`)

Run Phase 8 separately because:
- It requires tool execution capabilities
- Not all documents have code examples
- It's more resource-intensive
- Users should explicitly request code validation

## Best Practices

1. **Run Phase 8 last**: Complete content and style reviews first
2. **Use scratchpad directory**: Write temporary files to `/private/tmp/claude/.../scratchpad/`
3. **Check tool availability**: Verify terraform, packer, etc. are installed before validation
4. **Handle validation failures gracefully**: Some examples intentionally cannot be validated
5. **Update tool versions**: Record which versions were used for reproducibility
6. **Apply fixes carefully**: Review formatter changes before committing

## Exit Codes

The skill uses consistent exit codes for automation:

- **0**: All validations passed
- **1**: Validation errors found (fixable)
- **2**: Code examples cannot be validated in isolation
- **3**: Required validation tools not installed

## Related Skills

- `/review-doc`: Runs Phases 1-7 (does not include code validation)
- `/extract-examples`: Extracts code examples without validation
- `/check-style`: Style validation (does not check code syntax)

## Notes

- This skill requires Bash tool access to run formatters and validators
- Only run this phase when explicitly requested
- Not included in "full review" or standard `/review-doc` execution
- Best suited for final validation before publishing
- Requires formatters/validators to be installed on the system
