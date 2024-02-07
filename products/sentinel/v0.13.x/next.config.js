const withHashicorp = require('@hashicorp/nextjs-scripts')
const path = require('path')

module.exports = withHashicorp({
  mdx: { defaultLayout: true },
  css: {
    presetEnvOptions: {
      features: { 'custom-properties': { preserve: true } }
    }
  }
})({
  exportTrailingSlash: true,
  webpack(config) {
    // Add yaml loader
    config.module.rules.push({
      test: /\.yml$/,
      use: [
        { loader: path.join(__dirname, 'node_modules/json-loader') },
        { loader: path.join(__dirname, 'node_modules/yaml-loader') }
      ]
    })

    return config
  }
})
