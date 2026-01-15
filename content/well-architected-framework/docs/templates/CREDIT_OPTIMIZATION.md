# Credit Optimization for AI Agent Reviews

When using AI agents to review documentation, optimize for cost and efficiency:

## Use the Task Agent for Heavy Lifting

**Instead of main conversation:**
```
"Review these 18 docs for all requirements → creates review docs → re-reads everything → fixes → verifies"
Cost: 300K-500K tokens
```

**Use task agent:**
```
"Task agent: Run Phase 1 review on data/*.mdx using AGENTS.md and REVIEW_PHASES.md"
Task agent returns: /tmp/review.md
You review and approve
"Fix items 1, 4, 7 from /tmp/review.md"
Cost: 50K-80K tokens (6-10x cheaper)
```

## Batch Documents by Similarity

**Inefficient:**
- "Review all 18 docs across 3 different topics"
- Agent loads massive context, reviews unrelated documents together

**Efficient:**
- "Review data/*.mdx (5 files)" → commit → "Review auth/*.mdx (4 files)" → commit
- Smaller context windows, can stop early if patterns emerge

## Skip Phases If Early Phases Fail

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

## Avoid Self-Verification Loops

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

## Be Specific About What to Fix

**Expensive:**
- "Review and fix everything"
- Agent decides what needs fixing, potentially over-optimizes

**Cheap:**
- "Fix only: meta descriptions and 'Why' sections from /tmp/review.md"
- Agent does exactly what's needed, nothing more

## Separate Reviews from Edits

**Combined (expensive):**
- "Review these docs against AGENTS.md and fix all issues"
- Single massive operation, can't stop mid-way

**Separated (cheap):**
- "Create AGENTS.md compliance review → /tmp/review.md"
- You review findings
- "Fix items 2, 5, 8, 12 from review.md"
- You control what gets fixed

## Parallel Task Agents for Different Pillars

**Sequential (slow and expensive in main chat):**
- Review data docs → review auth docs → review network docs
- Each review waits for previous to complete

**Parallel (fast and cheap):**
```
Launch 3 task agents simultaneously:
"Task agent 1: Phase 1 review on data/*.mdx → /tmp/data_review.md"
"Task agent 2: Phase 1 review on auth/*.mdx → /tmp/auth_review.md"  
"Task agent 3: Phase 1 review on network/*.mdx → /tmp/network_review.md"
```
- All complete in parallel
- Review results together, fix selectively

## Reference Review Template

**Always reference REVIEW_PHASES.md:**
```
"Use REVIEW_PHASES.md Phase 1 to review these docs"
```
- Ensures consistent review methodology
- Agent knows exactly what to check
- No ambiguity = fewer tokens wasted clarifying

## Cost Comparison Examples

| Approach | Token Cost | Time |
|----------|-----------|------|
| Main chat: review all + fix all + verify | 300-500K | High |
| Task agent: review → you approve → main chat: fix | 50-100K | Medium |
| Task agent: review → you approve → task agent: fix specific items | 30-60K | Low |

## Recommended Workflow

```
1. "Task agent: REVIEW_PHASES.md Phase 1 on [files] → /tmp/review.md"
2. You review /tmp/review.md (0 tokens)
3. "Fix these specific items: [list]" (cheap, targeted)
4. Commit and move to next batch
```

**Never ask agent to verify its own work unless critical bugs suspected.**

---

## Quick Reference

**Golden rules for saving tokens:**
1. Use task agents for reviews (creates files, not chat messages)
2. Read /tmp files yourself (0 token cost)
3. Give main chat specific fix instructions
4. Skip verification unless critical
5. Batch similar documents together
6. Run phases sequentially (stop early if Phase 1 fails)

**See TASK_AGENT_GUIDE.md for detailed task agent usage examples.**
