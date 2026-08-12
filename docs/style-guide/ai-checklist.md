# AI agent checklist

This page is a scannable, machine-consumable checklist derived from the rest of this style
guide. It exists so that tools and AI agents reviewing content can apply every rule without
duplicating rule text elsewhere — if you're a human author looking for rationale, examples,
and full explanations, use the [table of contents](index.md) instead.

Each rule entry uses the following tags in addition to the guide's usual **keywords** and
**content sets**:

- **priority**: `critical`, `important`, or `standard` — how much a violation should weigh in
  a review.
- **auto-fixable**: `yes`, `no`, or `partial` — whether a tool can safely apply a correction
  without human judgment. `partial` means some cases are mechanical and others require
  judgment; the entry's `detect`/`fix` fields explain the split.
- **detect** / **fix**: for `auto-fixable: yes` or `partial` entries only — the literal
  pattern to find and the mechanical correction to apply.

Where a fuller explanation already exists elsewhere in the style guide, the entry links to it
with a **detail** field instead of repeating the rationale and examples here.

## Voice, tone, and point of view

### Address readers as "you"

- **keywords**: writing, grammar, point of view, second person
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: critical
- **auto-fixable**: no
- **detail**: [general/point-of-view.md](general/point-of-view.md)

Address readers as "you" when describing actions the reader performs.

### Use "we" only for HashiCorp actions or recommendations

- **keywords**: writing, grammar, point of view, first person plural
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/point-of-view.md](general/point-of-view.md)

Use "we" only when referring to HashiCorp actions or recommendations, for example "We
recommend…", "We added…", "We deprecated…". Do not use "we" to guide readers through
examples, for example "In this example, we configure…".

### Do not use "let's" or "our" for reader actions

- **keywords**: writing, grammar, point of view
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/point-of-view.md](general/point-of-view.md)

Do not use "let's", "our" when referring to the reader's environment, or first-person plural
to describe reader actions.

### Use active voice

- **keywords**: writing, grammar, active voice, passive voice
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: critical
- **auto-fixable**: no
- **detail**: [general/active-voice.md](general/active-voice.md)

Use active voice. Avoid passive constructions, for example "the secret is stored" becomes
"Vault stores the secret".

### Use present tense

- **keywords**: writing, grammar, tense
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/tense-and-time.md](general/tense-and-time.md)

Use present tense. Avoid future tense ("will"): write "the command returns" not "the command
will return".

### Use imperative mood for instructions

- **keywords**: writing, grammar, instructions, imperative
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Use imperative mood for instructions: "Run the command" not "You should run the command".

### Do not use "please" in instructions

- **keywords**: writing, tone, instructions
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: yes
- **detect**: "please" in an instructional sentence
- **fix**: remove it, or rewrite as a direct imperative — for example, "Please run the
  following" becomes "Run the following"; "Please note that" becomes "Note that" or rewrite
  as prose; "Please ensure" becomes "Ensure"

Do not use "please" in instructions.

### Do not use minimizing language

- **keywords**: writing, word choice, minimizing language, editorializing
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: partial
- **detect**: "simply", "just", or "easily" modifying a verb; "easy" describing a task in a
  way that trivializes it
- **fix**: remove "simply", "just", "easily" where they modify a verb (for example, "simply
  run" becomes "run"; "just click" becomes "click"; "you can easily configure" becomes "you
  can configure"). For "easy" describing a task in a trivializing way (for example, "it is
  easy to set up"), remove or rewrite the sentence — this case requires manual judgment, do
  not auto-apply. Do not remove "easy" from proper names or unambiguous non-trivializing uses.

Do not use "simple", "easy", "just", or other minimizing language.

## Terminology and product names

### Flag terms with style-guide-specified preference or casing

- **keywords**: terminology, word choice
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Flag any terms the style guide marks as preferred, avoided, or with specific casing.

### Capitalize HashiCorp product names correctly

- **keywords**: terminology, product names, capitalization
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: critical
- **auto-fixable**: no

HashiCorp product names must be capitalized correctly, for example "Vault", "Terraform",
"HCP Vault Radar".

### Use full HCP product name on first reference, then short name

- **keywords**: terminology, product names, HCP
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Use the full HCP product name on first reference, then the short name: "HCP Vault Radar" then
"Vault Radar"; "HCP Vault Dedicated" then "HCP Vault".

### Spell out acronyms on first use

- **keywords**: terminology, acronyms
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Spell out acronyms on first use, for example "Key-Value (KV) secrets engine" then "KV"
thereafter.

### Use correct capitalization for non-HashiCorp products

- **keywords**: terminology, product names
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

For non-HashiCorp products, use the vendor's correct capitalization and spelling, for example
"Slack", not "slack".

### Do not use Latin abbreviations

- **keywords**: terminology, word choice, Latin abbreviations
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: yes
- **detect**: "e.g." or "e.g"; "i.e." or "i.e"; trailing ", etc." or " etc."
- **fix**: "e.g." or "e.g" becomes "for example"; "i.e." or "i.e" becomes "that is"; for a
  trailing "etc." — if the sentence already uses "such as", "including", or "for example",
  remove "etc." (the list is implicitly open-ended and "etc." is redundant); otherwise this
  case requires manual judgment, do not auto-apply

Do not use Latin abbreviations: write "for example" not "e.g.", "that is" not "i.e.", avoid
"etc."

### Do not use unofficial product abbreviations

- **keywords**: terminology, product names, abbreviations
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [top-12.md](top-12.md#do-not-use-unofficial-product-abbreviations)

Do not use unofficial product abbreviations: TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM.

## Word choice

### Do not describe product state with time-reference words

- **keywords**: word choice, tense, product state
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [top-12.md](top-12.md#describe-features-and-functionality-as-they-currently-exist)

Do not use words that reference points in time to describe product state: "new", "old",
"now", "currently" (exception: release notes and beta callouts).

### Do not use shortened or abbreviated forms

- **keywords**: word choice, abbreviations
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Do not use shortened or abbreviated forms: "repository" not "repo", "directory" not "dir",
"configuration" not "config".

### Do not use jargon or non-English words without explanation

- **keywords**: word choice, jargon
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [top-12.md](top-12.md#do-not-use-words-or-phrases-borrowed-from-other-languages-scientific-words-or-jargon-words)

Do not use jargon or non-English words without explanation: avoid "via", "sanity check",
"smoke test", "blast radius", "carte blanche", "ergo", "vice versa".

### Do not use speculative or hypothetical framing

- **keywords**: word choice, framing
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use speculative or hypothetical framing: avoid "imagine", "suppose", "pretend".

### Do not use rhetorical questions

- **keywords**: word choice, headings, tone
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use rhetorical questions in headings or prose.

### Do not use weak enabling constructions

- **keywords**: word choice, enabling constructions
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Do not use weak enabling constructions: "allows you to" and "enables you to" should be
replaced with a direct active verb, for example "Vault allows you to store secrets" becomes
"Vault stores secrets".

### Use shorter, more common words

- **keywords**: word choice, plain language
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [top-12.md](top-12.md#use-the-simplest-word-possible)

Use shorter, more common words where possible, for example "use" not "utilize", "start" not
"initiate".

### Flag long sentences for splitting

- **keywords**: sentence length, readability
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Flag sentences over approximately 30 words as candidates for splitting.

## Formatting

### Bold UI elements

- **keywords**: formatting, UI elements
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [ui-components.md](ui-components.md)

Use bold for UI labels, for example **Save**, **Settings**.

### Use code formatting for code elements

- **keywords**: formatting, code elements
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/fonts-and-formats.md](general/fonts-and-formats.md)

Use code formatting for commands, values, file paths, API endpoints, and configuration keys.

### Use ALL_CAPS for inline prose placeholders

- **keywords**: formatting, placeholders
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detect**: an inline prose placeholder in lowercase or snake_case, for example `` `your_token` ``
- **fix**: rewrite as ALL_CAPS, for example `` `your_token` `` becomes `` `YOUR_TOKEN` `` —
  too risky to auto-apply, flag and suggest instead

Use ALL_CAPS for user-supplied values in prose, for example `YOUR_TOKEN`.

### Use angle brackets for code block placeholders

- **keywords**: formatting, placeholders, code blocks
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Use angle brackets for placeholders inside code blocks, for example `<path/to/file>`,
`<cluster-name>` — not ALL_CAPS.

### Do not overuse bold and italics

- **keywords**: formatting, emphasis
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not overuse bold and italics: bold for emphasis or UI labels; italics sparingly.

### Do not place same-type elements adjacent to each other

- **keywords**: formatting, layout
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [top-12.md](top-12.md#do-not-place-the-same-type-of-content-elements-next-to-each-other)

Do not place the same type of element immediately adjacent to another of the same type: no
consecutive alerts, consecutive headings without intervening prose, consecutive tables, or
consecutive lists.

### Insert blank lines between adjacent block elements

- **keywords**: formatting, markdown, blank lines
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: yes
- **detect**: two adjacent block elements (headings, paragraphs, lists, code fences,
  admonition components, horizontal rules) with no blank line between them
- **fix**: insert a blank line between them

Insert a blank line between any two adjacent block elements that lack one.

## Code blocks

### Use shell-session for CLI commands

- **keywords**: code blocks, shell, CLI
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: critical
- **auto-fixable**: no
- **detail**: [codeblocks-and-consoles/fonts-and-formats.md](codeblocks-and-consoles/fonts-and-formats.md)

CLI/shell commands must use `` ```shell-session `` (not `` ```bash ``), with a `$` prompt
prefix for each command.

### Split commands longer than 100 characters

- **keywords**: code blocks, shell, line length
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [codeblocks-and-consoles/organization.md](codeblocks-and-consoles/organization.md)

Commands longer than 100 characters must be split with the shell line continuation character
(`\`).

### Use javascript label for JSON with comments

- **keywords**: code blocks, JSON, syntax highlighting
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

JSON that contains comments must use the `javascript` syntax label, not `json`.

### Indent long commands inside numbered lists

- **keywords**: code blocks, lists, indentation
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Long commands in a numbered list must be indented four spaces to preserve list numbering.

### Do not use code comments to explain code

- **keywords**: code blocks, comments
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [codeblocks-and-consoles/language.md](codeblocks-and-consoles/language.md)

Do not use code comments to explain what the code does — introduce the block with a sentence
instead.

## Headings

### Use sentence case for headings

- **keywords**: headings, capitalization
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: yes
- **detect**: a heading in title case
- **fix**: lowercase every word except the first word of the heading and proper nouns
  (product names, acronyms, trademarked terms); do not alter code or command text inside
  headings
- **detail**: [general/titles-and-headings.md](general/titles-and-headings.md)

Use sentence case for all headings.

### Do not start headings with gerunds

- **keywords**: headings, phrasing
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not start headings with gerunds (-ing words).

### Do not start headings with articles

- **keywords**: headings, phrasing
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not start headings with articles (a, an, the).

### Keep headings under 12 words

- **keywords**: headings, length
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Keep headings under 12 words.

### Use action-oriented headings for procedural content

- **keywords**: headings, procedural content
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Headings must be action-oriented for procedural content.

## Numbers, punctuation, and spelling

### Use Oxford commas

- **keywords**: punctuation, grammar
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/grammar.md](general/grammar.md)

Use Oxford commas (serial commas).

### Spell out numbers under 10

- **keywords**: numbers
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [numbers-dates-time/words-as-numbers.md](numbers-dates-time/words-as-numbers.md)

Spell out numbers under 10; use numerals for 10 and above.

### Use American English spelling

- **keywords**: spelling
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/grammar.md](general/grammar.md)

Use American English spelling throughout, for example "initialize" not "initialise",
"center" not "centre".

## Links

### Use descriptive link text

- **keywords**: links, accessibility
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/links.md](general/links.md)

Use descriptive link text — never "click here" or "this page".

### Use relative links for internal cross-references

- **keywords**: links
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [markdown/links.md](markdown/links.md)

Use relative links for internal cross-references where the style guide specifies.

### Verify link text matches the target

- **keywords**: links, accuracy
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Verify link text accurately describes the target.

## Alerts and admonitions

### Use Tip for optional guidance

- **keywords**: alerts, admonitions, Tip
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/alerts.md](general/alerts.md)

`<Tip>`: best practices or optional settings and workflow — information not required to
complete the task.

### Use Note for information the reader may need to act on

- **keywords**: alerts, admonitions, Note
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no
- **detail**: [general/alerts.md](general/alerts.md)

`<Note>`: information the user may need to act on.

### Use Warning only for critical, required actions

- **keywords**: alerts, admonitions, Warning
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/alerts.md](general/alerts.md)

`<Warning>`: information the user must act on — only for breaking changes, security
vulnerabilities, critical compatibility issues, or catastrophic consequences.

### Use the enterprise partial for paid-edition callouts

- **keywords**: alerts, admonitions, enterprise, EnterpriseAlert
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/enterprise-releases.md](general/enterprise-releases.md)

`<EnterpriseAlert>` / `<EnterpriseAlert inline/>`: paid-edition feature callouts; use the
appropriate partial, not a custom `<Note>`.

### Avoid Note and Tip in docs

- **keywords**: alerts, admonitions, docs
- **content sets**: docs
- **priority**: important
- **auto-fixable**: no

This rule is stricter for docs than for tutorials: integrate supplemental information into
prose instead of using `<Note>` or `<Tip>` — alerts lose effectiveness when overused.

### Link to tutorials with a blockquote, not a Note

- **keywords**: alerts, tutorials, blockquotes, docs
- **content sets**: docs
- **priority**: standard
- **auto-fixable**: no

Use Markdown blockquotes to link to tutorials from docs:
`> **Hands-on:** Try the [Tutorial title](URL) tutorial.` — not a `<Note>` component.

### Use Warning for upgrade, compatibility, and security situations in docs

- **keywords**: alerts, Warning, docs
- **content sets**: docs
- **priority**: important
- **auto-fixable**: no

Use `<Warning>` for upgrade, compatibility, and security situations in docs. Place it
immediately before the step or config it applies to.

### Never begin a page with an alert

- **keywords**: alerts, page structure
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Never begin a page with an alert.

### Never place consecutive alert boxes

- **keywords**: alerts, layout
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Never place consecutive alert boxes — always separate with prose.

### Use include partials for standardized messages

- **keywords**: alerts, include partials, standardized messages
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

For beta, deprecated, enterprise, or paid-tier features, use the product's standardized
`@include` partial — do not write a custom inline alert.

## Lists

### Use numbered lists for sequential steps

- **keywords**: lists, procedures
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Use numbered lists for sequential or procedural steps.

### Use bulleted lists for non-sequential items

- **keywords**: lists
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Use bulleted lists for non-sequential items.

### Maintain parallel structure within a list

- **keywords**: lists, grammar, parallelism
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Maintain parallel structure within a list — all items start with the same part of speech.

### Be consistent with list-item punctuation

- **keywords**: lists, punctuation
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Be consistent with punctuation at the end of list items.

## Inclusive language

### Avoid gendered pronouns

- **keywords**: inclusive language, gendered pronouns
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: critical
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Avoid gendered pronouns; use "they/them" for the singular third person.

### Refer to roles, not gendered nouns

- **keywords**: inclusive language, roles
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Refer to roles ("developer", "administrator") rather than gendered nouns.

### Do not use "see <link>"

- **keywords**: inclusive language, ableist language, links
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Do not use "see <link>" — use "refer to <link>".

### Do not use "sanity check"

- **keywords**: inclusive language, ableist language
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no
- **detail**: [general/language.md](general/language.md)

Do not use "sanity check" — use "preliminary check" or "verification".

### Do not use "dummy" for placeholder values

- **keywords**: inclusive language, ableist language, placeholders
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use "dummy" to describe placeholder values — use "example" or "placeholder".

### Do not use "hit" for button or key presses

- **keywords**: inclusive language, violent language, UI actions
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use "hit" for button or key presses — use "press" or "click".

### Do not use "kill" for processes when an alternative exists

- **keywords**: inclusive language, violent language, processes
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use "kill" for processes when an alternative exists — use "stop" or "end"; `kill` as a
literal command name is acceptable.

### Do not use "abort" for user-initiated cancellation

- **keywords**: inclusive language, violent language, cancellation
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: standard
- **auto-fixable**: no

Do not use "abort" for user-initiated cancellation — use "cancel" or "stop".

### Do not describe tasks as trivial or obvious

- **keywords**: inclusive language, exclusionary framing
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Do not describe tasks as "trivial", "obvious", or "self-explanatory".

### Do not assume reader environment or prior knowledge

- **keywords**: inclusive language, assumptions, prerequisites
- **content sets**: docs, tutorials, WAF, certifications
- **priority**: important
- **auto-fixable**: no

Do not assume the reader's environment or prior knowledge beyond what is stated in the
prerequisites.
