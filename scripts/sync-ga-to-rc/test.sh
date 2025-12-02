currDir="$(dirname "$0")"
. "${currDir}/bash-helpers/definitions.sh"

dateString=$(git reflog --date=iso origin/boundary/0.21.0   | tail -1)

snip1="${dateString%%\}*}"
rawDate="${snip1#*{}"
branchDate=$(getUTCDate "${rawDate}")

echo "Shell:       ${SHELL}"
echo "Log string:  ${dateString}"
echo "Raw date:    ${rawDate}"
echo "UTC date:    ${branchDate}"


if [[ -n "$BASH_VERSION" ]]; then
        echo "This script is running in Bash, version: $BASH_VERSION"
    else
        echo "This script is not running in Bash."
    fi