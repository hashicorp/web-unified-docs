# Broken Link Monitoring System

This repository uses a focused broken link monitoring system that provides visibility without blocking development.

## How It Works

### PR Previews (Informational Only)

- **Focus**: Show all broken links for awareness
- **Behavior**:
  - PRs never fail due to broken links
  - All broken links shown in PR comments
  - No Datadog alerts for PR previews
  - Development continues unblocked

### Production Monitoring (Critical Alerts)

- **Focus**: All broken links affecting end users
- **Behavior**:
  - Weekly full content scan ((every Monday))
  - Single GitHub issue with latest results (auto-updated)
  - Production broken links logged to Datadog
  - Critical alerts for user-facing issues

### GitHub Issue Integration

The system automatically maintains a single "Link Checker Report" issue:

- **Auto-closes** previous reports when new ones are generated
- **Creates** a fresh issue with current broken link data
- **Labels** with `link-checker-report` for easy filtering
- **Updates** Weekly with the latest production scan results

**Find current broken links**: Search for issues with label `link-checker-report`

## Finding Current Broken Links

### All Current Broken Links

Check the active GitHub issue titled "Link Checker Report":

- Go to Issues → Filter by label: `link-checker-report`
- The most recent issue contains all current production broken links
- Updated weekly with fresh scan results

### Product Specific Broken Links

A new targeted workflow for teams to check links before migrating products.

**Workflow:** `.github/workflows/udr-product-link-check.yml`

**How to use:**

1. Go to [Actions tab → UDR Product Link Check](https://github.com/hashicorp/web-unified-docs/actions/workflows/udr-product-link-check.yml)
2. Click "Run workflow"
3. Select your product from the dropdown (terraform, vault, consul, etc.)
4. Optionally specify custom paths to check
5. Review the results in the generated GitHub issue

**Key features:**

- **Product-specific**: Check only the content you're migrating

### PR-Level Broken Links

- Check PR comments for broken link reports
- Shows all broken links found in changed files
- Informational only - doesn't block the PR

### Why PRs Don't Fail for Broken Links:

1. **External links** can break at any time (beyond your control)
2. **Development velocity** shouldn't be blocked by external issues
3. **PR previews** are for testing
4. **Full visibility** is maintained through PR comments

### Why Production Monitoring is Critical:

1. **End users** are actually affected by broken links
2. **Weekly scans** catch issues that impact real usage
3. **GitHub issues** provide trackable action items
4. **Datadog alerts** ensure team awareness of user-facing problems

## Best Practices

### For Developers

1. **Review PR comments** - see what links are broken in your changes
2. **Fix critical internal links** - but don't be blocked by external issues
3. **Monitor the weekly GitHub issue** - stay aware of overall link health
4. **Focus on content quality** - write good links and double-check the path

### For Content Teams

1. **Monitor the weekly GitHub issue** - prioritize fixing user-facing broken links
2. **Review production Datadog alerts** - respond to issues affecting users
3. **Update external link policies** - avoid linking to unreliable external sites
4. **Coordinate with dev team** - ensure critical fixes get prioritized

## Datadog Tags

### Production Tags Only (No PR Noise)

- `environment:production` - Production environment
- `service:web-unified-docs` - Service name
- `alert_type:broken_links_production` - Alert type

## Monitoring Queries

### Datadog Queries

```
# Production broken links affecting users
logs("@dd.tags:environment:production AND @dd.tags:alert_type:broken_links_production")
```

### GitHub Issues

```
# Current broken links report
label:link-checker-report is:open

# All historical broken link reports
label:link-checker-report
```

## System Benefits

This focused approach provides:

1. **Developer-friendly** - No broken link noise blocking development
2. **User-focused** - Critical alerts only for production issues
3. **Full visibility** - See all broken links in PR comments and weekly issues
4. **Actionable alerts** - Datadog alerts when users are actually affected

## Troubleshooting Guide

### Common Scenarios

#### "My PR shows broken links but I didn't change those files"

This is normal! The link checker scans all content to give you full visibility. Focus on:

- Fix any broken links in files you directly modified
- Internal HashiCorp links that are broken (high priority)
- Consider if external links in your area can be improved

#### "External site is temporarily down"

For temporary external outages:

- Check if the site recovers before merging
- Consider if the link is essential to your content
- Document known unreliable sources in your team's notes

#### "Internal link is broken but works in my browser"

This usually means:

- Link might work locally but not in production environment
- Path might be case-sensitive in production
- Double-check the exact file path and capitalization

### Quick Fixes

#### Internal Link Fixes

```bash
# Check if target file exists
find content/ -name "target-file.mdx" -type f

# Fix common path issues
- Wrong: `/content/vault/docs/agent`
- Right: `/vault/docs/agent`
```

## Weekly Review Process

### For Content Teams

1. **Check the weekly GitHub issue** labeled `link-checker-report`
2. **Prioritize internal links** - these directly impact user experience
3. **Evaluate external links** - update, replace, or remove as needed
4. **Track patterns** - note frequently broken external domains

### For Developers

1. **Review PR comments** - fix broken links in your changes when possible
2. **Don't be blocked** - external link issues shouldn't delay your work
3. **Help content teams** - flag systematic issues you notice
4. **Focus on quality** - write good links initially to reduce future problems
