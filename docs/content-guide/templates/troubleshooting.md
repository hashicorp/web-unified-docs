# Troubleshooting template

Model: [Service-to-service troubleshooting overview](https://developer.hashicorp.com/consul/docs/troubleshoot/service-communication).

## Template

```markdown
---
page_title: Troubleshoot {feature or area}
description: |-
  Learn how to diagnose and resolve common {feature} issues, including {symptom category one} and {symptom category two}.
---

# Troubleshoot {feature or area}

Briefly describe what this page covers and when a reader should use it instead of a how-to or concept page.

## Requirements

List any tool, version, or access requirements needed to follow the troubleshooting steps, if applicable. Omit this section if there are no meaningful requirements.

## {Symptom or error message}

Describe the symptom or quote the exact error message the reader is likely searching for.

**Cause:** Explain what causes this symptom.

**Resolution:**

1. First resolution step.
1. Second resolution step.

## {Another symptom or error message}

**Cause:** Explain what causes this symptom.

**Resolution:**

1. First resolution step.
1. Second resolution step.
```

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Title clearly indicates troubleshooting content (for example, "Troubleshoot [feature]")
- [ ] Organized by symptom or error message
- [ ] Each issue follows: symptom/error → cause → resolution
- [ ] Resolution steps are numbered and actionable
- [ ] Does not mix conceptual explanations into resolution steps
- [ ] Links to related how-to or reference docs where relevant
