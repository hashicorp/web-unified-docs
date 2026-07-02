# FULL HashiCorp Style Guide Checklist

This is a FULL checklist where each style guide file becomes a category with one-to-one mapping of checklist items to source style guide rules.

(This checklist is the cached output of the `create-style-guide-checklist` skill.  It may be regenerated at any time, and should be any time the style guide changes.)

Generated from: `/docs/style-guide/`

---

## Top 12

- [ ] Write in active voice
- [ ] Use simple present tense to describe immediate actions
- [ ] Describe features and functionality as they currently exist
- [ ] Do not use unofficial product abbreviations
- [ ] Only use "we" when referring to HashiCorp
- [ ] Address the reader as "you"
- [ ] Organize content so that it flows in a single direction from beginning to end
- [ ] Avoid unnecessary words
- [ ] Use the simplest word possible
- [ ] Do not use words or phrases borrowed from other languages, scientific words, or jargon words
- [ ] Do not place the same type of content elements next to each other

## Active Voice

- [ ] Write sentences where a subject performs an action, exhibits agency, or gets described by a predicate phrase
- [ ] Use direct, imperative statements that tell readers what to do

## Alerts

- [ ] Use alerts sparingly in documentation
- [ ] Use Markdown blockquotes to call out links to tutorials in documentation
- [ ] Place interactive tutorial alerts early in a tutorial
- [ ] Use warning alerts to call out potentially harmful actions or configurations
- [ ] Use tip alerts to call out best practices or optional settings and workflow

## Content Organization

- [ ] Do not implement frequently-asked-question (FAQ) sections
- [ ] Organize content so that it flows in a single direction from beginning to end
- [ ] Reference specific steps, section headings, or page titles when pointing readers to other sections
- [ ] Write simple sentences that contain a single idea
- [ ] Do not format multiple paragraphs of text into lists
- [ ] Describe the contents of diagrams, tables, and example code blocks in the introduction to the elements
- [ ] Do not place the same type of content elements next to each other
- [ ] Include the URL for the locally-running services at least once
- [ ] Match the navigation label, page and meta titles, and link text as closely as possible per your product information architecture
- [ ] Use the `badge` attribute in the navigation file to note release phases and special conditions
- [ ] Write modular pages and sections

## Fonts and Formats (General)

- [ ] Use lowercase for features, components, and other regular nouns unless they are branded words
- [ ] Use boldface to introduce new terms
- [ ] Do not use special text formatting for names of services, applications, and programs
- [ ] Format local URLs as code
- [ ] Format API endpoints and request methods as code
- [ ] Format specific file names as code
- [ ] Use lowercase for compass directions, but capitalize the names of regions
- [ ] Do not use footnotes or endnotes to cite sources
- [ ] Capitalize job titles when introducing people, but use lower case when referring to jobs
- [ ] Do not use the registered trademark or trademark symbol unless directed to do so by HashiCorp's legal team

## Grammar and Punctuation

- [ ] Always use the serial comma, also called the "Oxford" comma
- [ ] Always write complete sentences in prose
- [ ] Avoid mixing fragments and complete sentences in lists and tables
- [ ] Do not use parentheses, en dashes, or em dashes to separate ideas or phrases
- [ ] Do not use punctuation or text formatting to add semantic emphasis
- [ ] Use colons to introduce lists, tables, and visual aids
- [ ] Do not use quotation marks around file names, constructs, new terms, or to add emphasis

## Language and Word Choice

- [ ] Do not use ableist language
- [ ] Do not use gender-specific language
- [ ] Use non-violent language
- [ ] Avoid speculative language
- [ ] Use the most specific word to describe actions between entities
- [ ] Do not use figures of speech
- [ ] Do not editorialize about the difficulty or comprehensibility of an action or concept
- [ ] Avoid unnecessary words
- [ ] Use the simplest word possible
- [ ] Do not use words or phrases borrowed from other languages, scientific words, or jargon words
- [ ] Use American English spelling
- [ ] Do not use shortened or abbreviated spellings
- [ ] Do not ask rhetorical questions
- [ ] Refer to a locally addressable web services as "localhost"
- [ ] Refer to the user's local machine as "localhost" or "your local machine"
- [ ] Spell out a phrase and place the acronym form in parentheses on first use
- [ ] Refer to HashiCorp products as "products" or "offerings" not "tools" or "tooling"
- [ ] Do not refer to "HashiStack"
- [ ] Do not use unofficial product abbreviations
- [ ] Follow the guidance for industry terms as described in the corporate style guide
- [ ] Refer to the documentation or website for the project
- [ ] Follow the guidance for page titles and meta descriptions in the content types guidance

## Links

- [ ] Use descriptive link text that explicitly tells readers about the destination content
- [ ] Never use "click here", "here", "learn more", or similar phrases as link text
- [ ] Avoid using raw URLs as hyperlinks in prose
- [ ] Put file extensions in parentheses when linking to PDFs and other static content

## Point of View

- [ ] Address the reader as "you"
- [ ] Use the inclusive "we" when speaking on behalf of HashiCorp
- [ ] Do not use the inclusive "we" or personal possessives to guide readers through examples

## Screenshots

- [ ] Avoid screenshots in documentation
- [ ] Add screenshots to tutorials according to the Education team's standards
- [ ] Remove the browser's URL bar and window elements from screenshots

## Tense and Time

- [ ] Use simple present tense to describe immediate actions
- [ ] Use future tense when describing a sequences of events in a tutorial
- [ ] Describe features and functionality as they currently exist
- [ ] Do not communicate updates or fixes in prose

## Titles and Headings

- [ ] Use sentence case for titles, headings, and navigation labels
- [ ] Use simple present tense in titles, headings, and navigation labels
- [ ] Nest headings sequentially according to header level markdown

## UI Components

- [ ] When referring to UI elements, match capitalization, punctuation, and other formatting elements to the UI
- [ ] Format UI button names and other interactive UI element labels in bold
- [ ] Use correct interactions by form factor (click, select, press)
- [ ] Use correct prepositions for component types (in, on)

## Variants

- [ ] Use sentence case for variant, variant option, and tab names
- [ ] Do not place H2-level headings in variants
- [ ] Use the variants component to add variations of the same information for different audiences

## Enterprise Releases

- [ ] Use an enterprise alert to create a partial that calls out paid edition considerations on overview and concept pages
- [ ] Use inline alerts when calling out edition considerations on reference pages
- [ ] Use the appropriate partial to communicate product maturity, deprecation warning, and pricing and packaging information
- [ ] Use note-style alerts to create partials that call out beta functionality
- [ ] Describe edition and pricing considerations in the requirements section for topics that provide instructions

## Codeblocks - Organization

- [ ] Avoid providing instructions and documenting functionality in code comments
- [ ] In tutorials, introduce code blocks with a descriptive imperative sentence that ends with a period
- [ ] In documentation, introduce code blocks as examples and explain the actions represented in the block
- [ ] Add one product command per code block

## Codeblocks - Fonts and Formats

- [ ] Format commands as code
- [ ] Use shell-session for Linux shell commands
- [ ] Use `##` in code blocks to indicate comments in CLI code blocks
- [ ] Use long forms of commands, flags, and options in code blocks when describing HashiCorp CLI
- [ ] Use short command flags for a non-Hashicorp CLI when it is common usage
- [ ] Split long commands across multiple lines
- [ ] Include output printed to the console but remove timestamps
- [ ] Indent code blocks that appear in a list
- [ ] Use spaces, not tabs, to indent example code in a code block unless required by the code
- [ ] Use the appropriate syntax highlighting label
- [ ] Use the `javascript` syntax label for JSON that contains unsupported characters
- [ ] Place stand-in text in angle brackets

## Codeblocks - Language

- [ ] Do not use the command name as a verb
- [ ] Use language that matches keywords built into the product

## Numbers, Dates, and Time - Dates and Time

- [ ] Spell out the month and use the cardinal number, including year, to refer to the date in prose
- [ ] Use YYYY-MM-DD to represent dates in tables, lists, titles, and other non-prose elements
- [ ] Use YYYY-MM-DDT:h:m:s format for timestamps
- [ ] Use the 12-hour clock for time of day and include a time zone

## Numbers, Dates, and Time - Format Numbers

- [ ] Use a comma in base-10 numbers with more than three digits, except for port numbers
- [ ] Format port numbers as code
- [ ] Format IP addresses as code

## Numbers, Dates, and Time - Words as Numbers

- [ ] Spell out ordinal numbers such as first, second, and third
- [ ] Spell out numbers zero through nine
- [ ] Use numerals for number ranges that include zero through nine

## Markdown - Fonts and Formats

- [ ] Use double asterisks to bold words
- [ ] Do not use more than one inline style in prose
- [ ] Use hyphens to create unordered lists
- [ ] Use `1.` for every item in an ordered list
- [ ] Use single-space for simple lists
- [ ] Add an extra space between list long list items and complex lists
- [ ] Add an extra line break before and after a list
- [ ] Add an extra line space between headings and the next element

## Markdown - Headings

- [ ] Use #-style headings
- [ ] Do not use Markdown headings inside tabs

## Markdown - Links

- [ ] Use relative links when linking to other topics on hashicorp.developer.com

---

## Checklist Metadata

- **Type**: FULL (one-to-one mapping with style guide rules)
- **Total Rules**: 111
- **Source**: `/docs/style-guide/`
- **Generated**: 2026-06-02
