---
name: code-review
description: Validates code examples in documentation using formatters and validators (terraform fmt, packer validate, etc). Phase 8 from REVIEW_PHASES.md.
argument-hint: <file-paths> [--fix]
allowed-tools: Bash(terraform *), Bash(packer *), Bash(vault *), Bash(nomad *), Bash(consul *)
---

# Code Review Skill (Phase 8)

Validates all code examples using tool-based validation. Run separately from `/review-doc` (Phases 1-7). Only run when explicitly requested.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix** / **-f**: Run formatters and apply fixes (default: report only)

## Phase 8 Checklist

For each code block:
- [ ] Complete (no missing braces, closing fences, required context)
- [ ] `terraform fmt -check` (or `terraform fmt -write` with --fix)
- [ ] `packer fmt -check` (or `packer fmt` with --fix)
- [ ] `vault policy fmt -check`
- [ ] `nomad fmt -check` / `consul validate`
- [ ] `terraform validate` / `packer validate` where possible
- [ ] Placeholder values clearly marked (e.g., `your-organization`), not production-looking
- [ ] Record command output and tool versions used

## Process

1. Extract all code blocks from MDX file
2. Identify code type (Terraform, Packer, HCL, Bash, etc.)
3. Write to temp files in `/private/tmp/claude/.../scratchpad/`
4. Run formatters/validators for each type
5. Report: ✅ passed, ❌ errors (with message), ⚠️ cannot validate in isolation, 📝 formatter suggestions

## Cannot validate in isolation

Examples requiring external resources (DB connections, cloud credentials), file references, authentication, or partial snippets — mark as "Cannot validate in isolation" and perform basic syntax check only.
