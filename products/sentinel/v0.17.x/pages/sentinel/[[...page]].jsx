import { productName, productSlug } from 'data/metadata'
import order from 'data/docs-navigation.js'
import DocsPage from '@hashicorp/react-docs-page'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@hashicorp/react-docs-page/server'

const subpath = 'sentinel'

export default function DocsLayout(props) {
  return (
    <DocsPage
      product={{ name: productName, slug: productSlug }}
      subpath={subpath}
      order={order}
      showEditPage={false}
      staticProps={props}
    />
  )
}

export async function getStaticPaths() {
  // remove "intro" paths since we cover these in a separate layout
  // this type of nesting is an antipattern which is why it is an exception here
  // rather than built into the API
  return generateStaticPaths(subpath).then((r) => {
    r.paths = r.paths.filter((o) => o.params.page[0] !== 'intro')
    return r
  })
}

export async function getStaticProps({ params }) {
  return generateStaticProps({
    subpath,
    productName,
    params,
  })
}
