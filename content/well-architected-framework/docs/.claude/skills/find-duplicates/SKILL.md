---
name: find-duplicates
description: Detect duplicate or near-duplicate content across WAF documents. Identifies consolidation opportunities and maintains DRY principle.
argument-hint: <directory-path> [--threshold]
disable-model-invocation: true
---

# Find Duplicates Skill

Detects duplicate and near-duplicate content across WAF documentation. Helps maintain DRY (Don't Repeat Yourself) principle and identifies consolidation opportunities.

## Usage

```bash
/find-duplicates <directory-path> [options]
```

## Arguments

- **directory-path**: Directory to scan for duplicates (required)
  - Single directory: `/find-duplicates docs/define/`
  - Entire docs: `/find-duplicates docs/`
  - Specific section: `/find-duplicates docs/secure-systems/`

- **--threshold** or **-t**: Similarity threshold (0-100, default: 80)
  - 100 = exact match only
  - 80 = high similarity (default)
  - 60 = moderate similarity
  - Example: `--threshold 90`

- **--min-length**: Minimum text length to check (default: 100 characters)
  - Ignores short snippets
  - Example: `--min-length 200`

- **--type**: Type of content to check (default: all)
  - Values: `paragraphs`, `sections`, `code`, `lists`, `all`
  - Example: `--type paragraphs`

- **--suggest-links**: Suggest where to link instead of duplicate
- **--report-only**: Generate report without suggestions

## What This Skill Checks

### 1. **Duplicate Paragraphs**

**Rule:** Same or very similar paragraphs across documents

**Example:**
```
File A (docs/define/modules.mdx):
"Infrastructure modules enable teams to create reusable components 
that improve consistency and accelerate deployment across environments."

File B (docs/define/workflows.mdx):
"Infrastructure modules enable teams to create reusable components 
that improve consistency and accelerate deployment across environments."

Similarity: 100% (exact match)
```

**Recommendation:** Keep in one place, link from the other

---

### 2. **Similar Sections**

**Rule:** Sections covering the same topic with similar content

**Example:**
```
File A: ## Why use modules
File B: ## Benefits of modules

Content similarity: 85%
```

**Recommendation:** Consolidate into single authoritative section

---

### 3. **Duplicate Code Examples**

**Rule:** Same or very similar code blocks

**Example:**
```
File A:
```hcl
terraform {
  backend "remote" {
    organization = "my-org"
  }
}
```

File B:
```hcl
terraform {
  backend "remote" {
    organization = "my-org"
  }
}
```

Similarity: 100%
```

**Recommendation:** Extract to shared example or link to canonical location

---

### 4. **Repeated Lists**

**Rule:** Same list items appearing in multiple documents

**Example:**
```
File A:
- Version control
- Code review
- Automated testing

File B:
- Version control
- Code review  
- Automated testing

Similarity: 100%
```

**Recommendation:** Create single source, reference from both

---

### 5. **Near-Duplicate Content**

**Rule:** Content that's similar but not identical (paraphrased)

**Example:**
```
File A: "Modules reduce code duplication and improve consistency"
File B: "Using modules eliminates duplicate code and ensures consistency"

Similarity: 75% (semantic similarity)
```

**Recommendation:** Decide on canonical version, link to it

---

### 6. **Strategic Duplication**

**Rule:** Some duplication is intentional and valuable

**Acceptable duplication:**
- Different perspectives for different personas
- Context-specific examples
- Introductory summaries
- Cross-references with brief context

**Not flagged when:**
- Content serves different purpose
- Different technical level (beginner vs advanced)
- Different tool context (Terraform vs Packer)

---

## Output Format

```
Duplicate Content Report
========================

Directory: docs/
Files Scanned: 47
Duplicates Found: 12 groups
Potential Savings: ~2,400 words

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GROUP 1: Exact Duplicate Paragraphs (100% match)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Content (156 characters):
"Infrastructure modules enable teams to create reusable components 
that improve consistency and accelerate deployment across environments."

Found in 3 files:
  📄 docs/define/modules.mdx (line 23)
  📄 docs/define/workflows.mdx (line 45)
  📄 docs/define/standardize-workflows.mdx (line 67)

💡 RECOMMENDATION:
  Keep in: docs/define/modules.mdx (most comprehensive)
  Replace in others with:
    "After [creating infrastructure modules](./modules.mdx), 
    integrate them into your workflows..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GROUP 2: Similar Sections (87% match)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Section: "Why use version control"

File A: docs/define/version-control.mdx (lines 34-56)
  - 4 challenges listed
  - 280 words
  - Comprehensive coverage

File B: docs/define/workflows.mdx (lines 89-102)
  - 3 challenges listed
  - 180 words
  - Subset of File A content

Similarity: 87% (File B is subset of File A)

💡 RECOMMENDATION:
  Keep comprehensive version in: docs/define/version-control.mdx
  Replace in workflows.mdx with:
    "Version control provides [several benefits](./version-control.mdx#why-use-version-control) 
    including change tracking, collaboration, and rollback capabilities."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GROUP 3: Duplicate Code Examples (100% match)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Code Block (12 lines):
```hcl
terraform {
  backend "remote" {
    organization = "my-org"
    workspaces {
      name = "production"
    }
  }
}
```

Found in 4 files:
  📄 docs/define/infrastructure.mdx (line 145)
  📄 docs/define/workflows.mdx (line 234)
  📄 docs/automate/cicd.mdx (line 89)
  📄 docs/deploy/atomic-deployments.mdx (line 167)

💡 RECOMMENDATION:
  Create canonical example in: docs/define/infrastructure.mdx
  Link from others:
    "Configure [remote state backend](./infrastructure.mdx#remote-state) 
    to enable team collaboration."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GROUP 4: Repeated List (100% match)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

List Items:
- Version control for infrastructure code
- Automated testing and validation
- Code review processes
- Continuous integration pipelines

Found in 3 files:
  📄 docs/define/workflows.mdx (line 78)
  📄 docs/automate/cicd.mdx (line 45)
  📄 docs/build-culture/workflows-not-technologies.mdx (line 123)

💡 RECOMMENDATION:
  Keep detailed list in: docs/define/workflows.mdx
  Reference from others with context

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRATEGIC DUPLICATION (Not Flagged)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Different perspectives (decision-maker vs implementer):
  - docs/define/modules.mdx (strategic overview)
  - docs/define/as-code/infrastructure.mdx (implementation details)

✅ Different tool contexts:
  - docs/automate/packaging.mdx (Packer focus)
  - docs/deploy/atomic-deployments.mdx (deployment focus)

✅ Introductory summaries:
  - Brief context in cross-references (acceptable)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Duplicate Groups: 12
  ├─ Exact duplicates: 5 groups
  ├─ High similarity (>85%): 4 groups
  └─ Moderate similarity (70-85%): 3 groups

Affected Files: 23
Potential Word Savings: ~2,400 words
Estimated Consolidation Time: 4-6 hours

Priority Actions:
1. 🔴 High: Consolidate exact duplicate paragraphs (5 groups)
2. 🟡 Medium: Review similar sections (4 groups)
3. 🟢 Low: Consider code example consolidation (3 groups)

Next Steps:
1. Review recommendations
2. Decide on canonical locations
3. Update documents with links
4. Run /validate-links to verify
```

## Consolidation Strategies

### Strategy 1: Link to Canonical Source

**Before (Duplicate):**
```markdown
## Why use modules

**Reduce code duplication:** Teams copy infrastructure code...
**Eliminate configuration drift:** Manual configuration steps...
**Accelerate deployment cycles:** Writing infrastructure from scratch...
```

**After (Link):**
```markdown
Infrastructure [modules](./modules.mdx#why-use-modules) reduce code 
duplication, eliminate configuration drift, and accelerate deployment cycles.
```

---

### Strategy 2: Extract to Shared Section

**Before (Duplicated in 3 files):**
```markdown
Configure remote state:
```hcl
terraform {
  backend "remote" { ... }
}
```
```

**After (Canonical location):**
Create: `docs/define/remote-state.mdx`
Link from all 3 files:
```markdown
Configure [remote state](./remote-state.mdx) to enable team collaboration.
```

---

### Strategy 3: Brief Context + Link

**Before (Full duplication):**
```markdown
Version control provides several benefits:
- Change tracking
- Collaboration
- Rollback capabilities
- Audit trails
```

**After (Brief + link):**
```markdown
[Version control](./version-control.mdx) provides change tracking, 
collaboration, and rollback capabilities.
```

---

## Examples

### Find duplicates in entire docs
```bash
/find-duplicates docs/
```

### High similarity threshold (stricter)
```bash
/find-duplicates docs/ --threshold 90
```

### Check specific section
```bash
/find-duplicates docs/define/ --threshold 80
```

### Check only paragraphs
```bash
/find-duplicates docs/ --type paragraphs
```

### Get consolidation suggestions
```bash
/find-duplicates docs/ --suggest-links
```

## Integration with Other Skills

**Consolidation workflow:**
```bash
# 1. Find duplicates
/find-duplicates docs/

# 2. Review recommendations
# (Manual review)

# 3. Update documents
# (Manual edits)

# 4. Validate links
/validate-links docs/**/*.mdx --fix

# 5. Check cross-references
/cross-reference docs/**/*.mdx
```

**Quality improvement sprint:**
```bash
# Find and fix duplicates
/find-duplicates docs/ --suggest-links

# Check consistency after changes
/check-consistency docs/

# Validate all links
/validate-links docs/**/*.mdx
```

## When to Use This Skill

Use `/find-duplicates` when:
- ✅ Quarterly documentation audits
- ✅ After major content additions
- ✅ Before documentation releases
- ✅ Consolidating related documents
- ✅ Improving documentation maintainability
- ✅ Reducing documentation size

Don't use when:
- ❌ Strategic duplication is intentional
- ❌ Content serves different personas
- ❌ Different technical contexts require repetition

## Performance

Typical execution times:
- Small section (10 files): ~30 seconds
- Medium section (30 files): ~2 minutes
- Entire docs (50+ files): ~5 minutes

**Note:** Semantic similarity analysis is slower than exact matching.

## Reference

This skill supports:
- **AGENTS.md** - Content strategy (avoid duplication)
- **AGENTS.md** - Link to existing documents instead of duplicating

## Best Practices

**Quarterly audit:**
```bash
# Full duplicate scan
/find-duplicates docs/ --threshold 80 --suggest-links
```

**After major additions:**
```bash
# Check new section for duplicates
/find-duplicates docs/new-section/
```

**Before release:**
```bash
# Ensure no unnecessary duplication
/find-duplicates docs/ --threshold 85
```

## Notes

- Exact matches are always flagged
- Semantic similarity uses content analysis
- Strategic duplication is identified and not flagged
- Recommendations prioritize canonical sources
- Consolidation improves maintainability
- Links maintain information accessibility
- Reduces documentation maintenance burden
- Compatible with WAF documentation standards