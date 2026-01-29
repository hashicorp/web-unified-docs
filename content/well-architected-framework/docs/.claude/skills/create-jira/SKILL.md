---
name: create-jira
description: Creates WAF JIRA tickets for documentation work using existing ticket infrastructure.
argument-hint: [ticket-details]
disable-model-invocation: true
---

# Create JIRA Skill

Creates WAF JIRA tickets for new documentation articles using the existing jira_tickets infrastructure. Guides through the process of defining requirements and submitting tickets.

## Usage

```bash
/create-jira [options]
```

## Arguments

- **--title** or **-t**: Article title (optional)
  - Example: `--title "Automate security with CIS benchmarks"`

- **--pillar** or **-p**: WAF pillar (optional)
  - Values: `1-4` or name
  - 1. Optimize Systems
  - 2. Secure Systems
  - 3. Define and Automate Processes
  - 4. Design Resilient Systems
  - Example: `--pillar 2` or `--pillar "Secure Systems"`

- **--products**: HashiCorp products (optional)
  - Comma-separated list
  - Default: All products
  - Example: `--products "Terraform, Vault, Packer"`

- **--quarter** or **-q**: Quarter label (optional)
  - Values: `1-6` or name (2026Q1-2027Q2)
  - Example: `--quarter 2` or `--quarter 2026Q2`

- **--product-line**: Product line label (optional)
  - Values: `1-4` or name
  - 1. Security, 2. IPL, 3. Runtime, 4. WAF
  - Example: `--product-line Security`

- **--pillar-label**: Pillar label (optional)
  - Values: `1-4` or name
  - 1. optimize_systems
  - 2. secure_systems
  - 3. define_and_automate_systems
  - 4. design_resilient_systems
  - Example: `--pillar-label secure_systems`

- **--interactive** or **-i**: Interactive mode (optional)
  - Guides through creating description file
  - Prompts for all fields
  - Recommended for first-time use

- **--description-file** or **-d**: Path to description file (optional)
  - Pre-written description file to use
  - Example: `--description-file jira_tickets/my_article`

- **--from-section**: Create ticket for new section doc (optional)
  - Used after `/new-section`
  - Example: `--from-section docs/security/authentication.mdx`

- **--preview**: Preview ticket without creating (optional)
  - Shows what would be submitted to JIRA
  - Useful for validation

## What This Skill Does

This skill streamlines the WAF JIRA ticket creation process by guiding through requirements definition and ticket submission.

### Ticket Creation Process

1. **Guidance Phase**
   - Helps define article requirements
   - Guides through target personas
   - Assists with scope definition
   - Suggests example documents

2. **Description File Creation**
   - Creates description file from template
   - Populates required sections:
     - Target personas (Decision-makers & Implementers)
     - Requirements
     - Scope
     - References to templates
     - Acceptance criteria
     - Links (Doc URL, Design doc, Workflow)

3. **Validation**
   - Ensures all required fields filled
   - Validates description completeness
   - Checks for example documents
   - Confirms links are provided

4. **JIRA Submission**
   - Calls existing `create_jira.sh` script
   - Converts description to ADF format
   - Creates ticket in WAF project
   - Returns ticket URL

5. **Integration**
   - Can create tickets after `/new-section`
   - Links to documentation workflow
   - References WAF templates (AGENTS.md, etc.)

## Examples

### Interactive mode (recommended for first use)
```bash
/create-jira --interactive
```
Guides through entire process with prompts.

### Quick ticket creation with command-line args
```bash
/create-jira \
  --title "Automate security with CIS benchmarks" \
  --pillar 2 \
  --products "Terraform, Vault, Packer" \
  --quarter 2 \
  --product-line Security \
  --pillar-label secure_systems
```

### Create ticket for new section document
```bash
# After creating section
/new-section docs/security --docs "authentication,secrets,rbac"

# Create ticket for one of the new docs
/create-jira --from-section docs/security/authentication.mdx --interactive
```

### Using existing description file
```bash
/create-jira \
  --title "High availability patterns" \
  --pillar 4 \
  --description-file jira_tickets/ha_description
```

### Preview before creating
```bash
/create-jira \
  --title "Module testing strategies" \
  --pillar 3 \
  --preview
```

## Output Format

### Interactive Mode

```
WAF JIRA Ticket Creator
=======================

This skill will guide you through creating a JIRA ticket for a new WAF documentation article.

Step 1: Basic Information
-------------------------

Article title: Automate security configuration with CIS benchmarks

WAF pillar:
  1. Optimize Systems
  2. Secure Systems
  3. Define and Automate Processes
  4. Design Resilient Systems

Choose pillar (1-4): 2
✓ Selected: Secure Systems

HashiCorp products (comma-separated) [All]: Terraform, Vault, Packer
✓ Products: Terraform, Vault, Packer

---

Step 2: Labels and Categorization
----------------------------------

Quarter:
  1. 2026Q1   2. 2026Q2   3. 2026Q3
  4. 2026Q4   5. 2027Q1   6. 2027Q2

Choose quarter (1-6) [2]: 2
✓ Selected: 2026Q2

Product line:
  1. Security   2. IPL   3. Runtime   4. WAF

Choose product line (1-4) [1]: 1
✓ Selected: Security

Pillar label:
  1. optimize_systems
  2. secure_systems
  3. define_and_automate_systems
  4. design_resilient_systems

Choose pillar label (1-4) [2]: 2
✓ Selected: secure_systems

---

Step 3: Description File
------------------------

Now let's create your description file.

Description file name [cis_benchmarks]: cis_benchmarks
✓ Creating: jira_tickets/cis_benchmarks

Opening editor to fill in requirements...
(Template loaded with guidance)

---

Description Template Guidance
==============================

Target personas:
----------------
Define what decision-makers and implementers need to learn.

Decision-makers (CTOs, architects, staff engineers):
- Understand WHY this matters strategically
- Learn the business value and risk mitigation
- See how it fits into broader architecture

Implementers (DevOps, platform engineers):
- Understand WHAT this is technically
- Learn HOW to implement it step-by-step
- Get links to hands-on tutorials and docs

Requirements:
-------------
List what content the document MUST include:
- Key concepts that must be explained
- Specific examples or code samples needed
- HashiCorp products/features to cover
- Links to tutorials or documentation

💡 Tip: Be specific! "Explain modules" → "Show Terraform module structure with 2-3 examples"

Scope:
------
Define boundaries - what's IN scope and OUT of scope:
- What topics are included
- What topics are explicitly excluded
- Level of detail (beginner, intermediate, advanced)
- Word count or size guidance

💡 Tip: Clear scope prevents scope creep!

Example documents:
------------------
List 2-3 similar WAF docs as reference:
- https://developer.hashicorp.com/well-architected-framework/...
- Links help writers understand style and depth

Links:
------
- Document URL: Where will this be published?
- Design document: Google doc with detailed design (if exists)
- Workflow outline: Link to workflow doc (auto-filled)

---

[Editor opens with template]

✓ Description file saved: jira_tickets/cis_benchmarks

---

Step 4: Review and Confirm
---------------------------

Ticket Summary:
===============

Title: Automate security configuration with CIS benchmarks
Pillar: Secure Systems
Products: Terraform, Vault, Packer
Quarter: 2026Q2
Product Line: Security
Pillar Label: secure_systems
Description: jira_tickets/cis_benchmarks

Target Personas:
- Decision-makers: Understand security automation value
- Implementers: Learn CIS benchmark implementation

Requirements:
- Explain what CIS benchmarks are
- Show Packer image hardening examples
- Demonstrate Terraform infrastructure compliance
- Link to Vault secrets management patterns

Scope:
- IN: CIS Level 1 benchmarks for common platforms
- OUT: Custom security frameworks, Level 2 benchmarks

Example Documents:
- https://developer.hashicorp.com/.../version-control.mdx
- https://developer.hashicorp.com/.../workflows.mdx

Acceptance Criteria:
✓ All requirements included
✓ Design doc checklist complete
✓ GitHub PR merged
✓ Merge validated

Create this ticket? [Y/n]: y

---

Step 5: Creating JIRA Ticket
-----------------------------

Checking JIRA credentials... ✓
Converting description to ADF format... ✓
Submitting to JIRA...

✓ Success!

JIRA Ticket Created:
====================

Issue Key: WAF-497
URL: https://hashicorp.atlassian.net/browse/WAF-497

Labels: 2026Q2, Security, secure_systems, waf
Priority: Medium
Type: Task

---

Next Steps
==========

1. Review ticket in JIRA: https://hashicorp.atlassian.net/browse/WAF-497
2. Add any additional notes or attachments
3. Assign to writer (if not already assigned)
4. Create design document and link in ticket
5. When ready to write, refer to templates:
   - /templates/doc-templates/DOCUMENT_TEMPLATE.md
   - /templates/AGENTS.md
   - /templates/REVIEW_PHASES.md

Quick start writing:
  /create-doc docs/security/cis-benchmarks.mdx --interactive
```

### Command-Line Mode

```
Creating WAF JIRA Ticket
=========================

Title: Automate security with CIS benchmarks
Pillar: Secure Systems
Products: Terraform, Vault, Packer
Description: jira_tickets/cis_benchmarks

Reading description file... ✓
Validating requirements... ✓
Checking JIRA credentials... ✓

Submitting to JIRA...
✓ Ticket created: WAF-497

URL: https://hashicorp.atlassian.net/browse/WAF-497
```

### From Section Mode

```
Creating JIRA Ticket from New Section
======================================

Detected new document: docs/security/authentication.mdx
Created by: /new-section

Extracting context from document...
✓ Title: Authentication and Identity
✓ Section: Security and Compliance
✓ Pillar: Secure Systems (inferred)

Suggested ticket details:
-------------------------
Title: Write Authentication and Identity documentation
Pillar: Secure Systems
Products: Vault, Boundary, Terraform
Quarter: 2026Q2

The document needs:
- Explanation of authentication vs authorization
- Identity provider integration patterns
- Vault authentication methods
- Example configurations
- Links to Vault and Boundary tutorials

Create description file with these suggestions? [Y/n]: y

Creating: jira_tickets/authentication_description
✓ Description file created with suggestions

Opening for editing...
[Editor opens]

✓ Description saved

Submitting to JIRA...
✓ Ticket created: WAF-498

URL: https://hashicorp.atlassian.net/browse/WAF-498
```

## Description File Template

The skill uses the existing `description_template` structure:

```
Target personas:

Decision-makers (CTOs, architects, staff engineers):
- [What they need to understand strategically]
- [Business value and risk mitigation]
- [How it fits broader architecture]

Implementers (DevOps, platform engineers):
- [What this is technically]
- [How to implement step-by-step]
- [Links to hands-on resources]

Requirements:
- [Key concepts to explain]
- [Specific examples needed]
- [Products/features to cover]
- [Tutorial/doc links required]

Scope:
- IN: [What's included]
- OUT: [What's excluded]
- Level: [Beginner/Intermediate/Advanced]

References:

Templates and resources:
- `/templates/WRITING_RESOURCES.md` - Overview of writing a WAF document
- `/templates/doc-templates/DOCUMENT_TEMPLATE.md` - Document structure and formatting
- `/templates/AGENTS.md` - Complete writing standards
- `/templates/REVIEW_PHASES.md` - Review process steps

Example documents:
- [Link to similar WAF doc 1]
- [Link to similar WAF doc 2]

Acceptance criteria:
- All requirements are included in the final doc
- All checklist items complete in design doc
- GitHub PR is merged
- Validate the merge was successful

Links:
- Document URL: https://developer.hashicorp.com/well-architected-framework/...
- Design document: [Google doc URL]
- Workflow outline: https://docs.google.com/document/d/1y_zLgXrHzM1a1426-Dr33iqKgQozpH27wszO6S9eEoE/edit?tab=t.0#heading=h.61v0btrzubas
```

## Prerequisites

**Environment variables required:**
```bash
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your-api-token"
```

Get API token at: https://id.atlassian.com/manage-profile/security/api-tokens

**Tools required:**
- `python3` - For ADF format conversion
- `jq` - For JSON processing
- `curl` - For JIRA API calls

## Integration with Other Skills

### New Section Workflow

```bash
# 1. Create section structure
/new-section docs/security --docs "authentication,authorization,secrets"

# 2. Create JIRA tickets for each document
/create-jira --from-section docs/security/authentication.mdx --interactive
/create-jira --from-section docs/security/authorization.mdx --interactive
/create-jira --from-section docs/security/secrets.mdx --interactive

# 3. Assign tickets and start writing
```

### Complete Documentation Workflow

```bash
# 1. Create JIRA ticket with requirements
/create-jira --interactive

# 2. Create documentation file
/create-doc docs/security/cis-benchmarks.mdx --interactive

# 3. Write content (manual)

# 4. Enhance and validate
/add-resources docs/security/cis-benchmarks.mdx --add
/check-style docs/security/cis-benchmarks.mdx --fix
/review docs/security/cis-benchmarks.mdx

# 5. Update JIRA ticket with PR link
# (Manual in JIRA)
```

## Ticket Structure

The skill creates tickets with:

**Fixed Fields:**
- Project: WAF
- Issue Type: Task
- Priority: Medium
- Reporter: (configured in script)

**Variable Fields:**
- Summary: Your article title
- Description: From description file (ADF format)
- Labels: Quarter, Product Line, Pillar Label, waf
- Assignee: (optional)

**Description Sections:**
- Title, Location, Stakeholder, Pillar, Products
- Target personas (Decision-makers & Implementers)
- Requirements
- Scope
- References (to WAF templates)
- Example documents
- Acceptance criteria
- Links (Doc URL, Design doc, Workflow)

## Tips for Good Ticket Descriptions

**Target Personas:**
- Be specific about what each persona needs
- Decision-makers: Strategic value, business impact
- Implementers: Technical details, how-to steps

**Requirements:**
- Use bullet points for clarity
- Be specific: "Show 3 Terraform examples" not "Explain Terraform"
- Include links to relevant product docs

**Scope:**
- Explicitly state IN and OUT of scope
- Prevents scope creep during writing
- Helps reviewers validate completeness

**Example Documents:**
- Link to 2-3 similar WAF docs
- Helps writers understand style and depth
- Shows expected level of detail

## When to Use This Skill

Use `/create-jira` when:
- ✅ Planning new WAF documentation article
- ✅ After creating section structure with `/new-section`
- ✅ Need to track documentation work in JIRA
- ✅ Coordinating with team on documentation

Don't use `/create-jira` when:
- ❌ Tracking bugs or review findings (different workflow)
- ❌ Documentation already exists (use update instead)
- ❌ Making minor edits (no ticket needed)

## Technical Details

**Uses existing infrastructure:**
- Scripts: `jira_tickets/scripts/create_jira.sh`
- Template: `jira_tickets/description_template`
- Converter: `jira_tickets/scripts/convert_to_adf.py`

**JIRA API:**
- Endpoint: `https://hashicorp.atlassian.net/rest/api/3/issue`
- Format: Atlassian Document Format (ADF)
- Authentication: Email + API token

**File Locations:**
- Description files: `jira_tickets/` (gitignored except template)
- Scripts: `jira_tickets/scripts/`
- Template: `jira_tickets/description_template`

## Reference Files

This skill uses:
- **`jira_tickets/scripts/create_jira.sh`** - Main ticket creation script
- **`jira_tickets/scripts/convert_to_adf.py`** - Plain text to ADF converter
- **`jira_tickets/description_template`** - Ticket description template
- **`jira_tickets/README.md`** - JIRA ticket management documentation

## Notes

- Wraps existing JIRA infrastructure with better UX
- Description files are gitignored (except template)
- Supports both interactive and command-line modes
- Validates description completeness before submission
- Links to WAF documentation templates
- Can extract context from `/new-section` created files
- Always adds 'waf' label automatically
- Tickets created as Medium priority by default
- Uses Atlassian Document Format (ADF) for rich formatting
