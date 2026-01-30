---
name: smart-cross-reference
description: Intelligent cross-reference engine that auto-detects workflow sequences, suggests bidirectional links, finds orphans, and scores link strength
argument-hint: <file-paths> [--auto-link] [--detect-orphans] [--suggest-bidirectional] [--score-strength]
disable-model-invocation: true
---

# Smart Cross-Reference Engine

Intelligent system for managing cross-document relationships in WAF documentation. Auto-detects workflow sequences, suggests bidirectional links, identifies orphaned documents, and scores link strength.

## Purpose

Ensures WAF documents form a cohesive knowledge web by automatically detecting relationships, suggesting connections, and maintaining link health across the entire documentation set.

## Usage

```bash
# Analyze single document for cross-reference opportunities
/smart-cross-reference docs/secure-systems/data/classify-data.mdx

# Auto-detect workflow sequences
/smart-cross-reference docs/secure-systems/data/*.mdx --detect-workflows

# Suggest bidirectional links
/smart-cross-reference docs/define-and-automate-processes/automate/packaging.mdx --suggest-bidirectional

# Find orphaned documents
/smart-cross-reference docs/**/*.mdx --detect-orphans

# Score link strength across section
/smart-cross-reference docs/secure-systems/**/*.mdx --score-strength

# Auto-add missing cross-references
/smart-cross-reference docs/file.mdx --auto-link --dry-run
/smart-cross-reference docs/file.mdx --auto-link --apply

# Full analysis with all features
/smart-cross-reference docs/file.mdx --full-analysis
```

## Arguments

- **file-paths**: One or more `.mdx` files to analyze (required)
- **--detect-workflows** or **-w**: Auto-detect workflow sequences
- **--suggest-bidirectional** or **-b**: Suggest two-way links
- **--detect-orphans** or **-o**: Find documents with no incoming links
- **--score-strength** or **-s**: Calculate link strength scores
- **--auto-link** or **-a**: Automatically add missing cross-references
- **--dry-run** or **-d**: Preview changes without applying
- **--apply**: Apply auto-link suggestions
- **--full-analysis** or **-f**: Run all analysis features

## What This Skill Detects

### 1. **Workflow Sequences**

Auto-detects natural workflow progressions based on:
- Topic relationships (classify → protect → encrypt → tokenize)
- Tool dependencies (build image → deploy → monitor)
- Process flows (define → automate → deploy → monitor)
- Security layers (identity → access → data → network)

**Example Detection:**

```
Workflow Sequence Detected: Data Security Pipeline
═══════════════════════════════════════════════════

1. docs/secure-systems/data/classify-data.mdx
   ↓ (classification informs protection strategy)
   
2. docs/secure-systems/data/protect-sensitive-data.mdx
   ↓ (protection requires encryption)
   
3. docs/secure-systems/data/protect-data-at-rest.mdx
   ↓ (at-rest encryption complements in-transit)
   
4. docs/secure-systems/data/protect-data-in-transit.mdx
   ↓ (encryption enables tokenization)
   
5. docs/secure-systems/data/tokenize-data.mdx

Current State:
✅ classify-data.mdx → protect-sensitive-data.mdx (linked)
❌ protect-sensitive-data.mdx → protect-data-at-rest.mdx (MISSING)
❌ protect-data-at-rest.mdx → protect-data-in-transit.mdx (MISSING)
✅ protect-data-in-transit.mdx → tokenize-data.mdx (linked)

Suggested Additions:
1. In protect-sensitive-data.mdx, add:
   "After classifying sensitive data, [protect data at rest](/secure-systems/data/protect-data-at-rest) 
   using encryption to prevent unauthorized access."

2. In protect-data-at-rest.mdx, add:
   "Complement at-rest encryption by [protecting data in transit](/secure-systems/data/protect-data-in-transit) 
   to secure data during transmission."

[Auto-Link These] [Preview Changes] [Skip]
```

### 2. **Bidirectional Link Opportunities**

Identifies when document A links to B, but B should link back to A:

```
Bidirectional Link Analysis: packaging.mdx
═══════════════════════════════════════════

Outgoing Links (3):
✅ packaging.mdx → deployments.mdx (linked)
✅ packaging.mdx → testing.mdx (linked)
✅ packaging.mdx → cicd.mdx (linked)

Incoming Links (1):
✅ cicd.mdx → packaging.mdx (linked)

Missing Bidirectional Links (2):

1. deployments.mdx should link back to packaging.mdx
   Current: deployments.mdx mentions "container images" but doesn't link to packaging
   
   Suggested addition in deployments.mdx:
   "After [packaging your application](/define-and-automate-processes/automate/packaging) 
   into container images, deploy these artifacts using..."
   
   Confidence: HIGH (strong topical relationship)
   Location: Line 23 (introduction section)

2. testing.mdx should link back to packaging.mdx
   Current: testing.mdx mentions "image validation" but doesn't link to packaging
   
   Suggested addition in testing.mdx:
   "Validate [packaged images](/define-and-automate-processes/automate/packaging) 
   before deployment to catch configuration errors early."
   
   Confidence: MEDIUM (related but not sequential)
   Location: Line 67 (validation section)

[Add All Bidirectional Links] [Review Individually] [Skip]
```

### 3. **Orphaned Documents**

Finds documents with no incoming links (potential discoverability issues):

```
Orphaned Document Analysis
══════════════════════════

Found 3 orphaned documents (no incoming links):

1. 🔴 docs/optimize-systems/lifecycle-management/data-management.mdx
   Outgoing links: 5
   Incoming links: 0 (ORPHANED)
   
   Why it matters: Users can't discover this document through navigation
   
   Suggested parent documents:
   - docs/optimize-systems/index.mdx (pillar overview)
     Add to "Lifecycle management" section
     
   - docs/secure-systems/data/classify-data.mdx (related topic)
     Add: "After classifying data, implement [data lifecycle management]..."
     
   - docs/define-and-automate-processes/define/as-code/database.mdx (related workflow)
     Add: "Automate [data management]... throughout the lifecycle"
   
   Confidence: HIGH (3 strong parent candidates)

2. 🟡 docs/secure-systems/infrastructure/prevent-lateral-movement.mdx
   Outgoing links: 7
   Incoming links: 0 (ORPHANED)
   
   Why it matters: Important security topic but hidden
   
   Suggested parent documents:
   - docs/secure-systems/infrastructure/zero-trust-security.mdx
     Add to "Network segmentation" section
     
   - docs/secure-systems/infrastructure/secure-access.mdx
     Add: "After securing access, [prevent lateral movement]..."
   
   Confidence: MEDIUM (2 parent candidates)

3. 🟡 docs/define-and-automate-processes/build-culture/workflows-not-technologies.mdx
   Outgoing links: 3
   Incoming links: 0 (ORPHANED)
   
   Why it matters: Cultural guidance should be discoverable
   
   Suggested parent documents:
   - docs/define-and-automate-processes/build-culture/index.mdx
     Add to introduction or overview section
   
   Confidence: HIGH (clear parent document exists)

[Fix All Orphans] [Review Individually] [Generate Report]
```

### 4. **Link Strength Scoring**

Calculates how well documents are connected:

```
Link Strength Analysis: secure-systems/data/
═════════════════════════════════════════════

Overall Section Strength: 🟢 7.8/10 (Well Connected)

Document Scores:

1. classify-data.mdx: 🟢 9.2/10 (Excellent)
   ├─ Outgoing links: 6 (to related docs)
   ├─ Incoming links: 8 (from related docs)
   ├─ Bidirectional: 5 of 6 (83%)
   ├─ Workflow position: Start (entry point)
   └─ Hub score: HIGH (central to data security)

2. protect-sensitive-data.mdx: 🟢 8.5/10 (Strong)
   ├─ Outgoing links: 5
   ├─ Incoming links: 6
   ├─ Bidirectional: 4 of 5 (80%)
   ├─ Workflow position: Middle (connector)
   └─ Hub score: MEDIUM

3. protect-data-at-rest.mdx: 🟡 7.2/10 (Good)
   ├─ Outgoing links: 4
   ├─ Incoming links: 3
   ├─ Bidirectional: 2 of 4 (50%)
   ├─ Workflow position: Middle
   └─ Hub score: MEDIUM
   ⚠️ Could improve: Add 2 bidirectional links

4. protect-data-in-transit.mdx: 🟡 7.0/10 (Good)
   ├─ Outgoing links: 4
   ├─ Incoming links: 3
   ├─ Bidirectional: 2 of 4 (50%)
   ├─ Workflow position: Middle
   └─ Hub score: MEDIUM
   ⚠️ Could improve: Add 2 bidirectional links

5. tokenize-data.mdx: 🟡 6.8/10 (Acceptable)
   ├─ Outgoing links: 3
   ├─ Incoming links: 4
   ├─ Bidirectional: 2 of 3 (67%)
   ├─ Workflow position: End (terminal)
   └─ Hub score: LOW (specialized topic)
   ⚠️ Could improve: Add 1 outgoing link

Section Insights:
✅ Strong entry point (classify-data.mdx)
✅ Good workflow progression
🟡 Middle documents need more bidirectional links
✅ No orphaned documents
🟡 Could add 5 more cross-references for optimal connectivity

[Optimize Section Links] [Generate Link Map] [Export Report]
```

## Auto-Link Features

### Dry Run Mode

Preview changes before applying:

```bash
/smart-cross-reference docs/file.mdx --auto-link --dry-run
```

**Output:**
```
Auto-Link Preview: packaging.mdx
════════════════════════════════

Proposed Changes (3):

1. Add workflow connection to deployments.mdx
   Location: Line 45 (after code example)
   
   Current:
   "This Packer template creates a container image with your application."
   
   Proposed:
   "This Packer template creates a container image with your application. 
   After packaging, [deploy these artifacts](/define-and-automate-processes/automate/deployments) 
   using your orchestration platform."
   
   Confidence: HIGH
   Reason: Natural workflow progression

2. Add bidirectional link from testing.mdx
   Location: Line 67 (validation section)
   
   Current:
   "Validate images before deployment."
   
   Proposed:
   "Validate [packaged images](/define-and-automate-processes/automate/packaging) 
   before deployment to catch configuration errors early."
   
   Confidence: MEDIUM
   Reason: Bidirectional link opportunity

3. Add cross-reference to cicd.mdx
   Location: Line 89 (automation section)
   
   Current:
   "Automate the build process in your CI/CD pipeline."
   
   Proposed:
   "Automate the build process in your [CI/CD pipeline](/define-and-automate-processes/automate/cicd) 
   to ensure consistent image creation."
   
   Confidence: HIGH
   Reason: Strong topical relationship

[Apply All Changes] [Apply Selectively] [Cancel]
```

### Apply Mode

Automatically add cross-references:

```bash
/smart-cross-reference docs/file.mdx --auto-link --apply
```

**Safety features:**
- Only adds links with HIGH confidence by default
- Preserves existing content and formatting
- Adds links in natural sentence flow
- Validates all link targets exist
- Creates backup before applying changes

## Workflow Detection Patterns

The skill recognizes these common workflow patterns:

### Data Security Workflow
```
classify → protect → encrypt (at-rest) → encrypt (in-transit) → tokenize
```

### Application Deployment Workflow
```
package → test → deploy → monitor
```

### Infrastructure Automation Workflow
```
define (IaC) → version control → CI/CD → deploy → monitor
```

### Access Management Workflow
```
identity → authentication → authorization → audit
```

### Secrets Management Workflow
```
identify → store → rotate → audit
```

### Network Security Workflow
```
segment → control ingress/egress → prevent lateral movement → monitor
```

## Link Strength Scoring

**Score calculation:**
- Outgoing links: +1 point each (max 10)
- Incoming links: +1 point each (max 10)
- Bidirectional links: +2 bonus points each
- Workflow position: +2 (entry), +1 (middle), +0 (terminal)
- Hub score: +3 (high), +2 (medium), +1 (low)

**Score interpretation:**
- 🟢 9-10: Excellent connectivity
- 🟢 7-8.9: Strong connectivity
- 🟡 5-6.9: Acceptable connectivity
- 🔴 <5: Poor connectivity (needs improvement)

## Integration with Other Skills

**Works with:**
- `/check-structure` - Validates workflow connections in body text
- `/add-resources` - Adds cross-references to resources sections
- `/validate-links` - Ensures all suggested links are valid
- `/doc-intelligence` - Provides link health data for dashboard

**Workflow:**
```bash
# 1. Detect missing cross-references
/smart-cross-reference docs/section/*.mdx --full-analysis

# 2. Preview auto-link suggestions
/smart-cross-reference docs/file.mdx --auto-link --dry-run

# 3. Apply high-confidence links
/smart-cross-reference docs/file.mdx --auto-link --apply

# 4. Validate all links work
/validate-links docs/file.mdx

# 5. Check structure compliance
/check-structure docs/file.mdx
```

## Output Formats

### Text Format (Default)
Human-readable analysis with visual indicators and action buttons

### JSON Format
```bash
/smart-cross-reference docs/file.mdx --format json
```

```json
{
  "document": "docs/secure-systems/data/classify-data.mdx",
  "analysis_date": "2026-01-29T04:45:00Z",
  "link_strength": {
    "score": 9.2,
    "status": "excellent",
    "outgoing_links": 6,
    "incoming_links": 8,
    "bidirectional_links": 5,
    "workflow_position": "start",
    "hub_score": "high"
  },
  "workflow_sequences": [
    {
      "name": "Data Security Pipeline",
      "position": 1,
      "next_document": "docs/secure-systems/data/protect-sensitive-data.mdx",
      "link_exists": true,
      "confidence": "high"
    }
  ],
  "bidirectional_opportunities": [
    {
      "target_document": "docs/secure-systems/data/protect-sensitive-data.mdx",
      "link_exists": true,
      "reverse_link_exists": true,
      "status": "complete"
    }
  ],
  "orphan_status": {
    "is_orphan": false,
    "incoming_link_count": 8,
    "suggested_parents": []
  },
  "auto_link_suggestions": [
    {
      "type": "workflow_connection",
      "target": "docs/secure-systems/data/protect-sensitive-data.mdx",
      "location": "line 45",
      "confidence": "high",
      "suggested_text": "After classifying data...",
      "reason": "Natural workflow progression"
    }
  ]
}
```

## When to Use This Skill

Use `/smart-cross-reference` when:
- ✅ Creating new documents (ensure proper connections)
- ✅ Reviewing document sections (check connectivity)
- ✅ Finding orphaned documents (improve discoverability)
- ✅ Optimizing navigation (strengthen link network)
- ✅ Planning content structure (understand relationships)
- ✅ Quarterly maintenance (audit cross-references)

Don't use when:
- ❌ Need to validate link syntax (use `/validate-links`)
- ❌ Need to check resources section (use `/check-resources`)
- ❌ Need full document review (use `/review-doc`)

## Best Practices

1. **Run on new documents** - Ensure proper connections from the start
2. **Use dry-run first** - Preview changes before applying
3. **Review auto-link suggestions** - Verify they make sense in context
4. **Fix orphans promptly** - Improve document discoverability
5. **Maintain bidirectional links** - Create two-way navigation
6. **Check workflow sequences** - Ensure logical progression
7. **Monitor link strength** - Keep scores above 7.0
8. **Regular section audits** - Run quarterly on each pillar

## Safety Features

- **Dry-run mode** - Preview all changes before applying
- **Confidence scoring** - Only auto-apply high-confidence links
- **Backup creation** - Automatic backup before modifications
- **Link validation** - Verify all targets exist before adding
- **Context preservation** - Maintain existing content and formatting
- **Rollback support** - Undo changes if needed

## Reference

This skill validates against:
- **AGENTS.md** - Workflow connection patterns
- **templates/DOCUMENT_PATTERNS.md** - Cross-reference standards
- **templates/REVIEW_PHASES.md** - Phase 3 (Cross-Document Relationships)

## Notes

- Workflow detection uses semantic analysis of document topics
- Bidirectional links improve navigation and SEO
- Orphaned documents have poor discoverability
- Link strength correlates with document usefulness
- Auto-linking preserves human judgment for complex cases
- Regular cross-reference audits prevent link rot
- Strong link networks improve user experience