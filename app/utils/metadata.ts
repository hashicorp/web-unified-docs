/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { BUILD_TYPE, buildType } from '#scriptUtils/get-type-of-build.mjs'
import { getIncBuildLocalDevMetadata } from './incBuildsMetadata'
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
	return buildType === BUILD_TYPE.incBuildLocalDev
		? getIncBuildLocalDevMetadata()
		: Promise.resolve().then(getProductionMetadata)
}
