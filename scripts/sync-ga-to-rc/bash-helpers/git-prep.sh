# 
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Git prep
#
# Sync the GA or RC branches and create a new branch for the update PR.
#
# Expected usage: git-prep.sh <productKey> <gaBranch> <rcBranch>
# For example:    git-prep.sh vault main vault/1.21.x

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}"  # product name for new branch name
gaBranch="${2}"    # git branch name for GA docs
rcBranch="${3}"    # git branch name for RC docs
makeUpdate="${4}"  # are we updating files

# Bail if any of the command line parameters were omitted
if [[ -z ${productKey} ]] ; then return ; fi
if [[ -z ${gaBranch} ]] ;   then return ; fi
if [[ -z ${rcBranch} ]] ;   then return ; fi

cd "${repoRoot}"

git fetch origin

# Sync to git
if [[ "${gaBranch}" == "${rcBranch}" ]] ; then
  # Sync to the latest updates in the GA branch if the branches are the same
  git checkout ${gaBranch} > /dev/null 2>&1
  git pull > /dev/null 2>&1
else  
  # Sync to the latest updates in the RC branch if the branches are different
  git checkout ${rcBranch} > /dev/null 2>&1
  git pull > /dev/null 2>&1
fi

if [[ "${makeUpdate}" == "true" ]] ; then
  # Create a new branch for the changes
  git checkout -B ${prBranch/"<PRODUCT>"/"${productKey}"} > /dev/null 2>&1

  # Send the PR branch name back to the script
  echo ${prBranch/"<PRODUCT>"/"${productKey}"}
else
  # The run is read-only (dry run) so we do not bother with a new branch
  echo 'Dry run, no branch needed'
fi 