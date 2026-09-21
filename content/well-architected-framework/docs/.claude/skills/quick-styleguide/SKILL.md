---
name: quick-styleguide
description: Fast HashiCorp style validation using QMD database queries. Perfect for daily checks and pre-commit workflows.
argument-hint: <file-paths> [--fix]
---

# Quick HashiCorp Style Guide Check

Fast validation targeting Top 12 Guidelines + critical formatting rules. Uses ~70% fewer tokens than `/qmd-styleguide`. For comprehensive pre-publication review use `/qmd-styleguide`.

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files (required)
- **--fix** / **-f**: Apply auto-fixes (default: report only)
- **--report-only** / **-r**: Explicit report-only mode

## Validation Steps

### Phase 1: Load rules from QMD

```bash
qmd query "present tense avoid will immediate actions" -c hashicorp-styleguide -n 3
qmd query "word choice lets vs enables allows" -c hashicorp-styleguide -n 2
qmd query "em dash punctuation rules" -c hashicorp-styleguide -n 2
qmd query "port number formatting code" -c hashicorp-styleguide -n 2
qmd query "quotation marks UI elements product names" -c hashicorp-styleguide -n 2
qmd query "active voice passive voice" -c hashicorp-styleguide -n 2
qmd query "foreign words via etc jargon" -c hashicorp-styleguide -n 2
```

### Phase 2: Read and check the document

**Top 12 Guidelines:**
1. Active voice - subject performs action
2. Present tense - avoid "will" for immediate actions
3. No future promises - avoid "new"/"currently"
4. No abbreviations - TF, TFE, TFC, HCP TF, VSO, COM
5. "We" for HashiCorp only, not reader guidance
6. "You" for reader actions
7. Linear flow - no "above"/"below", use "following"
8. No unnecessary words - "in order to" → "to"
9. Simplest words - "lets" not "enables/allows"
10. No foreign/jargon - avoid "via", "etc."
11. No adjacent elements without separation
12. Mix prose and lists

**Additional critical checks:**
- Em dashes (—) → commas or periods
- Quotation marks around UI/product names → bold or remove
- Serial commas (Oxford commas required)
- Port numbers and IPs → inline code
- Headings → sentence case, hash-style (#)
- Bold → `**` not `__`
- Unordered lists → hyphens
- UI elements → bold, correct verbs (click/press/select)

### Phase 3: Report findings

For each issue: line number, rule, current text, suggested fix, auto-fixable flag.

### Phase 4: Apply fixes (if --fix)

Apply auto-fixable issues using Edit tool:
- Present tense: "will show" → "shows"
- Word choice: "enables/allows" → "lets"
- Foreign words: "via" → "using/through", "etc." → remove
- Unnecessary phrases: "in order to" → "to"
- Abbreviations: "TF" → "Terraform", "TFC" → "HCP Terraform"
- Port numbers: "port 3000" → "port `3000`"
- IPs: "127.0.0.1" → "`127.0.0.1`"
- Quotation marks: remove from UI/product names
- Em dashes: replace with comma (clear cases only)
- Direction: "below" → "following"
