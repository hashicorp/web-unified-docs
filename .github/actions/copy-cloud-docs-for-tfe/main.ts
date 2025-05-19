// stdlib
import * as fs from 'fs'
import * as path from 'path'

// fs traversal
import walk from 'klaw-sync'

// initial processing
import matter from 'gray-matter'

// mdx processing
import remark from 'remark'

// @ts-expect-error - remark-mdx@1.6.22 has no types
import remarkMdx from 'remark-mdx'

import { logger } from '~shared/logger'

// plugins
import { remarkGetImages } from './remark-get-images-plugin'
import { remarkTransformCloudDocsLinks } from './remark-transfrom-cloud-docs-links'

const imageSrcSet = new Set<string>()

// List of MDX files to exclude from being copied
const IGNORE_LIST = ['cloud-docs/index.mdx']

export const IGNORE_PATTERNS: RegExp[] = [/cloud-docs\/agents/i]
const SUB_PATH_MAPPINGS: {
  source: string
  target: string
}[] = [
  {
    source: 'cloud-docs',
    target: 'enterprise',
  },
]

/**
 * This function will copy 3 things
 * - MDX files
 *   - these can be at varying levels of nesting
 * - used images
 *   - these are expected to all be at the same level
 * - nav-data JSON files
 *
 * This function will also prune the target directory
 * of any files that are not in the source directory.
 *
 * @param sourceRepo An absolute path to a GitHub repository on disk
 * @param targetRepo An absolute path to a GitHub repository on disk
 */
export async function main(
  sourceRepo: string,
  targetRepo: string
): Promise<void> {
  const sourceRepoContentDir = path.join(sourceRepo, 'website/docs')
  // this gets prepended to img references like /img/docs/... so that we can resolve the assets on disk
  const sourceRepoPublicDir = path.join(sourceRepo, 'website')

  const targetRepoContentDir = path.join(targetRepo, 'website/docs')
  // this gets prepended to img reference **bases** (aka filename.extension only)
  const targetRepoImageDir = path.join(targetRepo, 'website/img/docs')
  const targetRepoLastSyncFile = path.join(
    targetRepo,
    'website/last-cloud-docs-sync.txt'
  )

  // traverse source docs and accumulate mdx files for a given set of "subPaths"
  let items: ReadonlyArray<walk.Item> = []

  for (const { source: subPath } of SUB_PATH_MAPPINGS) {
    const src = path.join(sourceRepoContentDir, subPath)
    const docItems = walk(src, {
      nodir: true,
      filter: filterFunc,
    })
    items = items.concat(docItems)
  }

  // process each mdx file
  for (const item of items) {
    // ignore some files
    if (IGNORE_LIST.some((ignore) => item.path.endsWith(ignore))) {
      continue
    }

    // extract mdx content; ignore frontmatter
    const fullContent = fs.readFileSync(item.path, 'utf8')

    // eslint-disable-next-line prefer-const
    let { content, data } = matter(fullContent)

    data = transformObject(data, [
      // inject `source` frontmatter property
      function injectSource(d) {
        d.source = path.basename(sourceRepo)
        return d
      },
      // replace cloud instances with enterprise
      function replaceCloudWithEnterprise(d) {
        // Some docs do not have all frontmatter properties. Make sure
        // we do not assign `undefined` (which is invalid) in YAML
        if (d.page_title) {
          d.page_title = d.page_title.replace(
            'Terraform Cloud',
            'Terraform Enterprise'
          )
          d.page_title = d.page_title.replace(
            'HCP Terraform',
            'Terraform Enterprise'
          )
        }

        if (d.description) {
          d.description = d.description.replace(
            'Terraform Cloud',
            'Terraform Enterprise'
          )
          d.description = d.description.replace(
            'HCP Terraform',
            'Terraform Enterprise'
          )
        }
        return d
      },
    ])

    const vfile = await remark()
      .use(remarkMdx)
      .use(remarkGetImages, sourceRepoPublicDir, imageSrcSet)
      .use(remarkTransformCloudDocsLinks) // transforms link
      .process(content)

    // replace \-> with ->
    const stringOutput = vfile.toString().replaceAll('\\->', '->')

    // overwrite original file with transformed content
    const contents = matter.stringify('\n' + stringOutput, data)
    fs.writeFileSync(item.path, contents)
  }

  // keep track of the files that were copied in the target repo
  const copiedTargetRepoRelativePaths: string[] = []

  // Copy an entire directory
  // ---------------------------------------------
  //     /{source}/cloud-docs/dir/some-doc.mdx
  //          ↓        ↓      ↓    ↓
  //     /{target}/enterprise/dir/some-docs.mdx
  // ---------------------------------------------
  for (const { source, target } of SUB_PATH_MAPPINGS) {
    const src = path.join(sourceRepoContentDir, source)
    const dest = path.join(targetRepoContentDir, target)

    const items = walk(src, {
      nodir: true,
      filter: filterFunc,
    })

    for (const item of items) {
      // ignore some files
      if (IGNORE_LIST.some((ignore) => item.path.endsWith(ignore))) {
        continue
      }

      const destAbsolutePath = item.path.replace(src, dest)
      fs.mkdirSync(path.dirname(destAbsolutePath), { recursive: true })
      fs.copyFileSync(item.path, destAbsolutePath)

      // accumulate copied files
      const relativePath = path.relative(targetRepo, destAbsolutePath)
      copiedTargetRepoRelativePaths.push(relativePath)
    }
  }

  // Copy images
  for (const src of Array.from(imageSrcSet)) {
    const basename = path.basename(src)
    const target = path.join(targetRepoImageDir, basename)

    fs.mkdirSync(targetRepoImageDir, { recursive: true })
    fs.copyFileSync(src, target)

    // accumulate copied files
    const relativePath = path.relative(targetRepo, target)
    copiedTargetRepoRelativePaths.push(relativePath)
  }

  // Read or Create and Read `last-cloud-docs-sync.txt`
  if (!fs.existsSync(targetRepoLastSyncFile)) {
    logger.info('Creating `${targetRepoLastSyncFile}`')
    fs.writeFileSync(targetRepoLastSyncFile, '', 'utf8')
  }

  logger.info('Reading `${targetRepoLastSyncFile}`')
  // Any filename that is in this list, that was not just sync'd is considered stale; Prune.
  // Then save over `last-cloud-docs-sync.txt`
  const lastSync = fs
    .readFileSync(targetRepoLastSyncFile)
    .toString()
    .split('\n')
    // filter empty strings; This is encountered when creating
    // the last-cloud-docs-sync.txt file for the first time.
    .filter(Boolean)

  // prune files and empty directories
  lastSync
    .filter((relativePath) => {
      return !copiedTargetRepoRelativePaths.includes(relativePath)
    })
    .forEach((relativePath) => {
      const file = path.join(targetRepo, relativePath)
      // set force to true to ignore errors;
      // This happens when a file is deleted from the source repo.
      logger.info(`Deleting stale file: ${file}...`)
      fs.rmSync(file, { force: true })
      logger.info(`Deleted stale file: ${file}`)

      recursiveRmEmptyParentDirs(file)
    })

  // clear file
  logger.info('Clearing `${targetRepoLastSyncFile}`')
  fs.truncateSync(targetRepoLastSyncFile, 0)

  const stream = fs.createWriteStream(targetRepoLastSyncFile, { flags: 'a' })
  for (const item of copiedTargetRepoRelativePaths) {
    stream.write(`${item}\n`)
  }

  // wait for the stream to end
  return new Promise((resolve) => {
    stream.end(resolve)
  })
}

// This is a helper for pruning empty dirs for tests;
// Git ignores empty dirs entirely but an in-memory filesystem doesn't.
const recursiveRmEmptyParentDirs = (file: string) => {
  logger.info(`Deleting empty parent dirs for ${file}...`)
  const dir = path.dirname(file)

  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    if (files.length === 0) {
      // @ts-expect-error force is there but not typed correctly
      fs.rmdirSync(dir, { force: true, recursive: true })
      logger.info(`Deleted empty parent dirs for ${file}`)

      recursiveRmEmptyParentDirs(path.dirname(dir))
    }
  }
}

/**
 * This is a helper to be passed to `walk` dry up repeated logic
 * for ignore certain files.
 */
const filterFunc = (item: walk.Item) => {
  // if the item matches a IGNORE_PATTERNS expression, exclude it
  if (IGNORE_PATTERNS.some((pattern) => pattern.test(item.path))) {
    return false
  }

  // Check files for `tfc_only` frontmatter property; Ignore them if true
  if (item.stats.isFile()) {
    const fullContent = fs.readFileSync(item.path, 'utf8')
    const { data } = matter(fullContent)
    if (data.tfc_only == true) {
      return false
    }
  }

  return true
}

/**
 * A helper that accepts a data object and an array of functions that
 * receive the object as an arg and transform it.
 */
const transformObject = <T = Record<string, any>>(
  data: T,
  plugins: Array<(data: T) => T>
): T => {
  let result = data

  plugins.forEach((fn) => {
    result = fn(result)
  })

  return result
}
