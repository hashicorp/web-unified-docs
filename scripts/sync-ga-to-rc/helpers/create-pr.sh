# Create GitHub PR
#
# Create a PR with the local changes
#
# Expected usage: create-pr.sh <produc> <rcFolder> <rcBranch>
# Example:        create-pr.sh 'vault' 'v1.21.x (rc)' 'vault/1.21.x'

# Pull in the common variable definitions
currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

# Set variables from command line argument
productKey="${1}"   # product slug
rcFolder="${2}"     # RC doc folder
rcBranch="${3}"     # git branch name for RC docs
ghcli=$(which gh)   # Check for the GitHub CLI

# Bail if any of the command line parameters were omitted
if [[ -z ${productKey} ]] ; then exit ; fi
if [[ -z ${rcFolder} ]] ; then exit ; fi
if [[ -z ${rcBranch} ]] ; then exit ; fi

# Bail if the GitHub CLI needs to be installed
if [[ -z ${rcBranch} ]] ; then
  echo "Could not create PR. Please install the GitHub CLI (gh)"
  exit
fi

prSource=${prBranch/"<PRODUCT>"/"${productKey}"}

# Add any files updated under the RC directory
git add "../../content/${productKey}/${rcFolder}/*" > /dev/null 2>&1
git commit -m "Auto update GA to RC sync" > /dev/null 2>&1
git push -u origin ${prSource} > /dev/null 2>&1

# Create the draft PR
gh pr create                                     \
  --title "${prTitle/"<PRODUCT>"/${productKey}}" \
  --body  "${prBody/"<PRODUCT>"/${productKey}}"  \
  --head  "${prSource}"                          \
  --base  "${rcBranch}"                          \
  --draft