/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { BUILD_TYPE, buildType } from './buildType'
import type { DocsPathsAllVersions, Metadata, VersionMetadataMap } from '#types'

// Done this way so that next.js tracing does not include this module in preview and prod builds
const useIncBuildsMetadataModule =
	process.env.NODE_ENV === 'development' &&
	buildType === BUILD_TYPE.incBuildLocalDev
		? import('./incBuildsMetadata')
		: undefined

void useIncBuildsMetadataModule?.catch((error: unknown) => {
	console.error('Failed to preload local metadata:', error)
})

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
		// Dynamic paths in filesystem callbacks cause overly broad file traces.
		const missingFiles: string[] = []
		if (!fs.existsSync(versionMetadataFile)) {
			missingFiles.push(versionMetadataFile)
		}
		if (!fs.existsSync(docsPathsAllVersionsFile)) {
			missingFiles.push(docsPathsAllVersionsFile)
		}

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

export async function getMetadata(): Promise<Metadata> {
	if (useIncBuildsMetadataModule) {
		const module = await useIncBuildsMetadataModule
		return module.getIncBuildLocalDevMetadata()
	}

	return getProductionMetadata()
}
