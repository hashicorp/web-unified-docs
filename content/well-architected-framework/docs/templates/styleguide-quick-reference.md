# HashiCorp Style Guide - Quick Reference

**Purpose:** Machine-optimized quick-reference for LLM and automated style checking.
**Full guide:** See `styleguide.md` for comprehensive human reference with examples.

---

## Top 12 Critical Guidelines

### 1. Active Voice
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Subject performs action. No passive constructions.
- **Detect:** "will be", "is recommended", "are owned by"
- **Fix:** Rewrite with active subject performing action
- **Example:** "Register the service" not "The service will be registered"

### 2. Present Tense for Immediate Actions
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** Use simple present for procedural steps and outputs
- **Detect:** "will show", "will appear", "will change"
- **Fix:** Remove "will" → use present tense
- **Example:** "The output shows" not "The output will show"

### 3. No Future Features
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Only describe current functionality
- **Detect:** "new", "old", "now", "currently", "will be available"
- **Fix:** Remove temporal references or rewrite
- **Example:** Document as-is, not future promises

### 4. No Unofficial Abbreviations
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
- **Fix:** Use full product names
- **Example:** "HCP Terraform" not "TFC"

### 5. "We" Only for HashiCorp
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Use "we" for HashiCorp recommendations only
- **Detect:** "we will", "we configure", "our configuration"
- **Fix:** Use "you" or imperative statements
- **Example:** "We recommend" OK; "In this example, we configure" NOT OK

### 6. Address Reader as "You"
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Second person or imperative for reader actions
- **Detect:** "a user", "users can", "one can"
- **Fix:** Replace with "you" or imperative
- **Example:** "You configure" or "Configure" not "A user configures"

### 7. Content Flows Forward Only
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** No backtracking. Use specific references.
- **Detect:** "above", "below", "previously", "the example below"
- **Fix:** "following" or link to specific section
- **Example:** "In the following example" not "The example below"

### 8. Avoid Unnecessary Words
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Remove filler and redundant phrases
- **Detect:** "in order to", "in the case that", "simply", "just", "very", "actually"
- **Fix:** "to", "when", or delete entirely
- **Example:** "to configure" not "in order to configure"

### 9. Use Simplest Word Possible
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** Short, simple words only
- **Detect:** "utilize", "utilization", "enables", "allows", "due to the fact that"
- **Fix:** "use", "lets", "because"
- **Example:** "Vault lets you" not "Vault enables you to"

### 10. No Latin Phrases or Foreign Words
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Do not use Latin phrases, abbreviations, or foreign loan words. Use simple English words for global clarity.
- **Detect:** "ad-hoc", "via", "etc.", "e.g.", "i.e.", "ergo", "vice versa", "per se", "status quo", "de facto", "in lieu of", "a priori", "post hoc", "verbatim", "carte blanche", "sanity check", "smoke test"
- **Fix:** See replacements in table below
- **Example:** "through SSH" not "via SSH", "improvised" not "ad-hoc", "for example" not "e.g."

### 11. No Adjacent Same Elements
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Don't stack alerts, headings, tables, lists, images
- **Detect:** Two consecutive non-prose elements
- **Fix:** Add introductory text between elements
- **Example:** Add paragraph between two headings

### 12. "Lets" Not "Enables/Allows"
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** Products/tools "let" users do things
- **Detect:** "enables you", "allows you", "enables users", "allows users"
- **Fix:** Replace with "lets you" or "lets users"
- **Example:** "HCP Terraform lets you" not "enables you to"

---

## Active Voice

### Write Active Sentences
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Detect:** Forms of "be" + past participle ("will be registered", "is recommended", "are owned")
- **Fix:** Subject performs action explicitly
- **Pattern:** Look for passive indicators: "is/are/was/were/be/been + verb-ed"

### Use Direct Imperatives
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Tell readers what to do directly
- **Detect:** "can be set", "should be configured"
- **Fix:** "Set", "Configure" (imperative form)

---

## Alerts and Callouts

### Use Alerts Sparingly
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Avoid excessive alerts; they distract
- **Detect:** Multiple alerts on one page
- **Fix:** Integrate into body text when possible

### Tutorial Links as Blockquotes
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Use markdown blockquote for tutorial links
- **Detect:** `<Note title="Hands-on">`
- **Fix:** Convert to `> **Hands-on:**` blockquote

### Warning Alerts for Harmful Actions
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Use `<Warning>` only for potentially harmful actions
- **Detect:** Warnings for non-critical information
- **Fix:** Reserve for data loss, security issues, system damage

### Tip Alerts for Best Practices
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** `<Tip>` for optional settings/best practices only
- **Detect:** Tips containing core functionality
- **Fix:** Move core functionality to body text

---

## Content Organization

### No FAQ Sections
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Redesign content around use cases instead
- **Detect:** FAQ sections, "Frequently asked questions"
- **Fix:** Integrate Q&A into appropriate topics

### Forward-Only Flow
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "above", "below", "previously", "earlier", "the previous step"
- **Fix:** "following", "step 1", specific section links
- **Pattern:** Regex: `\b(above|below|previously|earlier)\b`

### Specific Step References
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "the previous step", "the step above"
- **Fix:** "step 1", "step 2" or specific section name
- **Example:** "Copy output from step 1" not "from the previous step"

### Simple Single-Idea Sentences
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** One idea per sentence. No semicolons, dashes to merge ideas.
- **Detect:** Long sentences (>30 words), semicolons, em dashes
- **Fix:** Split into multiple sentences

### No List Overuse
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Don't force paragraphs into lists
- **Detect:** Multi-paragraph list items, nested 3+ levels
- **Fix:** Use subheadings with flat lists instead

### Introduce Diagrams/Tables/Code
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Describe element before showing it
- **Detect:** Diagram/table/code without introduction
- **Fix:** Add "The following [element]..." before

### No Adjacent Same Elements
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Detect:** Alert+alert, heading+heading, table+table, list+list, image+image
- **Fix:** Add introductory text between

### Include Localhost URLs
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Include full URL for local services
- **Example:** `` `http://localhost:8500` `` not "Go to the UI"

### Match Navigation and Page Titles
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Navigation label, H1, meta title should align
- **Detect:** Mismatched titles
- **Fix:** Align keywords across all three

### Badge for Beta/Deprecated
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Use navigation badges for status/editions
- **Detect:** Missing badges for beta/deprecated/enterprise
- **Fix:** Add badge with correct style

### Write Modular Pages (DRY)
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Write once, link from multiple contexts
- **Detect:** Copy-pasted content
- **Fix:** Extract to shared location, use partials

---

## Enterprise and Releases

### Enterprise Alert for Paid Features
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Use `<EnterpriseAlert>` for paid editions
- **Detect:** Paid features without alert
- **Fix:** Add alert after page description or in relevant section

### Inline Alerts for Reference Pages
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Inline enterprise alerts at specific elements
- **Detect:** Block alerts on reference pages
- **Fix:** Use `<EnterpriseAlert inline/>` at element level

### Use Standard Partials
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** Don't write custom alerts for beta/enterprise/deprecated
- **Detect:** Custom alert text for standard conditions
- **Fix:** Use standard partial

### Beta Alerts as Notes
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Use `<Note>` style for beta features
- **Detect:** Other alert types for beta
- **Fix:** Convert to note-style alert

### Edition Requirements in Requirements Section
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** State edition/subscription in Requirements section
- **Detect:** Edition info scattered in body
- **Fix:** Move to Requirements section

---

## Fonts and Formatting

### Lowercase Regular Nouns
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Features, components, binaries are lowercase unless branded
- **Detect:** "Virtual Machine", "Consensus Protocol", "Active/Active"
- **Fix:** "virtual machine", "consensus protocol", "`active-active`"
- **Exception:** Brand names remain capitalized

### Boldface for New Terms
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Use **bold** for first mention of terms
- **Detect:** Italics or quotes for terms
- **Fix:** `**term**` not `_term_` or `"term"`

### No Special Formatting for Service Names
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Service/app/program names in plain text
- **Detect:** `` `counting` service``, `_dashboard_ service`
- **Fix:** "counting service" (plain text)
- **Exception:** Executable commands use code format

### Format Local URLs as Code
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Pattern:** `` `http://localhost:8500` ``

### Format API Endpoints as Code
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Pattern:** `` `PUT` request to `/acl/token` ``

### Format File Names as Code
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Pattern:** `` `main.tf` ``, `` `config.hcl` ``

### Lowercase Compass Directions
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** "North", "South", "East", "West" (standalone)
- **Fix:** Lowercase unless part of region name
- **Example:** "north" but "Southern United States"

### No Footnotes/Endnotes
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Cite sources inline with links

### Capitalize Job Titles When Introducing
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** "Armon Dadgar, Founder and CTO" but "the founder"

### No Trademark Symbols
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Don't use ® or ™ unless directed by legal

---

## Grammar and Punctuation

### Oxford Comma Always
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "read, write and delete"
- **Fix:** "read, write, and delete"
- **Pattern:** Regex: `, \w+ and \w+$` → add comma before "and"

### Complete Sentences Only
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** No fragments in prose. Don't split sentences across elements.
- **Detect:** Sentence fragments, prose split by codeblock
- **Fix:** Complete sentences before/after elements

### Consistent List Style
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** All fragments or all complete sentences in lists/tables
- **Detect:** Mixed fragments and sentences
- **Fix:** Make consistent

### No Parentheses/Dashes for Separation
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Use commas or periods. No em/en dashes for pauses.
- **Detect:** Em dash (—), en dash (–) for non-ranges, parenthetical phrases
- **Fix:** Split sentences or use commas
- **Exception:** Parentheses OK for acronyms

### No Punctuation for Emphasis
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** No exclamation marks, bold/italics for emphasis
- **Detect:** !, _emphasis_, **emphasis** (non-term)
- **Fix:** Rewrite with even tone

### Colons Introduce Lists/Tables/Images
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Complete sentence + colon before list/table/image
- **Detect:** Sentence fragment before list, colon mid-sentence
- **Fix:** Complete sentence ending with colon

### No Quotes for Emphasis/Terms
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Use quotes only for titles of works
- **Detect:** "term" for new concepts, "filename" for files
- **Fix:** Use bold for terms, code for files
- **Exception:** Quotes OK for book/article titles

---

## Language and Word Choice

### No Ableist Language
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "see {link}", "sanity check", "blind to"
- **Fix:** "refer to {link}", "verification", neutral terms

### No Gender-Specific Language
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "he", "she", "him", "her" (for generic person)
- **Fix:** "they", "them" or role name ("developer", "admin")

### Non-Violent Language
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "hit the button", "kill the process" (avoid when possible)
- **Fix:** "click **Delete**", "stop the process"
- **Exception:** `` `kill` command`` OK

### No Speculative Language
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "imagine", "suppose", "pretend"
- **Fix:** "In the following example" or concrete setup

### Most Specific Action Word
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Use precise verbs over generic "use"
- **Example:** "consumes", "passes", "present" when specific

### No Figures of Speech
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Detect:** Metaphors, similes, idioms, colloquialisms
- **Fix:** Literal, concrete language
- **Examples to avoid:** "six of one", "drive you up a wall", "prim and proper", "a ton"

### No Editorializing Difficulty
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "simply", "just", "easily", "easy", "obviously"
- **Fix:** Remove entirely
- **Example:** "Click Create" not "Simply click Create"

### Avoid Unnecessary Words
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "in order to", "in the case that"
- **Fix:** "to", "when"

### Simplest Word Possible
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "utilize", "utilization", "due to the fact that"
- **Fix:** "use", "because"

### No Latin Phrases or Foreign Words
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Table of replacements:**

| Avoid | Use Instead | Reason |
|-------|-------------|--------|
| ad-hoc | improvised, unplanned, informal, spontaneous | Latin phrase |
| via | through, using, by | Latin |
| etc. | and other {entities} | Latin abbreviation |
| e.g. | for example, such as | Latin abbreviation |
| i.e. | specifically, that is | Latin abbreviation |
| ergo | therefore, as a result, so | Latin |
| vice versa | conversely, the reverse | Latin phrase |
| per se | by itself, inherently | Latin phrase |
| status quo | current state, existing situation | Latin phrase |
| de facto | in practice, actual | Latin phrase |
| in lieu of | instead of, in place of | French/Latin |
| a priori | beforehand, in advance | Latin phrase |
| post hoc | after the fact, retrospective | Latin phrase |
| verbatim | word for word, exactly | Latin |
| carte blanche | full permission, admin access | French |
| blast radius | affected scope | jargon |
| sanity check | verification, preliminary check | jargon, ableist |
| smoke test | preliminary test, initial test | jargon |

### American English Spelling
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "centre", "initialise", "colour"
- **Fix:** "center", "initialize", "color"
- **Reference:** Merriam-Webster dictionary

### No Shortened Spellings
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "repo", "dir", "config" (as nouns in prose)
- **Fix:** "repository", "directory", "configuration"
- **Exception:** OK in code/commands

### No Rhetorical Questions
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** No questions in prose or headings
- **Detect:** "?" in headings or rhetorical questions
- **Fix:** Descriptive headings or statements
- **Exception:** "What is?" content type, questions in UI

### Localhost Not IP Address
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** `127.0.0.1` or `::1` for local services
- **Fix:** `localhost`

### Spell Out Acronyms on First Use
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** "full phrase (ACRONYM)" on first mention
- **Detect:** Acronym without introduction
- **Fix:** Add full phrase in parentheses
- **Exception:** Common acronyms like HTTP, SSH, DNS

### "Products" Not "Tools"
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** "HashiCorp tools"
- **Fix:** "HashiCorp products" or "offerings"

### No "HashiStack"
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** "HashiStack"
- **Fix:** "HashiCorp stack"

### No Unofficial Abbreviations
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
- **Fix:** Full product names

### Follow Third-Party Formatting
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Match capitalization from project docs
- **Example:** Kubernetes "Pods" and "Services" capitalized

---

## Links

### Descriptive Link Text
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Link text matches destination or clearly describes it
- **Detect:** Single-word mid-sentence links, "here", "click here"
- **Fix:** Link entire phrase or add separate sentence with clear link text

### Never "Click Here" or "Here"
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "click here", "here", "learn more" as link text
- **Fix:** Descriptive link text

### No Raw URLs as Hyperlinks
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Use descriptive text, not raw URL
- **Detect:** `[https://example.com](https://example.com)`
- **Fix:** `[Descriptive title](https://example.com)`
- **Exception:** URLs in code blocks OK

### File Extensions in Parentheses
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** For PDFs and static content
- **Pattern:** `[Title (PDF)](url)`

---

## Point of View

### Address Reader as "You"
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Detect:** "a user", "the developer", "one can"
- **Fix:** "you" or imperative statements

### "We" Only for HashiCorp
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** "We" for company recommendations/actions only
- **Detect:** "we configure", "our example", "we will"
- **Fix:** "you" or "the following example"

### No "We" in Examples
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Detect:** "we configure", "we add", "we will", "our configuration"
- **Fix:** "you configure", "Add", "your configuration"

---

## Screenshots

### Avoid Screenshots in Docs
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Maintenance burden; prefer text descriptions

### Screenshots in Tutorials
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Follow Education team standards

### Remove Browser Elements
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Crop out URL bar and window chrome

---

## Tense and Time

### Present Tense for Immediate Actions
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** "will show", "will appear", "will be"
- **Fix:** "shows", "appears", "is"

### Future Tense in Tutorial Intros
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** OK to use "you will" in tutorial introductions
- **Exception:** Tutorial context only

### Describe Current Functionality Only
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Detect:** "new", "old", "now", "currently", "will be available"
- **Fix:** Remove temporal words; describe as-is

### Version References in Requirements Only
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Version numbers only in Requirements sections
- **Detect:** Version numbers in body text
- **Fix:** Move to Requirements or remove

### No Promised Updates in Prose
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** Use release notes or deprecation pages
- **Detect:** "will be fixed", "will be added"
- **Fix:** Remove or link to release notes

---

## Titles and Headings

### Sentence Case Always
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** Capitalize first word and proper nouns only
- **Detect:** Title Case in headings
- **Fix:** Sentence case

### Present Tense in Headings
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "Configuring", "Provisioning" (gerund)
- **Fix:** "Configure", "Provision" (imperative/present)

### Sequential Heading Nesting
- **Priority:** [CRITICAL]
- **Type:** [MANUAL]
- **Rule:** H1 → H2 → H3 → H4 (no skipping)
- **Detect:** H1 followed by H3, or similar skips
- **Fix:** Insert proper heading level

---

## Variants

### Sentence Case for Variant Names
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]

### No H2 in Variants
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Avoid H2-level headings inside variants

### Use for Different Audiences
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Same info for different audiences (languages, editions)

---

## Markdown Standards

### Hash-Style Headings
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Detect:** Underline-style headings (==== or ----)
- **Fix:** `#`, `##`, `###` syntax

### No Headings in Tabs
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Use `heading` attribute in tab component
- **Detect:** `##` inside `<Tab>`
- **Fix:** `<Tab heading="...">`

### Double Asterisks for Bold
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** `__text__`
- **Fix:** `**text**`

### No Mixed Formatting
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Detect:** `` **`code`** ``, `_**text**_`
- **Fix:** Choose one formatting style

### Hyphens for Unordered Lists
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** `*` or `+` as bullet markers
- **Fix:** `-` as bullet marker

### Start Ordered Lists with 1
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Use `1.` for all items (auto-increments)
- **Detect:** `1. 2. 3.` manual numbering
- **Fix:** All `1.`

### Appropriate List Spacing
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Simple lists = no spacing; complex = blank lines

### Blank Lines Between Structural Elements
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Blank line after heading, before/after code blocks

### No Domain in Internal Links
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** `developer.hashicorp.com` in internal links
- **Fix:** Relative path only
- **Example:** `/terraform/docs/...` not `https://developer.hashicorp.com/terraform/docs/...`

---

## UI Components

### Format UI Elements
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Match UI capitalization; use bold
- **Pattern:** `**Save and Close**` not `"Save and Close"`

### Specific Action Verbs
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Press (keys), Click (buttons), Select (checkboxes/radio)
- **Detect:** Wrong verb for interaction type
- **Fix:** Match verb to interaction

### Correct Prepositions
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** "in" for dialogs/windows/fields; "on" for pages
- **Example:** "In the **Configuration** dialog" vs "On the **Settings** page"

---

## Code Blocks and Consoles

### Format Commands as Code
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** All commands in code blocks with syntax highlighting

### Use shell-session for CLI
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** `` ```bash ``, `` ```sh ``
- **Fix:** `` ```shell-session ``

### Double Pound for Comments
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** `##` not `#` in shell-session blocks
- **Reason:** Prevents confusion with root prompt

### Long-Form HashiCorp CLI Commands
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** `--var-file` not `-var-file`
- **Detect:** Short flags for HashiCorp CLIs
- **Fix:** Use long-form flags

### Short Flags OK for Non-HashiCorp
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** `docker exec -it` is fine

### Split Long Commands
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Use backslash for lines >100 chars

### Include Sample Output
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Show output; remove timestamps; use `## ...` to truncate
- **Detect:** Command without output
- **Fix:** Add representative output

### Indent Code in Lists (4 spaces)
- **Priority:** [CRITICAL]
- **Type:** [AUTO-FIX]
- **Rule:** 4-space indent for code blocks in lists
- **Reason:** Prevents list breaking

### Spaces Not Tabs
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Rule:** Use spaces for indentation (except Go)
- **Reason:** Cross-browser consistency

### Match Syntax Highlighting to File Type
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** `hcl` for HCL, `json` for JSON, `javascript` for JSON with comments

### Angle Brackets for Placeholders
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Pattern:** `<your-token-value>` not `YOUR_TOKEN`

### Don't Use Commands as Verbs
- **Priority:** [IMPORTANT]
- **Type:** [AUTO-FIX]
- **Detect:** "init the directory", "apply the changes"
- **Fix:** "run the `terraform init` command", "run `terraform apply`"

### Use Product Keywords
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Refer to specific keys/values in code as code
- **Pattern:** "Set the `mode` to `active-active`"

### No Instructions in Comments
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Describe code in prose, not comments
- **Detect:** Detailed comments explaining code
- **Fix:** Move explanation to prose before/after block

### Introduce with Imperative (Tutorials)
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** Imperative sentence before code block in tutorials
- **Example:** "Write out the policy named `exampleapp`..."

### Introduce as Examples (Docs)
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** "The following example..." in documentation

### One Product Command Per Block
- **Priority:** [IMPORTANT]
- **Type:** [MANUAL]
- **Rule:** Separate HashiCorp CLI commands into separate blocks
- **Detect:** Multiple product commands in one block
- **Fix:** Split into separate blocks with context
- **Exception:** Non-product commands can be chained

---

## Numbers, Dates, and Time

### Spell Out Ordinals
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** "1st", "2nd", "3rd"
- **Fix:** "first", "second", "third"

### Spell Out 0-9
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** Spell out zero through nine in prose
- **Exception:** Technical quantities (1 GB, 64-bit)

### Numerals with Dashes for Ranges
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** "8000 - 9000" even when including 0-9

### Spell Out Months
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Detect:** Jan, Feb, Mar, etc.
- **Fix:** January, February, March

### YYYY-MM-DD in Tables/Lists
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** ISO format for non-prose dates

### YYYY-MM-DDThh:mm:ss for Timestamps
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Rule:** ISO 8601 format

### 12-Hour Clock with Time Zone
- **Priority:** [STANDARD]
- **Type:** [MANUAL]
- **Pattern:** "12:00 AM PST"

### Commas in Numbers >3 Digits
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Rule:** "10,000 users"
- **Exception:** Port numbers (no comma)

### Format Port Numbers as Code
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Pattern:** `` `8080` ``

### Format IP Addresses as Code
- **Priority:** [STANDARD]
- **Type:** [AUTO-FIX]
- **Pattern:** `` `192.168.1.1` ``

---

## Detection Patterns Summary

### High-Priority Auto-Fix Patterns

**Remove "will":**
- Regex: `\bwill (show|appear|change|be|display|become|create|update|delete)\b`
- Replace with present tense form

**Replace "enables/allows you":**
- Regex: `\b(enables|allows) (you|users) to\b`
- Replace: "lets $2"

**Remove editorializing:**
- Regex: `\b(simply|just|easily|easy|obviously)\b`
- Delete or rewrite

**Replace "via":**
- Regex: `\bvia\b`
- Replace: "through", "using", "by", or specific preposition

**Replace "etc.":**
- Regex: `\,?\s*etc\.?`
- Replace: ", and other [specific items]" or remove

**Remove directional references:**
- Regex: `\b(above|below|previously|earlier|the previous)\b`
- Replace: "following", specific reference, or rewrite

**Remove "in order to":**
- Regex: `\bin order to\b`
- Replace: "to"

**Oxford comma:**
- Regex: `(\w+), (\w+) and (\w+)`
- Replace: `$1, $2, and $3`

**No domain in internal links:**
- Regex: `https?://developer\.hashicorp\.com`
- Replace: relative path

---

## Quick Validation Checklist

### Critical Issues (Fix First)
- [ ] No passive voice ("will be", "is recommended")
- [ ] No "will" in procedural steps
- [ ] No unofficial abbreviations (TF, TFC, TFE)
- [ ] "We" only for HashiCorp recommendations
- [ ] Address reader as "you" (not "a user")
- [ ] "Lets" not "enables/allows"
- [ ] No editorializing words (simply, just, easily)
- [ ] No foreign words (via, etc., e.g., i.e.)
- [ ] No ableist language ("see", "sanity check")
- [ ] No gender-specific pronouns (use "they")
- [ ] Sentence case in all headings
- [ ] Complete sentences in prose
- [ ] No unofficial product abbreviations

### Important Issues
- [ ] Forward-only flow (no "above", "below")
- [ ] Specific references (not "previous step")
- [ ] Oxford comma consistently
- [ ] No unnecessary words ("in order to")
- [ ] Simplest words ("use" not "utilize")
- [ ] Present tense headings
- [ ] Sequential heading levels
- [ ] Descriptive link text (no "click here")
- [ ] Internal links without domain
- [ ] shell-session for CLI examples
- [ ] Long-form HashiCorp CLI flags
- [ ] One product command per block

### Standard Issues
- [ ] No adjacent same elements
- [ ] Alerts used sparingly
- [ ] Introductions before diagrams/code
- [ ] Code format for URLs, IPs, ports, files
- [ ] Bold for new terms (not italics/quotes)
- [ ] Spell out acronyms on first use
- [ ] American English spelling
- [ ] No shortened spellings in prose (repo, dir, config)
- [ ] Angle brackets for placeholders
- [ ] 4-space indent for code in lists

---

**End of Quick Reference**

For comprehensive guidance with detailed examples, see `styleguide.md`.
