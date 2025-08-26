# Web Unified Docs Testing Guide

This guide explains how to run, understand, and maintain the test suites for the Web Unified Docs API project. It covers test organization, naming conventions, and best practices for developers working with the codebase.

## Test Types and Organization

### 1. Unit Tests

- **Location**: Co-located with source files using `*.test.*` naming convention
- **Pattern**: `filename.test.{ts,mjs}`
- **Framework**: Vitest
- **Command**: `npm test`
- **Examples**:
  - `app/utils/allDocsPaths.test.ts`
  - `app/utils/findDocVersions.test.ts`
  - `scripts/gather-version-metadata.test.ts`

### 2. Integration Tests

- **Location**: `__tests__/` directory
- **Pattern**: `*.test.mjs` for Node.js test scripts
- **Framework**: Custom Node.js scripts (for API testing)
- **Commands**:
  - `npm run test:integration` - Run against local development server
  - `npm run test:integration:production` - Run against production environment

### 3. API Testing Scripts

Located in `__tests__/` directory:

#### `__tests__/api-integration.test.mjs`

- **Purpose**: Comprehensive integration test suite for API endpoints
- **Coverage**:
  - Version metadata endpoints
  - Redirect endpoints
  - Content endpoints with proper path construction
  - Version resolution (latest vs explicit)
  - Error handling for missing content
- **Usage**: `npm run test:integration`

#### `__tests__/content-endpoints.test.mjs`

- **Purpose**: Tests content API endpoints for various content types
- **Coverage**: Documentation, redirects, and metadata endpoints
- **Usage**: `npm run test:content-endpoints`

#### `__tests__/production-regression.test.mjs`

- **Purpose**: Tests specific issues found in production logs
- **Coverage**: Path construction, product slug mapping, content discovery
- **Usage**: `npm run test:production-regression`

#### `__tests__/smoke.test.mjs`

- **Purpose**: Basic health checks for known-working content endpoints
- **Coverage**: Fundamental API functionality with known-good paths
- **Usage**: `npm run test:smoke`

## Test Naming Conventions

The test files in this directory follow clear naming conventions that indicate their purpose:

### File Naming Pattern: `{purpose}.test.mjs`

- **`api-integration.test.mjs`** - Comprehensive API integration tests
- **`content-endpoints.test.mjs`** - Content API endpoint validation
- **`production-regression.test.mjs`** - Tests for production bug fixes
- **`smoke.test.mjs`** - Basic health checks and smoke tests

### Why These Names?

1. **Descriptive**: Each name clearly indicates what the test does
2. **Categorized**: Names group tests by their primary purpose
3. **Standardized**: Follows common testing naming patterns
4. **Maintainable**: New developers can easily understand test scope

### Test Categories Explained

- **Integration Tests**: Test multiple components working together
- **Regression Tests**: Verify that previously fixed bugs stay fixed
- **Smoke Tests**: Quick checks that basic functionality works
- **Endpoint Tests**: Focused testing of specific API endpoints

## Testing Best Practices

### File Naming Conventions

1. **Unit tests**: `filename.test.{ts,mjs}` - co-located with source
2. **Integration tests**: `__tests__/testname.test.mjs` - in dedicated folder
3. **Monitoring scripts**: `scripts/monitor-*.mjs` - in scripts folder

### Test Organization Principles

1. **Co-location**: Unit tests should be placed next to the code they test
2. **Separation**: Integration and end-to-end tests should be in dedicated folders
3. **Naming**: Test files should clearly indicate what they test
4. **Documentation**: Each test file should have a header comment explaining its purpose

### Running Tests

#### Development Workflow

```bash
# Run unit tests (Vitest)
npm test

# Run comprehensive API integration tests locally
npm run test:integration

# Run basic smoke tests for quick health checks
npm run test:smoke

# Run content endpoint tests
npm run test:content-endpoints

# Run production regression tests
npm run test:production-regression

# Run all tests with coverage
npm run coverage
```

#### CI/CD Pipeline

```bash
# Run integration tests against production
npm run test:integration:production

# Run in CI environment (see .github/workflows/integration-tests.yml)
```

### Test Environment Configuration

#### Local Development

- **Base URL**: `http://localhost:3001`
- **Environment**: Uses local Next.js dev server
- **Content**: Reads from local `content/` directory

#### Production Testing

- **Base URL**: `https://web-unified-docs.vercel.app`
- **Environment**: Production Vercel deployment
- **Content**: Fetches from CDN/production sources

## Monitoring and Alerting

### Production Monitoring

- **Script**: `scripts/monitor-production.mjs`
- **Purpose**: Continuous monitoring of production API endpoints
- **Schedule**: Can be run via cron or CI/CD pipeline
- **Alerts**: Configurable alerting for endpoint failures

### GitHub Actions Integration

- **Workflow**: `.github/workflows/integration-tests.yml`
- **Triggers**: Pull requests, pushes to main branch
- **Coverage**: Runs integration tests against both staging and production

## Adding New Tests

### For New Features

1. Add unit tests co-located with new code: `feature.test.ts`
2. Add integration tests if the feature involves API endpoints: `__tests__/feature.test.mjs`
3. Update this documentation

### For Bug Fixes

1. Add regression tests to prevent the bug from recurring
2. Consider adding the test case to existing integration suites
3. Update monitoring if the fix affects critical endpoints

## Historical Context

This testing strategy was developed to address production issues with:

- Missing content discovery
- Incorrect redirect handling
- Version resolution problems
- Path construction errors

The integration tests validate the fixes implemented for these issues and provide ongoing regression testing.
