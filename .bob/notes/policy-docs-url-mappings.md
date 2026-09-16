# Policy Documentation URL Mappings for Redirects

## Pre-written Policies Migration

### Files Moved
From: `content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/`
To: `content/terraform-docs-common/docs/cloud-docs/policy-enforcement/pre-written/`

### URL Redirects Required

| Old URL | New URL | Status |
|---------|---------|--------|
| `/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written` | `/terraform/cloud-docs/policy-enforcement/pre-written` | Required |
| `/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/terraform-policy-pre-written` | `/terraform/cloud-docs/policy-enforcement/pre-written/terraform-policy-pre-written` | Required |
| `/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/sentinel-pre-written` | `/terraform/cloud-docs/policy-enforcement/pre-written/sentinel-pre-written` | Required |
| `/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/prewritten-library` | `/terraform/cloud-docs/policy-enforcement/pre-written/prewritten-library` | Required |

## Redirect Format for redirects.jsonc

```jsonc
{
  "source": "/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written",
  "destination": "/terraform/cloud-docs/policy-enforcement/pre-written",
  "permanent": true
},
{
  "source": "/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/terraform-policy-pre-written",
  "destination": "/terraform/cloud-docs/policy-enforcement/pre-written/terraform-policy-pre-written",
  "permanent": true
},
{
  "source": "/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/sentinel-pre-written",
  "destination": "/terraform/cloud-docs/policy-enforcement/pre-written/sentinel-pre-written",
  "permanent": true
},
{
  "source": "/terraform/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/prewritten-library",
  "destination": "/terraform/cloud-docs/policy-enforcement/pre-written/prewritten-library",
  "permanent": true
}
```

## Notes

- All redirects should be permanent (301) as this is a structural reorganization
- The old directory structure will be removed after redirects are in place
- These redirects apply to the terraform-docs-common content only
- Terraform Enterprise docs are not being changed at this time
