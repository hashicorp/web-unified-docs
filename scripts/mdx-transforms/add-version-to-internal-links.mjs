import remark from 'remark'
import remarkMdx from 'remark-mdx'
import flatMap from 'unist-util-flatmap'
import { ALL_REPO_CONFIG } from '../migrate-content/repo-config.mjs'
import versionMetadata from '../../app/api/versionMetadata.json' assert { type: 'json' }

const rewriteInternalLinksPlugin = ({ entry }) => {
	const relativePath = entry.filePath.split('content/')[1]
	const [product, version] = relativePath.split('/')
	const latestVersion = versionMetadata[product].find((version) => {
		return version.isLatest
	}).version
	if (version === latestVersion) {
		return
	}
	const basePaths = ALL_REPO_CONFIG[product].basePaths || []
	const isLinkToRewritePattern = new RegExp(
		`^(?!https?:\\/\\/|http:\\/\\/)(((\\.+\\/)*)|\\/|\\/${product}(?:\\/${basePaths.join('|')})?\\/)`,
	)
	const replacePattern = new RegExp(`/(${basePaths.join('|')})(/)?`)
	return function transformer(tree) {
		return flatMap(tree, (node) => {
			if (node.type === 'link' && isLinkToRewritePattern.test(node.url)) {
				node.url = node.url.replace(replacePattern, `/$1/${version}$2`)
			}
			return [node]
		})
	}
}

export const transformRewriteInternalLinks = {
	async transformer(content, entry) {
		const contents = await remark()
			.use(remarkMdx)
			.use(rewriteInternalLinksPlugin, {
				entry,
			})
			.process(content)

		const document = contents

		return document.contents
	},
}
