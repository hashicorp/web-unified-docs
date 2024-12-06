# Github Action: Get Vercel Preview Data

This action uses the Vercel Rest API to fetch the latest deployment.

## Why not use the CLI 🤔

In similar workflows owned by our team, namely [`@hashicorp/tutorials`](https://github.com/hashicorp/tutorials/blob/main/.github/workflows/build-preview-2.yml) we use the [Vercel CLI](https://vercel.com/docs/cli).

However, the cli is designed for human readable output as opposed to being a rest client that returns json. We'd have to do a decent amount of string manipulation to get the cli output formatted neatly, hence the need for this lightweight github action.

## Inputs & outputs

### Inputs

This action accepts the following inputs:

#### Always required

- `deployment_type`: **string** — The type of Vercel deployment to fetch data from, can be 'id', 'url', or 'check'. 'check' will also wait till the deployment is ready.
- `vercel_token`: **string** — A valid authentication token to interface with the Vercel API. If one is not provided, it tries to see if one is present in the environment under `VERCEL_TOKEN`.
- `team_id`: **string** — The team ID to use with the Vercel API. If one is not provided, it tries to see if one is present in the environment under `TEAM_ID`.

#### Required by deployment_type=url
- `deployment_url`: **string** - 'The Vercel deployment URL to fetch data from'

#### Required by deployment_type=id
- `project_id`: **string** — The project ID to use with the Vercel API. If one is not provided, it tries to see if one is present in the environment under `PROJECT_ID`.
- `github_sha`: **string** — The commit SHA that was used in the Vercel build

#### Required by deployment_type=check
- `deployment_url`: **string** - 'The Vercel deployment URL to fetch data from'
- `num_of_checks`: **number** - 'The number of times to check if the deployment is ready'
- `mins_between_checks`: **number** - 'The minutes to wait between deployment checks'

### Outputs

- `preview-url`: **string** - The latest preview url for the relevant `project_id`

- `inspector-url`: **string** - The latest inspector url for the relevant `inspector_url`

- `created-utc`: **string** - The pretty UTC string of when the preview was created `created_utc`

## The build step

This action is built with [`@vercel/ncc`](https://github.com/vercel/ncc): "(A) Simple CLI for compiling a Node.js module into a single file, together with all its dependencies." This allows the action to run off of a single file, without having to install dependencies during the run.

> [!IMPORTANT]
>  If you make changes to `src/index.js`, you need to run `npm run build` to generate the proper action output in `dist/index.js` and commit / push those changes.

## Potential Pitfalls 🚧

There's a possible race condition that will occur if 2 individuals trigger a deployment in a short span of time (seconds to milliseconds depending on network conditions). This won't break anything but can lead to a frustrating / confusing situation where the preview url links to the wrong deployment.
