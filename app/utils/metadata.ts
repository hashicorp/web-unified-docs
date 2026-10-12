/**
 * Copyright (c) IBM Corp.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import {
	getIncBuildLocalDevMetadata,
	IncBuildLocalDev,
} from './incBuildsMetadata'
import type { DocsPathsAllVersions, Metadata, VersionMetadataMap } from '#types'

const versionMetadataFile = path.join(
	process.cwd(),
	'app/api/versionMetadata.json',
)
const docsPathsAllVersionsFile = path.join(
	process.cwd(),
	'app/api/docsPathsAllVersions.json',
)

function readGeneratedMetadata(): Metadata {
	return {
		versionMetadata: JSON.parse(
			fs.readFileSync(versionMetadataFile, 'utf8'),
		) as VersionMetadataMap,
		docsPathsAllVersions: JSON.parse(
			fs.readFileSync(docsPathsAllVersionsFile, 'utf8'),
		) as DocsPathsAllVersions,
	}
}

let prodVersionMetadata: VersionMetadataMap | undefined
let prodDocsPathsAllVersions: DocsPathsAllVersions | undefined
function getProductionMetadata(): Metadata {
	if (
		prodVersionMetadata === undefined ||
		prodDocsPathsAllVersions === undefined
	) {
		const missingFiles = [versionMetadataFile, docsPathsAllVersionsFile].filter(
			(file: string): boolean => {
				return !fs.existsSync(file)
			},
		)

		if (missingFiles.length > 0) {
			throw new Error(
				`Missing generated metadata file(s): ${missingFiles.join(', ')}. Run \`npm run prebuild\` to generate them.`,
			)
		}

		const metadata = readGeneratedMetadata()
		prodVersionMetadata = metadata.versionMetadata
		prodDocsPathsAllVersions = metadata.docsPathsAllVersions
	}

	return {
		versionMetadata: prodVersionMetadata,
		docsPathsAllVersions: prodDocsPathsAllVersions,
	}
}

export function getMetadata(): Promise<Metadata> {
	return IncBuildLocalDev
		? getIncBuildLocalDevMetadata()
		: Promise.resolve().then(getProductionMetadata)
}
