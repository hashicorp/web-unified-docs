#! /usr/bin/env bash
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1

set -euo pipefail

# No matter where we invoke the script, we work from the root of the repo
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
RELEASES_DIR="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
echo "Working from ${RELEASES_DIR}"
cd "$RELEASES_DIR"

# Check if required tools are present.
declare -a req_tools=("git")
for tool in "${req_tools[@]}"; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "ERROR: required tool ${tool} not installed, cannot create application release branches."
    exit 1
  fi
done

# Convert repos.yaml to repos.json
cd "$RELEASES_DIR"
./scripts/tfe-releases/lib/yaml-to-json.sh ./scripts/tfe-releases/tfe-releases-repos.yaml

# List all the services that we need to handle.
# This logic reads the full GitHub repository names from repos.json.
declare -a services=()
services="$(
    jq -r '.services | to_entries[] | "\(.value)"' < ./scripts/tfe-releases/tfe-releases-repos.json
)"

# I don't care about this advice, I'm a script.
git config --global advice.detachedHead false
git config --global credential.helper store
git config --global user.email "team-rel-eng@hashicorp.com"
git config --global user.name "tfe-release-bot"
gh auth setup-git

# For each repository, clone it, then checkout to release branch.
echo "Cloning Service Repositories..."
while IFS= read -r service; do
  echo "\nTFE release requires repository: ${service}"

  repository="${service}"

  # Remove the GitHub organization prefix from the service
  directory="$(echo "${service}" | sed -e "s/^\w\+\///")"

  checkout_dir="${RELEASES_DIR}/../${directory}"

  if [ -d "${checkout_dir}" ]; then
    echo "Directory ${checkout_dir} already exists, skipping clone."
  else
    gh repo clone "$repository" "$checkout_dir"
  fi

  export GIT_DIR="${checkout_dir}/.git"
  export GIT_WORK_TREE="${checkout_dir}"

  git checkout "${RELEASE_BRANCH}"

  unset GIT_DIR
  unset GIT_WORK_TREE
done <<< "${services[@]}"
