---
name: docs-quickstyle
description: >-
  Fast HashiCorp style validation using the indexed quick-reference styleguide
  (hashicorp-quickstyle). Checks Top 12 critical guidelines plus formatting
  rules. Uses docs-search for rule lookup. ~70% fewer tokens than docs-fullstyle.
argument-hint: <file-paths> [--fix]
---

# Quick HashiCorp Style Check (Docs-Powered)

Fast validation targeting the Top 12 guidelines and critical formatting rules.
Queries the `hashicorp-quickstyle` index via docs-search for rule definitions.
For comprehensive pre-publication review, use `/docs-fullstyle`.

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files (required)
- **--fix** / **-f**: Apply auto-fixable corrections
- **--report-only** / **-r**: Report without changes

## Phase 1: Load Rules from Indexed Styleguide

Search the `hashicorp-quickstyle` library for each rule category. Run these
searches to retrieve the current rule definitions:

```bash
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "active voice passive voice direct imperatives" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "present tense future features will" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "word choice lets enables allows simplest word" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "abbreviations TF TFE TFC product names" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "foreign words via etc latin jargon unnecessary words" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "em dash punctuation serial comma oxford" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "headings sentence case formatting bold lists hyphens" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-quickstyle "links descriptive text code blocks port numbers" --limit 3 --output yaml --quiet
```

## Phase 2: Read and Check the Document

Read the target file(s) in full. Apply the rules retrieved in Phase 1.

**Top 12 Guidelines (from index):**
1. Active voice - subject performs action
2. Present tense - avoid "will" for immediate actions
3. No future promises - avoid "new"/"currently"
4. No abbreviations - TF, TFE, TFC, HCP TF, VSO, COM
5. "We" for HashiCorp only, not reader guidance
6. "You" for reader actions
7. Linear flow - no "above"/"below", use "following"
8. No unnecessary words - "in order to" -> "to"
9. Simplest words - "lets" not "enables/allows"
10. No foreign/jargon - avoid "via", "etc."
11. No adjacent elements without separation
12. Mix prose and lists

**Additional critical checks:**
- Em dashes -> commas or periods
- Quotation marks around UI/product names -> bold or remove
- Serial commas (Oxford commas required)
- Port numbers and IPs -> inline code
- Headings -> sentence case, hash-style (#)
- Bold -> `**` not `__`
- Unordered lists -> hyphens
- UI elements -> bold, correct verbs (click/press/select)

## Phase 3: Report Findings

For each issue found, report:
- Line number
- Rule violated (with reference to indexed rule)
- Current text
- Suggested fix
- `[AUTO-FIX]` or `[MANUAL]` tag

## Phase 4: Apply Fixes (if --fix)

Apply auto-fixable issues using Edit tool:
- Present tense: "will show" -> "shows"
- Word choice: "enables/allows" -> "lets"
- Foreign words: "via" -> "using/through", "etc." -> remove
- Unnecessary phrases: "in order to" -> "to"
- Abbreviations: "TF" -> "Terraform", "TFC" -> "HCP Terraform"
- Port numbers: "port 3000" -> "port `3000`"
- IPs: "127.0.0.1" -> "`127.0.0.1`"
- Quotation marks: remove from UI/product names
- Em dashes: replace with comma (clear cases only)
- Direction: "below" -> "following"

## Index Details

- **Library:** `hashicorp-quickstyle`
- **Version:** `1.0.0`
- **Source:** `templates/styleguide-quick-reference.md` (1,026 lines)
- **Refresh:** Run `npx @arabold/docs-mcp-server@latest refresh hashicorp-quickstyle` to update
