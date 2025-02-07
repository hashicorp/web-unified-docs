import visit from 'unist-util-visit'

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
export const DIRECTIVE_RE = /TFC:only/i

export function transformStripTerraformEnterpriseContent({ filePath }) {
	return function transformer(tree) {
		if (filePath.includes('ptfe-releases')) {
			// accumulate the content exclusion blocks
			/** @type ({ start: number; block: string; end: number })[] */
			const matches = []
			let matching = false
			let block = ''

			visit(tree, 'jsx', (node) => {
				const nodeValue = node.value
				const nodeIndex = node.position?.end?.line

				if (!matching) {
					// Wait for a BEGIN block to be matched

					// throw if an END block is matched first
					const endMatch = nodeValue.match(END_RE)
					if (endMatch) {
						throw new StripTerraformEnterpriseContentError(
							`Unexpected END block: line ${nodeIndex}`,
							tree,
						)
					}

					const beginMatch = nodeValue.match(BEGIN_RE)

					if (beginMatch) {
						matching = true

						if (!beginMatch.groups?.block) {
							throw new StripTerraformEnterpriseContentError(
								'No block could be parsed from BEGIN comment',
								tree,
							)
						}

						block = beginMatch.groups.block

						matches.push({
							start: nodeIndex,
							block: beginMatch.groups.block,
							end: -1,
						})
					}
				} else {
					// If we are actively matching within a block, monitor for the end

					// throw if a BEGIN block is matched again
					const beginMatch = nodeValue.match(BEGIN_RE)
					if (beginMatch) {
						throw new StripTerraformEnterpriseContentError(
							`Unexpected BEGIN block: line ${nodeIndex}`,
							tree,
						)
					}

					const endMatch = nodeValue.match(END_RE)
					if (endMatch) {
						const latestMatch = matches[matches.length - 1]

						if (!endMatch.groups?.block) {
							throw new StripTerraformEnterpriseContentError(
								'No block could be parsed from END comment',
								tree,
							)
						}

						// If we reach and end with an un-matching block name, throw an error
						if (endMatch.groups.block !== block) {
							const errMsg =
								`Mismatched block names: Block opens with "${block}", and closes with "${endMatch.groups.block}".` +
								`\n` +
								`Please make sure opening and closing block names are matching. Blocks cannot be nested.` +
								`\n` +
								`- Open:  ${latestMatch.start}: ${block}` +
								`\n` +
								`- Close: ${nodeIndex}: ${endMatch.groups.block}` +
								`\n`
							console.error(errMsg)
							throw new StripTerraformEnterpriseContentError(
								'Mismatched block names',
								tree,
							)
						}

						// Push the ending index of the block into the match result and set matching to false
						latestMatch.end = nodeIndex
						block = ''
						matching = false
					}
				}
			})

			// iterate through the list of matches backwards to remove lines
			matches.reverse().forEach(({ start, end, block }) => {
				const [flag] = block.split(/\s+/)
				const directive = flag.match(DIRECTIVE_RE)

				if (!directive) {
					throw new StripTerraformEnterpriseContentError(
						'Directive could not be parsed',
						tree,
					)
				}

				if (directive[0].includes('TFC:only')) {
					tree.children = tree.children.filter((node) => {
						return (
							!node.position ||
							node.position.start.line < start ||
							node.position.end.line > end
						)
					})
				}
			})
		}
		return tree
	}
}
