import * as core from '@actions/core'

import { main } from './main'

async function action() {
  // These are absolute paths, like:
  // /home/runner/work/mktg-content-workflows/mktg-content-workflows/${source_repo}
  const sourceRepo = core.getInput('source_repo')
  const targetRepo = core.getInput('target_repo')

  // $GITHUB_WORKSPACE: /home/runner/work/mktg-content-workflows/mktg-content-workflows
  core.notice(`sourceRepo: ${sourceRepo}`)
  core.notice(`targetRepo: ${targetRepo}`)

  await main(sourceRepo, targetRepo)
}

action()
