import fetch from 'isomorphic-unfetch'
import ProductDownloader from '@hashicorp/react-product-downloader'
import Head from 'next/head'
import VERSION from '../../../data/version'

export default function DownloadsPage({ downloadData }) {
  return (
    <div id="p-downloads" className="g-container">
      <Head>
        <title key="title">Downloads | Sentinel by HashiCorp</title>
      </Head>
      <ProductDownloader
        product="Sentinel"
        version={VERSION}
        changelog="/sentinel/changelog"
        downloads={downloadData}
      />
    </div>
  )
}

export async function unstable_getStaticProps() {
  const res = await fetch(
    `https://releases.hashicorp.com/sentinel/${VERSION}/index.json`
  )
  const json = await res.json()

  const downloadData = json.builds.reduce((acc, build) => {
    if (!acc[build.os]) acc[build.os] = {}
    acc[build.os][build.arch] = build.url
    return acc
  }, {})

  return { props: { downloadData } }
}
