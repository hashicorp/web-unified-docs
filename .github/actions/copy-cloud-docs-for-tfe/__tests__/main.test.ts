import * as path from 'path'
import * as fs from 'fs'
import fse from 'fs-extra'
import tree from 'tree-node-cli'

import { main } from '../main'

describe('copy-cloud-docs-for-tfe', () => {
  const fixtureDir = './__fixtures__'

  const sourceTemplatePath = path.join(__dirname, fixtureDir, 'source-template')
  const targetTemplatePath = path.join(__dirname, fixtureDir, 'target-template')

  const sourcePath = path.join(__dirname, fixtureDir, 'terraform-docs-common')
  const targetPath = path.join(__dirname, fixtureDir, 'ptfe-releases')

  beforeEach(() => {
    // simulate cloning of our two repos
    fse.copySync(sourceTemplatePath, sourcePath)
    fse.copySync(targetTemplatePath, targetPath)
  })

  afterEach(() => {
    // clean up cloned files
    fs.rmSync(path.join(sourcePath), { recursive: true })
    fs.rmSync(path.join(targetPath), { recursive: true })
  })

  it('copies /cloud-docs to /enterprise', async () => {
    // static file paths
    const pathToTargetImgDir = path.join(targetPath, 'website/img/docs')
    const pathToTargetDocsDir = path.join(targetPath, 'website/docs/enterprise')
    const pathToTargetLogFile = path.join(
      targetPath,
      'website/last-cloud-docs-sync.txt'
    )

    // before
    expect(tree(pathToTargetImgDir)).toMatchInlineSnapshot(`
      "docs
      └── _favicon.ico"
    `)

    expect(tree(pathToTargetDocsDir)).toMatchInlineSnapshot(`
      "enterprise
      ├── do-not-remove.mdx
      ├── index.mdx
      ├── stale-cloud-docs
      │   └── index.mdx
      └── tfc_only.mdx"
    `)

    expect(fs.readFileSync(pathToTargetLogFile, 'utf-8'))
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/stale-cloud-docs/index.mdx
      website/img/docs/_favicon.ico
      website/docs/enterprise/tfc_only.mdx"
    `)

    // run our action
    await main(sourcePath, targetPath)

    // after
    expect(tree(pathToTargetImgDir)).toMatchInlineSnapshot(`"docs"`)
    expect(tree(pathToTargetDocsDir)).toMatchInlineSnapshot(`
      "enterprise
      ├── api-docs
      │   └── index.mdx
      ├── do-not-remove.mdx
      ├── index.mdx
      └── registry
          └── index.mdx"
    `)
    expect(fs.readFileSync(pathToTargetLogFile, 'utf-8'))
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/api-docs/index.mdx
      website/docs/enterprise/registry/index.mdx
      "
    `)
  })

  it('removes previously copied files that have since received `tfc_only: true`', async () => {
    // static file paths
    const pathToTfcOnlyFile = path.join(
      targetPath,
      'website/docs/enterprise/tfc_only.mdx'
    )
    const pathToTargetLogFile = path.join(
      targetPath,
      'website/last-cloud-docs-sync.txt'
    )
    // before
    expect(fs.existsSync(pathToTfcOnlyFile)).toBe(true)
    expect(fs.readFileSync(pathToTargetLogFile, 'utf-8'))
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/stale-cloud-docs/index.mdx
      website/img/docs/_favicon.ico
      website/docs/enterprise/tfc_only.mdx"
    `)

    // run our action
    await main(sourcePath, targetPath)

    // after
    expect(fs.existsSync(pathToTfcOnlyFile)).toBe(false)
    expect(fs.readFileSync(pathToTargetLogFile, 'utf-8'))
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/api-docs/index.mdx
      website/docs/enterprise/registry/index.mdx
      "
    `)
  })

  it('does not remove previously existing docs', async () => {
    // static file paths
    const pathToFile = path.join(
      targetPath,
      'website/docs/enterprise/index.mdx'
    )

    // before

    // run our action
    await main(sourcePath, targetPath)

    // after
    expect(fs.existsSync(pathToFile)).toBe(true)
  })

  it('prunes stale cloud-docs', async () => {
    // static file paths
    const pathToStaleFile = path.join(
      targetPath,
      'website/docs/enterprise/stale-cloud-docs/index.mdx'
    )
    const pathToTargetDocsDir = path.join(targetPath, 'website/docs/enterprise')
    // before
    expect(tree(pathToTargetDocsDir)).toMatchInlineSnapshot(`
      "enterprise
      ├── do-not-remove.mdx
      ├── index.mdx
      ├── stale-cloud-docs
      │   └── index.mdx
      └── tfc_only.mdx"
    `)
    expect(fs.existsSync(pathToStaleFile)).toBe(true)

    // run our action
    await main(sourcePath, targetPath)

    // after
    expect(tree(pathToTargetDocsDir)).toMatchInlineSnapshot(`
      "enterprise
      ├── api-docs
      │   └── index.mdx
      ├── do-not-remove.mdx
      ├── index.mdx
      └── registry
          └── index.mdx"
    `)
    expect(fs.existsSync(pathToStaleFile)).toBe(false)
  })

  it('updates `last-cloud-docs-sync.txt`', async () => {
    const cloudDocsFilesPath = path.join(
      targetPath,
      'website/last-cloud-docs-sync.txt'
    )

    // Before
    expect(fs.readFileSync(cloudDocsFilesPath).toString())
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/stale-cloud-docs/index.mdx
      website/img/docs/_favicon.ico
      website/docs/enterprise/tfc_only.mdx"
    `)

    await main(sourcePath, targetPath)

    // After
    expect(fs.readFileSync(cloudDocsFilesPath).toString())
      .toMatchInlineSnapshot(`
      "website/docs/enterprise/api-docs/index.mdx
      website/docs/enterprise/registry/index.mdx
      "
    `)
  })

  // note: This is an integration test w/ a local remark plugin
  it('transforms /cloud-docs links to /enterprise', async () => {
    await main(sourcePath, targetPath)

    expect(
      String(
        fs.readFileSync(
          path.join(targetPath, 'website/docs/enterprise/api-docs/index.mdx')
        )
      )
    ).toMatchInlineSnapshot(`
      "---
      page_title: API Docs - Terraform Enterprise
      description: >-
        Use the API to manage runs, workspaces, policies, and more. This introduction
        includes authentication, features, and formatting.
      source: terraform-docs-common
      ---

      [link to transform]: /terraform/enterprise/api-docs

      [agents link do not transform]: /cloud-docs/agents

      [agents link2 do not transform]: /cloud-docs/agents/nested-path

      [agents link3 do not transform]: /terraform/cloud-docs/agents

      [json api document]: /enterprise/api-docs#json-api-documents

      [json api error object]: https://jsonapi.org/format/#error-objects
      "
    `)
  })

  // note: This is dependent on the hardcoded `IGNORE_LIST` in `copy-cloud-docs-for-tfe`
  it('should ignore files in the IGNORE_LIST', async () => {
    const beforeFileContents = fs.readFileSync(
      path.join(targetPath, 'website/docs/enterprise/index.mdx'),
      'utf-8'
    )

    await main(sourcePath, targetPath)

    const afterFileContents = fs.readFileSync(
      path.join(targetPath, 'website/docs/enterprise/index.mdx'),
      'utf-8'
    )

    // assert that cloud-docs/index.mdx doesn't overwrite enterprise/index.mdx
    expect(beforeFileContents).toEqual(afterFileContents)

    // snapshot for observability
    expect(afterFileContents).toMatchInlineSnapshot(`
      "---
      page_title: Index
      description: Index
      ---

      This filename is shared between \`cloud-docs/index.mdx\` and \`enterprise/index.mdx\`.

      This is a special case where we want to ignore the \`cloud-docs\` file.

      See \`IGNORE_LIST\` for more details.
      "
    `)
  })

  it('should transform "Cloud" to "Enterprise" in frontmatter', async () => {
    await main(sourcePath, targetPath)

    const afterFileContents = fs.readFileSync(
      path.join(targetPath, 'website/docs/enterprise/api-docs/index.mdx'),
      'utf-8'
    )

    // Assert that the new file contains `Terraform Enterprise` in the frontmatter
    expect(afterFileContents).toEqual(
      expect.stringContaining(`---
page_title: API Docs - Terraform Enterprise`)
    )
  })

  it('copies over alerts correctly', async () => {
    await main(sourcePath, targetPath)

    const contentsWithAlert = fs
      .readFileSync(
        path.join(targetPath, 'website/docs/enterprise/registry/index.mdx')
      )
      .toString()
    expect(contentsWithAlert).toMatchInlineSnapshot(`
      "---
      page_title: Private Registry - Terraform Enterprise
      description: >-
        Use the Terraform Enterprise private registry to share Terraform providers and
        modules across your organization.
      source: terraform-docs-common
      ---

      # Private Registry

      -> **Note:** I am an info alert
      => **Note:** I am a success alert
      ~> **Note:** I am a warning alert
      !> **Note:** I am a warning alert
      "
    `)
  })

  it('should not copy over cloud-docs-nav-data.json', async () => {
    // run our action
    await main(sourcePath, targetPath)

    const enterpriseDataDir = path.join(targetPath, 'website/data')
    // after
    expect(tree(enterpriseDataDir)).toMatchInlineSnapshot(`
      "data
      └── enterprise-nav-data.json"
    `)
  })
})
