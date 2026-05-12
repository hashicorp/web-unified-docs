---
applyTo: "content/**/*.md,content/**/*.mdx"
---

# Docs PR comment guard

When reviewing changed `.md` or `.mdx` files, enforce these output tokens.

- First non-empty line must be exactly: `### 📄 Doc Info`
- Include these headings exactly once and in this order:
  - `### 📄 Doc Info`
  - `### 📊 Quality Score`
  - `### ✅ What Looks Good`
  - `### ⚠️ Issues Found`
  - `### 📋 Overall Assessment`
- Include this score table header exactly:
  - `| Category | Score | Weight | Weighted Score |`
- Include this issues table header exactly:
  - `| # | Location | Issue | Rule / Convention | Suggested Fix |`
- Include a line containing `Overall Score:`
- Do not start with or include `Pull request overview`
- Do not replace the required format with a short summary