# Top 50 WAF Documents Needing Alignment Work

Ranked by how much work is needed to align with WAF documentation standards. Documents at the top need the most improvement.

**Generated:** 2026-03-31
**Documents scanned:** 119 (107 non-index)

## Scoring System

Each document starts at **100 points**. Points are subtracted for missing or weak elements that WAF standards require. A bonus is awarded for exemplary patterns.

| Check | Penalty | What It Checks |
|-------|---------|----------------|
| Why section | −15 | Document has a `## Why` heading explaining strategic value |
| H2 headings | −10 | Fewer than 3 H2 headings (insufficient structure for the topic) |
| HashiCorp resources | −20 | No `## HashiCorp resources` section at all |
| Resource link count | −10 | Has resources section but fewer than 5 links |
| Content depth | −15 | Under 400 words (thin content). −5 if 400–700 words |
| Next steps section | −5 | No `## Next steps` section to guide readers forward |
| Meta description | −10 | No frontmatter `description`. −5 if under 50 characters |
| Vague pronouns | −5 | 3+ sentences starting with "This", "That", or "It" |
| Bold challenges | +5 | **Bonus:** Why section uses `**Challenge:** Description` pattern |

**Score interpretation:**
- **90–105:** Well-aligned — minor polish needed at most
- **75–89:** Good shape — 1–2 structural elements to add
- **60–74:** Needs work — missing multiple WAF requirements
- **Below 60:** Major rewrite — missing core structural elements

## Rankings

| Rank | Score | Pillar | Title | Issues | Words | Resources |
|------|-------|--------|-------|--------|-------|-----------|
| 1 | 35 | Define & Automate | recognition.mdx | Missing Why section; Only 1 H2 headings; No HashiCorp resources; Thin: 277 words | 277 | 0 |
| 2 | 40 | Define & Automate | sense-of-ownership.mdx | Missing Why section; Only 1 H2 headings; No HashiCorp resources; Thin: 228 words | 228 | 0 |
| 3 | 40 | Define & Automate | cicd.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources; Thin: 378 words | 378 | 0 |
| 4 | 40 | Define & Automate | orchestration.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources; Thin: 288 words | 288 | 0 |
| 5 | 45 | Define & Automate | collaboration.mdx | Missing Why section; No HashiCorp resources; Thin: 383 words; Weak meta description | 383 | 0 |
| 6 | 50 | Define & Automate | cicd.mdx | Missing Why section; No HashiCorp resources; Thin: 307 words | 307 | 0 |
| 7 | 50 | Define & Automate | communication.mdx | Missing Why section; Only 2 H2 headings; Only 1 resource links (need 5+); Thin: 244 words | 244 | 1 |
| 8 | 50 | Define & Automate | database.mdx | Missing Why section; Only 2 H2 headings; No HashiCorp resources | 472 | 0 |
| 9 | 50 | Define & Automate | monitoring.mdx | Missing Why section; Only 2 H2 headings; Only 3 resource links (need 5+); Thin: 203 words | 203 | 3 |
| 10 | 50 | Define & Automate | security.mdx | Missing Why section; Only 2 H2 headings; Only 3 resource links (need 5+); Thin: 298 words | 298 | 3 |
| 11 | 50 | Define & Automate | development-environment.mdx | Missing Why section; Only 2 H2 headings; Only 2 resource links (need 5+); Thin: 203 words | 203 | 2 |
| 12 | 50 | Define & Automate | service-mesh.mdx | Missing Why section; Only 2 H2 headings; Only 2 resource links (need 5+); Thin: 275 words | 275 | 2 |
| 13 | 50 | Secure | policy-as-code.mdx | Missing Why section; Only 2 H2 headings; Only 4 resource links (need 5+); Thin: 322 words | 322 | 4 |
| 14 | 55 | Design Resilient | secure-distributed-systems.mdx | Missing Why section; No HashiCorp resources; Vague pronoun starts | 603 | 0 |
| 15 | 55 | Optimize | detect-cloud-spending-anomalies.mdx | Missing Why section; Only 2 H2 headings; Thin: 309 words; No Next steps section | 309 | 9 |
| 16 | 55 | Optimize | detect-configuration-drift.mdx | Missing Why section; No HashiCorp resources; Vague pronoun starts | 642 | 0 |
| 17 | 55 | Optimize | containers.mdx | Missing Why section; No HashiCorp resources; Vague pronoun starts | 698 | 0 |
| 18 | 55 | Secure | rotate.mdx | Missing Why section; Only 2 H2 headings; Thin: 306 words; Weak meta description | 306 | 7 |
| 19 | 60 | Define & Automate | continuous-learning.mdx | Missing Why section; Only 2 H2 headings; Thin: 319 words | 319 | 6 |
| 20 | 60 | Define & Automate | workflows-not-technologies.mdx | Missing Why section; No HashiCorp resources | 438 | 0 |
| 21 | 60 | Define & Automate | manage-cloud-native.mdx | Missing Why section; Only 2 H2 headings; Thin: 266 words | 266 | 6 |
| 22 | 60 | Define & Automate | containers.mdx | Missing Why section; Only 2 H2 headings; Thin: 385 words | 385 | 7 |
| 23 | 60 | Optimize | identify-metrics.mdx | Missing Why section; No HashiCorp resources | 612 | 0 |
| 24 | 60 | Optimize | plan.mdx | Missing Why section; Only 2 H2 headings; Thin: 252 words | 252 | 8 |
| 25 | 60 | Secure | document-shared-responsibilities.mdx | Missing Why section; No HashiCorp resources | 480 | 0 |
| 26 | 60 | Secure | build-certificate-authority.mdx | Missing Why section; Only 2 H2 headings; Thin: 352 words | 352 | 8 |
| 27 | 65 | Design Resilient | failover.mdx | Missing Why section; No HashiCorp resources | 744 | 0 |
| 28 | 65 | Design Resilient | plan-for-resilience.mdx | Missing Why section; No HashiCorp resources | 745 | 0 |
| 29 | 65 | Design Resilient | disaster-recovery.mdx | Missing Why section; No HashiCorp resources | 814 | 0 |
| 30 | 65 | Design Resilient | distributed-systems.mdx | Missing Why section; No HashiCorp resources | 803 | 0 |
| 31 | 65 | Design Resilient | scale-and-tune-performance.mdx | Missing Why section; No HashiCorp resources | 933 | 0 |
| 32 | 65 | Optimize | monitor-network.mdx | Missing Why section; No HashiCorp resources | 738 | 0 |
| 33 | 65 | Optimize | servers.mdx | Missing Why section; No HashiCorp resources | 728 | 0 |
| 34 | 65 | Secure | jenkins.mdx | Missing Why section; No HashiCorp resources | 837 | 0 |
| 35 | 70 | Define & Automate | writing.mdx | Missing Why section; Thin: 359 words | 359 | 5 |
| 36 | 70 | Define & Automate | manage-vendor.mdx | Missing Why section; Only 2 H2 headings | 495 | 10 |
| 37 | 70 | Define & Automate | manage-secrets.mdx | Missing Why section; Only 2 H2 headings | 431 | 6 |
| 38 | 70 | Secure | manage-tls-iac.mdx | Missing Why section; Only 1 resource links (need 5+) | 464 | 1 |
| 39 | 70 | Secure | gitlab.mdx | Missing Why section; Only 2 H2 headings | 525 | 9 |
| 40 | 75 | Optimize | decommission-infrastructure.mdx | Missing Why section; Only 1 resource links (need 5+) | 1134 | 1 |
| 41 | 75 | Optimize | tag-cloud-resources.mdx | Missing Why section; Only 4 resource links (need 5+) | 742 | 4 |
| 42 | 75 | Secure | tokenize-data.mdx | Only 2 resource links (need 5+); Thin: 285 words | 285 | 2 |
| 43 | 80 | Optimize | data-management.mdx | Missing Why section | 502 | 6 |
| 44 | 80 | Optimize | create-cloud-budgets.mdx | Missing Why section | 629 | 8 |
| 45 | 80 | Secure | audit-trails.mdx | Missing Why section | 498 | 6 |
| 46 | 80 | Secure | authenticate-workloads-tls.mdx | Missing Why section | 648 | 6 |
| 47 | 80 | Secure | validate-software-integrity.mdx | Missing Why section | 691 | 15 |
| 48 | 85 | Define & Automate | vm.mdx | Missing Why section | 990 | 9 |
| 49 | 85 | Design Resilient | design-control-data-management-plane.mdx | Missing Why section | 2273 | 18 |
| 50 | 85 | Secure | build-culture-security.mdx | Missing Why section | 831 | 6 |

## Score Distribution

| Tier | Count | % |
|------|-------|---|
| 90-105 (Well-aligned) | 52 | 48% ████████████████████████ |
| 75-89 (Good) | 16 | 14% ███████ |
| 60-74 (Needs work) | 21 | 19% █████████ |
| Below 60 (Major rewrite) | 18 | 16% ████████ |