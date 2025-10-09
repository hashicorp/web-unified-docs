
#currDir=$(pwd)
myDir="/home/goblin/repos/web-unified-docs/"
localReposDir=${myDir%"/web-unified-docs"*}

repoRoot="${localReposDir}/web-unified-docs" # Local root directory of the repo
docRoot="${repoRoot}/content/<PRODUCT>"      # Root directory of product docs
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
