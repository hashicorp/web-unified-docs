---
applyTo: "content/**/*.md,content/**/*.mdx"
---

# Documentation Review Output Contract

Use this exact final response shape for Markdown documentation PR reviews.

- First non-empty line must be exactly: `### 📄 Doc Info`.
- Do not output a generic "Pull request overview" summary.
- Do not omit any section below.
- Keep section headings exactly as written and in the same order.
- Keep table headers exactly as written.

## Required Output

### 📄 Doc Info
- **File**: `[filename]`
- **Doc type identified**: `[type]`
- **Style guide path read**: `/docs/style-guide/`

### 📊 Quality Score

**Overall Score: [XX]%** — [Ready to publish / Ready for review / Needs revision / Significant work required]

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| Content Quality | [XX/100] | 50% | [XX/50] |
| Format Compliance | [XX/100] | 40% | [XX/40] |
| SEO & Discoverability | [XX/100] | 10% | [XX/10] |
| **Total** | | | **[XX/100]** |

**Status**: [✅ Passes 70% threshold / ❌ Below 70% threshold — not ready for review]

### ✅ What Looks Good
List concrete strengths from the changed file.

### ⚠️ Issues Found

| # | Location | Issue | Rule / Convention | Suggested Fix |
|---|---|---|---|---|
| 1 | [heading or line ref] | [what's wrong] | [rule] | [how to fix] |

If there are no issues, explicitly say: `No issues found.`

### 📋 Overall Assessment
One short paragraph with publish readiness and top priorities.
