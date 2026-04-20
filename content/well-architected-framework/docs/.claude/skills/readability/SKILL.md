---
name: readability
description: Measure reading level, jargon density, and sentence complexity. Scores documents and flags the hardest-to-read sections with rewrite suggestions.
argument-hint: <file-paths> [--target-grade 10] [--fix]
---

# Readability Skill

Measures how easy a document is to read and understand. Complements style guide checks by giving writers concrete metrics and identifying the specific sentences and sections that need simplification.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--target-grade**: Target Flesch-Kincaid grade level (default: 10, suitable for technical docs aimed at professionals)
- **--fix** / **-f**: Rewrite the 5 most complex sentences in place (requires manual review)
- **--report-only** / **-r**: Report metrics without changes (default)

## Metrics

### 1. Flesch-Kincaid Grade Level [REPORT]

Calculate the Flesch-Kincaid grade level for the document's prose content:

**Formula:**
`FK Grade = 0.39 × (total words / total sentences) + 11.8 × (total syllables / total words) - 15.59`

**Preparation — extract prose only:**
- Remove frontmatter (between `---` markers)
- Remove code blocks (between ` ``` ` markers)
- Remove markdown formatting (`**`, `_`, `` ` ``, link syntax)
- Remove headings (lines starting with `#`)
- Keep: paragraphs, list item text, blockquote text

**Syllable counting heuristic:**
- Count vowel groups (a, e, i, o, u, y) in each word
- Subtract 1 for silent-e endings (words ending in 'e' that aren't 'le')
- Minimum 1 syllable per word
- Known exceptions: "terraform" = 3, "kubernetes" = 4, "infrastructure" = 5, "configuration" = 5

**Targets:**
| Grade | Rating | Audience |
|---|---|---|
| 8-10 | ✅ Good | Professional technical audience |
| 10-12 | ⚠️ Acceptable | Complex technical topics may justify this |
| 12+ | ❌ Too complex | Needs simplification |
| < 8 | ⚠️ Possibly oversimplified | Check that technical depth is adequate |

### 2. Sentence Length Distribution [REPORT]

Count words per sentence. Report:
- Average sentence length (target: 15-20 words)
- Longest sentence (flag if > 30 words)
- Percentage of sentences over 25 words (target: < 15%)
- List the 5 longest sentences with line numbers

### 3. Paragraph Length Distribution [REPORT]

Count sentences per paragraph. Report:
- Average paragraph length (target: 3-5 sentences)
- Longest paragraph (flag if > 7 sentences)
- Paragraphs with only 1 sentence (flag — may need merging or expansion)

### 4. Jargon Density [REPORT]

Count domain-specific technical terms per 100 words of prose.

**Jargon word list** (terms that may need definition or context):
- Infrastructure terms: idempotent, immutable, ephemeral, declarative, imperative, stateful, stateless, deterministic
- Security terms: zero-trust, mTLS, RBAC, ABAC, SAML, OIDC, PKI, HSM, SIEM
- DevOps terms: GitOps, CI/CD, canary, blue-green, rolling, sidecar, service mesh, control plane, data plane
- Cloud terms: multi-tenant, single-tenant, egress, ingress, peering, transit gateway

**Targets:**
| Density | Rating |
|---|---|
| 0-3 per 100 words | ✅ Accessible |
| 3-5 per 100 words | ⚠️ Moderate — ensure terms are defined |
| 5+ per 100 words | ❌ Dense — simplify or add definitions |

**First-use check:** For each jargon term found, check if it's defined on first use (look for patterns like "X is a...", "X, which...", "X (also known as...)"). Flag undefined jargon terms.

### 5. Complex Sentence Detection [PARTIAL AUTO-FIX]

Flag sentences that combine multiple complexity factors:
- More than 25 words AND contains 2+ commas
- Contains 3+ prepositional phrases (of, in, for, with, by, to, from, at, on)
- Contains nested clauses (which, that, where, when used mid-sentence)
- Contains double negatives or passive voice with long subjects

For each flagged sentence, provide:
- Line number
- Complexity reason
- Suggested rewrite (shorter, active voice, split into 2 sentences if needed)

## Output Format

```
## Readability Report: <filename>

### Overall Score
- **Flesch-Kincaid Grade Level: 11.2** (target: ≤ 10) ⚠️
- **Average sentence length: 18.4 words** ✅
- **Jargon density: 3.8 per 100 words** ⚠️

### Metrics Summary
| Metric | Value | Target | Status |
|---|---|---|---|
| FK Grade Level | 11.2 | ≤ 10 | ⚠️ |
| Avg sentence length | 18.4 words | 15-20 | ✅ |
| Sentences > 25 words | 12% | < 15% | ✅ |
| Avg paragraph length | 4.1 sentences | 3-5 | ✅ |
| Jargon density | 3.8/100 words | ≤ 3 | ⚠️ |
| Undefined jargon terms | 2 | 0 | ❌ |

### Top 5 Most Complex Sentences

1. **Line 34** (38 words, 4 prepositional phrases):
   > "The configuration management process for infrastructure provisioning in multi-cloud environments requires careful coordination of state files across teams with different access levels for each provider."
   
   **Suggested rewrite:**
   > "Managing infrastructure across multiple clouds requires coordinating state files. Grant each team access only to the providers they manage."

2. **Line 67** (31 words, passive voice):
   > ...

### Undefined Jargon Terms

- **Line 12:** "idempotent" — not defined on first use
- **Line 45:** "mTLS" — not defined on first use
```

## Execution Steps

1. Read the target file(s)
2. Extract prose content (strip frontmatter, code blocks, markdown formatting, headings)
3. Split into sentences (on `.`, `!`, `?` followed by space or newline)
4. Split into paragraphs (on blank lines)
5. Calculate all metrics
6. Identify the 5 most complex sentences
7. If `--fix`: generate rewrites for complex sentences and apply with edit tool (mark with `<!-- simplified -->` comment for reviewer)
8. Output the report
