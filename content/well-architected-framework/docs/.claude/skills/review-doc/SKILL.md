---
name: review-doc
description: Performs comprehensive 7-phase documentation review following REVIEW_PHASES.md and AGENTS.md standards. Use for thorough documentation quality checks.
argument-hint: <file-paths> [--phases 1-7] [--fix]
---

# Documentation Review Skill

Executes the 7-phase review from `REVIEW_PHASES.md` using standards from `AGENTS.md`.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--phases** / **-p**: Specific phases to run, e.g. `--phases 1-3` or `--phases 4,5,7` (default: all)
- **--fix** / **-f**: Implement fixes automatically (default: report only)
- **--report-only** / **-r**: Generate report without changes

## Phase Overview

1. **User Success Evaluation** - Both decision-maker and implementer personas can succeed
2. **Technical Accuracy** - All technical content is correct and current
3. **Cross-Document Relationships** - Docs form a cohesive workflow
4. **Document Structure Compliance** - WAF-specific structure and formatting
5. **SEO & AI/LLM Optimization** - See `/seo-optimize` for criteria
6. **Link Quality & Balance** - Right mix of beginner and advanced resources
7. **Final User Success Check** - Both personas succeed with the document

Phase 8 (Code Example Validation) requires tool execution — request `/code-review` separately.

Read `REVIEW_PHASES.md` for detailed review questions and criteria per phase.
