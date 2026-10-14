/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { isDeepStrictEqual } from 'node:util'
import { parentPort, workerData } from 'node:worker_threads'
import { gatherVersionMetadata } from '../../scripts/prebuild/gather-version-metadata.mjs'
import { gatherAllVersionsDocsPaths } from '../../scripts/prebuild/gather-all-versions-docs-paths.mjs'

if (!parentPort) {
	throw new Error('The startup metadata check must run in a worker thread')
}

const versionMetadata = await gatherVersionMetadata(workerData.contentDir)
const docsPathsAllVersions = await gatherAllVersionsDocsPaths(
	versionMetadata,
	false,
	Object.keys(versionMetadata),
	{ verbose: false },
)
const metadata = { versionMetadata, docsPathsAllVersions }

parentPort.postMessage(
	isDeepStrictEqual(metadata, workerData.metadata)
		? { changed: false }
		: { changed: true, metadata },
)
parentPort.close()
