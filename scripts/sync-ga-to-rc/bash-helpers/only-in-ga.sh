# 
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Only in GA
#
# Find files that exist in the GA directory but not the RC directory
#
# Expected usage: only-in-ga.sh <product> <gaFolder> <rcFolder>
# Example:        only-in-ga.sh vault 'v1.21.x' 'v1.21.x (rc)'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}" # product slug
gaFolder="${2}"   # folder for GA docs
rcFolder="${3}"   # folder for RC docs

# Bail if any of the command line parameters were omitted
if [[ -z "${productKey}" ]] ; then exit ; fi
if [[ -z "${gaFolder}" ]] ; then exit ; fi
if [[ -z "${rcFolder}" ]] ; then exit ; fi

# Build the absolute path for the GA and RC folders
gaPath="${docRoot/'<PRODUCT>'/${productKey}}/${gaFolder}"
rcPath="${docRoot/'<PRODUCT>'/${productKey}}/${rcFolder}"

cd "${repoRoot}"

for file in $(
  diff -rq "${gaPath}" "${rcPath}" |
  grep "^Only in ${gaPath}"        |
  awk '{print $3 $4}'
); do
  fileName="${file/":"/"/"}"
  shortName=${fileName/"${gaPath}"/""}
  naCommit="0000-00-00 00:00:00"
  jsonString=${jsonTemplate/'<FILENAME>'/"${fileName}"}
  jsonString=${jsonString/'<SHORTNAME>'/"${shortName}"}
  jsonString=${jsonString/'<COMMIT>'/"${naCommit}"}
  echo ${jsonString}
done