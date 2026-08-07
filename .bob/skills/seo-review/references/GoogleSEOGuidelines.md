# Google Search Central SEO Guidelines

Source: https://developers.google.com/search/docs (SEO Starter Guide, Search
Essentials, Creating Helpful Content, Spam Policies). Use this as the
reference for the `seo-review` skill. Quotes are paraphrased from Google's
official documentation.

## 1. Titles and link text

- Every page needs a unique, clear, concise `<title>` that accurately
  describes the page's contents. No two pages on a site should share a title.
- Include the business/product name and page-specific context where relevant
  (e.g. physical location for local business pages).
- Titles should not be exaggerated, sensational, or clickbait.
- Anchor text for links (internal and external) should be descriptive of the
  destination page, not generic ("click here", "read more").

## 2. Meta descriptions

- One or two sentences, unique per page, summarizing the most relevant points
  of the page.
- Should help a searcher decide whether the page answers their need before
  they click.
- Do not duplicate the same meta description across multiple pages.

## 3. Headings

- Use headings (H1–H6) to break content into logical sections and help users
  (and screen readers) navigate.
- Maintain a sensible semantic order (don't skip from H1 to H4).
- Each heading should be a descriptive, accurate summary of the section that
  follows — not vague or clickbait.
- Avoid excessive headings/over-fragmenting content — "if you feel like
  you have too many, you probably do."

## 4. URL structure

- Use descriptive URLs with real words relevant to the content
  (`/pets/cats.html`) rather than opaque IDs (`/2/6772756`).
- Group topically related pages under shared directories/paths.
- Do not keyword-stuff the URL/domain — keywords in the URL path have
  "hardly any effect" on ranking beyond how they appear in breadcrumbs.
- Ensure each piece of content is reachable through exactly one canonical
  URL; use 301 redirects or `rel="canonical"` to resolve duplicates.

## 5. Content quality ("helpful, reliable, people-first")

Self-assessment questions Google recommends applying to content:

- Does it provide original information, reporting, research, or analysis?
- Is it substantial, complete, and comprehensive on the topic?
- Does it offer insight beyond the obvious?
- If it draws on other sources, does it add substantial value rather than
  just summarizing/copying them?
- Would you bookmark it, share it, or expect to find it in a
  magazine/encyclopedia/book?
- Does it provide clearly more value than other pages already ranking for
  the same topic?
- Is it well-written, free of spelling/grammar issues, and does it look
  professionally produced rather than hastily assembled?
- Does the content read as individually crafted, not mass-produced across
  many pages/sites with little unique care (including low-effort AI
  generation at scale)?

Warning signs of "search engine-first" content to flag:

- Content produced primarily to attract search traffic rather than to serve
  an existing audience.
- Broad, unfocused coverage of many trending topics with no real expertise.
- Heavy automation/AI-generation with no meaningful human value-add.
- Summarizing other sources without adding anything new.
- Padding to hit a perceived "target word count."
- Cosmetic freshness signals — changing a publish/update date without a
  substantive content update.
- Promising an answer to a question the content doesn't actually answer.

## 6. E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

Evaluate content against "Who, How, Why":

- **Who** created it — is authorship clear (byline, author bio, credentials)?
- **How** was it created — is any automation/AI assistance disclosed and
  was it reviewed appropriately?
- **Why** was it created — primarily to help readers, or primarily to
  attract/manipulate search rankings?

Also check for:

- Clear sourcing/citations and evidence of subject-matter expertise.
- Easily verifiable factual accuracy (flag unverifiable or wrong claims).
- Evidence of first-hand experience where the topic calls for it (e.g.
  product reviews, how-tos).

Note: E-E-A-T itself is not a direct ranking factor/score — treat it as a
quality lens, not a checklist to game.

## 7. Images and video

- Place high-quality images near the text they relate to (contextual
  placement, not a disconnected gallery).
- Every meaningful image needs descriptive `alt` text that explains the
  image's relationship to the surrounding content — not keyword-stuffed.
- Embed videos on their own relevant page, with a descriptive title and
  description, placed near related text.

## 8. Internal and external linking

- Link to relevant resources that support or corroborate claims.
- Use descriptive anchor text (see Section 1).
- Add `rel="nofollow"` (or `sponsored`/`ugc` as appropriate) to untrusted,
  paid, or user-generated links.
- Make sure links are crawlable (real `<a href>` elements, not JS-only
  click handlers) so Google can discover other pages on the site.

## 9. Technical crawlability

- Content and navigation must be visible to Google the same way a normal
  user sees it — don't hide primary content behind JS that isn't rendered
  or behind login walls.
- Don't block CSS/JS resources needed to render the page via robots.txt.
- Don't unnecessarily block indexable pages via robots.txt/`noindex`.

## 10. Duplicate content

- Each piece of content should be reachable via one canonical URL.
- Use 301 redirects from non-preferred URL variants to the canonical one,
  or `rel="canonical"` where a redirect isn't possible.

## 11. Structured data

- Add valid structured data (schema.org via JSON-LD, per Google's
  documented types) where it matches the content, to become eligible for
  rich results (review stars, carousels, FAQs, etc.).
- Structured data must accurately reflect visible page content — do not
  mark up content that isn't actually present on the page.

## 12. Explicitly NOT ranking factors (don't recommend these as fixes)

- The `<meta name="keywords">` tag — Google Search ignores it.
- Keywords in the domain name/TLD, beyond minor breadcrumb display effects.
- TLD choice, except for explicit country/region targeting.
- PageRank/backlink count in isolation, as the primary lever.

## 13. Spam policy violations to flag

If content review surfaces any of these, flag as a policy risk, not just an
optimization opportunity:

- **Cloaking** — showing different content to users vs. crawlers.
- **Doorway pages** — many near-duplicate pages targeting similar queries
  that funnel to another destination.
- **Expired domain abuse** — repurposing an expired domain mainly to
  inherit its ranking signals.
- **Hacked content** — unauthorized injected content/links.
- **Hidden text/links** — white-on-white text, off-screen text, zero-size
  or zero-opacity text used to stuff keywords invisibly.
- **Keyword stuffing** — unnatural repetition of words/phrases to
  manipulate rankings.
- **Link spam** — buying/selling links, excessive link exchanges,
  automated link generation, low-quality directory submissions.
- **Machine-generated traffic** — automated scraping/querying of Search.
- **Scaled content abuse** — many pages generated at low effort/quality
  (AI, scraping, or stitching) primarily to rank, not to help readers.
- **Scraped content** — republishing others' content without adding
  original value or attribution.
- **Site reputation abuse** — third-party content hosted mainly to borrow
  the host site's ranking signals.
- **Sneaky redirects** — sending users somewhere different from what was
  crawled/indexed.
- **Thin affiliate content** — copied manufacturer/merchant descriptions
  with no original review or added value.
- **User-generated spam** — unmoderated spammy comments/posts/accounts.
- **Scam/impersonation content** — false claims of affiliation, deceptive
  business info.

## 14. Things that have no min/max requirement

- There is no minimum or maximum word count for content quality.
- There is no fixed number of headings, images, or internal links —
  judge fit-for-purpose, not a quota.
