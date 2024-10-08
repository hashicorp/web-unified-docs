# Github Action: Get Vercel Preview Url

Lightweight action to get the preview url for a Vercel project.

## Why do we need this?

In similar workflows owned by our team, namely [`@hashicorp/tutorials`](https://github.com/hashicorp/tutorials/blob/main/.github/workflows/build-preview-2.yml) we use the [Vercel CLI](https://vercel.com/docs/cli). 

However the CLI does not work here because we use automatic previews from Vercel's Github integration. This means we don't have access to the url beforehand as we would if we ran `vercel deploy` directly.

## Inputs & outputs

### Inputs

This action accepts the following inputs:

- `project-name`: **string** — The name of the Vercel project.
- `scope`: **string** — The scope slug for the Vercel project.
- `branch-name`: **string** — The name of the branch to get the preview url for.

### Outputs

There's only one output:

- `preview-url`: **string** - The preview url for the current branch.

## The build step

This action is built with [`@vercel/ncc`](https://github.com/vercel/ncc): "(A) Simple CLI for compiling a Node.js module into a single file, together with all its dependencies." This allows the action to run off of a single file, without having to install dependencies during the run.

> [!IMPORTANT]
>  If you make changes to `src/index.js`, you need to run `npm run build` to generate the proper action output in `dist/index.js` and commit / push those changes.