import DocsSidenav from '@hashicorp/react-docs-sidenav'
import Content from '@hashicorp/react-content'
import Link from 'next/link'
import Head from 'next/head'

function stripTrailingBackslash(path) {
  return path.replace(/\/$/, '')
}

export default function DocsPage({
  children,
  path,
  orderData,
  frontMatter,
  pageMeta,
  category,
}) {
  return (
    <div id="p-docs">
      <Head>
        <title key="title">{pageMeta.page_title} | Sentinel by HashiCorp</title>
        {pageMeta.description && (
          <meta
            name="description"
            property="og:description"
            content={pageMeta.description}
            key="description"
          />
        )}
      </Head>
      <div className="content-wrap g-container">
        <div id="sidebar" role="complementary">
          <div className="nav docs-nav">
            <DocsSidenav
              Link={Link}
              category={category}
              currentPage={stripTrailingBackslash(path)}
              data={frontMatter}
              disableFilter={true}
              order={orderData}
            />
          </div>
        </div>

        <div id="inner" role="main">
          <Content product="sentinel" content={children} />
        </div>
      </div>
    </div>
  )
}

export async function getInitialProps({ asPath }) {
  return { path: asPath }
}
