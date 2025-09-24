# Git prep
#
# Syncing the GA and RC branches and create a new branch for the update PR.
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

# Bail if any of the command line parameters were omitted
if [[ -z ${productKey} ]] ; then return ; fi
if [[ -z ${gaBranch} ]] ;   then return ; fi
if [[ -z ${rcBranch} ]] ;   then return ; fi

# Sync to the latest updates in the GA branch
git checkout ${gaBranch} > /dev/null 2>&1
git pull > /dev/null 2>&1

# Sync to the latest updates in the RC branch
git checkout ${rcBranch} > /dev/null 2>&1
git pull > /dev/null 2>&1

# Create a new branch for the PR
git checkout -B ${prBranch/"<PRODUCT>"/"${productKey}"} > /dev/null 2>&1
