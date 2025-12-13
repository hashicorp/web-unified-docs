# 
# Copyright IBM Corp. 2025
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Local file/log prep
#
# Reset or create the output directory and associated files
#
# Usage:   log-prep.sh <logDir> <recordDir>
# Example: log-prep.sh '/home/web-unified-repo/scripts/sync-ga-to-rc/output' '/home/web-unified-repo/scripts/sync-ga-to-rc/data/run-records'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
logDir="${1}"
recordDir="${2}"

# Bail if any of the command line parameters were omitted
if [[ -z ${logDir} ]] ; then return ; fi
if [[ -z ${recordDir} ]] ; then return ; fi


# Create the product records directory, if needed
if [[ ! -d ${recordDir} ]]; then mkdir ${recordDir} ; fi

fileCount=$(ls ${logDir} | wc -l)

# Create the log directory if needed, otherwise, delete the old files
if [[ ! -d ${logDir} ]]; then
  mkdir ${logDir}
elif [ ${fileCount} -gt 0 ]; then
  rm ${logDir}/*
fi

# Prep the log files
touch ${logDir}/ga-delta.txt
touch ${logDir}/ga-only.txt
touch ${logDir}/rc-delta.txt
touch ${logDir}/safe-list.txt
touch ${logDir}/delete-list.txt
touch ${logDir}/manual-review.txt