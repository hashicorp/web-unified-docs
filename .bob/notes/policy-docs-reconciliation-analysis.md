# HCP Terraform Policy Documentation Reconciliation Analysis

**Date:** 2026-09-10  
**Branch:** danielehc/IPE-1569  
**Analyst:** Bob Shell

## Executive Summary

This analysis validates the reconciliation of two documentation histories for HCP Terraform policy features and proposes improvements to the information architecture (IA) before merge.

## History Validation

### Current Branch (danielehc/IPE-1569)
**Feature:** Pre-written policies support  
**Key Changes:**
- Added pre-written policy library documentation
- New API endpoints for pre-written policies
- Beta feature for HashiCorp-managed policy sets
- Located under: `workspaces/policy-enforcement/manage-policy-sets/pre-written/`

**Files Modified (15 policy-related files):**
```
content/terraform-docs-common/docs/cloud-docs/api-docs/policy-sets.mdx
content/terraform-docs-common/docs/cloud-docs/api-docs/pre-written-policies/policy.mdx
content/terraform-docs-common/docs/cloud-docs/policy-enforcement/manage-policy-sets/configure.mdx
content/terraform-docs-common/docs/cloud-docs/policy-enforcement/manage-policy-sets/index.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/index.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/index.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/prewritten-library.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/sentinel-pre-written.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/pre-written/terraform-policy-pre-written.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/index.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/opa-vcs.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/prewritten-repositories.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/prewritten-sentinel.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/sentinel-vcs.mdx
content/terraform-docs-common/docs/cloud-docs/workspaces/policy-enforcement/manage-policy-sets/vcs/terraform-policy-vcs.mdx
```

### Main Branch
**Feature:** Stacks support for Terraform policy  
**Key Changes (from git log):**
- Commit 067e9c0a5: "Terraform Docs for Terraform policy on Stacks support"
- Moved policy docs from `workspaces/` to top-level `policy-enforcement/`
- Added Stacks-specific policy documentation
- Created: `stacks/policy-enforcement.mdx`

**Status:** ✅ **VALIDATED** - User's description is accurate

## Current Documentation Structure

### 1. Terraform Enterprise (TFE) - Product-Specific
**Note:** We are notmaking changes to this set of docs at this time.
**Location:** `content/terraform-enterprise/v202507-1/docs/enterprise/policy-enforcement/`

**Structure:**
```
policy-enforcement/
├── index.mdx                          # Overview
├── prewritten-library.mdx             # Pre-written library reference
├── prewritten-sentinel.mdx            # Run pre-written Sentinel
├── test-sentinel.mdx                  # Test Sentinel policies
├── define-policies/
│   ├── index.mdx                      # Overview
│   ├── custom-sentinel.mdx            # Custom Sentinel policies
│   └── opa.mdx                        # OPA policies
├── manage-policy-sets/
│   ├── index.mdx                      # Create and manage policy sets
│   ├── opa-vcs.mdx                    # Connect OPA to VCS
│   └── sentinel-vcs.mdx               # Create Sentinel in VCS
├── view-results/
│   ├── index.mdx                      # Overview
│   └── json.mdx                       # View Sentinel JSON results
└── import-reference/                  # Sentinel import reference (7 files)
```

**Navigation (from enterprise-nav-data.json):**
- Top-level section: "Policy enforcement"
- Well-organized with clear hierarchy
- Includes pre-written library at top level

### 2. HCP Terraform Cloud Docs - Shared Content
**Location:** `content/terraform-docs-common/docs/cloud-docs/`

**Structure:**
```
policy-enforcement/                    # TOP-LEVEL (shared)
├── index.mdx                          # Overview
├── define-policies/                   # Define policies
├── import-reference/                  # Sentinel imports
├── manage-policy-sets/
│   ├── configure.mdx
│   └── index.mdx
└── test/                              # Test policies

workspaces/policy-enforcement/         # WORKSPACE-SPECIFIC
├── index.mdx                          # Workspace overview
├── manage-policy-sets/
│   ├── pre-written/                   # ⚠️ PRE-WRITTEN (BETA)
│   │   ├── index.mdx
│   │   ├── prewritten-library.mdx
│   │   ├── sentinel-pre-written.mdx
│   │   └── terraform-policy-pre-written.mdx
│   └── vcs/                           # VCS workflows
│       ├── index.mdx
│       ├── opa-vcs.mdx
│       ├── prewritten-repositories.mdx
│       ├── prewritten-sentinel.mdx
│       ├── sentinel-vcs.mdx
│       └── terraform-policy-vcs.mdx
└── view-results/                      # View results

stacks/
└── policy-enforcement.mdx             # STACKS-SPECIFIC
```

## Issues and Inconsistencies

### 1. **Structural Fragmentation** ⚠️ HIGH PRIORITY
**Problem:** Policy documentation is split across three locations with unclear boundaries:
- Top-level `policy-enforcement/` (shared concepts)
- `workspaces/policy-enforcement/` (workspace-specific)
- `stacks/policy-enforcement.mdx` (stacks-specific)

**Impact:**
- Users must navigate multiple sections to understand complete policy workflows
- Duplication of concepts (e.g., "manage policy sets" appears in multiple places)
- Unclear which content applies to workspaces vs. stacks vs. both

### 2. **Pre-written Policies Placement** ⚠️ MEDIUM PRIORITY
**Problem:** Pre-written policies are nested under `workspaces/policy-enforcement/manage-policy-sets/pre-written/`

**Issues:**
- Pre-written policies work with BOTH workspaces and stacks (per Stacks policy doc)
- Current location implies workspace-only feature
- Inconsistent with TFE structure where pre-written library is top-level

**Current Path:** `workspaces/policy-enforcement/manage-policy-sets/pre-written/`  
**Should Be:** `policy-enforcement/pre-written/` (top-level, shared)

### 3. **Workflow Documentation Inconsistency** ⚠️ MEDIUM PRIORITY
**Problem:** Different workflow types are documented inconsistently:

**VCS Workflows:**
- Located under `workspaces/policy-enforcement/manage-policy-sets/vcs/`
- Separate files for each policy engine (Sentinel, OPA, Terraform policy)
- Includes pre-written repository setup

**Pre-written Workflows:**
- Located under `workspaces/policy-enforcement/manage-policy-sets/pre-written/`
- Beta feature
- Separate files for Sentinel and Terraform policy

**UI/API Workflows:**
- Documented in top-level `manage-policy-sets/index.mdx`
- Mixed with general policy set management

### 4. **Policy Engine Documentation** ⚠️ LOW PRIORITY
**Problem:** Three policy engines (Terraform policy, Sentinel, OPA) are documented inconsistently:

**Terraform Policy:**
- Newest engine
- Limited documentation
- VCS setup: `workspaces/policy-enforcement/manage-policy-sets/vcs/terraform-policy-vcs.mdx`
- Pre-written: `workspaces/policy-enforcement/manage-policy-sets/pre-written/terraform-policy-pre-written.mdx`
- No dedicated "define policies" page (unlike Sentinel and OPA)

**Sentinel:**
- Most mature
- Extensive documentation including import reference
- Custom policies: `define-policies/custom-sentinel.mdx`
- VCS: `manage-policy-sets/vcs/sentinel-vcs.mdx`
- Pre-written: Multiple locations

**OPA:**
- Define policies: `define-policies/opa.mdx`
- VCS: `manage-policy-sets/vcs/opa-vcs.mdx`
- No pre-written policies

### 5. **Context-Specific Features** ⚠️ MEDIUM PRIORITY
**Problem:** Workspace and Stacks have different policy capabilities, but this isn't clearly communicated:

**Stacks Limitations (from stacks/policy-enforcement.mdx):**
- Only Terraform policy supported (not Sentinel or OPA)
- Cannot evaluate before plan phase
- Cannot evaluate after apply phase
- Users cannot override mandatory overridable policy failures
- Requires Terraform 1.17alpha or later

**Workspace Features:**
- All three policy engines supported
- Full policy lifecycle (pre-plan, post-plan, post-apply)
- Override capabilities
- Cost estimation access (Sentinel only)

**Issue:** These differences are only documented in the Stacks-specific page, not in the main policy documentation.

### 6. **Navigation and Discoverability** ⚠️ MEDIUM PRIORITY
**Problem:** Users must understand the IA to find relevant information:

**Current User Journey for "How do I use pre-written policies?":**
1. Start at policy-enforcement overview
2. Navigate to workspaces section (not obvious)
3. Find policy-enforcement under workspaces
4. Navigate to manage-policy-sets
5. Find pre-written subdirectory
6. Choose between Sentinel and Terraform policy

**Better Journey:**
1. Start at policy-enforcement overview
2. See "Pre-written policies" as top-level option
3. Choose policy engine
4. Follow workflow

## Complexity Analysis

### Policy Engines (3)
1. **Terraform policy** - Newest, Stacks-compatible, pre-written support
2. **Sentinel** - Most mature, extensive features, pre-written support
3. **OPA** - Alternative framework, no pre-written support

### Execution Contexts (2)
1. **Workspaces** - Full feature support, all engines
2. **Stacks** - Limited support, Terraform policy only

### Workflows (4)
1. **UI-driven** - Individual policies, manual management
2. **VCS-driven** - Policy-as-code, version controlled
3. **Pre-written libraries** - HashiCorp-managed, curated policies (BETA)
4. **API/Automated** - CI/CD integration, programmatic management

### Policy Set Scopes (3)
1. **Global** - All workspaces/stacks in organization
2. **Project-level** - All workspaces/stacks in project
3. **Specific** - Individual workspaces or stacks

### Enforcement Levels (Varies by Engine)
**Sentinel:** advisory, soft mandatory, hard mandatory  
**OPA:** advisory, mandatory  
**Terraform policy:** (needs verification)

## Proposed Improvements

### Phase 1: Structural Reorganization (HIGH PRIORITY)

#### 1.1 Establish Clear Content Hierarchy

**Principle:** Shared concepts at top level, context-specific details in context sections

**Proposed Structure:**
```
policy-enforcement/                    # SHARED CONCEPTS
├── index.mdx                          # Overview (all engines, all contexts)
├── define-policies/                   # How to write policies
│   ├── index.mdx                      # Overview
│   ├── terraform-policy.mdx           # NEW: Terraform policy guide
│   ├── sentinel.mdx                   # Renamed from custom-sentinel.mdx
│   └── opa.mdx                        # OPA guide
├── manage-policy-sets/                # How to organize and apply
│   ├── index.mdx                      # Overview (all workflows)
│   ├── ui-workflow.mdx                # NEW: UI-driven workflow
│   ├── vcs-workflow.mdx               # NEW: VCS-driven workflow
│   ├── api-workflow.mdx               # NEW: API/automated workflow
│   └── pre-written-workflow.mdx       # NEW: Pre-written workflow
├── pre-written/                       # MOVED from workspaces
│   ├── index.mdx                      # Overview and library
│   ├── terraform-policy.mdx           # Terraform policy pre-written
│   └── sentinel.mdx                   # Sentinel pre-written
├── test/                              # Testing policies
│   ├── index.mdx                      # Overview
│   ├── terraform-policy.mdx           # NEW: Test Terraform policy
│   └── sentinel.mdx                   # Test Sentinel
├── import-reference/                  # Sentinel imports (unchanged)
└── enforcement-levels.mdx             # NEW: Comprehensive enforcement guide

workspaces/
├── policy-enforcement/                # WORKSPACE-SPECIFIC
│   ├── index.mdx                      # Workspace overview + unique features
│   ├── view-results/                  # Viewing results in workspace UI
│   └── override-policies.mdx          # NEW: Override workflow

stacks/
├── policy-enforcement.mdx             # STACKS-SPECIFIC
                                       # Keep as single page (simpler model)
```

#### 1.2 Content Migration Plan

**Move:**
- `workspaces/policy-enforcement/manage-policy-sets/pre-written/*` → `policy-enforcement/pre-written/`
- `workspaces/policy-enforcement/manage-policy-sets/vcs/*` → Consolidate into `policy-enforcement/manage-policy-sets/vcs-workflow.mdx`

**Create New:**
- `policy-enforcement/define-policies/terraform-policy.mdx` - Comprehensive Terraform policy guide
- `policy-enforcement/manage-policy-sets/ui-workflow.mdx` - Extract from index.mdx
- `policy-enforcement/manage-policy-sets/api-workflow.mdx` - API/automation guide
- `policy-enforcement/enforcement-levels.mdx` - Comprehensive enforcement level guide

**Consolidate:**
- VCS workflow files (currently 6 files) → Single comprehensive guide with engine-specific sections
- Pre-written workflow files → Clearer separation by engine

### Phase 2: Content Improvements (MEDIUM PRIORITY)

#### 2.1 Add Context Comparison Matrix

**Location:** `policy-enforcement/index.mdx`

**Content:** Table comparing Workspaces vs. Stacks support:

| Feature | Workspaces | Stacks |
|---------|-----------|--------|
| Terraform policy | ✅ | ✅ |
| Sentinel | ✅ | ❌ |
| OPA | ✅ | ❌ |
| Pre-written policies | ✅ | ✅ (Terraform policy only) |
| Policy overrides | ✅ | ❌ (planned) |
| Cost estimation access | ✅ (Sentinel) | ❌ |
| Pre-plan evaluation | ✅ | ❌ |
| Post-apply evaluation | ✅ | ❌ |

#### 2.2 Improve Workflow Documentation

**Current Problem:** Workflows are scattered and mixed with policy set management

**Proposed Solution:** Dedicated workflow pages with clear step-by-step instructions

**Each workflow page should include:**
1. When to use this workflow
2. Prerequisites
3. Step-by-step setup
4. Example configurations
5. Best practices
6. Troubleshooting

#### 2.3 Add Decision Trees

**Location:** `policy-enforcement/index.mdx`

**Content:** Help users choose:
1. Which policy engine to use
2. Which workflow to implement
3. Which enforcement level to set

**Example Decision Tree:**
```
Are you using Stacks?
├─ Yes → Use Terraform policy
└─ No → Choose based on needs:
    ├─ Need cost estimation? → Sentinel
    ├─ Existing OPA policies? → OPA
    └─ New to policies? → Terraform policy (recommended)
```

#### 2.4 Standardize Policy Engine Documentation

**Ensure each engine has:**
- Define policies guide
- VCS setup guide
- Testing guide (where applicable)
- Pre-written policies guide (where applicable)
- Import/data reference (where applicable)

### Phase 3: Navigation and UX (MEDIUM PRIORITY)

#### 3.1 Update Navigation Structure

**Proposed nav-data.json structure:**
```json
{
  "title": "Policy enforcement",
  "routes": [
    {
      "title": "Overview",
      "path": "policy-enforcement"
    },
    {
      "title": "Define policies",
      "routes": [
        {"title": "Overview", "path": "policy-enforcement/define-policies"},
        {"title": "Terraform policy", "path": "policy-enforcement/define-policies/terraform-policy"},
        {"title": "Sentinel", "path": "policy-enforcement/define-policies/sentinel"},
        {"title": "OPA", "path": "policy-enforcement/define-policies/opa"}
      ]
    },
    {
      "title": "Manage policy sets",
      "routes": [
        {"title": "Overview", "path": "policy-enforcement/manage-policy-sets"},
        {"title": "UI workflow", "path": "policy-enforcement/manage-policy-sets/ui-workflow"},
        {"title": "VCS workflow", "path": "policy-enforcement/manage-policy-sets/vcs-workflow"},
        {"title": "API workflow", "path": "policy-enforcement/manage-policy-sets/api-workflow"},
        {"title": "Pre-written workflow", "path": "policy-enforcement/manage-policy-sets/pre-written-workflow"}
      ]
    },
    {
      "title": "Pre-written policies",
      "badge": "BETA",
      "routes": [
        {"title": "Overview", "path": "policy-enforcement/pre-written"},
        {"title": "Terraform policy", "path": "policy-enforcement/pre-written/terraform-policy"},
        {"title": "Sentinel", "path": "policy-enforcement/pre-written/sentinel"}
      ]
    },
    {
      "title": "Test policies",
      "routes": [
        {"title": "Overview", "path": "policy-enforcement/test"},
        {"title": "Terraform policy", "path": "policy-enforcement/test/terraform-policy"},
        {"title": "Sentinel", "path": "policy-enforcement/test/sentinel"}
      ]
    },
    {
      "title": "Enforcement levels",
      "path": "policy-enforcement/enforcement-levels"
    },
    {
      "title": "Sentinel import reference",
      "path": "policy-enforcement/import-reference"
    }
  ]
}
```

#### 3.2 Add Cross-References

**Add "See also" sections to:**
- Workspace policy enforcement → Link to Stacks policy enforcement
- Stacks policy enforcement → Link to Workspace policy enforcement
- Each policy engine page → Link to other engines
- Each workflow page → Link to other workflows

#### 3.3 Improve Search and Discoverability

**Add keywords/tags to frontmatter:**
```yaml
keywords:
  - policy
  - sentinel
  - opa
  - terraform policy
  - compliance
  - governance
  - pre-written
  - vcs
  - workspaces
  - stacks
```

### Phase 4: Consistency and Clarity (LOW PRIORITY)

#### 4.1 Terminology Standardization

**Establish consistent terms:**
- "Policy engine" (not "policy framework" or "policy language")
- "Policy set" (not "policy collection")
- "Enforcement level" (not "enforcement mode")
- "Pre-written policies" (not "managed policies" or "curated policies")
- "VCS workflow" (not "version control workflow")
- "author" policies (not "develop" or "write")

#### 4.2 Content Templates

Where possible, content should follow the appropriate template from @templates/

#### 4.3 Example Standardization

**Ensure all examples include:**
- Complete, working code
- Comments explaining key concepts
- Links to related documentation
- Version requirements

## Implementation Recommendations

### Immediate Actions (Before Merge)

1. **Validate Rebase** ✅
   - Confirm all pre-written policy changes are preserved
   - Verify Stacks policy documentation is intact
   - Check for merge conflicts in navigation files

2. **Document Current State** ✅ (This document)
   - Create comprehensive analysis
   - Identify all issues
   - Propose improvements

3. **Create Redirect Plan**
   - Map old URLs to new URLs for Phase 1 reorganization
   - Ensure no broken links after restructure

4. **Stakeholder Review**
   - Share this analysis with team
   - Get feedback on proposed structure
   - Prioritize improvements

### Post-Merge Actions

1. **Phase 1: Structural Reorganization** (1-2 weeks)
   - Move pre-written policies to top level
   - Consolidate workflow documentation
   - Update navigation
   - Implement redirects

2. **Phase 2: Content Improvements** (2-3 weeks)
   - Add comparison matrices
   - Create decision trees
   - Standardize policy engine docs
   - Improve workflow guides

3. **Phase 3: Navigation and UX** (1 week)
   - Update all navigation files
   - Add cross-references
   - Improve search metadata

4. **Phase 4: Consistency and Clarity** (1 week)
   - Standardize terminology
   - Create templates
   - Update examples

## Success Metrics

### Quantitative
- Reduce policy documentation depth from 5 levels to 3 levels
- Consolidate 15+ policy-related pages into 10-12 well-organized pages
- Achieve 100% cross-reference coverage between related topics
- Zero broken links after reorganization

### Qualitative
- Users can find relevant policy documentation in ≤3 clicks
- Clear distinction between workspace and stacks capabilities
- Consistent documentation structure across all policy engines
- Improved discoverability of pre-written policies

## Risk Assessment

### Low Risk
- Content consolidation (no information loss)
- Navigation updates (reversible)
- Adding new pages (additive)

### Medium Risk
- Moving pre-written policies (requires redirects)
- Restructuring workflows (affects multiple pages)
- Updating cross-references (time-consuming)

### High Risk
- None identified (all changes are documentation-only)

## Conclusion

The rebase successfully preserved both feature sets (pre-written policies and Stacks support), but the resulting IA has structural issues that should be addressed before merge:

1. **Pre-written policies are misplaced** - Should be top-level, not under workspaces
2. **Workflow documentation is fragmented** - Should be consolidated and clarified
3. **Context differences are unclear** - Need explicit comparison and guidance
4. **Navigation is complex** - Too many levels, unclear organization

The proposed improvements will create a more intuitive, maintainable, and user-friendly policy documentation structure that properly reflects the complexity of the feature while making it accessible to users.

**Recommendation:** Proceed with merge after implementing Phase 1 (structural reorganization) or create a follow-up task to address these issues immediately post-merge.
