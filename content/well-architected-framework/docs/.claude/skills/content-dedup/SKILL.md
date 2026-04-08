---
name: content-dedup
description: Find duplicated content across WAF documents. Identifies similar paragraphs and sections that should be consolidated or linked.
argument-hint: <file-path|pillar-path> [--threshold 0.7] [--scope pillar|all]
---

# Content Dedup Skill

Scans WAF documents to find duplicated or highly similar content that should be consolidated into a single source of truth with links. Supports the WAF content strategy: "Link to existing documents instead of duplicating content."

## Arguments

- **file-path**: A single `.mdx` file to check against all other docs, or a directory to scan all docs within
- **--threshold**: Similarity threshold (0.0-1.0, default 0.7). Lower values catch looser paraphrasing
- **--scope**: `pillar` (default) scans within the same pillar, `all` scans across all WAF pillars
- **--min-length**: Minimum paragraph length in words to consider (default: 30). Skips short paragraphs that naturally repeat
- **--report-only**: Default behavior — report duplicates without changes

## How It Works

### Step 1: Extract content blocks

For each `.mdx` file, extract meaningful content blocks:
- Split on blank lines to get paragraphs
- Skip frontmatter (between `---` markers)
- Skip code blocks (between ` ``` ` markers)
- Skip single-line items (headings, list bullets under 30 words)
- Keep blocks of 30+ words as comparison units
- Record: file path, line number, block text

### Step 2: Normalize for comparison

For each content block, create a normalized version:
- Lowercase all text
- Remove markdown formatting (`**`, `_`, `` ` ``, `[]()`)
- Remove stop words (the, a, an, is, are, was, were, in, on, at, to, for, of, with, and, or, but, not)
- Stem common suffixes (-ing, -tion, -ment, -ness, -ly, -ed, -er, -est)
- Sort remaining words alphabetically to create a "word bag"

### Step 3: Compare blocks

Use Jaccard similarity on the word bags:
- `similarity = |intersection| / |union|`
- If similarity >= threshold, flag as a duplicate pair
- Group transitive duplicates (if A≈B and B≈C, group A,B,C together)

### Step 4: Identify source of truth

For each duplicate group, suggest a source of truth based on:
1. Which document is more comprehensive (longer treatment of the topic)
2. Which document is the more natural "home" for the topic (based on file path/pillar)
3. Which version was written first (earlier in file listing, as a heuristic)

## Output Format

```
## Content Duplication Report

### Scan scope
- Files scanned: 47
- Content blocks compared: 312
- Threshold: 0.70

### Duplicate groups found: 3

---

#### Group 1: Secrets rotation explanation (similarity: 0.85)

**Source A:** docs/secure-systems/secrets/rotation.mdx (lines 23-28)
> Organizations should rotate secrets regularly to limit the window of exposure
> if a secret is compromised. Rotation replaces existing credentials with new
> ones, invalidating the old values...

**Source B:** docs/secure-systems/secrets/manage-leaked-secrets.mdx (lines 45-50)
> Regular secret rotation limits exposure when credentials are compromised.
> The rotation process replaces current credentials with new values,
> invalidating previous secrets...

**Recommendation:** Source A is more comprehensive. In Source B, replace with:
"Rotate secrets regularly to limit exposure. Read [Secrets rotation](/path) for rotation strategies and implementation guidance."

---

#### Group 2: ...
```

## Edge Cases

- **Intentional repetition**: Some duplication is strategic (e.g., brief recaps at the start of related docs). Flag but don't treat as errors — the report says "review" not "fix"
- **Boilerplate**: Skip frontmatter, resource sections, and "Next steps" sections — these naturally repeat structural patterns
- **Code blocks**: Exclude from comparison. Similar code across docs is expected (common patterns)
- **Short paragraphs**: The `--min-length` filter (default 30 words) prevents flagging naturally short repeated phrases

## Execution Steps

1. Determine scope: if a directory, glob for all `.mdx` files; if a file, glob the parent pillar for comparison targets
2. For each file: read content, extract paragraphs (skip frontmatter, code blocks, headings)
3. Normalize each paragraph into a word bag
4. Compare all pairs using Jaccard similarity (optimize: skip pairs from the same file)
5. Group duplicates transitively
6. For each group: identify recommended source of truth
7. Output the report sorted by similarity (highest first)
