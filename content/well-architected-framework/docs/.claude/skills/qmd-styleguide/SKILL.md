---
name: qmd-styleguide
description: Comprehensive HashiCorp style validation using QMD database queries across all 18 style guide sections. Use for pre-publication reviews and thorough quality checks.
argument-hint: <file-paths> [--fix]
---

# QMD-Powered HashiCorp Style Guide Check

Comprehensive validation using the indexed HashiCorp style guide. Checks all 18 sections (200+ rules).

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files (required)
- **--fix** / **-f**: Apply auto-fixable corrections
- **--report-only** / **-r**: Report without changes

## Phase 1: Load Style Rules from QMD

```bash
qmd query "active voice passive voice subject performs action" -c hashicorp-styleguide -n 3
qmd query "present tense avoid will future tense" -c hashicorp-styleguide -n 3
qmd query "word choice lets vs enables allows" -c hashicorp-styleguide -n 3
qmd query "foreign words via etc latin jargon avoid" -c hashicorp-styleguide -n 2
qmd query "unnecessary words in order to simplify" -c hashicorp-styleguide -n 2
qmd query "serial comma oxford comma punctuation" -c hashicorp-styleguide -n 2
qmd query "em dash punctuation alternatives comma period" -c hashicorp-styleguide -n 2
qmd query "quotation marks UI elements product names" -c hashicorp-styleguide -n 2
qmd query "abbreviations spell out TF TFE TFC VSO" -c hashicorp-styleguide -n 2
qmd query "headings sentence case capitalization hash style" -c hashicorp-styleguide -n 3
qmd query "links descriptive text verb outside brackets" -c hashicorp-styleguide -n 3
qmd query "lists hyphens unordered parallel structure introductory sentence" -c hashicorp-styleguide -n 3
qmd query "code blocks language identifier summary realistic values" -c hashicorp-styleguide -n 3
qmd query "alerts callouts note warning danger placement" -c hashicorp-styleguide -n 2
qmd query "UI components bold action verbs click press select" -c hashicorp-styleguide -n 2
qmd query "inclusive language exclusionary terms avoid" -c hashicorp-styleguide -n 2
qmd query "numbers numerals spell out rules" -c hashicorp-styleguide -n 2
qmd query "tables header rows sentence case when to use" -c hashicorp-styleguide -n 2
qmd query "port number IP address formatting code" -c hashicorp-styleguide -n 2
```

## Phase 2: Read Document

Read the target file(s) in full.

## Phase 3: Validate Against All Rules

**Writing style:** passive voice ("is managed by", "can be configured"), future "will", "allows/enables" → "lets", "via" → "using/through", "etc." → remove, "in order to" → "to"

**Abbreviations:** "TF"→"Terraform", "TFE"→"Terraform Enterprise", "TFC"/"HCP TF"→"HCP Terraform", "VSO"→"Vault Secrets Operator", "COM"→"Consul on Kubernetes"

**Punctuation:** missing Oxford commas in 3+ item lists, em dashes (—) → commas/periods, quotation marks around UI elements (use bold) or product names (remove)

**Headings:** Title Case → sentence case, trailing punctuation, underline style → hash style

**Links:** non-descriptive text ("click here", "this page"), verb inside brackets, bare URLs in prose

**Lists:** missing introductory sentence, inconsistent markers (mixing - and *), non-parallel structure

**Code blocks:** missing language identifier, missing 1-2 sentence summary after block, placeholder values (foo, test123), incomplete examples

**Alerts:** Note/Warning/Tip when plain prose suffices, wrong type, placed before context

**UI components:** element names not bold, wrong verbs (click for non-clickable, "select" for dropdowns, "press" for keys)

**Numbers:** numerals under 10 spelled out in prose (one through nine)

**Inclusive language:** "whitelist/blacklist" → "allowlist/denylist", "master/slave" → "primary/secondary", "sanity check" → "confidence check"

## Phase 4: Report Findings

Report by section: ✅ PASS / ❌ FAIL with line number, rule, current text, suggested fix, [AUTO-FIX] or [MANUAL] tag.

## Phase 5: Apply Fixes (if --fix)

Auto-fixable: present tense, word choice (lets), foreign words (via→using), unnecessary phrases (in order to→to), abbreviations, port numbers/IPs, em dashes, link verb placement, quotation marks.
