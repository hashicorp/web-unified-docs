/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import { program } from 'commander'

program
	.requiredOption('--config <path>', 'Path to forward-port-config.yml')
	.requiredOption(
		'--labels <json>',
		'JSON array of PR label name strings, e.g. \'["forward-port:vault-label","auto-merge"]\'',
	)
	.option(
		'--comment-file <path>',
		'Path to a file containing a /forward-port PR comment (used as fallback when the slug is not in the config)',
	)
	.parse()

const { config: configPath, labels: labelsJson, commentFile } = program.opts()

// --- Read config file ---
let configText
try {
	configText = fs.readFileSync(configPath, 'utf-8')
} catch (error) {
	console.error(`Error reading config file at ${configPath}:`, error.message)
	process.exit(1)
}

// --- Parse labels JSON ---
let labels
try {
	labels = JSON.parse(labelsJson)
	if (!Array.isArray(labels)) { throw new TypeError('labels must be a JSON array') }
} catch (error) {
	console.error(`Error parsing --labels JSON: ${error.message}`)
	process.exit(1)
}

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

// --- Required fields for both config entries and /forward-port PR comments ---
const REQUIRED_FIELDS = ['sourceVersionFolder', 'targetProduct', 'targetBranch', 'targetVersionFolder']

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
function parseForwardPortComment(text, filePath, slug) {
	const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
	const expectedFirstLine = `/forward-port forward-port:${slug}`

	if (lines[0] !== expectedFirstLine) {
		console.error(
			`Comment file at ${filePath} must start with '${expectedFirstLine}'. ` +
				`Found: '${lines[0] ?? '(empty)'}'. ` +
				`Ensure the comment begins with the forward-port label slug.`,
		)
		process.exit(1)
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
			console.error(
				`/forward-port comment is missing required field '${field}'. ` +
					`Add it to the comment in the format '${field}: <value>'.`,
			)
			process.exit(1)
		}
	}

	return {
		sourceVersionFolder: result.sourceVersionFolder,
		targetProduct: result.targetProduct,
		targetBranch: result.targetBranch,
		targetVersionFolder: result.targetVersionFolder,
		source: 'comment',
	}
}

const config = parseForwardPortConfig(configText)

// --- Extract the forward-port:* label ---
// Labels must follow the pattern "forward-port:<slug>". Exactly one such label
// must be present on the PR.
const fpLabels = labels.filter((l) => l.startsWith('forward-port:'))

if (fpLabels.length === 0) {
	console.error(
		`No forward-port:* label found on this PR. ` +
			`Add a label in the format 'forward-port:<slug>' to trigger forward-porting. ` +
			`Labels found: ${labels.join(', ')}`,
	)
	process.exit(1)
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
	console.error(
		`Multiple forward-port:* labels found: ${fpLabels.join(', ')}. ` +
			`Ensure exactly one forward-port:* label is present on the PR.`,
	)
	process.exit(1)
}

const slug = fpLabels[0].slice('forward-port:'.length)
const configEntry = config[slug]

let matched

if (configEntry) {
	// Scenario A: slug found in config — validate and use it.
	for (const field of REQUIRED_FIELDS) {
		if (!configEntry[field]) {
			console.error(
				`Config entry '${slug}' is missing required field '${field}'. ` +
					`Add it to forward-port-config.yml.`,
			)
			process.exit(1)
		}
	}

	matched = {
		sourceVersionFolder: configEntry.sourceVersionFolder,
		targetProduct: configEntry.targetProduct,
		targetBranch: configEntry.targetBranch,
		targetVersionFolder: configEntry.targetVersionFolder,
		source: 'config',
	}
	console.log(
		`Matched slug '${slug}' in config → targetBranch=${matched.targetBranch}, ` +
			`sourceVersionFolder=${matched.sourceVersionFolder}, targetVersionFolder=${matched.targetVersionFolder}, ` +
			`targetProduct=${matched.targetProduct}`,
	)
} else {
	// Scenario B: slug not in config — fall back to /forward-port PR comment.
	if (!commentFile) {
		console.error(
			`Slug '${slug}' not found in config and no --comment-file was provided. ` +
				`Either add '${slug}' to forward-port-config.yml or include a /forward-port comment file.`,
		)
		process.exit(1)
	}

	let commentText
	try {
		commentText = fs.readFileSync(commentFile, 'utf-8')
	} catch (error) {
		console.error(`Error reading comment file at ${commentFile}:`, error.message)
		process.exit(1)
	}

	matched = parseForwardPortComment(commentText, commentFile, slug)
	console.log(
		`Using /forward-port comment → targetBranch=${matched.targetBranch}, ` +
			`sourceVersionFolder=${matched.sourceVersionFolder}, targetVersionFolder=${matched.targetVersionFolder}, ` +
			`targetProduct=${matched.targetProduct}`,
	)
}

// --- Write to GITHUB_ENV ---
// When running in GitHub Actions, GITHUB_ENV is a file path. Each line written
// to it as KEY=VALUE sets that env var for all subsequent steps in the job.
const githubEnv = process.env.GITHUB_ENV
if (!githubEnv) {
	console.error('GITHUB_ENV env var is not set')
	process.exit(1)
}

fs.appendFileSync(
	githubEnv,
	`TARGET_BRANCH=${matched.targetBranch}\n` +
		`SOURCE_VERSION_FOLDER=${matched.sourceVersionFolder}\n` +
		`TARGET_VERSION_FOLDER=${matched.targetVersionFolder}\n` +
		`TARGET_PRODUCT=${matched.targetProduct}\n`,
	'utf-8',
)
