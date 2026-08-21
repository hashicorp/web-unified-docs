# Reference template

Reference content is technical and canonical: cover configuration items, CLI/API surface, or
other technical entities completely and precisely, and let other content types link to this
page rather than re-describing it. When a configuration item, flag, or endpoint changes,
update the reference page first.

Write for Ctrl+F, not beginning-to-end reading: repeating information already on the page is
fine, and there's no such thing as a reference page that's too long.

## Template

For flat, non-hierarchical information — a list of items, metrics, error codes, or CLI
options that don't nest — use a simple reference table instead of the pattern below. Use the
nested pattern that follows only for genuinely hierarchical, structured configuration (HCL,
JSON, YAML, or similar).

If a configuration item has a different syntax per language (for example, a Consul
configuration entry documented in HCL, JSON, and YAML), use `<Tabs>` throughout, as shown
below. For a single-language construct (for example, a Terraform resource argument), drop
the `<Tabs>` wrapper and use the same section structure directly. For CLI and API reference
specifically, find an existing page in your product's content and use that as a template —
this repo's direction is to autogenerate CLI/API reference from source where possible,
rather than hand-author it from scratch.

```markdown
---
layout: docs
page_title: Reference topic for structured information
description: |-
  {Reference topic} enables {product} to {specific tasks}. Learn how to configure
  {reference topic} in {HCL, JSON, and YAML}.
---

# Reference topic for structured information

## Configuration model

The following list outlines field hierarchy, data types, and requirements. Select a
property name to jump to its details, including default values.

<Tabs>
<Tab heading="HCL and JSON" group="hcl">

- [`ElementA`](#elementa): data type | default | required
- [`ElementB`](#elementb): data type | default
  - [`ElementB{}.ElementC`](#elementb-elementc): data type | default

</Tab>
<Tab heading="YAML" group="yaml">

- [`elementA`](#elementa): data type | default | required
- [`spec`](#spec): map | required
  - [`spec.elementB`](#spec-elementb): data type | default

</Tab>
</Tabs>

## Complete configuration

When every field is defined, the configuration has the following form. This example is
demonstrative only — it doesn't describe a real-world scenario. Use comments to preserve
required-field and mutually-exclusive-field information for readers who copy and paste it.

<Tabs>
<Tab heading="HCL" group="hcl">

```hcl
ElementA = <default or description of value>
ElementB = {
  ElementC = <default or description of value>
}
```

</Tab>
<Tab heading="YAML" group="yaml">

```yaml
elementA: <default or description of value>
spec:
  elementB: <default or description of value>
```

</Tab>
</Tabs>

## Specification

This section describes each field. Stay within the scope of the reference — if a
description starts to explain a concept or a procedure, link to the relevant concept or
how-to page instead of expanding it here.

Use dot notation in element headings so the heading itself shows the hierarchy: `.`
separates parameter levels, `[]` marks an HCL list, and `{}` marks an HCL map — for example
`Failover{}.Targets[].Service`. Anchor links convert this punctuation to dashes
automatically (`#failover-target-service`), so keep headings unique to avoid anchor
collisions.

<Tabs>
<Tab heading="HCL and JSON" group="hcl">

### `ElementA`

Description of the field.

#### Values

- Default: default value, or "None"
- This field is required. (omit this line if the field is optional)
- Data type: spell it out (`Boolean`, not `bool`; `list`/`map`, not `tuple`/`object`)

### `ElementB{}.ElementC`

Description of the field. If several sibling fields form one tightly-coupled logical unit
(for example, `name`, `port`, and `address`), describe them together in a table instead of
one `###` heading each.

#### Values

- Default: default value, or "None"
- Data type: data type

</Tab>
<Tab heading="YAML" group="yaml">

### `elementA`

Same pattern as the HCL/JSON tab, using the YAML field names and nesting under `spec.`
where applicable.

</Tab>
</Tabs>

## Examples

Introduce each example with a sentence connecting it to the element(s) it demonstrates — for
example, "The following example configures `ElementB` to...".

### {Specific use case}

<CodeTabs>
<Tabs>
<Tab heading="HCL" group="hcl">

```hcl
# HCL version of the example
```

</Tab>
<Tab heading="JSON" group="json">

```json
// JSON version of the example
```

</Tab>
<Tab heading="YAML" group="yaml">

```yaml
# YAML version of the example
```

</Tab>
</Tabs>
</CodeTabs>
```

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Highly structured: uses consistent heading hierarchy and tables where applicable
- [ ] Each item/entry is complete and self-contained
- [ ] No prose narrative — scannable by design
- [ ] For structured/hierarchical configuration: includes `## Configuration model`,
      `## Complete configuration`, `## Specification`, and `## Examples` sections
- [ ] For non-hierarchical information (flat lists, metrics, error codes): uses a reference
      table instead of the nested Configuration model/Specification pattern
- [ ] Element headings in `## Specification` use dot notation for hierarchy (`.`, `[]` for
      lists, `{}` for maps) and are unique so anchor links don't collide
- [ ] Each specified element includes a `#### Values` subsection with Default, Required (if
      applicable), and Data type (spelled out, not abbreviated)
- [ ] `## Complete configuration` is explicitly demonstrative, not a real-world example —
      real-world examples belong in `## Examples`
- [ ] Content that spans more than one language/syntax uses `<Tabs>`/`<CodeTabs>`
      consistently across Configuration model, Complete configuration, Specification, and
      Examples
- [ ] Parameters, flags, or fields include: name, type, required/optional, description, and
      default value where applicable
- [ ] No how-to steps or conceptual explanations inline — link to the relevant how-to or
      concept page instead
- [ ] This page is treated as canonical: other content types link here rather than
      re-describing configuration details
