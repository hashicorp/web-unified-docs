---
name: seo-review
description: Check docs, blog posts, or web page content against Google Search Central's SEO guidelines (titles, meta descriptions, headings, URLs, images, internal linking, structured data, helpful-content/E-E-A-T criteria, and spam policies). Use when asked to review, audit, or optimize content for SEO.
argument-hint: "[path to a file or directory] [--fix] — path is optional (omit to review pasted content); pass --fix to auto-apply low-risk fixes"
---

# SEO Review skill

Review content against Google's official Search Central guidelines, sourced
in `references/GoogleSEOGuidelines.md`. Do not invent SEO rules that aren't
in that reference — if something is a common SEO myth Google explicitly
disclaims (e.g. meta keywords tag, keyword-stuffed domains), call that out
instead of "fixing" it.

Do not apply these guidelines inside code blocks or code samples embedded in
the content.

<Steps>
<Step>
Parse the arguments. If `--fix` appears anywhere in them, note that
auto-fix mode is on and strip it before treating the remainder as the path.

Determine the input from what's left:

- **No path given** — use the pasted/inline content as a single item.
- **Single file path** — read that file.
- **Directory path** — recursively find doc-like files (e.g. `*.md`,
  `*.mdx`, `*.html`, `*.htm`, `*.rst`, `*.txt`) under it, excluding
  build/dependency directories (`node_modules`, `dist`, `build`, `.git`,
  etc.). List the files found and confirm the list with the user before
  reviewing more than ~15 files, since this can be a lot of output.

Read each file. Identify its content type (docs page, blog post, landing
page, etc.) since some categories (e.g. structured data, video) may not
apply.
</Step>

<Step>
Read `references/GoogleSEOGuidelines.md` for the full rule set. For each
file, work through its content against these categories, in this order:

1. **Title & anchor text** — unique, descriptive, non-clickbait; no
   duplicate titles if reviewing multiple pages.
2. **Meta description** — present, unique, 1–2 sentences, accurately
   previews the content.
3. **Headings** — logical H1–H6 order, descriptive (not vague/clickbait),
   not over-fragmented.
4. **URL structure** — descriptive words, no keyword stuffing, one
   canonical URL (flag if `rel="canonical"` or redirects are missing where
   duplicate/near-duplicate URLs exist).
5. **Content quality / helpful-content self-assessment** — apply Google's
   self-assessment questions (originality, comprehensiveness, added value
   vs. existing top results, professional polish, evidence of
   individual care rather than mass-produced filler).
6. **E-E-A-T ("Who, How, Why")** — clear authorship, transparency about
   automation/AI use, verifiable factual claims, and whether the content's
   primary purpose is to help readers vs. manipulate rankings.
7. **Images & video** — meaningful images have descriptive (non-stuffed)
   `alt` text and sit near related text; embedded video has a title/
   description and is placed contextually.
8. **Internal/external linking** — descriptive anchor text, links are real
   crawlable `<a href>` elements, untrusted/UGC/paid links use
   `nofollow`/`sponsored`/`ugc`.
9. **Technical crawlability** — no content hidden from crawlers, no
   unnecessary robots.txt/`noindex` blocking of indexable pages or of
   required CSS/JS.
10. **Duplicate content** — one canonical URL per piece of content.
11. **Structured data** — present and accurate where applicable to the
    content type; flag markup that doesn't match visible content.
12. **Spam policy risks** — scan for keyword stuffing, hidden text,
    doorway-page patterns, thin/scraped/AI-mass-produced content, sneaky
    redirects, or other violations listed in the reference file's spam
    policy section. These are compliance risks, not style nits — call
    them out distinctly.

Skip categories that don't apply to the content type (e.g. structured data
for a plain internal doc) and note them as N/A rather than failing them.

As you find each issue, assign it a priority:

- **High** — spam policy risks (Section 13 of the reference); missing or
  broken elements that block indexing/ranking entirely (no title, no
  crawlable path, sneaky redirects, duplicate content with no
  canonical/redirect); factually wrong or unverifiable claims.
- **Medium** — present but suboptimal best-practice items that hurt
  quality/CTR but don't block indexing (weak or generic meta description,
  non-descriptive anchor text, missing/generic `alt` text, heading
  structure that's illogical or over-fragmented, thin content that could be
  more comprehensive, missing structured data where it clearly applies).
- **Low** — minor polish (slightly suboptimal phrasing, a heading that
  could be marginally clearer, small consistency nits) that would round out
  the content but isn't worth blocking on.

Also tag each issue as **[AUTO-FIX]** or **[MANUAL]**:

- **[AUTO-FIX]** — mechanical, low-risk, meaning-preserving changes:
  adding descriptive `alt` text to images missing it, correcting heading
  hierarchy skips (renumbering levels without changing wording), adding
  `rel="nofollow"`/`sponsored`/`ugc` to untrusted/paid/UGC links, removing
  a `<meta name="keywords">` tag, de-duplicating obviously repeated
  keyword-stuffed phrases, adding a `rel="canonical"` tag when the
  canonical URL is unambiguous from context.
- **[MANUAL]** — anything requiring judgment or that changes what the
  content says: title and meta description rewrites, headings that need
  rewording (not just reordering), content-quality/E-E-A-T gaps, spam
  policy content issues (scraped/thin/doorway content), URL/file renames,
  robots.txt/noindex changes, and structured data additions.

Default to [MANUAL] when unsure — only tag [AUTO-FIX] when the fix can't
plausibly change the page's meaning, voice, or ranking-relevant claims.
</Step>

<Step>
If reviewing more than one file (directory mode), also run a cross-file
pass after the per-file passes: compare titles, meta descriptions, and
overall topic/content across all files to catch duplicate or near-duplicate
titles, duplicate meta descriptions, and overlapping content that should
probably be consolidated or canonicalized. Skip this step for a single
file.
</Step>

<Step>
Report findings per file, grouped by priority (not by category), in this
format:

---

### SEO review: `<file or content name>`

#### 🔴 High priority
- **[Category] [AUTO-FIX|MANUAL] Line N** (or "whole page") — description
  of the issue, which guideline it violates, and a concrete suggested fix.
  Flag spam policy items explicitly, e.g. `[Spam policy: keyword stuffing]`.

#### 🟡 Medium priority
- **[Category] [AUTO-FIX|MANUAL] Line N** — same format as above.

#### 🟢 Low priority
- **[Category] [AUTO-FIX|MANUAL] Line N** — same format as above.

Omit a priority section entirely if it has no findings (don't print
"None found" headers for every level — only note it in the summary).

#### Summary
- Total issues by priority (High / Medium / Low).
- Total issues by fixability (AUTO-FIX vs MANUAL).
- Categories that passed cleanly, listed briefly.
- Overall assessment: short paragraph on the biggest opportunities,
  written in priority order.

---

When reviewing a directory, print one such block per file, then close with
a **Cross-file findings** section (duplicate titles/meta descriptions,
overlapping content — these are almost always High or Medium priority) and
a **Directory summary** table: one row per file with High/Medium/Low counts,
sorted so the worst offenders (most High-priority issues) are listed first.
</Step>

<Step>
Apply fixes based on whether `--fix` was passed:

- **`--fix` not passed** — do not edit anything. Just report, and mention
  that `--fix` can be passed to auto-apply the [AUTO-FIX] items next time.
- **`--fix` passed** — apply every [AUTO-FIX] item directly, across all
  reviewed files if it was a directory review, without asking first (they
  were tagged [AUTO-FIX] precisely because they're low-risk and
  meaning-preserving). Do **not** auto-apply [MANUAL] items — list them and
  ask the user whether to apply any of them, since those carry brand/voice
  or factual tradeoffs. After applying, report a short list of what was
  changed, per file.
</Step>
</Steps>

## Tips

- Spam policy violations are always High priority, regardless of how minor
  they might look in isolated text.
- `--fix` only auto-applies [AUTO-FIX] items. [MANUAL] items (title/meta
  description rewrites, content rewrites, spam-content removal, URL
  renames, robots.txt changes) always require explicit confirmation,
  `--fix` or not.
- Priority and fixability are independent — a High-priority issue can be
  [AUTO-FIX] (e.g. a sneaky-redirect artifact left in markup) and a
  Low-priority one can be [MANUAL] (e.g. a slightly clearer heading
  wording).
- When suggesting title/meta description rewrites, give the exact proposed
  text, not just a description of what's wrong.
- If reviewing multiple files/pages at once, also check for duplicate
  titles/meta descriptions and near-duplicate content across them —
  these are only visible at the multi-page level.
- Never recommend the meta keywords tag, domain keyword-stuffing, or other
  items listed under "Explicitly NOT ranking factors" in the reference file.
