---
name: gap-analysis
description: Identify content and concept gaps in documentation, suggest specific improvements to achieve document goals
argument-hint: <file-path>
---

# Content and Concept Gap Analysis

## Arguments

- **file-path**: Path to `.mdx` file (required)
- **--compare-to**: Optional path to similar document for comparison
- **--verbose** / **-v**: Detailed analysis with examples
- **--format**: `text` or `json`

## Analysis Areas

### 1. Document goal assessment
Extract goal from title, meta description, opening paragraphs, Why section. Evaluate if content delivers on what the title promises.

### 2. Technical concept coverage
For integration guides: authentication methods, secret types, integration patterns, alternatives, security considerations.
For how-to guides: prerequisites, terminology, configuration options, validation steps, troubleshooting.
For conceptual docs: core principles, benefits/trade-offs, relationships to other concepts, common misconceptions.

### 3. Use case and scenario gaps
Missing: common use cases, real-world scenarios, edge cases, when NOT to use (anti-patterns), migration/adoption paths.

### 4. Implementation coverage
Decision-makers: business value, ROI/impact, comparison to alternatives, compliance implications, org prerequisites.
Implementers: code examples, actionable steps, tool prerequisites, configuration examples, command syntax.

### 5. Resource and reference gaps
Related WAF docs not linked, missing tutorials, external resources for third-party tools, next steps/learning path. Include links that genuinely help users implement the topic — don't pad, don't omit useful resources.

### 6. Missing sections
Common missing: Prerequisites, Verification/testing, Production readiness, Troubleshooting, Best practices, Security considerations, Performance implications, Limitations.

### 7. Persona balance gaps
Decision-maker gaps: no Why section, missing risk/benefit analysis, no approach comparison, governance not addressed.
Implementer gaps: no code examples, unrealistic examples, no tutorial links, no step-by-step guidance.

### 8. Cross-reference and workflow gaps
Related WAF docs not mentioned, workflow dependencies unclear, missing "before/after this" guidance, prerequisite knowledge not linked.

## Output

Report each gap with: priority (CRITICAL/HIGH/MEDIUM/LOW), impact description, specific recommendation with suggested content or section. Top 3 priority actions with estimated impact on gap score.
