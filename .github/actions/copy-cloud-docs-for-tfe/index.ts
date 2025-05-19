import * as core from '@actions/core'

import { main } from './main'

async function action() {
  // These are absolute paths, like:
  // /home/runner/work/mktg-content-workflows/mktg-content-workflows/${source_repo}
  const sourceDir = core.getInput('source_dir')
  const targetDir = core.getInput('target_dir')

  // $GITHUB_WORKSPACE: /home/runner/work/mktg-content-workflows/mktg-content-workflows
  core.notice(`sourceDir: ${sourceDir}`)
  core.notice(`targetDir: ${targetDir}`)

  await main(sourceDir, targetDir)
}

action()
