# Quick Preview Development Mode

## Overview

Quick Preview is a **development mode and CI/CD optimization** for the backend API that dramatically reduces build times by only processing changed files.

**Primary Use Cases:**
- **Local Development:** Test the site without running full prebuild (~95% faster)
- **PR Previews:** Deploy preview builds in ~5 minutes instead of ~17 minutes
- **Validation:** Validate changes in CI/CD by building only what changed

**Status:** ✅ **PRODUCTION READY** - Currently deployed and working in PR previews

**Architecture Note:** This is a backend-only feature. The frontend (dev portal) remains completely separate and receives standard API responses with additional metadata indicating preview mode.

---

## Current Implementation Status

### ✅ Phase 1: Infrastructure (COMPLETE)
- Production fallback mechanism
- API route modifications with proxy logic
- Middleware for asset proxying
- Response headers and metadata
- Environment variable gating

### ✅ Phase 2: Change Detection & Selective Build (COMPLETE)
- Git diff-based change detection (staged + unstaged + committed)
- Selective prebuild (processes only changed files)
- Deleted file tracking
- Manifest generation with statistics
- **Performance:** 95-99% time savings on typical PRs

### ✅ Phase 3: GitHub Actions Integration (COMPLETE)
- Automated PR preview workflow (`.github/workflows/pr-preview-quick.yml`)
- Security checks for forked PRs
- Selective prebuild in CI/CD
- **Critical fix:** Prevents duplicate prebuild by temporarily removing npm lifecycle hook
- Vercel deployment with prebuilt artifacts
- PR comments with deployment URLs and statistics

### 🚧 Phase 4: Docker Integration (PENDING)
- Local Docker development support
- Will be added in future iteration

---

## How It Works - Complete Architecture

### The Problem We're Solving

Normally, to run the site locally you need:
1. Full content directory (~1.6GB)
2. Run prebuild (~5 minutes, processes 72,000+ MDX files)
3. All assets and navigation data built locally

This is slow and unnecessary if you only want to test a few pages or validate small changes.

### The Solution

Quick Preview mode changes the behavior:
- **Local content exists?** → Serve it normally
- **Local content missing?** → Fetch it from production backend
- **Everything works** as if all content was built locally

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Request                             │
│                 (e.g., /terraform/docs/intro)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Middleware                          │
│              (middleware.js + quickPreview.js)               │
│                                                              │
│  1. Check: Is QUICK_PREVIEW=true?                           │
│  2. Check: Does public/changedfiles.json exist?             │
│  3. Is this a static asset request?                         │
│     • /assets/*, /_next/static/*, *.png, *.js, etc.        │
│                                                              │
│  IF YES to all:                                             │
│    → Check if file exists in public/                        │
│    → If NOT: Proxy from production backend                  │
│    → Return with X-Content-Source: production               │
│                                                              │
│  IF NO: Pass through to API routes                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Routes                               │
│  /api/content/[product]/doc/[version]/[...path]             │
│  /api/content/[product]/nav-data/[version]/[...section]     │
│  /api/content/[product]/redirects                           │
│  /api/assets/[product]/[version]/[...assetPath]             │
│                                                              │
│  Each route:                                                 │
│  1. Try to read content/asset from local filesystem         │
│  2. IF NOT FOUND:                                           │
│     a. Check if Quick Preview is enabled                    │
│     b. Check if file was deleted in this preview            │
│     c. Fetch from production: PRODUCTION_URL + request.url  │
│     d. Return proxied content with metadata                 │
│                                                              │
│  3. Add to response:                                        │
│     • X-Content-Source: "preview" or "production"           │
│     • meta.quick_preview: { enabled, mode, content_source } │
└─────────────────────────────────────────────────────────────┘
```

---

## Components Breakdown

### 1. Change Detection Script
**File:** `scripts/quick-preview/detect-changes.mjs`

**Purpose:** Detects which files changed via git diff against base branch.

**What it generates:**
```json
{
  "generated": "2025-12-18T20:00:00.000Z",
  "baseBranch": "main",
  "quickPreview": true,
  "mode": "git-diff",
  "stats": {
    "changed": 5,
    "deleted": 1,
    "docs": 3,
    "navData": 2,
    "impactedProducts": 2
  },
  "files": {
    "changed": [
      "content/terraform/v1.14.x/docs/intro.mdx",
      "content/terraform/v1.14.x/docs/commands.mdx",
      "content/vault/v1.18.x/vault-nav-data.json"
    ],
    "deleted": [
      "content/terraform/v1.14.x/docs/old-page.mdx"
    ]
  }
}
```

**Detection logic:**
- Runs `git diff --name-only origin/<base-branch>...HEAD`
- Captures: staged changes, unstaged changes, and committed changes
- Filters for content files (`.mdx`, nav-data, redirects, assets)
- Writes to `public/changedfiles.json`

**Key field:** `quickPreview: true` - This tells all the other components to enable fallback mode.

---

### 2. Selective Prebuild
**File:** `scripts/quick-preview/selective-prebuild.mjs`

**Purpose:** Processes only the files listed in the change manifest, dramatically reducing build time.

**What it does:**
- Reads `public/changedfiles.json` manifest
- Processes only changed MDX files (applies remark transforms)
- Copies only changed nav-data files
- Copies only changed redirect files
- Copies only changed asset files
- Skips all unchanged content (will be served from production)

**Performance:**
- **Full prebuild:** ~17 minutes (72,000+ files)
- **Selective prebuild:** ~5-30 seconds (typically 1-50 files)
- **Time saved:** 95-99%

**How it works:**
- Uses same transform logic as full prebuild (`applyFileMdxTransforms`)
- Maintains compatibility with production build
- Unchanged files served via API route fallback to production

---

### 3. Quick Preview Utilities
**File:** `app/utils/quickPreview.ts`

**Purpose:** Shared helper functions used by all API routes.

**Key functions:**

```typescript
// Reads and caches the manifest
getQuickPreviewManifest(): Promise<Manifest | null>

// Fetches content from production backend
fetchFromProduction(path: string): Promise<Response>

// Checks if a file was deleted in this preview
isFileDeleted(manifest: Manifest, filePath: string): boolean

// Determines if we should try production fallback
shouldFetchFromProduction(manifest: Manifest): boolean
```

**Environment variables:**
- `QUICK_PREVIEW_FALLBACK_URL` - Production backend URL (default: `web-unified-docs-hashicorp.vercel.app`)

---

### 3. Middleware (Asset Proxying)
**File:** `app/middleware/quickPreview.js`

**Purpose:** Intercepts requests for static assets (images, CSS, JS) **before** they reach Next.js routing.

**How it works:**
1. Request comes in for `/assets/terraform/v1.14.x/img/graph.png`
2. Middleware checks: Is Quick Preview enabled?
3. Checks: Does `public/assets/terraform/v1.14.x/img/graph.png` exist?
4. If NO → Fetches from `PRODUCTION_URL/assets/terraform/v1.14.x/img/graph.png`
5. Returns the proxied image with headers

**What it proxies:**
- `/assets/*` - Product assets
- `/_next/static/*` - Next.js built assets
- `*.png`, `*.jpg`, `*.svg`, `*.css`, `*.js` - Any static files

**Integration:**
`middleware.js` (root) composes all middleware:
```javascript
import { quickPreviewMiddleware } from './app/middleware/quickPreview.js'

export async function middleware(request) {
  // 1. Handle existing logic (ptfe-releases rewrite)
  // ...
  
  // 2. Handle Quick Preview
  const response = await quickPreviewMiddleware(request)
  if (response) return response
  
  // 3. Continue to Next.js
  return NextResponse.next()
}
```

---

### 4. API Route Modifications

All content-serving API routes follow the same pattern:

**Files modified:**
- `app/api/content/[productSlug]/doc/[version]/[...docsPath]/route.ts`
- `app/api/content/[productSlug]/nav-data/[version]/[...section]/route.ts`
- `app/api/content/[productSlug]/redirects/route.ts`
- `app/api/assets/[productSlug]/[version]/[...assetPath]/route.ts`

**Pattern applied to each:**
```typescript
export async function GET(request: Request, { params }) {
  // Get quick preview manifest
  const manifest = await getQuickPreviewManifest()
  
  // Try to load content locally
  const localContent = await readLocalFile(...)
  
  if (!localContent) {
    // Check if Quick Preview is enabled
    if (shouldFetchFromProduction(manifest)) {
      // Check if file was deleted
      if (isFileDeleted(manifest, filePath)) {
        return new Response('Deleted', { status: 404 })
      }
      
      // Fetch from production
      const prodResponse = await fetchFromProduction(request.url)
      if (prodResponse.ok) {
        return new Response(prodResponse.body, {
          headers: {
            'X-Content-Source': 'production',
            'X-Preview-Fallback': 'true'
          }
        })
      }
    }
    
    // Not found anywhere
    return new Response('Not found', { status: 404 })
  }
  
  // Found locally - return with header
  return Response.json(localContent, {
    headers: { 'X-Content-Source': 'preview' }
  })
}
```

---

## How Vercel Builds Work (Critical Understanding)

### How Vercel Builds Work (Critical Understanding)

The key challenge was preventing Vercel from running a full prebuild during CI/CD while still creating the proper build output structure.

### The Solution: Temporarily Remove Prebuild Script

Quick Preview workflow (`.github/workflows/pr-preview-quick.yml`):

```yaml
# Step 1: Detect changes
- run: npm run quick-preview:detect

# Step 2: Generate metadata files (required for Next.js build)
- run: node scripts/prebuild/run-prebuild.mjs --only-metadata
  # Generates versionMetadata.json + docsPathsAllVersions.json
  # Takes ~5 seconds

# Step 3: Selective prebuild (only changed files)
- run: npm run quick-preview:build
  # Takes ~30 seconds instead of ~15 minutes

# Step 4: Temporarily remove prebuild script from package.json
- run: jq '.scripts.prebuild_original = .scripts.prebuild | del(.scripts.prebuild)' package.json > package.json.tmp && mv package.json.tmp package.json
  # This prevents npm's automatic lifecycle hook

# Step 5: Build with Vercel CLI
- run: vercel build --target=preview --token=${{ secrets.VERCEL_TOKEN }}
  # Runs "npm run build" which now ONLY runs "next build"
  # Takes ~5 minutes (no prebuild!)
  # Creates .vercel/output/ directory structure

# Step 6: Restore prebuild script
- if: always()
  run: jq '.scripts.prebuild = .scripts.prebuild_original | del(.scripts.prebuild_original)' package.json > package.json.tmp && mv package.json.tmp package.json

# Step 7: Deploy pre-built artifacts
- run: vercel deploy --prebuilt --target=preview --token=${{ secrets.VERCEL_TOKEN }} --archive=tgz
```

**Why this works:**
1. npm has a built-in convention where any script named `prebuild` runs before `build` automatically
2. By temporarily renaming/removing the `prebuild` script, npm can't find it
3. `vercel build` runs `npm run build` → goes straight to `next build`
4. No duplicate prebuild occurs!
5. Total time: ~5.5 minutes instead of ~20 minutes

**Performance:**
- **Full prebuild + build:** ~17 minutes
- **Quick Preview:** ~5.5 minutes  
- **Time saved:** 70%

### Prebuild Binaries

Both workflows use precompiled Bun binaries for faster execution:

**Files:**
- `scripts/prebuild/prebuild-x64-linux-binary.gz` (41MB) - For GitHub Actions
- `scripts/prebuild/prebuild-arm-mac-binary.gz` (25MB) - For Apple Silicon Macs
- `scripts/prebuild/prebuild-arm-linux-binary.gz` (40MB) - For ARM Linux

**Detection script:** `scripts/prebuild/run-prebuild.mjs`
```javascript
// Auto-detects platform and architecture
if (platform === 'linux' && arch === 'x64') {
  // Extract .gz file
  // Make executable (chmod 0o755)
  // Run binary (10x faster than Node.js)
} else {
  // Fallback to Node.js implementation
}
```

**Used by both:**
- `npm run prebuild` - Full prebuild (uses binary)
- `npm run quick-preview:build` - Selective prebuild (uses same binary)

The binaries are committed to the repo and automatically detected - no manual build step needed.

---

## Usage

### Start Quick Preview Mode

```bash
npm run dev:quick-preview
```

**What this does:**
1. Runs `npm run quick-preview:detect` → Generates `public/changedfiles.json` with git diff
2. Runs `npm run quick-preview:build` → Processes only changed files (~5-30 seconds)
3. Starts watch-content in background
4. Sets `QUICK_PREVIEW=true` environment variable
5. Starts Next.js dev server on `http://localhost:8080`

**Result:** Site runs with changed files built locally, unchanged files from production.

---

### Regular Development (Unchanged)

```bash
npm run dev
```

This continues to work exactly as before. Quick Preview is completely isolated.

---

### Configure Production Backend (Optional)

```bash
QUICK_PREVIEW_FALLBACK_URL=https://staging-backend.com npm run dev:quick-preview
```

Changes where missing content is fetched from (useful for testing against staging).

---

## What You'll See

### Terminal Logs

When Quick Preview is active, you'll see:
```
[Quick Preview] Fetching from production: /api/content/terraform/doc/latest/intro
 GET /api/content/terraform/doc/latest/intro 200 in 1284ms
```

This confirms content was proxied from production.

### Response Headers

Check in browser DevTools → Network tab:
- `X-Content-Source: production` - Content from production
- `X-Content-Source: preview` - Content built locally
- `X-Preview-Fallback: true` - Confirms fallback was used

### API Response Metadata

API responses include Quick Preview info:
```json
{
  "meta": {
    "status_code": 200,
    "quick_preview": {
      "enabled": true,
      "mode": "git-diff",
      "content_source": "production"
    }
  },
  "result": { ... }
}
```

Frontend can use this to display UI indicators.

---

## Files Created/Modified

### New Files (All Isolated)
```
scripts/quick-preview/
├── detect-changes.mjs            ← Detects changed files via git diff
├── selective-prebuild.mjs        ← Processes only changed files
├── generate-mock-manifest.mjs    ← (Legacy: for testing without git)
└── validate-setup.mjs             ← Validates installation

app/utils/
└── quickPreview.ts                ← Shared utilities

app/middleware/
└── quickPreview.js                ← Asset proxy logic

docs/quick-preview/
└── README.md                      ← This file
```

### Modified Files (Minimal Changes)
```
package.json                       ← Added dev:quick-preview script
middleware.js                      ← Added 1 import + 1 function call

app/api/content/.../doc/.../route.ts        ← Added fallback logic
app/api/content/.../nav-data/.../route.ts   ← Added fallback logic  
app/api/content/.../redirects/route.ts      ← Added fallback logic
app/api/assets/.../route.ts                 ← Added fallback logic
```

---

## Testing the Infrastructure

### 1. Delete Local Content (Optional)

To fully test the fallback mechanism:
```bash
rm -rf public/content
rm -rf public/assets
```

### 2. Start Quick Preview

```bash
npm run dev:quick-preview
```

### 3. Navigate to Any Page

http://localhost:8080/terraform/docs/intro

### 4. Verify It's Working

**Check terminal logs:**
```
[Quick Preview] Fetching from production: /api/content/terraform/doc/latest/intro
 GET /api/content/terraform/doc/latest/intro 200 in 1284ms
```

**Check browser Network tab:**
- Response Headers should show `X-Content-Source: production`
- API response should include `meta.quick_preview.enabled: true`

**Site should work perfectly** - all content loads from production backend.

---

## Validation Script

Run this to verify everything is installed correctly:

```bash
node scripts/quick-preview/validate-setup.mjs
```

Expected output:
```
🔍 Validating Quick Preview Infrastructure...

✅ Change detection script
✅ Selective prebuild script
✅ Quick preview utilities
✅ npm script: dev:quick-preview
✅ npm script: quick-preview:detect
✅ npm script: quick-preview:build
✅ API route imports quick preview utils
✅ Quick Preview middleware (asset proxying)
✅ Main middleware imports quickPreviewMiddleware

============================================================
✅ All checks passed! Quick Preview infrastructure is ready.
```

---

## Troubleshooting

### Site shows blank page or JavaScript errors

**Cause:** Middleware not proxying assets correctly.

**Fix:**
1. Check `QUICK_PREVIEW=true` is set (should be automatic with `npm run dev:quick-preview`)
2. Check `public/changedfiles.json` exists
3. Restart dev server

### Content returns 404

**Cause:** Production backend URL is wrong or unreachable.

**Debug:**
```bash
# Check what URL is being used
curl http://localhost:8080/api/content/terraform/doc/latest/intro

# Test production backend directly
curl https://web-unified-docs-hashicorp.vercel.app/api/content/terraform/doc/latest/intro
```

**Fix:** Set correct backend URL:
```bash
QUICK_PREVIEW_FALLBACK_URL=https://correct-backend.com npm run dev:quick-preview
```

### Images don't load

**Cause:** Middleware not catching asset requests or CORS issues.

**Debug:** Check browser Network tab for:
- 404s on `/assets/*` or `/_next/static/*`
- CORS errors
- Check if `X-Content-Source: production` header is present

**Fix:** Verify middleware is loaded:
```bash
grep -r "quickPreviewMiddleware" middleware.js
```

### Regular `npm run dev` is affected

**This should never happen.** Quick Preview is only active when:
1. You explicitly run `npm run dev:quick-preview`
2. `QUICK_PREVIEW=true` environment variable is set
3. `public/changedfiles.json` exists

If `npm run dev` is affected:
```bash
# Remove manifest
rm public/changedfiles.json

# Verify QUICK_PREVIEW is not set
env | grep QUICK_PREVIEW
```

---

## How to Disable/Remove

### Temporarily Disable

Just use regular dev command:
```bash
npm run dev
```

Or delete the manifest:
```bash
rm public/changedfiles.json
```

### Permanently Remove

1. Delete new files:
```bash
rm -rf scripts/quick-preview
rm app/utils/quickPreview.ts
rm app/middleware/quickPreview.js
rm -rf docs/quick-preview
```

2. Remove from `package.json`:
```json
// Delete these lines:
"dev:quick-preview": "...",
"quick-preview:detect": "node scripts/quick-preview/detect-changes.mjs",
"quick-preview:build": "node scripts/quick-preview/selective-prebuild.mjs",
```

3. Restore `middleware.js`:
```javascript
// Remove this import:
import { quickPreviewMiddleware } from './app/middleware/quickPreview.js'

// Remove this call:
const response = await quickPreviewMiddleware(request)
if (response) return response
```

4. Revert API route changes (4 files):
   - Remove `quickPreview` imports
   - Remove production fallback logic
   - Remove `X-Content-Source` headers

---

## Current Status & Next Steps

### ✅ Phase 1: Infrastructure (COMPLETE)

- Git diff change detection (uncommitted + committed)
- Selective prebuild (only changed files)
- Deleted file tracking
- API fallback to production
- Middleware asset proxying
- Response headers and metadata
- Validation tooling

**You can now:** Run the site with zero local content.

### 🚧 Phase 2: Change Detection (NOT STARTED)

**Goals:**
- Detect which files changed via `git diff`
- Generate real manifest with changed file list
- Build only changed files in prebuild

**Implementation:**
- Script to run `git diff main...HEAD`
- Filter for content files (`.mdx`, nav-data, etc.)
- Update manifest with actual changed files
- Modify prebuild to process only listed files

### 🚧 Phase 3: PR Preview CI/CD (NOT STARTED)

**Goals:**
- GitHub Actions workflow for PR previews
- Deploy only changed content to Vercel
- Reduce preview build time from 17 min → 3-5 min

**Implementation:**
- `.github/workflows/build-pr-preview-quick.yml`
- Vercel deployment configuration
- Performance monitoring

---

## FAQ

**Q: Does this change how the site works in production?**  
A: No. Production builds are completely unchanged. This only affects local development and (eventually) PR previews.

**Q: Can I use this with my actual local content?**  
A: Yes! If you have some content built locally, it will serve that. Only missing content gets proxied from production.

**Q: What happens if production is down?**  
A: Pages that need proxied content will return 404. Local content still works.

**Q: Does the frontend need to change?**  
A: No. The frontend receives the same API responses as before, just with additional `quick_preview` metadata it can optionally use.

**Q: Why is it called "Quick Preview"?**  
A: The eventual goal is to speed up PR preview deployments by only building changed files. Phase 1 builds the infrastructure to make that possible.

**Q: How do I know if I'm in Quick Preview mode?**  
A: Check terminal logs for `[Quick Preview]` messages, or check API response headers for `X-Content-Source`.

**Q: Can I use this in CI/CD now?**  
A: The infrastructure is ready, but you'd need to configure your CI to set `QUICK_PREVIEW=true` and generate the manifest. Phase 3 will add pre-configured workflows.

---

## Support & Resources

- **Full implementation plan:** `docs/.research/QUICK_PREVIEW_BUILDS.md`
- **Validation script:** `scripts/quick-preview/validate-setup.mjs`
- **Example UI component:** `app/components/QuickPreviewBanner.tsx`

**Questions?** Check terminal logs when running `npm run dev:quick-preview` - they show exactly what's happening.
   - http://localhost:3000/vault/docs/what-is-vault
   - http://localhost:3000/terraform/docs/language
   
   **Note:** You'll need to point your dev portal frontend to `localhost:3000` to see the actual pages.

3. **Verify:**
   - ✅ API responses include `quick_preview` metadata
   - ✅ Pages load successfully (via frontend)
   - ✅ Content is from production backend
   - ✅ Response headers show `X-Content-Source: production`

4. **Check the manifest:**
   ```bash
   cat public/changedfiles.json
   ```

## How to Verify It's Working

### Option 1: Check API Response
Make a direct API call:
```bash
curl http://localhost:3000/api/content/vault/doc/v1.18.x/docs/what-is-vault | jq '.meta.quick_preview'
```

Should return:
```json
{
  "enabled": true,
  "mode": "mock",
  "content_source": "production"
}
```

### Option 2: Check Response Headers
Open browser DevTools → Network → Click any API request → Check headers:
- Should see `X-Content-Source: production`
- Should see `X-Preview-Fallback: true`

### Option 3: Check Console Logs
The terminal running the dev server will show:
```
[Quick Preview] Fetching from production: /api/content/...
```

### Option 4: Frontend Implementation
Your dev portal frontend can check the response and display a banner:
```typescript
// In your frontend code
const response = await fetch('/api/content/...')
const data = await response.json()

if (data.meta.quick_preview?.enabled) {
  // Show banner: "Preview Mode - Content from production"
  console.log('Content source:', data.meta.quick_preview.content_source)
}
```

## Performance Metrics

### Local Development
- **Full prebuild:** ~5-15 minutes (72,000+ files)
- **Quick Preview detect + build:** ~5-30 seconds (typical PR)
- **Time saved:** 95-99%

### PR Preview Deployments
- **Traditional build:** ~17 minutes
- **Quick Preview build:** ~5.5 minutes
  - Change detection: ~10 seconds
  - Metadata generation: ~5 seconds
  - Selective prebuild: ~30 seconds
  - Next.js build: ~5 minutes
- **Time saved:** 70%

### Real-World Example (December 18, 2025)
From actual PR preview logs:
```
Detect changes: 10s
Generate metadata: 5s
Selective prebuild: 30s (processed 0 changed files)
Next.js build: 5m 15s
Total: 6m 0s (vs 17m baseline = 65% faster)
```

---

## Next Steps (Future Enhancements)

## Troubleshooting

### Local Development Issues

#### API responses don't include quick_preview metadata
- Check `public/changedfiles.json` exists
- Verify you ran `npm run dev:quick-preview` (not `npm run dev`)
- Check server logs for errors

#### Pages show 404
- Verify production backend is accessible: https://web-unified-docs-hashicorp.vercel.app
- Check terminal logs for fetch errors
- Verify network connection
- Try setting `QUICK_PREVIEW_FALLBACK_URL` to a different backend

#### "Normal" content appears (not from production)
- You may have local content built
- Try removing `public/content/` directory
- Restart with `npm run dev:quick-preview`

### GitHub Actions Issues

#### Build still takes 17+ minutes
Check the logs for these indicators:
```
Running "npm run build"
> prebuild                          ← ❌ BAD: prebuild ran twice
> node scripts/prebuild/run-prebuild.mjs
Running MDX transforms on 72927 files...
```

If you see this, the prebuild script wasn't removed properly. Verify:
1. "Temporarily remove prebuild script" step exists
2. "Restore prebuild script" step has `if: always()`
3. jq commands are correct

#### Duplicate prebuild runs
This was the critical bug we fixed. The workflow now:
1. Removes `prebuild` script temporarily
2. Runs `vercel build` (which calls `npm run build`)
3. npm looks for `prebuild` script, doesn't find it
4. Goes straight to `next build`
5. Restores `prebuild` script

#### Module not found errors
```
Module not found: Can't resolve '#api/docsPathsAllVersions.json'
```

This means metadata files weren't generated. Check:
1. "Generate metadata files" step runs before build
2. Uses `--only-metadata` flag
3. Completes successfully

## Architecture

```
User Request
     ↓
API Route
     ↓
Check for local content
     ↓
Not found? Check manifest
     ↓
Quick Preview enabled?
     ↓
Fetch from production
     ↓
Return with X-Content-Source header
```

## Environment Variables

- `QUICK_PREVIEW=true` - Enables quick preview mode (auto-set by `dev:quick-preview`)
- `QUICK_PREVIEW_FALLBACK_URL` - Custom backend URL (defaults to Vercel production)

## Manifest Format

```json
{
  "generated": "2025-12-15T10:30:00.000Z",
  "baseBranch": "main",
  "quickPreview": true,
  "mode": "mock",
  "stats": {
    "changed": 0,
    "deleted": 0,
    "impactedProducts": 0
  },
  "files": {
    "changed": [],
    "deleted": []
  },
  "products": {
    "impacted": [],
    "requiresFullRebuild": false
  }
}
```

## GitHub Actions Integration - PRODUCTION READY ✅

Quick Preview is **currently deployed and working** in PR preview builds.

### Setup (Already Complete)

1. **GitHub Secrets** - Configured in repository:
   - `VERCEL_TOKEN` - Vercel API token
   - `VERCEL_ORG_ID` - Vercel organization ID  
   - `VERCEL_PROJECT_ID` - Vercel project ID
   - `VERCEL_AUTOMATION_BYPASS_SECRET` - For link checker

2. **Workflow File** - `.github/workflows/pr-preview-quick.yml`

### How PR Previews Work

When a PR is opened or updated:

1. **Security Check** - Validates forked PRs only modify `content/**`

2. **Detect Changes** - Git diff against base branch
   ```bash
   git fetch origin main
   npm run quick-preview:detect
   ```

3. **Generate Metadata** - Required for Next.js build
   ```bash
   node scripts/prebuild/run-prebuild.mjs --only-metadata
   ```

4. **Selective Prebuild** - Process only changed files
   ```bash
   npm run quick-preview:build  # ~30 seconds
   ```

5. **Build** - Temporarily remove prebuild script, run Vercel build
   ```bash
   # Remove prebuild from package.json
   jq 'del(.scripts.prebuild)' package.json
   
   # Build (won't run prebuild due to removal)
   vercel build --target=preview
   
   # Restore prebuild script
   jq '.scripts.prebuild = ...' package.json
   ```

6. **Deploy** - Upload prebuilt artifacts to Vercel
   ```bash
   vercel deploy --prebuilt --target=preview
   ```

7. **Deploy Dev Portal** - Separate deployment that consumes unified docs API

8. **PR Comment** - Automatic comment with:
   - Deployment URLs (unified docs API + dev portal)
   - Build statistics
   - Quick Preview mode indicator

### Actual Performance (December 2025)

- **Traditional Build**: ~17 minutes
- **Quick Preview Build**: ~5.5 minutes
- **Time Savings**: 70%

### Build Statistics Output

```
### Quick Preview Statistics
- Changed: 5
- Deleted: 1
- Docs: 3
- Nav data: 2
  - Total deleted: 1
  - Docs: 3
  - Nav data: 2

⏱️  Build completed in 187s (3.1 min)
```

### Workflow Triggers

Currently configured for **testing** with `pull_request`:
- Pull request opened
- Pull request synchronized (new commits)
- Pull request reopened

**TODO:** Change to `pull_request_target` for production (security requirement)

---

## Key Learnings & Solutions

### Critical Bug: Duplicate Prebuild

**Problem:** Initial implementations ran prebuild twice:
1. Selective prebuild in workflow (~30s) ✅
2. Full prebuild via npm lifecycle (~15min) ❌

**Root Cause:** npm automatically runs `prebuild` script before `build` script by convention.

**Attempted Solutions:**
1. ❌ Set `VERCEL_BUILD_COMMAND` env var - Vercel ignores it
2. ❌ Create `vercel.json` with buildCommand - Ignored for linked projects  
3. ❌ Modify `.vercel/project.json` to `npm run build` - npm still ran prebuild

**Final Solution:** Temporarily remove `prebuild` from package.json
```yaml
# Before build
- run: jq 'del(.scripts.prebuild)' package.json

# Build (npm can't find prebuild script)
- run: vercel build

# After build (always restore, even on failure)
- if: always()
  run: jq '.scripts.prebuild = ...' package.json
```

This works because:
- npm looks for `prebuild` script dynamically
- If script doesn't exist, npm skips it
- Workflow restores script immediately after build
- No permanent changes to package.json

### Security: Format String Injection

**Problem:** `console.error` with template literal and user-controlled data.

**Solution:** Use format specifier instead:
```typescript
// Before (vulnerable)
console.error(`Failed to fetch: ${path}`, error)

// After (secure)
console.error('Failed to fetch: %s', path, error)
```

### Dependency: Missing Metadata Files

**Problem:** Next.js build failed with "Module not found: #api/docsPathsAllVersions.json"

**Solution:** Generate both metadata files before build:
```bash
node scripts/prebuild/run-prebuild.mjs --only-metadata
```

This generates:
- `app/api/versionMetadata.json`
- `app/api/docsPathsAllVersions.json`

Takes ~5 seconds, required for Next.js imports.

---

## Workflow Triggers

The workflow runs on:
- Pull request opened
- Pull request synchronized (new commits)
- Pull request reopened

Only when these paths change:
- `content/**`
- `app/**`
- `scripts/**`
- `package.json`

## FAQ

**Q: Will this affect my regular development?**
A: No. The `npm run dev` command is completely unchanged.

**Q: Why is everything from production?**
A: Git diff detects your changes and selective prebuild processes only those files. Unchanged content is served from production.

**Q: Is this safe to use?**
A: Yes, it's completely isolated. Only active when `QUICK_PREVIEW=true` environment variable is set.

**Q: What if production is down?**
A: Preview pages will fail to load unchanged content. Changed content will still work.

**Q: Can I test the workflow locally?**
A: Yes! Just run `npm run dev:quick-preview` - it uses the same logic.

**Q: How do I verify GitHub Actions is set up correctly?**
A: Check that secrets are configured and open a test PR with a small content change.

## Support

Questions or issues? Check:
1. This README
2. GitHub Actions logs in PR checks
3. Terminal logs when running `dev:quick-preview`
