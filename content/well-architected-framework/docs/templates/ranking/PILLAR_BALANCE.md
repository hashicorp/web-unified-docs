# Pillar Balance Report — Coverage Gaps

Compares breadth, depth, and quality across all four WAF pillars. Highlights imbalances that signal content gaps.

**Generated:** 2026-03-31
**Total documents:** 119

## Scoring System

This report does not use a single numeric score. Instead, it compares **6 metrics** across pillars to surface imbalances.

| Metric | What It Measures | Why It Matters |
|--------|------------------|----------------|
| **Content pages** | Non-index documents in the pillar | Raw coverage breadth — how many topics the pillar addresses |
| **Total words** | Sum of all document word counts | Content investment — how much depth exists across the pillar |
| **Avg words** | Total words ÷ document count | Per-document depth — are docs thorough or thin? |
| **With Why** | Documents containing a Why section | Strategic value — how many docs explain business justification |
| **With Code** | Documents containing code blocks | Implementer value — how many docs include actionable examples |
| **With Resources** | Documents with HashiCorp resources section | Learning paths — how many docs guide readers to next steps |

**How to read the summary table:** Compare each pillar's row. Large gaps between pillars (e.g., 7 content pages vs 46) signal areas needing investment. The subsection breakdown shows where within a pillar the gaps are.

**How to read subsection tables:** `Has Why %` and `Has Resources %` show what fraction of docs in each subsection meet those WAF requirements. 0% = none of the docs have it.

## Summary

| Pillar | Content Pages | Index Pages | Total Words | Avg Words | With Why | With Code | With Resources |
|--------|--------------|-------------|-------------|-----------|----------|-----------|----------------|
| Define & Automate | 40 | 7 | 35675 | 759 | 23 | 20 | 34 |
| Design Resilient | 7 | 1 | 7731 | 966 | 1 | 0 | 1 |
| Optimize | 14 | 1 | 12687 | 845 | 4 | 8 | 9 |
| Secure | 46 | 3 | 39781 | 811 | 34 | 11 | 45 |

## Subsection Breakdown

### Define & Automate

| Subsection | Docs | Total Words | Avg Words | Has Why % | Has Resources % |
|------------|------|-------------|-----------|-----------|-----------------|
| Automate | 4 | 3710 | 927 | 75% | 75% |
| Build Culture | 8 | 2461 | 307 | 0% | 50% |
| Define | 17 | 12438 | 731 | 64% | 82% |
| Deploy | 5 | 4864 | 972 | 100% | 80% |
| Monitor | 8 | 3476 | 434 | 0% | 75% |
| Process Automation | 4 | 6853 | 1713 | 75% | 75% |

### Design Resilient

| Subsection | Docs | Total Words | Avg Words | Has Why % | Has Resources % |
|------------|------|-------------|-----------|-----------|-----------------|
| Principles | 2 | 1617 | 808 | 0% | 0% |

### Optimize

| Subsection | Docs | Total Words | Avg Words | Has Why % | Has Resources % |
|------------|------|-------------|-----------|-----------|-----------------|
| Lifecycle Management | 3 | 2378 | 792 | 0% | 100% |
| Manage Cost | 2 | 938 | 469 | 0% | 100% |
| Monitor System Health | 3 | 1992 | 664 | 0% | 0% |
| Scale Resources | 3 | 1678 | 559 | 0% | 33% |
| Select Design | 3 | 4946 | 1648 | 100% | 100% |

### Secure

| Subsection | Docs | Total Words | Avg Words | Has Why % | Has Resources % |
|------------|------|-------------|-----------|-----------|-----------------|
| Compliance And Governance | 3 | 1300 | 433 | 0% | 66% |
| Data | 5 | 3512 | 702 | 100% | 100% |
| Identity Access Management | 7 | 6197 | 885 | 100% | 100% |
| Infrastructure | 6 | 5332 | 888 | 50% | 100% |
| Secrets | 7 | 7741 | 1105 | 85% | 100% |
| Secure Applications | 19 | 14180 | 746 | 63% | 89% |

## Key Gaps

- **Design Resilient** has only 7 content pages (average across pillars: 27). Major content gap.
- **Optimize** has 14 content pages (average: 27). Below average coverage.
- **Define & Automate**: Only 48% of docs have a Why section.
- **Design Resilient**: Only 12% of docs have a Why section.
- **Design Resilient**: Only 12% have a HashiCorp resources section.
- **Optimize**: Only 26% of docs have a Why section.

## Expected Topics vs Coverage

Topics that industry WAF frameworks typically cover. Missing topics may represent content gaps.

**Define & Automate** — potentially missing:
- ci/cd pipelines
- module development
- state management
- drift detection
- deployment strategies
- image building

**Design Resilient** — potentially missing:
- auto-scaling
- load balancing
- health checks
- backup strategies
- multi-region
- chaos engineering

**Optimize** — potentially missing:
- cost optimization
- performance tuning
- resource right-sizing
- observability
- network optimization
- storage optimization
- workload scheduling

**Secure** — potentially missing:
- encryption
- certificate management
- vulnerability management
