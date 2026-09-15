# Screenshots

These guidelines describe when and how to use screenshots in your content.


## Avoid screenshots in documentation 

- **keywords**: visual aids, screenshots
- **content sets**: docs

HashiCorp UIs change too frequently and are a maintenance burden. Concise descriptions of the user workflow are simpler to keep up to date. Work with your technical writer to determine when a screenshot may be necessary. 

## Add screenshots to tutorials according to the Education team's standards

- **keywords**: visual aids, screenshots
- **content sets**: tutorials, WAF, certifications

Refer to [Guidelines for screenshots in tutorials](../appendix.md#guidelines-for-screenshots-in-tutorials) for details, including tooling, dimensions, and per-product file naming conventions.

## Remove the browser's URL bar and window elements from screenshots

- **keywords**: visual aids, screenshots
- **content sets**: docs, tutorials, WAF, certifications

If you must include screenshots, crop out the address bar and other browser elements so that readers can focus on the product UI.

## Redact sensitive information from screenshots

- **keywords**: visual aids, screenshots, security, redaction
- **content sets**: docs, tutorials, WAF, certifications

Screenshots capture whatever is on screen. Before you commit one, review it for values that must not be published:

- Account, organization, and project IDs
- Email addresses, usernames, and real names
- Tokens, keys, and credentials
- IP addresses and internal hostnames
- Billing details

Redact those values with the blur tool in your image editor. Apply the blur destructively so that the original pixels no longer exist in the exported file. Prefer capturing from a shared demo organization with publishable data over redacting after the fact.

Refer to [Redact sensitive information](../../content-guide/content-types/visual-aids.md#redact-sensitive-information) for the full checklist, including diagram labels.

## Provide light and dark variants of every screenshot and diagram

- **keywords**: visual aids, screenshots, diagrams, images
- **content sets**: docs

Export a `_light` and a `_dark` variant and reference both with the `#light-theme-only` and `#dark-theme-only` anchors, using identical alt text on each line. Store screenshots in the version's `img/ui` directory and diagrams in `img`.

Refer to [Visual aids](../../content-guide/content-types/visual-aids.md) for the full conventions, a worked example, and where to commit diagram sources.
