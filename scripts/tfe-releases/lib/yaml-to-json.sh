#! /usr/bin/env bash
# Copyright IBM Corp. 2024, 2025
# SPDX-License-Identifier: BUSL-1.1

set -euo pipefail

# Check if required tools are present.
declare -a req_tools=("ruby")
for tool in "${req_tools[@]}"; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "ERROR: required tool ${tool} not installed, cannot convert YAML to JSON."
    exit 1
  fi
done

input="${1:-""}"
if [ -z "$input" ] || [ ! -f "$input" ]; then
  echo "Input file \`${input}\` could not be found or was invalid"
  exit 1
fi

filename="$(basename "$input")"
output="./scripts/tfe-releases/${filename%.*}.json"
if [ -f "$output" ];  then
  echo "Output file \`${output}\` already exists"
  exit 1
fi

ruby -rjson -ryaml -e "print YAML.load_file('${input}').to_json" > "$output"
