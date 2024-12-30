import {
  transformStripTerraformEnterpriseContent,
  getTfeSemver,
  tryGetVersionSatisfies,
  BEGIN_RE,
  END_RE,
  DIRECTIVE_RE,
} from './strip-terraform-enterprise-content'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Strip terraform enterprise content', () => {
  describe('regular expressions', () => {
    describe('BEGIN_RE', () => {
      it.each([
        // OK inputs
        ['<!-- BEGIN:    TFC:only   -->', { block: 'TFC:only' }],
        ['<!-- BEGIN: TFE>=v202206-1 -->', { block: 'TFE>=v202206-1' }],
        // prettier-ignore
        ['<!-- BEGIN: TFC:only     name:drift-detection -->', { block: 'TFC:only     name:drift-detection' }],
        // Malformatted inputs
        ['<!--BEGIN: TFE>=v202206-1 -->', undefined],
        ['<!--BEGIN: TFE>=v202206-1-->', undefined],
      ])('given `%s`\n\tshould return groups: `%o`', (input, expected) => {
        const groups = input.match(BEGIN_RE)?.groups
        expect(groups).toEqual(expected)
      })
    })
  
    describe('END_RE', () => {
      it.each([
        // OK inputs
        ['<!-- END:    TFC:only   -->', { block: 'TFC:only' }],
        ['<!-- END: TFE>=v202206-1 -->', { block: 'TFE>=v202206-1' }],
        // prettier-ignore
        ['<!-- END: TFC:only     name:drift-detection -->', { block: 'TFC:only     name:drift-detection' }],
        // Malformatted inputs
        ['<!--END: TFE>=v202206-1 -->', undefined],
        ['<!--END: TFE>=v202206-1-->', undefined],
      ])('given `%s`\n\tshould return groups: `%o`', (input, expected) => {
        const groups = input.match(END_RE)?.groups
        expect(groups).toEqual(expected)
      })
    })
  
    describe('DIRECTIVE_RE', () => {
      it.each([
        // prettier-ignore
        ['TFE:>v202207-1', { comparator: '>', product: 'TFE', version: "202207-1" }],
        // prettier-ignore
        ['TFE:>=v202207-1', { comparator: '>=', product: 'TFE', version: "202207-1" }],
        // prettier-ignore
        ['TFE:>=202207-1', undefined],
        ['TFC:only', { comparator: 'only', product: 'TFC', version: undefined }],
        // prettier-ignore
        ['TFC:only     name:drift-detection', {comparator: "only", product: "TFC", version: undefined}],
      ])(
        'given a block `%s`\n\tshould return groups: `%o`',
        (block, expected) => {
          // This is copying the internals of `tryGetVersionSatisfies`
          // which gives a more accurate representation of when this
          // regular expression is actually used.
          const [flag] = block.split(/\s+/)
          const groups = flag.match(DIRECTIVE_RE)?.groups
  
          expect(groups).toEqual(expected)
        }
      )
    })
  })
  
  describe('transformStripTerraformEnterpriseContent', () => {
    let transformContext
  
    beforeEach(() => {  
      transformContext = {
        cwd: process.cwd(),
        websiteDir: 'website',
        contentDir: 'docs',
        partialsDir: '',
        version: 'v202207-1',
        basePaths: ['enterprise', 'cloud-docs'],
        docSet: ['enterprise'],
        productSlug: 'terraform',
      }
    })
  
    describe('with properly formatted comments', () => {
      it('strips terraform enterprise content', async () => {
        transformContext.version = 'v202001-1'
        const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFC:only -->
  
  foo
  
  <!-- END: TFC:only -->
  
  <!-- BEGIN: TFE:>=v202205-1 name:foo -->
  
  foo
  
  <!-- END: TFE:>=v202205-1 name:foo -->
  
  <!-- BEGIN: TFE:>v202205-1 -->
  
  foo
  
  <!-- END: TFE:>v202205-1 -->`
  
        const result = await transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )

        expect(result).to.not.include('foo')
      })
  
      it('allows leading and trailing whitespace', async () => {
        transformContext.version = 'v202001-1'
        const markdownSource = `# Heading
  
           <!-- BEGIN: TFE:>v202205-1 -->      
  foo
  
  <!-- END: TFE:>v202205-1 -->`
  
        const result = await transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
  
        expect(result).toMatchInlineSnapshot(`
  "# Heading
  "
  `)
      })
  
      it('should not strip content when the TFE version satisfies the directive', async () => {
        const markdownSource = `# Heading
  
  <!-- BEGIN: TFE:>v202201-1 -->
  
  should not be removed
  
  <!-- END: TFE:>v202201-1 -->
  
  <!-- BEGIN: TFE:>v900000-2 -->
  
  should be stripped
  
  <!-- END: TFE:>v900000-2 -->`
  
        const result = await transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
  
        expect(result).toMatchInlineSnapshot(`
  "# Heading
  
  <!-- BEGIN: TFE:>v202201-1 -->
  
  should not be removed
  
  <!-- END: TFE:>v202201-1 -->
  "
  `)
      })
    })
  
    it('should error on invalid product name', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFT:>=v202205-1 -->
  
  foo
  
  <!-- END: TFT:>=v202205-1 -->
  `
  
      expect(
        transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] Directive could not be parsed"`
      )
    })
    it('should error on mismatching block names', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFE>=v202205-1 -->
  
  foo
  
  <!-- END: TFE:>=v202205-1 -->
  `
  
      expect(
        transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] Mismatched block names"`
      )
    })
  
    it('should error on invalid TFC directive', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFC:>=v202205-1 -->
  
  foo
  
  <!-- END: TFC:>=v202205-1 -->
  `
  
      expect(
        transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] TFC only supports [only] comparator"`
      )
    })
  
    it('should error on invalid TFE directive', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFE:>=202205-1 -->
  
  foo
  
  <!-- END: TFE:>=202205-1 -->
  `
  
      expect(
        transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] Directive could not be parsed"`
      )
    })
  
    it('should error on block nesting', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN: TFC:only -->
  <!-- BEGIN: TFE:>=v202205-1 -->
  
  foo
  
  <!-- END: TFE:>=v202205-1 -->
  <!-- END: TFC:only -->
  `
  
      expect(
        transformStripTerraformEnterpriseContent.transformer(
          markdownSource,
          transformContext
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] Unexpected BEGIN block: line 6"`
      )
    })
  
    it('should allow comments with inconsistent whitespace', async () => {
      transformContext.version = 'v202001-1'
      const markdownSource = `# Heading
  
  Some Text
  
  <!-- BEGIN:  TFC:only name:drift-detection -->
  
  Hide me 
  
  <!-- END:         TFC:only name:drift-detection -->
  `
  
      await transformStripTerraformEnterpriseContent.transformer(
        markdownSource,
        transformContext
      )
  
      expect(markdownSource).toMatchInlineSnapshot(`
  "# Heading
  
  Some Text
  
  "
  `)
    })
  })
  
  describe('tryGetVersionSatisfies', () => {
    it('should return true if version satisfies the block', () => {
      const version = 'v202205-1'
      const block = 'TFE:>=v202205-1'
  
      const satistfies = tryGetVersionSatisfies(version, block)
  
      expect(satistfies).toBe(true)
    })
  
    it('should return false if version does not satisfy the block', () => {
      const version = 'v202005-1'
      const block = 'TFE:>=v202205-1'
  
      const satistfies = tryGetVersionSatisfies(version, block)
  
      expect(satistfies).toBe(false)
    })
  
    it('should throw if a invalid block is used', () => {
      const version = 'v202205-1'
      const block = 'TFE:foobar'
  
      expect(() =>
        {return tryGetVersionSatisfies(version, block)}
      ).toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] Directive could not be parsed"`
      )
    })
  
    it('should throw if a invalid TFC block is used', () => {
      const version = 'v202205-1'
      const block = 'TFC:>=v202205-1'
  
      expect(() =>
        {return tryGetVersionSatisfies(version, block)}
      ).toThrowErrorMatchingInlineSnapshot(
        `"[strip-terraform-enterprise-content] TFC only supports [only] comparator"`
      )
    })
  })
  
  describe('getTfeSemver', () => {
    it.each([
      ['v202207-1', { version: '2022.7.1' }],
      ['v202205', { version: '2022.5.0' }],
      // We may not encounter this case, but leaving this here to document inputs/outputs
      ['0', new Error('Invalid Version: 0.NaN.0')],
    ])('given %s should contain %o', (version, expected) => {
      if (expected instanceof Error) {
        expect(() => {return getTfeSemver(version)}).toThrow(expected.message)
      } else {
        expect(getTfeSemver(version)).toEqual(expect.objectContaining(expected))
      }
    })
  })
  
})
