#!/bin/bash

# WAF JIRA Ticket Creation Script
# Creates a JIRA ticket from template with variable substitution

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fixed workflow URL
WORKFLOW_URL="https://docs.google.com/document/d/1y_zLgXrHzM1a1426-Dr33iqKgQozpH27wszO6S9eEoE/edit?tab=t.0#heading=h.61v0btrzubas"

# Check prerequisites
if [[ -z "$JIRA_EMAIL" ]] || [[ -z "$JIRA_API_TOKEN" ]]; then
    echo -e "${RED}Error: JIRA credentials not set${NC}"
    echo "Please set the following environment variables:"
    echo "  export JIRA_EMAIL=\"your-email@ibm.com\""
    echo "  export JIRA_API_TOKEN=\"your-api-token\""
    echo ""
    echo "Generate an API token at: https://id.atlassian.com/manage-profile/security/api-tokens"
    exit 1
fi

# Check for required tools
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: python3 is required but not installed${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is required but not installed${NC}"
    echo "Install jq with:"
    echo "  macOS: brew install jq"
    echo "  Linux: sudo apt-get install jq"
    exit 1
fi

# Function to prompt for input with default
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local result

    if [[ -n "$default" ]]; then
        read -p "$prompt [$default]: " result
        echo "${result:-$default}"
    else
        read -p "$prompt: " result
        echo "$result"
    fi
}

# Parse command line arguments
TITLE=""
PILLAR=""
PRODUCTS=""
DESCRIPTION_FILE=""
ASSIGNEE_ID=""
QUARTER=""
PRODUCT_LINE=""
PILLAR_LABEL=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--title)
            TITLE="$2"
            shift 2
            ;;
        -p|--pillar)
            PILLAR="$2"
            shift 2
            ;;
        --products)
            PRODUCTS="$2"
            shift 2
            ;;
        -d|--description-file)
            DESCRIPTION_FILE="$2"
            shift 2
            ;;
        -a|--assignee)
            ASSIGNEE_ID="$2"
            shift 2
            ;;
        -q|--quarter)
            QUARTER="$2"
            shift 2
            ;;
        --product-line)
            PRODUCT_LINE="$2"
            shift 2
            ;;
        --pillar-label)
            PILLAR_LABEL="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -t, --title TEXT          Article title"
            echo "  -p, --pillar TEXT         WAF pillar name (or number 1-4)"
            echo "  --products TEXT           HashiCorp products (comma-separated)"
            echo "  -d, --description-file    Path to description file"
            echo "  -a, --assignee ID         Assignee user ID (optional)"
            echo "  -q, --quarter TEXT        Quarter label (or number 1-6)"
            echo "  --product-line TEXT       Product line label (or number 1-4)"
            echo "  --pillar-label TEXT       Pillar label (or number 1-4)"
            echo "  -h, --help                Show this help message"
            echo ""
            echo "Pillar options:"
            echo "  1. Optimize Systems"
            echo "  2. Secure Systems"
            echo "  3. Define and Automate Processes"
            echo "  4. Design Resilient Systems"
            echo ""
            echo "Products (comma-separated):"
            echo "  Terraform, Vault, Packer, Nomad, Consul, Boundary, Waypoint"
            echo ""
            echo "Quarter label options:"
            echo "  1. 2026Q1   2. 2026Q2   3. 2026Q3"
            echo "  4. 2026Q4   5. 2027Q1   6. 2027Q2"
            echo ""
            echo "Product line label options:"
            echo "  1. Security   2. IPL   3. Runtime   4. WAF"
            echo ""
            echo "Pillar label options:"
            echo "  1. optimize_systems"
            echo "  2. secure_systems"
            echo "  3. define_and_automate_systems"
            echo "  4. design_resilient_systems"
            echo ""
            echo "Example:"
            echo "  cd jira_tickets/scripts"
            echo "  ./create_jira.sh \\"
            echo "    -t \"Automate security with CIS benchmarks\" \\"
            echo "    -p 2 \\"
            echo "    --products \"Terraform, Vault, Packer\" \\"
            echo "    -q 2 \\"
            echo "    --product-line Security \\"
            echo "    --pillar-label secure_systems \\"
            echo "    -d ../my_description"
            echo ""
            echo "Note: 'waf' label is always added automatically."
            echo "If options are not provided, the script will prompt interactively."
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Interactive prompts for missing values
echo -e "${GREEN}WAF JIRA Ticket Creator${NC}"
echo ""

if [[ -z "$TITLE" ]]; then
    TITLE=$(prompt_with_default "Article title" "")
fi

if [[ -z "$PILLAR" ]]; then
    echo ""
    echo "Available pillars:"
    echo "  1. Optimize Systems"
    echo "  2. Secure Systems"
    echo "  3. Define and Automate Processes"
    echo "  4. Design Resilient Systems"
    PILLAR=$(prompt_with_default "WAF pillar (name or number)" "")

    # Convert number to pillar name
    case $PILLAR in
        1) PILLAR="Optimize Systems" ;;
        2) PILLAR="Secure Systems" ;;
        3) PILLAR="Define and Automate Processes" ;;
        4) PILLAR="Design Resilient Systems" ;;
    esac
fi

if [[ -z "$PRODUCTS" ]]; then
    PRODUCTS=$(prompt_with_default "HashiCorp products (comma-separated)" "Terraform, Vault, Packer, Nomad, Consul, Boundary, Waypoint")
fi

# Prompt for labels
if [[ -z "$QUARTER" ]]; then
    echo ""
    echo "Available quarters:"
    echo "  1. 2026Q1   2. 2026Q2   3. 2026Q3"
    echo "  4. 2026Q4   5. 2027Q1   6. 2027Q2"
    QUARTER=$(prompt_with_default "Quarter (name or number)" "2")

    # Convert number to quarter label
    case $QUARTER in
        1) QUARTER="2026Q1" ;;
        2) QUARTER="2026Q2" ;;
        3) QUARTER="2026Q3" ;;
        4) QUARTER="2026Q4" ;;
        5) QUARTER="2027Q1" ;;
        6) QUARTER="2027Q2" ;;
    esac
fi

if [[ -z "$PRODUCT_LINE" ]]; then
    echo ""
    echo "Available product lines:"
    echo "  1. Security   2. IPL   3. Runtime   4. WAF"
    PRODUCT_LINE=$(prompt_with_default "Product line (name or number)" "4")

    # Convert number to product line label
    case $PRODUCT_LINE in
        1) PRODUCT_LINE="Security" ;;
        2) PRODUCT_LINE="IPL" ;;
        3) PRODUCT_LINE="Runtime" ;;
        4) PRODUCT_LINE="WAF" ;;
    esac
fi

if [[ -z "$PILLAR_LABEL" ]]; then
    echo ""
    echo "Available pillar labels:"
    echo "  1. optimize_systems"
    echo "  2. secure_systems"
    echo "  3. define_and_automate_systems"
    echo "  4. design_resilient_systems"

    # Try to suggest based on pillar name if set
    DEFAULT_PILLAR_LABEL=""
    case $PILLAR in
        "Optimize Systems") DEFAULT_PILLAR_LABEL="1" ;;
        "Secure Systems") DEFAULT_PILLAR_LABEL="2" ;;
        "Define and Automate Processes") DEFAULT_PILLAR_LABEL="3" ;;
        "Design Resilient Systems") DEFAULT_PILLAR_LABEL="4" ;;
    esac

    if [[ -n "$DEFAULT_PILLAR_LABEL" ]]; then
        PILLAR_LABEL=$(prompt_with_default "Pillar label (name or number)" "$DEFAULT_PILLAR_LABEL")
    else
        PILLAR_LABEL=$(prompt_with_default "Pillar label (name or number)" "")
    fi

    # Convert number to pillar label
    case $PILLAR_LABEL in
        1) PILLAR_LABEL="optimize_systems" ;;
        2) PILLAR_LABEL="secure_systems" ;;
        3) PILLAR_LABEL="define_and_automate_systems" ;;
        4) PILLAR_LABEL="design_resilient_systems" ;;
    esac
fi

if [[ -z "$DESCRIPTION_FILE" ]]; then
    DESCRIPTION_FILE=$(prompt_with_default "Description file path" "../description_template")
fi

# Check if description file exists
if [[ ! -f "$DESCRIPTION_FILE" ]]; then
    echo -e "${RED}Error: Description file not found: $DESCRIPTION_FILE${NC}"
    echo ""
    echo "To create a description file:"
    echo "  1. Copy the template: cp ../description_template ../my_description"
    echo "  2. Edit the file: vim ../my_description"
    echo "  3. Run this script again with: -d ../my_description"
    exit 1
fi

if [[ -z "$ASSIGNEE_ID" ]]; then
    read -p "Assignee user ID (press Enter to skip): " ASSIGNEE_ID
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if Python converter exists
if [[ ! -f "$SCRIPT_DIR/convert_to_adf.py" ]]; then
    echo -e "${RED}Error: convert_to_adf.py not found${NC}"
    echo "Please ensure convert_to_adf.py is in the same directory as this script"
    exit 1
fi

# Convert description file to ADF format
DESCRIPTION_ADF=$(python3 "$SCRIPT_DIR/convert_to_adf.py" "$DESCRIPTION_FILE")
if [[ $? -ne 0 ]]; then
    echo -e "${RED}Error: Failed to convert description to ADF format${NC}"
    exit 1
fi

# Extract the content array from the description ADF
DESCRIPTION_CONTENT=$(echo "$DESCRIPTION_ADF" | jq -c '.content')

# Build the header section
HEADER_CONTENT='[
  {
    "type": "paragraph",
    "content": [
      {"type": "text", "text": "Title: ", "marks": [{"type": "strong"}]},
      {"type": "text", "text": "'"$TITLE"'"}
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {"type": "text", "text": "Location: ", "marks": [{"type": "strong"}]},
      {"type": "text", "text": "WAF/Docs"}
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {"type": "text", "text": "Stakeholder: ", "marks": [{"type": "strong"}]},
      {"type": "text", "text": "NA"}
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {"type": "text", "text": "WAF pillar: ", "marks": [{"type": "strong"}]},
      {"type": "text", "text": "'"$PILLAR"'"}
    ]
  },
  {
    "type": "paragraph",
    "content": [
      {"type": "text", "text": "Products: ", "marks": [{"type": "strong"}]},
      {"type": "text", "text": "'"$PRODUCTS"'"}
    ]
  },
  {
    "type": "rule"
  }
]'

# Combine header and description content
COMBINED_CONTENT=$(jq -n --argjson header "$HEADER_CONTENT" --argjson desc "$DESCRIPTION_CONTENT" '$header + $desc')

# Build the complete description in ADF format
DESCRIPTION_JSON=$(jq -n --argjson content "$COMBINED_CONTENT" '{
  "version": 1,
  "type": "doc",
  "content": $content
}')

# Build labels array
LABELS_JSON=$(jq -n \
  --arg quarter "$QUARTER" \
  --arg product "$PRODUCT_LINE" \
  --arg pillar "$PILLAR_LABEL" \
  '[$quarter, $product, $pillar, "waf"]')

# Create JIRA issue JSON
ISSUE_JSON=$(cat <<EOF
{
  "fields": {
    "project": {
      "key": "WAF"
    },
    "summary": "$TITLE",
    "description": $DESCRIPTION_JSON,
    "issuetype": {
      "name": "Task"
    },
    "priority": {
      "name": "Medium"
    },
    "reporter": {
      "id": "627a65e0f29dcb0068f86381"
    },
    "labels": $LABELS_JSON
  }
}
EOF
)

# Add assignee if provided
if [[ -n "$ASSIGNEE_ID" ]]; then
    ISSUE_JSON=$(echo "$ISSUE_JSON" | jq --arg assignee "$ASSIGNEE_ID" '.fields.assignee = {"id": $assignee}')
fi

# Display summary
echo ""
echo -e "${GREEN}Creating JIRA ticket with:${NC}"
echo "  Title: $TITLE"
echo "  Pillar: $PILLAR"
echo "  Products: $PRODUCTS"
echo "  Description file: $DESCRIPTION_FILE"
echo "  Assignee: ${ASSIGNEE_ID:-Not set}"
echo "  Labels: $QUARTER, $PRODUCT_LINE, $PILLAR_LABEL, waf"
echo ""

# Create temporary file with the JSON
TEMP_FILE=$(mktemp)
echo "$ISSUE_JSON" > "$TEMP_FILE"

# Create JIRA ticket
echo "Submitting to JIRA..."
RESPONSE=$(curl -s -w "\n%{http_code}" --request POST \
  --url 'https://hashicorp.atlassian.net/rest/api/3/issue' \
  --user "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data @"$TEMP_FILE")

# Parse response
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

# Clean up temp file
rm "$TEMP_FILE"

# Check response
if [[ "$HTTP_CODE" == "201" ]]; then
    ISSUE_KEY=$(echo "$BODY" | grep -o '"key":"[^"]*"' | head -1 | cut -d'"' -f4)
    ISSUE_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

    echo -e "${GREEN}✓ Success!${NC}"
    echo "  Issue Key: $ISSUE_KEY"
    echo "  URL: https://hashicorp.atlassian.net/browse/$ISSUE_KEY"
else
    echo -e "${RED}✗ Failed to create ticket${NC}"
    echo "  HTTP Code: $HTTP_CODE"
    echo "  Response: $BODY"
    exit 1
fi
