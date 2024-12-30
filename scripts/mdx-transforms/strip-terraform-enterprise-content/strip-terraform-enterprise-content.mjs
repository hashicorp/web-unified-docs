import { SemVer, gt, gte, lt, lte } from 'semver'

// this is a courtesy wrapper to prepend [strip-terraform-enterprise-content]
// to error messages
class StripTerraformEnterpriseContentError extends Error {
	constructor(message, markdownSource) {
		super(
			`[strip-terraform-enterprise-content] ${message}` +
				`\n- ${markdownSource}` +
				`\n- ${markdownSource}`,
		)
		this.name = 'StripTerraformEnterpriseContentError'
	}
}

export const BEGIN_RE = /^(\s+)?<!--\s+BEGIN:\s+(?<block>.*?)\s+-->(\s+)?$/
export const END_RE = /^(\s+)?<!--\s+END:\s+(?<block>.*?)\s+-->(\s+)?$/
export const DIRECTIVE_RE =
	/^(?<product>TF[CE]):(?<comparator>only|[<>]=?)(v(?<version>[0-9]{6}-[0-9]+))?$/i

/**
 * @type ({
 *    id: string,
 *    transformer: ( markdownSource: string, ctx: { version: string }) => Promise<string>
 * })
 */
export const transformStripTerraformEnterpriseContent = {
	id: 'strip-terraform-enterprise-content',
	async transformer(markdownSource, ctx) {
		// this is expected to be a full TFE version
		// - v202205-1
		const incomingVersion = ctx.version

		// get each line of our mdx content
		const lines = markdownSource.split(/\r?\n/)

		let matching = false

		// accumulate the content exclusion blocks
		/** @type ({ start: number; block: string; end: number })[] */
		const matches = []

		lines.forEach((line, idx) => {
			if (!matching) {
				// Wait for a BEGIN block to be matched

				// throw if an END block is matched first
				const endMatch = line.match(END_RE)
				if (endMatch) {
					throw new StripTerraformEnterpriseContentError(
						`Unexpected END block: line ${idx + 1}`,
						markdownSource,
					)
				}

				const beginMatch = line.match(BEGIN_RE)

				if (beginMatch) {
					matching = true

					if (!beginMatch.groups?.block) {
						throw new StripTerraformEnterpriseContentError(
							'No block could be parsed from BEGIN comment',
							markdownSource,
						)
					}

					matches.push({
						start: idx,
						block: beginMatch.groups.block,
						end: -1,
					})
				}
			} else {
				// If we are actively matching within a block, monitor for the end

				// throw if a BEGIN block is matched again
				const beginMatch = line.match(BEGIN_RE)
				if (beginMatch) {
					throw new StripTerraformEnterpriseContentError(
						`Unexpected BEGIN block: line ${idx + 1}`,
						markdownSource,
					)
				}

				const endMatch = line.match(END_RE)
				if (endMatch) {
					const latestMatch = matches[matches.length - 1]

					if (!endMatch.groups?.block) {
						throw new StripTerraformEnterpriseContentError(
							'No block could be parsed from END comment',
							markdownSource,
						)
					}

					// If we reach and end with an un-matching block name, throw an error
					if (endMatch.groups.block !== latestMatch.block) {
						const errMsg =
							`Mismatched block names: Block opens with "${latestMatch.block}", and closes with "${endMatch[1]}".` +
							`\n` +
							`Please make sure opening and closing block names are matching. Blocks cannot be nested.` +
							`\n` +
							`- Open:  ${latestMatch.start + 1}: ${latestMatch.block}` +
							`\n` +
							`- Close: ${idx + 1}: ${endMatch[1]}` +
							`\n`
						console.error(errMsg)
						throw new StripTerraformEnterpriseContentError(
							'Mismatched block names',
							markdownSource,
						)
					}

					// Push the ending index of the block into the match result and set matching to false
					latestMatch.end = idx
					matching = false
				}
			}
		})

		// iterate through the list of matches backwards to remove lines
		matches.reverse().forEach(({ start, end, block }) => {
			const satisfies = tryGetVersionSatisfies(
				incomingVersion,
				block,
				markdownSource,
			)

			// if a version does not satisfy the directive, remove the block
			if (!satisfies) {
				lines.splice(start, end - start + 1)
			}
		})

		return lines.join('\n')
	},
}

/**
 * This returns a boolean value indicating if a given TFE version
 * satisfies a given exclusion directive.
 *
 * Will throw if the block is invalid.
 *
 * @param {string} version a string like `v202001-1`
 * @param {string} block a string like `TFE:>=v202205-1`
 * @returns {boolean} true if the version satisfies the block
 */
export const tryGetVersionSatisfies = (version, block, markdownSource) => {
	const [flag] = block.split(/\s+/)
	const directive = flag.match(DIRECTIVE_RE)

	if (!directive) {
		throw new StripTerraformEnterpriseContentError(
			'Directive could not be parsed',
			markdownSource,
		)
	}

	if (!directive.groups) {
		throw new StripTerraformEnterpriseContentError(
			'Directive is possibly malformed',
			markdownSource,
		)
	}

	const { groups } = directive

	switch (groups.product) {
		case 'TFE': {
			const versionSemVer = getTfeSemver(version)
			const directiveSemVer = getTfeSemver(groups.version)

			const compare = getComparisonFn(groups.comparator, markdownSource)
			return compare(versionSemVer, directiveSemVer)
		}
		case 'TFC': {
			if (groups.comparator === 'only') {
				return false
			} else {
				throw new StripTerraformEnterpriseContentError(
					'TFC only supports [only] comparator',
					markdownSource,
				)
			}
		}
		default: {
			// We should never get here, but throw an error just in case
			throw new StripTerraformEnterpriseContentError(
				'Unexpected error',
				markdownSource,
			)
		}
	}
}

const getComparisonFn = (operator, markdownSource) => {
	switch (operator) {
		case '<=':
			return (a, b) => {
				return lte(a, b)
			}
		case '>=':
			return (a, b) => {
				return gte(a, b)
			}
		case '<':
			return (a, b) => {
				return lt(a, b)
			}
		case '>':
			return (a, b) => {
				return gt(a, b)
			}
		default:
			throw new StripTerraformEnterpriseContentError(
				'Invalid comparator: ' + operator,
				markdownSource,
			)
	}
}

/**
 * converts a TFE version string into a `SemVer` instance
 */
export const getTfeSemver = (tfeVersionString) => {
	const [series, release] = tfeVersionString.replace(/^v/, '').split('-')

	const year = parseInt(series.slice(0, 4))
	const month = parseInt(series.slice(4, 6))

	return new SemVer(`${year}.${month}.${release || 0}`)
}
