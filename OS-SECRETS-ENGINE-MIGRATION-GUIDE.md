# OS Secrets Engine: External Plugin → Builtin Migration Guide

Internal step-by-step reference for migrating a `vault-plugin-secrets-os` mount from an
externally-registered plugin to the builtin `os` secrets engine in `vault-enterprise`.

This supplements (does not replace) the customer-facing docs in `web-unified-docs`:
- `content/vault/v2.x/content/docs/secrets/os.mdx`
- `content/vault/v2.x/content/api-docs/secret/os.mdx`

It goes deeper on *why* each step is necessary, with pointers into the actual source so anyone
verifying this (QA, reviewers, support) can check the claims directly.

Sources referenced (verified on branch `VAULT-49571/builtin-support-for-vault-plugin-secrets-os`,
commit `b0ba406777`, i.e. PR [#20690](https://github.com/hashicorp/vault-enterprise/pull/20690)):
- `~/Desktop/vault-new/vault-enterprise`
- `~/Desktop/vault-new/vault-plugin-secrets-os`

Status of PR #20690 when this was written: **open, not merged**, base `main`, no backport labels.
Re-verify line references after merge.

---

## 1. What actually changed (PR #20690, Jira VAULT-49571)

- Two constants now exist in `helper/pluginconsts/plugin_consts.go` (~lines 68-73):
  - `SecretEngineOS = "vault-plugin-secrets-os"` — the **external** plugin name (unchanged value;
    census and billing already recognized it).
  - `SecretEngineOSBuiltin = "os"` — the new **builtin** short name.
- The factory (`ossecrets.Factory`) is registered under `SecretEngineOSBuiltin` in:
  - `helper/builtinplugins/registry_util_full_ent.go:29` (builtin registry)
  - `command/server/commands_full_ent.go:31` (`handlers.logicalBackends`)
- License callback added in `vault/mount_util_full_ent.go:45` (see section 4).
- Census/billing: `vault/census_metric_mounts.go:459` —
  `case pluginconsts.SecretEngineOS, pluginconsts.SecretEngineOSBuiltin:` — both names feed the same
  `OSLocalAccountRoles` counter (see section 4).
- `scripts/gen_openapi.sh` now enables `os` so OpenAPI generation covers it.
- Changelog fragment `changelog/_20690.txt` (`release-note:feature`): *"OS Secrets Engine
  (enterprise): The OS local account secrets engine now ships as a builtin enterprise secrets engine
  and can be mounted directly with `vault secrets enable os`... Mounts of the builtin engine and of
  the external `vault-plugin-secrets-os` plugin are counted together for census and billing."*
- Backend behavior, stored data format, and the HTTP API are unchanged — only how Vault *loads* the
  backend changes (in-process builtin factory vs. subprocess plugin over the plugin catalog).

> **Superseded:** earlier drafts of this guide cited PR #18437 and said
> `SecretEngineOS = "os"`. Neither is correct for the current work. (`changelog/18437.txt` in the
> repo is an unrelated `vault verify-sign` fragment.)

### Which release ships it

- `version/VERSION` on both `main` and the PR branch is `2.3.0-beta1`.
- `CHANGELOG.md`'s latest released entry is `2.2.1` (Oct 22, 2026).
- `origin/release/2.2.x+ent` does **not** import `ossecrets` in `registry_util_full_ent.go`, and the
  PR has no backport label.
- Conclusion: the builtin ships starting in **Vault Enterprise 2.3.0**, not 2.2.0. Public docs were
  updated to say 2.3.0. Confirm against final release notes (beta can still shift, and a backport to
  2.2.x would change this).

## 2. Existing external mounts are unaffected by upgrading

The builtin uses a *different name* (`os`) from the external plugin (`vault-plugin-secrets-os`).
The PR description states this explicitly, and it's covered by
`TestOSSecretsEngine_ExternalRegistrationCoexistsWithBuiltin`
(`vault/external_tests/ossecrets/ossecrets_builtin_ent_test.go`):

- `vault-plugin-secrets-os` does **not** resolve to a builtin
  (`TestOSSecretsEngine_Builtin`: `GetPlugin` for that name errors, and mounting it without a
  registration fails).
- A customer with an external registration keeps running their registered binary/version.
- A builtin `os` mount and an external `vault-plugin-secrets-os` mount can coexist on one cluster.

So the upgrade itself never forces a migration. Moving to the builtin is optional.

## 3. "Minimal" builds

`helper/builtinplugins` has registry variants selected by Go build tags:

| Build tag | File | OS engine builtin? |
|---|---|---|
| `enterprise && !minimal` | `registry_util_full_ent.go` | **Yes** |
| `enterprise && minimal` | `registry_util_min_ent.go` | **No** — empty registry |
| (open source) | n/a | No — enterprise-only |

`registry_util_min_ent.go` returns an empty registry (`newEntRegistry` returns `&registry{}`,
`entAddExtPlugins` is a no-op). The PR's new tests are tagged `enterprise && !minimal`.

**Implication:** a `minimal` Enterprise build never gets the builtin `os` engine, regardless of
version. For those installs the external plugin is the permanent supported path. Do not tell such a
customer to "upgrade and cut over."

> Not verified here: what exactly a "minimal" build means commercially (SKU). The build-tag behavior
> is verified; the SKU mapping is an assumption — confirm with the release/packaging team.

## 4. License gate and census/billing

### License gate

`vault/mount_util_full_ent.go`:

```go
case *ossecrets.OSBackend:
    c.logger.Trace("adding OS secrets engine license callback")
    b.HasLicense = func() bool {
        // Interim gate: there is no dedicated OS secrets engine feature
        return c.Features() != entlicense.FeatureNone
    }
```

This is a **general check**: any valid Enterprise license enables the engine. There is no
`FeatureOSSecretsEngine`. The PR description lists this as a security/PCI note and says a
feature-specific check should replace it once one exists. Word customer guidance as "requires a
valid Vault Enterprise license," not "requires an OS secrets engine entitlement." Without a valid
license, every request to the mount fails with `no enterprise license found`.

### Census and billing

- Builtin (`os`) and external (`vault-plugin-secrets-os`) mounts are summed into the single
  `OSLocalAccountRoles` counter; no new billing key is introduced.
- Each mount keeps its own `MountType` in billing attribution (`os` vs `vault-plugin-secrets-os`).
- Tests: `TestCoreMetrics_OSLocalAccounts_BuiltinAndExternalNames` (`vault/core_metrics_ent_test.go`)
  and `TestOSSecretsEngine_BuiltinAndExternalNamesBilledTogether`.
- Third-party plugin billing: the external registration (registered with a SHA256) is still counted
  as a third-party plugin; the builtin is not
  (`TestOSSecretsEngine_ExternalRegistrationCoexistsWithBuiltin`, expects count `1`).
- Practical effect: migrating a mount from external to builtin does not change how its local
  accounts are counted for the OS counter, but it **does** remove that mount from the third-party
  plugin count.

## 5. Plugin catalog precedence (why the cutover steps work)

`vault/plugincatalog/plugin_catalog.go`:

- `List()` (~line 1441): *"External plugins with the same name as a builtin override the builtin."*
- (~line 1535): *"Unversioned plugins fully replace builtins of the same name."*
- `get()` (~line 1021) checks for an external registration first and only falls through to
  `c.builtinRegistry.Get(name, pluginType)` (~line 1087) if none exists for that exact name/version.

Therefore a mount registered under the exact name `os` keeps running the external subprocess after
upgrading to a release with the builtin, until the catalog entry is explicitly removed
(`vault plugin deregister`).

---

## 6. Step-by-step guide, by case

### Case A — Mount type is already `os`, full (non-minimal) Enterprise build

Applies if `vault secrets list -detailed` shows `Type: os` for the mount (i.e. the external plugin
was registered *as* `os`).

1. Confirm the target build has the builtin:
   ```shell
   $ vault plugin list -detailed secret | grep " os "
   ```
   Look for `Builtin = true` and a version with the `+builtin` suffix. If absent, you're either on
   < 2.3.0 or on a minimal build — go to Case C or D.
2. Take a full storage snapshot:
   ```shell
   $ vault operator raft snapshot save pre-migration.snap
   ```
   (or the equivalent for your storage backend).
3. Record the current catalog entry for re-registration:
   ```shell
   $ vault plugin list -detailed secret
   $ vault read sys/plugins/catalog/secret/os
   ```
4. Remove any version pin:
   ```shell
   $ vault plugin version-pin remove secret os
   ```
5. Deregister the external plugin (removes only the catalog entry; the running subprocess keeps
   serving until the next step):
   ```shell
   $ vault plugin deregister secret os
   ```
6. Force re-resolution so the mount falls through to the builtin:
   ```shell
   $ vault plugin reload -plugin=os -type=secret
   ```
   Repeat on any node that doesn't pick this up (e.g. performance standbys).
7. Verify: `vault secrets list -detailed` shows the builtin version, and no `os` /
   `vault-plugin-secrets-os` subprocess remains for the mount on any node.

### Case B — Mount type is `vault-plugin-secrets-os` (or any other non-`os` name)

A mount's plugin type cannot be changed in place; the catalog only falls back to a builtin for an
exact, unregistered name. This is a migration to a **new mount**, not a cutover, and it is
**optional** — the existing mount keeps working (section 2). Plan a maintenance window.

1. Enable a new mount with the builtin:
   ```shell
   $ vault secrets enable -path=os-new os
   ```
2. Recreate each host under the new mount with the same connection details / host key config.
3. Recreate each account, reusing the **current known password** (read from the old mount's
   `/creds`) to avoid an extra rotation on the target host:
   ```shell
   $ vault read os/hosts/<host>/accounts/<account>/creds
   $ vault write os-new/hosts/<host>/accounts/<account> \
       username="<username>" \
       password="<password read above>"
   ```
4. Update policies, Terraform config, and automation referencing the old mount path.
5. Once the new mount is healthy, offboard per the public doc, then disable the old mount.

> **Never** "fix" a name mismatch by disabling the old mount and re-enabling: `vault secrets
> disable` permanently deletes all host/account data under it. Recovery requires the snapshot.

### Case C — `minimal` Enterprise build

1. Confirm it's a minimal build.
2. **Do not attempt cutover.** The registry is empty on these builds regardless of version.
3. Keep running `vault-plugin-secrets-os` as an external plugin; it's the supported long-term path.
4. Wanting the builtin means switching to a full build — a licensing/packaging conversation.

### Case D — Release without the builtin (< 2.3.0), full build

1. Continue as an external plugin:
   ```shell
   $ vault plugin register -download -version="0.1.0+ent" secret vault-plugin-secrets-os
   $ vault secrets enable -path=os vault-plugin-secrets-os
   ```
2. If upgrading soon and you want a no-migration path later, you may register and mount under the
   name `os` now, so the mount qualifies for Case A later. Otherwise it stays on Case B (or stays
   external indefinitely).
3. After upgrading to 2.3.0+, confirm `Builtin = true` for `os` and re-evaluate Case A or B.

---

## 7. Rollback (Case A cutover)

1. Re-register the external plugin using the catalog entry recorded in step 3 (command, SHA256,
   version).
2. Re-apply any version pin removed in step 4.
3. `vault plugin reload -plugin=os -type=secret` — external registrations take precedence (section 5).
4. If data was lost or corrupted, restore the pre-migration snapshot — the only complete rollback
   (captures host/account data, seal-wrapped config, and the mount table).

## 8. Post-migration verification checklist

- [ ] `vault read os/config` succeeds — does **not** return `no enterprise license found`.
- [ ] A known host/account and its current credential version match pre-migration values.
- [ ] A manual rotation on a test account succeeds and increments the version count.
- [ ] Every cluster node (active, standbys, DR secondaries) reports the expected backend; a mixed
      state is expected only transiently during a rolling upgrade.
- [ ] No orphaned `vault-plugin-secrets-os` subprocess remains after an in-place cutover.
- [ ] Census/billing: OS local-account count for the cluster is unchanged after the move.

---

## Open items

- [ ] Confirm **2.3.0** is the final release that ships this once PR #20690 merges and GA'd
      (and that no backport to 2.2.x is planned — that would change the version everywhere).
- [ ] Replace the `<version>+builtin` placeholder in the public doc's sample `plugin list` output
      with the real builtin version once known (the PR pins an unreleased plugin pseudo-version,
      `v0.2.3-0.20261026173856-b34691abdddd`).
- [ ] Confirm whether `vault plugin reload` must be run per node or propagates in a Raft cluster
      (assumed per-node; not verified against test coverage).
- [ ] Confirm "minimal build" ↔ commercial SKU mapping with release/packaging.
- [ ] QA (Nutan Panpalia's team) sign-off on Case A/B steps against a real cluster before
      anything here is made customer-facing.
- [ ] Revisit license wording when a dedicated OS secrets engine license feature replaces the
      interim `c.Features() != entlicense.FeatureNone` check.
