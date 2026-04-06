---
name: content-opportunity-report
description: Generate a ranked report of the top content opportunities (new articles) for each WAF pillar based on competitor analysis, SEO value, and HashiCorp tool relevance.
argument-hint: [--pillars <all|pillar-name>] [--top 10] [--competitors <aws,azure>] [--tools <terraform,vault,...>]
---

# Content Opportunity Report Skill

Generates a ranked report of the highest-value new articles to add to each WAF pillar. Combines competitor WAF gap analysis, SEO traffic potential, and HashiCorp tool relevance to identify content opportunities.

## Arguments

- **--pillars**: Which pillars to analyze. Options:
  - `all` — all four pillars (default)
  - Specific pillar name (e.g., `design-resilient-systems`, `secure-systems`)
- **--top**: Number of top opportunities per pillar (default: 10)
- **--competitors**: Competitor WAFs to benchmark against, comma-separated (default: `aws,azure`)
  - `aws` — AWS Well-Architected Framework (6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability)
  - `azure` — Azure Well-Architected Framework (5 pillars: Reliability, Security, Cost Optimization, Operational Excellence, Performance Efficiency)
  - `gcp` — Google Cloud Architecture Framework
- **--tools**: HashiCorp tools to consider for relevance scoring, comma-separated (default: `terraform,vault,consul,packer,nomad,boundary`)
- **--output**: Output path for the report (default: prints to terminal)

## How It Works

### Step 1: Inventory existing WAF content

Glob for all `.mdx` files across the specified pillar(s). Extract title, description, and H2 headings from frontmatter and content. Build a topic coverage map.

### Step 2: Analyze competitor WAF coverage

For each competitor framework specified:

1. **Fetch pillar pages** from the competitor WAF using web_fetch
2. **Extract topic areas** — best practices, design principles, checklists
3. **Map to HashiCorp pillars** using the following mapping:

**AWS → HashiCorp pillar mapping:**
| AWS Pillar | HashiCorp Pillar |
|---|---|
| Operational Excellence | Define and Automate Processes |
| Security | Secure Systems |
| Reliability | Design Resilient Systems |
| Performance Efficiency | Optimize Systems |
| Cost Optimization | Optimize Systems |
| Sustainability | Optimize Systems |

**Azure → HashiCorp pillar mapping:**
| Azure Pillar | HashiCorp Pillar |
|---|---|
| Operational Excellence | Define and Automate Processes |
| Security | Secure Systems |
| Reliability | Design Resilient Systems |
| Cost Optimization | Optimize Systems |
| Performance Efficiency | Optimize Systems |

### Step 3: Identify gaps

Compare competitor topic coverage against existing HashiCorp WAF content. A gap exists when:
- A competitor covers a topic that HashiCorp WAF does not
- A topic is covered by BOTH competitors but not HashiCorp (higher priority)
- A topic has known high search volume but no HashiCorp coverage

### Step 4: Score each opportunity

Each candidate article is scored on 5 dimensions (0-20 each, max 100):

| Factor | Weight | What It Measures |
|---|---|---|
| **Competitor Coverage** | 0-20 | How many competitor WAFs cover this topic. Both = 20, one = 10. Topics in competitor "best practices" sections score higher than peripheral mentions. |
| **SEO Traffic Potential** | 0-20 | Estimated search volume for the topic. Uses keyword cluster matching against known high-volume terms (infrastructure as code, zero trust, secrets management, cloud security, cost optimization, CI/CD, etc.) |
| **HashiCorp Tool Fit** | 0-20 | How naturally HashiCorp tools solve this problem. Score based on: direct tool feature (20), strong integration (15), supporting role (10), tangential (5). Multiple tools = bonus. |
| **Pillar Balance Impact** | 0-20 | How much this article helps balance the pillar. Smaller pillars (Design Resilient = 8 articles) get higher scores than larger ones (Secure = 60 articles). |
| **Persona Value** | 0-20 | How well this topic serves both WAF personas. Topics that serve decision-makers AND implementers score highest. Decision-maker only or implementer only score lower. |

### Step 5: Check existing resources

Before finalizing, check `/Users/cjobermaier/workspace/waf-resources/ranking/` for any prior analysis:
- `CONTENT_GAPS.md` — previously identified gaps
- `SEO_VALUE_RANKING.md` — SEO scoring data
- `PILLAR_BALANCE.md` — pillar coverage imbalances
- `QUICK_WINS.md` — high-ROI opportunities

Incorporate prior analysis to validate and refine recommendations.

### Step 6: Generate report

Output a markdown report with the following structure:

```markdown
# WAF Content Opportunity Report

**Generated:** {date}
**Pillars analyzed:** {list}
**Competitors benchmarked:** {list}
**Tools considered:** {list}

## Executive Summary
- Total opportunities identified: N
- Highest-value pillar for new content: {pillar}
- Top 3 cross-pillar themes: {themes}

## Methodology
Brief description of scoring approach.

## {Pillar Name}

### Current State
- Existing articles: N
- Competitor comparison: AWS covers X topics, Azure covers Y topics
- Biggest gaps: {themes}

### Top 10 Opportunities

| Rank | Score | Article Title | Why It Matters | HashiCorp Tools | Competitor Coverage |
|------|-------|---------------|----------------|-----------------|---------------------|

### Detailed Justifications

#### 1. {Article Title} (Score: XX/100)

**Topic:** Brief description of what this article would cover.

**Why this ranks high:**
- **Competitor coverage (X/20):** {explanation}
- **SEO potential (X/20):** {explanation}
- **Tool fit (X/20):** {explanation}
- **Pillar balance (X/20):** {explanation}
- **Persona value (X/20):** {explanation}

**Suggested outline:**
- What the article should cover at a high level
- Which HashiCorp tools to feature
- Key resources to link to

**Target personas:** Decision-maker / Implementer / Both

(repeat for each opportunity)
```

## Competitor WAF URLs

### AWS Well-Architected Framework
- Main: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html
- Pillars: https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html
- Operational Excellence: https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html
- Security: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html
- Reliability: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html
- Performance Efficiency: https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html
- Cost Optimization: https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html
- Sustainability: https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html

### Azure Well-Architected Framework
- Main: https://learn.microsoft.com/en-us/azure/well-architected/
- Pillars: https://learn.microsoft.com/en-us/azure/well-architected/pillars
- Reliability: https://learn.microsoft.com/en-us/azure/well-architected/reliability/
- Security: https://learn.microsoft.com/en-us/azure/well-architected/security/
- Cost Optimization: https://learn.microsoft.com/en-us/azure/well-architected/cost-optimization/
- Operational Excellence: https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/
- Performance Efficiency: https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/

## High-Volume Keyword Clusters (for SEO scoring)

These keyword clusters represent high-search-volume topics relevant to WAF content:

**Mega volume (50K+ monthly):**
- infrastructure as code, terraform, cloud security, kubernetes, CI/CD, DevOps

**High volume (10K-50K):**
- zero trust, secrets management, cost optimization cloud, cloud compliance, disaster recovery, auto-scaling, network security, configuration management

**Medium volume (1K-10K):**
- policy as code, service mesh, immutable infrastructure, blue-green deployment, chaos engineering, platform engineering, cloud governance, FinOps, supply chain security, infrastructure drift, certificate management

**Niche but growing (100-1K):**
- golden paths, developer experience platform, internal developer platform, infrastructure testing, observability pipeline, cloud decommissioning

## Notes

- This skill should be re-run quarterly as competitor WAFs evolve and search trends shift
- The waf-resources/ranking/ directory contains supporting data that improves accuracy
- Articles recommended by this skill should be validated against the WAF content strategy in AGENTS.md before creation
- Use `/create-doc` to scaffold new articles from this report's recommendations
