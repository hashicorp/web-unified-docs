# Document Review Workflow Guide

**Your step-by-step guide to reviewing WAF documentation from draft to publishable**

This guide shows you exactly what to do, in what order, using which tools (Claude skills, automation, or manual review) to get a document from draft to ready-for-publication.

---

## Quick Reference

**Choose your workflow:**
- [New Document (from scratch)](#workflow-1-new-document-creation) - ~90 minutes
- [Major Content Revision](#workflow-2-major-content-revision) - ~60 minutes
- [Minor Updates/Fixes](#workflow-3-minor-updates-and-fixes) - ~15 minutes
- [Pre-Commit Quick Check](#workflow-4-pre-commit-quick-check) - ~3 minutes
- [Quarterly Maintenance](#workflow-5-quarterly-maintenance-review) - ~45 minutes per doc

**Key files to know:**
- **AGENTS.md** - Writing standards and patterns (what good docs look like)
- **REVIEW_PHASES.md** - Phase-based review process (how to review)
- **QUICK_REFERENCE.md** - Quick patterns and troubleshooting
- **This file** - Sequential workflows (what to do when)

---

## Workflow 1: New Document Creation

**When:** Creating a brand new WAF document
**Total time:** ~90 minutes
**Skills needed:** High technical knowledge + documentation standards

### Phase 1: Draft the content (40 minutes)

**Tools:** `/create-doc` skill + manual writing

1. **Create document structure** (5 min)
   ```bash
   /create-doc docs/section/new-topic.mdx --interactive
   ```
   - Answer prompts for document type, personas, etc.
   - Creates document with proper frontmatter and structure

2. **Write core content** (30 min) - *MANUAL*
   - Introduction (2-3 paragraphs explaining the topic)
   - "Why [topic]" section with 3-4 **Bold challenge:** items
   - Implementation guidance sections
   - Add code examples if this is an implementation guide

3. **Quick structure check** (5 min)
   ```bash
   /check-structure docs/section/new-topic.mdx
   ```
   - Ensures basic structure is correct
   - Fix any obvious formatting issues

### Phase 2: Content quality check (25 minutes)

**Tools:** Automated skills + manual review

4. **Check code examples** (10 min)
   ```bash
   /check-code-examples docs/section/new-topic.mdx
   ```
   - If this is an implementation guide with code
   - Verify examples are complete (not empty templates)
   - Add summaries after code blocks if missing
   - *Manual fix required* - Review and enhance based on output

5. **Add HashiCorp resources** (10 min)
   ```bash
   /add-resources docs/section/new-topic.mdx
   ```
   - Automatically suggests relevant resources
   - *Manual review* - Verify suggestions fit the document
   - Ensure 5-8+ links total
   - Check organization (beginner → advanced)

6. **Add cross-references** (5 min)
   ```bash
   /smart-cross-reference docs/section/new-topic.mdx
   ```
   - Identifies related WAF documents
   - Suggests workflow connections
   - *Manual* - Add explicit workflow links in body text

### Phase 3: Style and formatting (15 minutes)

**Tools:** Automated fixes

7. **Fix structure issues** (3 min)
   ```bash
   /check-structure docs/section/new-topic.mdx --fix
   ```
   - Auto-fixes: Vague pronouns, heading case, list intros
   - Review the diff to understand changes

8. **Apply HashiCorp style guide** (5 min)
   ```bash
   /check-hashicorp-style docs/section/new-topic.mdx --fix
   ```
   - Auto-fixes: Voice, tense, word choice, abbreviations
   - Review changes - learn from corrections

9. **Fix resource formatting** (2 min)
   ```bash
   /check-resources docs/section/new-topic.mdx --fix
   ```
   - Auto-fixes: Verb placement, link descriptions
   - Ensures proper formatting

10. **Check terminology consistency** (5 min)
    ```bash
    /check-consistency docs/section/new-topic.mdx
    ```
    - Identifies inconsistent terminology
    - *Manual fix* - Standardize terms across document

### Phase 4: Optimization and validation (10 minutes)

**Tools:** Automated analysis + manual fixes

11. **SEO and AI/LLM optimization** (5 min)
    ```bash
    /seo-optimize docs/section/new-topic.mdx
    ```
    - Checks meta description, title, headings
    - Verifies first paragraph hook
    - *Manual fixes* - Implement recommendations

12. **Persona balance check** (3 min)
    ```bash
    /persona-coverage docs/section/new-topic.mdx
    ```
    - Validates decision-maker (40-50%) vs implementer (50-60%) content
    - If imbalanced, add missing content type

13. **Gap analysis** (2 min)
    ```bash
    /gap-analysis docs/section/new-topic.mdx
    ```
    - Identifies missing concepts or content
    - *Manual* - Fill critical gaps before publishing

### Phase 5: Final validation

**Tools:** Visual review

14. **Visual diff review** (5 min) - *MANUAL*
    ```bash
    git diff docs/section/new-topic.mdx
    ```
    - Review all changes made
    - Verify auto-fixes make sense
    - Check overall flow and readability

15. **Final checklist** (2 min) - *MANUAL*
    - [ ] Frontmatter complete (title, description)
    - [ ] Why section with 3-4 challenges
    - [ ] Code examples complete with summaries (if applicable)
    - [ ] 5-8+ HashiCorp resource links
    - [ ] Document ends: Resources → Next steps
    - [ ] No broken links
    - [ ] Reads naturally

16. **OPTIONAL: Code validation** (Only if needed)
    ```bash
    /code-review docs/section/new-topic.mdx
    ```
    - Run only if document has Terraform/Packer/CLI examples
    - Validates syntax with formatters/linters
    - Time: 10-15 min

**✅ Ready for publication!**

---

## Workflow 2: Major Content Revision

**When:** Significantly updating existing document (adding sections, rewriting, restructuring)
**Total time:** ~60 minutes
**Skills needed:** Moderate technical knowledge + documentation standards

### Phase 1: Assess current state (5 minutes)

1. **Health check** (2 min)
   ```bash
   /doc-health-dashboard
   ```
   - See what issues already exist
   - Prioritize what to fix

2. **Gap analysis** (3 min)
   ```bash
   /gap-analysis docs/existing-doc.mdx
   ```
   - Understand what's missing
   - Plan what to add

### Phase 2: Make content changes (30 minutes) - *MANUAL*

3. **Revise content**
   - Add new sections
   - Update outdated information
   - Enhance existing sections
   - Add/update code examples

### Phase 3: Quality check (15 minutes)

4. **Run full review** (15 min)
   ```bash
   /review-doc docs/existing-doc.mdx --phases 1-7
   ```
   - Comprehensive 7-phase review
   - Generates detailed report
   - *Manual* - Review report and implement fixes

   **OR run phases individually if you want more control:**
   ```bash
   /check-structure docs/existing-doc.mdx --fix
   /check-code-examples docs/existing-doc.mdx
   /add-resources docs/existing-doc.mdx
   /check-hashicorp-style docs/existing-doc.mdx --fix
   /seo-optimize docs/existing-doc.mdx
   /persona-coverage docs/existing-doc.mdx
   ```

### Phase 4: Apply fixes and validate (10 minutes)

5. **Apply automated fixes** (5 min)
   ```bash
   /check-structure docs/existing-doc.mdx --fix
   /check-hashicorp-style docs/existing-doc.mdx --fix
   /check-resources docs/existing-doc.mdx --fix
   ```

6. **Review diff** (5 min) - *MANUAL*
   ```bash
   git diff docs/existing-doc.mdx
   ```
   - Verify all changes
   - Ensure document flows well

**✅ Ready for publication!**

---

## Workflow 3: Minor Updates and Fixes

**When:** Small changes (fixing typos, updating links, tweaking wording)
**Total time:** ~15 minutes
**Skills needed:** Basic documentation standards

### Fast track process

1. **Make your changes** (5 min) - *MANUAL*
   - Fix typos, update links, adjust wording

2. **Quick style check** (3 min)
   ```bash
   /quick-styleguide docs/file.mdx --fix
   ```
   - Faster than full style check
   - Catches common issues

3. **Structure check** (2 min)
   ```bash
   /check-structure docs/file.mdx --fix
   ```
   - Ensures no formatting issues introduced

4. **Visual review** (5 min) - *MANUAL*
   ```bash
   git diff docs/file.mdx
   ```
   - Verify changes look good
   - Check for unintended modifications

**✅ Ready for commit!**

---

## Workflow 4: Pre-Commit Quick Check

**When:** Right before committing any documentation changes
**Total time:** ~3 minutes
**Skills needed:** None (automated)

### Fastest validation

```bash
# Run these three commands in sequence
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
git diff docs/file.mdx
```

**Quick checklist:**
- [ ] Auto-fixes applied
- [ ] Diff looks reasonable
- [ ] No unexpected changes

**✅ Commit with confidence!**

---

## Workflow 5: Quarterly Maintenance Review

**When:** Regular quarterly health check of all documentation
**Total time:** ~45 minutes per document
**Skills needed:** Moderate documentation knowledge

### Systematic health check

1. **Strategic health overview** (5 min)
   ```bash
   /doc-health-dashboard
   ```
   - See document health overview
   - Identify problem documents
   - Prioritize review order

2. **Check content freshness** (10 min)
   ```bash
   /content-freshness docs/**/*.mdx
   ```
   - Find outdated content
   - Identify version-specific references
   - *Manual* - Update outdated sections

3. **Validate all links** (10 min)
   ```bash
   /smart-cross-reference docs/**/*.mdx --full-analysis
   ```
   - Find broken links
   - Detect orphaned documents
   - Update redirected links

4. **Review cross-references** (10 min)
   ```bash
   /smart-cross-reference docs/specific-section/**/*.mdx
   ```
   - Ensure documents connect properly
   - Add missing workflow links
   - *Manual* - Enhance connections

5. **Persona balance check** (5 min)
   ```bash
   /persona-coverage docs/specific-doc.mdx
   ```
   - Verify both personas well-served
   - *Manual* - Add missing content if needed

6. **Apply standard fixes** (5 min)
   ```bash
   /check-structure docs/file.mdx --fix
   /check-hashicorp-style docs/file.mdx --fix
   ```
   - Bring document up to current standards

**✅ Document refreshed and current!**

---

## Common Scenarios

### Scenario: "I inherited a draft document"

**Follow:** [Workflow 2: Major Content Revision](#workflow-2-major-content-revision)
- Start with gap analysis to understand what's missing
- Use `/review-doc` for comprehensive assessment
- Focus on filling content gaps first, style fixes second

### Scenario: "I need to add one code example"

**Quick process:**
1. Add the code example manually
2. Add 1-2 sentence summary after the code
3. Run `/check-code-examples` to validate
4. Run pre-commit checks (Workflow 4)

**Time:** ~20 minutes

### Scenario: "Someone said my document is hard to read"

**Follow these steps:**
1. Run `/check-structure --fix` (vague pronouns, flow issues)
2. Run `/check-hashicorp-style --fix` (voice, clarity)
3. Run `/persona-coverage` (check if balanced)
4. *Manual* - Read document out loud, fix awkward phrasing

**Time:** ~15 minutes

### Scenario: "I need to connect my doc to related docs"

**Follow these steps:**
1. Run `/smart-cross-reference docs/your-doc.mdx --full-analysis`
2. Review suggested connections
3. *Manual* - Add workflow connections in body text
4. Add cross-references to Resources section
5. Update "Next steps" section

**Time:** ~10 minutes

### Scenario: "My document is too short/shallow"

**Follow these steps:**
1. Run `/gap-analysis docs/your-doc.mdx`
2. Check word count (target: 700-1,200 words)
3. *Manual* - Add missing content:
   - Expand Why section (3-4 challenges)
   - Add code example with summary
   - Add 2-3 more resource links
   - Explain integration points
4. Run `/persona-coverage` to verify balance

**Time:** ~30 minutes

---

## Understanding the Tools

### When to use Claude skills vs manual work

**Use automated skills (Claude) for:**
- Structure validation (`/check-structure`)
- Style guide enforcement (`/check-hashicorp-style`)
- Link formatting (`/check-resources`)
- Finding related documents (`/smart-cross-reference`)
- Identifying gaps (`/gap-analysis`)
- SEO optimization (`/seo-optimize`)

**Use manual work for:**
- Writing original content
- Creating code examples
- Making strategic decisions (which tools to mention)
- Deciding what content to add/remove
- Crafting workflow narratives
- Final readability review

**Hybrid approach:**
- Use skills to identify issues
- Manually implement the fixes
- Skills provide guidance, you make decisions

### Skill execution patterns

**Fast auto-fix skills (1-3 min):**
- `/check-structure --fix`
- `/check-hashicorp-style --fix`
- `/check-resources --fix`
- `/quick-styleguide --fix`

**Analysis skills (3-5 min):**
- `/check-code-examples`
- `/persona-coverage`
- `/gap-analysis`
- `/content-freshness`

**Enhancement skills (5-15 min):**
- `/add-resources`
- `/smart-cross-reference --full-analysis`
- `/seo-optimize`

**Comprehensive skills (15-30 min):**
- `/review-doc --phases 1-7`
- `/code-review`

---

## Success Checklist

Before you consider a document "done," verify:

### Content completeness
- [ ] Frontmatter present (title, description 150-160 chars)
- [ ] Introduction (2-3 paragraphs)
- [ ] "Why [topic]" section with 3-4 **Bold challenge:** items
- [ ] Implementation guidance sections
- [ ] Code examples (if implementation guide) with summaries
- [ ] HashiCorp resources section (5-8+ links)
- [ ] Next steps section

### Quality markers
- [ ] 700-1,200 word count (appropriate depth)
- [ ] Both personas served (decision-maker + implementer)
- [ ] No vague pronouns starting sentences
- [ ] All headings in sentence case
- [ ] All lists have "the following" introduction
- [ ] Code examples are complete (not empty templates)
- [ ] All links work (no 404s)

### Style compliance
- [ ] Second-person "you" voice
- [ ] Present tense (no "will")
- [ ] Active voice preferred
- [ ] No abbreviations (TF, TFC, etc.)
- [ ] No promotional language
- [ ] Verbs outside link brackets
- [ ] Document ends: Resources → Next steps

### Validation complete
- [ ] `/check-structure --fix` applied
- [ ] `/check-hashicorp-style --fix` applied
- [ ] Git diff reviewed
- [ ] Document reads naturally
- [ ] No auto-fix artifacts

---

## Troubleshooting

### "I'm not sure which workflow to use"

**Decision tree:**
1. Is this a brand new document? → [Workflow 1](#workflow-1-new-document-creation)
2. Are you making major changes? → [Workflow 2](#workflow-2-major-content-revision)
3. Are you making minor edits? → [Workflow 3](#workflow-3-minor-updates-and-fixes)
4. Just need to commit changes? → [Workflow 4](#workflow-4-pre-commit-quick-check)

### "The skills are finding too many issues"

**Prioritization:**
1. **Critical** - Fix structure issues first (vague pronouns, heading case)
2. **High** - Fix style issues (voice, tense, abbreviations)
3. **Medium** - Enhance resources and cross-references
4. **Low** - Polish and optimize (SEO, advanced patterns)

### "I don't understand a skill's output"

**Get help:**
```bash
# Ask Claude for clarification
"What does this error mean?" (paste the error)
"How do I fix vague pronouns?"
"Show me an example of a complete Packer template"
```

### "Auto-fixes broke something"

**Rollback process:**
```bash
# See what changed
git diff docs/file.mdx

# Revert specific file
git checkout docs/file.mdx

# Start over selectively
/check-structure docs/file.mdx  # Review without --fix first
```

---

## Time Investment Summary

**Initial setup cost:**
- Learning the workflows: ~2 hours
- First document following workflow: ~120 minutes
- Getting comfortable with skills: ~3-5 documents

**Ongoing costs:**
- New document: ~90 minutes
- Major revision: ~60 minutes
- Minor update: ~15 minutes
- Pre-commit check: ~3 minutes
- Quarterly review: ~45 minutes per doc

**Time savings:**
- Reduces manual style checking by 70%
- Catches issues before review (saves review cycles)
- Standardizes quality across all docs
- Reduces back-and-forth with reviewers

---

## Quick Command Reference

**Copy and paste these command blocks:**

### New document creation
```bash
/create-doc docs/section/new-topic.mdx --interactive
/check-structure docs/section/new-topic.mdx --fix
/check-code-examples docs/section/new-topic.mdx
/add-resources docs/section/new-topic.mdx
/check-hashicorp-style docs/section/new-topic.mdx --fix
/seo-optimize docs/section/new-topic.mdx
/persona-coverage docs/section/new-topic.mdx
git diff docs/section/new-topic.mdx
```

### Pre-commit checks
```bash
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
git diff docs/file.mdx
```

### Full review
```bash
/review-doc docs/file.mdx --phases 1-7
```

### Quick style fixes
```bash
/check-structure docs/file.mdx --fix && \
/check-hashicorp-style docs/file.mdx --fix && \
/check-resources docs/file.mdx --fix
```

---

## Additional Resources

**Key reference files:**
- **AGENTS.md** - Complete writing standards and patterns
- **REVIEW_PHASES.md** - Detailed phase descriptions
- **QUICK_REFERENCE.md** - Pattern examples and troubleshooting
- **templates/reference/PATTERNS.md** - All documentation patterns
- **templates/styleguide.md** - Complete HashiCorp style guide

**Need help?**
- Ask Claude: "How do I [specific task]?"
- Check QUICK_REFERENCE.md for common issues
- Use `/skill-advisor docs/file.mdx` for context-aware suggestions
- Use `/doc-health-dashboard` to see document health overview

**Questions about this workflow guide?**
Open an issue or ask Claude for clarification on any step.

---

**Last updated:** 2026-02-11
**Version:** 1.0
