# Well-Architected Framework content conventions

The Well-Architected Framework is guidance rather than product documentation, 
and it fits the content types least well of anything analyzed. 64% of its pages 
carry a second strong structural signal — the highest rate in the repo, against 
17% across all products — because WAF pages deliberately blend explanation and 
recommendation in a way the taxonomy has no type for.

Its page structure is nonetheless the most consistent in the repo. Two closing
blocks appear on nearly every page.

This page describes what the Well-Architected Framework's documentation looks
like today so its team can own it. Refer to [index.md](index.md#status-labels)
for what the status labels mean.

Owner: Well-Architected Framework documentation team.

## Census summary

123 nav-reachable pages in `content/well-architected-framework`, classified
2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| Concept | 45 | 36.6% |
| How-to | 43 | 35.0% |
| Overview | 18 | 14.6% |
| Usage | 17 | 13.8% |

**Only four content types appear at all.** No CLI reference, no API reference, no
configuration reference, no function reference, no tabular reference, no release
notes. WAF uses no tab components and no partials anywhere.

The concept and how-to split near 50/50 is the classifier drawing a line WAF does
not draw. A WAF page typically explains why something matters and then recommends
how to do it, on the same page, by design. Treat the two numbers as one bucket.

## Closing blocks: HashiCorp resources and Next steps

**Status: In use.**

**What WAF does.** Nearly every page ends with two blocks in a fixed order.

- **HashiCorp resources** links sideways, to WAF pages and product documentation
  covering related guidance. It may nest an **External resources** H3 for
  material outside HashiCorp.
- **Next steps** comes last and links forward, to the WAF pages and tutorials
  that continue the reader's work.

**Evidence, 2026-08-25.**

| Heading | Level | Pages |
| --- | --- | --- |
| `## Next steps` | H2 | 119 |
| `## HashiCorp resources` | H2 | 88 |
| `### External resources` | H3, nested under HashiCorp resources | 60 |

Counts are over the 125 `.mdx` files in `content/well-architected-framework/`;
the census walks 123 of them from the navigation.

```shell-session
$ grep -rl --include='*.mdx' '^## Next steps' content/well-architected-framework/
$ grep -rl --include='*.mdx' '^### External resources' content/well-architected-framework/
```

**External resources is an H3 inside HashiCorp resources**, not a third closing
block. 57 of the 88 pages that carry HashiCorp resources nest it. It holds links
outside HashiCorp — vendor documentation, standards bodies, industry writing.

This is the most consistently applied convention found in any product. It is
marked **In use** rather than Adopted only because the split between the two
blocks is inferred from their contents rather than from a recorded rule.

Note the parallel with [Boundary](boundary.md), which also runs two closing
blocks with a sideways/forward split. The global guidance describes one. Two
products independently arriving at two is worth the writing team's attention as a
possible change to the global rule rather than as two separate exceptions.

**Template:** [guidance.mdx](../templates/well-architected-framework/guidance.mdx).

## Pillar pages

**Status: In use.**

**What WAF does.** Each pillar has an `index.mdx` that opens with the pillar's
subject matter and closes with a fixed four-heading orientation set:

```text
## Topics in this pillar
## Who needs this
## When to focus on this pillar
## How this fits with the framework
```

**Evidence, 2026-08-25.** Four pillar pages, each carrying all four headings.

```shell-session
$ grep -rl --include='*.mdx' '^## Topics in this pillar' content/well-architected-framework/
```

Four pages is below the volume bar an override would normally need. It is
recorded and templated anyway, because the set is exhaustive — every pillar has
one, and a fifth pillar would need to match — and because these are the entry
points to the entire framework.

**Template:** [pillar.mdx](../templates/well-architected-framework/pillar.mdx).

## Guidance pages are procedural without being how-tos

**Status: In use.**

WAF guidance pages carry imperative body headings — "Create a working directory",
"Download and verify HashiCorp's public key" — that read as procedure steps, but
they are not numbered and the pages carry no requirements block. `## Prerequisites`
appears once across 123 pages.

The result classifies as `how-to` on 43 pages and `concept` on 45, and the line
between them is an artifact of the classifier rather than an editorial decision.

The WAF team should decide whether these are one type or two. Until then,
`guidance.mdx` covers both and the distinction stays unmade rather than being
settled by a template.

## Types WAF shares with the global guidance

Overview pages follow the global template. Concept pages follow the global
concept structure — description followed by general subtopics at H2 — with the
two WAF closing blocks appended.

WAF is out of scope for every reference type. If it ever gains one, the global
templates apply.
