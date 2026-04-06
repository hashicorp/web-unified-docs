# Quick Wins — Highest ROI Fixes

Documents with **high search traffic potential** but **poor WAF alignment**. Fixing these gives you the biggest bang for your effort.

**Generated:** 2026-03-31
**Documents analyzed:** 119 (index pages excluded, already-aligned docs filtered out)

## Scoring System

The ROI score combines two existing scores to surface high-impact, low-effort improvements.

| Component | Source | What It Means |
|-----------|--------|---------------|
| **SEO Value** | Keyword cluster matching | How much search traffic this topic could attract (see SEO Value report for full methodology) |
| **WAF Gap** | 100 − WAF Alignment score | How far the document is from meeting WAF standards (see WAF Alignment report for criteria) |

**Formula:** `ROI = SEO Value × WAF Gap ÷ 100`

A high ROI means: popular topic (high SEO) + lots of room for improvement (high gap). Documents already scoring 90+ on WAF alignment are excluded.

**How to use this list:**
1. Pick a document from the top of the list
2. Check the "Issues" column — these are the specific fixes needed
3. Most fixes are structural: add a Why section, add resource links, expand thin content
4. After fixing, re-run `/review-doc` to verify alignment improved

## Rankings

| Rank | ROI | SEO | WAF | Pillar | Title | Issues |
|------|-----|-----|-----|--------|-------|--------|
| 1 | **26** | 43 | 40 | Define & Automate | cicd.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources |
| 2 | **24** | 40 | 40 | Define & Automate | orchestration.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources |
| 3 | **18** | 37 | 50 | Define & Automate | cicd.mdx | Missing Why section; No HashiCorp resources; Thin: 307 words |
| 4 | **15** | 30 | 50 | Define & Automate | monitoring.mdx | Missing Why section; Only 2 H2 headings; Only 3 resource links (need 5+) |
| 5 | **14** | 45 | 70 | Secure | manage-tls-iac.mdx | Missing Why section; Only 1 resource links (need 5+) |
| 6 | **12** | 25 | 50 | Define & Automate | security.mdx | Missing Why section; Only 2 H2 headings; Only 3 resource links (need 5+) |
| 7 | **12** | 30 | 60 | Define & Automate | containers.mdx | Missing Why section; Only 2 H2 headings; Thin: 385 words |
| 8 | **12** | 26 | 55 | Design Resilient | secure-distributed-systems.mdx | Missing Why section; No HashiCorp resources; Vague pronoun starts |
| 9 | **12** | 27 | 55 | Optimize | containers.mdx | Missing Why section; No HashiCorp resources; Vague pronoun starts |
| 10 | **12** | 25 | 50 | Secure | policy-as-code.mdx | Missing Why section; Only 2 H2 headings; Only 4 resource links (need 5+) |
| 11 | **11** | 25 | 55 | Optimize | detect-cloud-spending-anomalies.mdx | Missing Why section; Only 2 H2 headings; Thin: 309 words |
| 12 | **11** | 38 | 70 | Secure | gitlab.mdx | Missing Why section; Only 2 H2 headings |
| 13 | **11** | 31 | 65 | Secure | jenkins.mdx | Missing Why section; No HashiCorp resources |
| 14 | **10** | 26 | 60 | Define & Automate | manage-cloud-native.mdx | Missing Why section; Only 2 H2 headings; Thin: 266 words |
| 15 | **10** | 29 | 65 | Design Resilient | disaster-recovery.mdx | Missing Why section; No HashiCorp resources |
| 16 | **9** | 18 | 50 | Define & Automate | service-mesh.mdx | Missing Why section; Only 2 H2 headings; Only 2 resource links (need 5+) |
| 17 | **9** | 25 | 65 | Design Resilient | failover.mdx | Missing Why section; No HashiCorp resources |
| 18 | **9** | 35 | 75 | Optimize | decommission-infrastructure.mdx | Missing Why section; Only 1 resource links (need 5+) |
| 19 | **9** | 22 | 60 | Secure | build-certificate-authority.mdx | Missing Why section; Only 2 H2 headings; Thin: 352 words |
| 20 | **8** | 15 | 50 | Define & Automate | database.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources |
| 21 | **8** | 56 | 85 | Design Resilient | design-control-data-management-plane.mdx | Missing Why section |
| 22 | **8** | 30 | 75 | Optimize | tag-cloud-resources.mdx | Missing Why section; Only 4 resource links (need 5+) |
| 23 | **7** | 24 | 70 | Define & Automate | manage-secrets.mdx | Missing Why section; Only 2 H2 headings |
| 24 | **7** | 19 | 65 | Design Resilient | distributed-systems.mdx | Missing Why section; No HashiCorp resources |
| 25 | **6** | 19 | 70 | Define & Automate | manage-vendor.mdx | Missing Why section; Only 2 H2 headings |
| 26 | **6** | 18 | 65 | Design Resilient | scale-and-tune-performance.mdx | Missing Why section; No HashiCorp resources |
| 27 | **6** | 30 | 80 | Optimize | data-management.mdx | Missing Why section |
| 28 | **6** | 30 | 80 | Optimize | create-cloud-budgets.mdx | Missing Why section |
| 29 | **6** | 41 | 85 | Secure | store-static-secrets.mdx | Missing Why section |
| 30 | **6** | 28 | 80 | Secure | authenticate-workloads-tls.mdx | Missing Why section |