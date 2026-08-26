---
name: pillar-report
description: Run a documentation check across all files in a WAF pillar and produce an aggregated report ranked by severity.
argument-hint: <pillar-path> [--check <skill-name>] [--top 10]
---

# Pillar Report Skill

Runs a documentation check across every `.mdx` file in a WAF pillar and aggregates the results into a ranked report. Turns per-document spot-checking into portfolio-level quality management.

## Arguments

- **pillar-path**: Path to a pillar directory (e.g., `docs/secure-systems/`) — scans all `.mdx` files recursively (required)
- **--check**: Which check to run. Options:
  - `structure` — run check-structure rules
  - `resources` — run check-resources rules
  - `code-examples` — run check-code-examples rules
  - `style` — run quick-styleguide rules
  - `readability` — run readability metrics
  - `links` — run link-check (internal only)
  - `freshness` — run content-freshness checks
  - `all` — run structure + resources + readability (default)
- **--top**: Show only the N worst-scoring documents (default: show all)
- **--format**: Output format — `table` (default) or `detailed`

## How It Works

### Step 1: Discover files

Glob for all `.mdx` files in the pillar path, excluding:
- `index.mdx` files (pillar overview pages — different structure expectations)
- Files in `templates/` directories

Record total file count.

### Step 2: Run checks per file

For each file, run the selected check(s) and capture issue counts by severity:
- **❌ Error**: Blocking issue (missing required section, broken link, etc.)
- **⚠️ Warning**: Should-fix issue (long sentences, missing summaries, etc.)
- **ℹ️ Info**: Minor suggestion (could improve but not wrong)

**Check mappings:**

| Check | What it evaluates | Error examples | Warning examples |
|---|---|---|---|
| `structure` | Why section, list intros, ending order, headings | Missing Why section, wrong ending order | Vague pronouns, missing "the following" |
| `resources` | Link formatting, count, organization | < 3 resource links | Verbs inside brackets, missing context |
| `code-examples` | Summaries, completeness, realistic values | No summary after code block | Hardcoded values, empty templates |
| `style` | Active voice, tense, word choice | Passive voice, future tense | Conjunction overuse, unnecessary words |
| `readability` | FK grade, sentence length, jargon | Grade > 12 | Grade 10-12, jargon density > 3 |
| `links` | Internal link targets exist | Broken internal link | Stale domain |
| `freshness` | Version refs, deprecated features | Deprecated feature referenced | Outdated version mentioned |

### Step 3: Score each document

Calculate a score per document (0-100):
- Start at 100
- Subtract 10 per error
- Subtract 3 per warning
- Subtract 1 per info
- Floor at 0

### Step 4: Aggregate and rank

Sort documents from lowest score (worst) to highest score (best).

Calculate pillar-wide statistics:
- Total documents scanned
- Average score across all documents
- Distribution: how many are ✅ Good (80+), ⚠️ Needs work (50-79), ❌ Critical (< 50)
- Most common issue type across the pillar

## Output Format

### Table format (default)

```
## Pillar Report: secure-systems
**Check:** structure + resources + readability | **Files:** 47 | **Date:** 2026-03-31

### Summary
- Average score: 72/100
- ✅ Good (80+): 28 docs (60%)
- ⚠️ Needs work (50-79): 14 docs (30%)
- ❌ Critical (<50): 5 docs (10%)

### Most Common Issues
1. Missing code block summaries (23 docs)
2. < 5 resource links (18 docs)
3. Verbs inside link brackets (15 docs)

### All Documents (ranked worst → best)

| Score | File | Errors | Warnings | Top Issue |
|---|---|---|---|---|
| 34 | secrets/leaked-credentials.mdx | 4 | 8 | Missing Why section |
| 41 | access/boundary-setup.mdx | 3 | 7 | No resource links |
| 52 | encryption/tls-certificates.mdx | 2 | 6 | FK grade 13.1 |
| ... | ... | ... | ... | ... |
| 97 | secrets/rotation.mdx | 0 | 1 | Minor: conjunction |
| 100 | overview.mdx | 0 | 0 | — |
```

### Detailed format (`--format detailed`)

Same as table format, plus for each document with score < 80, list all individual issues with line numbers (like the individual skill output).

## Execution Steps

1. Glob for `.mdx` files in the pillar path
2. For each file:
   a. Read the file content
   b. Run the selected check(s) by applying the rules defined in the corresponding skill
   c. Count errors, warnings, and info items
   d. Calculate score
3. Sort by score ascending
4. Calculate aggregate statistics
5. Output the report

## Performance Notes

- For large pillars (50+ docs), this skill may take 2-5 minutes
- Use `--check` to limit scope for faster runs
- Use `--top 10` to focus on the worst documents
- The `links --external` option is intentionally excluded from pillar-report to avoid rate-limiting issues — run link-check with `--external` on individual files
