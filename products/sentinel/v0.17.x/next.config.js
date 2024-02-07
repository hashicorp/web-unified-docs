const withHashicorp = require('@hashicorp/nextjs-scripts')
const redirects = require('./redirects.next')

module.exports = withHashicorp()({
  svgo: { plugins: [{ removeViewBox: false }] },
  redirects: () => redirects,
  env: {
    HASHI_ENV: process.env.HASHI_ENV || 'development',
    SEGMENT_WRITE_KEY: 'X4VJ1pUW2yM3NLldLbHF6337lbDLTQ5h',
    BUGSNAG_CLIENT_KEY: '07ff2d76ce27aded8833bf4804b73350',
    BUGSNAG_SERVER_KEY: 'fb2dc40bb48b17140628754eac6c1b11',
  },
})
