# Modernization Targets for Bob Tutorial

This document outlines what should be modernized when following the Bob tutorial.

## Current State (Node 16)

### package.json
- `"engines": { "node": "16.x" }`
- Express: `^4.18.2`
- TypeScript: `^4.9.5`
- `@types/node`: `^16.18.0`
- ts-node: `^10.9.1`

### tsconfig.json
- `"module": "commonjs"`
- `"target": "ES2020"`

### Dockerfile
- `FROM node:16`

## Target State (Node 22)

### package.json
- `"engines": { "node": "22.x" }`
- Express: Latest 4.x version (e.g., `^4.21.0`)
- TypeScript: Latest version (e.g., `^5.6.0`)
- `@types/node`: `^22.x.x`
- ts-node: Latest version (e.g., `^10.9.2`)
- Consider adding `"type": "module"` for ESM (optional follow-up)

### tsconfig.json
- Keep `"module": "commonjs"` for initial modernization
- May update `"target": "ES2022"` or `"ESNext"` for Node 22 features
- Optional: Convert to ESM in follow-up step

### Dockerfile
- `FROM node:22-alpine` (smaller image size)
- Update any Node-specific commands if needed

## What Should Stay the Same

- API functionality (CRUD operations)
- Source code logic (no feature changes)
- Project structure
- In-memory database implementation
- TypeScript interfaces and types

## Optional Follow-Up Modernizations

1. **Convert to ESM**
   - Change `tsconfig.json`: `"module": "ESNext"`
   - Add `"type": "module"` to package.json
   - Convert `require`/`module.exports` to `import`/`export`
   - Update file extensions or add proper module resolution

2. **Adopt Node 22 Features**
   - Native test runner
   - Native TypeScript support (experimental)
   - Performance improvements

3. **Multi-stage Docker Build**
   - Separate build and runtime stages
   - Smaller final image
   - Better layer caching

## Testing After Modernization

```bash
# Build with Docker
docker build -t todo-api-modern .

# Run the container
docker run -d --name todo-api -p 3000:3000 todo-api-modern

# Test the API
curl http://localhost:3000/api/todos

# Should return the sample todo
# API should function identically to Node 16 version

# Cleanup
docker stop todo-api && docker rm todo-api
```

## Expected Bob Behavior

1. Bob should update package.json dependencies one at a time
2. Bob should explain why each dependency is being updated
3. Bob should show the approval workflow for each file change
4. Bob should verify compatibility between dependencies
5. Bob should NOT change the source code logic unless required for Node 22 compatibility
