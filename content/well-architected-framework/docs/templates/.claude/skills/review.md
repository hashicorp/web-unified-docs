# Documentation Review Skill

Performs comprehensive 7-phase documentation review following the REVIEW_PHASES.md workflow and AGENTS.md standards.

## Usage

```bash
/review <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to review (required)
  - Single file: `/review docs/modules.mdx`
  - Multiple files: `/review docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/review docs/**/*.mdx`

- **--phases** or **-p**: Specific phases to run (default: all)
  - Example: `--phases 1-3` or `--phases 4,5,7`

- **--fix** or **-f**: Implement fixes automatically (default: false)
  - Without flag: Generate review report only
  - With flag: Generate report and implement fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Does

This skill automates the comprehensive documentation review process defined in `REVIEW_PHASES.md`, applying standards from `AGENTS.md`.

### Review Process

**Phase 1: User Success Evaluation** (PRIORITY)
- Ensures users understand the problem/solution
- Validates representative code examples exist
- Confirms resources for implementation are provided
- Checks both decision-maker and implementer personas are served

**Phase 2: Technical Accuracy & Fact-Checking**
- Verifies code examples are syntactically correct
- Checks version numbers for tools/providers
- Validates no deprecated patterns are used
- Ensures configuration examples work

**Phase 3: Cross-Document Relationships**
- Checks related documents reference each other
- Validates HashiCorp Resources sections have cross-links
- Ensures workflow progression is clear
- Identifies orphaned documents

**Phase 4: AGENTS.md Style Guide Compliance**
- Meta descriptions are 150-160 characters
- "Why" sections use **Bold challenge:** format with 3-4 challenges
- Workflow connections in body text
- Code examples have 1-2 sentence summaries
- No vague pronouns at sentence start
- Lists use "the following" introduction
- Heading capitalization follows sentence case
- Second-person voice, active voice

**Phase 5: SEO & AI/LLM Optimization**
- Reviews against AGENTS.md SEO section criteria
- Optimizes meta descriptions and titles
- Enhances link descriptions
- Improves section structure for AI retrieval
- Adds explicit relationship statements

**Phase 6: Link Quality & Balance**
- Verifies link descriptions with action verbs and outcomes
- Ensures balance between beginner and advanced links
- Checks 5+ HashiCorp resource links exist
- Validates link organization

**Phase 7: Final User Success Check**
- Steps back from checklist to ask: "Would a user succeed?"
- Validates decision-makers can understand strategic value
- Validates implementers have actionable guidance
- Confirms examples work and are adaptable

### Output Format

The skill generates a structured review report with:

1. **Executive Summary**
   - Overall quality score (1-10) per document
   - High-priority issues count
   - Documents reviewed

2. **Phase-by-Phase Findings**
   - Issues organized by phase
   - Severity: 🔴 Critical, 🟡 Moderate, 🟢 Minor
   - Specific line numbers and recommendations

3. **Prioritized Action Items**
   - Phase 1 (High Impact) fixes
   - Phase 2 (Medium Impact) improvements
   - Phase 3 (Polish) suggestions

4. **Implemented Fixes** (if `--fix` flag used)
   - List of all changes made
   - Files modified
   - Before/after comparisons for major changes

## Examples

### Full review with automated fixes
```bash
/review docs/define-and-automate-processes/define/modules.mdx --fix
```
Runs all 7 phases and implements recommended fixes automatically.

### Review specific phases only
```bash
/review docs/**/*.mdx --phases 1-3
```
Runs only phases 1, 2, and 3 (user success, technical accuracy, cross-references).

### Review without making changes
```bash
/review docs/workflows.mdx --report-only
```
Generates review report but makes no file modifications.

### Style and SEO check only
```bash
/review docs/*.mdx --phases 4-6
```
Runs style guide compliance, SEO optimization, and link quality checks.

### Multiple files with fixes
```bash
/review docs/file1.mdx docs/file2.mdx docs/file3.mdx --fix
```
Reviews multiple files and implements fixes across all of them.

## Reference Files

This skill references the following WAF documentation standards (in the templates/ directory):

- **`AGENTS.md`**
  - Writing standards and style guide
  - Document structure patterns
  - Code example patterns
  - SEO and AI/LLM optimization criteria
  - HashiCorp Resources section patterns

- **`REVIEW_PHASES.md`**
  - 7-phase review workflow
  - Review questions for each phase
  - Deliverable expectations
  - Usage instructions

## How to Customize

The skill behavior is controlled by the reference files above. To customize:

1. **Update standards**: Edit `AGENTS.md`
2. **Modify review process**: Edit `REVIEW_PHASES.md`
3. **Skill automatically uses latest versions** of both files

No skill code changes needed for standard updates.

## Best Practices

**For new documentation:**
- Run phases 1-3 first to validate content
- Address critical gaps before running phases 4-7
- Use `--fix` for style compliance (phases 4-6)

**For existing documentation:**
- Run full review (all phases) first time
- Generate report to prioritize fixes
- Run with `--fix` after reviewing recommendations

**For quick checks:**
- Use `--phases 4` for style-only validation
- Use `--phases 5` for SEO optimization
- Use `--phases 7` for final user success validation

## Quality Scores

Documents receive scores based on:

- **9-10/10**: Excellent - Serves both personas well, complete examples, proper formatting
- **7-8/10**: Good - Minor improvements needed, mostly serves both personas
- **5-6/10**: Needs work - Missing examples or significant gaps for one persona
- **3-4/10**: Poor - Insufficient for implementers or missing critical elements
- **1-2/10**: Critical - Major content gaps, broken examples, or severe formatting issues

## When to Use This Skill

Use `/review` when:
- Creating new documentation (validate before publishing)
- Updating existing documentation (ensure consistency)
- Running periodic quality checks (maintain standards)
- Preparing documentation for release (final validation)
- Training new documentation contributors (show standards in action)

## Integration with Workflows

This skill integrates with documentation workflows:

1. **Pre-commit hook**: Run `/review` on modified files before commit
2. **PR validation**: Include review report in pull request description
3. **CI/CD**: Automate review in documentation pipelines
4. **Periodic audits**: Schedule reviews across documentation sets

## Notes

- The skill uses current conversation context for cross-document analysis
- Fixes follow AGENTS.md standards exactly as written
- Review findings are deterministic - same input produces same output
- Token-efficient: Loads reference files once per invocation
