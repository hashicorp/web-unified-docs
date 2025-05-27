# `copy-cloud-docs-for-tfe`

This composite action is consumed by the `copy-docs.yml` workflow, which is triggered
at the time of the Terraform Enterprise team's `Create TFE Release Notes` workflow.

## Overview

This action looks for a few things in authored `mdx`, to determine
if sections or entire pages should be ignored from this copy process.

### Frontmatter

Adding a `tfc_only: true` line in markdown frontmatter signals to
the action that the associated `.mdx` file should not be handled in the copy process.

#### Example

```markdown
---
page_title: Assessments - API Docs - Terraform Cloud
tfc_only: true
description: >-
  Assessment results contain information about continuous validation in
  Terraform Cloud, like drift detection.
---
```

### HTML Comments

Specially formatted HTML comments can be used in matching pairs
to omit multiple **lines** of text from the copy process.

> **Warning**: This only works with MDX v1.

#### Example

```markdown
Some content available in both TFC & TFE...

<!-- BEGIN: TFC:only -->
## Some section

This will only be visible in TFC

<!-- END: TFC:only -->

More content available in both TFC & TFE...
```

> **Note**: More details are available in this [TFC/TFE Content exclusion][rfc] RFC.

[rfc]: https://docs.google.com/document/d/1DPJU6_7AdGIJVlwJUWBlRqREmYon2IgYf_DrtKjhkcE/edit
