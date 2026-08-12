# Content types

The content we create and host on developer.hashicorp.com follows the principles of the [Diátaxis method for structured documentation](https://diataxis.fr/), which use the following basic content types:

- Explanation
- How-to
- Reference
- Tutorials

Because tutorials are hosted in a separate repository, this README focuses on the first three content types, plus two specialized page types that recur across products: Troubleshooting and Release notes.

Within the "Explanation" category, we use three different types of pages, each of which has a distinct purpose.

- **Overview** pages provide an introduction to a subject and serve as a central information point. [Example: Expand service network east/west](https://developer.hashicorp.com/consul/docs/east-west)
- **Concept** pages provide discursive explanations of Consul's underlying systems and their operations. [Example: Consul catalog](https://developer.hashicorp.com/consul/docs/concept/catalog)

Two additional page types support specific reader situations:

- **Troubleshooting** pages help readers resolve common issues, organized by symptom or error message. [Example: Troubleshoot service communication](https://developer.hashicorp.com/consul/docs/troubleshoot/service-communication)
- **Release notes** pages communicate new features, bug fixes, and changes for a specific product version. [Example: Nomad v1.11.x release notes](https://developer.hashicorp.com/nomad/docs/release-notes/v1-11-x)

HashiCorp employees may refer to the [internal Technical Writing
wiki](https://hashicorp.atlassian.net/wiki/x/eYBVnw) for detailed explanations.

## Page templates

Each content type has its own template and checklist in a dedicated file under
[`templates/`](templates/):

- [How-to template](templates/how-to.md)
- [Concept template](templates/concept.md)
- [Overview template](templates/overview.md)
- [Reference template](templates/reference.md)
- [Troubleshooting template](templates/troubleshooting.md)
- [Release notes template](templates/release-notes.md)

## Universal checklist

Apply these checks to every content type, in addition to that type's own checklist in its [template file](#page-templates).

- [ ] Heading hierarchy is correct: H1 → H2 → H3, no skipped levels
- [ ] Exactly one H1 per file (the page title)
- [ ] Shell/CLI commands use `` ```shell-session `` (not `` ```bash ``), with a `$` prompt prefix for each command
- [ ] Other code blocks have an appropriate language identifier (`` ```hcl ``, `` ```json ``, `` ```yaml ``, and so on)
- [ ] Stand-in placeholder values inside code blocks use angle brackets: `<path/to/file>`, not ALL_CAPS
- [ ] Images (if any) have descriptive alt text that describes content, not just "screenshot"
- [ ] Links use the correct format per the style guide (relative vs. absolute)
- [ ] Admonitions/callouts use correct syntax and are used appropriately
- [ ] Standardized messages (beta, enterprise, deprecation, EOL) use `@include` partials, not custom inline alerts
- [ ] No broken links or references to non-existent sections
- [ ] Optimized for SEO: action-oriented headings, titles, and descriptions
- [ ] Blank line before and after every heading, paragraph, list, code block, and admonition component

> **Note:** the project's how-to template uses `## Steps` as the heading for the procedural section. A file that uses `## Steps` as its procedure heading follows the expected how-to pattern — it is not a violation of the universal checklist.
