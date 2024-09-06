# Experimental Docs

> **Please note**: 🚨 The `public` folder in this repository is served on the public internet, as this project is now [deployed through Vercel](https://vercel.com/hashicorp/web-presence-experimental-docs/deployments). Please exercise caution when testing content migration scripts, _especially_ when pushing your work up. For the majority of content source repositories, this presents very little risk, as the content source repositories themselves are already public.
>
> However, some content source repositories are _not_ public. Specifically:
>
> - [hcp-docs](https://github.com/hashicorp/hcp-docs)
> - [ptfe-releases](https://github.com/hashicorp/ptfe-releases)
> - [sentinel](https://github.com/hashicorp/sentinel)
>
> For these repositories in particular, please take care to ensure that only the content that is already published through our `content.hashicorp.com` API is migrated into this repository.

This repo is a work-in-progress experimental exploration of an approach the Web Presence team is considering to simplify and streamline the documentation process for our products. Put simply, this approach stores all the versioned docs in one branch of one repo, rather than many branches in many repos. We are in the process of validating the approach, and would appreciate any feedback before we move on to writing a formal RFC.

## Advantages

- Storing documentation in one branch of one repo dramatically simplifies the workflow for contributing documentation.
- Publishing changes to multiple versions can be done in a single PR, as opposed to multiple PRs which is required by the current setup.
- Finding and making the same change across multiple versions is as simple as doing a find-and-replace since all the versioned docs are on the filesystem at the same time.
- Adding a new product is as easy as making a new folder, as opposed to the current process which requires code-changes on the API side and the installation of a GitHub App to monitor for events.
- Sourcing from one branch in one repo eliminates the situation where a missed GitHub event can result in out-of-date documentation. If something goes wrong in the publishing process, simply run it again instead of relying on incoming commit/release events from the GitHub API.
- Since we can make edits to all docs for all products and versions from a single PR, making platform-level changes is dramatically simplified (such as updating to MDX v2, or rewriting URLs).
- Adding new features like content conformance (basically linting for docs) can be done for the entire codebase at once.
- Removes the ability for docs to break the release workflow in product repos.
- Enables us to support fully versioned deployment previews, whereas current previews are limited to the branch being modified.

## Clone Time

As of writing, cloning this repo takes about the same amount of time as cloning a single one of our larger repos. It can be reduced with features like [sparse checkout](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/).

```
$ time git clone https://github.com/hashicorp/web-presence-experimental-docs
Cloning into 'web-presence-experimental-docs'...
remote: Enumerating objects: 31111, done.
remote: Counting objects: 100% (2598/2598), done.
remote: Compressing objects: 100% (2448/2448), done.
remote: Total 31111 (delta 112), reused 2431 (delta 86), pack-reused 28513
Receiving objects: 100% (31111/31111), 248.19 MiB | 5.93 MiB/s, done.
Resolving deltas: 100% (16052/16052), done.
Updating files: 100% (43670/43670), done.
git clone https://github.com/hashicorp/web-presence-experimental-docs  4.41s user 2.36s system 15% cpu 44.755 total
```

For comparison:

| Repo                           | Time to clone (seconds) |
| ------------------------------ | ----------------------- |
| web-presence-experimental-docs | 44                      |
| consul                         | 80                      |
| terraform                      | 49                      |
| vault                          | 46                      |

## Development

Requirements:

- [Docker](https://docs.docker.com/engine/install/)
- [Node](https://nodejs.org/en/download/package-manager)

To ensure the content is correctly built, you'll need to run the `prebuild` script before starting the dev server.

```zsh
npm run prebuild
npm run dev
```

### Local Previews

Once you've run `npm run prebuild`, you are able to preview the `dev-portal` UI in 2 different states.

1. The migration preview. This shows `dev-portal` where some routes fetch data from the existing content API and whilst only the routes that have been intentionally migrated use the new unified docs api. For this run `npm run preview:migration`

2. The unified docs preview. This preview is something of a 'stress test' to show how `dev-portal` would look if it pulled all of its content from this new unified docs api. For this preview run `npm run preview:unified-docs`
