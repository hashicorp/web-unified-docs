---
name: seo-optimize
description: SEO optimization for meta descriptions, titles, headings, and links. Complete source of truth for SEO and AI/LLM optimization criteria.
argument-hint: <file-paths> [--fix]
---

# SEO Optimize Skill

Optimizes documentation for search engines and AI/LLM discoverability. Source of truth for Phase 5 SEO criteria used by `/review-doc`.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix** / **-f**: Apply fixes automatically (default: report only)
- **--focus**: Limit to one area: `meta`, `headings`, `links`, `keywords`, `structure`, `all` (default)

## Optimization Areas

Check each area and report issues with line numbers:

1. **Meta description** - 150-160 chars, includes primary keywords, action-oriented, unique across docs
2. **Title** - Primary keyword present, matches `page_title` frontmatter, unique
3. **First paragraph** - Primary keyword appears in first 100 words
4. **Heading structure** - H1→H2→H3 hierarchy, keywords in headings, descriptive (not "Getting Started")
5. **Link descriptions** - No "learn more"/"click here", action verbs outside brackets
6. **Content structure** - Clear topic sentences, explicit relationship statements between sections
7. **Keyword density** - Primary keyword 3-5 times, secondary keywords naturally distributed
8. **Internal linking** - Relevant cross-references, keyword-rich anchor text, related content connected
9. **Image alt text** - Descriptive, 10-125 chars, no "image of", includes relevant keywords
10. **Code block languages** - Every ` ``` ` block has language tag (`hcl`, `bash`, `json`, etc.)
11. **Contextual completeness** - Each section understandable alone, acronyms defined per section, no bare "it"/"this"
12. **Entity recognition** - Product names consistently capitalized (Vault, Terraform, Packer), versions specified when relevant
13. **Featured snippets** - Direct 40-60 word answers to "what is"/"how to" questions, question-style H2s
14. **Term definitions** - Technical terms defined on first mention using "X is a Y that..." pattern
15. **Prerequisites** - "Before you begin" section with version requirements and dependencies
16. **Readability** - 15-20 word sentence average, 3-5 sentence paragraphs, no 25+ word sentences
17. **External links** - HTTPS, authoritative sources, current versions

## Auto-Fixable Issues

- Meta description length/keyword addition
- Link text replacing "learn more"/"click here"
- Missing language tags on code blocks
- HTTPS upgrades on external links
- Generic heading text improvements

## Execution

1. Read target file(s)
2. Check each of the 17 areas above
3. Report: status per area (✅ PASS / ❌ FAIL / ⚠️ WARNING), line numbers, specific fixes
4. Tally auto-fixable vs manual review items
5. Provide overall score 1-10
6. If `--fix`: apply auto-fixable changes using Edit tool
