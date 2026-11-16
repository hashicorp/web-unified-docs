# Product conventions

The content types in [content-types.md](../content-types.md) describe how
HashiCorp documentation is structured. They are the agreed standard, and they
stay the standard. In practice, every product implements them differently.

This directory records what each product actually does. **Check for your product
here before choosing a content type or copying a template.** If a product has a
page, that page takes precedence over the global guidance for the differences it
records. Everything it does not mention follows the global rule.

## Products

| Product | Page | Records differences in |
| --- | --- | --- |
| Boundary | [boundary.md](boundary.md) | Domain model pages, closing block, CLI reference, generated API reference |
| Consul | [consul.md](consul.md) | CLI reference, API reference |
| Nomad | [nomad.md](nomad.md) | CLI reference, configuration reference, API reference, task driver and autoscaler plugin pages |
| Packer | [packer.md](packer.md) | Configuration reference |
| Terraform | [terraform.md](terraform.md) | Backend and meta-argument pages |
| Terraform (HCP Terraform) | [terraform-docs-common.md](terraform-docs-common.md) | API reference, parallel with Terraform Enterprise |
| Terraform Enterprise | [terraform-enterprise.md](terraform-enterprise.md) | Release notes, parallel with HCP Terraform |
| Vault | [vault.md](vault.md) | Usage renamed to how-to, plugin pages, cookbook, CLI reference, configuration reference, API reference |
| Well-Architected Framework | [well-architected-framework.md](well-architected-framework.md) | Guidance pages, pillar pages, closing blocks |

Products without a page follow the global guidance.

### Coverage

The census covers eleven products. Two have census data but no page yet — the
data is in [census.md](census.md) and a page can be written from it:

| Product | Pages | Why no page yet |
| --- | --- | --- |
| Vagrant | 198 | Stable content set, low growth |
| Sentinel | 83 | Stable content set, low growth |

The following have documentation in this repo and **no census data at all**.
Their absence means "not looked at", not "no differences":

| Product | Approx. pages |
| --- | --- |
| HCP docs | 450 |
| Validated designs | 231 |
| Terraform plugin framework | 148 |
| Terraform CDK | 80 |
| Terraform plugin testing, SDK, policy | 115 combined |

To cover a product, add it to the `PRODUCTS` table at the top of `census.py`, run
the script, and write a page following the pattern of the eight that exist.

## These pages describe; they do not prescribe

A product page is a record of what a product's documentation looks like today,
written so the team that owns that documentation can recognize it and take
ownership of it. It is not a list of violations, and correcting the pages to
match the global templates is not the goal.

The reason is practical. Guidance that describes documentation nobody has written
gets ignored, and enforcing a template against thousands of existing pages is a
project no one has funded. Guidance that describes what a writer actually sees
when they open a sibling page gets followed.

The global templates remain the standard for **new** documentation where a
product has expressed no preference. A product page overrides that standard only
where the product has an actual, observable practice.

## An absent override is not a claim of compliance

A product page records three different situations, and they must not be confused:

| Situation | What the page says |
| --- | --- |
| The product follows the global template | Named explicitly, with the counts |
| The product has a **competing convention** | An override template |
| The product follows **neither** | A recorded gap, with no template |

The third case is real and common. Packer's documentation contains **zero**
`## Next steps` headings; Vault has **zero** `## Introduction` headings across
120 index pages. Neither has replaced the global template with anything
consistent, so neither gets an override — templating an absent convention would
mean inventing one.

Every product page states which of the three applies for each type it does not
override. Do not infer compliance from the absence of a template.

## Status labels

Describing what exists risks freezing it. A convention and an unresolved
inconsistency look identical in a census — both are just pages on disk — so every
difference a product page records carries a status:

| Status | Meaning | What a writer should do |
| --- | --- | --- |
| **Adopted** | The team has decided. This is the product's convention. | Follow it. Use the override template. |
| **In use** | Exists at scale. The team has not ruled on it. | Match the surrounding pages. Do not introduce a third variant. |
| **Legacy** | Superseded by something else on this page. | Do not use for new pages. Leave existing pages alone. |

**In use** is the honest label for most of what the census found, and it is the
one that keeps this directory from calcifying. It says a practice is real without
claiming anyone chose it, and it leaves the decision with the team that owns the
pages rather than settling it by documenting it.

A product page may record two conventions for the same block, both marked **In
use**, when that is the truth. Boundary's closing block is the worked example.

## Adding to a product page

Record a **difference from the global guidance**, not a restatement of it. Each
entry carries:

1. **What the product does differently** — the specific block, heading, or
   structure that diverges.
1. **A status** from the table above.
1. **Evidence** — how many published pages follow it, the date the count was
   taken, and the command that produced it.
1. **The override template**, if one exists.

Add an **owner** to the page as a whole: the team accountable for keeping it
true and for moving **In use** entries to **Adopted** or **Legacy** over time.

## Counting conventions

Counts go stale. Two rules keep that honest:

- **Stamp every count with the date it was taken.** A stamped stale count is
  information. An unstamped one is a claim.
- **Ship the command next to the count**, so refreshing it is a ten-second job
  rather than a re-derivation.

The counts on these pages come from a census of every nav-reachable page across
the six largest products. Refer to [census.md](census.md) for its scope, method,
accuracy, and known failure modes before quoting any figure from it.
