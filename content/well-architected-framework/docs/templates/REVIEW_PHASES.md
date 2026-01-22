# Documentation Review Phase Template

Use this template for comprehensive documentation reviews. Complete phases in order for best results.

> **Key principle:** WAF docs explain the **why and what**, show a representative example, then direct users to tutorials and product docs for the **how**. They are directories, not tutorials.

---

## How to Request Reviews

**File relationships:**
- **REVIEW_PHASES.md** (this file) = **Review process** - Step-by-step workflow, review questions, deliverables
- **AGENTS.md** = **Writing standards** - Formatting rules, content patterns, SEO/AI criteria, examples
- **DOCUMENT_TEMPLATE.md** = Practical template for creating new documents

**Clear separation:**
- This file tells you **how to review** (process, phases, questions)
- AGENTS.md tells you **what good documentation looks like** (standards, patterns, rules)
- Review phases reference specific AGENTS.md sections for detailed standards

**Quick commands:**

| What you want | How to ask |
|---------------|------------|
| Full review with fixes | "Full review on [document]. Implement fixes." |
| Full review, no edits | "Full review on [document]. Review only, don't edit." |
| Style check only | "Phase 4 review on [document]." |
| Specific phase | "Phase [1-7] review on [document]." |
| Final polish | "Phases 4-7 review on [document]. Fix issues." |

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

## Phase 5: SEO & AI/LLM Optimization
**Goal:** Maximize discoverability for both search engines and AI systems

**Review against:** [AGENTS.md](./AGENTS.md) SEO and AI/LLM Optimization sections for complete criteria

**Deliverable:** SEO and AI/LLM improvements including optimized meta descriptions, enhanced link descriptions, improved section structure for AI retrieval, and explicit relationship statements

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

## Phase 7: Final User Success Check
**Goal:** Validate that both personas would succeed with this document

This final phase steps back from the checklist details to ask: **Do the docs make sense? Would a user be successful following them?**

WAF documents serve two personas. Validate the document works for both:

**Decision-maker questions** (CTOs, architects, staff engineers):
- Can they understand the strategic value in under 2 minutes?
- Can they articulate why this matters to their organization?
- Can they make an informed decision about which approach or tool to use?
- Can they confidently send this document to their implementers?

**Implementer questions** (DevOps, platform, and other engineers):
- Can they understand what to build or implement?
- Do they have concrete examples to adapt?
- Can they find the resources to complete implementation?
- Would they know what to do next after reading this?
- Are there practical workflow details missing that would cause them to get stuck?

**Final validation:**
- Does the document address common alternatives and when to use each?
- Does the example actually work, or is it too abstract to adapt?
- Would users know where to go if something goes wrong?

If the answer to any question is "no", revisit the content before finalizing.

**Deliverable:** Final confirmation that the document serves both decision-makers and implementers, or list of gaps to address

---

## Usage Patterns

**Comprehensive review:** Run all 7 phases in order. Create review documents in Phases 1-3 before editing.

**New documentation:** Run Phases 1-3 first. Add Phases 4-7 for polish after content is solid.

**Style-only review:** Run Phase 4 only.

**Note:** Do NOT combine Phase 1 with other phases. It requires separate cognitive focus on user success.

