import * as core from '@actions/core'

import { main } from './main'

async function action() {
	const newTFEVersion = core.getInput('new_TFE_version')
	// const newTFEVersion = 'v000011-1'

	await main(newTFEVersion)
}

action()
