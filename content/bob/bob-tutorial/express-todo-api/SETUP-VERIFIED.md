# Legacy Setup Verification

## ✅ Changes Made

### 1. Dockerfile Reverted to Node 16
**Before (incorrect - was modernized):**
```dockerfile
FROM node:22-alpine
```

**After (correct - legacy):**
```dockerfile
FROM node:16
```

### 2. Source Code Reverted to Legacy TypeScript
**File:** `src/routes/todos.ts`

**Reverted changes:**
- Removed TypeScript type guards for `req.params.id`
- Back to simple `req.params.id` (will cause errors with newer TypeScript)
- This is intentional - shows real modernization challenge

**Example:**
```typescript
// Legacy version (current)
const todo = db.getById(req.params.id);

// vs. Modern version (what Bob will create)
const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
const todo = db.getById(id);
```

### 3. Tutorial Updated
Added "Create a Dockerfile" section before "Verify the legacy application builds" to:
- Have users create the Dockerfile themselves
- Understand it's set up for legacy Node 16
- See that Bob will update it to Node 22 later

## 📦 Current Package Versions (Legacy)

```json
{
  "engines": {
    "node": "16.x"
  },
  "dependencies": {
    "express": "^4.18.2",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^16.18.0",
    "@types/uuid": "^9.0.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.5"
  }
}
```

## 🎯 What Bob Will Modernize

1. **Dockerfile:** `FROM node:16` → `FROM node:22-alpine`
2. **package.json:** Node 16.x → 22.x, all deps updated
3. **tsconfig.json:** ES2020 → ES2022 target
4. **src/routes/todos.ts:** Add TypeScript type guards for stricter types

## ✅ Verification

The legacy setup is now correct:
- ✅ Dockerfile uses Node 16
- ✅ package.json specifies Node 16.x
- ✅ TypeScript is old version (4.9.5)
- ✅ Source code has no modern type guards
- ✅ Tutorial has "Create Dockerfile" step

Users will:
1. Create the Dockerfile (understanding it's Node 16)
2. Build and verify it works
3. Open in Bob
4. Ask Bob to analyze (Ask mode)
5. Have Bob modernize to Node 22 (Code mode)
6. Hit TypeScript errors (teaching moment!)
7. Have Bob fix the type errors
8. Verify the modernized version works

This creates a realistic modernization experience!
