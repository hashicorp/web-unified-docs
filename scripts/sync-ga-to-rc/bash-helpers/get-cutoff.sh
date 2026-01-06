#
# Copyright IBM Corp. 2025
# SPDX-License-Identifier: BUSL-1.1
#
# ------------------------------------------------------------------------------
#
# Get branch creation date
#
# Query the git logs to find the creation date (or oldest commit) for the target
# branch.
#
# Expected usage: get-cutoff.sh <targetBranch>
# Example:        get-cutoff.sh vault/1.21.x

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
targetBranch="${1}"  # git branch name for RC docs

# Bail if any of the command line parameters were omitted
if [[ -z ${targetBranch} ]] ; then exit ; fi

cd "${repoRoot}"

# Find the earliest commit in the release branch that *is not* in main and use
# that as the "creation" date
git fetch origin

dateString=$(
  git log                 \
  --pretty=format:%ad     \
  --date=iso              \
  main..${targetBranch} | \
  tail -1
)

branchDate="$(getUTCDate "${dateString}")"

echo "${branchDate}"