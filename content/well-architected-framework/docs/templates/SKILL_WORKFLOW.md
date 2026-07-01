# Skill workflow for existing documents

A practical guide to running skills on an existing WAF document. Follow the workflow that matches your situation — each one tells you what to run, in what order, and why.

**Related files:**
- [DOCUMENT_REVIEW_WORKFLOW.md](./DOCUMENT_REVIEW_WORKFLOW.md) — Full review workflows including new document creation
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) — Pattern examples and troubleshooting

---

## Choose your workflow

| Situation | Workflow | Time |
|---|---|---|
| Editing and about to commit | [Pre-commit gate](#pre-commit-gate) | ~1 min |
| Making a focused edit (link fix, wording tweak) | [Quick fix](#quick-fix) | ~5 min |
| Rewriting or expanding a section | [Content revision](#content-revision) | ~20 min |
| Preparing a document for publication | [Pre-publish review](#pre-publish-review) | ~30 min |
| Auditing quality across a pillar | [Pillar audit](#pillar-audit) | ~10 min |
| Quarterly maintenance | [Maintenance check](#maintenance-check) | ~15 min per doc |

---

## Pre-commit gate

**When:** You made changes and want to verify nothing is broken before committing.

```bash
/publish-gate docs/your-file.mdx
```

That's it. The gate checks 6 things: frontmatter, required sections, internal links, resource link count, stale domains, and content depth. You get a binary PASS or FAIL.

If it fails, fix the specific issue it reports and run it again.

---

## Quick fix

**When:** You fixed a typo, updated a link, or tweaked a paragraph.

**Step 1 — Style check the file**

```bash
/quick-styleguide docs/your-file.mdx --fix
```

Catches voice, tense, word choice, and formatting issues. Auto-fixes what it can.

**Step 2 — Gate check**

```bash
/publish-gate docs/your-file.mdx
```

Confirms nothing structural broke.

**Step 3 — Review the diff**

```bash
git diff docs/your-file.mdx
```

Verify the auto-fixes make sense. Revert anything that doesn't.

---

## Content revision

**When:** You're rewriting a section, adding content, updating code examples, or making substantive changes.

### Assess first

Before making changes, understand the current state:

```bash
/gap-analysis docs/your-file.mdx
```

Identifies what the document is missing — content gaps, persona imbalances, missing resources. Use the output to guide your edits.

### Make your changes

Edit the document manually. Write new content, update code examples, restructure sections.

### Validate what you changed

Run these in order. Each builds on the previous:

**Step 1 — Structure**

```bash
/check-structure docs/your-file.mdx --fix
```

Fixes heading case, list introductions, bold title formatting, and document ending order. Flags vague pronouns and missing "Why" sections for manual review.

**Step 2 — Code examples** (if you added or changed code)

```bash
/check-code-examples docs/your-file.mdx
```

Checks that code blocks have summaries, use realistic values, and are complete. Review the output and fix manually — most code example issues require human judgment.

**Step 3 — Style**

```bash
/quick-styleguide docs/your-file.mdx --fix
```

Applies HashiCorp style guide rules: active voice, present tense, word choice, abbreviation expansion. Auto-fixes common issues.

**Step 4 — Resources** (if you changed the resources section)

```bash
/check-resources docs/your-file.mdx --fix
```

Validates link formatting, verb placement, and section organization. Auto-fixes formatting; flags content gaps for manual review.

**Step 5 — Links**

```bash
/link-check docs/your-file.mdx
```

Verifies all internal links point to files that exist. Catches broken paths introduced during restructuring.

**Step 6 — Gate check**

```bash
/publish-gate docs/your-file.mdx
```

Final verification that the document meets minimum publishing standards.

---

## Pre-publish review

**When:** A document is going out — you want a thorough quality check before publication.

This workflow runs the full skill suite. Allow about 30 minutes.

### Phase 1: Content quality (10 min)

```bash
/gap-analysis docs/your-file.mdx
```

Check for missing concepts, uncovered use cases, and persona gaps. Fill any critical gaps before proceeding.

```bash
/persona-coverage docs/your-file.mdx
```

Verify both decision-makers and implementers are served. Target: 40-50% decision-maker content, 50-60% implementer content.

```bash
/readability docs/your-file.mdx
```

Check reading level (target: grade 8-10), jargon density, and sentence complexity. Simplify the flagged sentences.

### Phase 2: Structure and style (10 min)

```bash
/check-structure docs/your-file.mdx --fix
/full-styleguide docs/your-file.mdx --fix
/check-resources docs/your-file.mdx --fix
```

Run all three with `--fix` to auto-apply corrections. Review the diff after each to verify changes.

```bash
/check-code-examples docs/your-file.mdx
```

If the document has code blocks, validate completeness and summaries.

### Phase 3: Links and SEO (5 min)

```bash
/link-check docs/your-file.mdx --external
```

Test both internal paths and external URLs. Fix any broken links.

```bash
/seo-optimize docs/your-file.mdx
```

Check meta description, headings, keyword placement, and AI discoverability. Implement recommendations.

### Phase 4: Dedup and cross-references (5 min)

```bash
/content-dedup docs/your-file.mdx
```

Check if content duplicates other WAF documents. Replace duplicated content with links to the source of truth.

```bash
/smart-cross-reference docs/your-file.mdx
```

Find opportunities to connect this document to related WAF pages. Add workflow links in body text.

### Phase 5: Final gate

```bash
/publish-gate docs/your-file.mdx
```

Confirm the document passes all critical checks. If it passes, review the full diff one last time:

```bash
git diff docs/your-file.mdx
```

Read the document end-to-end. Does it flow naturally? Would you send it to a colleague?

---

## Pillar audit

**When:** You want a portfolio-level view of documentation quality across a pillar.

### Get the ranked report

```bash
/pillar-report docs/secure-systems/ --check all
```

Produces a ranked list of every document in the pillar, scored by structure, resources, and readability. Start fixing from the bottom of the list.

### Focus on specific issues

```bash
# Which docs have the worst resource sections?
/pillar-report docs/secure-systems/ --check resources --top 10

# Which docs have structural problems?
/pillar-report docs/secure-systems/ --check structure --top 10

# Which docs are hardest to read?
/pillar-report docs/secure-systems/ --check readability --top 10
```

### Find duplicated content across the pillar

```bash
/content-dedup docs/secure-systems/
```

Identifies paragraphs that appear in multiple documents. Consolidate to a single source of truth.

### Check all links across the pillar

```bash
/link-check docs/secure-systems/
```

Finds every broken internal link in the pillar. Fix them before they reach readers.

---

## Maintenance check

**When:** Quarterly review of existing documents to keep them current.

For each document in the pillar:

**Step 1 — Content freshness**

```bash
/content-freshness docs/your-file.mdx
```

Flags outdated version references, deprecated features, stale domains, and time-sensitive language. Update what's out of date.

**Step 2 — Link health**

```bash
/link-check docs/your-file.mdx --external
```

Test all links including external URLs. Fix 404s, update redirected URLs, replace stale domains.

**Step 3 — Readability and style drift**

```bash
/readability docs/your-file.mdx
/quick-styleguide docs/your-file.mdx --fix
```

Check if the document still meets reading level targets. Apply current style guide rules — standards evolve and older documents may have drifted.

**Step 4 — Cross-reference health**

```bash
/smart-cross-reference docs/your-file.mdx
```

New documents may have been published since this document was written. Add cross-references to newly relevant content.

**Step 5 — Gate check**

```bash
/publish-gate docs/your-file.mdx
```

Confirm the document still meets publishing standards after your maintenance updates.

---

## Skill reference

### Fast auto-fix skills (run with `--fix`)

| Skill | What it fixes | Speed |
|---|---|---|
| `/check-structure --fix` | Heading case, list intros, bold formatting, ending order | ~10s |
| `/quick-styleguide --fix` | Voice, tense, word choice, formatting | ~15s |
| `/check-resources --fix` | Link formatting, verb placement, context | ~10s |
| `/check-hashicorp-style --fix` | Full style guide compliance | ~20s |
| `/full-styleguide --fix` | Comprehensive style (200+ rules) | ~45s |

### Analysis skills (report only)

| Skill | What it reports | Speed |
|---|---|---|
| `/publish-gate` | Binary PASS/FAIL on 6 critical gates | ~10s |
| `/gap-analysis` | Missing content, concepts, and use cases | ~15s |
| `/persona-coverage` | Decision-maker vs. implementer balance | ~15s |
| `/readability` | Grade level, jargon density, complex sentences | ~15s |
| `/content-freshness` | Outdated versions, deprecated features, stale links | ~15s |
| `/link-check` | Broken internal links, stale domains | ~20s |
| `/content-dedup` | Duplicated content across documents | ~30s |
| `/seo-optimize` | SEO and AI discoverability issues | ~20s |

### Enhancement skills

| Skill | What it does | Speed |
|---|---|---|
| `/add-resources` | Suggests relevant HashiCorp resource links | ~30s |
| `/smart-cross-reference` | Finds linking opportunities to related docs | ~30s |

### Portfolio skills

| Skill | What it does | Speed |
|---|---|---|
| `/pillar-report` | Runs checks across all docs in a pillar | 2-5 min |

---

## Tips

- **Run auto-fix skills before analysis skills.** Fixing structure and style first means the analysis skills report on your actual content, not formatting noise.
- **Review diffs after every `--fix` run.** Auto-fixes are usually right, but occasionally rewrite something in a way that loses nuance. A quick `git diff` catches this.
- **Use `/publish-gate` as your final step in every workflow.** It's fast and catches the issues that matter most in production.
- **Start pillar audits with `/pillar-report --check all`.** The ranked list tells you where to spend your time. Don't review good documents when bad ones need attention.
- **Run `/content-dedup` after major rewrites.** When you expand a document, you may accidentally duplicate content that already exists elsewhere.
