# Forward-Port Workflow

When a versioned docs PR is merged, the forward-port workflow automatically opens a new PR that copies the changed files from the source version directory into the next version directory. For example: a change in `content/terraform/v1.14.x/` gets copied into `content/terraform/v1.15.x/`.

---

## Trigger modes

### Automatic (PR merge)

The workflow fires automatically when a PR targeting `main` is merged and carries a `forward-port:<slug>` label.

### Manual (workflow_dispatch)

A human can trigger the workflow from the GitHub Actions UI. Go to **Actions → Forward Port PR → Run workflow**. You must supply:

- **prNumber** — the number of the already-merged PR to forward-port
- **labelSlug** OR **overrideJson** (not both — see [Manual dispatch inputs](#manual-dispatch-inputs))

---

## How to use it (automatic path)

1. **Add a `forward-port:<slug>` label** to your PR before merging it.
   - The slug must match a key in [`.github/forward-port-config.yml`](../../.github/forward-port-config.yml) — OR — you post a `/forward-port` comment on the PR (see [Comment fallback](#comment-fallback-scenario-b)).
   - Examples: `forward-port:vault-unique-label`, `forward-port:tf-forward-porting-testing`

2. **Merge your PR.** The workflow starts automatically.

3. **A forward-port PR is opened** against the configured target branch, titled `[FORWARD-PORT] #<N> <your PR title>`. You are assigned as the author and a comment is posted on your original PR with a link.

4. **Review and merge the forward-port PR** like any other PR.

> **One label at a time.** Exactly one `forward-port:*` label must be on the PR when it is merged. If you need to forward-port the same PR to multiple targets, remove the completed label and re-run the workflow manually (via `workflow_dispatch`) for the next target. The PR comment history records each run.

---

## Routing config (`forward-port-config.yml`)

`.github/forward-port-config.yml` maps slug keys to routing fields:

```yaml
vault-unique-label:
  sourceVersionFolder: v1.19.x
  targetProduct: vault
  targetBranch: vault-rc-branch
  targetVersionFolder: v1.20.x
```

| Field | Description |
|---|---|
| `sourceVersionFolder` | The version directory the source PR changes live in (e.g. `v1.19.x`) |
| `targetProduct` | Must exactly match the `content/` directory name — lowercase, hyphenated (e.g. `vault`, `terraform-enterprise`, `hcp-docs`) |
| `targetBranch` | The branch the forward-port PR will be opened against |
| `targetVersionFolder` | The version directory to copy files into (e.g. `v1.20.x`) |

All four fields are required. To add a new forward-port route, add an entry to this file and get it merged into `main` before merging your content PR — the workflow reads the config from `main` at run time, not from your branch.

> **Important:** The workflow always reads the config from `main` (not from your PR branch). Your config change must be merged into `main` before the workflow will see it. If you merge your content PR before the config entry lands in `main`, the workflow will fail to find the slug.

---

## Comment fallback (Scenario B)

For unreleased or sensitive content where you don't want the routing publicly visible in the config file, you can post a comment on your PR instead. This is only available for the automatic PR-merge trigger — not `workflow_dispatch`.

**Comment format** (post this on the PR before merging):

```
/forward-port forward-port:<slug>
sourceVersionFolder: v1.14.x
targetProduct: vault
targetBranch: vault-rc-branch
targetVersionFolder: v1.15.x
```

Rules:
- The first line must be exactly `/forward-port forward-port:<slug>` where `<slug>` matches the `forward-port:*` label on the PR.
- The four routing fields follow on separate lines in `key: value` format.
- If the slug exists in the config, the config wins — the comment is ignored.
- The comment is fetched at workflow run time, so you can post it at any point before the PR is merged.

---

## Manual dispatch inputs

When running via **workflow_dispatch**, provide `prNumber` and exactly one of:

### `labelSlug`

Looks the slug up in `forward-port-config.yml`. No comment fallback — only config entries are supported for manual runs.

```
prNumber: 1234
labelSlug: vault-unique-label
```

### `overrideJson`

Supplies the routing fields directly as a JSON object. Use this when you want to forward-port to an ad-hoc target that isn't in the config.

```
prNumber: 1234
overrideJson: {"sourceVersionFolder":"v1.19.x","targetProduct":"vault","targetBranch":"vault-rc-branch","targetVersionFolder":"v1.20.x"}
```

---

## What files get ported

Only files under `content/<targetProduct>/` are ported. Files from other products in the same PR are automatically excluded. The version segment in each file path is rewritten from `sourceVersionFolder` to `targetVersionFolder`.

- **Added / modified** files are copied from the source version directory to the target version directory.
- **Deleted** files are deleted from the target version directory.
- Partial files are included- however we do not extend these changes to files that the partial will fan out to- that happens separately during the build process. That is useful during incremental builds, but not here. 

If the PR touched no files under the target product's directory, the workflow posts a comment and fails — there is nothing to port, so no forward-port PR is opened.

---

## Errors and edge cases

| Situation | What happens |
|---|---|
| Multiple `forward-port:*` labels on the PR | Workflow fails; error comment posted on the PR. Remove all but one label and re-run. |
| Slug not in config and no `/forward-port` comment | Workflow fails with a message explaining what's missing. |
| `/forward-port` comment first line doesn't match the slug exactly | Workflow fails with a parsing error. |
| Comment is missing a required routing field | Workflow fails listing the missing field. |
| `targetBranch` does not exist in the repo | Workflow fails; error comment posted on the PR. |
| A forward-port PR for this source PR already exists (open) | Workflow exits early and links to the existing PR. |
| No content files changed after filtering by `targetProduct` | Workflow posts a comment and fails — nothing to port, so no PR is opened. |
| `workflow_dispatch` with both `labelSlug` and `overrideJson` set | Workflow fails immediately with a validation error — provide only one. |
| `workflow_dispatch` with neither `labelSlug` nor `overrideJson` set | Workflow fails immediately with a validation error — provide one. |

---

## Finding your slug

Check [`.github/forward-port-config.yml`](../../.github/forward-port-config.yml) for available slugs. If you need a new route (new version release, new product), add an entry to that file and **get it merged into `main` before merging your content PR** — the workflow reads the config from `main` at run time, not from your branch.

---

## Running the tests

### Unit tests

```bash
npx vitest run scripts/forward-port/resolve-target.test.ts
```

### Integration tests

Integration test files are named `*.integration.ts`. Copy to `*.integration.test.ts` to run, then delete the copy when done — do not commit the copy.

```bash
# apply-forward-port-changes
cp scripts/forward-port/apply-forward-port-changes.integration.ts \
   scripts/forward-port/apply-forward-port-changes.integration.test.ts
npx vitest run scripts/forward-port/apply-forward-port-changes.integration.test.ts
rm scripts/forward-port/apply-forward-port-changes.integration.test.ts

# get-changed-content-files
cp scripts/utils/get-changed-content-files-forward-port.integration.ts \
   scripts/utils/get-changed-content-files-forward-port.integration.test.ts
npx vitest run scripts/utils/get-changed-content-files-forward-port.integration.test.ts
rm scripts/utils/get-changed-content-files-forward-port.integration.test.ts

# E2E pipeline
cp scripts/forward-port/forward-port.e2e.integration.ts \
   scripts/forward-port/forward-port.e2e.integration.test.ts
npx vitest run scripts/forward-port/forward-port.e2e.integration.test.ts
rm scripts/forward-port/forward-port.e2e.integration.test.ts
```



