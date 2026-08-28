---
name: create-jira
description: Creates WAF JIRA tickets for documentation work using existing ticket infrastructure.
argument-hint: [ticket-details]
disable-model-invocation: true
---

# Create JIRA Skill

## Arguments

- **--title** / **-t**: Article title
- **--pillar** / **-p**: `1` Optimize Systems, `2` Secure Systems, `3` Define and Automate Processes, `4` Design Resilient Systems
- **--products**: Comma-separated HashiCorp products
- **--quarter** / **-q**: `1`-`6` (2026Q1-2027Q2)
- **--product-line**: `1` Security, `2` IPL, `3` Runtime, `4` WAF
- **--pillar-label**: `optimize_systems`, `secure_systems`, `define_and_automate_systems`, `design_resilient_systems`
- **--interactive** / **-i**: Guided prompts for all fields (recommended first use)
- **--description-file** / **-d**: Path to pre-written description file
- **--from-section**: Create ticket from a `/new-section` created document
- **--preview**: Preview ticket without creating

## Ticket creation process

1. **Guidance**: Define requirements, target personas, scope
2. **Description file**: Create from template at `jira_tickets/description_template`
3. **Validation**: All required fields filled, links provided, example documents included
4. **Submission**: Calls `jira_tickets/scripts/create_jira.sh`, converts to ADF format, returns ticket URL
5. **Output**: Issue key (e.g., WAF-497) and URL

## Description file template

```
Target personas:

Decision-makers (CTOs, architects, staff engineers):
- [Strategic value and business impact]
- [How it fits broader architecture]

Implementers (DevOps, platform engineers):
- [Technical details and how to implement]
- [Links to hands-on resources]

Requirements:
- [Key concepts to explain]
- [Specific examples needed]

Scope:
- IN: [What's included]
- OUT: [What's excluded]

References:
- `/templates/AGENTS.md`
- `/templates/doc-templates/DOCUMENT_TEMPLATE.md`

Example documents:
- [Link to similar WAF doc]
- [Link to similar WAF doc]

Acceptance criteria:
- All requirements included in final doc
- GitHub PR merged and validated

Links:
- Document URL: https://developer.hashicorp.com/well-architected-framework/...
- Design document: [Google doc URL]
```

## Prerequisites

```bash
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your-api-token"
```

Requires: `python3`, `jq`, `curl`.
