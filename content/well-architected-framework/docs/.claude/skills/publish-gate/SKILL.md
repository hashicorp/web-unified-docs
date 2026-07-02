---
name: publish-gate
description: Fast go/no-go pre-publish check. Runs critical validation subset and gives a binary PASS/FAIL verdict. Designed for pre-commit workflows.
argument-hint: <file-paths>
---

# Publish Gate Skill

A fast, opinionated pre-publish check that runs the minimum critical validations and gives a clear PASS or FAIL verdict. Designed to be the last step before committing or opening a PR.

**Design principle:** Only block on issues that would embarrass us in production. Style preferences and minor improvements are for `/review-doc`, not this gate.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- No `--fix` flag — this skill only reports. Fix issues with the specific skill that found them.

## Gate Checks

The gate runs 6 fast checks. A document must pass ALL of them to get a ✅ PASS.

### Gate 1: Frontmatter exists and is valid [BLOCKING]

- File starts with `---` frontmatter block
- `page_title` field is present and non-empty
- `description` field is present, non-empty, and 50-170 characters

**Fail example:** Missing `description` field, or description is 12 characters.

### Gate 2: Required sections present [BLOCKING]

- Document has at least one H2 heading (`##`)
- Document has a `## HashiCorp resources` section (case-insensitive)
- Document has at least 2 paragraphs of prose before the first H2 (intro content)

**Fail example:** Document jumps straight into `## Why use modules` with no introduction.

### Gate 3: No broken internal links [BLOCKING]

- Every internal link target (paths starting with `/` or `./`) resolves to an existing `.mdx` file
- Uses the same resolution logic as the `link-check` skill

**Fail example:** `[secrets rotation](/well-architected-framework/secure/nonexistent-page)`

### Gate 4: Minimum resource links [BLOCKING]

- `## HashiCorp resources` section contains at least 3 links
- Links must be actual markdown links (`[text](url)`), not plain text

**Fail example:** HashiCorp resources section with only 1 link.

### Gate 5: No stale domains [BLOCKING]

- No links to deprecated HashiCorp domains:
  - `learn.hashicorp.com`
  - `www.terraform.io/docs`
  - `www.vaultproject.io/docs`
  - `www.consul.io/docs`
  - `www.nomadproject.io/docs`
  - `www.packerproject.io/docs`
  - `www.boundaryproject.io/docs`

**Fail example:** Link to `https://learn.hashicorp.com/tutorials/terraform/...`

### Gate 6: Document is not empty or stub [BLOCKING]

- Document prose content (excluding frontmatter, code blocks, headings, links) is at least 200 words
- Document has at least 3 H2 or H3 headings

**Fail example:** Document with frontmatter and a single paragraph of 80 words.

## Output Format

### On PASS

```
✅ PASS — ready to publish

  docs/secure-systems/secrets/rotation.mdx

  Gate 1: Frontmatter ✅
  Gate 2: Required sections ✅
  Gate 3: Internal links (8 checked) ✅
  Gate 4: Resource links (6 found) ✅
  Gate 5: No stale domains ✅
  Gate 6: Content depth (847 words) ✅
```

### On FAIL

```
❌ FAIL — 2 blocking issues

  docs/secure-systems/secrets/rotation.mdx

  Gate 1: Frontmatter ✅
  Gate 2: Required sections ✅
  Gate 3: Internal links ❌
    → Line 45: /well-architected-framework/secure/nonexistent-page — file not found
  Gate 4: Resource links (2 found) ❌
    → Minimum is 3. Run /add-resources to find relevant links.
  Gate 5: No stale domains ✅
  Gate 6: Content depth (847 words) ✅

  Fix the ❌ issues above, then re-run /publish-gate.
```

### Multiple files

When checking multiple files, show a summary first:

```
## Publish Gate: 3 files checked

✅ 2 passed | ❌ 1 failed

| Status | File |
|---|---|
| ✅ | docs/secure-systems/secrets/rotation.mdx |
| ✅ | docs/secure-systems/secrets/storage.mdx |
| ❌ | docs/secure-systems/secrets/leaked.mdx |

### Failed: docs/secure-systems/secrets/leaked.mdx
  Gate 3: Internal links ❌
    → Line 45: broken link...
```

## Execution Steps

1. For each file:
   a. Read the file content
   b. Run Gate 1: Parse frontmatter, check required fields
   c. Run Gate 2: Scan for H2 headings, check for HashiCorp resources section, count intro paragraphs
   d. Run Gate 3: Extract internal links, resolve paths, check file existence
   e. Run Gate 4: Count links in the HashiCorp resources section
   f. Run Gate 5: Grep for stale domain patterns
   g. Run Gate 6: Count prose words and headings
2. Determine PASS/FAIL (all gates must pass)
3. Output the verdict

## What This Skill Does NOT Check

These are important but are better handled by dedicated skills during the writing process — not as a publish gate:

- Style guide compliance → use `/quick-styleguide`
- Code example quality → use `/check-code-examples`
- SEO optimization → use `/seo-optimize`
- Persona coverage → use `/persona-coverage`
- Reading level → use `/readability`
- Content duplication → use `/content-dedup`

The gate checks only what would be clearly wrong in production.
