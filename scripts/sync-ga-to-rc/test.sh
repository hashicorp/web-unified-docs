currDir="$(dirname "$0")"
. "${currDir}/definitions.sh"

dateString=$(git reflog --date=iso origin/boundary/0.21.0   | tail -1)

snip1="${dateString%%\}*}"
rawDate="${snip1#*{}"
branchDate="$(getUTCDate "${rawDate}")"

echo "Date string: ${dateString}"
echo "Snip 1: ${snip1}"
echo "Raw date: ${rawDate}"
echo "Branch date: ${branchDate}"