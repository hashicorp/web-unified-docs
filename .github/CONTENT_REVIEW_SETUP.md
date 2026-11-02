# Content Review Dispatch System

## Overview

This system provides an extensible, configuration-driven approach to enforce team-specific content reviews on pull requests. Different teams (Consul, Vault, Terraform, etc.) can add their own review workflows without modifying the dispatcher.

## How It Works

1. **content-review-dispatch.yml** (Orchestrator)
   - Runs on PRs to `main` and `consul/*` branches
   - Reads `.github/content-review-config.json`
   - Detects changed files
   - Routes to appropriate review workflows based on content changes

2. **content-review-config.json** (Configuration)
   - Central source of truth for all content reviews
   - Each team owns their config entry
   - Defines paths and corresponding workflows

3. **Team Review Workflows** (e.g., consul-content-review.yml)
   - Triggered by dispatcher based on content changes
   - Implements team-specific approval logic
   - Posts status checks to PR

## For Team Leads: Adding Your Content Review

### Step 1: Create Your Review Workflow

Create `.github/workflows/{team}-content-review.yml` following this pattern:

```yaml
name: '{Team} Content Review'

on:
  workflow_call:
    inputs:
      pull_number:
        description: 'Pull request number'
        required: true
        type: string

permissions:
  pull-requests: read
  checks: write

jobs:
  content-review:
    name: 'Validate {Team} Content Review'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Get PR reviews
        id: get-reviews
        uses: actions/github-script@v7
        with:
          script: |
            # Implement your team's review logic here
            # Check approvals from your team members
            # Post check status to PR

      - name: Fail if requirements not met
        run: exit 1  # Only if checks fail
```

### Step 2: Add Config Entry

Update `.github/content-review-config.json`:

```json
{
  "reviews": [
    {
      "name": "Consul",
      "paths": ["content/consul/**"],
      "workflow": "consul-content-review.yml",
      "description": "Requires dual approval from Consul team"
    },
    {
      "name": "Vault",
      "paths": ["content/vault/**"],
      "workflow": "vault-content-review.yml",
      "description": "Requires approval from Vault team"
    }
  ]
}
```

**Fields:**
- `name` - Team name (for logging)
- `paths` - Array of glob patterns to match file changes
- `workflow` - Filename of workflow to trigger (in `.github/workflows/`)
- `description` - Human-readable description

### Step 3: Create PR

Submit a PR with your new workflow and config entry. That's it!

## Config Patterns

Glob patterns support wildcards:
- `content/consul/**` - All files under content/consul/
- `content/vault/docs/**` - All files under content/vault/docs/
- `content/*/security.mdx` - security.mdx in any product folder
- `content/consul/*.mdx` - MDX files directly in consul folder

## Examples

### Example 1: Single Content Path

```json
{
  "name": "Terraform",
  "paths": ["content/terraform/**"],
  "workflow": "terraform-content-review.yml",
  "description": "Terraform documentation reviews"
}
```

### Example 2: Multiple Paths

```json
{
  "name": "Cloud",
  "paths": [
    "content/hcp-docs/**",
    "content/boundary-hcp/**"
  ],
  "workflow": "cloud-content-review.yml",
  "description": "HCP product documentation reviews"
}
```

## Dispatcher Behavior

- **Matching found**: Triggers corresponding workflow(s)
- **No matches**: Logs "No content-specific reviews triggered" and succeeds
- **Multiple matches**: Triggers all matching workflows in parallel
- **Workflow failures**: PR merge is blocked (exit 1 in review workflow)

## Testing

To test your config:

1. Create a test PR to `main` or `consul/*` branch
2. Modify files matching your configured paths
3. Check PR Actions to see dispatcher routing
4. Verify your workflow was triggered

## Troubleshooting

### Workflow not triggering?
- Check file paths in config match actual changed files
- Verify workflow file exists at configured path
- Check dispatcher logs in PR Actions

### Path pattern not matching?
- Remember patterns are relative to repo root
- Use `**` for directory wildcards
- Use `*` for single-level wildcards
- Example: `content/consul/**` matches any file under consul/

### Multiple teams on same files?
- Config supports multiple entries for same file path
- All matching workflows will be triggered
- Each team's approval is required independently

## Questions?

Contact: [Your Team] @hashicorp/[your-team]
