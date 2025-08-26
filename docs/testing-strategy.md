# Testing Strategy for Web Unified Docs Fixes

## 📁 **Test Organization**

Tests are now organized following the project's conventions:

- **Unit Tests**: Co-located with source files using `*.test.*` naming (e.g., `utils.test.ts`)
- **Integration Tests**: Located in `__tests__/` directory with `*.test.mjs` naming
- **Monitoring Scripts**: Located in `scripts/` directory

See `__tests__/TESTING_GUIDE.md` for detailed information about test organization and conventions.

## 🎯 **What We're Testing**

The fixes address these specific issues found in Vercel and Datadog logs:

1. **Path Construction Issues**: Double slashes causing 404s
2. **Redirect Handling**: Inconsistent redirect behavior across contexts
3. **Product Slug Mapping**: Misaligned backend-frontend routing
4. **Content Discovery**: Missing content returning poor error messages

## 🧪 **Local Testing**

### **1. API Endpoint Testing**

Test key endpoints that were failing in production:

```bash
# Version metadata (should work for all products)
curl -s "http://localhost:3001/api/content/terraform-docs-common/version-metadata"
curl -s "http://localhost:3001/api/content/terraform-enterprise/version-metadata"
curl -s "http://localhost:3001/api/content/vault/version-metadata"

# Content endpoints (test path construction)
curl -s "http://localhost:3001/api/content/terraform-docs-common/doc/latest/docs"
curl -s "http://localhost:3001/api/content/terraform-enterprise/doc/latest/enterprise"

# Redirect endpoints (test redirect handling)
curl -s "http://localhost:3001/api/content/terraform-docs-common/redirects"
curl -s "http://localhost:3001/api/content/terraform-enterprise/redirects"
```

### **2. Error Scenario Testing**

Test how the fixes handle edge cases:

```bash
# Non-existent content (should return proper 404)
curl -i "http://localhost:3001/api/content/terraform/doc/latest/nonexistent"

# Invalid product slug (should return proper 404)
curl -i "http://localhost:3001/api/content/invalid-product/doc/latest/docs"

# Malformed paths (should handle gracefully)
curl -i "http://localhost:3001/api/content/terraform//doc/latest/docs"
```

### **3. Middleware Testing**

Test product slug mapping:

```bash
# Test different hostnames and routing
curl -H "Host: localhost" "http://localhost:3001/api/content/terraform-docs-common/version-metadata"
```

### **4. Performance Testing**

Check response times and caching:

```bash
# Time the same request multiple times to test caching
time curl -s "http://localhost:3001/api/content/terraform-docs-common/version-metadata" > /dev/null
time curl -s "http://localhost:3001/api/content/terraform-docs-common/version-metadata" > /dev/null
```

## 🚀 **Staging/Production Testing**

### **1. Deploy Preview Testing**

When deployed to Vercel preview:

1. **Automated Testing**: Use integration test suite with `npm run test:integration` against the preview URL
2. **Frontend Integration**: Test dev-portal integration with the preview API
3. **Monitor Logs**: Check Vercel logs for any new errors

### **2. Production Validation**

After deployment to production:

1. **API Health**: Monitor API response times and error rates
2. **Error Logs**: Check Datadog for reduction in 404 errors
3. **Frontend Success**: Monitor dev-portal build success rates
4. **Search Indexing**: Verify Algolia indexing continues to work

## 📊 **Monitoring Strategy**

### **Key Metrics to Track**

1. **API Error Rates**:

   - 404 errors should decrease significantly
   - 500 errors should remain low
   - Response times should be consistent

2. **Frontend Integration**:

   - Dev-portal build success rate
   - Content loading success rate
   - Version selector functionality

3. **User Experience**:
   - Page load times
   - Search result quality
   - Redirect success rate

### **Datadog Queries**

Monitor these in Datadog:

```
# API 404 rates
sum:vercel.response{status:404,service:web-unified-docs} by {path}

# API response times
avg:vercel.response_time{service:web-unified-docs} by {path}

# Error patterns
logs("ERROR" OR "404" OR "redirect") service:web-unified-docs
```

## 🔧 **Testing Tools**

### **1. Automated Test Script**

- Use integration test suite (`npm run test:integration`) for consistent API testing
- Run against local, staging, and production environments

### **2. Load Testing**

```bash
# Use Apache Bench for load testing
ab -n 100 -c 10 http://localhost:3001/api/content/terraform-docs-common/version-metadata
```

### **3. Integration Testing**

- Test with actual dev-portal frontend
- Verify search indexing workflows
- Test content migration scripts

## ✅ **Success Criteria**

### **Immediate (Local Testing)**

- [ ] All API endpoints return proper HTTP status codes
- [ ] Path construction works without double slashes
- [ ] Redirects resolve correctly
- [ ] Error messages are informative

### **Short Term (Staging)**

- [ ] No new errors in Vercel logs
- [ ] Dev-portal integration works smoothly
- [ ] Performance meets expectations

### **Long Term (Production)**

- [ ] 50%+ reduction in API 404 errors
- [ ] Improved dev-portal build success rate
- [ ] Consistent search indexing
- [ ] Better user experience metrics

## 🐛 **Common Issues to Watch For**

1. **Path Resolution**: Double slashes in URLs
2. **Version Handling**: Latest vs specific version logic
3. **Redirect Loops**: Circular redirect scenarios
4. **Performance**: API response time degradation
5. **Cache Invalidation**: Stale content being served

## 📝 **Test Log Template**

```
Date: YYYY-MM-DD
Environment: [local|staging|production]
Test Type: [api|integration|performance]

✅ Pass / ❌ Fail - Test Description
- Expected: [description]
- Actual: [description]
- Notes: [any additional context]
```
