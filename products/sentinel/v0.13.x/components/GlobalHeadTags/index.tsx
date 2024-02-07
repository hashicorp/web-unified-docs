import { Maybe, Site } from '../../@types/dato'
import Head from 'next/head'

type Props = {
  globalData: {
    _site?: Maybe<Site>
  }
}

export default function GlobalHeadTags({ globalData }: Props) {
  return (
    <Head>
      <title key="title">Sentinel by HashiCorp</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      {/* ref: https://www.phpied.com/minimum-viable-sharing-meta-tags/ */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:site_name"
        content="Sentinel by HashiCorp"
        key="og-name"
      />
      <meta name="twitter:site" content="@HashiCorp" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/HashiCorp/"
      />
      <meta
        name="description"
        property="og:description"
        content="Sentinel is a language and framework for policy built to be embedded in existing software to enable fine-grained, logic-based policy decisions."
        key="description"
      />
      <meta
        property="og:image"
        content="https://www.datocms-assets.com/2885/1508522484-share.jpg"
        key="image"
      />
      {globalData._site.faviconMetaTags.map(tag => (
        <link {...tag.attributes} key={tag.attributes.href} />
      ))}
      <link rel="stylesheet" href="/css/nprogress.css"></link>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap"
        rel="stylesheet"
      />
    </Head>
  )
}
