# CI/CD Secrets — Document Health Dashboard

**Folder:** `docs/secure-systems/secure-applications/ci-cd-secrets`
**Files analyzed:** 11 | **Date:** 2026-03-24

---

## Summary Scores

| File | Structure | Content | Style | Links | Overall |
|------|-----------|---------|-------|-------|---------|
| `index.mdx` | 6 | 6 | 8 | 8 | **7.0** |
| `dynamic-and-static-secrets.mdx` | 8 | 7 | 7 | 9 | **7.7** |
| `github-actions.mdx` | 8 | 7 | 7 | 9 | **7.7** |
| `gitlab.mdx` | 8 | 7 | 6 | 8 | **7.3** |
| `jenkins.mdx` | 3 | 4 | 4 | 5 | **4.0** |
| `circle-ci.mdx` | 8 | 8 | 8 | 8 | **8.0** |
| `teamcity.mdx` | 9 | 8 | 8 | 8 | **8.3** |
| `azure-devops.mdx` | 8 | 8 | 7 | 9 | **8.0** |
| `bitbucket.mdx` | 8 | 8 | 8 | 8 | **8.0** |
| `argo-cd.mdx` | 6 | 6 | 8 | 6 | **6.5** |
| `terraform.mdx` | 8 | 7 | 7 | 9 | **7.7** |

---

## Critical Issues

### `jenkins.mdx` — Overall 4.0 (needs full rewrite)

- **No `## HashiCorp resources` section** — resources are embedded as `### External resources` fragments scattered throughout the doc
- **Two separate `### External resources` blocks** inside the body content (lines 62 and 133), breaking document structure
- **No "Why integrate Jenkins with Vault" section** — uses `## Use a best practice approach` instead, with no challenge-based framing
- **Description too short:** 82 chars — minimum is 150 (`"Learn how to integrate Jenkins with HashiCorp Vault for secure secrets management."`)
- **Word count ~400–500 words** — well below the 700 minimum; missing: Prerequisites, Choose an integration approach, Best practices sections
- **Informal language:** Line 39 — "Here are some example code snippets..."

---

## Moderate Issues (across multiple files)

### Missing `## HashiCorp resources` on `index.mdx`

The index has no resources section at all — the document ends with "Next steps." Per AGENTS.md, the required end-order is: `## HashiCorp resources` → `### External resources` (optional) → `## Next steps`.

### Description length violations

| File | Chars | Issue |
|------|-------|-------|
| `gitlab.mdx` | ~193 | Over 160 limit |
| `terraform.mdx` | ~170 | Over 160 limit |
| `circle-ci.mdx` | ~148 | Slightly under 150 |
| `teamcity.mdx` | ~163 | Slightly over 160 |

### Missing "the following" before numbered lists (4 files)

These files introduce a numbered integration pattern list with a colon but no `the following`:

- `github-actions.mdx` line 50: `"...for use in deployment steps:"` — missing "the following"
- `gitlab.mdx` line 48: `"GitLab authenticates to Vault using JWT tokens..."` — missing "the following"
- `bitbucket.mdx` line 34: `"Bitbucket Pipelines authenticates to Vault..."` — missing "the following"
- `azure-devops.mdx` line 55: `"follow these security practices:"` — "these" does not satisfy the rule

### Word count out of range

| File | Estimated | Status |
|------|-----------|--------|
| `terraform.mdx` | ~1,800+ | Over 1,500 |
| `github-actions.mdx` | ~1,700+ | Over 1,500 |
| `dynamic-and-static-secrets.mdx` | ~1,400 | High end |

### Missing "the following" before lists in `dynamic-and-static-secrets.mdx`

- Line 43: `**Benefits:**` introduces a bullet list with no `the following` intro
- Line 61: `**Considerations:**` — same issue

---

## Minor Issues

### `argo-cd.mdx` — No code examples

This is an integration doc but contains zero code examples. Other platform docs all include at least one YAML/HCL example. Both personas benefit from seeing a concrete Vault Secrets Operator CRD or `VaultStaticSecret` example.

### `argo-cd.mdx` — Absolute URLs for internal links (lines 91–93)

The External resources section duplicates links from the HashiCorp resources section but uses `https://developer.hashicorp.com/...` absolute URLs instead of relative paths, for docs already correctly linked with relative paths in the section above. These three entries are duplicates and should be removed entirely:

```
Line 91: https://developer.hashicorp.com/vault/tutorials/kubernetes-introduction/vault-secrets-operator
Line 92: https://developer.hashicorp.com/vault/docs/platform/k8s/vso
Line 93: https://developer.hashicorp.com/vault/docs/platform/k8s/comparisons
```

### `index.mdx` — Word count ~500–600 words

Slightly below the 700 target. The document could add 1–2 more sentences per challenge in the "Why" section or expand the security best practices.

### Intro paragraph depth

Most platform pages have a single-sentence intro paragraph. AGENTS.md recommends 2–3 paragraphs before the "Why" section. Most files have 1 paragraph only.

---

## Priority Fix Order

1. **`jenkins.mdx`** — Full structural rewrite to match modern pattern
2. **`index.mdx`** — Add `## HashiCorp resources` section
3. **Description lengths** — Fix `gitlab.mdx` (193 → ≤160) and `terraform.mdx` (170 → ≤160)
4. **"the following"** — Add to 4 files before numbered integration pattern lists
5. **`argo-cd.mdx`** — Add at least one code example; remove 3 duplicate absolute-URL links
6. **Word count** — Consider trimming `terraform.mdx` and `github-actions.mdx`

---

## Recommended Skills

```bash
# Jenkins needs full rewrite to match pattern
/review-doc docs/secure-systems/secure-applications/ci-cd-secrets/jenkins.mdx

# Fix descriptions and metadata
/seo-optimize docs/secure-systems/secure-applications/ci-cd-secrets/gitlab.mdx
/seo-optimize docs/secure-systems/secure-applications/ci-cd-secrets/terraform.mdx

# Quick style checks on the "the following" pattern
/quick-styleguide docs/secure-systems/secure-applications/ci-cd-secrets/github-actions.mdx --fix
/quick-styleguide docs/secure-systems/secure-applications/ci-cd-secrets/bitbucket.mdx --fix
```
