# Sync GA change to RC docset

The GA -> RC sync script helps with maintenance of long-lived release branches
by comparing updates since a provided cutoff in the current (GA) docset
against unpdates in an unreleased (RC) docset. The default cutoff date is the
creation date of the RC release branch. The script standardizes timestamps to
ISO for simplicity but takes the optional override date as a local time.


## Arguments

- `product`      - Slug used for the root product content folder
- `gaVersion`    - Folder of the current docset, typically the GA version number
- `rcVersion`    - Folder of the unreleased docset, typically the non-GA version number
- `docTag`       - String used to tag non-GA docsets, typically "rc" or "beta"
- `gaBranch`     - Name of the GA branch, typically "main"
- `overrideDate` - An optional, local override date for the cutoff in
                   "YYYY-MM-DD HH:MM:SS" format

## Usage

Expected use:
  node sync-ga-to-rc.mjs product gaVersion rcVersion docTag gaBranch [overrideDate]

Example:
  node sync-ga-to-rc.mjs vault 1.20.x 1.21.x rc main

Example with override date:
  node sync-ga-to-rc.mjs vault 1.20.x 1.21.x rc main '2025-07-31 17:10:27'

## Workflow

The script syncs the local GA and RC branches and creates a new branch off of
the RC branch to work from.

First, the script builds the following file sets:

  - GAΔ     - files in the GA (current) docset with a last commit date later
                than the provided cutoff date.
  - RCΔ     - files in the RC (unreleased) docset with a last commit date
                later than the provided cutoff date.
  - GA-only - files in the GA (current) docset that do not exist in the RC
              docset.

and determines what to do with the files based on the following rubric where
GAu and RCu are the set of files unchanged since the cutoff in the GA and RC
docsets:

Set definition       | Implication        | Action
-------------------- | ------------------ | -------------------------
file ∈ { RCu ∧ GAu } | file unchanged     | ignore 
file ∈ { RCu ∧ GAΔ } | updated in GA only | safe to update in RC
file ∈ { RCΔ ∧ GAu } | updated in RC only | ignore
file ∈ { RCΔ ∧ GAΔ } | updated in both    | possible conflict; needs manual review
file ∈ { RC  ∧ !GA } | new file for RC    | ignore 
file ∈ { !RC ∧  GA } | new file for GA    | safe to update in RC

The the script updates the RC instance of any file deemed "safe". The script
logs potential conflicts to a file then pushes the branch to
hashipcorp/web-unified-repo and creates a draft PR with the RC branch as the
merge target.


## Output

The script is designed to be chatty and print details of the run to `stdout`,
but it also creates the following artifacts:

- A new branch off of the RC branch called `bot/{product}-ga-to-rc-sync`
- A product record file (`output/product-records/last-run-{product}.txt`) with
  the most recent run time.
- Local output files with the following file sets for human review if needed:

    File set            | Output file
    ------------------- | --------------------
    GAΔ                 | output/run-logs/ga-delta.txt
    RCΔ                 | output/run-logs/rc-delta.txt
    GA-only             | output/run-logs/ga-only.txt
    updated files       | output/run-logs/safe-list.txt
    potential conflicts | output/run-logs/manual-review.txt

If you have the github CLI installed (`gh`), the script also creates a draft PR
on your behalf with any automatic changes:

  - title: "{product} GA to RC auto-sync"
  - description:
      Draft PR created by `sync-ga-to-rc.mjs` to push recent GA updates to the
      RC release branch for {product}.

