import s from './style.module.css'
import ProductDownloader from '@hashicorp/react-product-downloader'
import Head from 'next/head'
import VERSION from '../../../data/version'

export default function DownloadsPage(props) {
  return (
    <div className={s.root}>
      <Head>
        <title key="title">Downloads | Sentinel by HashiCorp</title>
      </Head>
      <ProductDownloader
        product="Sentinel"
        version={VERSION}
        changelog="/sentinel/changelog"
        community="https://discuss.hashicorp.com/c/sentinel/"
        learnLink="https://learn.hashicorp.com/terraform?track=sentinel#operations-and-development"
        releaseData={props.releaseData}
      />
    </div>
  )
}

export async function getStaticProps() {
  return fetch(`https://releases.hashicorp.com/sentinel/${VERSION}/index.json`)
    .then((r) => r.json())
    .then((releaseData) => ({ props: { releaseData } }))
    .catch(() => {
      throw new Error(
        `--------------------------------------------------------
        Unable to resolve version ${VERSION} on releases.hashicorp.com from link
        <https://releases.hashicorp.com/sentinel/${VERSION}/index.json>. Usually this
        means that the specified version has not yet been released. The downloads page
        version can only be updated after the new version has been released, to ensure
        that it works for all users.
        ----------------------------------------------------------`
      )
    })
}
