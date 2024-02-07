const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp({
  mdx: { defaultLayout: true },
  transpileModules: ['@hashicorp/react-.*'],
})({
  svgo: { plugins: [{ removeViewBox: false }] },
  experimental: { modern: true },
  env: {
    HASHI_ENV: process.env.HASHI_ENV || 'development',
    SEGMENT_WRITE_KEY: 'X4VJ1pUW2yM3NLldLbHF6337lbDLTQ5h',
    BUGSNAG_CLIENT_KEY: '07ff2d76ce27aded8833bf4804b73350',
    BUGSNAG_SERVER_KEY: 'fb2dc40bb48b17140628754eac6c1b11',
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/sentinel',
        permanent: true,
      },
    ]
  },
})
