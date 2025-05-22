import * as core from '@actions/core'

import { main } from './main'

async function action() {
	const sourcePath = core.getInput('source_path')
	const targetPath = core.getInput('target_path')
	const newTFEVersion = core.getInput('new_TFE_version')
	// const newTFEVersion = 'v000011-1'

	await main(sourcePath, targetPath, newTFEVersion)
}

action()
