

dateString=$(git reflog --date=iso origin/boundary/0.21.0   | tail -1)
echo "Date string: ${dateString}"
snip1="${dateString%%\}*}"
echo "${snip1#*{}"
