---
applyTo: "content/**/*.md,content/**/*.mdx"
---

# Documentation Review Checklist

Run this checklist before producing the final report.

## Scope and references

- Supported files: `.md` and `.mdx` only.
- Read these references when present:
  - `/docs/style-guide/`
  - `/slack.mdx`
- If a reference is missing, continue the review with available context and note the missing file in the report assumptions.

## Identify doc type

Classify the changed file as one of:
- Tutorial
- How-to
- Concept
- Reference
- Troubleshooting
- Landing page
- Release notes

If ambiguous, use closest type and state that assumption.

## Universal checks

- Heading hierarchy is valid (no skipped levels).
- Exactly one H1.
- Code fences have language identifiers.
- Links are valid and descriptive.
- Images have descriptive alt text.
- Admonitions use correct component syntax.
- Structure is scannable and SEO-friendly.

## Type-specific checks

- Tutorial / How-to: procedural content uses numbered steps.
- Concept: no step-by-step task flow.
- Reference: highly structured, scannable entries.
- Troubleshooting: symptom -> cause -> resolution.
- Landing page: concise overview and child links.
- Release notes: date/version and categorized change list.

## Scoring model

- Content Quality: 50%
- Format Compliance: 40%
- SEO & Discoverability: 10%
- Pass threshold: 70%

Use the weighted total in the report.
