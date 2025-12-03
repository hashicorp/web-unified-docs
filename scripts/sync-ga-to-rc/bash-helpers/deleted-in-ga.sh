# 
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Get deleted files in GA
#
# Look for files deleted from GA so we can sync the delete to the RC docs.
# Check if the delete date is after the cutoff to avoide re-deleting pages that
# were previously reverted. If so, echo the details so the script can add it to
# the result array
#
# Expected usage: deleted-in-ga.sh <product> <gaBranch> <gaFolder> <cutoff>
# Example:        deleted-in-ga.sh vault v1.20.x main '2025-10-01 12:34:21'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}" # product slug
gaFolder="${2}"   # folder for GA docs
gaBranch="${3}"   # GA doc branch
cutoff="${4}"     # cutoff date

# Bail if any of the command line parameters were omitted
if [[ -z "${productKey}" ]] ; then exit ; fi
if [[ -z "${gaFolder}" ]] ; then exit ; fi
if [[ -z "${gaBranch}" ]] ; then exit ; fi
if [[ -z "${cutoff}" ]] ; then exit ; fi

# Set the relative path string
docFolder="content/${productKey}/${gaFolder}"

cd "${repoRoot}"

git fetch origin 

# Loop through each file in the version folder
IFS=$'\n'
for file in $(
    git log                 \
    --diff-filter=D         \
    --name-only             \
    --summary ${gaBranch} | \
    grep "${docFolder}"
); do

  rawCommitDate=$(
    git log --all -1 --pretty=format:%ad  --date=iso -- "${file}"
  )

  lastCommit=$(getUTCDate "${rawCommitDate}")

  # If the last commit happened after the cutoff, add it to the results
  if [[ "${cutoff}" < "${lastCommit}" ]]; then
    shortName=${file/"${docFolder}"/""}
    jsonString=${jsonTemplate/'<FILENAME>'/"${file}"}
    jsonString=${jsonString/'<SHORTNAME>'/"${shortName}"}
    jsonString=${jsonString/'<COMMIT>'/"${lastCommit}"}
    echo ${jsonString}
  fi
done