# ADR 000: Document architecture decisions

## Status

Proposed

## Context

It can be difficult to keep track of why software has been architected in a particular way.

We aim to document as many decisions as possible through [our RFC process](https://docs.google.com/document/d/1_Vm7nFfqZMNx5gEJ1lTzlwi79WnrS6pXkoOvFG4wFxM/edit), but it's difficult if not impossible to anticipate all the decisions that will need to be made through the entire course of a project. This leaves many of our projects with documentation that may have been up-to-date and thorough at the time an RFC was written, but quickly becomes incomplete or inaccurate as implementation progresses.

## Decision

We will keep a collection of "architecture decision records" (ADRs).

We will write these records in [Markdown](https://commonmark.org/) format, and the records will be located in this project repository under `docs/decisions/adr-NNN-title-in-dash-case.md`

An architecture decision is any non-trivial decision that involves a set of forces and a single decision in response to those forces. An architecture decision record describes the set of forces and the decision taken. We will adopt [Michael Nygard's template for architecture decision records](https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/locales/en/templates/decision-record-template-by-michael-nygard/index.md), which is documented in more detail in the blog post [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), and is summarized below:

- `# Title` - a short phrase summarizing the decision. This will also be used in dash-case as the file name.
- `## Status` - a decision may be `proposed` if the project stakeholders haven't agreed with it yet, or `accepted` once it is agreed. If a later ADR changes or reverses a decision, it may be marked as `deprecated` or `superseded` with a reference to its replacement.
- `## Context` - in this section, describe the forces influencing the decision, including technological, political, social, and local to the project. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts.
- `## Decision` - describe the response to these forces. It is stated in full sentences, with active voice. "We will..." is a great way to start this section.
- `## Consequences` - This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.

## Consequences

By establishing a clear process for documenting decisions _throughout_ the implementation process, we expect maintenance and iteration work to progress more efficiently. We also expect decisions to made more intentionally.

We expect the developer experience of working on a given project to improve. Specifically, we expect a clear decision history might help us better manage otherwise inexplicable complexity, and that more thorough context might help us feel more empowered to iterate on our code bases without a looming sense that we've missed something.

We expect there to be a slightly downside of a bit of time required to write up ADR documents. We expect the benefits of writing ADRs to significantly outweigh this downside.
