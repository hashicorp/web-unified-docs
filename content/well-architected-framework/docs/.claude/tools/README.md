# WAF Documentation Health Dashboard Tools

This directory contains tools for analyzing and monitoring the health of WAF documentation.

## Files

- **health-dashboard.js** - Analyzes individual documents
- **batch-health-analysis.js** - Analyzes entire directories
- **health-report.json** - Full analysis results for all 120 documents (generated 2026-01-29)
- **WAF-DOCUMENTATION-HEALTH-REPORT.md** - Comprehensive analysis report with recommendations
- **QUICK-START-GUIDE.md** - Usage instructions and workflow guide

## Quick Start

### Analyze a Single Document

```bash
node ./.claude/tools/health-dashboard.js docs/path/to/document.mdx
```

### Analyze a Directory

```bash
node ./.claude/tools/batch-health-analysis.js docs/section-name
```

### Get JSON Output

```bash
node ./.claude/tools/health-dashboard.js docs/path/to/document.mdx --format json
```

## What Gets Checked

- 🏗️ **Structure** (25%) - Frontmatter, sections, headings, lists
- 📝 **Content** (30%) - Word count, examples, resources, persona balance
- ✍️ **Style** (25%) - Voice, pronouns, language, word choice
- 🔗 **Links** (20%) - Internal, external, formatting, descriptions

## Health Scores

- 🟢 **Excellent (9-10)** - Ready for publication
- 🟢 **Good (7-8.9)** - Minor improvements needed
- 🟡 **Needs Attention (5-6.9)** - Several issues to address
- 🔴 **Critical (<5)** - Major revision required

## Documentation

See **QUICK-START-GUIDE.md** for detailed usage instructions and workflows.

See **WAF-DOCUMENTATION-HEALTH-REPORT.md** for the latest comprehensive analysis.

## Integration with Skills

Use `/doc-health-dashboard` skill to run the dashboard directly from Claude Code.
