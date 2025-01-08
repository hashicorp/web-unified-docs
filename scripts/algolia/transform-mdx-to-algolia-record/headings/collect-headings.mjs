import remark from 'remark'
import visit from 'unist-util-visit'

/**
 * Recursively concatenates the text content of a node's children, filtering out HTML elements.
 *
 * @param {Object} node - The parent node containing child nodes.
 * @param {Array} node.children - The child nodes to be processed.
 * @returns {string} The concatenated text content of the child nodes, with HTML elements removed.
 */
function stringifyChildNodes(node) {
	return node.children
		.map((child) => {
			if ('children' in child) {
				return stringifyChildNodes(child)
			} else if ('value' in child && child.type !== 'html') {
				return child.value
			}
			return ''
		})
		.join('')
		.trim()
}

/**
 * A transformer function that collects headings from a Markdown Abstract Syntax Tree (AST).
 *
 * @param {Object} options - The options object.
 * @param {Array} options.collector - An array to collect the headings.
 * @returns {Function} A transformer function that processes the Markdown AST.
 */
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

/**
 * Collects headings from the given content using the remark plugin.
 *
 * @param {string} content - The content from which to collect headings.
 * @returns {Promise<Array>} A promise that resolves to an array of collected headings.
 */
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
