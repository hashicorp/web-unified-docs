#!/usr/bin/env ruby
# Copyright IBM Corp. 2025
# SPDX-License-Identifier: BUSL-1.1


release = ENV["RELEASE_FILE"]
raise "Missing path to `releases/vYYYYMM-X.md`. Please set RELEASE in your environment." unless release

contributors = `grep -Eo '@[A-Za-z0-9]+(-[A-Za-z0-9]+)*' #{release} | tr -d '[]' | cut -d' ' -f1 | sort | uniq -c | sort -nr`

list = contributors.split("\n")

list.each do |contributor|
  puts "- [ ] #{contributor}"
end
