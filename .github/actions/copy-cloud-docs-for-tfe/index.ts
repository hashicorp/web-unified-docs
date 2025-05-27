/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import * as core from '@actions/core'

import { main } from './main'

async function action() {
	const sourcePath = core.getInput('source_path')
	const targetPath = core.getInput('target_path')
	const newTFEVersion = core.getInput('new_TFE_version')

	await main(sourcePath, targetPath, newTFEVersion)
}

action()
