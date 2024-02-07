import Head from 'next/head'
import Link from 'next/link'
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'
import DocsPage from '@hashicorp/react-docs-page'
import { SearchProvider } from '@hashicorp/react-search'
import SearchBar from '../components/search-bar'
import { frontMatter as data } from '../pages/intro/**/*.mdx'
import order from '../data/intro-navigation.js'

const MDXProvider = createMdxProvider({ product: 'vagrant' })

function IntroLayoutWrapper(pageMeta) {
  function IntroLayout(props) {
    const { children, ...propsWithoutChildren } = props
    return (
      <MDXProvider>
        <DocsPage
          {...propsWithoutChildren}
          product="vagrant"
          head={{
            is: Head,
            title: `${pageMeta.page_title} | Vagrant by HashiCorp`,
            description: pageMeta.description,
            siteName: 'Vagrant by HashiCorp',
          }}
          sidenav={{
            Link,
            category: 'intro',
            currentPage: props.path,
            data,
            disableFilter: true,
            order,
          }}
          resourceURL={`https://github.com/hashicorp/vagrant/blob/main/website/pages/${pageMeta.__resourcePath}`}
        >
          <SearchProvider>
            <SearchBar />
            {children}
          </SearchProvider>
        </DocsPage>
      </MDXProvider>
    )
  }

  IntroLayout.getInitialProps = ({ asPath }) => ({ path: asPath })

  return IntroLayout
}

export default IntroLayoutWrapper
