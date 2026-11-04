/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { vol } from 'memfs'
import { getFilesUsingPartial } from './get-files-using-partial.mjs'

vi.mock('fs')
vi.mock('fs/promises')

const VAULT_V1_21_BASE = 'content/vault/v1.21.x/content'

const PARTIALS = {
	['content/vault/global/partials/alerts/compliance-letters.mdx']:
		'# Compliance Letters partial',
	['content/global/partials/namespaced-global.mdx']:
		'# namespaced global partial',
	[`${VAULT_V1_21_BASE}/partials/alerts/alpha.mdx`]: '# Alpha partial',
	[`${VAULT_V1_21_BASE}/partials/alerts/beta.mdx`]: '# Beta partial',
	[`${VAULT_V1_21_BASE}/partials/gamma.mdx`]: '# Gamma partial',
	[`${VAULT_V1_21_BASE}/partials/cli/agent/args/delta.mdx`]: '# Delta partial',
}

const FILES_USING_ALPHA_PARTIAL = {
	[`${VAULT_V1_21_BASE}/docs/commands/operator/import.mdx`]: `---
title: operator import
---

@include "alerts/alpha.mdx"

Some content here.
`,
}

const FILES_USING_BETA_PARTIAL = {
	[`${VAULT_V1_21_BASE}/docs/import/index.mdx`]: `---
title: Import
---

@include 'alerts/beta.mdx'

Some content here.
`,
	[`${VAULT_V1_21_BASE}/docs/mcp-server/overview.mdx`]: `---
title: MCP Server Overview
---

@include "alerts/beta.mdx"

Some content here.
`,
	[`${VAULT_V1_21_BASE}/docs/mcp-server/prompt-model.mdx`]: `---
title: MCP Server Prompt Model
---

@include 'alerts/beta.mdx'

Some content here.
`,
	[`${VAULT_V1_21_BASE}/docs/sync/github.mdx`]: `---
title: Sync GitHub
---

@include "alerts/beta.mdx"

Some content here.
`,
}

const FILES_USING_LEGACY_GLOBAL_PARTIAL = {
	'content/vault/v1.10.x/content/docs/enterprise/entropy-augmentation.mdx': `---
title: Entropy Augmentation
---

@include '../../../global/partials/alerts/compliance-letters.mdx'

Some content here.
`,
	'content/vault/v1.6.x/content/docs/enterprise/entropy-augmentation/index.mdx': `---
title: Entropy Augmentation
---

@include '../../../global/partials/alerts/compliance-letters.mdx'

Some content here.
`,
}

const FILES_USING_GAMMA_AND_DELTA_PARTIALS = {
	[`${VAULT_V1_21_BASE}/docs/commands/operator/export.mdx`]: `---
title: operator export
---

@include "gamma.mdx"
@include 'cli/agent/args/delta.mdx'

Some content here.
`,
}

const FILES_USING_NAMESPACED_GLOBAL_PARTIAL = {
	[`${VAULT_V1_21_BASE}/docs/namespaced-global/index.mdx`]: `---
title: Namespaced Global Partial
---

@include "@global/namespaced-global.mdx"

Some content here.
`,
}

const UNRELATED_FILES = {
	[`${VAULT_V1_21_BASE}/docs/overview.mdx`]: `---
title: Overview
---

No partials here.
`,
	[`${VAULT_V1_21_BASE}/docs/get-started/index.mdx`]: `---
title: Get Started
---

Some unrelated content.
`,
}

beforeEach(() => {
	vol.reset()
	vol.fromJSON(
		{
			...PARTIALS,
			...FILES_USING_ALPHA_PARTIAL,
			...FILES_USING_BETA_PARTIAL,
			...FILES_USING_LEGACY_GLOBAL_PARTIAL,
			...FILES_USING_GAMMA_AND_DELTA_PARTIALS,
			...FILES_USING_NAMESPACED_GLOBAL_PARTIAL,
			...UNRELATED_FILES,
		},
		process.cwd(),
	)
})

describe('getFilesUsingPartial', () => {
	it('returns the single file that uses alpha.mdx', () => {
		const result = getFilesUsingPartial(
			`${VAULT_V1_21_BASE}/partials/alerts/alpha.mdx`,
		)

		expect(result).toStrictEqual([
			`${VAULT_V1_21_BASE}/docs/commands/operator/import.mdx`,
		])
	})

	it('returns all four files that use beta.mdx', () => {
		const result = getFilesUsingPartial(
			`${VAULT_V1_21_BASE}/partials/alerts/beta.mdx`,
		)

		expect(result).toStrictEqual([
			`${VAULT_V1_21_BASE}/docs/import/index.mdx`,
			`${VAULT_V1_21_BASE}/docs/mcp-server/overview.mdx`,
			`${VAULT_V1_21_BASE}/docs/mcp-server/prompt-model.mdx`,
			`${VAULT_V1_21_BASE}/docs/sync/github.mdx`,
		])
	})

	it('returns files that use the legacy global compliance-letters.mdx partial', () => {
		const result = getFilesUsingPartial(
			'content/vault/global/partials/alerts/compliance-letters.mdx',
		)

		expect(result).toStrictEqual([
			'content/vault/v1.10.x/content/docs/enterprise/entropy-augmentation.mdx',
			'content/vault/v1.6.x/content/docs/enterprise/entropy-augmentation/index.mdx',
		])
	})

	it('returns files that use both gamma.mdx and delta.mdx', () => {
		const resultGamma = getFilesUsingPartial(
			`${VAULT_V1_21_BASE}/partials/gamma.mdx`,
		)
		const resultDelta = getFilesUsingPartial(
			`${VAULT_V1_21_BASE}/partials/cli/agent/args/delta.mdx`,
		)

		expect(resultGamma).toStrictEqual([
			`${VAULT_V1_21_BASE}/docs/commands/operator/export.mdx`,
		])
		expect(resultDelta).toStrictEqual([
			`${VAULT_V1_21_BASE}/docs/commands/operator/export.mdx`,
		])
	})

	it('returns files that use the namespaced global partial', () => {
		const result = getFilesUsingPartial(
			'content/global/partials/namespaced-global.mdx',
		)

		expect(result).toStrictEqual([
			`${VAULT_V1_21_BASE}/docs/namespaced-global/index.mdx`,
		])
	})

	it('returns an empty array if no files use the specified partial', () => {
		const result = getFilesUsingPartial(
			`${VAULT_V1_21_BASE}/partials/alerts/nonexistent.mdx`,
		)

		expect(result).toStrictEqual([])
	})
})
