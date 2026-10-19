/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Builds a Markdown report of the Consul docs pages that a pull request
 * changes, with a link to each page in the Dev Portal preview deployment.
 *
 * Usage:
 *   node scripts/changed-pages/consul-changed-pages.mjs \
 *     --files <tsv-file> --base-url <preview-url> \
 *     [--content-dir content] [--repo owner/name] [--sha <head-sha>] \
 *     [--max-rows <n>] [--max-chars <n>]
 *
 * `--max-chars` shrinks the tables until the report fits, for example to stay
 * under the GitHub comment size limit.
 *
 * The TSV file has one line per changed file: `status<TAB>filename<TAB>previous_filename`,
 * using the statuses returned by the GitHub "List pull request files" API.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const CONSUL = {
	repoDir: 'consul',
	productSlug: 'consul',
	contentDir: 'content',
	basePaths: ['api-docs', 'docs', 'commands'],
}

const MAX_ROWS = 150
const INCLUDE_REGEX = /^@include\s+['"](.+)['"]\s*$/gm
const VERSION_DIR_REGEX = /^(v\d+\.\d+\.x)(?: \((alpha|beta|rc)\))?$/

const STATUS_LABELS = {
	added: 'Added',
	modified: 'Modified',
	changed: 'Modified',
	renamed: 'Renamed',
	copied: 'Added',
	removed: 'Removed',
}

/**
 * Parses a Consul version directory name such as `v2.1.x` or `v2.1.x (rc)`.
 */
export function parseVersionDir(dirName) {
	const match = dirName.match(VERSION_DIR_REGEX)
	if (!match) {
		return null
	}
	const [major, minor] = match[1].slice(1).split('.').map(Number)
	return {
		dirName,
		version: match[1],
		releaseStage: match[2] ?? 'stable',
		major,
		minor,
	}
}

/**
 * Returns the Consul version metadata, marking the newest stable version as
 * latest. This mirrors scripts/prebuild/gather-version-metadata.mjs, which
 * decides which version gets unversioned URLs in the docs site.
 */
export function getConsulVersions(contentDir) {
	const productDir = path.join(contentDir, CONSUL.repoDir)
	const versions = fs
		.readdirSync(productDir, { withFileTypes: true })
		.filter((entry) => {
			return entry.isDirectory()
		})
		.map((entry) => {
			return parseVersionDir(entry.name)
		})
		.filter(Boolean)
		.sort((a, b) => {
			return b.major - a.major || b.minor - a.minor
		})

	const latest =
		versions.find((v) => {
			return v.releaseStage === 'stable'
		}) ?? versions[0]

	return versions.map((v) => {
		return { ...v, isLatest: v === latest }
	})
}

/**
 * Splits a repository file path into its Consul version directory and the
 * path relative to that version's content directory. Returns null for files
 * outside `content/consul/`.
 */
export function splitConsulPath(filePath) {
	const prefix = `content/${CONSUL.repoDir}/`
	if (!filePath.startsWith(prefix)) {
		return null
	}
	const [versionDir, ...rest] = filePath.slice(prefix.length).split('/')
	if (rest[0] !== CONSUL.contentDir || rest.length < 2) {
		return { versionDir, relativePath: null }
	}
	return { versionDir, relativePath: rest.slice(1).join('/') }
}

/**
 * Converts a content-relative path, such as `docs/intro/index.mdx`, to the
 * docs site URL path. Latest-version pages are unversioned. Other versions
 * place the version after the base path, for example `/consul/docs/v1.22.x/intro`.
 */
export function pageUrlPath(relativePath, version) {
	if (!relativePath.endsWith('.mdx')) {
		return null
	}
	const [basePath, ...rest] = relativePath.replace(/\.mdx$/, '').split('/')
	if (!CONSUL.basePaths.includes(basePath)) {
		return null
	}
	if (rest[rest.length - 1] === 'index') {
		rest.pop()
	}
	const segments = [CONSUL.productSlug, basePath]
	if (!version.isLatest) {
		segments.push(version.version)
	}
	segments.push(...rest)
	return `/${segments.join('/')}`
}

function listMdxFiles(dir) {
	if (!fs.existsSync(dir)) {
		return []
	}
	return fs
		.readdirSync(dir, { recursive: true })
		.map(String)
		.filter((file) => {
			return file.endsWith('.mdx')
		})
}

function readIncludes(filePath) {
	const content = fs.readFileSync(filePath, 'utf8')
	return [...content.matchAll(INCLUDE_REGEX)].map((match) => {
		return match[1]
	})
}

/**
 * Returns the pages in a Consul version that include any of the given
 * partials, directly or through other partials. Partial paths are relative
 * to the version's `partials` directory, as in `@include` statements.
 */
export function findPagesIncludingPartials(versionContentDir, partialPaths) {
	const partialsDir = path.join(versionContentDir, 'partials')
	const affected = new Set(partialPaths)

	// Partials can include other partials, so expand the affected set until
	// it stops growing.
	const allPartials = listMdxFiles(partialsDir)
	let grew = true
	while (grew) {
		grew = false
		for (const partial of allPartials) {
			if (affected.has(partial)) {
				continue
			}
			const includes = readIncludes(path.join(partialsDir, partial))
			if (
				includes.some((include) => {
					return affected.has(include)
				})
			) {
				affected.add(partial)
				grew = true
			}
		}
	}

	const pages = CONSUL.basePaths.flatMap((basePath) => {
		return listMdxFiles(path.join(versionContentDir, basePath)).map((file) => {
			return path.join(basePath, file)
		})
	})
	return pages.filter((page) => {
		return readIncludes(path.join(versionContentDir, page)).some((include) => {
			return affected.has(include)
		})
	})
}

/**
 * Parses the TSV list of changed files.
 */
export function parseChangedFiles(tsv) {
	return tsv
		.split('\n')
		.filter((line) => {
			return line.trim() !== ''
		})
		.map((line) => {
			const [status, filename, previousFilename] = line.split('\t')
			return { status, filename, previousFilename: previousFilename || null }
		})
}

/**
 * Classifies the changed Consul files into changed pages, pages affected
 * through partials, and other changed files.
 */
export function collectChangedPages(changedFiles, contentDir) {
	const versions = new Map(
		getConsulVersions(contentDir).map((v) => {
			return [v.dirName, v]
		}),
	)
	const pages = []
	const partialsByVersion = new Map()
	const otherFiles = []

	for (const file of changedFiles) {
		const split = splitConsulPath(file.filename)
		if (!split) {
			continue
		}
		const version = versions.get(split.versionDir)
		const change = STATUS_LABELS[file.status] ?? file.status

		if (version && split.relativePath?.startsWith('partials/')) {
			if (!partialsByVersion.has(version)) {
				partialsByVersion.set(version, [])
			}
			partialsByVersion
				.get(version)
				.push(split.relativePath.slice('partials/'.length))
			otherFiles.push({ file: file.filename, change })
			continue
		}

		const urlPath =
			version && split.relativePath
				? pageUrlPath(split.relativePath, version)
				: null
		if (!urlPath) {
			otherFiles.push({ file: file.filename, change })
			continue
		}
		pages.push({
			file: file.filename,
			urlPath,
			version,
			change,
			removed: file.status === 'removed',
		})
	}

	const changedFileSet = new Set(
		changedFiles.map((file) => {
			return file.filename
		}),
	)
	const partialPages = []
	for (const [version, partials] of partialsByVersion) {
		const versionContentDir = path.join(
			contentDir,
			CONSUL.repoDir,
			version.dirName,
			CONSUL.contentDir,
		)
		for (const page of findPagesIncludingPartials(
			versionContentDir,
			partials,
		)) {
			const file = `content/${CONSUL.repoDir}/${version.dirName}/${CONSUL.contentDir}/${page}`
			if (changedFileSet.has(file)) {
				continue
			}
			partialPages.push({
				file,
				urlPath: pageUrlPath(page, version),
				version,
				change: 'Includes a changed partial',
				removed: false,
			})
		}
	}

	const byUrl = (a, b) => {
		return a.urlPath.localeCompare(b.urlPath)
	}
	return {
		pages: pages.sort(byUrl),
		partialPages: partialPages.sort(byUrl),
		otherFiles,
	}
}

function versionLabel(version) {
	const stage =
		version.releaseStage === 'stable' ? '' : ` (${version.releaseStage})`
	return `${version.version}${stage}${version.isLatest ? ' (latest)' : ''}`
}

function pageTable(rows, { baseUrl, repo, sha }, maxRows) {
	const lines = [
		'| Page | Version | Change | Preview |',
		'| :--- | :--- | :--- | :--- |',
	]
	for (const row of rows.slice(0, maxRows)) {
		const page =
			repo && sha && !row.removed
				? `[\`${row.urlPath}\`](https://github.com/${repo}/blob/${sha}/${encodeURI(row.file)})`
				: `\`${row.urlPath}\``
		const preview = row.removed
			? 'Not available'
			: `[Preview](${baseUrl}${row.urlPath})`
		lines.push(
			`| ${page} | ${versionLabel(row.version)} | ${row.change} | ${preview} |`,
		)
	}
	if (rows.length > maxRows) {
		lines.push(
			'',
			`Showing ${maxRows} of ${rows.length} pages. Refer to the workflow run summary for the complete list.`,
		)
	}
	return lines.join('\n')
}

/**
 * Renders the Markdown report. `maxRows` limits each table so the report fits
 * in a GitHub comment.
 */
export function renderReport(
	result,
	{ baseUrl, repo, sha, maxRows = MAX_ROWS },
) {
	const options = { baseUrl: baseUrl.replace(/\/$/, ''), repo, sha }
	const sections = ['## Changed Consul pages']

	if (result.pages.length === 0 && result.partialPages.length === 0) {
		sections.push('This PR does not change any Consul docs pages.')
	} else {
		sections.push(
			`Preview links open the [Dev Portal preview](${options.baseUrl}) for this PR. Page links open the source file. You must be signed in to the HashiCorp Vercel team to view previews.`,
		)
	}

	if (result.pages.length > 0) {
		sections.push(pageTable(result.pages, options, maxRows))
	}

	if (result.partialPages.length > 0) {
		sections.push(
			[
				'<details>',
				`<summary>Pages that include a changed partial (${result.partialPages.length})</summary>`,
				'',
				pageTable(result.partialPages, options, maxRows),
				'',
				'</details>',
			].join('\n'),
		)
	}

	if (result.otherFiles.length > 0) {
		sections.push(
			[
				'<details>',
				`<summary>Other changed Consul files (${result.otherFiles.length})</summary>`,
				'',
				...result.otherFiles.map((file) => {
					return `- \`${file.file}\` (${file.change})`
				}),
				'',
				'</details>',
			].join('\n'),
		)
	}

	return `${sections.join('\n\n')}\n`
}

function parseArgs(argv) {
	const args = { contentDir: 'content' }
	for (let i = 0; i < argv.length; i += 2) {
		const name = argv[i].replace(/^--/, '').replace(/-([a-z])/g, (_, c) => {
			return c.toUpperCase()
		})
		args[name] = argv[i + 1]
	}
	if (!args.files || !args.baseUrl) {
		throw new Error(
			'Usage: consul-changed-pages.mjs --files <tsv-file> --base-url <preview-url> [--content-dir content] [--repo owner/name] [--sha <head-sha>] [--max-rows <n>] [--max-chars <n>]',
		)
	}
	for (const key of ['maxRows', 'maxChars']) {
		if (args[key]) {
			args[key] = Number(args[key])
		}
	}
	return args
}

/**
 * Renders the report, halving the table size until it fits in `maxChars`.
 */
export function renderReportWithinLimit(result, options) {
	const { maxChars = Infinity } = options
	let maxRows = options.maxRows ?? MAX_ROWS
	let report = renderReport(result, { ...options, maxRows })
	while (report.length > maxChars && maxRows > 1) {
		maxRows = Math.floor(maxRows / 2)
		report = renderReport(result, { ...options, maxRows })
	}
	return report
}

function main() {
	const args = parseArgs(process.argv.slice(2))
	const changedFiles = parseChangedFiles(fs.readFileSync(args.files, 'utf8'))
	const result = collectChangedPages(changedFiles, args.contentDir)
	process.stdout.write(renderReportWithinLimit(result, args))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	main()
}
