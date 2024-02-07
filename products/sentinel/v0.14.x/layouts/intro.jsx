import DocsPage, { getInitialProps } from '../components/docs-page'
import orderData from '../data/intro-navigation.js'
import { frontMatter } from '../pages/sentinel/intro/**/*.mdx'

function IntroLayoutWrapper(pageMeta) {
  function IntroLayout(props) {
    return (
      <div>
        <DocsPage
          {...props}
          orderData={orderData}
          frontMatter={frontMatter}
          pageMeta={pageMeta}
          category="sentinel/intro"
        />
      </div>
    )
  }

  IntroLayout.getInitialProps = getInitialProps

  return IntroLayout
}

export default IntroLayoutWrapper
