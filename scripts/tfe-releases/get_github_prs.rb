#!/usr/bin/env ruby
# Copyright IBM Corp. 2024, 2025
# SPDX-License-Identifier: BUSL-1.1


require 'octokit'

#
# Setup GitHub API client with access token
#

$github_token = ENV["GITHUB_TOKEN"]
raise "Missing GitHub token. Please set TOKEN in your environment." unless $github_token
$github = Octokit::Client.new(access_token: $github_token)

class PullRequest
  def initialize(repo, from, to)
    @dir = repo
    @repo = "hashicorp/#{repo}"
    @from = from
    @to = to
    @default_branch = $github.repository(@repo).default_branch
  end

  def generate
    # Use the local git history to find all merged PR numbers
    # --cherry-pick includes --merge (discovered experimentally)
    #
    # TODO: This checkout nonsense is quite silly, but it fixes
    #       "ambiguous argument" errors there must be a way to tell git not to
    #       require this.
    gitlog = `
      cd ../#{@dir} && \
      git fetch --tags --quiet && \
      git checkout --quiet #{@from} && \
      git checkout --quiet #{@default_branch} && \
      git checkout --quiet #{@to} && \
      git checkout --quiet #{@default_branch} && \
      git log --cherry-pick #{@from}..#{@to}
    `
    pr_numbers = parse_out_pr_numbers(gitlog)

    STDERR.puts "#{@repo}: #{pr_numbers.size} PRs"
    # Ask the GitHub API for information on each merged PR
    get_prs_from_github(pr_numbers)
  end

  def parse_out_pr_numbers(gitlog)
    pr_numbers = []

    gitlog.split("\n").each do |line|
      # Look for PRs that were regular merged
      line.match(/Merge pull request #(\d+)/) do |match|
        pr_numbers << match[1]
      end

      # Look for PRs that were squashed and merged
      line.match(/\(#(\d+)\)$/) do |match|
        pr_numbers << match[1]
      end
    end

    pr_numbers
  end

  def get_prs_from_github(pr_numbers)
    pr_numbers.reverse.map do |pr_number|
      # puts "retrieving pr #{pr_number}"
      $github.pull_request(@repo.to_s, pr_number.to_i)
    end
  end
end
