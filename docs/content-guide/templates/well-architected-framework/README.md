# Well-Architected Framework templates

Refer to
[products/well-architected-framework.md](../../products/well-architected-framework.md)
for what these templates encode and the evidence behind them.

| Template | Replaces | Status |
| --- | --- | --- |
| [guidance.mdx](guidance.mdx) | `templates/usage.mdx` and `templates/concept.mdx` | In use |
| [pillar.mdx](pillar.mdx) | `templates/overview.mdx` | In use |

`guidance.mdx` covers both the explanatory and the procedural WAF page, because
WAF does not draw a line between them and this guide should not draw one on its
behalf. The census split them 45 concept to 43 how-to, which is the classifier
guessing rather than a real editorial difference.

Both templates carry WAF's two closing blocks: **HashiCorp resources** links
sideways and **Next steps** links forward and comes last. Those appear on 97 and
114 of 123 pages respectively — the most consistently applied convention found in
any product.

WAF uses the global `overview.mdx` for non-pillar landing pages, and is out of
scope for every reference type.
