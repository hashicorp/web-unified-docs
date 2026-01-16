# Documentation Review Phase Template

Use this template for comprehensive documentation reviews. Complete phases in order for best results.

> **Key principle:** WAF docs explain the **why and what**, show a representative example, then direct users to tutorials and product docs for the **how**. They are directories, not tutorials.

---

## How to Request Reviews

**File relationships:**
- **REVIEW_PHASES.md** (this file) = The review process (what to check)
- **AGENTS.md** = The detailed rules and standards (what to check against)
- **DOCUMENT_TEMPLATE.md** = Practical template for creating new documents

A full review uses both files: REVIEW_PHASES.md provides the process, AGENTS.md provides the rules.

**Quick commands:**

| What you want | How to ask |
|---------------|------------|
| Full review with fixes | "Full review on [document]. Implement fixes." |
| Full review, no edits | "Full review on [document]. Review only, don't edit." |
| Style check only | "Phase 4 review on [document]." |
| Specific phase | "Phase [1-6] review on [document]." |
| Final polish | "Phases 4-6 review on [document]. Fix issues." |

---

## Phase 1: User Success Evaluation (PRIORITY)
**Goal:** Ensure users understand the problem/solution and can find resources to implement

Review questions:
- Does the doc clearly explain what problem it solves and when to use this approach?
- Can an implementer understand what to build and find the resources to do it?
- Is there a representative code example that illustrates the concept?
- Does the doc connect to related WAF docs and external resources for the full workflow?
- Are the resource links specific enough for implementers to take action?

**Deliverable:** User success review document identifying gaps for:
- Decision-maker persona (understands WHY and WHAT)
- Implementer persona (knows what to build and where to learn HOW)

---

## Phase 2: Technical Accuracy & Fact-Checking
**Goal:** Verify all technical content is correct and current

Review questions:
- Are code examples syntactically correct and tested?
- Are version numbers accurate for tools/providers?
- Are deprecated patterns or APIs used?
- Do examples follow current best practices?
- Are security recommendations still valid?
- Do configuration examples actually work?

**Deliverable:** List of technical corrections needed with line numbers

---

## Phase 3: Cross-Document Relationships
**Goal:** Ensure docs form a cohesive workflow

Review questions:
- Do related documents reference each other appropriately?
- Are HashiCorp Resources sections complete with internal cross-links?
- Is the workflow progression clear (classify → protect → encrypt → tokenize)?
- Are there orphaned docs that should connect to the set?
- Do overview docs point to implementation docs?

**Deliverable:** Cross-reference additions for HashiCorp Resources sections

---

## Phase 4: AGENTS.md style guide compliance
**Goal:** Meet all formatting and structural requirements from AGENTS.md

Review checklist:
- [ ] Meta descriptions are 150-160 characters
- [ ] "Why" sections use **Bold challenge:** format with 3-4 challenges
- [ ] Workflow connections in body text ("After classifying...")
- [ ] Code examples have 1-2 sentence summaries (when examples are included)
- [ ] No vague pronouns at sentence start
- [ ] Lists use "the following" introduction (except resource sections)
- [ ] Heading capitalization follows sentence case
- [ ] Second-person voice ("you configure", not "we configure")
- [ ] Active voice preferred
- [ ] Document structure matches pattern (intro, Why, representative example, resources)

**Deliverable:** Style compliance fixes ready to commit

---

## Phase 5: SEO & Discoverability Optimization
**Goal:** Maximize search engine and LLM findability

Review questions:
- Are meta descriptions compelling and keyword-rich?
- Do first paragraphs contain target keywords naturally?
- Are headings descriptive and search-friendly?
- Do link descriptions explain outcomes (not "Learn more")?
- Are there enough semantic variations of key terms?
- Does the content answer likely search queries?

**Deliverable:** SEO improvements for meta descriptions and link text

---

## Phase 6: Link Quality & Balance
**Goal:** Provide right mix of beginner and advanced resources

Review questions:
- Are link descriptions optimized with action verbs and outcomes?
- Is there balance between "getting started" and "advanced" links?
- Are beginners given clear next steps?
- Are advanced users given depth without overwhelming basics?
- Are external resources credible and current?
- Are HashiCorp resources grouped logically with descriptive headings?

**Deliverable:** Enhanced link descriptions and balanced resource sections

---

## Usage Instructions

**For comprehensive reviews:**
```
Run all 6 phases in order. Do NOT combine Phase 1 with other phases.
```

**For quick style-only reviews:**
```
Run Phase 4 (style guide compliance) only.
```

**For new documentation:**
```
Run Phase 1, then Phase 2, then Phase 3. 
Save Phase 4-6 for polish after content is solid.
```

**For existing documentation improvements:**
```
Run all phases, but create review documents in Phases 1-3 before making edits.
Only edit files after review documents are approved.
```

---

## Example Usage

### Full Review Command:
```
Phase 1: Evaluate user success for these 5 docs. Create review document first.
[After review] Phase 2: Fact-check all technical content.
[After review] Phase 3: Add cross-document references.
[After review] Phase 4: Fix style guide compliance issues.
[After approval] Phase 5: Optimize SEO elements.
[After approval] Phase 6: Enhance link quality and balance.
```

### Quick Fix Command:
```
Phase 4 only: Review these docs for style guide compliance and fix all issues.
```

---

## Key Principle

**User success comes first.** Perfect formatting doesn't matter if users can't implement the content.

Phase 1 requires the most cognitive empathy. Phases 4-6 are mechanical checklists.
