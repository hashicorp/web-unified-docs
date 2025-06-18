/**
 * A single document metadata record representing a single document
 * (.mdx file, really) on disk
 */
export type DocPathRecord = {
	/**
	 * The path that API clients should use to request this document
	 */
	path: string
	/**
	 * The path on disk (relative to the app root) where this document is located
	 */
	itemPath: string
	/**
	 * A timestamp in ISO8601 format
	 */
	created_at: string
	/**
	 * A unique stable identifier for a document used to link documents accross
	 * versions. This identifier should be considered globally unique.
	 */
	id?: string
}

/**
 * An array of {@link DocPathRecord} objects representative of all the
 * documentation for a particular version of a product
 * @example
 * ```js
 * {
 *   "v1.0.x": [
 *     {
 *          created_at: '2025-05-01 13:54'
 *          path: 'terraform/account/settings',
 *          itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *     },
 *     {
 *          created_at: '2025-05-01 13:54'
 *          path: 'terraform/account/settings',
 *          itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *     },
 *   ]
 * }
 * ```
 */
export type VersionDocumentGroup = Record<string, DocPathRecord[]>

/**
 * The top level type of docsPathsAllVersions.json.
 *
 * @example
 * ```js
 * {
 *   "terraform": {
 *     "v1.0.x": [
 *       {
 *            created_at: '2025-05-01 13:54'
 *            path: 'terraform/account/settings',
 *            itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *       },
 *       {
 *            created_at: '2025-05-01 13:54'
 *            path: 'terraform/account/settings',
 *            itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *       },
 *     ],
 *   },
 * }
 * ```
 */
export type DocPathMetadata = Record<string, VersionDocumentGroup>
