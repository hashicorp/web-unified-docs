# Content Gap Analysis — Missing WAF Topics

Compares WAF coverage against **industry-standard Well-Architected topics** from AWS, Azure, and GCP frameworks. Identifies topics users expect to find but we don't cover.

**Generated:** 2026-03-31
**Expected topics checked:** 28
**Currently covered:** 18
**Gaps identified:** 10

## Scoring System

This report checks whether each expected topic is covered somewhere in the WAF documentation.

| Step | What Happens |
|------|-------------|
| **1. Define expected topics** | 28 topics were compiled from AWS Well-Architected Framework pillars, Azure Well-Architected Framework, and GCP Architecture Framework best practices. Each topic is assigned a best-fit WAF pillar and an estimated search volume tier. |
| **2. Keyword matching** | Each topic title is split into keywords. We search all document titles, descriptions, and H2 headings for those keywords. |
| **3. Coverage threshold** | If 60%+ of a topic's keywords appear across WAF content, it is marked as "covered." Below 60% = gap. |
| **4. Prioritization** | Gaps are sorted by estimated search volume (High > Medium > Low). High-volume gaps represent the biggest missed opportunities. |

**Search volume tiers:**
- 🔴 **High** — Thousands of monthly searches. Competitors (AWS, Azure, GCP) have dedicated pages for these topics.
- 🟡 **Medium** — Hundreds of monthly searches. Important for practitioners but more niche.
- ⚪ **Low** — Emerging or specialized topics.

**Limitations:** Keyword matching may miss documents that cover a topic under a different name (e.g., "drift detection" covered as "configuration consistency"). Review gaps manually before treating them as confirmed.

## Gaps — Topics to Create

| Priority | Search Vol | Best Pillar | Topic | What to Cover |
|----------|-----------|-------------|-------|---------------|
| 1 | 🔴 High | Design Resilient | Auto-scaling infrastructure | Dynamic scaling based on demand, scaling policies, predictive scaling |
| 2 | 🔴 High | Secure | Network segmentation | Micro-segmentation, security groups, network policies |
| 3 | 🔴 High | Secure | Vulnerability management | Scanning, patching, CVE tracking, remediation workflows |
| 4 | 🔴 High | Secure | Compliance frameworks | SOC2, HIPAA, PCI-DSS, FedRAMP mapping to infrastructure controls |
| 5 | 🔴 High | Define & Automate | Platform engineering | Internal developer platforms, self-service, golden paths |
| 6 | 🟡 Medium | Design Resilient | Chaos engineering | Failure injection, resilience testing, game days |
| 7 | 🟡 Medium | Secure | Supply chain security | SBOM, artifact signing, provenance verification |
| 8 | 🟡 Medium | Define & Automate | Runbook automation | Automated remediation, self-healing, operational playbooks |
| 9 | 🟡 Medium | Define & Automate | Developer experience | Inner loop, developer portals, self-service infrastructure |
| 10 | 🟡 Medium | Optimize | Observability pipeline | Log aggregation, metrics collection, trace correlation |

## Covered Topics (for reference)

These topics have adequate coverage.

| Topic | Pillar Fit | Coverage |
|-------|-----------|----------|
| Cost optimization strategies | Optimize | 100% |
| Tagging and resource organization | Optimize | 100% |
| Multi-region deployment | Design Resilient | 100% |
| Disaster recovery planning | Design Resilient | 100% |
| Load balancing strategies | Design Resilient | 100% |
| Database reliability | Design Resilient | 100% |
| API gateway patterns | Design Resilient | 100% |
| Container security | Secure | 100% |
| Incident response | Secure | 100% |
| Capacity planning | Optimize | 100% |
| Performance monitoring | Optimize | 100% |
| Cloud cost management | Optimize | 100% |
| Service mesh patterns | Design Resilient | 100% |
| Infrastructure drift detection | Define & Automate | 100% |
| Secrets rotation automation | Secure | 100% |
| Multi-cloud strategy | Optimize | 100% |
| Dependency management | Secure | 100% |
| Backup and restore | Design Resilient | 67% |

## Gaps by Pillar

**Define & Automate** (3 gaps): Platform engineering, Runbook automation, Developer experience

**Design Resilient** (2 gaps): Auto-scaling infrastructure, Chaos engineering

**Optimize** (1 gaps): Observability pipeline

**Secure** (4 gaps): Network segmentation, Vulnerability management, Compliance frameworks, Supply chain security
