# Create GitHub PR
#
# Create a PR with the local changes
#
# Expected usage: get-cutoff.sh <rcBranch>
# Example:        get-cutoff.sh vault/1.21.x

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
rcBranch="${1}"  # git branch name for RC docs

# Bail if any of the command line parameters were omitted
if [[ -z ${rcBranch} ]] ; then exit ; fi

branchDate=$(
  git reflog --date=iso ${rcBranch} |
  grep "Created from"               |
  awk -F'[{}]' '{print $2}'         |
  cut -d " " -f1,2
)

echo $(date -d "${branchDate}" "+%Y-%m-%d %H:%M:%S")