# Identify Release Workflow

Determine which PR workflow to use when contributing to the web-unified-docs repository based on the type of changes being made.

## Usage

```
identify_release_workflow <product_name> <change_description>
```

## Examples

- `identify_release_workflow vault "Fix typo in authentication docs"`
- `identify_release_workflow nomad "Add docs for new 2.0 feature"`
- `identify_release_workflow consul "Document upcoming 1.19.0 API changes"`

## Workflow Decision Tree

### 1. **Update Existing Documentation** (Current Release)
**Use when:**
- Fixing typos, errors, or clarifications in published docs
- Updating existing content for the current release
- Making changes to already-published versions

**Branch:** `main`

**Process:**
1. Clone from `main` branch
2. Make changes in current version folder (and prior versions if needed)
3. Create PR against `main`
4. Changes appear on developer.hashicorp.com ~10 minutes after merge

### 2. **Upcoming Minor/Patch Release Documentation**
**Use when:**
- Adding docs for features in an upcoming minor release (e.g., 1.15.0 → 1.16.0)
- Adding docs for features in an upcoming patch release (e.g., 1.15.1 → 1.15.2)
- Content should be published when the release is cut

**Branch:** Product-specific assembly branch (e.g., `vault/202511`, `consul/1.19.0`)

**Process:**
1. Contact tech writer team to confirm assembly branch name
2. Clone from the assembly branch
3. Make changes in current version folder
4. Create PR against the assembly branch
5. Tech writer team merges assembly branch to `main` at release time

### 3. **Upcoming Major Release Documentation**
**Use when:**
- Adding docs for features in an upcoming major release (e.g., 1.x → 2.0)
- Documenting breaking changes or major new features
- Content should be published when the major version is released

**Branch:** Product-specific major release branch (e.g., `nomad/2.0.0`)

**Process:**
1. Contact tech writer team to confirm major release branch name
2. Clone from the major release branch
3. Make changes in the new version folder (e.g., `v2.0.x`)
4. Create PR against the major release branch
5. Tech writer team merges major release branch to `main` at release time

## Implementation

```javascript
function identifyReleaseWorkflow(productName, changeDescription) {
  const keywords = {
    current: ['fix', 'typo', 'error', 'clarify', 'update', 'correct', 'improve'],
    minor: ['upcoming', 'minor', 'patch', 'new feature', 'add', 'enhancement'],
    major: ['major', 'breaking', 'v2', 'v3', '2.0', '3.0', 'major release']
  };
  
  const desc = changeDescription.toLowerCase();
  
  // Check for major release indicators
  if (keywords.major.some(kw => desc.includes(kw))) {
    return {
      workflow: 'major-release',
      branch: `${productName}/<major_version>`,
      description: 'Upcoming Major Release Documentation',
      steps: [
        'Contact tech writer team to confirm major release branch name',
        `Clone from the major release branch (e.g., ${productName}/2.0.0)`,
        'Make changes in the new version folder',
        'Create PR against the major release branch',
        'Tech writer team will merge at release time'
      ],
      note: 'Major release branches contain a new version folder for the upcoming major version'
    };
  }
  
  // Check for minor/patch release indicators
  if (keywords.minor.some(kw => desc.includes(kw))) {
    return {
      workflow: 'minor-release',
      branch: `${productName}/<version_or_date>`,
      description: 'Upcoming Minor/Patch Release Documentation',
      steps: [
        'Contact tech writer team to confirm assembly branch name',
        `Clone from the assembly branch (e.g., ${productName}/1.16.0 or ${productName}/202511)`,
        'Make changes in current version folder',
        'Create PR against the assembly branch',
        'Tech writer team will merge at release time'
      ],
      note: 'Assembly branches are created by tech writers for upcoming releases'
    };
  }
  
  // Default to current release workflow
  return {
    workflow: 'current-release',
    branch: 'main',
    description: 'Update Existing Documentation',
    steps: [
      'Clone from main branch',
      'Make changes in current version folder (and prior versions if needed)',
      'Create PR against main',
      'Changes appear on developer.hashicorp.com ~10 minutes after merge'
    ],
    note: 'This is the most common workflow for documentation updates'
  };
}

// Execute if called directly
if (require.main === module) {
  const productName = process.argv[2];
  const changeDescription = process.argv.slice(3).join(' ');
  
  if (!productName || !changeDescription) {
    console.error('Usage: node identify_release_workflow.js <product_name> <change_description>');
    process.exit(1);
  }
  
  const result = identifyReleaseWorkflow(productName, changeDescription);
  console.log(JSON.stringify(result, null, 2));
}

module.exports = identifyReleaseWorkflow;
```

## Bob Shell Integration

When a user asks about which workflow to use:

1. Analyze the change description for keywords
2. Determine if it's a current release update, minor/patch release, or major release
3. Provide the appropriate workflow with:
   - Target branch name pattern
   - Step-by-step instructions
   - Important notes and caveats

## Key Questions to Ask

If the workflow is unclear, ask the user:

1. **"Is this for content that's already published?"** → Current release workflow
2. **"Is this for an upcoming minor or patch release?"** → Minor release workflow
3. **"Is this for an upcoming major version?"** → Major release workflow
4. **"When should this content be published?"** → Helps determine timing

## Important Notes

- **Assembly branches** are created by tech writer teams for upcoming releases
- **Branch naming varies by product**: Some use version numbers (e.g., `consul/1.19.0`), others use dates (e.g., `vault/202511`)
- **Always confirm branch names** with the tech writer team before starting work
- **Embargoed content** should use the private `web-unified-docs-internal` repository
- **Multiple version updates**: If updating multiple versions, use the current release workflow and update all relevant version folders in one PR

## Contact Information

For questions about workflows or branch names, contact:
- Your product's tech writer team
- The #team-web-presence Slack channel
