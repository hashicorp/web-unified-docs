# Resource Staleness — Likely Broken or Redirecting Links

Documents with external links pointing to **known stale domains** (old HashiCorp URLs that now redirect, deprecated products).

**Generated:** 2026-03-31
**Documents with stale links:** 29
**Documents with zero external links:** 24

## Scoring System

This report does not use a numeric score. Instead, it flags documents based on two criteria:

| Check | What It Detects |
|-------|-----------------|
| **Stale domains** | External links pointing to domains that have been retired, redirected, or deprecated (see domain list). Ranked by count of stale links per document — more stale links = higher maintenance debt. |
| **Zero external links** | Documents with no external links at all. These likely lack a HashiCorp resources section or have no implementation references for readers. |

**How to fix stale links:**
- `learn.hashicorp.com/...` → `developer.hashicorp.com/terraform/tutorials/...` (or vault, consul, etc.)
- `www.terraform.io/docs/...` → `developer.hashicorp.com/terraform/docs/...`
- `www.vaultproject.io/docs/...` → `developer.hashicorp.com/vault/docs/...`
- `registry.terraform.io/...` → Verify module/provider still exists at that path

## Stale domains checked

| Domain | Status |
|--------|--------|
| `learn.hashicorp.com` | Redirects to developer.hashicorp.com |
| `registry.terraform.io` | OK but check specific module paths |
| `www.boundaryproject.io` | Redirects to developer.hashicorp.com/boundary |
| `www.consul.io` | Redirects to developer.hashicorp.com/consul |
| `www.nomadproject.io` | Redirects to developer.hashicorp.com/nomad |
| `www.packer.io` | Redirects to developer.hashicorp.com/packer |
| `www.terraform.io` | Redirects to developer.hashicorp.com/terraform |
| `www.vagrantup.com` | May redirect to developer.hashicorp.com/vagrant |
| `www.vaultproject.io` | Redirects to developer.hashicorp.com/vault |
| `www.waypointproject.io` | Deprecated product |

## Documents with stale links

| Rank | Stale | Total Ext | Pillar | Title | Stale Domains |
|------|-------|-----------|--------|-------|---------------|
| 1 | 13 | 13 | Define & Automate | vcs-configuration.mdx | registry.terraform.io (OK but check specific module paths) |
| 2 | 11 | 13 | Define & Automate | manage-cloud-native.mdx | registry.terraform.io (OK but check specific module paths) |
| 3 | 7 | 12 | Optimize | data-management.mdx | registry.terraform.io (OK but check specific module paths) |
| 4 | 6 | 8 | Define & Automate | artifact-management.mdx | registry.terraform.io (OK but check specific module paths) |
| 5 | 5 | 7 | Define & Automate | containers.mdx | registry.terraform.io (OK but check specific module paths) |
| 6 | 4 | 12 | Define & Automate | vm.mdx | registry.terraform.io (OK but check specific module paths) |
| 7 | 3 | 11 | Optimize | compute.mdx | registry.terraform.io (OK but check specific module paths) |
| 8 | 3 | 9 | Define & Automate | manage-vendor.mdx | registry.terraform.io (OK but check specific module paths) |
| 9 | 3 | 8 | Optimize | create-cloud-budgets.mdx | registry.terraform.io (OK but check specific module paths) |
| 10 | 3 | 3 | Define & Automate | deployments.mdx | registry.terraform.io (OK but check specific module paths) |
| 11 | 3 | 3 | Define & Automate | cicd.mdx | registry.terraform.io (OK but check specific module paths) |
| 12 | 3 | 3 | Design Resilient | failover.mdx | registry.terraform.io (OK but check specific module paths) |
| 13 | 3 | 3 | Optimize | servers.mdx | registry.terraform.io (OK but check specific module paths) |
| 14 | 2 | 6 | Optimize | tag-cloud-resources.mdx | registry.terraform.io (OK but check specific module paths) |
| 15 | 2 | 6 | Optimize | detect-cloud-spending-anomalies.mdx | registry.terraform.io (OK but check specific module paths) |
| 16 | 2 | 2 | Define & Automate | security.mdx | registry.terraform.io (OK but check specific module paths) |
| 17 | 2 | 2 | Secure | manage-tls-iac.mdx | registry.terraform.io (OK but check specific module paths) |
| 18 | 1 | 6 | Secure | build-certificate-authority.mdx | www.vaultproject.io (Redirects to developer.hashicorp.com/vault) |
| 19 | 1 | 4 | Define & Automate | manage-secrets.mdx | registry.terraform.io (OK but check specific module paths) |
| 20 | 1 | 3 | Define & Automate | modules.mdx | registry.terraform.io (OK but check specific module paths) |
| 21 | 1 | 3 | Optimize | decommission-infrastructure.mdx | registry.terraform.io (OK but check specific module paths) |
| 22 | 1 | 3 | Secure | terraform.mdx | registry.terraform.io (OK but check specific module paths) |
| 23 | 1 | 2 | Define & Automate | infrastructure.mdx | registry.terraform.io (OK but check specific module paths) |
| 24 | 1 | 2 | Define & Automate | monitoring.mdx | registry.terraform.io (OK but check specific module paths) |
| 25 | 1 | 1 | Define & Automate | database.mdx | registry.terraform.io (OK but check specific module paths) |
| 26 | 1 | 1 | Define & Automate | orchestration.mdx | registry.terraform.io (OK but check specific module paths) |
| 27 | 1 | 1 | Define & Automate | standardize-workflows.mdx | www.terraform.io (Redirects to developer.hashicorp.com/terraform) |
| 28 | 1 | 1 | Optimize | containers.mdx | registry.terraform.io (OK but check specific module paths) |
| 29 | 1 | 1 | Optimize | network.mdx | registry.terraform.io (OK but check specific module paths) |

## Documents with no external links

These documents have no external links at all — they may be missing resource sections.

| Pillar | Title | Words | Has Resources? |
|--------|-------|-------|----------------|
| Define & Automate | cicd.mdx | 307 | No |
| Define & Automate | sense-of-ownership.mdx | 228 | No |
| Define & Automate | centralize-packages.mdx | 1100 | Yes |
| Define & Automate | development-environment.mdx | 203 | Yes |
| Define & Automate | virtual-machines.mdx | 1040 | Yes |
| Define & Automate | workflows.mdx | 742 | Yes |
| Define & Automate | atomic-deployments.mdx | 946 | Yes |
| Define & Automate | index.mdx | 947 | No |
| Define & Automate | service-mesh.mdx | 886 | Yes |
| Define & Automate | index.mdx | 1873 | No |
| Define & Automate | service-mesh.mdx | 275 | Yes |
| Define & Automate | gitops.mdx | 1750 | Yes |
| Define & Automate | index.mdx | 1304 | No |
| Design Resilient | index.mdx | 816 | No |
| Design Resilient | secure-distributed-systems.mdx | 603 | No |
| Optimize | index.mdx | 755 | No |
| Optimize | detect-configuration-drift.mdx | 642 | No |
| Optimize | monitor-network.mdx | 738 | No |
| Optimize | database.mdx | 1527 | Yes |
| Secure | audit-trails.mdx | 498 | Yes |
| Secure | tokenize-data.mdx | 285 | Yes |
| Secure | index.mdx | 828 | No |
| Secure | dynamic-and-static-secrets.mdx | 1439 | Yes |
| Secure | index.mdx | 1136 | No |