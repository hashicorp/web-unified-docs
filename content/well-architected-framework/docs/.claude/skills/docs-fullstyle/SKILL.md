---
name: docs-fullstyle
description: >-
  Comprehensive HashiCorp style validation using the indexed full styleguide
  (hashicorp-fullstyle). Checks all 18 sections with 200+ rules and examples.
  Uses docs-search for rule lookup. For daily quick checks, use docs-quickstyle.
argument-hint: <file-paths> [--fix]
---

# Comprehensive HashiCorp Style Check (Docs-Powered)

Full validation against all 18 sections of the HashiCorp style guide (200+ rules).
Queries the `hashicorp-fullstyle` index via docs-search for rule definitions and
examples. For faster daily checks, use `/docs-quickstyle`.

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files (required)
- **--fix** / **-f**: Apply auto-fixable corrections
- **--report-only** / **-r**: Report without changes

## Phase 1: Load Rules from Indexed Styleguide

Search the `hashicorp-fullstyle` library for each section. Run these searches
to retrieve the current rule definitions with examples:

```bash
# Writing style
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "active voice passive voice subject performs action examples" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "present tense avoid will future tense immediate actions" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "word choice lets enables allows simplest word utilize" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "foreign words via etc latin jargon avoid" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "unnecessary words in order to simplify filler" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "we only hashicorp you reader address" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "content flows forward above below following" --limit 2 --output yaml --quiet

# Punctuation and formatting
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "serial comma oxford comma punctuation" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "em dash punctuation alternatives comma period" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "quotation marks UI elements product names" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "abbreviations spell out TF TFE TFC VSO product names" --limit 2 --output yaml --quiet

# Structure and formatting
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "headings sentence case capitalization hash style" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "links descriptive text verb outside brackets" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "lists hyphens unordered parallel structure introductory sentence" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "code blocks language identifier summary realistic values" --limit 3 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "alerts callouts note warning danger placement" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "UI components bold action verbs click press select" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "inclusive language exclusionary terms allowlist denylist" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "numbers numerals spell out rules" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "tables header rows sentence case when to use" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "port number IP address formatting code" --limit 2 --output yaml --quiet
npx @arabold/docs-mcp-server@latest search hashicorp-fullstyle "no future features new old currently" --limit 2 --output yaml --quiet
```

## Phase 2: Read and Check the Document

Read the target file(s) in full. Validate against ALL rules retrieved in Phase 1.

### Section Checklist (all 18 sections)

**Writing style:**
- [ ] Active voice - subject performs action, no passive constructions
- [ ] Present tense - avoid "will" for immediate actions
- [ ] No future promises - avoid "new", "old", "now", "currently"
- [ ] No abbreviations - TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
- [ ] "We" for HashiCorp only, not reader guidance
- [ ] "You" for reader actions, not "a user" or "one can"
- [ ] Linear flow - no "above"/"below", use "following"
- [ ] No unnecessary words - "in order to" -> "to", "simply" -> remove
- [ ] Simplest words - "lets" not "enables/allows", "use" not "utilize"
- [ ] No foreign/jargon - avoid "via", "etc.", "e.g.", "i.e."
- [ ] No adjacent elements without separation (prose between lists/code)
- [ ] Mix prose and lists - avoid long unbroken lists

**Punctuation:**
- [ ] Serial commas (Oxford commas required in 3+ item lists)
- [ ] Em dashes -> commas or periods
- [ ] Quotation marks -> bold for UI elements, remove from product names

**Formatting:**
- [ ] Headings -> sentence case, hash-style (#), no trailing punctuation
- [ ] Bold -> `**` not `__`
- [ ] Unordered lists -> hyphens (`-`), not asterisks (`*`)
- [ ] Port numbers and IPs -> inline code
- [ ] UI elements -> bold, correct verbs (click/press/select)

**Content structure:**
- [ ] Links -> descriptive text, action verbs outside brackets
- [ ] Code blocks -> language identifier, 1-2 sentence summary after
- [ ] Alerts -> appropriate type (Note/Warning/Tip), placed after context
- [ ] Tables -> header rows, sentence case
- [ ] Numbers -> spell out one through nine in prose
- [ ] Inclusive language -> allowlist/denylist, primary/secondary

## Phase 3: Report Findings

Report by section. For each issue:
- Line number
- Section and rule violated
- Current text (quoted)
- Suggested fix
- `[AUTO-FIX]` or `[MANUAL]` tag

Summary table at end:
| Section | Status | Issues |
|---------|--------|--------|
| Active voice | PASS/FAIL | count |
| ... | ... | ... |

## Phase 4: Apply Fixes (if --fix)

**Auto-fixable:**
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
- Bold syntax: `__text__` -> `**text**`
- List markers: `*` -> `-`

**Manual review required:**
- Active voice rewrites
- "We" vs "you" voice corrections
- Content flow restructuring
- Inclusive language replacements (context-dependent)
- Code block summaries
- Alert type changes

## Phase 5: If issues remain after --fix

List remaining [MANUAL] items with suggested rewrites for user review.

## Index Details

- **Library:** `hashicorp-fullstyle`
- **Version:** `1.0.0`
- **Source:** `templates/styleguide.md` (3,222 lines, 18 sections, 200+ rules)
- **Refresh:** Run `npx @arabold/docs-mcp-server@latest refresh hashicorp-fullstyle` to update
