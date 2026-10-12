/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import type { FSWatcher } from 'node:fs'

// Composable productSlug param type for typing request handlers
export type ProductParam = {
	/**
	 * The product that docs are being requested for
	 * @example 'terraform'
	 */
	productSlug: string
}

// Composable version param type for typing request handlers
export type VersionParam = {
	/**
	 * Can be a semver version
	 * @example 'v.1.9.x'
	 * or a dated version string for PTFE
	 * @example 'v20220610-01'
	 */
	version: string
}

/**
 * Utility type for the combination of `productSlug` and `version` together(since the
 * two are often expected together in our API handlers). For example, an API
 * handler might be passed the following params:
 *
 * @example const response = await GET(req, { product: 'terraform', version: 'v20220610-01' })
 */
export type VersionedProduct = ProductParam & VersionParam

export type AssetRouteParams = VersionedProduct & {
	/**
	 * Full path to the asset in the production build, i.e. `terraform/v1.9.x/img/docs/plan-comments.png`
	 */
	assetPath: string[]
}

export type DocRouteParams = VersionedProduct & {
	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	docsPath: string[]
}

export type NavDataRouteParams = VersionedProduct & {
	/**
	 * An array of strings representing the path relative to `content/<productSlug>/nav-data/<version>/data`
	 * @example ['cli']
	 */
	section: string[]
}

export enum ServedFrom {
	CurrentBuild = 'current build',
	Production = 'production',
}

export enum FileType {
	Markdown = 'markdown',
	NavData = 'navData',
	Redirects = 'redirects',
	Asset = 'asset',
}

export type ProductVersionMetadata = {
	version: string
	isLatest: boolean
	releaseStage: string
}

export type VersionMetadataMap = Record<string, ProductVersionMetadata[]>

export type DocsPath = {
	path: string
	itemPath: string
	created_at: string | null
	last_modified: string | null
}

export type DocsPathsAllVersions = Record<string, Record<string, DocsPath[]>>

export type Metadata = {
	versionMetadata: VersionMetadataMap
	docsPathsAllVersions: DocsPathsAllVersions
}

export type IncBuildsMetadataCache = {
	promise?: Promise<Metadata>
	watcher?: FSWatcher
	paths?: string
	checkPaths?: boolean
}

export type Result<T, E = undefined> =
	| { ok: true; value: T }
	| { ok: false; value: E | undefined }
