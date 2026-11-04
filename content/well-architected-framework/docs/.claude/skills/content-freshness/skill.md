---
name: content-freshness
description: Track content freshness by analyzing version references, technology currency, link validity, and time-sensitive content
argument-hint: <file-paths> [--check-links]
disable-model-invocation: true
---

# Content Freshness Tracking Skill

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--check-links**: Include link validation (slower)
- **--format**: `text` (default) or `report`

## Checks

### 1. Version references 📦
Detect: specific HashiCorp product version mentions (Terraform 1.5, Packer 1.x), cloud provider API versions, Kubernetes versions, deprecated features (Terraform 0.11 syntax, legacy Vault auth methods, old CLI commands).

### 2. Technology currency 🔄
Detect: outdated best practices vs current approaches, deprecated features still referenced, superseded tools, legacy workflows. Check current features aren't missing.

### 3. Link validity 🔗
Check: 404 errors, redirects (especially old HashiCorp domains), HTTPS availability.

Old domains to flag:
- `learn.hashicorp.com/terraform` → `developer.hashicorp.com/terraform/tutorials`
- `terraform.io/docs` → `developer.hashicorp.com/terraform/docs`

### 4. Time-sensitive content ⏰
Detect temporal phrases: "currently", "as of [date]", "recently released", "coming soon", "new feature", "beta", "preview", year mentions (2023, 2024), "last year", "before version X"

## Freshness scoring

🟢 8-10 Current, 🟡 6-7.9 Needs Review, 🔴 4-5.9 Outdated, 🔴 <4 Critical.

Categories: Version references (25%), Technology currency (35%), Link validity (25%), Time-sensitive content (15%).

## Common fixes

```
❌ "Terraform 1.3 introduced..."  →  ✅ "Terraform introduced..."
❌ "Recently, HashiCorp released..."  →  ✅ "HashiCorp provides..."
❌ "Coming soon: feature X"  →  ✅ Remove or confirm GA
❌ learn.hashicorp.com/terraform  →  ✅ developer.hashicorp.com/terraform/tutorials
```
