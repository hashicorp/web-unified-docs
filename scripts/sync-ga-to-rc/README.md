# Sync GA change to RC docset

The GA -> RC sync script helps with maintenance of long-lived release branches
for versioned docs by comparing updates since a provided cutoff in the current
(GA) docset against updates in an unreleased (RC) docset.

The default cutoff date is the last run date for the provided product slug, if
it exists. Otherwise, the script defaults to the creation date of the RC release
branch. The script standardizes all timestamps to ISO for simplicity but takes
the optional override date as a local time.


## Assumptions

- Your RC release branch use the following naming convention: `<product_slug>/<rc_version> <docTag>`.
- You have the GitHub CLI (`gh`) installed. The CLI is required if you want the
  script to create a PR on your behalf. ==> DISABLED (THE PROCESS IS STILL BUGGY)


## Flags

Flag      | Type     | Default      | Description
--------- | -------- | ------------ | -----------
`-slug`   | `string` | No, required | Product slug used for the root content folder
`-ga`     | `string` | No, required | Version of the current docset
`-rc`     | `string` | No, required | Version of the unreleased docset
`-tag`    | `string` | ""           | String used to tag non-GA docsets (e.g., "(rc)")
`-branch` | `string` | `main`       | Name of the GA branch
`-date`   | `string` | null         | Local override date in "YYYY-MM-DD HH:MM:SS" format for the commit date cutoff
`-update` | `bool`   | false        | Indicates whether to apply any safe changes locally
`-pr`     | `bool`   | false        | Indicates whether to apply any safe changes locally and generate a PR if possible
`-merged` | `bool`   | false        | Indicates that RC docs are merged to `-branch`
`-help`   | `bool`   | false        | Print usage help text and exit



## Usage

```text
node sync-ga-to-rc.mjs -slug <product> -ga <ga_version> -rc <rc_version> [-tag <folder_tag>] [-branch <ga_branch>] [-date <override_date] [-update] [-pr]
```

## Examples

### Basic call

```shell-session
$ node sync-ga-to-rc.mjs -slug vault -ga 1.20.x -rc 1.21.x -tag rc
```

### Provide an override date

Use `-tag` to provide a specific doc tag and set a custom override date with
`-date`:

```shell-session
$ node sync-ga-to-rc.mjs  \
    -slug sentinel        \
    -ga 1.40.x            \
    -rc 1.41.x            \
    -tag beta             \
    -date '2025-07-31 17:10:27'
```

### Sync GA to RC in main

Use `-merged` to sync GA and a published RC docset in `main`:

```shell-session
$ node sync-ga-to-rc.mjs  \
    -slug vault           \
    -ga 1.20.x            \
    -rc 1.21.x            \
    -merged
```

### Sync two published versions

Use `-merged` and set `-tag` to "none" so the script compares folders for past
versions in `main`:

```shell-session
$ node sync-ga-to-rc.mjs  \
    -slug vault           \
    -ga 1.19.x            \
    -rc 1.20.x            \
    -merged               \
    -tag none
```

## Adding exceptions

If you have files you **know** the script should always ignore, you can add the
relative path from your product root to the exclusion file `data/exclude.json`
using your product slug.

Expected schema:

```json
[
  {
    "<produc_slug>": [
      "<relative_path_1>",
      "<relative_path_1>",
      ...
      "<relative_path_N>",
    ]
  }
]
```

For example:

```json
[
  {
    "vault": [
      "/content/docs/updates/important-changes.mdx",
      "/content/docs/updates/release-notes.mdx",
      "/content/docs/updates/change-tracker.mdx"
    ]
  }
]
```

## General workflow

The script syncs the local GA and RC branches and creates a new branch off of
the RC branch to work from.

Next, the script builds the following file sets:

- exclusions  - a list of files the script should ignore during the sync
- GAΔ         - files in the GA (current) docset with a last commit date later
                than the provided cutoff date.
- RCΔ         - files in the RC (unreleased) docset with a last commit date
                later than the provided cutoff date.
- GA-only     - files in the GA (current) docset that do not exist in the RC
                docset.

The script determines what to do with the files based on the following rubric
where GAu and RCu are the set of files unchanged since the cutoff in the GA and
RC docsets:

Set definition       | Implication        | Action
-------------------- | ------------------ | -------------------------
file ∈ { RCu ∧ GAu } | file unchanged     | ignore 
file ∈ { RCu ∧ GAΔ } | updated in GA only | safe to update in RC
file ∈ { RCΔ ∧ GAu } | updated in RC only | ignore
file ∈ { RCΔ ∧ GAΔ } | updated in both    | possible conflict; needs manual review
file ∈ { RC  ∧ !GA } | new file for RC    | ignore 
file ∈ { !RC ∧  GA } | new file for GA    | safe to update in RC

If `-update` is `true`, the script slams files in the RC folder with files from
the GA folder with any file deemed "safe", prints a note to review the
information in the conflict file, and updates the last run date.

If `-update` is `false`, the script generates log files and exits.


## Script output

The script is designed to be chatty and print details of the run to `stdout`,
but it also creates the following artifacts:

- A new branch off of the RC branch called `bot/{product}-ga-to-rc-sync`
- A product record file (`data/product-records/last-run-{product}.txt`) with
  the most recent run time.
- Local output files with the following file sets for human review if needed:

    File set            | Output file
    ------------------- | --------------------
    GAΔ                 | output/ga-delta.txt
    RCΔ                 | output/rc-delta.txt
    GA-only             | output/ga-only.txt
    updated files       | output/safe-list.txt
    potential conflicts | output/manual-review.txt