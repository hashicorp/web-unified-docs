# Experimental Docs

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

## Clone Time

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
