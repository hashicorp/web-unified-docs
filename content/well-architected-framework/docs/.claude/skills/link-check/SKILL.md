---
name: link-check
description: Validate internal and external links in WAF documentation. Checks internal paths exist, tests external URLs, and detects stale domains.
argument-hint: <file-paths|pillar-path> [--external] [--internal-only] [--fix]
---

# Link Check Skill

Validates that links in documentation actually resolve. Complements `check-resources` (which validates formatting) by testing whether link targets exist.

## Arguments

- **file-paths**: One or more `.mdx` files, or a directory to scan recursively
- **--external** / **-e**: Also test external URLs with HTTP HEAD requests (slower)
- **--internal-only** / **-i**: Skip external URLs entirely (fast, default)
- **--fix** / **-f**: Auto-fix known domain migrations and simple path issues
- **--report-only** / **-r**: Report without changes (default)

## Checks

### 1. Internal link targets exist [AUTO-FIX: Partial]

For every internal link (`[text](/path)` or `[text](./relative-path)`):

1. Resolve the path relative to the repository content root: `content/well-architected-framework/`
2. Check if the target `.mdx` file exists on disk
3. If the link includes an anchor (`#section-name`), verify the heading exists in the target file
4. Report missing targets with line numbers

**Auto-fix:** When a file was moved and a redirect exists in `redirects.jsonc`, update the link to point to the new path.

**How to resolve the content root:**
- Repository root: find the nearest parent directory containing `.git/`
- WAF content root: `{repo-root}/content/well-architected-framework/`
- Internal links starting with `/well-architected-framework/` resolve from the WAF content root
- Relative links (`./`, `../`) resolve from the current file's directory

### 2. Stale domain detection [AUTO-FIX]

Flag and auto-fix known domain migrations:

| Old domain | New domain |
|---|---|
| `learn.hashicorp.com` | `developer.hashicorp.com` |
| `www.terraform.io/docs` | `developer.hashicorp.com/terraform` |
| `www.vaultproject.io/docs` | `developer.hashicorp.com/vault` |
| `www.consul.io/docs` | `developer.hashicorp.com/consul` |
| `www.nomadproject.io/docs` | `developer.hashicorp.com/nomad` |
| `www.packerproject.io/docs` | `developer.hashicorp.com/packer` |
| `www.boundaryproject.io/docs` | `developer.hashicorp.com/boundary` |

### 3. External URL validation [MANUAL] (requires `--external`)

For every external URL (`https://...`):

1. Send an HTTP HEAD request using `curl -sI -o /dev/null -w "%{http_code}" --max-time 10`
2. Categorize results:
   - **200**: ✅ OK
   - **301/302**: ⚠️ Redirect — report the final destination URL
   - **403**: ⚠️ Forbidden — may require authentication, flag for manual review
   - **404**: ❌ Broken — report with line number
   - **Timeout**: ⚠️ Slow — report with line number
3. Rate-limit: max 5 requests per second to avoid being blocked
4. Skip known false-positive domains that block HEAD requests (GitHub raw content, some CDNs)

### 4. Duplicate link detection [REPORT]

Flag when the same URL appears more than 3 times in a single document — may indicate copy-paste or content that should be consolidated.

### 5. Link format validation [REPORT]

Flag common formatting issues:
- Bare URLs not wrapped in markdown link syntax
- Empty link targets: `[text]()`
- Link targets with spaces (should be URL-encoded or use hyphens)
- HTTP links that should be HTTPS

## Output Format

```
## Link Check Report: <filename>

### Internal links
✅ 12 valid | ❌ 2 broken | ⚠️ 1 redirect

Line 45: ❌ BROKEN — [secrets rotation](/well-architected-framework/secure/secrets-rotation)
  → File not found. Did you mean: /well-architected-framework/secure-systems/secrets/rotation

Line 89: ⚠️ REDIRECT — [Terraform docs](https://www.terraform.io/docs/cli)
  → Auto-fixable: developer.hashicorp.com/terraform/cli

### External links (if --external)
✅ 8 valid | ❌ 1 broken | ⚠️ 2 redirects

Line 112: ❌ 404 — https://docs.aws.amazon.com/old-page
Line 156: ⚠️ 301 → https://docs.aws.amazon.com/new-page
```

## Execution Steps

1. Parse all markdown links from the target file(s) using regex: `\[([^\]]*)\]\(([^)]+)\)`
2. Separate internal links (start with `/` or `./` or `../`) from external links (start with `http`)
3. For internal links: resolve paths and check file existence using the view or glob tools
4. For stale domains: pattern-match against the domain migration table
5. For external links (if `--external`): use bash with curl to HEAD each URL
6. Aggregate results and report with line numbers
7. If `--fix`: apply auto-fixable changes using the edit tool
