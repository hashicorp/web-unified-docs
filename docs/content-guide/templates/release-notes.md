# Release notes template

Model: [Nomad v1.11.x release notes](https://developer.hashicorp.com/nomad/docs/release-notes/v1-11-x).

## Template

```markdown
---
page_title: {Product} v{X.Y}.x release notes
description: |-
  {Product} version {X.Y}.x release notes. Release highlights include {feature one}, {feature two}, and {feature three}.
---

# {Product} {X.Y}.x release notes

@include '{path to the product's version-eol-chart partial}'

## {X.Y.Z} release highlights

Release Date: {date}

Describe headline features in prose, or group changes by feature area with H3 subheadings if there are several.

### {Feature area}

Describe the change and link to the relevant docs. Use `<EnterpriseAlert inline/>` next to a heading or bolded label for Enterprise-only features.

### Changelog

Review improvements, security fixes, and breaking changes in the changelog.

- [v{X.Y.Z}](https://github.com/hashicorp/{product}/releases/tag/v{X.Y.Z})

## {Previous X.Y.Z} release highlights

Release Date: {date}

Repeat the pattern above for each prior patch release, newest first.
```

Breaking changes and deprecations get a `<Warning>` admonition instead of plain prose, placed at the top of the release section they apply to.

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata; `description` accurately reflects the actual content of this version, not a prior version
- [ ] Clearly states the version or date of each release
- [ ] Organizes changes by version, then by feature or change area within each version (the Nomad/Consul pattern); or by category (Features, Bug fixes, Breaking changes, Deprecations) if the product uses that pattern — check an existing release-notes page for the product's convention
- [ ] Each entry is concise — one to three sentences per item with a link to the relevant docs
- [ ] Breaking changes and deprecations are prominently highlighted with `<Warning>` admonitions
- [ ] Does not include how-to instructions
- [ ] Uses `@include` partials for standardized messages (EOL chart, enterprise alerts) rather than custom inline text
