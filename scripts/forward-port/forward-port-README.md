# Forward-Port Workflow

When a versioned docs PR is merged, the forward-port workflow automatically opens a new PR that copies the changed files from the source version directory into the next version directory. For example: a change in `content/terraform/v1.14.x/` gets copied into `content/terraform/v1.15.x/`.

---

## Trigger modes

### Automatic (PR merge)

The workflow fires automatically when a PR targeting `main` is merged and carries a `forward-port:<slug>` label.

### Manual (workflow_dispatch)

A human can trigger the workflow from the GitHub Actions UI. Go to **Actions → Forward Port PR → Run workflow**. You must supply:

- **prNumber** — the number of the already-merged PR to forward-port
- **labelSlug** OR **overrideJson** but not both. Refer to [Manual dispatch inputs](#manual-dispatch-inputs).

---

## How to use it (automatic path)

This section is for the tech writers who need to set up and use the forward port feature.

### Create label and configuration

1. Create a forward port label that you will add to relevant PRs before merge to
   `main`. The label must be in this format:
   `forward-port:<unique-label-value>`, where `<unique-label-value>` is unique
   text for your product's forward port process.

   `forward-port:<unique-label-value>` is the same as
   `forward-port:<slug>`. The DevDot engineers use the term `slug`.

1. Update the your product's forward port config entry in the
   `.github/forward-port-config.yml` file. Use your label's
   `<unique-label-value>` as the config entry key.

   Examples:

   | Label           | Config entry key     |
   | --------------- | -------------------- |
   | `forward-port:nomad` | `nomad`  |
   | `forward-port:boundary-1.0` | `boundary-1.0` |

   Config entry examples:

   ```hcl
   boundary-1.0:
     sourceVersionFolder: v0.21.x
     targetProduct: boundary
     targetBranch: main
     targetVersionFolder: v1.0.x

   nomad:
     sourceVersionFolder: v2.0.x
     targetProduct: nomad
     targetBranch: nomad/2.1.0
     targetVersionFolder: v2.1.x
   ```

   Note that the colon (`:`) after the config entry key is YAML syntax, not part of `<unique-label-value>`.

### Forward port a PR

1. **Add your `forward-port:<unique-label-value>` label** to your PR before merging it.
   - The `<unique-label-value>` must match a config entry key in
     [`.github/forward-port-config.yml`](../../.github/forward-port-config.yml)
     — OR — you post a `/forward-port` comment on the PR. Refer to [Comment
     fallback](#comment-fallback-scenario-b).
1. **Merge your PR.** The workflow starts automatically.
1. **A forward-port PR is opened** against the configured target branch, titled `[FORWARD-PORT] #<N> <your-PR-title>`. You are assigned as the author and a comment is posted on your original PR with a link.
1. **Review and merge the forward-port PR** like any other PR.

> **One label at a time.** Exactly one `forward-port:*` label must be on the PR
> when you merge it. If you need to forward-port the same PR to multiple targets, remove
> the completed label and re-run the workflow manually via `workflow_dispatch`
> for the next target. The PR comment history records each run.

### Embargoed content in web-unified-docs-internal

Forward porting only works within a single repository. You cannot forward port
a PR from `web-unified-docs` to `web-unified-docs-internal`.

If your upcoming release content is solely created in
`web-unified-docs-internal`, you should keep track of `web-unified-docs` current
release PRs merged to `main` after the release branch has been created in the
internal repo. You must manually forward port those PRs to the
upcoming release folder after that release has merged to the public repository.

For example:

- The TFE upcoming 2.1 release branch has already been created in
`web-unified-docs-internal`.
- `web-unified-docs` PR 1234 and PR 1235 target the TFE v2.0.x folder.
- You merge PRs 1234 and 1235 to public `main`.

After the 2.1 release docs merge internally and
are synced to the public repo, you can follow the manual process to forward port
each PR:

1. Create a branch to merge to; for example, `aimeeu-tfe-forward`.
1. For each merged PR (1234 and 1235), run the [manual
   process](#manual-dispatch-inputs) with the following JSON input:

   ```json
   {"sourceVersionFolder":"v2.0.x","targetProduct":"terraform-enterprise","targetBranch":"aimeeu-tfe-forward","targetVersionFolder":"v2.1.x"} 
   ```

## Routing config (`forward-port-config.yml`)

`.github/forward-port-config.yml` maps the `<unique-label-value>` part of your label
to routing fields.

Label: `forward-port:<unique-label-value>`

Config:

```yaml
<unique-label-value>:
  sourceVersionFolder:
  targetProduct:
  targetBranch:
  targetVersionFolder:
```

| Field | Description |
|---|---|
| `sourceVersionFolder` | The version directory the source PR changes live in (e.g. `v1.19.x`) |
| `targetProduct` | Must exactly match the `content/` directory name — lowercase, hyphenated (e.g. `vault`, `terraform-enterprise`, `consul`, `nomad` |
| `targetBranch` | The branch the forward-port PR will be opened against. This is usually the upcoming major release branch. |
| `targetVersionFolder` | The version directory to copy files into (e.g. `v1.20.x`) |

All four fields are required. To add a new forward-port route, add an entry to
this file and make sure it is merged into `main` before merging your content PR.
The workflow reads the config from `main` at run time, not from your branch.

The following example is the config for Nomad forward port from the current
v2.0.x release folder to the upcoming v2.1.0 release branch.

Label: `forward-port:nomad-2.1`

```yaml
nomad-2.1:
  sourceVersionFolder: v2.0.x
  targetProduct: nomad
  targetBranch: nomad/2.1.0
  targetVersionFolder: v2.1.x
```

> **Important:** The workflow always reads the config from `main`, not from your
> PR branch. Your config change must be merged into `main` before the workflow
> will see it. If you merge your content PR before the config entry lands in
> `main`, the workflow will fail to find the slug. Then you must manually run
> the forward port process from the GitHub Actions UI.

---

## Comment fallback (Scenario B)

For unreleased or sensitive content where you don't want the routing publicly
visible in the config file, you can post a comment on your PR instead. This is
only available for the automatic PR-merge trigger, not `workflow_dispatch`.

**Comment format** (post this on the PR before merging):

```
/forward-port forward-port:<unique-label-value>
sourceVersionFolder: v1.14.x
targetProduct: vault
targetBranch: vault-rc-branch
targetVersionFolder: v1.15.x
```

Rules:

- The first line must be exactly `/forward-port forward-port:<unique-label-value>` where `<unique-label-value>` matches the `forward-port:*` label on the PR.
- The four routing fields follow on separate lines in `key: value` format.
- If the unique-label-value exists in the config, the config wins and the comment is ignored.
- The comment is fetched at workflow run time, so you can post it at any point before the PR is merged.

---

## Manual dispatch inputs

When running via **workflow_dispatch**, provide `prNumber` and `labelSlug` or
`overrideJson`.

### `labelSlug`

Note: `labelSlug` is the `<unique-label-value>`, which is also the config entry
key for your forward port entry in `.github/forward-port-config.yml`.

Looks the slug up in `forward-port-config.yml`. No comment fallback. Only config entries are supported for manual runs.


```
prNumber: 1234
labelSlug: boundary-1.0
```

### `overrideJson`

Supplies the routing fields directly as a JSON object. Use this when you want to forward-port to an ad-hoc target that isn't in the config.

```
prNumber: 1234
overrideJson: {"sourceVersionFolder":"v1.19.x","targetProduct":"vault","targetBranch":"vault-rc-branch","targetVersionFolder":"v1.20.x"}
```

> The `targetProduct` value must exactly match the `content/` directory name —
> lowercase, hyphenated (e.g. `vault`, `terraform-enterprise`, `hcp-docs`).
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

Check [`.github/forward-port-config.yml`](../../.github/forward-port-config.yml)
for available slugs. If you need a new route (new version release, new product),
add an entry to that file and **get it merged into `main` before merging your
content PR**. The workflow reads the config from `main` at run time, not from
your branch.

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
