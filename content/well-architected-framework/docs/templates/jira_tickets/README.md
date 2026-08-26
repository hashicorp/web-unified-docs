# JIRA Ticket Management

This folder contains everything needed to create and manage WAF JIRA tickets.

## Folder Structure

```
jira_tickets/
├── scripts/                      # JIRA ticket creation scripts and tools
│   ├── create_jira.sh           # Main ticket creation script
│   ├── convert_to_adf.py        # Converts plain text to JIRA format
│   ├── create_jira_ticket.sh    # Legacy script (uses template file)
│   └── JIRA_TEMPLATE.json       # JSON template (for legacy script)
├── description_template          # Template for ticket descriptions
├── your_ticket_descriptions...   # Your custom description files (gitignored)
└── README.md                     # This file
```

## Quick Start

1. **Copy the description template:**
   ```bash
   cp description_template my_article_name
   ```

2. **Edit your description file:**
   Fill in:
   - Requirements (what content the document should have)
   - Scope (limits and boundaries)
   - Example documents (links to similar WAF docs)
   - Links (Document URL, Design document URL)

3. **Create the JIRA ticket:**
   ```bash
   cd scripts
   ./create_jira.sh \
     -t "Your Article Title" \
     -p 2 \
     --products "Terraform, Vault, Packer" \
     -q 2 \
     --product-line Security \
     --pillar-label secure_systems \
     -d ../my_article_name
   ```

## Options Reference

### Pillar Options
- 1. Optimize Systems
- 2. Secure Systems
- 3. Define and Automate Processes
- 4. Design Resilient Systems

### Products
Choose relevant HashiCorp products (comma-separated):
- Terraform, Vault, Packer, Nomad, Consul, Boundary, Waypoint
- Default: All products listed
- Example: `--products "Terraform, Vault, Packer"`

### Label Options

**Quarter labels** (choose one):
- 1. 2026Q1   2. 2026Q2   3. 2026Q3
- 4. 2026Q4   5. 2027Q1   6. 2027Q2

**Product line labels** (choose one):
- 1. Security
- 2. IPL
- 3. Runtime
- 4. WAF

**Pillar labels** (choose one, typically matches your pillar choice):
- 1. optimize_systems
- 2. secure_systems
- 3. define_and_automate_systems
- 4. design_resilient_systems

**Note:** The `waf` label is always added automatically.

## Interactive Mode

If you don't provide command-line arguments, the script will prompt you for each option. Defaults:
- **Quarter**: 2026Q2
- **Product line**: WAF
- **Pillar label**: Auto-suggested based on pillar choice
- **Description file**: ../description_template

## Full Examples

**Example 1: Security article for Q2 2026**
```bash
cd scripts
./create_jira.sh \
  -t "Automate security configuration with CIS benchmarks" \
  -p "Secure Systems" \
  --products "Terraform, Vault, Packer" \
  -q "2026Q2" \
  --product-line "Security" \
  --pillar-label "secure_systems" \
  -d ../cis_benchmarks_description
```

**Example 2: Using numbers instead of names**
```bash
cd scripts
./create_jira.sh \
  -t "Design for high availability" \
  -p 4 \
  --products "Consul, Nomad" \
  -q 3 \
  --product-line 1 \
  --pillar-label 4 \
  -d ../ha_description
```
This creates: Pillar="Design Resilient Systems", Quarter="2026Q3", Product="Security", Label="design_resilient_systems"

**Example 3: Interactive mode**
```bash
cd scripts
./create_jira.sh
# Script will prompt for each option with helpful defaults
```

## Description File Format

Use simple plain text formatting:

- **Headings**: End lines with `:` (e.g., `Requirements:`)
- **Bullet lists**: Start lines with `- ` (e.g., `- First item`)
- **Code/files**: Wrap in backticks (e.g., `` `/templates/AGENTS.md` ``)
- **URLs**: Will be automatically converted to clickable links
- **Blank lines**: OK between list items - they won't break the list

See `description_template` for a complete example.

## Note

Individual description files (except `description_template`) are gitignored to prevent accidental commits of work-in-progress ticket descriptions.
