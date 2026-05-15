---
name: check-hashicorp-style
description: Validate documentation against HashiCorp official style guide. Checks for active voice, word choice, tense, and formatting compliance.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check HashiCorp Style Guide

Validates against all rules in `templates/styleguide.md`.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix** / **-f**: Apply auto-fixable corrections
- **--report-only** / **-r**: Report without changes

## Top 12 Guidelines

1. Active voice — subject performs action
2. Present tense — avoid "will" for immediate actions
3. No future promises — avoid "new"/"currently"
4. No abbreviations — TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
5. "We" for HashiCorp only
6. "You" for reader actions
7. Linear flow — no "above"/"below", use "following"
8. No unnecessary words — "in order to" → "to"
9. Simplest words — "lets" not "enables/allows"
10. No foreign/jargon — avoid "via", "etc.", Latin words
11. No adjacent elements without separation
12. Mix prose and lists

## Additional rules from styleguide.md

Grammar/punctuation (serial commas), markdown formatting, heading sentence case, link formatting, code block syntax, alert usage, word choice, inclusive language.

## Auto-fixable

Present tense ("will show" → "shows"), word choice ("allows/enables" → "lets"), foreign words ("via" → "using"), unnecessary phrases ("in order to" → "to"), abbreviations ("TF" → "Terraform"), simple passive voice.

## Manual review required

Complex passive voice (sentence restructuring), "we" usage (context-dependent), adjacent elements, directional references ("above"/"below" → specific section links).

## Instructions

1. Read target document(s)
2. Read `templates/styleguide.md` for all style rules
3. Check document against every applicable rule
4. Report findings with line numbers, current text, suggested fix, [AUTO-FIX] or [MANUAL]
5. Apply fixes with Edit tool if --fix provided
