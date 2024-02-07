import { SearchProvider } from '@hashicorp/react-search'
import DocsPage, { getInitialProps } from '../components/docs-page'
import SearchBar from '../components/search-bar'
import orderData from '../data/docs-navigation.js'
import { frontMatter } from '../pages/sentinel/**/*.mdx'
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'

const MDXProvider = createMdxProvider({ product: 'sentinel' })

function DocsLayout(props) {
  const { children, ...propsWithoutChildren } = props
  return (
    <MDXProvider>
      <DocsPage
        {...propsWithoutChildren}
        orderData={orderData}
        frontMatter={frontMatter}
        pageMeta={props.frontMatter}
        category="sentinel"
      >
        <SearchProvider>
          <SearchBar />
          {children}
        </SearchProvider>
      </DocsPage>
    </MDXProvider>
  )
}

DocsLayout.getInitialProps = getInitialProps

export default DocsLayout
