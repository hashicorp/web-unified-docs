# Repository-wide Copilot instructions

This repository supports many kinds of work: the Next.js application, build and
content-tooling scripts, API routes, tests, and the Markdown/MDX documentation
under `content/`. These repository-wide instructions are intentionally small and
apply to every pull request. They scope automated **documentation** review and
do not redefine how non-documentation changes are reviewed.

## Automated documentation review

Detailed documentation-review guidance is **path-specific** and lives in
`.github/instructions/*.instructions.md`. Those files are scoped with `applyTo`
globs and only load when a pull request changes Markdown/MDX docs under
`content/`:

- `.github/instructions/docs-checklist.instructions.md`
- `.github/instructions/docs-style.instructions.md`
- `.github/instructions/docs-output.instructions.md`
- `.github/instructions/docs-pr-comment-guard.instructions.md`
- `.github/instructions/style.instructions.md`

When that guidance applies:

- Review only changed `.md` and `.mdx` files located under `content/`.
- Ignore Markdown files outside `content/` (for example, root-level `README.md`
  or `CONTRIBUTING.md`, etc...).
- Include both required tables: the quality score table and the issues table.
- Keep findings specific to the changed files and cite file paths.

## When a pull request changes no documentation

If a pull request changes no `.md` or `.mdx` files under `content/`, do not apply
the documentation-review format. Respond exactly with:

`No documentation files to review.`

Non-documentation changes (application code, scripts, tests, configuration) are
out of scope for these instructions today. Dedicated guidance for reviewing code
changes will be added separately through `AGENTS.md` files.