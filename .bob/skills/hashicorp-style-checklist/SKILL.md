---
name: hashicorp-style-checklist
description: >-
  Check a file or pasted content against just the style guide (voice, tone,
  terminology, formatting, headings, punctuation, links, alerts, lists,
  inclusive language, visual aids), with no content-type template, SEO, or
  navigation checks. Lighter and faster than docs-review for a quick style
  pass. Pass a file path or paste content directly; add --fix to auto-apply
  mechanical corrections.
---

# HashiCorp Style Checklist

Check a document against `docs/style-guide/ai-checklist.md` and report violations. This is
the style-only subset of what `docs-review` checks. It skips content-type template
validation, SEO, and nav registration. Use it for a fast style pass on prose that doesn't
need a full `docs-review`, for example a code comment, a project README, or a draft still in
progress. For files under `content/` that are ready for a complete review, use `docs-review`
instead. It covers this same style checklist plus doc-type structure and SEO in one pass.

## Instructions

1. If the user provided a file path, read it. Otherwise use the pasted content.
2. Read `docs/style-guide/ai-checklist.md` and apply every rule in it.
3. Scan the content against the rules. Work through **critical** priority rules first, then
   **important**, then **standard**.
4. For each violation, note the exact location (line number and/or the offending quote), the
   rule name, and its priority.
5. Report findings in this format:

---

### Critical issues
<!-- priority: critical -->
- **Line N** — _Rule name_: description of the violation → suggested fix

### Important issues
<!-- priority: important -->
- **Line N** — _Rule name_: description → suggested fix

### Standard issues
<!-- priority: standard -->
- **Line N** — _Rule name_: description → suggested fix

### Auto-fixable summary
List every `auto-fixable: yes` violation, and the mechanical half of any `auto-fixable:
partial` violation, with a one-line fix so the user can batch-apply them.

---

6. If there are no violations in a category, omit that section.
7. End with a short summary: total issues found, how many are auto-fixable.

## Tips

- For `auto-fixable: yes` items, show the exact before/after text.
- For `auto-fixable: partial` items, apply only the mechanical case described in the rule's
  `fix` field. Leave the judgment-call case as a reported, not applied, finding.
- For `auto-fixable: no` items, explain *why* it violates the rule, not just what to change.
  These always require human judgment.
- If the user passes `--fix`, apply all `auto-fixable: yes` corrections directly to the file
  (or return the corrected text if content was pasted), plus the mechanical half of any
  `auto-fixable: partial` corrections. Never auto-apply anything tagged `auto-fixable: no`,
  and never auto-apply the judgment-call half of a `partial` rule.
- If you change a rule in `docs/style-guide/ai-checklist.md`, this skill picks it up
  automatically next run. It doesn't hardcode any style rules locally.
