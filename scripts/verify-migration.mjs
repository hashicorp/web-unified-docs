#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * verify-migration.mjs — HVD 2.0 per-product migration verification.
 *
 * Runs the acceptance checks defined in the HVD migration playbook:
 *   1. Structural checks against the target (web-unified-docs):
 *        - every nav path for the product resolves to a file
 *        - no orphan files (target .mdx not referenced by nav)
 *        - no numbered filenames (NNNN-) remain
 *        - no numbered paths remain in the product's nav node
 *   2. Corpus-level content-preservation diff (source hvd-docs vs target):
 *        - every source heading and body line appears somewhere in the target
 *          (content is redistributed across renamed/split files, so the whole
 *           product corpus is compared, not file-by-file)
 *
 * The structural checks are pass/fail. The content-preservation diff lists
 * source content missing from the target for a human to classify as an
 * intentional removal (merged titles, reframed intros, trimmed summaries,
 * obsolete phase framing) or an accidental loss to restore.
 *
 * Usage:
 *   node scripts/verify-migration.mjs <product> [--source <dir>] [--target <dir>] [--nav <file>]
 *
 * Defaults (assume hvd-docs is a sibling checkout of web-unified-docs):
 *   --source  ../hvd-docs/content
 *   --target  content/validated-designs/docs/docs
 *   --nav     content/validated-designs/data/docs-nav-data.json
 *
 * Exit code is non-zero if any structural check fails.
 */

import fs from 'node:fs'
import path from 'node:path'

function parseArgs(argv) {
	const args = { _: [] }
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i]
		if (a === '--source' || a === '--target' || a === '--nav') {
			args[a.slice(2)] = argv[++i]
		} else {
			args._.push(a)
		}
	}
	return args
}

function walkMdx(dir) {
	const out = []
	if (!fs.existsSync(dir)) return out
	for (const entry of fs.readdirSync(dir, { withFileTypes: true, recursive: true })) {
		if (entry.isFile() && entry.name.endsWith('.mdx')) {
			out.push(path.join(entry.parentPath ?? entry.path, entry.name))
		}
	}
	return out
}

function stripFrontmatter(text) {
	if (text.startsWith('---')) {
		const parts = text.split('---')
		// parts[0] === '', parts[1] === frontmatter, rest is body
		return parts.slice(2).join('---')
	}
	return text
}

function normalizeLine(line) {
	let l = line
	// keep visible link text, drop the URL target: [text](url) -> text
	l = l.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
	// keep visible text of HTML anchors, drop the tag+href: <a href="url">text</a> -> text
	// (source HVDs frequently use HTML links whose URLs change during migration;
	//  comparing on the URL would produce false "missing content" positives)
	l = l.replace(/<a\s+[^>]*>(.*?)<\/a>/gi, '$1')
	l = l.replace(/`/g, '')
	// unescape common markdown escapes so \- \. \# compare equal
	l = l.replace(/\\([-.#*_])/g, '$1')
	// canonicalise guide-type NAMES so the content diff is not swamped by the
	// intentional terminology migration (Solution Design Guide -> Installation Guide,
	// Operating Guide -> Administration/User Guide). A line that changed only by a
	// guide-name swap should match; genuine prose loss still surfaces. The separate
	// legacy-terminology gate (below) is what enforces the swap actually happened.
	l = l.replace(/\b(solution design|installation|administration|operating|user)\s+guides?\b/gi, 'GUIDE')
	l = l.replace(/\s+/g, ' ').trim()
	return l
}

// Prose scan for legacy guide-type names and retired maturity-model framing.
// Excludes URLs, image paths, and HTML/JSX comments (which carry the editorial markers).
const LEGACY_PATTERNS = [
	/\bsolution design guide\b/i,
	/\bsolutions? guide\b/i,
	/\boperating guide\b/i,
	/\b(adoption|adopt|standardization|standardizing|scaling)\s+phase\b/i,
	/\bmaturity (model|scale)\b/i,
	/\bphase of operating\b/i,
]
function scanLegacyTerms(tree) {
	const hits = []
	let inComment = false
	for (const file of walkMdx(tree)) {
		const body = stripFrontmatter(fs.readFileSync(file, 'utf8'))
		body.split('\n').forEach((raw, i) => {
			let line = raw
			// skip HTML/JSX comment lines (editorial review markers live here)
			if (/<!--|\{\/\*/.test(line)) inComment = true
			const commented = inComment
			if (/-->|\*\/\}/.test(line)) inComment = false
			if (commented) return
			// strip links/images so URL slugs and asset paths don't count
			line = line.replace(/\]\([^)]*\)/g, ']').replace(/<a\s+[^>]*>/gi, '').replace(/\/img\/[^\s)"']*/g, '')
			// keep only prose that isn't a bare URL
			line = line.replace(/https?:\/\/\S+/g, '').replace(/\/validated-designs\/\S+/g, '')
			for (const re of LEGACY_PATTERNS) {
				if (re.test(line)) {
					hits.push(`${file.split('/docs/docs/')[1] || file}:${i + 1}: ${raw.trim().slice(0, 120)}`)
					break
				}
			}
		})
	}
	return hits
}

// Duplicate H2 headings within an introduction page. Intros are where content
// concatenated from multiple source guides shows up (e.g. repeated "Use cases"
// sections). Restricted to introduction.mdx + H2 to avoid flagging legitimately
// repeated sub-headings in long reference pages.
function duplicateHeadings(tree) {
	const dupes = []
	for (const file of walkMdx(tree)) {
		if (path.basename(file) !== 'introduction.mdx') continue
		const body = stripFrontmatter(fs.readFileSync(file, 'utf8'))
		let inFence = false
		const seen = new Map()
		for (const raw of body.split('\n')) {
			if (/^\s*(```|~~~)/.test(raw)) inFence = !inFence
			if (inFence) continue
			const m = /^(##)\s+(.*)$/.exec(raw.trim())
			if (m) {
				const key = normalizeLine(m[2])
				seen.set(key, (seen.get(key) || 0) + 1)
			}
		}
		for (const [key, n] of seen) {
			if (n > 1) dupes.push(`${file.split('/docs/docs/')[1] || file} :: "${key}" (\u00d7${n})`)
		}
	}
	return dupes
}

function collectCorpus(tree) {
	const headings = new Set()
	const lines = new Map() // normalized line -> sample source file
	for (const file of walkMdx(tree)) {
		const body = stripFrontmatter(fs.readFileSync(file, 'utf8'))
		for (const raw of body.split('\n')) {
			const s = raw.trim()
			if (!s) continue
			const headingMatch = /^#{1,6}\s+(.*)$/.exec(s)
			if (headingMatch) {
				const h = normalizeLine(headingMatch[1])
				if (h) headings.add(h)
			} else {
				const n = normalizeLine(s)
				if (n && !lines.has(n)) lines.set(n, file)
			}
		}
	}
	return { headings, lines }
}

function navPathsForProduct(navFile, product) {
	const nav = JSON.parse(fs.readFileSync(navFile, 'utf8'))
	const node = nav.find(
		(p) =>
			(p.title || '').toLowerCase().replace(/[\s-]+/g, '-') ===
			product.toLowerCase().replace(/[\s-]+/g, '-'),
	)
	if (!node) return { node: null, paths: [], allTitles: nav.map((p) => p.title) }
	const paths = []
	const walk = (routes) => {
		for (const r of routes || []) {
			if (r.path) paths.push(r.path)
			if (r.routes) walk(r.routes)
		}
	}
	walk(node.routes)
	return { node, paths, allTitles: nav.map((p) => p.title) }
}

function main() {
	const args = parseArgs(process.argv.slice(2))
	const product = args._[0]
	if (!product) {
		console.error('Usage: node scripts/verify-migration.mjs <product> [--source dir] [--target dir] [--nav file]')
		process.exit(2)
	}
	const source = path.resolve(args.source || '../hvd-docs/content')
	const target = path.resolve(args.target || 'content/validated-designs/docs/docs')
	const navFile = path.resolve(args.nav || 'content/validated-designs/data/docs-nav-data.json')

	const failures = []
	const notes = []

	console.log(`\n=== HVD migration verification: ${product} ===`)
	console.log(`source (baseline): ${source}`)
	console.log(`target (canonical): ${target}`)
	console.log(`nav: ${navFile}\n`)

	// ---- Structural checks (target) ----
	const { node, paths } = navPathsForProduct(navFile, product)
	if (!node) {
		failures.push(`No nav node found for product "${product}" in ${navFile}`)
	}

	const missing = []
	for (const p of paths) {
		const rel = p.replace(new RegExp(`^${product}/`), '')
		const file = path.join(target, product, rel + '.mdx')
		if (!fs.existsSync(file)) missing.push(p)
	}
	if (missing.length) failures.push(`Nav paths with no file (${missing.length}): ${missing.join(', ')}`)

	const navSet = new Set(paths.map((p) => p.replace(new RegExp(`^${product}/`), '') + '.mdx'))
	const targetFiles = walkMdx(path.join(target, product)).map((f) =>
		path.relative(path.join(target, product), f),
	)
	const orphans = targetFiles.filter((f) => !navSet.has(f))
	if (orphans.length) failures.push(`Orphan files not in nav (${orphans.length}): ${orphans.join(', ')}`)

	const numberedFiles = targetFiles.filter((f) => /^\d+-|\/\d+-/.test(f) || /(^|\/)\d{2,}-/.test(path.basename(f)))
	if (numberedFiles.length) failures.push(`Numbered filenames remain (${numberedFiles.length}): ${numberedFiles.join(', ')}`)

	const numberedPaths = paths.filter((p) => /\/\d+-/.test(p))
	if (numberedPaths.length) failures.push(`Numbered nav paths remain (${numberedPaths.length}): ${numberedPaths.join(', ')}`)

	console.log(`Structural checks:`)
	console.log(`  nav paths:            ${paths.length}`)
	console.log(`  target .mdx files:    ${targetFiles.length}`)
	console.log(`  missing files:        ${missing.length}`)
	console.log(`  orphan files:         ${orphans.length}`)
	console.log(`  numbered filenames:   ${numberedFiles.length}`)
	console.log(`  numbered nav paths:   ${numberedPaths.length}`)

	// ---- Terminology gate: no legacy guide names / maturity-phase framing in prose ----
	const legacy = scanLegacyTerms(path.join(target, product))
	console.log(`\nTerminology gate (legacy guide names / maturity-phase framing in prose): ${legacy.length}`)
	for (const h of legacy.slice(0, 40)) console.log(`  ✗ ${h}`)
	if (legacy.length > 40) console.log(`  … and ${legacy.length - 40} more`)
	if (legacy.length) failures.push(`Legacy terminology remains in prose (${legacy.length} lines) — see terminology gate above`)

	// ---- Duplicate-heading check (catches concatenated intros) ----
	const dupes = duplicateHeadings(path.join(target, product))
	console.log(`\nDuplicate headings within a guide: ${dupes.length}`)
	for (const d of dupes) console.log(`  ✗ ${d}`)
	if (dupes.length) failures.push(`Duplicate headings within a guide (${dupes.length}) — likely concatenated content`)

	// ---- Content-preservation diff (source vs target) ----
	const srcTree = path.join(source, product)
	const tgtTree = path.join(target, product)
	const src = collectCorpus(srcTree)
	const tgt = collectCorpus(tgtTree)

	const missingHeadings = [...src.headings].filter((h) => !tgt.headings.has(h)).sort()
	const missingLines = [...src.lines.keys()].filter((n) => !tgt.lines.has(n)).sort()

	console.log(`\nContent-preservation (source corpus vs target corpus):`)
	console.log(`  source headings: ${src.headings.size} | target headings: ${tgt.headings.size}`)
	console.log(`  source lines:    ${src.lines.size} | target lines:    ${tgt.lines.size}`)
	console.log(`  headings missing from target: ${missingHeadings.length}`)
	console.log(`  lines missing from target:    ${missingLines.length}`)

	if (missingHeadings.length) {
		console.log(`\n  --- Headings in source missing from target (classify each) ---`)
		for (const h of missingHeadings) console.log(`    • ${h}`)
	}
	if (missingLines.length) {
		console.log(`\n  --- Lines in source missing from target (classify each) ---`)
		for (const n of missingLines) {
			console.log(`    • [${path.basename(src.lines.get(n))}] ${n.slice(0, 160)}`)
		}
	}

	notes.push(
		'Content-preservation diffs are advisory: classify each item as an intentional removal ' +
			'(merged titles, reframed intros, trimmed maturity summaries, obsolete phase framing) or an ' +
			'accidental loss to restore. They do not fail the run automatically.',
	)
	notes.push('"Other products untouched" is verified via `git diff` on the shared JSON, not by this script.')

	console.log(`\nNotes:`)
	for (const n of notes) console.log(`  - ${n}`)

	console.log(`\nResult: ${failures.length === 0 ? 'PASS' : 'FAIL'}`)
	if (failures.length) {
		for (const f of failures) console.log(`  ✗ ${f}`)
		process.exit(1)
	}
}

main()
