# Check Style Skill

Fast style validation focused on AGENTS.md Phase 4 compliance. Perfect for pre-commit checks and quick style verification.

## Usage

```bash
/check-style <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-style docs/modules.mdx`
  - Multiple files: `/check-style docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-style docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Does

This skill runs a fast, focused style check covering AGENTS.md Phase 4 criteria only. It's optimized for speed (~30 seconds per file) and designed for frequent use.

### Phase 4: Style Guide Compliance Checks

1. **Meta Description**
   - Length: 150-160 characters (optimal for SEO)
   - No vague statements
   - Includes relevant keywords

2. **"Why" Section Format**
   - Uses **Bold challenge:** format
   - Contains 3-4 challenge statements
   - Follows with solution paragraph
   - Each challenge is specific and clear

3. **List Introductions**
   - Lists preceded by "the following"
   - Example: "Consider the following approaches:" ✅
   - No bare lists without introduction ❌

4. **Bold Title Format**
   - Section challenges use **Bold:** pattern
   - Examples in bold at start of paragraphs
   - Consistent formatting throughout

5. **Ordered List Numbering**
   - Sequential numbering (1, 2, 3...)
   - No skipped numbers
   - Proper indentation for nested lists

6. **Voice and Tone**
   - Second-person ("you", "your")
   - Active voice preferred
   - No vague pronouns at sentence start
   - Clear subject-verb-object structure

7. **Heading Capitalization**
   - Sentence case (not Title Case)
   - Examples:
     - ✅ "Version control best practices"
     - ❌ "Version Control Best Practices"

8. **Code Example Summaries**
   - Each code block has 1-2 sentence summary
   - Summary explains purpose and outcome
   - Located before or after code block

9. **Workflow References**
   - Clear connections to related workflows
   - References in body text, not just resources section
   - Explicit "before/after this" language

10. **Pronoun Clarity**
    - No sentences starting with "This", "It", "They" without clear antecedent
    - Specific nouns used instead
    - Example:
      - ❌ "This improves security"
      - ✅ "Version control improves security"

## Examples

### Quick style check before commit
```bash
/check-style docs/modules.mdx
```
Reports style issues in ~30 seconds.

### Check and auto-fix style issues
```bash
/check-style docs/**/*.mdx --fix
```
Fixes common style issues automatically.

### Pre-commit hook usage
```bash
# Check only modified files
/check-style $(git diff --name-only --cached | grep '\.mdx$')
```

### Multiple file check
```bash
/check-style docs/file1.mdx docs/file2.mdx docs/file3.mdx --report-only
```

### Section-wide style validation
```bash
/check-style docs/define/*.mdx --fix
```

## Output Format

```
Style Check Report
==================

Files Checked: 3
Issues Found: 12 (8 auto-fixable)

---

docs/modules.mdx
================

Meta Description
----------------
⚠️ Line 3: Description is 142 characters (target: 150-160)
   Current: "Learn about infrastructure modules and reusable code patterns."
   💡 Add more keywords: "terraform", "workflows", "components"

Why Section
-----------
✅ Uses **Bold challenge:** format
❌ Only 2 challenges found (target: 3-4)
   💡 Add challenges about scalability or team collaboration

Lists
-----
✅ Line 45: "Consider the following approaches:" (correct)
❌ Line 78: Bare list without "the following" introduction
   [AUTO-FIX AVAILABLE]

Voice and Tone
--------------
❌ Line 23: Sentence starts with "This" - unclear antecedent
   Current: "This improves security across environments."
   💡 Replace with: "Module versioning improves security..."
   [AUTO-FIX AVAILABLE]

❌ Line 56: Passive voice detected
   Current: "The configuration is managed by Terraform."
   💡 Rewrite: "Terraform manages the configuration."

Headings
--------
❌ Line 89: "Version Control Best Practices" uses Title Case
   Should be: "Version control best practices"
   [AUTO-FIX AVAILABLE]

---

Auto-fixable Issues: 8
Manual Review Required: 4

Run with --fix to apply automatic corrections.
```

## Auto-fixable Issues

These issues can be fixed automatically with `--fix` flag:

✅ **List introductions**
- Adds "the following" before bare lists

✅ **Heading capitalization**
- Converts to sentence case

✅ **Ordered list numbering**
- Renumbers sequential lists

✅ **Meta description placement**
- Ensures proper frontmatter format

✅ **Bold formatting**
- Fixes **Bold:** patterns in Why sections

## Manual Review Required

These issues require human judgment:

⚠️ **Meta description content**
- Length adjustments
- Keyword improvements
- Clarity enhancements

⚠️ **Voice and tone**
- Passive to active voice conversions
- Pronoun clarity improvements
- Second-person consistency

⚠️ **Code example summaries**
- Adding missing summaries
- Improving existing summaries

⚠️ **Workflow connections**
- Adding missing references
- Clarifying relationships

## Best Practices

**Pre-commit workflow:**
```bash
# 1. Check style
/check-style docs/modified-file.mdx

# 2. Auto-fix simple issues
/check-style docs/modified-file.mdx --fix

# 3. Review remaining issues
# (Manual fixes)

# 4. Verify fixes
/check-style docs/modified-file.mdx
```

**Fast iteration:**
```bash
# Quick check during writing
/check-style docs/draft.mdx

# Fix and continue
/check-style docs/draft.mdx --fix
```

**CI/CD integration:**
```bash
# Fail on style issues
/check-style docs/**/*.mdx || exit 1
```

## Integration with Other Skills

**Complete documentation workflow:**
```bash
# 1. Create doc
/create-doc docs/new.mdx --interactive

# 2. Write content (manual)

# 3. Quick style check
/check-style docs/new.mdx --fix

# 4. Add resources
/add-resources docs/new.mdx --add

# 5. Comprehensive review
/review docs/new.mdx --phases 1-3
```

**Style-focused workflow:**
```bash
# 1. Style check
/check-style docs/file.mdx --report-only

# 2. Auto-fix what's possible
/check-style docs/file.mdx --fix

# 3. SEO optimization
/seo-optimize docs/file.mdx --fix

# 4. Final validation
/review docs/file.mdx --phases 4-5
```

## Common Style Issues

**Meta descriptions:**
```yaml
# Too short (142 chars)
❌ description: "Learn about modules and code reuse."

# Just right (156 chars)
✅ description: "Learn how infrastructure modules enable code reuse, improve consistency, and accelerate development across teams and environments."
```

**Why section:**
```markdown
# Missing format
❌ Why

Teams struggle with code duplication.

# Correct format
✅ Why

**Bold challenge:** Teams duplicate infrastructure code across projects.

**Bold challenge:** Inconsistent configurations lead to environment drift.

**Bold challenge:** Manual processes slow down deployment cycles.

Reusable modules address these challenges...
```

**List introductions:**
```markdown
# Missing introduction
❌ - Module versioning
- Code organization
- Testing strategies

# With introduction
✅ Consider the following best practices:
- Module versioning
- Code organization
- Testing strategies
```

**Pronoun clarity:**
```markdown
# Unclear
❌ This improves security and reduces errors.

# Clear
✅ Module versioning improves security and reduces errors.
```

## Performance

Typical execution times:
- Single file: ~30 seconds
- 5 files: ~2 minutes
- 20 files: ~10 minutes

Much faster than full `/review` (which runs all 7 phases).

## When to Use This Skill

Use `/check-style` when:
- ✅ Writing new documentation (frequent checks)
- ✅ Before committing changes (pre-commit hook)
- ✅ Quick style validation needed
- ✅ Auto-fixing simple formatting issues
- ✅ CI/CD fast-fail checks

Don't use `/check-style` when:
- ❌ Need comprehensive review (use `/review` instead)
- ❌ Checking technical accuracy (use `/review --phases 2`)
- ❌ Validating cross-references (use `/fix-links`)
- ❌ Need user success evaluation (use `/review --phases 1`)

## Reference Files

This skill references:
- **`AGENTS.md`** - Phase 4 style guide criteria
- **`styleguide.md`** - HashiCorp style guide

## Notes

- Focuses exclusively on Phase 4 (style compliance)
- Does not check content accuracy or completeness
- Optimized for speed over comprehensiveness
- Use `/review` for thorough validation
- Reports include line numbers for easy navigation
- Auto-fixes are safe and reversible
