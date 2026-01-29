# `/review` Skill Examples

Real-world examples of using the documentation review skill.

## Common Workflows

### 1. Creating New Documentation

**Workflow:**
```bash
# Step 1: Write your document following ../../templates/doc-templates/DOCUMENT_TEMPLATE.md

# Step 2: Run phases 1-3 to validate content
/review docs/my-new-doc.mdx --phases 1-3

# Step 3: Address critical content gaps identified

# Step 4: Run full review
/review docs/my-new-doc.mdx --report-only

# Step 5: Implement fixes
/review docs/my-new-doc.mdx --fix
```

**Why this order:**
- Phases 1-3 validate content before worrying about style
- Fixing content first prevents wasted effort on formatting
- `--report-only` lets you review recommendations before applying

---

### 2. Updating Existing Documentation

**Workflow:**
```bash
# Step 1: Make your content changes

# Step 2: Full review to catch any issues
/review docs/updated-doc.mdx

# Step 3: Review the findings

# Step 4: Auto-fix style issues
/review docs/updated-doc.mdx --phases 4-6 --fix

# Step 5: Final user success check
/review docs/updated-doc.mdx --phases 7
```

**Why this approach:**
- Full review identifies all issues at once
- Auto-fix handles mechanical style issues
- Manual Phase 7 check ensures user success

---

### 3. Bulk Documentation Audit

**Workflow:**
```bash
# Review all documents in a section
/review docs/define-and-automate-processes/define/*.mdx --report-only

# Identify high-priority issues across documents

# Fix documents one at a time
/review docs/define-and-automate-processes/define/modules.mdx --fix
/review docs/define-and-automate-processes/define/workflows.mdx --fix
# ... continue with each document
```

**Why one-at-a-time fixes:**
- Easier to review changes per document
- Prevents overwhelming number of changes
- Allows testing between fixes

---

### 4. Pre-Commit Validation

**Workflow:**
```bash
# Before committing, review modified files
/review docs/file-i-changed.mdx --phases 4,5,6 --fix

# Quick style, SEO, and link quality check
# Auto-fixes common issues
# Commit with confidence
```

**Why phases 4-6:**
- Fast mechanical checks (< 1 min)
- Auto-fixable issues
- Catches common mistakes before review

---

### 5. SEO Optimization Pass

**Workflow:**
```bash
# Run SEO-specific review
/review docs/section/*.mdx --phases 5

# Review SEO recommendations
# - Meta description length
# - Title optimization
# - Link descriptions
# - Keyword placement

# Implement SEO fixes
/review docs/section/*.mdx --phases 5 --fix
```

**Why Phase 5 only:**
- Focused on search/AI optimization
- Doesn't check unrelated issues
- Targeted improvements

---

### 6. Cross-Reference Check

**Workflow:**
```bash
# After restructuring docs, verify cross-references
/review docs/**/*.mdx --phases 3

# Identifies:
# - Broken internal links
# - Missing cross-references
# - Orphaned documents
# - Unclear workflow progression
```

**Why Phase 3 only:**
- Validates document relationships
- Essential after reorganization
- Ensures navigation works

---

### 7. Final Pre-Release Check

**Workflow:**
```bash
# Before releasing documentation updates

# Run full review on all modified docs
/review docs/file1.mdx docs/file2.mdx docs/file3.mdx

# Review findings report carefully

# Fix critical issues manually
# (Phase 1, 2, 3 issues usually need human judgment)

# Auto-fix style issues
/review docs/file1.mdx docs/file2.mdx docs/file3.mdx --phases 4-6 --fix

# Final validation
/review docs/file1.mdx docs/file2.mdx docs/file3.mdx --phases 7

# If Phase 7 passes (8+/10 scores), ready to release
```

**Why this approach:**
- Comprehensive validation
- Human review of critical issues
- Automation for mechanical fixes
- Final user success check

---

## Phase Combinations by Use Case

### Quick Style Check (Before Commit)
```bash
/review docs/file.mdx --phases 4
```
- Meta descriptions
- Formatting rules
- Voice and tone
- ~30 seconds

### Content Validation (New Docs)
```bash
/review docs/file.mdx --phases 1,2,3
```
- User success
- Technical accuracy
- Cross-references
- ~2 minutes

### Polish Pass (Pre-Release)
```bash
/review docs/file.mdx --phases 4-7 --fix
```
- Style compliance
- SEO optimization
- Link quality
- Final user check
- ~3 minutes

### Full Comprehensive Review
```bash
/review docs/file.mdx --fix
```
- All 7 phases
- Automatic fixes
- Complete validation
- ~5 minutes

---

## Understanding Review Scores

### 9-10/10: Excellent
```
✅ Serves both personas (decision-makers and implementers)
✅ Complete, working code examples
✅ Proper formatting and style
✅ Strong cross-references
✅ SEO optimized
✅ 5+ quality resource links
```

**Action:** Minimal or no changes needed

---

### 7-8/10: Good
```
✅ Mostly serves both personas
✅ Has code examples
⚠️ Minor formatting issues
⚠️ Could use more resources
⚠️ SEO could be improved
```

**Action:** Run phases 4-6 with `--fix` for quick improvements

---

### 5-6/10: Needs Work
```
⚠️ Missing examples or insufficient depth
⚠️ One persona not well-served
⚠️ Multiple formatting issues
⚠️ Weak resource section
```

**Action:** Address content gaps manually, then run full review with `--fix`

---

### 3-4/10: Poor
```
❌ Critical content gaps
❌ Insufficient for implementers
❌ Missing or broken examples
❌ Severe formatting issues
```

**Action:** Major rewrite needed. Focus on Phase 1-3 issues first.

---

### 1-2/10: Critical Issues
```
❌ Major content missing
❌ Broken or no examples
❌ Doesn't serve either persona
❌ Severe technical errors
```

**Action:** Complete rewrite required using ../../templates/doc-templates/DOCUMENT_TEMPLATE.md

---

## Interpreting Findings

### 🔴 Critical (High Priority)

**Example Finding:**
```
🔴 CRITICAL - Phase 1: User Success
Document missing code examples. Implementers cannot visualize implementation.

Recommendation: Add 2-3 code examples showing:
1. Basic configuration
2. Advanced use case
3. Integration with other tools
```

**Action Required:**
- Must fix before release
- Blocks user success
- High impact on quality score

---

### 🟡 Moderate (Medium Priority)

**Example Finding:**
```
🟡 MODERATE - Phase 5: SEO
Meta description is 128 chars (should be 150-160).

Recommendation: Extend to:
"Create reusable Terraform modules to standardize infrastructure,
enforce security policies across teams, and accelerate deployment
while reducing duplication."
```

**Action Required:**
- Should fix before release
- Improves discoverability
- Moderate impact on quality score

---

### 🟢 Minor (Polish)

**Example Finding:**
```
🟢 MINOR - Phase 4: Style
Line 45: "Follow the following" should be "Use the following"

Recommendation: Change to "Use the following best practices:"
```

**Action Required:**
- Nice to fix
- Improves polish
- Minimal impact on quality score
- Often auto-fixed with `--fix`

---

## Tips and Tricks

### Save Time with Targeted Reviews

Don't always run all 7 phases. Match phases to your needs:

| Scenario | Phases | Why |
|----------|--------|-----|
| New doc draft | 1-3 | Validate content first |
| Style cleanup | 4 | Fast formatting fixes |
| SEO pass | 5 | Focused optimization |
| Pre-commit | 4,6 | Quick mechanical checks |
| Final check | 7 | User success validation |
| Full review | 1-7 | Comprehensive |

---

### Use Report Mode First

Always run `--report-only` on important docs before `--fix`:

```bash
# See what would change
/review docs/important-doc.mdx --report-only

# Review recommendations carefully

# Then apply fixes
/review docs/important-doc.mdx --fix
```

---

### Batch Similar Documents

Review similar documents together for consistency:

```bash
# All "as-code" subsection docs
/review docs/define-and-automate-processes/define/as-code/*.mdx

# All module-related docs
/review docs/**/modules.mdx
```

---

### Track Quality Over Time

Use review scores to track documentation quality:

```bash
# Initial audit
/review docs/**/*.mdx > audit-2024-01.txt

# After improvements
/review docs/**/*.mdx > audit-2024-02.txt

# Compare scores to measure improvement
```

---

## Integration Examples

### Git Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Get modified .mdx files
MODIFIED=$(git diff --cached --name-only --diff-filter=ACM | grep '\.mdx$')

if [ -n "$MODIFIED" ]; then
  echo "Reviewing modified documentation..."

  # Run quick style check
  /review $MODIFIED --phases 4

  if [ $? -ne 0 ]; then
    echo "Documentation review failed. Fix issues before committing."
    exit 1
  fi
fi
```

---

### CI/CD Pipeline

```yaml
# .github/workflows/docs-review.yml
name: Documentation Review

on:
  pull_request:
    paths:
      - 'docs/**/*.mdx'

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Review Documentation
        run: |
          # Review all modified docs
          /review docs/**/*.mdx --report-only > review-report.txt

          # Post report to PR
          gh pr comment ${{ github.event.pull_request.number }} \
            --body-file review-report.txt
```

---

## Troubleshooting

### "No issues found but score is low"

**Cause:** Score is based on completeness, not just absence of errors.

**Fix:** Check for:
- Missing code examples (Phase 1)
- Insufficient resources (Phase 6)
- Weak cross-references (Phase 3)

---

### "Auto-fix changed formatting unexpectedly"

**Cause:** Document had non-standard formatting that was corrected to match AGENTS.md.

**Fix:**
- Review AGENTS.md standards
- Understand why change was made
- Update original if needed
- Re-run review

---

### "Review takes too long"

**Cause:** Reviewing many large documents at once.

**Fix:**
- Review documents individually
- Use specific phases for quick checks
- Review only modified files in CI/CD

---

## Advanced Usage

### Custom Phase Sequences

Create workflows for specific quality goals:

**Content Quality Focus:**
```bash
# Phases 1, 2, 7 - Content validation only
/review docs/*.mdx --phases 1,2,7
```

**Discoverability Focus:**
```bash
# Phases 5, 6 - SEO and links only
/review docs/*.mdx --phases 5,6 --fix
```

**Formatting Focus:**
```bash
# Phase 4 only - Pure style compliance
/review docs/*.mdx --phases 4 --fix
```

---

### Combining with Other Tools

**With grep for targeted reviews:**
```bash
# Find docs mentioning "Terraform" and review them
grep -l "Terraform" docs/**/*.mdx | xargs /review --phases 1-3
```

**With find for selective reviews:**
```bash
# Review only recently modified docs
find docs -name "*.mdx" -mtime -7 | xargs /review
```

---

## Need Help?

All documentation files are in the templates/ directory:

- **Skill documentation:** `.claude/skills/review.md` (this file's parent directory)
- **Writing standards:** `AGENTS.md`
- **Review process:** `REVIEW_PHASES.md`
- **Document template:** `../../templates/doc-templates/DOCUMENT_TEMPLATE.md`
