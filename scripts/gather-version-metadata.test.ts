/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { beforeEach, expect, it, vi } from 'vitest'
import { vol } from 'memfs'
import { gatherVersionMetadata } from './gather-version-metadata.mjs'

vi.mock('../app/utils/productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'terraform-enterprise': { contentDir: 'docs', versionedDocs: true },
			terraform: { contentDir: 'docs', versionedDocs: true },
		},
	}
})

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

it('Support beta releases', async () => {
	const expected = {
		'terraform-enterprise': [
			{ version: 'v202401-2', releaseStage: 'beta', isLatest: false },
			{ version: 'v202401-1', releaseStage: 'stable', isLatest: true },
		],
	}
	vol.fromJSON(
		{
			'./terraform-enterprise/v202401-1/': null,
			'./terraform-enterprise/v202401-2 (beta)/': null,
		},
		// default cwd
		'/content',
	)

	const result = await gatherVersionMetadata('/content')
	expect(result).toStrictEqual(expected)
})

it("Support beta releases - make sure order doesn't change stable release", async () => {
	const expected = {
		'terraform-enterprise': [
			{ version: 'v202401-2', releaseStage: 'beta', isLatest: false },
			{ version: 'v202401-1', releaseStage: 'stable', isLatest: true },
		],
	}
	vol.fromJSON(
		{
			'./terraform-enterprise/v202401-2 (beta)/': null,
			'./terraform-enterprise/v202401-1/': null,
		},
		'/content',
	)

	const result = await gatherVersionMetadata('/content')
	expect(result).toStrictEqual(expected)
})

it('Support beta releases - support release candidate (rc)', async () => {
	const expected = {
		'terraform-enterprise': [
			{ version: 'v202401-2', releaseStage: 'rc', isLatest: false },
			{ version: 'v202401-1', releaseStage: 'stable', isLatest: true },
		],
	}
	vol.fromJSON(
		{
			'./terraform-enterprise/v202401-2 (rc)/': null,
			'./terraform-enterprise/v202401-1/': null,
		},
		'/content',
	)

	const result = await gatherVersionMetadata('/content')
	expect(result).toStrictEqual(expected)
})

it('Support beta releases - throw error for invalid stage', async ({
	expect,
}: {
	expect: any
}) => {
	vol.fromJSON(
		{
			'./terraform-enterprise/v202401-2 (test)/': null,
			'./terraform-enterprise/v202401-1/': null,
		},
		'/content',
	)

	await expect(gatherVersionMetadata('/content')).rejects.toThrowError()
})

it('Support beta releases - throw error for too many spaces in stage', async ({
	expect,
}: {
	expect: any
}) => {
	vol.fromJSON(
		{
			'./terraform-enterprise/v202401-2  (beta)/': null,
			'./terraform-enterprise/v202401-1/': null,
		},
		'/content',
	)

	await expect(gatherVersionMetadata('/content')).rejects.toThrowError()
})

it('Sort order - 1.10 is higher than 1.9', async () => {
	const expected = {
		terraform: [
			{ version: 'v1.13.x', releaseStage: 'beta', isLatest: false },
			{ version: 'v1.12.x', releaseStage: 'stable', isLatest: true },
			{ version: 'v1.11.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.10.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.9.x', releaseStage: 'stable', isLatest: false },
			{ version: 'v1.8.x', releaseStage: 'stable', isLatest: false },
		],
	}
	vol.fromJSON(
		{
			'./terraform/v1.13.x (beta)/': null,
			'./terraform/v1.12.x/': null,
			'./terraform/v1.11.x/': null,
			'./terraform/v1.10.x/': null,
			'./terraform/v1.9.x/': null,
			'./terraform/v1.8.x/': null,
		},
		// default cwd
		'/content',
	)

	const result = await gatherVersionMetadata('/content')
	expect(result).toStrictEqual(expected)
})
