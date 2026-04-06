# Persona Coverage — Decision-Maker vs Implementer Balance

WAF docs should serve both **decision-makers** (CTOs, architects) and **implementers** (DevOps, platform engineers). Documents skewed too far toward one persona miss half their audience.

**Generated:** 2026-03-31
**Documents analyzed:** 107 (index pages excluded)

## Scoring System

Each document is scored for two personas by counting keyword signals in the body text.

| Persona | Signal Words (partial list) | What These Indicate |
|---------|---------------------------|---------------------|
| **Decision-Maker** | strategy, strategic, decision, business, organization, compliance, governance, risk, roi, cost... | Strategic language — document explains *why* to adopt a practice |
| **Implementer** | terraform, vault, consul, nomad, packer, boundary, sentinel, hcl, cli, command... | Tool/action language — document explains *how* to implement |

**Classification rules:**

| Classification | Rule |
|----------------|------|
| **Decision-Maker heavy** | Decision-maker signals > 70% of total |
| **Leans Decision-Maker** | Decision-maker signals > implementer, gap > 20% |
| **Balanced** | Neither persona exceeds the other by more than 20% |
| **Leans Implementer** | Implementer signals > decision-maker, gap > 20% |
| **Implementer heavy** | Implementer signals > 70% of total |

**Limitations:** Keyword counting is a rough proxy. A document can mention "terraform" 50 times in a strategic discussion and still score as implementer-heavy. Use this report as a starting point, not a definitive judgment.

## Summary

| Persona Lean | Count | % |
|--------------|-------|---|
| Implementer heavy | 82 | 76% |
| Leans Implementer | 10 | 9% |
| Balanced | 8 | 7% |
| Decision-Maker heavy | 4 | 3% |
| Leans Decision-Maker | 3 | 2% |

## Decision-Maker Heavy — Need Implementation Guidance

These documents focus on strategy but lack actionable guidance for implementers.

| Pillar | Title | DM Score | Impl Score | Code | Resources |
|--------|-------|----------|------------|------|-----------|
| Define & Automate | sense-of-ownership.mdx | 5 | 0 | 0 | 0 |
| Define & Automate | recognition.mdx | 4 | 1 | 0 | 0 |
| Define & Automate | collaboration.mdx | 8 | 2 | 0 | 0 |
| Design Resilient | plan-for-resilience.mdx | 65 | 6 | 0 | 0 |

## Implementer Heavy — Need Strategic Context

These documents jump into tools/code without explaining the *why* for decision-makers.

| Pillar | Title | DM Score | Impl Score | Has Why? | Words |
|--------|-------|----------|------------|----------|-------|
| Define & Automate | containers.mdx | 0 | 160 | Yes | 1205 |
| Define & Automate | manage-cloud-native.mdx | 0 | 66 | No | 266 |
| Define & Automate | manage-vendor.mdx | 0 | 68 | No | 495 |
| Define & Automate | containers.mdx | 0 | 47 | No | 385 |
| Define & Automate | service-mesh.mdx | 0 | 23 | No | 275 |
| Secure | manage-tls-iac.mdx | 0 | 38 | No | 464 |
| Define & Automate | continuous-learning.mdx | 1 | 9 | No | 319 |
| Define & Automate | cicd.mdx | 1 | 31 | No | 378 |
| Define & Automate | monitoring.mdx | 1 | 24 | No | 203 |
| Define & Automate | security.mdx | 1 | 28 | No | 298 |
| Define & Automate | development-environment.mdx | 1 | 8 | No | 203 |
| Define & Automate | virtual-machines.mdx | 1 | 131 | Yes | 1040 |
| Define & Automate | manage-secrets.mdx | 1 | 67 | No | 431 |
| Secure | protect-data-at-rest.mdx | 1 | 31 | Yes | 749 |
| Secure | gitlab.mdx | 1 | 77 | No | 525 |
| Define & Automate | database.mdx | 2 | 30 | No | 472 |
| Secure | rotate.mdx | 2 | 22 | No | 306 |
| Define & Automate | cicd.mdx | 3 | 28 | No | 307 |
| Define & Automate | packaging.mdx | 3 | 125 | Yes | 1018 |
| Define & Automate | orchestration.mdx | 3 | 28 | No | 288 |
| Secure | tokenize-data.mdx | 3 | 10 | Yes | 285 |
| Secure | centralize-identity-management.mdx | 3 | 50 | Yes | 858 |
| Secure | build-certificate-authority.mdx | 3 | 29 | No | 352 |
| Secure | jenkins.mdx | 3 | 64 | No | 837 |
| Define & Automate | service-mesh.mdx | 4 | 90 | Yes | 886 |
| Secure | use-dynamic-credentials.mdx | 4 | 50 | Yes | 747 |
| Secure | validate-software-integrity.mdx | 4 | 20 | No | 691 |
| Define & Automate | infrastructure.mdx | 5 | 103 | Yes | 710 |
| Optimize | identify-metrics.mdx | 5 | 14 | No | 612 |
| Optimize | containers.mdx | 5 | 56 | No | 698 |
| Secure | protect-data-in-transit.mdx | 5 | 32 | Yes | 827 |
| Secure | authenticate-workloads-tls.mdx | 5 | 73 | No | 648 |
| Secure | drone-ci.mdx | 5 | 71 | Yes | 786 |
| Secure | dynamic-and-static-secrets.mdx | 5 | 70 | No | 1439 |
| Secure | github-actions.mdx | 5 | 55 | Yes | 668 |
| Secure | tekton.mdx | 5 | 70 | Yes | 796 |
| Define & Automate | deployments.mdx | 6 | 215 | Yes | 1387 |
| Define & Automate | centralize-packages.mdx | 6 | 74 | Yes | 1100 |
| Define & Automate | version-control.mdx | 6 | 45 | Yes | 760 |
| Secure | protect-sensitive-data.mdx | 6 | 26 | Yes | 628 |
| Secure | aws-codebuild.mdx | 6 | 43 | Yes | 729 |
| Secure | google-cloud-build.mdx | 6 | 44 | Yes | 748 |
| Secure | teamcity.mdx | 6 | 45 | Yes | 682 |
| Define & Automate | vcs-configuration.mdx | 7 | 133 | Yes | 741 |
| Define & Automate | atomic-deployments.mdx | 7 | 177 | Yes | 946 |
| Optimize | monitor-network.mdx | 7 | 33 | No | 738 |
| Optimize | servers.mdx | 7 | 38 | No | 728 |
| Secure | manage-network-ingress-egress.mdx | 7 | 56 | Yes | 1123 |
| Secure | remediate-leaked-secrets.mdx | 7 | 47 | Yes | 1114 |
| Secure | argo-cd.mdx | 7 | 76 | Yes | 850 |
| Secure | bitbucket.mdx | 7 | 47 | Yes | 733 |
| Define & Automate | vm.mdx | 8 | 126 | No | 990 |
| Define & Automate | semi-automated.mdx | 8 | 222 | Yes | 1738 |
| Secure | azure-devops.mdx | 8 | 54 | Yes | 814 |
| Define & Automate | infrastructure.mdx | 9 | 118 | Yes | 1033 |
| Secure | prevent-lateral-movement.mdx | 9 | 32 | No | 836 |
| Secure | zero-trust-security.mdx | 9 | 26 | No | 738 |
| Secure | circle-ci.mdx | 9 | 43 | Yes | 676 |
| Define & Automate | artifact-management.mdx | 10 | 119 | Yes | 863 |
| Define & Automate | standardize-workflows.mdx | 10 | 160 | Yes | 1252 |
| Secure | implement-strong-sign-in-workflows.mdx | 10 | 26 | Yes | 718 |
| Secure | terraform.mdx | 10 | 160 | Yes | 991 |
| Optimize | data-management.mdx | 11 | 54 | No | 502 |
| Optimize | detect-configuration-drift.mdx | 11 | 35 | No | 642 |
| Secure | manage-access-lifecycle.mdx | 11 | 40 | Yes | 963 |
| Define & Automate | modules.mdx | 12 | 162 | Yes | 994 |
| Secure | secure-access.mdx | 12 | 70 | Yes | 1061 |
| Secure | prevent-leaked-secrets-credential-management.mdx | 12 | 55 | Yes | 1228 |
| Define & Automate | applications.mdx | 13 | 154 | Yes | 1375 |
| Define & Automate | workflows.mdx | 15 | 40 | Yes | 742 |
| Design Resilient | failover.mdx | 15 | 55 | No | 744 |
| Secure | grant-least-privilege.mdx | 15 | 51 | Yes | 1053 |
| Secure | detect-leaked-secrets.mdx | 15 | 45 | Yes | 1190 |
| Design Resilient | scale-and-tune-performance.mdx | 17 | 45 | No | 933 |
| Secure | store-static-secrets.mdx | 17 | 79 | No | 1066 |
| Define & Automate | testing.mdx | 20 | 125 | Yes | 998 |
| Secure | prevent-leaked-secrets-access-controls.mdx | 21 | 56 | Yes | 1498 |
| Design Resilient | disaster-recovery.mdx | 22 | 61 | No | 814 |
| Optimize | decommission-infrastructure.mdx | 23 | 112 | No | 1134 |
| Define & Automate | fully-automated.mdx | 25 | 260 | Yes | 2061 |
| Optimize | tag-cloud-resources.mdx | 25 | 97 | No | 742 |
| Define & Automate | gitops.mdx | 35 | 175 | Yes | 1750 |

## Well-Balanced Documents (models to follow)

| Pillar | Title | DM Score | Impl Score | Words |
|--------|-------|----------|------------|-------|
| Design Resilient | design-control-data-management-plane.mdx | 133 | 128 | 2273 |
| Optimize | network.mdx | 37 | 39 | 1360 |
| Define & Automate | writing.mdx | 7 | 6 | 359 |
| Secure | define-access-requirements.mdx | 20 | 24 | 985 |
| Optimize | create-cloud-budgets.mdx | 75 | 60 | 629 |
| Secure | document-shared-responsibilities.mdx | 22 | 17 | 480 |
| Design Resilient | distributed-systems.mdx | 28 | 40 | 803 |
| Optimize | detect-cloud-spending-anomalies.mdx | 24 | 35 | 309 |