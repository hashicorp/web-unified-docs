# Visual aids

Screenshots and diagrams are visual aids that you can provide in documentation to
help practitioners understand how the product works.

## Diagrams

You should create and use diagrams as necessary to help you describe workflows
associated with the product you are documenting. Diagrams have less maintenance
overhead than screenshots and can explain processes far more efficiently. The
following guidance is an adaptation of
[_Using Diagrams in Software Documentation: Best Practices_](https://www.archbee.com/blog/diagrams-in-developer-documentation):

- **Choose the right type of diagram**: The most common type of diagram you may
  create is a workflow diagram that shows how constituent parts of a system
  connect and how actions or information flows through the system. The following
  example shows the Boundary architecture overview:

  ![Boundary architecture overview showing how controllers, workers, and targets connect](../images/architecture-overview_light.png#light-theme-only)
  ![Boundary architecture overview showing how controllers, workers, and targets connect](../images/architecture-overview_dark.png#dark-theme-only)

- **Format diagrams for readability**: Use consistent element shapes and fonts,
  use negative space between elements, arrange components symmetrically, and
  avoid packing too much information into the diagram. Create a series of
  diagrams if the diagram you are creating is too busy.
- **Introduce diagrams**: Avoid building legends and explainer text into the
  diagram. Instead, describe the behavior the diagram intends to show in prose
  that introduces the diagram. This improves maintainability, portability, and
  accessibility.
- **Use the diagram toolkit**: The
  [diagram toolkit](https://docs.google.com/presentation/d/1_dPrYbavWklZSQRqtMypAB0cJ7ZQ3wU_eN0F37YMhT8/edit?usp=sharing)
  contains all of the artwork, product logos, third-party logos, approved
  iconography, and other assets necessary for creating diagrams.
- **Use Helios icons for components**: Draw system components from the
  [Helios icon library](https://helios.hashicorp.design/icons/). Helios is
  HashiCorp's open source design system, so its icons already match the visual
  language of our products and the website the diagram renders on. Reach for a
  Helios icon before drawing a custom shape or pulling one from a third-party
  set, and use the same icon for the same component across every diagram in a
  topic area.

### Provide light and dark variants

Every diagram needs a light and a dark variant so that it remains legible in both
website themes. Export two PNGs and append `_light` and `_dark` to the file name:

```text
architecture-overview_light.png
architecture-overview_dark.png
```

Reference both from the page as two consecutive image links, using the
`#light-theme-only` and `#dark-theme-only` anchors. **Use identical alt text on
both lines** — the two files are one image to a screen reader, and only one
renders at a time.

```mdx
![Boundary architecture overview showing how controllers, workers, and targets connect](/img/architecture-overview_light.png#light-theme-only)
![Boundary architecture overview showing how controllers, workers, and targets connect](/img/architecture-overview_dark.png#dark-theme-only)
```

Store the PNGs in the version's `img` directory. The `/img/` path in the link
resolves to that directory:

```text
content/<product>/<version>/img/architecture-overview_light.png
content/<product>/<version>/img/architecture-overview_dark.png
```

### Commit the diagram sources

Commit the editable source alongside the exported PNGs so that the next author
can revise the diagram instead of recreating it. Store sources in a
`diagram-sources` directory at the same level as `img`, using the same base name
and the same `_light` and `_dark` suffixes:

```text
content/<product>/<version>/
├── diagram-sources/
│   ├── architecture-overview_light.svg
│   └── architecture-overview_dark.svg
└── img/
    ├── architecture-overview_light.png
    └── architecture-overview_dark.png
```

Refer to
[content/boundary/v1.0.x/diagram-sources](../../../content/boundary/v1.0.x/diagram-sources)
for a worked example. Only the PNGs in `img` are published — the sources are
stored for maintenance.

Keep the source editable. Export SVG with icons and labels as vector shapes and
live text rather than flattening them to a single image, so that the next author
can restyle a component or fix a label without rebuilding the diagram. Because
the [Helios icon library](https://helios.hashicorp.design/icons/) ships its icons
as SVG, icons you place from it stay editable in the committed source.

Build the light and dark variants from the same source file so that the two stay
structurally identical. Change only the colors between them — if the variants
drift apart, readers see different diagrams depending on their theme.

## Screenshots

In general, you should avoid using screenshots of the product UI because they are
difficult to maintain and to consistently implement. This guidance applies to
UI-driven products, such as HCP and Terraform Cloud, unless the interface is
stable and unlikely to change with the next cycle.

The style guide is the source of truth for when to use a screenshot. Refer to
[Screenshots](../../style-guide/general/screenshots.md) for the rules, including
cropping out browser chrome. This page covers how to compose, store, and
reference a screenshot once you have decided one is necessary.

> **Scope:** The conventions on this page apply to product documentation in this
> repository. Tutorials, WAF, and certifications content follow the Education
> team's standards instead. Refer to
> [Guidelines for screenshots in tutorials](../../style-guide/appendix.md#guidelines-for-screenshots-in-tutorials)
> for that tooling, dimensions, and per-product file naming, which differ from
> the conventions described here.

Additional screenshot guidance:

- Always introduce and describe the activity captured in the screenshot
  immediately before it. For example, "In the following image, \<activity\>".
- Avoid describing activity screenshots later in the page. For example, "In the
  above screenshot \<activity\>".
- One image per step or concept. Do not create a single multi-step screenshot and
  do not place a series of screenshots one after the other.

### Redact sensitive information

Screenshots capture whatever is on screen, including values that must not be
published. Before you commit a screenshot, review it for:

- Account, organization, project, and tenant IDs
- Email addresses, usernames, and real customer or employee names
- Tokens, keys, credentials, and license values
- IP addresses, internal hostnames, and cluster or node names
- Billing details and support case numbers

Redact these values with the blur tool in your image editor. Blur the region
rather than covering it with a solid shape, and apply the blur destructively so
that the underlying pixels are gone from the exported file — a layered or
non-destructive edit can leave the original values recoverable in the source.
Never rely on cropping alone, because the value may still appear elsewhere in the
image.

Where possible, avoid the problem instead of redacting it. Capture screenshots
from a shared demo organization with non-sensitive data, so that the interface
shows realistic values you can publish as-is. Redaction is visible to readers and
makes an image harder to interpret, so use it only when you cannot stage clean
data.

Apply the same review to diagrams. Architecture diagrams built from a real
deployment often carry hostnames, IP ranges, or account identifiers in their
labels, and those values persist in the committed SVG source even when they are
small or hard to read in the exported PNG.

### Example

The following screenshot shows worker tags in the Boundary Admin UI. The `type`
key has three values: the `type=s3` and `type=worker` tags are config tags, and
the `type=aws` tag is an API tag.

![Worker tags in the Boundary Admin UI, showing a type key with s3, worker, and aws values](../images/ui/worker-tags-api_light.png#light-theme-only)
![Worker tags in the Boundary Admin UI, showing a type key with s3, worker, and aws values](../images/ui/worker-tags-api_dark.png#dark-theme-only)

The example works because it:

- **Crops to the relevant interface.** The screenshot shows the navigation and
  the tags table that the surrounding procedure refers to, without capturing the
  entire browser window.
- **Shows the result of the procedure**, not the steps to reach it. The numbered
  steps describe the clicks; the screenshot confirms the end state.
- **Uses realistic data.** The tag keys and values match what the prose
  describes, so readers can map the text to the interface.
- **Names the interface in the alt text** and describes what the image shows
  rather than restating the caption.
- **Ships light and dark variants**, so it stays legible in both themes.

### Store and reference screenshots

Screenshots follow the same light and dark convention as diagrams, but they live
in a `ui` subdirectory so that they stay separate from diagrams:

```text
content/<product>/<version>/img/ui/
├── worker-tags-api_light.png
└── worker-tags-api_dark.png
```

Reference both variants with identical alt text, exactly as you would a diagram:

```mdx
![Worker tags in the Boundary Admin UI, showing a type key with s3, worker, and aws values](/img/ui/worker-tags-api_light.png#light-theme-only)
![Worker tags in the Boundary Admin UI, showing a type key with s3, worker, and aws values](/img/ui/worker-tags-api_dark.png#dark-theme-only)
```

Because screenshots capture a rendered interface rather than an editable source,
there is no `diagram-sources` equivalent. Record what you configured to produce
the screenshot in the surrounding prose so that the next author can reproduce it.

## Icons and symbols

Avoid using icons and symbols in documentation, even if you are documenting a UI
that uses them instead of text-based labels. Instead, use the word that the icon
or symbol stands for. For example, if you are documenting how to refresh a screen
in a UI-driven product and the button is labeled with a symbol in place of the
word "Refresh", describe interacting with "the refresh button" instead of trying
to reproduce the symbol in the documentation.
