#! /usr/bin/env bash
# Copyright IBM Corp. 2025
# SPDX-License-Identifier: BUSL-1.1

set -euo pipefail

# No matter where we invoke the script, we work from the root of the repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
RELEASES_DIR="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
cd "$RELEASES_DIR"

# Check if required tools are present.
declare -a req_tools=("git" "ruby" "bundler")
for tool in "${req_tools[@]}"; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "ERROR: required tool ${tool} not installed, cannot execute changelog script"
    exit 1
  fi
done

# VERSION, RELEASE_BRANCH, LAST_RELEASE_TAG are input environment variables
echo "Setting the FROM to $LAST_RELEASE_TAG."
export FROM="$LAST_RELEASE_TAG"
echo "Setting the TO to $RELEASE_BRANCH"
export TO="$RELEASE_BRANCH"

# Create file from template.
echo "Create the release file from template."
deadline_date="$(date +"%A, %B %d, %Y")"
sed -E \
  -e "s|<\!--\s*RELEASE_SHORT_TMPL.*-->|${VERSION}|" \
  -e "s|<\!--\s*RELEASE_BRANCH_TMPL.*-->|${RELEASE_BRANCH}|" \
  -e "s|<\!--\s*DEADLINE_DATE_TMPL.*-->|${deadline_date}|" \
  content/terraform-enterprise/releases/_template.md >> "content/terraform-enterprise/releases/${VERSION}.md"
echo "File content/terraform-enterprise/releases/${VERSION}.md created."

# Execute script.
echo "Executing the changelog script..."
bundle exec ./scripts/tfe-releases/changelog.rb --verbose >> "content/terraform-enterprise/releases/${VERSION}.md"
echo "Finished executing the changelog script..."

if [[ $DEV == "true" ]]; then
  echo "The DEV flag is set, cat'ing changelog and exiting."
  cat content/terraform-enterprise/releases/"${VERSION}.md"
  exit 0
else
  # Commit the files as the tfe-release-bot user.
  git config --global user.email "team-rel-eng@hashicorp.com"
  git config --global user.name "tfe-release-bot"

  git checkout -b "docs-tfe-releases/${VERSION}"

  git add "content/terraform-enterprise/releases/${VERSION}.md"
  git commit -m "populate terraform-enterprise/releases/${VERSION}.md"
  git push origin HEAD
fi
