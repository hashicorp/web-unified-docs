# Github Action: Map Files to URLs

This action maps file paths to their corresponding URLs.

## Inputs & outputs

### Inputs

This action accepts the following inputs:

- `files`: **string** — A string of file paths separated by commas.

### Outputs

- `paths`: **string[]** - An array of url paths that correspond the the file paths passed in.

## The build step

This action is built with [`@vercel/ncc`](https://github.com/vercel/ncc): "(A) Simple CLI for compiling a Node.js module into a single file, together with all its dependencies." This allows the action to run off of a single file, without having to install dependencies during the run.

> [!IMPORTANT]
>  If you make changes to `src/index.js`, you need to run `npm run build` to generate the proper action output in `dist/index.js` and commit / push those changes.
