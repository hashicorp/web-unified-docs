# 
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Get file delta
#
# Look through every file in the target folder and check if the latest commit is
# after the cutoff. If so, echo the details so the script can add it to the
# result array
#
# Expected usage: get-file-delta.sh <product> <targetFolder> <cutoff>
# Example:        get-file-delta.sh vault vault/1.20.x '2025-10-01 12:34:21'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}" # product slug
verFolder="${2}"   # folder for GA docs
cutoff="${3}"     # cutoff date for commit comparison

# Bail if any of the command line parameters were omitted
if [[ -z "${productKey}" ]] ; then exit ; fi
if [[ -z "${verFolder}" ]] ; then exit ; fi
if [[ -z "${cutoff}" ]] ; then exit ; fi

# Set the absolute path to the local folder
docFolder="${docRoot/'<PRODUCT>'/${productKey}/${verFolder}}"

cd "${repoRoot}"

# Loop through each file in the version folder
IFS=$'\n'
for file in $(find "${docFolder}" -type f); do
  
  lastCommit=$(
    git log -1 --format=%ai "${file}" |
    cut -d " " -f1,2
  )
  # If the last commit happened after the cutoff, add it to the results
  if [[ "${cutoff}" < "${lastCommit}" ]]; then
    shortName=${file/"${docFolder}"/""}
    jsonString=${jsonTemplate/'<FILENAME>'/"${file}"}
    jsonString=${jsonString/'<SHORTNAME>'/"${shortName}"}
    jsonString=${jsonString/'<COMMIT>'/"${lastCommit}"}
    echo ${jsonString}
  fi
done