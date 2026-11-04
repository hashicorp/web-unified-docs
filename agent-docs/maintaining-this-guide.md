# Maintaining the agent guide

Treat the root `AGENTS.md` and these `agent-docs/` files as operational
documentation derived from the repository's current source of truth.

## Maintenance rule

When updating these files:

1. prefer improving an existing section over creating overlapping guidance
1. remove stale claims instead of layering exceptions on top of them
1. keep the guidance specific to `web-unified-docs`
1. verify every operational statement against the repo before adding it

Update the relevant file in the same PR when your change modifies any of the
following:

- local development commands in `README.md`, `package.json`, or `makefile`
- required runtime versions, build steps, or validation commands
- repository structure, source-of-truth directories, or generated artifact
  locations
- behavior in `.github/workflows/*.yml`
- Vercel preview or production deployment flow
- the contract or working relationship between `web-unified-docs` and
  `dev-portal`
- the recommended place to start for a common task

Before updating:

1. read the implementation or workflow file that actually changed
1. update only the sections affected by that change
1. remove outdated guidance in the same edit
1. keep summaries short and point readers to source files for details

If you changed any of the trigger areas above and did not update these files,
explain why in your final summary. Do not add speculative guidance just to keep
the docs synchronized. If the new behavior is not yet verified, leave the
existing text unchanged and call out the gap explicitly.

## Drift detection for changes made without AI

Not every change to this repo is made with an AI agent in the loop. A developer
may edit a workflow, bump the Node version, rename a directory, or change a
command directly. When that happens, the corresponding guidance here can
silently go stale. The next agent to work in the repo is responsible for
catching that drift.

At the start of any task that relies on facts in these files, spot-check the
specific facts you are about to depend on against their source of truth before
acting on them. You do not need to re-verify everything — only the claims
relevant to your current task. Use this mapping:

- runtime version, scripts, or commands — verify against `package.json`,
  `makefile`, and `README.md`
- repository structure or source-of-truth directories — verify against the
  actual directory tree
- CI, preview, or deployment behavior — verify against `.github/workflows/*.yml`
- product-specific behavior — verify against `productConfig.mjs` and the
  relevant product folder under `content/`
- the `web-unified-docs` ↔ `dev-portal` contract — verify against the API routes
  under `app/api/` and the consuming behavior described for dev-portal

When you find that these files disagree with the source of truth:

1. trust the source of truth, not these files, for the task at hand
1. correct the stale statement as part of your change
1. if the correction is outside the scope of your current task, call out the
   drift explicitly in your final summary so a human can follow up
1. never "fix" these files to match an assumption — only update them to match a
   fact you verified in the repository
