import DocsPage, { getInitialProps } from '../components/docs-page'
import orderData from '../data/docs-navigation.js'
import { frontMatter } from '../pages/sentinel/**/*.mdx'

function DocsLayoutWrapper(pageMeta) {
  function DocsLayout(props) {
    return (
      <div>
        <DocsPage
          {...props}
          orderData={orderData}
          frontMatter={frontMatter}
          pageMeta={pageMeta}
          category="sentinel"
        />
      </div>
    )
  }

  DocsLayout.getInitialProps = getInitialProps

  return DocsLayout
}

export default DocsLayoutWrapper
