# 
# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1
# 
# ------------------------------------------------------------------------------
#
# Common values used by the bash helper files
#
# The script is meant to run under the scripts/ folder in a local clone of the 
# hashicorp/web-unified-docs repo with the same name.
#
# 1. If you cloned the hashicorp/web-unified-docs with a different folder name,
#    change the value of repoName to your local folder name. For example:
#     myDir="/path/to/my/local/repos/udr-fork"
# 2. If you plan to run the tool from outside the script folder of the
#    hashicorp/web-unified-docs repo, change the value of myDir to the local
#    path to your hashicorp/web-unified-docs clone. For example:
#    repoName="udr-fork"

myDir=$(pwd)
repoName="web-unified-docs"
localReposDir=${myDir%"/${repoName}"*}

repoRoot="${localReposDir}/${repoName}"  # Local root directory of the repo
docRoot="${repoRoot}/content/<PRODUCT>"  # Root directory of product docs
rcTag=" (rc)"
betaTag=" (beta)"

gaBranch="" # Set in helper from command line arguments; expected to be "main"
rcBranch="" # Set in helper from command line arguments; for example, "vault/1.21.x"
rcDocs=""   # Set in helper from command line arguments; for example, "${docRoot}/v1.21.x"
gaDocs=""   # Set in helper from command line arguments; for example, "${docRoot}/v1.20.x"

jsonTemplate='{"file": "<FILENAME>", "shortname": "<SHORTNAME>", "commit": "<COMMIT>"}'
prBranch="bot/<PRODUCT>-ga-to-rc-sync-$(date +%Y%m%d)"
prTitle="<PRODUCT> GA to RC auto-sync"
prBody="Draft PR created by \`sync-ga-to-rc.mjs\` to push recent GA updates to the RC release branch for <PRODUCT>"
