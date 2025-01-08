import remark from 'remark'
import visit from 'unist-util-visit'

/**
 * Collect text from children nodes of a Parent node.
 * This will visit nodes recursively via "depth-first" strategy.
 */
function stringifyChildNodes(node) {
	const text = node.children.reduce((acc, child) => {
		if ('children' in child) {
			acc += stringifyChildNodes(child)
		} else if ('value' in child && child.type !== 'html') {
			/**
			 * filter out html in heading, e.g. ## Constructs <a name="Constructs" id="Constructs"></a>
			 * should return 'Constructs,' not 'Constructs <a name="Constructs" id="Constructs"></a>'
			 */
			acc += child.value
		}
		return acc
	}, '')

	return text.trim()
}

const headingsCollector = ({ collector }) => {
	return function transformer(tree) {
		visit(tree, 'heading', (node) => {
			if (node.depth <= 5) {
				const title = stringifyChildNodes(node)
				collector.push(title)
			}
		})
	}
}

export async function collectHeadings(content) {
	const headings = []

	/**
	 * Run remark using the extraction plugin,
	 * then return the collected array of `codeListItems`
	 */
	return remark()
		.use(headingsCollector, { collector: headings })
		.process(content)
		.then(() => {
			return headings
		})
}
