# HashiCorp Documentation Style Guide - LLM Reference

## Core Writing Principles

### Voice & Tone
- **Active voice**: Subject performs action. "Register the service" not "The service will be registered"
- **Present tense**: Describe actions as they happen. "The output shows" not "The output will show"
- **Address reader as "you"**: "You can configure" not "A user can configure"
- **Use "we" only for HashiCorp recommendations**: "We recommend" for company guidance
- **Avoid "we" in examples**: "Add the configuration" not "We will add the configuration"

### 2am Operator Optimization
- **Get straight to the point**: "This page describes the basic syntax elements" not "Other pages describe various constructs that can appear"
- **Eliminate fluff**: Remove unnecessary introductory text that doesn't add value
- **Be concrete**: "Terraform supports three comment syntaxes" not "The Terraform language supports three different syntaxes for comments"
- **Cut redundant words**: "Use `#` for comments" not "The `#` single-line comment style is the default comment style and should be used in most cases"
- **Simplify explanations**: Break complex sentences into simple, direct statements
- **Use practical examples**: Show real code instead of abstract explanations
- **Create reference tables**: Use tables to show patterns and relationships clearly
- **Logical flow**: Start with basic concepts and build up to complex ones

### Language & Word Choice
- **Simple words**: "use" not "utilize", "because" not "due to the fact that"
- **Avoid unnecessary words**: "to" not "in order to", "when" not "in the case that"
- **No editorializing**: Avoid "simply", "just", "easily", "obviously"
- **No figures of speech**: No metaphors, similes, colloquialisms
- **No foreign phrases**: Avoid "via", "ergo", "etc.", "carte blanche", "vice versa"
- **No jargon**: "affected scope" not "blast radius", "verification" not "sanity check"
- **Avoid confusing terms**: "identifiers" not "labels", "resource type" not "first identifier"
- **Specific terms**: Use precise, actionable language instead of vague concepts
- **American English**: "center" not "centre", "initialize" not "initialise"
- **No abbreviations**: "repository" not "repo", "configuration" not "config"
- **No rhetorical questions**: Use descriptive headings instead

### Inclusive Language
- **Non-ableist**: "Refer to" not "See", "preliminary check" not "sanity check"
- **Gender-neutral**: Use "they" for pronouns, refer to roles not people
- **Non-violent**: "Click Delete" not "Hit Delete", avoid violent metaphors

## Content Organization

### Structure
- **Linear flow**: Content flows from beginning to end without backtracking
- **Specific references**: "Copy the output from step 1" not "Copy the output from the previous step"
- **Single idea per sentence**: Break complex sentences into simple ones
- **Complete sentences**: No fragments in prose
- **No consecutive elements**: Separate alerts, headings, tables, lists with text
- **Logical progression**: Start with basic concepts, build to complex ones
- **Reference tables**: Use tables to show patterns and relationships clearly
- **Practical examples**: Show real code instead of abstract explanations

### Headings & Titles
- **Sentence case**: "Create a static credential store" not "Create A Static Credential Store"
- **Present tense**: "Configure proxies" not "Configuring proxies"
- **Sequential nesting**: H1 → H2 → H3 → H4, no skipping levels
- **One H1 per page**: Main topic title

### Lists & Tables
- **Serial comma**: "read, write, and delete" not "read, write and delete"
- **Parallel structure**: Consistent phrasing in lists
- **Complete sentences**: Prefer full sentences over fragments
- **Introduce with colons**: "The following options are available:"

## Technical Writing

### Commands & Code
- **Format as code**: Use backticks for commands, file names, parameters
- **No quotes around code**: `terraform init` not "terraform init"
- **Describe before showing**: "The following example shows..." before code blocks
- **No embedded comments**: Explain code in surrounding text

### UI Elements
- **Match UI formatting**: Use same capitalization as interface
- **Bold interactive elements**: **Save**, **Next**, **Delete** buttons
- **Specific actions**: "Click" for buttons, "Select" for options
- **Proper prepositions**: "In the window", "On the page", "In the dialog"

### Numbers & Formatting
- **Commas in large numbers**: 1,000 not 1000 (except port numbers)
- **Format as code**: Port numbers, IP addresses, file paths
- **Use "localhost"**: Not 127.0.0.1 or IPv6 addresses

## Content Types

### Documentation
- **Current functionality**: Describe features as they exist now
- **No future promises**: Avoid "will be implemented"
- **Version references**: Only in Requirements sections when necessary
- **No update announcements**: Use release notes for changes

### Tutorials
- **Future tense for sequences**: "In this tutorial, you will deploy..."
- **Present tense for results**: "The output shows..."
- **Include URLs**: Provide full URLs for local services
- **Step-by-step flow**: Linear progression without jumping around

## Alerts & Special Content

### Alert Usage
- **Sparse use**: Avoid too many alerts, they lose effectiveness
- **Concise messages**: Under 270 characters
- **No consecutive alerts**: Separate with text
- **Specific placement**: Before procedures, after configurations

### Alert Types
- **Tip**: Best practices, optional information
- **Note**: Information requiring action
- **Warning**: Critical issues, breaking changes, security
- **Enterprise**: Paid functionality indicators

## Grammar & Punctuation

### Punctuation Rules
- **No emphasis punctuation**: Avoid exclamation marks, bold for emphasis
- **No parentheses for separation**: Use commas and periods instead
- **No quotation marks**: Around file names, commands, or emphasis
- **Colons for introductions**: Before lists, tables, examples

### Sentence Structure
- **Complete sentences**: No fragments in prose
- **Single idea**: One concept per sentence
- **Frontload important info**: Key information at sentence start
- **Avoid complex punctuation**: No semicolons, dashes for separation

## Product References

### HashiCorp Products
- **Call them "products"**: Not "tools" or "tooling"
- **No unofficial abbreviations**: Avoid TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
- **No "HashiStack"**: Use "HashiCorp stack"

### Third-Party Products
- **Follow their conventions**: Use their capitalization and formatting
- **Spell out acronyms**: "open policy agent (OPA)" on first use
- **Reference their docs**: For terminology not in our style guide

## Common Mistakes to Avoid

### Don't Use
- Passive voice: "The service will be registered"
- Future tense for current actions: "The output will show"
- Editorializing: "Simply click", "Just run"
- Foreign phrases: "via", "ergo", "etc."
- Jargon: "blast radius", "sanity check"
- Confusing terms: "labels", "first identifier", "second identifier"
- Vague language: "provide an abstract view", "more abstract"
- Fluff text: "Other pages describe various constructs that can appear"
- Abstract explanations without examples
- Abbreviations: "repo", "config", "dir"
- Rhetorical questions: "When should you upgrade?"
- Consecutive elements: Alerts next to alerts
- Incomplete sentences: "Starts a build."
- Emphasis punctuation: "Vault **must** have permission"

### Do Use
- Active voice: "Register the service"
- Present tense: "The output shows"
- Direct instructions: "Click Create"
- Simple words: "use", "because"
- Concrete language: "describe the fundamental syntax"
- Direct statements: "This page describes the basic syntax elements"
- Clear terms: "identifiers", "resource type", "resource name"
- Practical examples: Show real code with explanations
- Reference tables: Use tables to show patterns clearly
- Inclusive language: "Refer to", "preliminary check"
- Complete sentences: "The command starts a build."
- Specific references: "Copy the output from step 1"
- Linear organization: Content flows forward
- Proper formatting: Code in backticks, UI elements in bold

## Quick Reference Checklist

- [ ] Active voice throughout
- [ ] Present tense for current actions
- [ ] Address reader as "you"
- [ ] Simple, concrete words
- [ ] No unnecessary words
- [ ] No editorializing
- [ ] No foreign phrases or jargon
- [ ] Get straight to the point
- [ ] Eliminate fluff text
- [ ] Concise explanations
- [ ] Use practical examples
- [ ] Create reference tables
- [ ] Logical progression
- [ ] Clear terms (not jargon)
- [ ] Inclusive language
- [ ] Complete sentences
- [ ] Linear content flow
- [ ] Specific references (not "above/below")
- [ ] Code formatted with backticks
- [ ] UI elements in bold
- [ ] Serial comma in lists
- [ ] No consecutive content elements
- [ ] One H1 per page
- [ ] Sentence case headings
- [ ] American English spelling
- [ ] No abbreviations
- [ ] No rhetorical questions
