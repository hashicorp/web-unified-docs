/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import { parseArgs } from 'node:util'
import { pathToFileURL } from 'node:url'

// --- Required fields for both config entries and /forward-port PR comments ---
const REQUIRED_FIELDS = ['sourceVersionFolder', 'targetProduct', 'targetBranch', 'targetVersionFolder']

// --- Parse the YAML config ---
// Keys are slugs that correspond to the part after "forward-port:" in PR labels.
// Each entry must have sourceVersionFolder, targetProduct, targetBranch, and targetVersionFolder.
//
// We parse with a lightweight line scanner rather than pulling in a YAML library,
// since the format is simple and entirely owned by this repo.
function parseForwardPortConfig(text) {
	const config = {}
	let currentSlug = null

	for (const rawLine of text.split('\n')) {
		const line = rawLine.trimEnd()

		if (!line.trim()) {
			currentSlug = null
			continue
		}

		// Top-level key (no leading whitespace, ends with ':')
		if (!/^\s/.test(line) && line.endsWith(':')) {
			currentSlug = line.slice(0, -1).trim()
			config[currentSlug] = {}
			continue
		}

		// Indented key-value pair
		if (currentSlug && /^\s+\w/.test(line)) {
			const colonIdx = line.indexOf(':')
			if (colonIdx === -1) { continue }
			const key = line.slice(0, colonIdx).trim()
			// Strip inline YAML comments (e.g. "v0.20.0 # grab latest")
			const raw = line.slice(colonIdx + 1).trim()
			const value = raw.replace(/\s+#.*$/, '')
			config[currentSlug][key] = value
		}
	}

	return config
}

// --- Parse a /forward-port multiline comment ---
// The first line must be exactly "/forward-port forward-port:<slug>" where <slug>
// matches the forward-port:* label on the PR. This ties the comment to a specific
// run and disambiguates multiple forward-port runs on the same PR.
//
// Expected format:
//   /forward-port forward-port:vault-label
//   sourceVersionFolder: v1.14.x
//   targetProduct: Vault
//   targetBranch: vault-label
//   targetVersionFolder: v1.15.x
//
// Returns { matched } on success or { error } on failure.
function parseForwardPortComment(text, filePath, slug) {
	const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
	const expectedFirstLine = `/forward-port forward-port:${slug}`

	if (lines[0] !== expectedFirstLine) {
		return {
			error:
				`Comment file at ${filePath} must start with '${expectedFirstLine}'. ` +
				`Found: '${lines[0] ?? '(empty)'}'. ` +
				`Ensure the comment begins with the forward-port label slug.`,
		}
	}

	const result = {}
	for (const line of lines.slice(1)) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) { continue }
		const key = line.slice(0, colonIdx).trim()
		const value = line.slice(colonIdx + 1).trim()
		if (key && value) { result[key] = value }
	}

	for (const field of REQUIRED_FIELDS) {
		if (!result[field]) {
			return {
				error:
					`/forward-port comment is missing required field '${field}'. ` +
					`Add it to the comment in the format '${field}: <value>'.`,
			}
		}
	}

	return {
		matched: {
			sourceVersionFolder: result.sourceVersionFolder,
			targetProduct: result.targetProduct,
			targetBranch: result.targetBranch,
			targetVersionFolder: result.targetVersionFolder,
			source: 'comment',
		},
	}
}

/**
 * Resolves the forward-port routing for a PR.
 *
 * Reads the config file and (optionally) a /forward-port comment file, extracts
 * the single forward-port:* label, and resolves the routing fields.
 *
 * @param {object} options
 * @param {string} options.configPath - Path to forward-port-config.yml.
 * @param {string[]} options.labels - The PR's labels.
 * @param {string} [options.commentFile] - Path to a /forward-port comment file.
 * @returns {{ result?: object, warning?: string, error?: string }}
 *   On success returns { result } where result has TARGET_BRANCH,
 *   SOURCE_VERSION_FOLDER, TARGET_VERSION_FOLDER, and TARGET_PRODUCT.
 *   On failure returns { error } with a human-readable message.
 */
export function resolveTarget({ configPath, labels, commentFile } = {}) {
	if (!configPath || !labels) {
		return { error: 'configPath and labels are required' }
	}

	if (!Array.isArray(labels)) {
		return { error: 'labels must be an array' }
	}

	// --- Read config file ---
	let configText
	try {
		configText = fs.readFileSync(configPath, 'utf-8')
	} catch (error) {
		return { error: `Error reading config file at ${configPath}: ${error.message}` }
	}

	const config = parseForwardPortConfig(configText)

	// --- Extract the forward-port:* label ---
	// Labels must follow the pattern "forward-port:<slug>". Exactly one such label
	// must be present on the PR.
	const fpLabels = labels.filter((l) => l.startsWith('forward-port:'))

	if (fpLabels.length === 0) {
		return {
			error:
				`No forward-port:* label found on this PR. ` +
				`Add a label in the format 'forward-port:<slug>' to trigger forward-porting. ` +
				`Labels found: ${labels.join(', ')}`,
		}
	}

	// Keeping this here so and making the implementation very rigid- if people
	// want this to run after the PR is merged, they have to manage the forward-port labels
	// and remove ones they already ran so there's no confusion about what info/pr comment is being read
	// or what's going to be ran.
	// It's expected for people to remove the forward-port labels that are already on the PR if they want
	// it to run again for another label.
	// The history of these post merge forward-port runs will be visible via the comment history
	// on the PR
	if (fpLabels.length > 1) {
		return {
			error:
				`Multiple forward-port:* labels found: ${fpLabels.join(', ')}. ` +
				`Ensure exactly one forward-port:* label is present on the PR.`,
		}
	}

	const slug = fpLabels[0].slice('forward-port:'.length)
	const configEntry = config[slug]

	let matched

	if (configEntry) {
		// Scenario A: slug found in config — validate and use it.
		for (const field of REQUIRED_FIELDS) {
			if (!configEntry[field]) {
				return {
					error:
						`Config entry '${slug}' is missing required field '${field}'. ` +
						`Add it to forward-port-config.yml.`,
				}
			}
		}

		matched = {
			sourceVersionFolder: configEntry.sourceVersionFolder,
			targetProduct: configEntry.targetProduct,
			targetBranch: configEntry.targetBranch,
			targetVersionFolder: configEntry.targetVersionFolder,
			source: 'config',
		}
	} else {
		// Scenario B: slug not in config — fall back to /forward-port PR comment.
		if (!commentFile) {
			return {
				error:
					`Slug '${slug}' not found in config and no --comment-file was provided. ` +
					`Either add '${slug}' to forward-port-config.yml or include a /forward-port comment file.`,
			}
		}

		let commentText
		try {
			commentText = fs.readFileSync(commentFile, 'utf-8')
		} catch (error) {
			return { error: `Error reading comment file at ${commentFile}: ${error.message}` }
		}

		const parsed = parseForwardPortComment(commentText, commentFile, slug)
		if (parsed.error) {
			return { error: parsed.error }
		}
		matched = parsed.matched
	}

	const warning =
		matched.source === 'config'
			? `Matched slug '${slug}' in config → targetBranch=${matched.targetBranch}, ` +
				`sourceVersionFolder=${matched.sourceVersionFolder}, targetVersionFolder=${matched.targetVersionFolder}, ` +
				`targetProduct=${matched.targetProduct}`
			: `Using /forward-port comment → targetBranch=${matched.targetBranch}, ` +
				`sourceVersionFolder=${matched.sourceVersionFolder}, targetVersionFolder=${matched.targetVersionFolder}, ` +
				`targetProduct=${matched.targetProduct}`

	return {
		result: {
			TARGET_BRANCH: matched.targetBranch,
			SOURCE_VERSION_FOLDER: matched.sourceVersionFolder,
			TARGET_VERSION_FOLDER: matched.targetVersionFolder,
			TARGET_PRODUCT: matched.targetProduct,
		},
		warning,
	}
}

/**
 * Returns true when this module is executed directly by Node, e.g.
 * `node scripts/forward-port/resolve-target.mjs`.
 */
function isRunFromCommandLine() {
	if (!process.argv[1]) {
		return false
	}

	return import.meta.url === pathToFileURL(process.argv[1]).href
}

if (isRunFromCommandLine()) {
	const { values } = parseArgs({
		options: {
			config: { type: 'string' },
			labels: { type: 'string' },
			'comment-file': { type: 'string' },
		},
		strict: true,
	})

	if (!values.config || !values.labels) {
		console.error('Error: --config and --labels are required')
		process.exit(1)
	}

	let cliLabels
	try {
		cliLabels = JSON.parse(values.labels)
		if (!Array.isArray(cliLabels)) { throw new TypeError('labels must be a JSON array') }
	} catch (error) {
		console.error(`Error parsing --labels JSON: ${error.message}`)
		process.exit(1)
	}

	const outcome = resolveTarget({
		configPath: values.config,
		labels: cliLabels,
		commentFile: values['comment-file'],
	})

	if (outcome.error) {
		console.error(outcome.error)
		process.exit(1)
	}

	if (outcome.warning) {
		console.warn(outcome.warning)
	}

	// --- Output JSON to stdout ---
	// The calling shell (GHA workflow step) is responsible for parsing this JSON
	// and writing the values to GITHUB_ENV.
	//
	// IMPORTANT: stdout must contain exactly this one line of JSON and nothing else.
	// The shell captures stdout with $(...) and pipes it straight into `jq`; any
	// extra output (including accidental console.log calls) will corrupt the parse.
	// All diagnostic / informational output in this file uses console.warn() or
	// console.error() — both of which write to stderr, not stdout — to keep stdout clean.
	console.log(JSON.stringify(outcome.result))
}
