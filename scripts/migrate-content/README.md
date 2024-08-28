# Content Migration Scripts

> [!WARNING] Work In Progress
>
> These migration scripts have been set up, but have NOT been finalized for use.
> Our aim is to ensure that all products can be migrated to this new unified
> docs repository, without having to resort to strange conditional behaviour.
>
> To achieve this, we're taking the approach of a breadth-first migration pass,
> meaning that we're aiming to make the migration script _kind of_ work across
> all content source repositories as a first step. The intent is to allow us
> to discover the sharp edges and exceptions we need to account for during
> migration as early as possible.
>
> We've made a first pass at making our migration scripts work, but we're still
> exploring those aforementioned sharp edges and exceptions. This README will
> be updated when content migration scripts are ready to run. This will likely
> happen on a repo-by-repo basis, rather than all at once.

The intent with the scripts in `scripts/migrate-content` is to be able to automatically migrate versioned documentation from all content source repositories that currently provide "docs content" to `developer.hashicorp.com`.

For details on what we mean when we say "docs content", see [How docs content gets on developer.hashicorp.com - Web Presence Internal Docs](https://web-presence-internal-docs-hashicorp.vercel.app/DevPortal/how-docs-content-gets-on-developer/).
