---
name: content-freshness
description: Track content freshness by analyzing version references, technology currency, link validity, and time-sensitive content
argument-hint: <file-paths> [--check-links]
disable-model-invocation: true
---

# Content Freshness Tracking Skill

Analyzes WAF documents for freshness indicators and maintenance needs by checking version references, technology currency, link validity, and time-sensitive content.

## Purpose

Helps maintain evergreen documentation by identifying outdated content, deprecated features, broken links, and time-sensitive references that need updating.

## Usage

```bash
# Analyze single document
/content-freshness docs/path/to/document.mdx

# Analyze multiple documents
/content-freshness docs/section/*.mdx

# Include link validation (slower)
/content-freshness docs/document.mdx --check-links

# Generate maintenance report
/content-freshness docs/**/*.mdx --format report
```

## What It Checks

### 1. Version References 📦

**HashiCorp Product Versions:**
- Terraform version mentions (e.g., "Terraform 1.5")
- Packer version-specific features
- Vault API versions
- Consul version requirements
- Nomad version features

**Cloud Provider Versions:**
- AWS API versions
- Azure Resource Manager versions
- GCP API versions
- Kubernetes versions

**Deprecated Features:**
- Terraform 0.11 syntax
- Legacy Vault auth methods
- Deprecated cloud provider resources
- Old CLI commands

### 2. Technology Currency 🔄

**Best Practices:**
- Current vs. outdated approaches
- Modern tool features vs. legacy methods
- Security recommendations alignment
- Industry standard practices

**Tool Features:**
- New features not mentioned
- Deprecated features still referenced
- Alternative approaches now available
- Improved workflows available

**Integration Patterns:**
- Current integration methods
- Deprecated integrations
- New integration options
- Updated workflows

### 3. Link Validity 🔗

**HashiCorp Resources:**
- Tutorial links (check availability)
- Documentation links (check for redirects)
- Product pages (verify current)
- Blog posts (check if archived)

**External Resources:**
- Cloud provider documentation
- Third-party tool documentation
- GitHub repositories
- Community resources

**Link Health:**
- 404 errors (broken links)
- Redirects (may indicate moved content)
- HTTPS availability
- Deprecated URLs

### 4. Time-Sensitive Content ⏰

**Temporal Phrases:**
- "Currently" (when was this written?)
- "As of [date]" (how old?)
- "Recently released" (how recent?)
- "Coming soon" (has it arrived?)
- "New feature" (how new?)
- "Beta" or "Preview" (still in beta?)

**Date References:**
- Specific release dates
- "In 2023" or similar year mentions
- "Last year" or relative time
- Event references (conferences, releases)

**Comparison to Older Approaches:**
- "Previously, you had to..." (is this still relevant?)
- "The old way was..." (how old?)
- "Before version X..." (which version are we on now?)

## Output Format

```
Content Freshness Report: terraform-modules.mdx
===============================================

📊 OVERALL FRESHNESS: 🟢 CURRENT (8.5/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Last Updated: 2025-11-15 (2.5 months ago)
Status: ✅ Content is current and accurate
Next Review: 2026-05-15 (3 months)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 VERSION REFERENCES: 🟢 GOOD (9/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ No Specific Versions Mentioned
   ✓ Uses version-agnostic examples
   ✓ No hardcoded version numbers
   ✓ Evergreen approach maintained

🟡 Minor Version Indicators (1 instance)
   Line 145: "Terraform 1.0+ introduced..."
   Status: Still accurate (current: 1.7)
   Action: No change needed
   Note: Context is historical, not prescriptive

✅ No Deprecated Features
   ✓ All syntax is current
   ✓ No legacy commands
   ✓ Modern best practices used

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 TECHNOLOGY CURRENCY: 🟢 EXCELLENT (10/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Current Best Practices
   ✓ Module versioning (current standard)
   ✓ Private registry usage (modern approach)
   ✓ Data sources for dynamic values (best practice)
   ✓ Immutable infrastructure (current paradigm)

✅ Modern Tool Features
   ✓ Terraform Cloud integration (current)
   ✓ Sentinel policies (current)
   ✓ Module testing (current approach)
   ✓ VCS integration (current workflow)

✅ Security Recommendations
   ✓ Least privilege (current standard)
   ✓ Secrets management (current best practice)
   ✓ State encryption (current requirement)

✅ No Outdated Approaches
   ✓ No references to deprecated methods
   ✓ No legacy workflows
   ✓ No superseded tools

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 LINK VALIDITY: 🟡 NEEDS ATTENTION (7/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HashiCorp Resources (9 links checked):

✅ Working Links (7 links)
   ✓ developer.hashicorp.com/terraform/tutorials
   ✓ developer.hashicorp.com/terraform/docs
   ✓ developer.hashicorp.com/terraform/language
   ✓ developer.hashicorp.com/terraform/registry
   ✓ developer.hashicorp.com/terraform/cloud-docs
   ✓ developer.hashicorp.com/sentinel/docs
   ✓ developer.hashicorp.com/terraform/intro

🟡 Redirected Links (2 links)
   Line 234: learn.hashicorp.com/terraform
   → Redirects to: developer.hashicorp.com/terraform/tutorials
   Action: Update to new URL
   Priority: Medium (still works but should update)

   Line 267: terraform.io/docs/modules
   → Redirects to: developer.hashicorp.com/terraform/language/modules
   Action: Update to new URL
   Priority: Medium (still works but should update)

External Resources (3 links checked):

✅ Working Links (3 links)
   ✓ aws.amazon.com/architecture/well-architected
   ✓ cloud.google.com/architecture/framework
   ✓ docs.microsoft.com/azure/architecture

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ TIME-SENSITIVE CONTENT: 🟢 MINIMAL (9/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Evergreen Language
   ✓ No "currently" or "as of" phrases
   ✓ No specific dates mentioned
   ✓ No "recently released" references
   ✓ No "coming soon" features

🟡 Historical Context (1 instance)
   Line 145: "Terraform 1.0+ introduced..."
   Status: Acceptable (provides historical context)
   Action: No change needed
   Note: Explains evolution, not current state

✅ No Beta/Preview References
   ✓ All features are GA (generally available)
   ✓ No experimental features mentioned
   ✓ No preview program references

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 MAINTENANCE RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 Priority: MEDIUM (2 updates needed)

1. Update Redirected Links (2 links)
   Lines: 234, 267
   Effort: 5 minutes
   Impact: Improves link reliability
   
   Before:
   - learn.hashicorp.com/terraform
   - terraform.io/docs/modules
   
   After:
   - developer.hashicorp.com/terraform/tutorials
   - developer.hashicorp.com/terraform/language/modules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 FRESHNESS SCORE BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version References:    9/10 ████████░
Technology Currency:  10/10 ██████████
Link Validity:         7/10 ███████░░░
Time-Sensitive:        9/10 █████████░

Overall: 8.5/10 ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗓️  REVIEW SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Last Review:    2025-11-15 (2.5 months ago)
Next Review:    2026-05-15 (in 3 months)
Review Cycle:   Quarterly (every 3 months)

Triggers for Earlier Review:
- Major Terraform version release
- Significant feature deprecations
- Multiple broken links reported
- User feedback on outdated content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ QUICK WINS (5 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Update 2 redirected links
   /fix-links docs/terraform-modules.mdx --fix

Status: CURRENT - Minor updates recommended
```

## Freshness Score Calculation

| Category | Weight | Scoring |
|----------|--------|---------|
| Version references | 25% | No versions: 10, Current versions: 8, Old versions: 4, Deprecated: 0 |
| Technology currency | 35% | Current practices: 10, Mostly current: 7, Some outdated: 4, Very outdated: 0 |
| Link validity | 25% | All working: 10, Some redirects: 7, Some broken: 4, Many broken: 0 |
| Time-sensitive content | 15% | Evergreen: 10, Minimal temporal: 8, Some temporal: 5, Heavy temporal: 2 |

**Freshness Levels:**
- 🟢 **Current** (8-10): Content is fresh and accurate
- 🟡 **Needs Review** (6-7.9): Some updates recommended
- 🔴 **Outdated** (4-5.9): Significant updates needed
- 🔴 **Critical** (<4): Major revision required

## Common Freshness Issues

### Version-Specific References
```
❌ "Terraform 1.3 introduced..."
✅ "Terraform introduced..." (version-agnostic)

❌ "As of Terraform 1.5..."
✅ "Terraform supports..." (evergreen)
```

### Temporal Language
```
❌ "Recently, HashiCorp released..."
✅ "HashiCorp provides..." (timeless)

❌ "Coming soon: feature X"
✅ "Feature X enables..." (if released) or remove

❌ "Currently in beta"
✅ Remove if GA, or note beta status with date
```

### Outdated Links
```
❌ learn.hashicorp.com/terraform
✅ developer.hashicorp.com/terraform/tutorials

❌ terraform.io/docs
✅ developer.hashicorp.com/terraform/docs
```

### Deprecated Features
```
❌ "Use terraform 0.11 syntax..."
✅ "Use current Terraform syntax..."

❌ "Configure with legacy auth..."
✅ "Configure with current auth methods..."
```

## Review Schedule Recommendations

| Freshness Score | Review Frequency | Priority |
|----------------|------------------|----------|
| 9-10 (Current) | Every 6 months | Low |
| 7-8.9 (Good) | Every 3 months | Medium |
| 5-6.9 (Needs Review) | Monthly | High |
| <5 (Outdated) | Immediate | Critical |

## Integration with Other Skills

**Maintenance workflow:**
```bash
# 1. Check freshness
/content-freshness docs/document.mdx --check-links

# 2. Fix broken/redirected links
/fix-links docs/document.mdx --fix

# 3. Update outdated content
# (manual editing based on recommendations)

# 4. Verify improvements
/content-freshness docs/document.mdx
```

**Section-wide audit:**
```bash
# Check all documents in section
/content-freshness docs/section/**/*.mdx --format report

# Identify documents needing updates
# (filter for freshness score < 7)

# Prioritize updates by score and impact
```

**Before major releases:**
```bash
# Check for version-specific content
/content-freshness docs/**/*.mdx | grep "version"

# Update references to new versions
# Verify no deprecated features mentioned
```

## Automated Checks

The skill can automatically detect:

**Version Patterns:**
- `Terraform 1.x`, `Packer 1.x`, `Vault 1.x`
- `version = "1.5.0"` in code blocks
- `>= 1.0` version constraints
- API version strings

**Temporal Patterns:**
- "currently", "as of", "recently"
- "coming soon", "new feature", "beta"
- Date patterns (2023, 2024, etc.)
- "last year", "next quarter"

**Link Patterns:**
- Old HashiCorp domains (learn.hashicorp.com, terraform.io)
- Deprecated documentation paths
- HTTP vs HTTPS
- Redirect chains

**Deprecated Features:**
- Terraform 0.11 syntax patterns
- Legacy Vault auth methods
- Deprecated cloud provider resources
- Old CLI command formats

## When to Use This Skill

Use `/content-freshness` when:
- ✅ Quarterly documentation maintenance
- ✅ Before major product releases
- ✅ After HashiCorp product updates
- ✅ User reports outdated content
- ✅ Planning documentation updates
- ✅ Auditing documentation health

Don't use when:
- ❌ Need structure validation (use `/check-structure`)
- ❌ Need style checking (use `/check-hashicorp-style`)
- ❌ Need full review (use `/review-doc`)
- ❌ Content is intentionally historical

## Best Practices

1. **Write evergreen content** - Avoid version-specific references
2. **Use version-agnostic examples** - Focus on concepts, not versions
3. **Update links quarterly** - Check for redirects and broken links
4. **Remove temporal language** - Avoid "currently", "recently", "soon"
5. **Document review dates** - Track when content was last verified
6. **Set review schedules** - Based on freshness score
7. **Monitor deprecations** - Watch for deprecated features in releases

## Reference

This skill validates against:
- **AGENTS.md** - Evergreen content guidelines
- **AGENTS.md** - Link validity requirements
- HashiCorp product release notes
- Cloud provider documentation updates

## Notes

- Freshness is about accuracy, not recency
- Some historical context is valuable
- Version mentions are okay if providing context
- Links should be updated even if redirects work
- Regular maintenance prevents major rewrites
- Automated checks catch most issues
- Manual review needed for content accuracy

## Reference

This skill validates against:
- **AGENTS.md** - Evergreen content guidelines
- **AGENTS.md** - Link validity requirements
- HashiCorp product release notes
- Cloud provider documentation updates

## Notes

- Freshness is about accuracy, not recency
- Some historical context is valuable
- Version mentions are okay if providing context
- Links should be updated even if redirects work
- Regular maintenance prevents major rewrites
- Automated checks catch most issues
- Manual review needed for content accuracy