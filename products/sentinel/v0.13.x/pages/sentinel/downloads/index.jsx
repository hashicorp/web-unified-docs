import './style.css'
import fetch from 'isomorphic-unfetch'
import ProductDownloader from '@hashicorp/react-product-downloader'
import Head from 'next/head'

const VERSION = '0.13.0'

export default function DownloadsPage({ downloadData }) {
  return (
    <div id="p-downloads" className="g-container">
      <Head>
        <title key="title">Downloads | Sentinel by HashiCorp</title>
      </Head>
      <ProductDownloader
        product="Sentinel"
        version={VERSION}
        downloads={downloadData}
      />
    </div>
  )
}

DownloadsPage.getInitialProps = async () => {
  const res = await fetch(
    `https://releases.hashicorp.com/sentinel/${VERSION}/index.json`
  )
  const json = await res.json()

  const downloadData = json.builds.reduce((acc, build) => {
    if (!acc[build.os]) acc[build.os] = {}
    acc[build.os][build.arch] = build.url
    return acc
  }, {})

  return { downloadData }
}
