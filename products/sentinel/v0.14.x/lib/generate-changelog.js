const fs = require('fs')
const path = require('path')

// -------------------------------------------------------------------------------
// This script generates a changelog page automatically from the actual changelog.
// In the process, it strips out a couple issue markers from the changelog.
// -------------------------------------------------------------------------------

const logPath = path.join(__dirname, '../../CHANGELOG.md')
const pagePath = path.join(__dirname, '../pages/sentinel/changelog/index.mdx')

const logContent = fs
  .readFileSync(logPath, 'utf8')
  .replace(/\[GH-[0-9]+\]/gm, '')
  .replace(
    /\(\[#[0-9]+\]\(https:\/\/github.com\/hashicorp\/sentinel\/issues\/[0-9]+\)\)/gm,
    ''
  )

const pageContent = fs
  .readFileSync(pagePath, 'utf8')
  .replace(
    /<!-- BEGIN GENERATED CONTENT -->([^]*)<!-- END GENERATED CONTENT -->/,
    `<!-- BEGIN GENERATED CONTENT -->\n${logContent}\n<!-- END GENERATED CONTENT -->`
  )

fs.writeFileSync(pagePath, pageContent)

console.log('changelog generated!')
