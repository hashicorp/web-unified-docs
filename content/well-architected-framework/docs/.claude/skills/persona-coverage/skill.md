---
name: persona-coverage
description: Analyze document coverage for decision-makers and implementers with detailed persona balance report
argument-hint: <file-paths> [--verbose]
disable-model-invocation: true
---

# Persona Coverage Report Skill

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--verbose** / **-v**: Detailed breakdown
- **--compare**: Compare balance across multiple documents

## Target Personas

### Decision-Maker (40-50% of content)
CTOs, architects, staff engineers. Need: strategic value, Why section with operational challenges, architecture guidance, tool selection criteria, ROI/risk, compliance implications.

Content indicators: business impact statements, challenge descriptions with consequences, strategic decision criteria, approach comparisons, risk/benefit analysis.

### Implementer (50-60% of content)
DevOps, platform engineers, SREs, developers. Need: actionable implementation guidance, code examples with realistic workflows, 5-8+ HashiCorp resource links, step-by-step guidance, integration patterns, troubleshooting.

Content indicators: code examples with summaries, tutorial/documentation links, how-to instructions, configuration examples, CLI commands, technical specs.

## What It Analyzes

1. **Content distribution**: % of content per persona, section-by-section breakdown, balance between strategic/tactical
2. **Decision-maker coverage**: Why section (3-4 challenges with business impact), strategic guidance, business value, comparison content
3. **Implementer coverage**: Complete realistic code examples, 5-8+ resource links, step-by-step or clear next steps, integration patterns
4. **Balance analysis**: Overall distribution, skewed sections, gaps where one persona is underserved, transition quality
5. **Transition quality**: Strategic → tactical flow, explicit connections between sections

## Output

Report: overall balance (🟢 well-balanced, 🟡 skewed, 🔴 heavily skewed), scores per persona (0-10), section-by-section breakdown, recommendations for gaps. Both personas should score 7+.
