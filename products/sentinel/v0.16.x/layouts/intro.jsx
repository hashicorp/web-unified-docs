import { SearchProvider } from '@hashicorp/react-search'
import DocsPage, { getInitialProps } from '../components/docs-page'
import SearchBar from '../components/search-bar'
import orderData from '../data/intro-navigation.js'
import { frontMatter } from '../pages/sentinel/intro/**/*.mdx'
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'

const MDXProvider = createMdxProvider({ product: 'sentinel' })

function IntroLayout(props) {
  const { children, ...propsWithoutChildren } = props
  return (
    <MDXProvider>
      <DocsPage
        {...propsWithoutChildren}
        orderData={orderData}
        frontMatter={frontMatter}
        pageMeta={props.frontMatter}
        category="sentinel/intro"
      >
        <SearchProvider>
          <SearchBar />
          {children}
        </SearchProvider>
      </DocsPage>
    </MDXProvider>
  )
}

IntroLayout.getInitialProps = getInitialProps

export default IntroLayout
