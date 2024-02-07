const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp({
  mdx: { defaultLayout: true },
  transpileModules: ['@hashicorp/react-mega-nav']
})({
  exportTrailingSlash: true,
  experimental: { css: true, modern: true }
})
