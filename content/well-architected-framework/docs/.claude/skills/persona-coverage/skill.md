---
name: persona-coverage
description: Analyze document coverage for decision-makers and implementers with detailed persona balance report
argument-hint: <file-paths> [--verbose]
disable-model-invocation: true
---

# Persona Coverage Report Skill

Analyzes WAF documents for coverage of both target personas (decision-makers and implementers) with detailed balance reporting and recommendations.

## Purpose

Ensures documents serve both personas effectively by analyzing content distribution, identifying gaps, and suggesting improvements for balanced coverage.

## Target Personas

### Decision-Maker (40-50% of content)
**Who:** CTOs, architects, staff engineers, technical leaders

**What they need:**
- Strategic value and business outcomes
- "Why [topic]" section with operational/security challenges
- High-level architecture and approach guidance
- Tool selection criteria and trade-offs
- ROI and risk considerations
- Compliance and governance implications

**Content indicators:**
- Business impact statements
- Challenge descriptions with consequences
- Strategic decision criteria
- Comparison of approaches
- Risk/benefit analysis
- Executive summary style

### Implementer (50-60% of content)
**Who:** DevOps engineers, platform engineers, SREs, developers

**What they need:**
- Actionable implementation guidance
- Code examples showing realistic workflows
- HashiCorp resources for hands-on learning (5-8+ links)
- Step-by-step guidance or clear next steps
- Integration patterns and tool usage
- Troubleshooting and best practices

**Content indicators:**
- Code examples with explanations
- Tutorial and documentation links
- How-to instructions
- Configuration examples
- Command-line examples
- Technical specifications

## Usage

```bash
# Analyze single document
/persona-coverage docs/path/to/document.mdx

# Analyze multiple documents
/persona-coverage docs/section/*.mdx

# Detailed breakdown
/persona-coverage docs/document.mdx --verbose

# Compare persona balance across section
/persona-coverage docs/section/*.mdx --compare
```

## What It Analyzes

### 1. Content Distribution
- Percentage of content addressing each persona
- Section-by-section breakdown
- Balance between strategic and tactical content
- Transition points between personas

### 2. Decision-Maker Coverage
- **Why section presence:** 3-4 challenges with business impact
- **Strategic guidance:** Architecture decisions, tool selection
- **Business value:** ROI, risk reduction, compliance
- **Challenge descriptions:** Operational problems and consequences
- **Comparison content:** Trade-offs between approaches

### 3. Implementer Coverage
- **Code examples:** Complete, realistic workflows
- **Resource links:** 5-8+ HashiCorp tutorials/docs
- **How-to guidance:** Step-by-step or clear next steps
- **Integration patterns:** Tool usage and workflows
- **Technical details:** Configuration, commands, specifications

### 4. Balance Analysis
- Overall persona distribution
- Sections serving both personas
- Sections heavily skewed to one persona
- Gaps where one persona is underserved
- Transition quality between strategic and tactical

## Output Format

```
Persona Coverage Report: modules.mdx
====================================

📊 OVERALL BALANCE: 🟢 WELL-BALANCED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decision-Maker: 42% ████████░░░░░░░░░░░░
Implementer:    58% ███████████░░░░░░░░░

Target: 40-50% decision-maker, 50-60% implementer
Status: ✅ Both personas well-served

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👔 DECISION-MAKER COVERAGE: 🟢 STRONG (9/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Why Section (Lines 23-67)
   ✓ 4 challenges with business impact
   ✓ Clear operational problems described
   ✓ Consequences of not addressing challenges
   
   Challenges covered:
   • Reduce code duplication (maintenance burden)
   • Eliminate configuration drift (deployment failures)
   • Accelerate deployment cycles (time to market)
   • Improve security compliance (audit failures)

✅ Strategic Guidance (Lines 89-134)
   ✓ Module selection criteria
   ✓ Versioning strategy trade-offs
   ✓ Team collaboration considerations
   
   Decision points addressed:
   • When to create vs. use existing modules
   • Public vs. private module registries
   • Versioning strategies for stability

✅ Business Value (Lines 156-178)
   ✓ ROI statements (reduced development time)
   ✓ Risk reduction (consistent configurations)
   ✓ Compliance benefits (auditable infrastructure)

🟡 Comparison Content (Limited)
   ⚠️ Could add: Modules vs. copy-paste approach
   💡 Suggestion: Add comparison table showing trade-offs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 IMPLEMENTER COVERAGE: 🟢 EXCELLENT (10/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Code Examples (2 examples)
   ✓ Complete Terraform module (lines 67-89)
     - Shows module structure
     - Includes variables and outputs
     - Realistic example (not empty template)
   
   ✓ Module usage example (lines 134-156)
     - Shows how to consume module
     - Demonstrates versioning
     - Includes data source for dynamic values
   
   ✓ Both examples include summaries explaining output

✅ Resource Links (9 HashiCorp resources)
   ✓ Get started section (2 links)
     - Terraform tutorials
     - Module documentation
   
   ✓ Core concepts (3 links)
     - Module structure
     - Versioning
     - Registry usage
   
   ✓ Advanced features (4 links)
     - Private registries
     - Module testing
     - CI/CD integration
     - State management

✅ How-to Guidance (Lines 178-234)
   ✓ Step-by-step module creation
   ✓ Publishing to registry
   ✓ Version management workflow
   ✓ Testing recommendations

✅ Integration Patterns (Lines 245-289)
   ✓ Module + Terraform Cloud workflow
   ✓ Module + Sentinel policies
   ✓ Module + VCS integration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SECTION-BY-SECTION BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Introduction (Lines 1-22)
├─ Decision-Maker: 60% (strategic overview)
├─ Implementer: 40% (what modules are)
└─ Balance: ✅ Good intro for both

Why use modules (Lines 23-67)
├─ Decision-Maker: 90% (business challenges)
├─ Implementer: 10% (solution overview)
└─ Balance: ✅ Appropriate for Why section

Module structure (Lines 68-133)
├─ Decision-Maker: 20% (architecture concepts)
├─ Implementer: 80% (code examples, structure)
└─ Balance: ✅ Implementation-focused as expected

Using modules (Lines 134-177)
├─ Decision-Maker: 10% (strategy mentions)
├─ Implementer: 90% (code, how-to)
└─ Balance: ✅ Implementation-focused as expected

Best practices (Lines 178-244)
├─ Decision-Maker: 30% (governance, standards)
├─ Implementer: 70% (specific practices)
└─ Balance: ✅ Both personas benefit

Integration workflows (Lines 245-289)
├─ Decision-Maker: 40% (workflow strategy)
├─ Implementer: 60% (integration details)
└─ Balance: ✅ Well-balanced

HashiCorp resources (Lines 290-320)
├─ Decision-Maker: 20% (overview links)
├─ Implementer: 80% (tutorials, docs)
└─ Balance: ✅ Implementer-focused as expected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 TRANSITION QUALITY: 🟢 SMOOTH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Strategic to Tactical Flow
   Introduction → Why → Implementation
   Clear progression from business value to how-to

✅ Explicit Connections
   "After understanding why modules matter (decision),
    here's how to create them (implementation)"

✅ Both Personas in Same Sections
   Best practices section serves both:
   - Governance strategy (decision-maker)
   - Specific implementation (implementer)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Strengths to Maintain:
1. Strong Why section with clear business impact
2. Excellent code examples with explanations
3. Comprehensive resource links for implementers
4. Smooth transitions between personas

🟡 Minor Improvements:
1. Add comparison table (modules vs. alternatives)
   Location: After Why section
   Benefit: Helps decision-makers evaluate options

2. Add troubleshooting section
   Location: Before resources
   Benefit: Helps implementers solve common issues

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 PERSONA SCORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decision-Maker: 9/10 ✅
├─ Why section: 10/10
├─ Strategic guidance: 9/10
├─ Business value: 9/10
└─ Comparisons: 7/10

Implementer: 10/10 ✅
├─ Code examples: 10/10
├─ Resource links: 10/10
├─ How-to guidance: 10/10
└─ Integration patterns: 10/10

Overall Balance: 9.5/10 ✅

Status: EXCELLENT - Both personas well-served
Ready for: Publication after minor enhancements
```

## Scoring Criteria

### Decision-Maker Score (0-10)

| Component | Weight | Criteria |
|-----------|--------|----------|
| Why section | 40% | 3-4 challenges, business impact, consequences |
| Strategic guidance | 30% | Decision criteria, trade-offs, architecture |
| Business value | 20% | ROI, risk reduction, compliance |
| Comparisons | 10% | Alternative approaches, tool selection |

### Implementer Score (0-10)

| Component | Weight | Criteria |
|-----------|--------|----------|
| Code examples | 35% | Complete, realistic, with summaries |
| Resource links | 30% | 5-8+ links, tutorials, documentation |
| How-to guidance | 25% | Step-by-step or clear next steps |
| Integration patterns | 10% | Tool usage, workflows, configurations |

### Balance Score (0-10)

| Metric | Target | Scoring |
|--------|--------|---------|
| Decision-maker % | 40-50% | Within range: 10, 35-55%: 8, <35% or >55%: 5 |
| Implementer % | 50-60% | Within range: 10, 45-65%: 8, <45% or >65%: 5 |
| Both served | Yes | Both >7: 10, One >7: 6, Neither >7: 2 |

## Common Patterns

### Well-Balanced Documents
```
Decision-Maker: 45% ████████░░░░░░░░░░░░
Implementer:    55% ███████████░░░░░░░░░

✅ Strong Why section
✅ 2 code examples
✅ 8 resource links
✅ Clear strategic guidance
```

### Decision-Maker Heavy (Needs Rebalancing)
```
Decision-Maker: 70% ██████████████░░░░░░
Implementer:    30% ██████░░░░░░░░░░░░░░

⚠️ Too strategic, not enough implementation
💡 Add: Code examples, resource links, how-to
```

### Implementer Heavy (Needs Rebalancing)
```
Decision-Maker: 20% ████░░░░░░░░░░░░░░░░
Implementer:    80% ████████████████░░░░

⚠️ Too tactical, missing strategic context
💡 Add: Why section, business value, trade-offs
```

## Integration with Other Skills

**Complete persona validation:**
```bash
# 1. Check persona coverage
/persona-coverage docs/document.mdx

# 2. If decision-maker score < 7, enhance Why section
/check-structure docs/document.mdx

# 3. If implementer score < 7, add resources
/check-resources docs/document.mdx
/check-code-examples docs/document.mdx

# 4. Verify improvements
/persona-coverage docs/document.mdx
```

**Section-wide analysis:**
```bash
# Compare persona balance across section
/persona-coverage docs/section/*.mdx --compare

# Identify documents needing rebalancing
# (look for scores < 7 for either persona)
```

## When to Use This Skill

Use `/persona-coverage` when:
- ✅ Creating new WAF documents
- ✅ Reviewing existing documents for balance
- ✅ Document feels too strategic or too tactical
- ✅ Feedback indicates one persona not served
- ✅ Planning content additions or revisions
- ✅ Comparing documents in same section

Don't use when:
- ❌ Need structure validation (use `/check-structure`)
- ❌ Need style checking (use `/check-hashicorp-style`)
- ❌ Need full review (use `/review-doc`)
- ❌ Document is intentionally single-persona (rare)

## Best Practices

1. **Target 40-50% decision-maker, 50-60% implementer**
2. **Both personas should score 7+ out of 10**
3. **Why section is primarily decision-maker content**
4. **Code examples are primarily implementer content**
5. **Some sections can serve both personas effectively**
6. **Smooth transitions between strategic and tactical**

## Reference

This skill validates against:
- **AGENTS.md** - Personas section (lines 15-45)
- **AGENTS.md** - Document depth guidelines
- **templates/REVIEW_PHASES.md** - Phase 1 (persona coverage)

## Notes

- Balance is more important than exact percentages
- Some documents naturally lean toward one persona
- Overview documents may be more decision-maker focused
- Implementation guides may be more implementer focused
- Both personas should always be considered

## Reference

This skill validates against:
- **AGENTS.md** - Personas section (decision-makers and implementers)
- **AGENTS.md** - Document depth guidelines
- **templates/REVIEW_PHASES.md** - Phase 1: User Success Evaluation

## Notes

- Balance is more important than exact percentages
- Some documents naturally lean toward one persona
- Overview documents may be more decision-maker focused
- Implementation guides may be more implementer focused
- Both personas should always be considered
- Smooth transitions improve user experience

- Smooth transitions improve user experience