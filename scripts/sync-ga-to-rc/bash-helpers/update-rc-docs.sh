# 
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
# Update RC docs
#
# For every relative path in the input list, replace the RC version with the GA
# version
#
# Expected usage: update-rc-docs.sh <productKey> <gaFolder> <rcFolder> <safeListFile>
# Example:        update-rc-docs.sh vault '1.20.x' '1.21.x (rc)' 'safe-list.txt'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

function buildDirs {

  local dirName="${1}"

  if [ -z "${dirName}" ] ; then return ; fi
  if [ -d "${dirName}" ] ; then return ; fi

  local parentDir=$(dirname "${dirName}")

  # If the parent directory does not exist, call buildDir on the parent
  if [ ! -d "${parentDir}" ] ; then buildDirs "${parentDir}" ; fi

  # Create the directory if it doesn't already exist
  mkdir "${dirName}"
}

# Set variables from command line argument
productKey="${1}"  # root folder for product docs (product key)
gaFolder="${2}"    # GA doc folder name
rcFolder="${3}"    # RC doc folder name
safeList="${4}"    # file of GA paths we can overwrite in RC

# Bail if any of the command line parameters were omitted
if [[ -z "${productKey}" ]] ; then exit ; fi
if [[ -z "${gaFolder}" ]]   ; then exit ; fi
if [[ -z "${rcFolder}" ]]   ; then exit ; fi
if [[ -z "${safeList}" ]]   ; then exit ; fi

cd "${repoRoot}"

while read line; do

  gaPath=$(echo "$line" | awk -F " " '{print $3}')
  rcPath=${gaPath/${gaFolder}/${rcFolder}}
  parent=$(dirname "${rcPath}")

  buildDirs "${parent}"

  # Skip any file that may have ended up in the list from a different product
  if [[ "${gaPath}" != *"/content/${productKey}/"* ]]; then continue ; fi
  if [[ "${rcPath}" != *"/content/${productKey}/"* ]]; then continue ; fi
  cp -r "${gaPath}" "${rcPath}"

done < "${outputDir}/${safeList}"