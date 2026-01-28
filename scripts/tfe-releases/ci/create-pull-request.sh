#! /usr/bin/env bash
# Copyright IBM Corp. 2024, 2025
# SPDX-License-Identifier: BUSL-1.1

set -euo pipefail

# No matter where we invoke the script, we work from the root of the repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
RELEASES_DIR="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
cd "$RELEASES_DIR"

# Check if required tools are present.
declare -a req_tools=("git" "gh" "ruby" "bundler")
for tool in "${req_tools[@]}"; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "ERROR: required tool ${tool} not installed, cannot execute changelog script"
    exit 1
  fi
done

# VERSION, RELEASE_BRANCH, LAST_RELEASE_TAG are input environment variables
RELEASE_FILE="content/terraform-enterprise/releases/${VERSION}.md"
export RELEASE_FILE

# Grab the contributors for this release.
contributors="$(bundle exec ./scripts/tfe-releases/contributors.rb)"

# "Escape" the contributors result to be safe to as a sed replacement string.
# In short, this replaces sed special characters like &/\ with backslash escaped
# versions of themselves. It also escapes newlines by using 'read' to iterate
# over individual lines.
set +e
IFS= read -d '' -r < <(sed -e ':a' -e '$!{N;ba' -e '}' -e 's/[&/\]/\\&/g; s/\n/\\&/g' <<<"${contributors}")
set -e
# $REPLY is the default variable read reads values into. This trips the final
# trailing newline from the reply value.
contributorsEscaped="${REPLY%$'\n'}"

deadline_date="$(date +"%A, %B %d, %Y")"

sed -E \
  -e "s|<\!--\s*RELEASE_SHORT_TMPL.*-->|${VERSION}|" \
  -e "s|<\!--\s*RELEASE_BRANCH_TMPL.*-->|${RELEASE_BRANCH}|" \
  -e "s|<\!--\s*DEADLINE_DATE_TMPL.*-->|${deadline_date}|" \
  -e "s|<\!--\s*CONTRIBUTORS_TMPL.* -->|${contributorsEscaped}|" \
  .github/PULL_REQUEST_TEMPLATE/ptfe_release_pull_request_template.md > "pr_body.md"

title="TFE Release ${VERSION}"

if [[ $DEV == 'true' ]]; then
  cat pr_body.md
else
  pr_url="$(gh pr create \
    --body="$(cat pr_body.md)" \
    --title="$title" \
    --base="${RELEASE_BRANCH_NAME}" \
    --draft)"


  echo $pr_url
fi
