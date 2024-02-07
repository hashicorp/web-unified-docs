import DocsPage from '@hashicorp/react-docs-page'
import Head from 'next/head'
import Link from 'next/link'

function DocsLayoutWrapper(pageMeta) {
  function DocsLayout(props) {
    return (
      <DocsPage
        {...props}
        product="packer"
        head={{
          is: Head,
          title: `${pageMeta.page_title} | Packer by HashiCorp`,
          description: pageMeta.description,
          siteName: 'Packer by HashiCorp',
        }}
        sidenav={{
          Link,
          category: 'docs',
          currentPage: props.path,
          data: [],
          order: [],
          disableFilter: true,
        }}
        resourceURL={`https://github.com/hashicorp/packer/blob/master/website/pages/${pageMeta.__resourcePath}`}
      />
    )
  }

  DocsLayout.getInitialProps = ({ asPath }) => ({ path: asPath })

  return DocsLayout
}

export default DocsLayoutWrapper
