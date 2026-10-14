import pkg from 'remark'
const remark = pkg.default ?? pkg
import remarkMdx from 'remark-mdx'
import { readFileSync } from 'fs'
import path from 'path'
import { includePartials } from '../include-partials/include-partials.mjs'
// import { parseDirectiveBlocks } from '../exclude-content/ast-utils.mjs'
import { createCustomVariableMap } from './createCustomVariableMap.mjs'
import { injectCustomVariables } from './injectCustomVariables.mjs'

const filePath = path.resolve(
	process.argv[2] ?? new URL('./test-fixture.mdx', import.meta.url).pathname,
)

// Derive repoSlug from the file path.
// In the real pipeline the structure is: content/<repoSlug>/<version>/<contentDir>/...
// In our fixtures it is: fixtures/<repoSlug>/docs/...
// Either way, find the segment that follows 'content' or 'fixtures'.
const pathSegments = filePath.split(path.sep)
const anchorIndex = Math.max(
	pathSegments.lastIndexOf('content'),
	pathSegments.lastIndexOf('fixtures'),
)
const repoSlug = anchorIndex !== -1 ? pathSegments[anchorIndex + 1] : null
if (!repoSlug) {
	throw new Error(
		`Could not derive repoSlug from file path: ${filePath}. ` +
			`Expected path to contain a 'content' or 'fixtures' segment.`,
	)
}
console.log(`=== Derived repoSlug: ${repoSlug} ===`)

// Derive partialsDir from the fixture path.
// In the real pipeline it is: content/<repoSlug>/<version>/<contentDir>/partials
// We accept an optional second argument to override it, otherwise we walk up
// from the fixture file and look for a sibling "partials" directory.
const partialsDir = process.argv[3]
	? path.resolve(process.argv[3])
	: path.join(path.dirname(filePath), 'partials')

let src = readFileSync(filePath, 'utf8')

console.log(`=== Injecting partials (partialsDir: ${partialsDir}) ===`)
src = await includePartials(src, partialsDir, filePath)
console.log('=== Partials injected ===\n')

let tree = remark().use(remarkMdx).parse(src)

// console.log('=== Parsed Directory Blocks ===\n')
// const blocks = parseDirectiveBlocks(tree)

console.log('=== Variable Map ===')
const [variableMap, contentNodesToReplace] = createCustomVariableMap(tree)

console.log('=== Injecting Variables ===')
injectCustomVariables(tree, variableMap, contentNodesToReplace, repoSlug)

// console.log('=== Parsed Directory Blocks ===\n')
// parseDirectiveBlocks(tree)
