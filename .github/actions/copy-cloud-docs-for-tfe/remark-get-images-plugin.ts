// @ts-nocheck

// stdlib
import * as fs from 'fs'
import * as path from 'path'
import * as assert from 'assert'

// for creating custom remark plugin
import { is } from 'unist-util-is' // Use 4.1.0; 5+ is ESM
import { visit } from 'unist-util-visit'
import type { Node } from 'unist'
import type { Image } from 'mdast'
import type { Plugin } from 'unified'

export const remarkGetImages: Plugin<[string, Set<string>]> = (
  sourceRepoPublicDir,
  imageSrcSet
) => {
  const test = (node: Node): node is Image => {
    return is<Image>(node, 'image')
  }

  return function (tree) {
    visit<Image>(tree, test, (node) => {
      const src = path.join(sourceRepoPublicDir, node.url)
      assert.ok(fs.existsSync(src), '[getImagesPlugin] image not found: ' + src)
      imageSrcSet.add(src)
    })
  }
}
