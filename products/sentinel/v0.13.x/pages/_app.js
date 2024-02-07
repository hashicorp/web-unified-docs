import './style.css'
import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import MegaNav from '@hashicorp/react-mega-nav'
import Footer from '@hashicorp/react-footer'
import { ConsentManager } from '@hashicorp/react-consent-manager'
import { fetch } from '@hashicorp/nextjs-scripts/dato/client'
import SubNav from '../components/SubNav'
import GlobalHeadTags from '../components/GlobalHeadTags'
import bugsnagClient from '../lib/bugsnag'
import consentManagerConfig from '../lib/consentManagerConfig'
import Error from './_error'
import globalDataQuery from './globalData.graphql'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)

// Bugsnag
const ErrorBoundary = bugsnagClient.getPlugin('react')

function Website(props) {
  const { Component, pageProps, globalData, path } = props

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <GlobalHeadTags globalData={globalData} />
      <MegaNav
        data={globalData.megaNav}
        title="Sentinel Documentation"
        homeUrl="https://www.hashicorp.com"
        titleUrl="https://docs.hashicorp.com/sentinel"
      />
      <SubNav path={path} />
      <Component {...pageProps} />
      <Footer data={globalData.globalFooter} />
      <ConsentManager {...consentManagerConfig} />
    </ErrorBoundary>
  )
}

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    } else if (Component.isMDXComponent) {
      // fix for https://github.com/mdx-js/mdx/issues/382
      const mdxLayoutComponent = Component({}).props.originalType
      if (mdxLayoutComponent.getInitialProps) {
        pageProps = await mdxLayoutComponent.getInitialProps(ctx)
      }
    }

    const globalData = await fetch({
      query: globalDataQuery,
      dependencies: [MegaNav]
    })

    return { pageProps, globalData, path: ctx.asPath }
  }

  render() {
    return <Website {...this.props} />
  }
}

export default NextApp
