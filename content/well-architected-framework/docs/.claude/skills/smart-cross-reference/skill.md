---
name: smart-cross-reference
description: Intelligent cross-reference engine that auto-detects workflow sequences, suggests bidirectional links, finds orphans, and scores link strength
argument-hint: <file-paths> [--auto-link] [--detect-orphans] [--suggest-bidirectional] [--score-strength]
disable-model-invocation: true
---

# Smart Cross-Reference Engine

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--detect-workflows** / **-w**: Auto-detect workflow sequences
- **--suggest-bidirectional** / **-b**: Suggest two-way links
- **--detect-orphans** / **-o**: Find documents with no incoming links
- **--score-strength** / **-s**: Calculate link strength scores (9-10 excellent, 7-8.9 strong, 5-6.9 acceptable, <5 poor)
- **--auto-link** / **-a**: Automatically add missing cross-references
- **--dry-run** / **-d**: Preview changes without applying
- **--apply**: Apply auto-link suggestions
- **--full-analysis** / **-f**: Run all analysis features

## What It Detects

### 1. Workflow sequences
Auto-detects natural progressions based on topic relationships:
- Data security: classify → protect → encrypt (at-rest) → encrypt (in-transit) → tokenize
- Application: package → test → deploy → monitor
- Infrastructure: define (IaC) → version control → CI/CD → deploy → monitor
- Access: identity → authentication → authorization → audit
- Secrets: identify → store → rotate → audit
- Network: segment → control ingress/egress → prevent lateral movement → monitor

Reports which inter-document links exist and which are missing. Suggests text to add.

### 2. Bidirectional link opportunities
Identifies when document A links to B but B doesn't link back. Reports missing reverse links with suggested text and confidence level (HIGH/MEDIUM).

### 3. Orphaned documents
Finds documents with 0 incoming links. Reports suggested parent documents and where to add links, with confidence levels.

### 4. Link strength scoring
Scores each document on connectivity. Low-scoring documents need more incoming/outgoing links or bidirectional connections.

## Auto-link safety
Only adds HIGH confidence links by default. Validates all targets exist before adding. Use `--dry-run` first to preview changes.
