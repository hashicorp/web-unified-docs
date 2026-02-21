# Task Agent Guide: Save Tokens on Documentation Reviews

## What Are Task Agents?

Task agents are **specialized AI agents that run in separate context windows** to handle specific jobs. Think of them like hiring a contractor for a specific task instead of having your full-time employee (main chat) do everything.

**Key benefits:**
- Run in parallel (launch 3 agents at once)
- Use cheaper models (Haiku vs Sonnet)
- Keep main chat clean (no 10,000-line review documents cluttering your conversation)
- Stateless (each agent is fresh, no context pollution)

## Three Types of Task Agents

### 1. Explore Agent (Fastest/Cheapest)
**Use for:** Quick codebase searches, finding files, answering questions about code

**Model:** Claude Haiku (cheapest)
**Tools:** grep, glob, view only (read-only)
**Best for:** 
- "Find all .mdx files in secure-systems/"
- "Search for 'Vault Transit' in these docs"
- "What does classify-data.mdx explain?"

**Example:**
```
@task explore: Find all .mdx files in the data security directory
```

### 2. Task Agent (Medium Cost)
**Use for:** Running commands, tests, builds where you only care about success/failure

**Model:** Claude Haiku
**Tools:** All CLI tools (bash, grep, glob, view, edit, create)
**Best for:**
- Running tests and only showing failures
- Building projects (shows errors, hides success spam)
- Installing dependencies
- Running linters

**Example:**
```
@task task: Run npm test and only show me failures
```

### 3. General-Purpose Agent (Most Expensive)
**Use for:** Complex multi-step tasks requiring high-quality reasoning

**Model:** Claude Sonnet (same as main chat)
**Tools:** All CLI tools
**Best for:**
- Complex refactoring
- Architecture decisions
- Multi-step workflows with decision points

**Example:**
```
@task general-purpose: Refactor these 5 components to use the new API pattern
```

---

## How to Launch Task Agents

### Basic Syntax

```
@task <agent_type>: <your instruction>
```

### Real Examples for Your Documentation Work

**Example 1: Review Phase 1 for data docs**
```
@task task: Using REVIEW_PHASES.md Phase 1, review all .mdx files in 
/Users/cjobermaier/workspace/web-unified-docs/content/well-architected-framework/docs/docs/secure-systems/data/
and create a user success evaluation at /tmp/data_phase1_review.md
```

**What happens:**
1. Task agent launches in separate window
2. Uses Haiku model (cheap)
3. Reads REVIEW_PHASES.md
4. Reads all 5 data docs
5. Creates /tmp/data_phase1_review.md
6. Returns summary to you
7. You read /tmp/data_phase1_review.md yourself
8. **Main chat never loads the review document** (saves tokens)

**Example 2: AGENTS.md compliance check**
```
@task task: Review these files for AGENTS.md compliance and list all issues in /tmp/compliance_issues.md:
- data/classify-data.mdx
- data/protect-data-at-rest.mdx
- data/tokenize-data.mdx
```

**Example 3: Find all docs in a pillar**
```
@task explore: List all .mdx files in secure-systems/ organized by subdirectory
```

**Example 4: Parallel reviews (launch 3 at once)**
```
@task task: Review data/*.mdx for Phase 1 → /tmp/data_review.md

@task task: Review auth/*.mdx for Phase 1 → /tmp/auth_review.md

@task task: Review network/*.mdx for Phase 1 → /tmp/network_review.md
```
All three run simultaneously, finish in parallel.

---

## Token-Saving Workflows

### Old Workflow (Expensive)
```
You: "Review these 5 docs for AGENTS.md compliance"
Main chat: *reads 5 docs* (50K tokens)
Main chat: *creates review in conversation* (20K tokens in YOUR context)
You: "Fix all issues"
Main chat: *re-reads 5 docs* (50K tokens)
Main chat: *makes edits* (30K tokens)
You: "Verify your changes"
Main chat: *re-reads 5 docs AGAIN* (50K tokens)
**Total: 200K tokens**
```

### New Workflow (Cheap)
```
You: "@task task: Review data/*.mdx against AGENTS.md → /tmp/review.md"
Task agent: *reviews in separate window* (NOT in your context)
Task agent: Returns "Created /tmp/review.md with 12 issues found"
You: *read /tmp/review.md yourself* (0 tokens)
You: "Fix items 2, 5, 8 from /tmp/review.md in classify-data.mdx"
Main chat: *reads 1 doc* (10K tokens)
Main chat: *fixes 3 specific items* (5K tokens)
**Total: 15K tokens** (13x cheaper)
```

---

## Credit Optimization Strategies

### Batch Documents by Similarity

**Inefficient:**
- "Review all 18 docs across 3 different topics"
- Agent loads massive context, reviews unrelated documents together

**Efficient:**
- "Review data/*.mdx (5 files)" → commit → "Review auth/*.mdx (4 files)" → commit
- Smaller context windows, can stop early if patterns emerge

### Skip Phases If Early Phases Fail

**Inefficient:**
- Run all 6 phases → find major user success gaps → need to redesign
- Style compliance work wasted

**Efficient:**
```
"Phase 1 only: User success review for these docs"
[If major gaps found]
"Fix Phase 1 issues first, we'll do style later"
```
- No point polishing unusable docs

### Avoid Self-Verification Loops

**Most expensive pattern:**
- "Review these docs" (100K tokens)
- Agent creates /tmp/review.md (50K tokens)
- "Fix everything" (100K tokens)
- "Verify your fixes" (100K tokens - RE-READS EVERYTHING)
**Total: 350K tokens**

**Efficient pattern:**
- "Create review doc only: /tmp/review.md"
- You review it yourself
- "Apply fixes from review.md"
- Trust the work, don't verify
**Total: 150K tokens (2.3x cheaper)**

### Separate Reviews from Edits

**Combined (expensive):**
- "Review these docs against AGENTS.md and fix all issues"
- Single massive operation, can't stop mid-way

**Separated (cheap):**
- "Create AGENTS.md compliance review → /tmp/review.md"
- You review findings
- "Fix items 2, 5, 8, 12 from review.md"
- You control what gets fixed

---

## Best Practices for Your Documentation Work

### 1. Always Output to /tmp Files

**Bad:**
```
@task task: Review these docs and tell me what's wrong
```
→ Agent puts entire review in chat response (costs YOU tokens)

**Good:**
```
@task task: Review these docs and save findings to /tmp/review.md
```
→ Agent writes to file, you read it separately (free)

### 2. Be Specific About Phases

**Bad:**
```
@task task: Review these docs
```
→ Agent guesses what to check

**Good:**
```
@task task: Using REVIEW_PHASES.md Phase 1 only, evaluate user success for these docs
```
→ Agent knows exact scope

### 3. Be Specific About What to Fix

**Expensive:**
- "Review and fix everything"
- Agent decides what needs fixing, potentially over-optimizes

**Cheap:**
- "Fix only: meta descriptions and 'Why' sections from /tmp/review.md"
- Agent does exactly what's needed, nothing more

### 4. Use Explore for Quick Lookups

**Instead of:**
```
You: "What files are in secure-systems/data/?"
Main chat: *runs glob* (uses your context)
```

**Do:**
```
@task explore: List all files in secure-systems/data/
```
→ Runs in separate context, returns just the list

### 5. Batch Similar Work Together

**Bad (separate agents for each file):**
```
@task task: Review classify-data.mdx
@task task: Review protect-data-at-rest.mdx
@task task: Review tokenize-data.mdx
```

**Good (one agent for related files):**
```
@task task: Review all data security .mdx files against REVIEW_PHASES.md Phase 1
```

### 6. Let Task Agents Do Mechanical Work

**Use task agents for:**
- ✅ Phase 4-6 compliance checks (mechanical checklists)
- ✅ Finding files and searching code
- ✅ Creating review documents
- ✅ Running tests/linters

**Use main chat for:**
- ✅ Phase 1-2 reviews requiring judgment (user success, technical accuracy)
- ✅ Applying specific fixes you've approved
- ✅ Explaining concepts or teaching you
- ✅ Making strategic decisions

---

## Example: Complete Review Workflow

Here's how to review 5 docs using task agents to save maximum tokens:

### Step 1: Get file list (Explore agent)
```
@task explore: List all .mdx files in secure-systems/data/
```

### Step 2: Phase 1 review (Task agent)
```
@task task: Using REVIEW_PHASES.md Phase 1, evaluate user success for all .mdx files in 
secure-systems/data/ and save findings to /tmp/data_phase1.md. For each doc, assess both 
decision-maker and implementer personas.
```

### Step 3: You review the output
```bash
# In terminal or use main chat to read
cat /tmp/data_phase1.md
```

### Step 4: Phase 4 compliance check (Task agent)
```
@task task: Using AGENTS.md guidelines, check these files for style compliance and save 
issues to /tmp/data_compliance.md:
- secure-systems/data/classify-data.mdx
- secure-systems/data/protect-data-at-rest.mdx
- secure-systems/data/protect-data-in-transit.mdx
- secure-systems/data/protect-sensitive-data.mdx
- secure-systems/data/tokenize-data.mdx
```

### Step 5: You review both reports
```bash
cat /tmp/data_phase1.md
cat /tmp/data_compliance.md
```

### Step 6: Fix specific issues (Main chat - surgical fixes)
```
Fix these issues from /tmp/data_compliance.md:
- Item 3: Meta description in classify-data.mdx
- Item 7: "Why" section format in protect-data-at-rest.mdx
- Item 12: Missing workflow connection in tokenize-data.mdx
```

**Token cost:**
- Step 2 task agent: ~30K tokens (NOT in your context)
- Step 4 task agent: ~40K tokens (NOT in your context)
- Step 6 main chat: ~20K tokens (only reading 3 files, making 3 fixes)
**Total in YOUR context: 20K tokens**

**Old way doing everything in main chat: ~200K tokens** (10x more expensive)

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Not specifying output location
```
@task task: Review these docs
```
→ Agent dumps review into chat (expensive)

### ✅ Fix:
```
@task task: Review these docs → /tmp/review.md
```

### ❌ Mistake 2: Using task agent for conversation
```
@task task: What's the difference between Vault Transit and Transform?
```
→ Waste - this is a question for main chat

### ✅ Fix:
Ask main chat directly, or if searching docs:
```
@task explore: Search for "Vault Transit" and "Transform" in secure-systems/data/
```

### ❌ Mistake 3: Asking task agent to fix AND review
```
@task task: Review and fix all issues in these docs
```
→ You lose control, agent might over-fix

### ✅ Fix:
```
@task task: Review docs → /tmp/review.md
(you review it)
Main chat: Fix items 2, 5, 8 from /tmp/review.md
```

### ❌ Mistake 4: Re-reviewing in main chat
```
@task task: Review docs → /tmp/review.md
Main chat: "Show me what you found"
```
→ Now main chat loads the review (expensive)

### ✅ Fix:
```
@task task: Review docs → /tmp/review.md
(read /tmp/review.md yourself with cat or view tool)
```

---

## Quick Reference: When to Use Which Agent

| Task | Agent Type | Example |
|------|-----------|---------|
| Find files | explore | `@task explore: List .mdx in data/` |
| Search content | explore | `@task explore: Find "Vault Transit" in docs` |
| Phase 1-3 reviews | task | `@task task: Phase 1 review → /tmp/review.md` |
| Phase 4-6 reviews | task | `@task task: AGENTS.md compliance → /tmp/issues.md` |
| Run tests | task | `@task task: Run npm test, show failures only` |
| Quick questions | main chat | Direct question to main chat |
| Apply fixes | main chat | "Fix items 2, 5, 8 from /tmp/review.md" |
| Complex refactoring | general-purpose | `@task general-purpose: Refactor to new pattern` |
| Teaching/explaining | main chat | Direct question to main chat |

---

## Token Cost Comparison

| Workflow | Main Chat Cost | Task Agent Cost | Savings |
|----------|---------------|----------------|---------|
| Review 5 docs | 50K tokens | 5K tokens (summary only) | 90% |
| Review + fix all | 200K tokens | 20K tokens | 90% |
| Review + selective fix | 150K tokens | 15K tokens | 90% |
| Find files | 5K tokens | 1K tokens | 80% |
| Create review doc | 70K (doc in context) | 5K (just summary) | 93% |

**Average savings: 85-90% when using task agents for reviews**

---

## Practice Exercise

Try this workflow with your next documentation review:

```
1. @task explore: List all .mdx files in [your-directory]

2. @task task: Using REVIEW_PHASES.md Phase 1, review the files listed above 
   and save findings to /tmp/my_review.md

3. Read /tmp/my_review.md yourself (use terminal: cat /tmp/my_review.md)

4. Identify 2-3 specific issues to fix

5. Main chat: "Fix these specific issues: [list them]"
```

**Expected token usage: 15-25K (vs 150-200K the old way)**

---

## Advanced: Parallel Reviews for Multiple Pillars

When reviewing docs across different pillars:

```
# Launch all 3 simultaneously
@task task: Phase 1 review for secure-systems/data/*.mdx → /tmp/data_review.md

@task task: Phase 1 review for secure-systems/auth/*.mdx → /tmp/auth_review.md

@task task: Phase 1 review for secure-systems/network/*.mdx → /tmp/network_review.md

# All finish in parallel
# Read all 3 reviews
# Fix issues pillar by pillar
```

**Time savings: 3x faster (parallel vs sequential)**
**Token savings: Same (90% reduction), but much faster**

---

## Summary: Maximum Token Savings

**Golden Rule:** Task agents create files, you read files, main chat fixes specific items.

**Never:**
- Ask main chat to review what task agent reviewed
- Ask task agent to dump findings into chat
- Run sequential reviews in main chat

**Always:**
- Use `→ /tmp/filename.md` in task agent instructions
- Read /tmp files yourself
- Give main chat specific fix instructions
- Use explore agent for quick lookups

**Result: 85-90% token reduction on documentation reviews**

---

## Cost Comparison by Approach

| Approach | Token Cost | Time |
|----------|-----------|------|
| Main chat: review all + fix all + verify | 300-500K | High |
| Task agent: review → you approve → main chat: fix | 50-100K | Medium |
| Task agent: review → you approve → task agent: fix specific items | 30-60K | Low |

## Recommended Complete Workflow

```
1. "Task agent: REVIEW_PHASES.md Phase 1 on [files] → /tmp/review.md"
2. You review /tmp/review.md (0 tokens)
3. "Fix these specific items: [list]" (cheap, targeted)
4. Commit and move to next batch
```

**Never ask agent to verify its own work unless critical bugs suspected.**