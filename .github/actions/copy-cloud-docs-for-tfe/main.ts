/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import * as fs from 'fs'
import * as path from 'path'

import * as core from '@actions/core'
import walk from 'klaw-sync'
import matter from 'gray-matter'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

import { remarkGetImages } from './remark-get-images-plugin'
import { remarkTransformCloudDocsLinks } from './remark-transfrom-cloud-docs-links'

const PR_TYPE = {
	NewVersion: 'NewVersion',
	Diff: 'Diff',
} as const

const imageSrcSet = new Set<string>()

// List of MDX files to exclude from being copied
const IGNORE_LIST = ['cloud-docs/index.mdx']

export const IGNORE_PATTERNS: RegExp[] = [
	/cloud-docs\/agents/i,
	/cloud-docs\/architectural-details/i,
]
const SUB_PATH_MAPPINGS: {
	source: string
	target: string
}[] = [
	{
		source: 'cloud-docs',
		target: 'enterprise',
	},
]

/**
 * This is a helper to be passed to `walk` dry up repeated logic
 * for ignore certain files.
 */
const filterFunc = (item: walk.Item) => {
	// if the item matches a IGNORE_PATTERNS expression, exclude it
	if (
		IGNORE_PATTERNS.some((pattern: RegExp) => {
			return pattern.test(item.path)
		})
	) {
		return false
	}

	// Check files for `tfc_only` frontmatter property; Ignore them if true
	if (item.stats.isFile()) {
		const fullContent = fs.readFileSync(item.path, 'utf8')
		const { data } = matter(fullContent)
		if (data.tfc_only == true) {
			return false
		}
	}

	return true
}

/**
 * A helper that accepts a data object and an array of functions that
 * receive the object as an arg and transform it.
 */
const transformObject = <T = Record<string, any>>(
	data: T,
	plugins: Array<(data: T) => T>,
): T => {
	let result = data

	plugins.forEach((fn: (data: T) => T) => {
		result = fn(result)
	})

	return result
}

/**
 * This function will copy 3 things
 * - MDX files
 *   - these can be at varying levels of nesting
 * - used images
 *   - these are expected to all be at the same level
 * - nav-data JSON files
 *
 * This function will also prune the target directory
 * of any files that are not in the source directory.
 *
 * @param sourcePath {string} The directory content should be copied _from_
 * @param targetPath {string} The directory content should be copied _to_
 * @param {string} newTFEVersion An absolute path to a GitHub repository on disk
 */
export async function main(
	sourcePath: string,
	targetPath: string,
	newTFEVersion?: string,
): Promise<void> {
	const prType = newTFEVersion ? PR_TYPE.NewVersion : PR_TYPE.Diff

	//Read version metadata and get the latest version of terraform-enterprise
	const versionMetadataPath = path.resolve(
		path.join(sourcePath, 'app/api/versionMetadata.json'),
	)

	const versionMetadata = JSON.parse(
		fs.readFileSync(versionMetadataPath, 'utf8'),
	)

	const tfeMetadata = versionMetadata['terraform-enterprise']
	if (!tfeMetadata || tfeMetadata.length === 0) {
		throw new Error('No terraform-enterprise found in versionMetadata.json')
	}

	const currentTfeRelease = tfeMetadata.find((release: any) => {
		return release.isLatest
	})?.version

	if (!currentTfeRelease) {
		throw new Error(
			'No latest terraform-enterprise found in versionMetadata.json',
		)
	}

	core.info(
		`Latest terraform-enterprise version found in versionMetadata.json: ${currentTfeRelease}`,
	)

	const HCPsourceDir = path.join(sourcePath, 'content/terraform-docs-common')
	const HCPContentDir = path.join(HCPsourceDir, 'docs')

	const newTFEVersionDir = path.join(
		targetPath,
		'content/terraform-enterprise',
		prType === PR_TYPE.NewVersion ? newTFEVersion : currentTfeRelease,
	)

	const newTFEVersionContentDir = path.join(newTFEVersionDir, 'docs')
	const newTFEVersionImageDir = path.join(newTFEVersionDir, 'img/docs')

	// If this is a new version, we need to copy the current ptfe-release
	// files to the new version's directory.
	// This is to ensure that we have the all of the images and nav-data
	if (prType === PR_TYPE.NewVersion) {
		core.info(`Creating new version directory: ${newTFEVersionDir}`)
		fs.mkdirSync(newTFEVersionDir, { recursive: true })

		const prevTFEVersionDir = path.join(
			sourcePath,
			'content/terraform-enterprise',
			currentTfeRelease,
		)

		fs.cpSync(prevTFEVersionDir, newTFEVersionDir, { recursive: true })
	}

	// traverse source docs and accumulate mdx files for a given set of "subPaths"
	let items: ReadonlyArray<walk.Item> = []

	for (const { source: subPath } of SUB_PATH_MAPPINGS) {
		const src = path.join(HCPContentDir, subPath)
		const docItems = walk(src, {
			nodir: true,
			filter: filterFunc,
		})
		items = items.concat(docItems)
	}

	// Copy an entire directory
	// ---------------------------------------------
	//     /{source}/cloud-docs/dir/some-doc.mdx
	//          ↓        ↓      ↓    ↓
	//     /{target}/enterprise/dir/some-docs.mdx
	// ---------------------------------------------
	for (const { source, target } of SUB_PATH_MAPPINGS) {
		const src = path.join(HCPContentDir, source)
		const dest = path.join(newTFEVersionContentDir, target)

		const items = walk(src, {
			nodir: true,
			filter: filterFunc,
		})

		for (const item of items) {
			// ignore some files
			if (
				IGNORE_LIST.some((ignore: string) => {
					return item.path.endsWith(ignore)
				})
			) {
				continue
			}

			// extract mdx content; ignore frontmatter
			const fullContent = fs.readFileSync(item.path, 'utf8')

			// eslint-disable-next-line prefer-const
			let { content, data } = matter(fullContent)

			data = transformObject(data, [
				// inject `source` frontmatter property
				function injectSource(d: { [key: string]: any }) {
					d.source = path.basename(HCPsourceDir)
					return d
				},
				// replace cloud instances with enterprise
				function replaceCloudWithEnterprise(d: { [key: string]: any }) {
					// Some docs do not have all frontmatter properties. Make sure
					// we do not assign `undefined` (which is invalid) in YAML
					if (d.page_title) {
						d.page_title = d.page_title.replace(
							'Terraform Cloud',
							'Terraform Enterprise',
						)
						d.page_title = d.page_title.replace(
							'HCP Terraform',
							'Terraform Enterprise',
						)
					}

					if (d.description) {
						d.description = d.description.replace(
							'Terraform Cloud',
							'Terraform Enterprise',
						)
						d.description = d.description.replace(
							'HCP Terraform',
							'Terraform Enterprise',
						)
					}
					return d
				},
			])

			const vfile = await remark()
				.use(remarkMdx)
				// @ts-expect-error remark is being passed in through the pipeline
				.use(remarkGetImages, HCPsourceDir, imageSrcSet)
				// @ts-expect-error remark is being passed in through the pipeline
				.use(remarkTransformCloudDocsLinks)
				.process(content)

			// replace \-> with ->
			const stringOutput = vfile.toString().replaceAll('\\->', '->')

			// overwrite original file with transformed content
			const contents = matter.stringify('\n' + stringOutput, data)

			// Get the relative path after "terraform-docs-common/docs/cloud-docs"
			const relPath = path.relative(
				path.join(HCPContentDir, 'cloud-docs'),
				item.path,
			)

			const destAbsolutePath = path.join(dest, relPath)
			const directoryPath = path.dirname(destAbsolutePath);

			fs.mkdirSync(directoryPath, { recursive: true });
			fs.writeFileSync(destAbsolutePath, contents)
		}
	}

	// Copy images
	for (const src of Array.from(imageSrcSet)) {
		const basename = path.basename(src)
		const target = path.join(newTFEVersionImageDir, basename)

		fs.mkdirSync(newTFEVersionImageDir, { recursive: true })
		fs.copyFileSync(src, target)
	}
}
