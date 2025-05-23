/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { beforeEach, expect, it, vi } from 'vitest'
import { vol } from 'memfs'
import { gatherVersionMetadata } from './gather-version-metadata.mjs'

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('fs')
vi.mock('fs/promises')

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()
})

it('walk a directory of products and return a JSON representation of valid versions', async () => {
	const expected = {
		'terraform-enterprise': [
			{ version: 'v202401-2', releaseStage: 'stable', isLatest: true },
			{ version: 'v202401-1', releaseStage: 'stable', isLatest: false },
		],
		terraform: [
			{ version: 'v1.19.x', releaseStage: 'stable', isLatest: true },
			{ version: 'v1.18.x', releaseStage: 'stable', isLatest: false },
		],
	}
	vol.fromJSON(
		{
			'./terraform/v1.19.x/': null,
			'./terraform/v1.18.x/': null,
			'./terraform-enterprise/v202401-1/': null,
			'./terraform-enterprise/v202401-2/': null,
		},
		// default cwd
		'/content',
	)

	const result = await gatherVersionMetadata('/content')
	expect(result).toStrictEqual(expected)
})
