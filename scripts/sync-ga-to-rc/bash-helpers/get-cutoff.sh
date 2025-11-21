# 
# Copyright (c) HashiCorp, Inc.
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

if [[ "${targetBranch}" == "main" ]] ; then
  # Find the earliest commit we can as the "creation" date; since git log
  # entries expire based on the setting for reflogexpire on the repo/branch
  branchDate=$(
    git log                             \
      --pretty=format:%ad               \
      --date=iso                        \
      --date=format:'%Y-%m-%d %H:%M:%S' \
      "${targetBranch}"                 \
      | tail -1
  )
else
  branchDate=$(
    git reflog                          \
      --pretty=format:%ad               \
      --date=iso                        \
      --date=format:'%Y-%m-%d %H:%M:%S' \
      origin/${targetBranch}            \
      | tail -1
  )
fi

echo "${branchDate}"