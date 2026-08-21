# Make the style guide AI-agent-consumable; stop duplicating rules in SKILL.md

## Context

`docs/style-guide/` is prose-oriented and human-facing. The `.bob/skills/docs-review/SKILL.md`
skill currently hardcodes three separate checklists inside itself:

- **Step 4** — a restated style-guide compliance checklist (voice/tone, terminology, word
  choice, formatting, code blocks, headings, links, alerts, lists, inclusive language) that
  paraphrases rules already documented in detail across `docs/style-guide/*.md`.
- **Step 3** — doc-type format checklists (How-to, Concept, Reference, Troubleshooting,
  Overview, Release notes) that overlap with the page templates already living in
  `docs/content-guide/content-types.md`.
- **Step 0b** — a hardcoded auto-fix rule list (Latin abbreviations, minimizing language,
  heading case, blank lines) that is really just "the subset of Step 4 rules that are
  mechanically fixable."

Every time the style guide changes, whoever maintains it also has to remember to update
SKILL.md in three places, or the skill silently drifts out of sync with the actual style
guide. The goal is to make `docs/style-guide/` (and `docs/content-guide/content-types.md`,
which already owns doc-type templates) the single source of truth, and have SKILL.md just
point at them.

Investigation confirmed the style guide is a good candidate for this: most existing rule
pages (`top-12.md`, `general/*.md`, etc.) already follow a disciplined pattern — rule as a
heading, a `- **keywords**: ...` / `- **content sets**: ...` metadata line, then Do/Don't
examples. `general/enterprise-releases.md` is the cleanest existing example of this pattern.
There's no frontmatter, rule IDs, or priority/auto-fix tagging anywhere yet — that's the gap
to fill for AI consumption specifically. (A private, externally-maintained "quick style
guide" skill on this machine uses a similar Priority/Type/Detect/Fix per-rule format; it's
independently maintained from a personal repo and not something this plan depends on — it's
only used here as a proof that a tagged, flat-rule format works well for agent consumption.)

Also found while mapping Step 3 onto `content-guide/content-types.md`: that file only
defines templates for How-to, Concept, Overview, and Reference. Troubleshooting and Release
notes aren't recognized as content types there at all, even though SKILL.md already reviews
against them (using `content/consul/v2.0.x/content/docs/troubleshoot/service-communication.mdx`
and `content/nomad/v2.0.x/content/docs/release-notes/v1-11-x.mdx` as format examples). This
plan closes that gap rather than leaving it as a two-tier inconsistency.

## Approach

### 1. New page: `docs/style-guide/ai-checklist.md`

Reorganize Step 4's checklist content into individual rule entries, grouped under the same
categories Step 4 already uses (Voice/tone/point of view, Terminology and product names,
Word choice, Formatting, Code blocks, Headings, Numbers/punctuation/spelling, Links,
Alerts and admonitions, Lists, Inclusive language).

Each rule entry follows the existing style-guide convention (heading + keywords + content
sets, as used in `top-12.md` and `general/*.md`) plus two new tags for agent consumption:

```markdown
### Do not use "please" in instructions

- **keywords**: writing, tone, instructions
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: yes
- **detect**: "please" in an instructional sentence
- **fix**: remove it, or rewrite as a direct imperative (for example, "Please run the
  following" → "Run the following")

Remove "please" from instructional sentences.
```

Rules for populating each field:

- **priority** / **auto-fixable** are new — assign based on Step 4's existing framing and
  Step 0b's current auto-fix vs. "not auto-fixable" split (that split becomes this tag).
- **detect** / **fix** only need to be populated for `auto-fixable: yes` entries — carry over
  the exact mechanical instructions currently in Step 0b (the Latin-abbreviation mapping,
  minimizing-language removal list, heading-case conversion rule, blank-line insertion rule)
  so no fidelity is lost in the move.
- Where a rule already has a detailed page elsewhere in the style guide (active voice,
  language/word choice, headings, links, alerts), link to it instead of re-authoring
  Do/Don't examples — this page should stay terse and scannable, not duplicate rationale.
- Preserve doc-specific nuances Step 4 already calls out (for example, "avoid `<Note>` and
  `<Tip>` in docs — stricter than tutorials") in the content-sets or a short note on that
  entry.

Add `ai-checklist.md` to the table of contents in `docs/style-guide/index.md`, alongside
`top-12.md`.

### 2. Extend `docs/content-guide/content-types.md`

- Add **Troubleshooting template** and **Release notes template** sections, following the
  same fenced-markdown pattern as the existing How-to/Concept/Overview templates. Model them
  on the two example docs SKILL.md already treats as format references
  (`content/consul/v2.0.x/content/docs/troubleshoot/service-communication.mdx` and
  `content/nomad/v2.0.x/content/docs/release-notes/v1-11-x.mdx`).
- Add a **Checklist** subsection under each of the six doc types (How-to, Concept, Overview,
  Reference, Troubleshooting, Release notes), carrying over the exact checklist items
  currently in SKILL.md Step 3 for that type.
- Add a **Universal checklist** section for the "All doc types — universal checks" list
  currently in Step 3.
- Update the content-type list near the top of the file to include Troubleshooting and
  Release notes alongside Explanation/How-to/Reference, so the file is internally consistent.

### 3. Rewrite `.bob/skills/docs-review/SKILL.md`

- **Step 1 (reference files)**: add `docs/style-guide/ai-checklist.md` to the list of files
  read once per invocation. `docs/content-guide/content-types.md` is already in the list.
- **Step 0b / Auto-fix rules**: replace the hardcoded rule list with an instruction to apply
  a correction for every `ai-checklist.md` entry tagged `auto-fixable: yes`, using that
  entry's `detect`/`fix` fields. The "Not auto-fixable" section becomes "every entry tagged
  `auto-fixable: no`" — no separate list needed. Keep the parts of Step 0b that are skill
  behavior, not style-guide content: logging every change to the fixes log, never touching
  `@include` partial lines or auto-generated blocks, which tools to use.
- **Step 3 (doc-type format check)**: replace the six hardcoded checklists and the universal
  checklist with an instruction to use the Checklist and Universal checklist sections now in
  `content-guide/content-types.md` (already loaded in Step 1). Keep the doc-type table and
  the note about the `## Steps` heading convention — those are skill logic, not style-guide
  content.
- **Step 4 (style guide compliance)**: replace the hardcoded checklist with an instruction to
  apply every entry in `docs/style-guide/ai-checklist.md` to the file under review, flagging
  violations and citing the entry's heading text in the report's "Rule / Convention" column.
- Leave the scoring tables, output format templates, and "Behavioral rules" section
  untouched — they're skill-specific and don't belong in the style guide.

## Critical files

- `docs/style-guide/ai-checklist.md` — new
- `docs/style-guide/index.md` — add one TOC line
- `docs/content-guide/content-types.md` — add 2 templates, 6 checklists, 1 universal checklist
- `.bob/skills/docs-review/SKILL.md` — rewrite Steps 0b, 1, 3, 4 only

Existing patterns to reuse, not reinvent:
- `docs/style-guide/top-12.md` and `docs/style-guide/general/enterprise-releases.md` — the
  keywords/content-sets rule-per-heading format this plan extends with priority/auto-fixable.
- `content/consul/v2.0.x/content/docs/troubleshoot/service-communication.mdx` and
  `content/nomad/v2.0.x/content/docs/release-notes/v1-11-x.mdx` — already-identified format
  models for the two new content-types.md templates.

## Verification

- Diff SKILL.md before/after Steps 0b/3/4 against the new `ai-checklist.md` and
  `content-types.md` sections to confirm every rule was relocated, not dropped or reworded.
- Spot-check several migrated entries (a few from each category) against the original Step
  4/Step 3/Step 0b wording for fidelity, especially the auto-fix detect/fix mechanics.
- Run `/docs-review` on one file per doc type before and after the change (at least one
  how-to and the newly-templated troubleshooting/release-notes types) and confirm the
  findings and score are materially unchanged — content moved, the review's judgments
  shouldn't.
- Confirm `docs/style-guide/index.md`'s new link resolves and `ai-checklist.md` matches the
  surrounding markdown conventions (heading levels, list style) of its sibling pages.
