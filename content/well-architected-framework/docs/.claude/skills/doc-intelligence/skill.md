---
name: doc-intelligence
description: Unified documentation intelligence system with tactical (real-time health) and strategic (trends/analytics) views
argument-hint: [--view tactical|strategic|full] [--period 30d|90d|180d] [--format text|json]
disable-model-invocation: true
---

# Documentation Intelligence System

Unified system providing both tactical (immediate action) and strategic (trends/analytics) views of WAF documentation health.

## Purpose

Combines real-time health monitoring with historical trend analysis to provide comprehensive documentation intelligence for both immediate fixes and long-term planning.

## Usage

```bash
# Tactical view: What needs fixing now?
/doc-intelligence --view tactical

# Strategic view: How are we trending?
/doc-intelligence --view strategic --period 90d

# Full report: Both tactical and strategic
/doc-intelligence --view full

# Specific pillar analysis
/doc-intelligence --pillar secure-systems --view tactical

# JSON output for automation
/doc-intelligence --view tactical --format json

# Generate executive summary
/doc-intelligence --view strategic --period 90d --summary
```

## Arguments

- **--view** or **-v**: View type (required)
  - `tactical` - Real-time health status and immediate actions
  - `strategic` - Historical trends and analytics
  - `full` - Combined tactical and strategic report

- **--period** or **-p**: Time period for strategic view (default: 90d)
  - `30d` - Last 30 days
  - `90d` - Last 90 days (quarter)
  - `180d` - Last 180 days (half year)
  - `365d` - Last year

- **--pillar**: Filter by specific pillar
  - `secure-systems`
  - `define-and-automate-processes`
  - `design-resilient-systems`
  - `optimize-systems`

- **--format** or **-f**: Output format
  - `text` - Human-readable (default)
  - `json` - Machine-readable for automation

- **--summary**: Generate executive summary (strategic view only)

## Tactical View Output

### Real-Time Health Dashboard

```
WAF Documentation Intelligence - Tactical View
═══════════════════════════════════════════════
Generated: 2026-01-29 04:44 UTC

📊 OVERALL HEALTH: 🟢 8.2/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: GOOD - Minor improvements needed
Total Documents: 68
Last Updated: 2 hours ago

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏛️  PILLAR HEALTH BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secure Systems:           🟢 8.5/10 (23 docs)
├─ Structure:             🟢 9.0/10
├─ Code Examples:         🟢 8.3/10
├─ Resources:             🟢 8.9/10
├─ Persona Balance:       🟢 8.4/10
└─ Link Health:           🟡 7.8/10 ⚠️ 3 redirected links

Define & Automate:        🟡 7.8/10 (18 docs) ⚠️ 3 need attention
├─ Structure:             🟢 8.2/10
├─ Code Examples:         🟡 7.1/10 ⚠️ 2 incomplete
├─ Resources:             🟢 8.5/10
├─ Persona Balance:       🟡 7.5/10 ⚠️ 1 imbalanced
└─ Link Health:           🟢 8.3/10

Design Resilient:         🟢 8.9/10 (12 docs)
├─ Structure:             🟢 9.2/10
├─ Code Examples:         🟢 8.8/10
├─ Resources:             🟢 9.1/10
├─ Persona Balance:       🟢 8.7/10
└─ Link Health:           🟢 8.9/10

Optimize Systems:         🔴 6.5/10 (15 docs) 🚨 5 critical
├─ Structure:             🟡 7.2/10 ⚠️ 2 missing Why sections
├─ Code Examples:         🔴 5.8/10 🚨 3 empty templates
├─ Resources:             🔴 6.1/10 🚨 4 under 5 links
├─ Persona Balance:       🟡 6.8/10 ⚠️ 2 imbalanced
└─ Link Health:           🔴 6.0/10 🚨 8 broken links

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CRITICAL ISSUES (Fix Today)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority: HIGH (5 documents)

1. 🔴 docs/optimize-systems/manage-cost/create-cloud-budgets.mdx
   Issues:
   - Missing "Why" section (structure: 6.0/10)
   - Only 3 resource links (resources: 5.5/10)
   - Code example is empty template (code: 4.0/10)
   
   Quick Fix:
   /check-structure docs/optimize-systems/manage-cost/create-cloud-budgets.mdx --fix
   /add-resources docs/optimize-systems/manage-cost/create-cloud-budgets.mdx
   
   Estimated Time: 20 minutes
   Impact: High (frequently accessed document)

2. 🔴 docs/optimize-systems/scale-resources/containers.mdx
   Issues:
   - 4 broken external links (link health: 5.0/10)
   - Persona imbalance: 75% implementer, 25% decision-maker
   - Code example missing summary
   
   Quick Fix:
   /fix-links docs/optimize-systems/scale-resources/containers.mdx
   /check-code-examples docs/optimize-systems/scale-resources/containers.mdx
   
   Estimated Time: 15 minutes
   Impact: Medium

3. 🔴 docs/optimize-systems/select-design/compute.mdx
   Issues:
   - Only 2 resource links (resources: 4.0/10)
   - No code examples (appropriate for overview doc)
   - 3 vague pronouns at sentence start
   
   Quick Fix:
   /add-resources docs/optimize-systems/select-design/compute.mdx
   /check-structure docs/optimize-systems/select-design/compute.mdx --fix
   
   Estimated Time: 10 minutes
   Impact: High (pillar overview)

4. 🔴 docs/define-and-automate-processes/automate/testing.mdx
   Issues:
   - Code examples incomplete (missing provisioners)
   - Persona imbalance: 30% implementer, 70% decision-maker
   
   Quick Fix:
   /check-code-examples docs/define-and-automate-processes/automate/testing.mdx
   
   Estimated Time: 25 minutes
   Impact: Medium

5. 🔴 docs/secure-systems/data/tokenize-data.mdx
   Issues:
   - 2 broken links to Vault documentation
   - Missing workflow connection to protect-sensitive-data.mdx
   
   Quick Fix:
   /fix-links docs/secure-systems/data/tokenize-data.mdx
   /cross-reference docs/secure-systems/data/tokenize-data.mdx
   
   Estimated Time: 10 minutes
   Impact: Medium

Total Estimated Fix Time: 80 minutes (1.3 hours)

[Quick Actions]
[Fix All Auto-Fixable Issues] [Generate Detailed Report] [Schedule Reviews]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 MEDIUM PRIORITY (This Week)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority: MEDIUM (8 documents)

1. docs/secure-systems/infrastructure/secure-access.mdx
   - Persona balance: 70/30 (too decision-maker heavy)
   - Add code examples or implementation guidance
   - Estimated: 20 minutes

2. docs/define-and-automate-processes/define/modules.mdx
   - 3 redirected links (still work but should update)
   - Estimated: 5 minutes

3. docs/design-resilient-systems/scale-and-tune-performance.mdx
   - Only 4 resource links (add 1-2 more)
   - Estimated: 10 minutes

[View All 8 Medium Priority Items]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ EXCELLENT DOCUMENTS (Learn From These)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Top 5 Performers:

1. 🏆 docs/secure-systems/secrets/store-static-secrets.mdx - 9.5/10
   Why it's great:
   - Perfect Why section with 4 clear challenges
   - 2 complete, realistic code examples with summaries
   - 9 well-organized resource links
   - Excellent persona balance (45/55)
   - All links working and current

2. 🏆 docs/define-and-automate-processes/define/immutable-infrastructure/containers.mdx - 9.3/10
   Why it's great:
   - Strong workflow connections to related docs
   - Complete Packer example with provisioners
   - 8 resource links with perfect formatting
   - Clear decision guidance for tool selection

3. 🏆 docs/design-resilient-systems/failover.mdx - 9.1/10
   Why it's great:
   - Comprehensive Why section
   - Multi-tool integration example (Consul + Nomad)
   - 10 resource links covering full workflow
   - Excellent cross-references

[View All Top Performers]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 QUICK STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Documents by Health:
├─ 🟢 Excellent (9-10):    12 docs (18%)
├─ 🟢 Good (7-8.9):        38 docs (56%)
├─ 🟡 Needs Work (5-6.9):  13 docs (19%)
└─ 🔴 Critical (<5):        5 docs (7%)

Auto-Fixable Issues:       23 issues across 15 documents
Manual Review Needed:      18 issues across 13 documents

Average Scores:
├─ Structure:      8.2/10 ████████░░
├─ Code Examples:  7.6/10 ████████░░
├─ Resources:      8.1/10 ████████░░
├─ Persona:        7.9/10 ████████░░
└─ Links:          7.8/10 ████████░░

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Today (30 minutes):
1. Run auto-fixes on all 15 documents with fixable issues
   Command: /doc-intelligence --fix-auto-fixable
   
2. Fix 3 highest-impact critical issues
   - create-cloud-budgets.mdx (20 min)
   - compute.mdx (10 min)

This Week (2 hours):
1. Complete remaining 2 critical issues
2. Address 8 medium priority documents
3. Update redirected links across all documents

This Month:
1. Quarterly review of all "Needs Work" documents
2. Update content freshness for documents >6 months old
3. Add missing code examples to 3 documents

[Generate Action Plan] [Export Task List] [Schedule Reviews]
```

## Strategic View Output

### Historical Trends and Analytics

```
WAF Documentation Intelligence - Strategic View
════════════════════════════════════════════════
Period: Last 90 Days (Jan 1 - Mar 29, 2026)

📈 QUALITY TREND ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Overall Health Trend:
Jan 1:  7.8/10 ████████░░
Feb 1:  8.0/10 ████████░░ ↗️ +0.2
Mar 1:  8.2/10 █████████░ ↗️ +0.2
Mar 29: 8.2/10 █████████░ → stable

Quarter Progress: +0.4 points (5.1% improvement) ✅
Target: 8.5/10 by Q2 end
Gap: -0.3 points (need 3.7% improvement)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 PILLAR PERFORMANCE TRENDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secure Systems: 8.5/10 (↗️ +0.3 from Jan)
├─ Trend: Steady improvement
├─ Best Month: March (+0.2)
├─ Key Improvements:
│  - Added 12 new resource links
│  - Fixed 8 broken links
│  - Enhanced 3 Why sections
└─ Momentum: 🟢 Strong

Define & Automate: 7.8/10 (↗️ +0.1 from Jan)
├─ Trend: Slow improvement
├─ Best Month: February (+0.1)
├─ Key Improvements:
│  - Added 2 code examples
│  - Fixed persona balance in 2 docs
└─ Momentum: 🟡 Moderate
   ⚠️ Needs attention: Code example quality

Design Resilient: 8.9/10 (↗️ +0.4 from Jan)
├─ Trend: Strong improvement
├─ Best Month: March (+0.3)
├─ Key Improvements:
│  - Complete rewrite of 2 documents
│  - Added multi-tool examples
│  - Enhanced cross-references
└─ Momentum: 🟢 Excellent
   🏆 Best performing pillar

Optimize Systems: 6.5/10 (↓ -0.2 from Jan)
├─ Trend: Declining ⚠️
├─ Worst Month: March (-0.3)
├─ Issues:
│  - 3 documents not updated in 6+ months
│  - New documents added without full review
│  - Link rot (8 broken links)
└─ Momentum: 🔴 Needs intervention
   🚨 Requires immediate attention

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 TOP PERFORMERS (90-Day Average)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. docs/secure-systems/secrets/store-static-secrets.mdx
   Average: 9.5/10 | Trend: Stable | Reviews: 3
   
2. docs/define-and-automate-processes/define/immutable-infrastructure/containers.mdx
   Average: 9.3/10 | Trend: ↗️ +0.2 | Reviews: 2
   
3. docs/design-resilient-systems/failover.mdx
   Average: 9.1/10 | Trend: ↗️ +0.4 | Reviews: 4
   
4. docs/secure-systems/compliance-and-governance/policy-as-code.mdx
   Average: 9.0/10 | Trend: Stable | Reviews: 2
   
5. docs/define-and-automate-processes/deploy/atomic-deployments.mdx
   Average: 8.9/10 | Trend: ↗️ +0.3 | Reviews: 3

Common Success Factors:
✅ Regular updates (reviewed monthly)
✅ Complete code examples with summaries
✅ 8+ resource links, well-organized
✅ Strong cross-references to related docs
✅ Balanced persona coverage (40-50% / 50-60%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📉 DOCUMENTS NEEDING ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Declining Quality (↓ >0.5 points):

1. docs/optimize-systems/manage-cost/create-cloud-budgets.mdx
   Jan: 7.2/10 → Mar: 6.0/10 (↓ -1.2) 🚨
   Issues: Content not updated, links broken, example outdated
   
2. docs/optimize-systems/scale-resources/containers.mdx
   Jan: 7.5/10 → Mar: 6.5/10 (↓ -1.0) 🚨
   Issues: External links broken, persona imbalance worsened

Stagnant (No improvement in 90 days):

1. docs/secure-systems/infrastructure/secure-access.mdx
   Stable at 7.2/10 for 90 days
   Opportunity: Add implementation examples
   
2. docs/optimize-systems/select-design/database.mdx
   Stable at 7.0/10 for 90 days
   Opportunity: Enhance resource links

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CATEGORY PERFORMANCE TRENDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Structure Quality:
Jan: 8.0/10 → Mar: 8.2/10 (↗️ +0.2)
├─ Why sections: 15 improved, 2 added
├─ Heading case: 23 fixed
└─ List intros: 18 fixed

Code Example Quality:
Jan: 7.2/10 → Mar: 7.6/10 (↗️ +0.4)
├─ Complete examples: +8
├─ Summaries added: +12
└─ Empty templates removed: -5

Resource Link Quality:
Jan: 7.8/10 → Mar: 8.1/10 (↗️ +0.3)
├─ New links added: +34
├─ Broken links fixed: +15
├─ Formatting improved: 28 docs
└─ Average links per doc: 6.2 → 7.1

Persona Balance:
Jan: 7.7/10 → Mar: 7.9/10 (↗️ +0.2)
├─ Balanced docs: 52 → 55
├─ Imbalanced fixed: 3
└─ Average balance: 43/57 → 44/56

Link Health:
Jan: 7.5/10 → Mar: 7.8/10 (↗️ +0.3)
├─ Broken links fixed: 23
├─ Redirects updated: 12
└─ New links validated: 34

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ REVIEW EFFICIENCY METRICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Average Review Time:
Jan: 25 minutes/doc
Feb: 22 minutes/doc (↓ -12%)
Mar: 18 minutes/doc (↓ -18%)
Improvement: -28% (7 minutes saved per doc)

Auto-Fix Success Rate:
Jan: 45% of issues auto-fixed
Feb: 58% of issues auto-fixed (↗️ +13%)
Mar: 65% of issues auto-fixed (↗️ +7%)
Improvement: +20 percentage points

Manual Review Focus:
Jan: 55% time on mechanical fixes
Feb: 42% time on mechanical fixes
Mar: 35% time on mechanical fixes
Result: More time for content quality review

Documents Reviewed:
Jan: 12 documents
Feb: 18 documents (+50%)
Mar: 23 documents (+28%)
Total Q1: 53 document reviews

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 GOAL TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1 2026 Goals:

1. Overall Health: 8.5/10
   Current: 8.2/10
   Progress: 80% (4 of 5 points gained)
   Status: 🟡 On track but needs push

2. All Pillars >7.5/10
   Current: 3 of 4 pillars meet target
   Progress: 75%
   Status: 🟡 Optimize Systems needs work

3. Zero Critical Issues
   Current: 5 critical issues
   Progress: 50% (10 → 5 critical issues)
   Status: 🟡 Improving but not met

4. 90% Auto-Fix Rate
   Current: 65% auto-fix rate
   Progress: 72% (65 of 90 points)
   Status: 🔴 Behind target

5. <20 min Average Review Time
   Current: 18 minutes
   Progress: 100% ✅
   Status: 🟢 Goal achieved!

Q2 2026 Targets:
- Overall health: 8.7/10
- All pillars >8.0/10
- Zero critical issues maintained
- 75% auto-fix rate
- <15 min average review time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 INSIGHTS & RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key Findings:

1. 🟢 Strong Overall Improvement
   - 5.1% quality increase in Q1
   - Review efficiency up 28%
   - More documents reviewed (+92%)

2. 🔴 Optimize Systems Pillar Declining
   - Only pillar with negative trend
   - Root cause: Lack of regular reviews
   - Action: Schedule monthly reviews

3. 🟢 Code Examples Improving
   - +0.4 points improvement
   - More complete examples added
   - Summaries becoming standard

4. 🟡 Auto-Fix Rate Below Target
   - 65% vs 90% goal
   - Many issues require content judgment
   - Opportunity: Enhance automation

5. 🟢 Review Time Significantly Reduced
   - 28% faster reviews
   - Goal achieved ahead of schedule
   - Skills system working well

Strategic Recommendations:

1. Immediate (This Week):
   - Focus on Optimize Systems pillar
   - Fix 5 critical issues
   - Schedule monthly pillar reviews

2. Short-term (This Month):
   - Enhance auto-fix capabilities
   - Add more code example templates
   - Update stagnant documents

3. Long-term (This Quarter):
   - Maintain momentum in top pillars
   - Achieve 8.5/10 overall health
   - Reduce critical issues to zero
   - Improve auto-fix rate to 75%

[Export Executive Summary] [Generate Action Plan] [Set Q2 Goals]
```

## Integration with Other Skills

**Tactical view uses:**
- `/check-structure` - Structure validation
- `/check-code-examples` - Code quality
- `/check-resources` - Resource links
- `/check-hashicorp-style` - Style compliance
- `/persona-coverage` - Persona balance
- `/validate-links` - Link health

**Strategic view tracks:**
- Historical scores from all validation skills
- Review frequency and efficiency
- Improvement trends over time
- Goal progress

**Workflow integration:**
```bash
# Morning routine: Check what needs attention
/doc-intelligence --view tactical

# Fix critical issues
/doc-intelligence --fix-auto-fixable

# Weekly review: Check progress
/doc-intelligence --view strategic --period 7d

# Monthly planning: Full analysis
/doc-intelligence --view full --period 30d --summary
```

## JSON Output Format

```json
{
  "generated_at": "2026-01-29T04:44:00Z",
  "view": "tactical",
  "overall_health": {
    "score": 8.2,
    "status": "good",
    "total_documents": 68,
    "last_updated": "2 hours ago"
  },
  "pillars": {
    "secure-systems": {
      "score": 8.5,
      "status": "good",
      "document_count": 23,
      "categories": {
        "structure": 9.0,
        "code_examples": 8.3,
        "resources": 8.9,
        "persona_balance": 8.4,
        "link_health": 7.8
      },
      "issues": {
        "critical": 0,
        "medium": 1,
        "low": 2
      }
    }
  },
  "critical_issues": [
    {
      "priority": "high",
      "document": "docs/optimize-systems/manage-cost/create-cloud-budgets.mdx",
      "issues": [
        {
          "type": "structure",
          "severity": "critical",
          "description": "Missing Why section",
          "score_impact": -4.0
        },
        {
          "type": "resources",
          "severity": "critical",
          "description": "Only 3 resource links",
          "score_impact": -2.5
        }
      ],
      "quick_fixes": [
        "/check-structure docs/optimize-systems/manage-cost/create-cloud-budgets.mdx --fix",
        "/add-resources docs/optimize-systems/manage-cost/create-cloud-budgets.mdx"
      ],
      "estimated_time_minutes": 20,
      "impact": "high"
    }
  ],
  "quick_stats": {
    "by_health": {
      "excellent": 12,
      "good": 38,
      "needs_work": 13,
      "critical": 5
    },
    "auto_fixable_issues": 23,
    "manual_review_needed": 18
  }
}
```

## When to Use This Skill

Use `/doc-intelligence` when:
- ✅ Starting your day (tactical view for priorities)
- ✅ Planning weekly work (tactical view for task list)
- ✅ Monthly reviews (strategic view for trends)
- ✅ Quarterly planning (strategic view with goals)
- ✅ Executive reporting (strategic summary)
- ✅ Identifying improvement opportunities
- ✅ Tracking documentation health over time

Don't use when:
- ❌ Need detailed document review (use `/review-doc`)
- ❌ Need specific validation (use targeted skills)
- ❌ Working on single document (use document-specific skills)

## Best Practices

1. **Check tactical view daily** - Stay on top of critical issues
2. **Review strategic view weekly** - Track progress and trends
3. **Use JSON output for automation** - Integrate with CI/CD
4. **Set realistic goals** - Based on historical trends
5. **Focus on high-impact fixes** - Prioritize by impact × effort
6. **Learn from top performers** - Replicate success patterns
7. **Address declining trends early** - Prevent quality erosion

## Reference

This skill aggregates data from:
- **AGENTS.md** - Documentation standards
- **templates/REVIEW_PHASES.md** - Review criteria
- All validation skills (structure, code, resources, style, links)
- Historical review data

## Notes

- Tactical view is real-time (current state)
- Strategic view requires historical data (may be limited initially)
- Scores are calculated using weighted averages from validation skills
- Auto-fixable issues can be addressed with `--fix-auto-fixable` flag
- JSON output enables integration with external dashboards
- Executive summaries focus on trends and recommendations