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

cd "${repoRoot}"

if [[ "" == "main" ]] ; then
  # Find the earliest commit we can as the "creation" date; since git log
  # entries expire based on the setting for reflogexpire on the repo/branch
  branchDate=$(
    git log                             \
      --pretty=format:%ad               \
      --date=iso                        \
      --date=format:'%Y-%m-%d %H:%M:%S' \
      "${rcBranch}"                     \
      | tail -1
  )
else
  branchDate=$(
    git reflog                          \
      --grep-reflog="Created from"      \
      --pretty=format:%ad               \
      --date=iso                        \
      --date=format:'%Y-%m-%d %H:%M:%S' \
      "${rcBranch}" 
  )
fi

echo "${branchDate}"