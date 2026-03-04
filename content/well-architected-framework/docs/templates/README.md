# Well-Architected Framework Documentation Guide

This folder contains templates, standards, reference files, and automated skills for creating and maintaining HashiCorp Well-Architected Framework (WAF) documentation.

**Last updated:** January 28, 2026
**Recent changes:** See [reference/REORGANIZATION_SUMMARY.md](./reference/REORGANIZATION_SUMMARY.md) for details on the new modular structure.

---

## Table of Contents

- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Step-by-Step Review Guide](#step-by-step-review-guide)
- [Skills Reference](#skills-reference)
- [Creating New Documents](#creating-new-documents)
- [Review Workflows](#review-workflows)
- [Reference Files](#reference-files)

---

## Quick Start

### For New Users

1. **Read this README** to understand the system
2. **Review [../CLAUDE.md](../CLAUDE.md)** for available skills
3. **Use skills for validation:** `/check-structure`, `/check-resources`, etc.
4. **Reference [../AGENTS.md](../AGENTS.md)** for core writing standards

### For Document Reviews

```bash
# Quick pre-commit check
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix

# Full review
/review-doc docs/file.mdx --phases 1-7
```

### For Creating New Documents

```bash
# Use the template
cat templates/doc-templates/DOCUMENT_TEMPLATE.md

# Check structure as you write
/check-structure docs/new-file.mdx

# Validate when done
/review-doc docs/new-file.mdx
```

---

## File Structure

### Core Guidelines (in parent docs/ directory)

| File | Size | Purpose | When to Use |
|------|------|---------|-------------|
| **../CLAUDE.md** | 1.7KB | Skills directory and usage guide (auto-loaded) | Quick skill reference |
| **../AGENTS.md** | 34KB | Main documentation standards and writing guidelines | Primary reference - load as needed |
| **../.claude/** | - | Skills and agents directory | Contains all 20 skills |

### Supporting Files (in templates/ directory)

| File | Size | Purpose | When to Use |
|------|------|---------|-------------|
| **REVIEW_PHASES.md** | 8.5KB | 7-phase review process with checklists | When conducting reviews |
| **styleguide.md** | 106KB | Official HashiCorp style guide (Top 12 + full guide) | Style validation |
| **styleguide-quick-reference.md** | 30KB | Quick style reference | Fast lookups |

### Reference Files (Load On-Demand)

These contain detailed patterns. **You don't need to load these manually** - ask questions and Claude will read them, or use skills that have patterns built-in.

| File | Size | Purpose | Skill Alternative |
|------|------|---------|-------------------|
| **reference/DOCUMENT_PATTERNS.md** | 13KB | Structure patterns, Why sections, workflow connections | `/check-structure` |
| **reference/RESOURCES_PATTERNS.md** | 14KB | HashiCorp resources section formatting, link patterns | `/check-resources` |
| **reference/CODE_PATTERNS.md** | 13KB | Code example requirements by tool (Packer, Terraform, etc.) | `/check-code-examples` |
| **reference/PITFALLS.md** | 10KB | Common mistakes and how to avoid them | Part of `/review-doc` Phase 1 & 7 |
| **reference/TOOL_PATTERNS.md** | 14KB | Tool-specific documentation requirements | `/check-code-examples` |

### Templates

| File | Purpose |
|------|---------|
| **doc-templates/DOCUMENT_TEMPLATE.md** | Template for creating new WAF articles |
| **doc-templates/pillar-overview.mdx** | Template for pillar landing pages (rare use) |

### Other Files

| File | Purpose |
|------|---------|
| **reference/REORGANIZATION_SUMMARY.md** | Details on recent system improvements (Jan 2026) |
| **reference/CONTENT_PATHS.md** | Content organization and file paths |
| **reference/TASK_AGENT_GUIDE.md** | Guide for using task agents |
| **prompts.md** | Legacy prompts (mostly integrated into REVIEW_PHASES.md) |

---

## Step-by-Step Review Guide

### Complete Document Review Workflow

Follow these steps for a comprehensive review of any WAF document:

#### **Phase 1: Initial Document Check**

**Goal:** Verify basic structure and completeness

```bash
# Step 1: Check document structure
/check-structure docs/your-file.mdx

# What this checks:
# - "Why" sections with 3-4 challenges in **Bold:** format
# - List introductions with "the following"
# - Workflow connections to related docs
# - Heading capitalization (sentence case)
# - Document ending order (resources before next steps)
# - No vague pronouns at sentence start

# Step 2: Review output and fix auto-fixable issues
/check-structure docs/your-file.mdx --fix
```

**Deliverable:** Document has proper WAF structure

---

#### **Phase 2: Code Examples Validation** (if applicable)

**Goal:** Ensure code examples are complete and realistic

```bash
# Step 3: Check code examples (skip if no code in document)
/check-code-examples docs/your-file.mdx

# What this checks:
# - Code blocks have 1-2 sentence summaries
# - Examples are complete (not empty templates)
# - Realistic values (data sources, not hardcoded IDs)
# - Language tags on all code blocks
# - Packer provisioners, Terraform backends, etc.

# Step 4: Review output and add missing summaries/patterns
# Note: Most issues require manual fixes (content judgment)
```

**Deliverable:** Code examples are complete and actionable

---

#### **Phase 3: Resources Section Validation**

**Goal:** Ensure proper link formatting and organization

```bash
# Step 5: Check HashiCorp resources section
/check-resources docs/your-file.mdx

# What this checks:
# - Link descriptions (verbs outside brackets)
# - Context in sentences (no dashes after links)
# - WAF cross-references appear first
# - Proper organization (flat vs grouped)
# - Link count (5+ per document)
# - Specific link text (not "Learn more")

# Step 6: Auto-fix formatting issues
/check-resources docs/your-file.mdx --fix
```

**Deliverable:** Resources section is well-formatted and organized

---

#### **Phase 4: HashiCorp Style Guide Compliance**

**Goal:** Validate voice, tense, and word choice

```bash
# Step 7: Check HashiCorp official style guide compliance
/check-hashicorp-style docs/your-file.mdx

# What this checks:
# - Active voice (not passive)
# - Present tense (no "will" for future events)
# - "lets" instead of "allows"/"enables"
# - No unofficial abbreviations (TF, TFC, etc.)
# - No foreign/jargon words ("via", "etc.")
# - Proper use of "we" (HashiCorp only)
# - Simple, clear language

# Step 8: Auto-fix common issues
/check-hashicorp-style docs/your-file.mdx --fix
```

**Deliverable:** Document follows HashiCorp style guide

---

#### **Phase 5: Comprehensive Multi-Phase Review**

**Goal:** Complete validation with all remaining phases

```bash
# Step 9: Run comprehensive review (Phases 1-7)
/review-doc docs/your-file.mdx --phases 1-7

# This runs:
# Phase 1: User Success Evaluation (both personas served)
# Phase 2: Technical Accuracy & Fact-Checking
# Phase 3: Cross-Document Relationships
# Phase 4: AGENTS.md style guide compliance (focused on structure)
# Phase 5: SEO & AI/LLM Optimization
# Phase 6: Link Quality & Balance
# Phase 7: Final User Success Check

# Step 10: Review output and implement recommended fixes
```

**Deliverable:** Publication-ready document

---

#### **Phase 6: Final Verification** (Optional)

**Goal:** Confirm all fixes were applied correctly

```bash
# Step 11: Re-run quick checks to verify fixes
/check-structure docs/your-file.mdx
/check-hashicorp-style docs/your-file.mdx

# Step 12: Visual review
# Read the document yourself to ensure quality
```

**Deliverable:** Verified, high-quality document ready for publication

---

### Quick Review Workflows

#### **Pre-Commit Quick Check** (2-3 minutes)

For changes to existing documents before committing:

```bash
# 1. Structure check with auto-fix
/check-structure docs/file.mdx --fix

# 2. Style guide check with auto-fix
/check-hashicorp-style docs/file.mdx --fix

# 3. Visual review of git diff
git diff docs/file.mdx
```

---

#### **Fast Style-Only Review** (5 minutes)

When you only need to check formatting and style:

```bash
# 1. Document structure
/check-structure docs/file.mdx --fix

# 2. HashiCorp style guide
/check-hashicorp-style docs/file.mdx --fix

# 3. Resources section
/check-resources docs/file.mdx --fix
```

---

#### **Code-Focused Review** (For implementation guides)

When document has significant code examples:

```bash
# 1. Code examples validation
/check-code-examples docs/file.mdx

# 2. Tool-specific patterns check
# (Covered by check-code-examples)

# 3. Phase 8: Code validation (optional - requires tooling)
# terraform fmt -check, packer validate, etc.
```

---

#### **New Document Review** (15-20 minutes)

For newly created documents:

```bash
# 1. Structure
/check-structure docs/new-file.mdx --fix

# 2. Code examples (if applicable)
/check-code-examples docs/new-file.mdx

# 3. Resources
/check-resources docs/new-file.mdx --fix

# 4. Style guide
/check-hashicorp-style docs/new-file.mdx --fix

# 5. Comprehensive review
/review-doc docs/new-file.mdx --phases 1-7

# 6. Address all findings
# (Manual review and fixes)
```

---

## Skills Reference

### Validation Skills

Use these for automated checking of specific aspects:

#### `/check-structure` (14KB)
**Purpose:** Validate WAF document structure patterns

**Checks:**
- "Why" sections with **Bold challenge:** format (3-4 challenges)
- List introductions with "the following"
- Workflow connections in body text
- Document ending order (resources → next steps)
- Heading capitalization (sentence case)
- No vague pronouns at sentence start

**Usage:**
```bash
/check-structure docs/file.mdx           # Report only
/check-structure docs/file.mdx --fix     # Auto-fix issues
```

**Auto-fixes:** List introductions, heading case, section order, bold formatting

---

#### `/check-code-examples` (14KB)
**Purpose:** Validate code example completeness and quality

**Checks:**
- Code block summaries (1-2 sentences)
- Complete examples (not empty templates)
- Realistic values (data sources vs hardcoded)
- Language tags on all code blocks
- Packer provisioners and post-processors
- Terraform backends and data sources
- Tool-specific requirements

**Usage:**
```bash
/check-code-examples docs/file.mdx           # Report only
/check-code-examples docs/file.mdx --fix     # Add basic summaries (needs review)
```

**Auto-fixes:** Language tags, basic summary placeholders (require manual improvement)

---

#### `/check-resources` (11KB)
**Purpose:** Validate HashiCorp resources section formatting

**Checks:**
- Link descriptions (verbs outside brackets)
- Context in sentences (no dashes after links)
- Specific link text (not "Learn more")
- WAF cross-references appear first
- Proper organization (flat vs grouped)
- Link count (5+ per document)

**Usage:**
```bash
/check-resources docs/file.mdx           # Report only
/check-resources docs/file.mdx --fix     # Auto-fix formatting
```

**Auto-fixes:** Remove dashes, reorder WAF links, standardize patterns

---

#### `/check-hashicorp-style` (16KB)
**Purpose:** Validate against official HashiCorp style guide

**Checks:**
- Active voice (not passive)
- Present tense (no "will")
- "lets" instead of "allows"/"enables"
- No unofficial abbreviations (TF, TFC, TFE, etc.)
- No foreign/jargon words ("via", "etc.")
- Proper use of "we" (HashiCorp only)
- Simple, clear language

**Usage:**
```bash
/check-hashicorp-style docs/file.mdx           # Report only
/check-hashicorp-style docs/file.mdx --fix     # Auto-fix issues
```

**Auto-fixes:** Present tense, word choice (lets/allows/enables), abbreviations, foreign words

---

### Review Skills

#### `/review-doc` (Multi-phase review)
**Purpose:** Comprehensive 7-phase document review

**Phases:**
1. User Success Evaluation (both personas)
2. Technical Accuracy & Fact-Checking
3. Cross-Document Relationships
4. AGENTS.md style guide compliance (structure focus)
5. SEO & AI/LLM Optimization
6. Link Quality & Balance
7. Final User Success Check

**Usage:**
```bash
/review-doc docs/file.mdx                    # All phases
/review-doc docs/file.mdx --phases 1-3       # Specific phases
/review-doc docs/file.mdx --phases 4         # Single phase
```

---

### Content Management Skills

#### `/check-style`
**Purpose:** Fast style validation for AGENTS.md Phase 4 compliance (pre-dates new system)

**Note:** Consider using the newer, more focused skills instead:
- `/check-structure` for document structure
- `/check-hashicorp-style` for voice/tense/word choice

---

#### `/add-resources`
**Purpose:** Enhance HashiCorp resources sections

**Usage:**
```bash
/add-resources docs/file.mdx --add
```

---

#### `/cross-reference`
**Purpose:** Add cross-document workflow links

**Usage:**
```bash
/cross-reference docs/file.mdx
```

---

#### `/fix-links`
**Purpose:** Fix broken internal/external links

**Usage:**
```bash
/fix-links docs/file.mdx
```

---

## Creating New Documents

### Step-by-Step Process

#### **Step 1: Use the Template**

```bash
# Copy the template
cp templates/DOCUMENT_TEMPLATE.md docs/your-new-doc.mdx

# Or ask Claude to create from template:
"Create a new WAF document about [topic] using DOCUMENT_TEMPLATE.md"
```

#### **Step 2: Write Content**

Follow the template structure:
1. **Frontmatter** - title and description (150-160 chars)
2. **Introduction** - 2-3 paragraphs explaining the problem
3. **Why [topic]** - 3-4 challenges in **Bold:** format
4. **Implementation sections** - How to approach the topic
5. **Code examples** (if applicable) - Complete, realistic examples
6. **HashiCorp resources** - 5-8+ links
7. **External resources** (optional)
8. **Next steps** - What user learned, where to go next

#### **Step 3: Check Structure As You Write**

```bash
# Validate structure frequently
/check-structure docs/your-new-doc.mdx

# Fix issues
/check-structure docs/your-new-doc.mdx --fix
```

#### **Step 4: Add Code Examples** (if applicable)

Requirements:
- Complete examples (not empty templates)
- Realistic values (data sources, not hardcoded IDs)
- 1-2 sentence summary after each code block
- Language tags on all code blocks

Check with:
```bash
/check-code-examples docs/your-new-doc.mdx
```

#### **Step 5: Add Resources Section**

Requirements:
- 5-8+ HashiCorp links
- WAF cross-references first
- Verbs outside link brackets
- Context in sentences (no dashes)
- Organized by learning level (beginner → advanced)

Check with:
```bash
/check-resources docs/your-new-doc.mdx
```

#### **Step 6: Final Review**

```bash
# Full validation
/check-structure docs/your-new-doc.mdx --fix
/check-code-examples docs/your-new-doc.mdx
/check-resources docs/your-new-doc.mdx --fix
/check-hashicorp-style docs/your-new-doc.mdx --fix

# Comprehensive review
/review-doc docs/your-new-doc.mdx --phases 1-7
```

---

## Review Workflows

### When to Use Each Workflow

| Workflow | Time | When to Use |
|----------|------|-------------|
| **Pre-Commit Quick Check** | 2-3 min | Before committing minor changes |
| **Fast Style-Only Review** | 5 min | Formatting and style validation |
| **Code-Focused Review** | 10 min | Implementation guides with code |
| **New Document Review** | 15-20 min | Newly created documents |
| **Complete Review** | 30+ min | Before publication |

---

## Reference Files

### When to Use Reference Files

**You don't need to load these manually!** They're for:
1. Skills to reference (automated)
2. Deep dive learning (read when you want details)
3. Claude to read when answering specific questions

### What Each File Contains

#### **DOCUMENT_PATTERNS.md**
- "Why [topic]" section format with examples
- Workflow connection patterns ("After X, do Y")
- Decision guidance patterns ("Use X when...")
- Code example summary requirements
- Document ending structure

**When to read:**
- Creating your first "Why" section
- Understanding workflow connections
- Learning document structure patterns

---

#### **RESOURCES_PATTERNS.md**
- Link description patterns (verbs outside brackets)
- Organization strategies (flat vs grouped)
- Standard patterns by link type
- Tool-specific link descriptions
- Anti-patterns to avoid

**When to read:**
- Formatting HashiCorp resources sections
- Learning link description best practices
- Understanding organization strategies

---

#### **CODE_PATTERNS.md**
- When to include code examples
- Complete vs empty template examples
- Packer example requirements
- Terraform example requirements
- Sentinel policy requirements
- Multi-tool integration examples

**When to read:**
- Adding code examples to documents
- Understanding tool-specific requirements
- Learning complete example patterns

---

#### **PITFALLS.md**
- Empty base examples (what not to do)
- Missing workflow connections
- Generic tool documentation
- Document depth red flags
- Quality self-check lists

**When to read:**
- Avoiding common mistakes
- Understanding what makes good documentation
- Self-checking document quality

---

#### **TOOL_PATTERNS.md**
- Packer documentation requirements
- Terraform documentation requirements
- Sentinel documentation requirements
- Multi-tool integration patterns
- Quick reference by tool

**When to read:**
- Writing tool-specific documentation
- Understanding tool requirements
- Creating integration guides

---

## Common Questions

### How is this different from before?

**Before (Pre-January 2026):**
- Load AGENTS.md (~35KB) every session
- Phase 4 checked everything (redundant)
- No focused skills for specific checks
- Patterns buried in large files

**Now (Post-January 2026):**
- AGENTS.md reduced to 32KB (core guidelines only)
- Phase 4 focused on WAF structure only
- Skills for targeted checks (`/check-structure`, etc.)
- Reference files for deep dives (load on-demand)
- ~30% faster reviews

### Do I need to load all the reference files?

**No!** Reference files are loaded only when needed:
- Skills have patterns built-in (no file loading needed)
- Ask questions and Claude reads the relevant file
- Manual reading only if you want to learn patterns

### Which skills should I use?

**For quick checks:**
```bash
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
```

**For comprehensive review:**
```bash
/review-doc docs/file.mdx --phases 1-7
```

**For specific validation:**
```bash
/check-code-examples docs/file.mdx    # Code quality
/check-resources docs/file.mdx --fix  # Resources formatting
```

### What's the fastest way to review a document?

**Pre-commit (2-3 minutes):**
```bash
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
git diff docs/file.mdx  # Visual review
```

**Full review (30+ minutes):**
Follow the [Step-by-Step Review Guide](#step-by-step-review-guide) above.

---

## Additional Resources

### Learning Paths

**New to WAF Documentation:**
1. Read [DOCUMENT_TEMPLATE.md](./DOCUMENT_TEMPLATE.md)
2. Review [AGENTS.md](./AGENTS.md) sections on personas and goals
3. Try creating a test document
4. Run `/check-structure` to learn structure patterns

**Experienced Writer:**
1. Use skills for quick validation
2. Reference files only when you need pattern details
3. Run `/review-doc` for comprehensive checks

**Reviewer:**
1. Follow [Step-by-Step Review Guide](#step-by-step-review-guide)
2. Use skills to automate mechanical checks
3. Focus manual review on content quality

### Getting Help

**Ask Claude specific questions:**
- "How do I format Why sections?"
- "What should Packer examples show?"
- "How do I organize resources sections?"

**Claude will:**
- Read the relevant reference file
- Explain with examples
- Apply patterns automatically

### File Organization Summary

```
templates/
├── README.md (this file)          ← Start here
├── AGENTS.md                      ← Core writing standards
├── REVIEW_PHASES.md              ← 7-phase review process
├── CLAUDE.md                     ← Skills directory
├── styleguide.md                 ← HashiCorp style guide
│
├── Reference Files (on-demand):
│   ├── DOCUMENT_PATTERNS.md
│   ├── RESOURCES_PATTERNS.md
│   ├── CODE_PATTERNS.md
│   ├── PITFALLS.md
│   └── TOOL_PATTERNS.md
│
├── Templates:
│   ├── DOCUMENT_TEMPLATE.md
│   └── pillar-overview.mdx
│
└── ../.claude/skills/            ← Automated validation (in parent directory)
    ├── check-structure/
    ├── check-code-examples/
    ├── check-resources/
    ├── check-hashicorp-style/
    └── review-doc/
```

---

## Quick Reference Card

### Essential Commands

| Task | Command |
|------|---------|
| **Quick pre-commit check** | `/check-structure docs/file.mdx --fix && /check-hashicorp-style docs/file.mdx --fix` |
| **Full document review** | `/review-doc docs/file.mdx --phases 1-7` |
| **Check code examples** | `/check-code-examples docs/file.mdx` |
| **Check resources section** | `/check-resources docs/file.mdx --fix` |
| **Check style guide** | `/check-hashicorp-style docs/file.mdx --fix` |

### Key Files

| Need | File |
|------|------|
| **Writing standards** | AGENTS.md |
| **Review process** | REVIEW_PHASES.md |
| **Style rules** | styleguide.md |
| **New doc template** | DOCUMENT_TEMPLATE.md |
| **Skills list** | CLAUDE.md |

### Pattern References

| Topic | File |
|-------|------|
| **Why sections, structure** | DOCUMENT_PATTERNS.md |
| **Link formatting** | RESOURCES_PATTERNS.md |
| **Code examples** | CODE_PATTERNS.md |
| **Common mistakes** | PITFALLS.md |
| **Tool requirements** | TOOL_PATTERNS.md |

---

**For detailed system changes, see [REORGANIZATION_SUMMARY.md](./REORGANIZATION_SUMMARY.md)**
