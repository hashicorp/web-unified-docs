#!/bin/bash

# Content API redirect checker - validates redirects and detects daisy chains
# Usage: ./check_redirects.sh [BASE_URL] [PRODUCTS]
# Requirements: jq, curl

set -e

# Configuration
BASE_URL="${BASE_URL:-http://localhost:8080}"
PRODUCTS="${PRODUCTS:-}"

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Temporary directory
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Logging functions
log() { echo -e "${BLUE}[INFO]${NC} $1" >&2; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1" >&2; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; exit 1; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1" >&2; }

# Check API health
check_api() {
    log "Checking API at $BASE_URL"
    curl -s --max-time 10 "$BASE_URL" > /dev/null || error "API not accessible"
    success "API accessible"
}

# Get product list
get_products() {
    if [ -n "$PRODUCTS" ]; then
        echo "$PRODUCTS" | tr ',' ' '
    elif [ -d "content" ]; then
        find content -maxdepth 1 -type d -not -name ".*" -not -name "content" -exec basename {} \;
    else
        echo "terraform vault consul nomad boundary waypoint packer vagrant"
    fi
}

# Fetch redirects for a product
fetch_redirects() {
    local product="$1"
    local response=$(curl -s "$BASE_URL/api/content/$product/redirects" 2>/dev/null || echo "")
    
    if echo "$response" | jq empty >/dev/null 2>&1; then
        echo "$response" > "$TEMP_DIR/${product}.json"
        local count=$(jq 'length' "$TEMP_DIR/${product}.json")
        success "Fetched $count redirects for $product"
        return 0
    else
        warn "No redirects for $product"
        return 1
    fi
}

# Check if destination exists
check_destination() {
    local path="$1"
    local all_docs="$TEMP_DIR/all_docs.json"
    
    # Skip if path is too short or all_docs not loaded
    [ ${#path} -gt 1 ] && [ -f "$all_docs" ] || return 1
    
    # Remove leading slash and check if path exists
    jq -e --arg p "${path#/}" '.result[] | select(.path == $p)' "$all_docs" >/dev/null 2>&1
}

# Main validation
validate_all() {
    log "Validating redirects and detecting daisy chains..."
    
    # Load all docs paths
    curl -s "$BASE_URL/api/all-docs-paths" > "$TEMP_DIR/all_docs.json" || error "Failed to fetch docs paths"
    
    # Combine all redirects and detect daisy chains
    local all_redirects="$TEMP_DIR/all.json"
    local redirect_files=($(find "$TEMP_DIR" -name "*.json" -not -name "all_docs.json" -not -name "all.json"))
    
    if [ ${#redirect_files[@]} -gt 0 ]; then
        jq -s 'add' "${redirect_files[@]}" > "$all_redirects" 2>/dev/null || warn "Failed to combine redirect files"
        
        # Find destinations that are also sources (potential daisy chains)
        local daisy_chains=""
        local chain_points
        chain_points=$(jq -r '.[] | .destination' "$all_redirects" | sort | uniq -d 2>/dev/null || echo "")
        
        if [ -n "$chain_points" ]; then
            while IFS= read -r point; do
                [ -n "$point" ] && daisy_chains+="$point"$'\n'
            done <<< "$chain_points"
        fi
        
        # Store daisy chains
        echo "$daisy_chains" > "$TEMP_DIR/daisy"
    else
        warn "No redirect files found to analyze"
        echo "" > "$all_redirects"
        echo "" > "$TEMP_DIR/daisy"
    fi
    
    # Validate each redirect
    local valid=0 total=0 broken=()
    
    for product_file in "$TEMP_DIR"/*.json; do
        [ "$(basename "$product_file")" = "all_docs.json" ] && continue
        [ "$(basename "$product_file")" = "all.json" ] && continue
        
        local product=$(basename "$product_file" .json)
        log "Validating $product redirects"
        
        while IFS= read -r dest; do
            total=$((total + 1))
            if check_destination "$dest"; then
                valid=$((valid + 1))
            else
                broken+=("$product:$dest")
            fi
        done < <(jq -r '.[] | .destination' "$product_file")
    done
    
    # Store results
    echo "$valid" > "$TEMP_DIR/valid"
    echo "$total" > "$TEMP_DIR/total"
    printf '%s\n' "${broken[@]}" > "$TEMP_DIR/broken"
    
    success "Validation complete: $valid/$total redirects valid"
}

# Generate reports
generate_report() {
    local valid=$(cat "$TEMP_DIR/valid")
    local total=$(cat "$TEMP_DIR/total")
    local broken_count=$((total - valid))
    local daisy_count=$(wc -l < "$TEMP_DIR/daisy" 2>/dev/null || echo "0")
    
    echo "=========================================="
    echo "REDIRECT ANALYSIS REPORT"
    echo "=========================================="
    echo "Total: $total | Valid: $valid | Broken: $broken_count | Daisy chains: $daisy_count"
    echo
    
    [ -s "$TEMP_DIR/broken" ] && {
        echo "BROKEN REDIRECTS:"
        while IFS=: read -r p d; do echo "  $p: $d"; done < "$TEMP_DIR/broken"
        echo
    }
    
    [ "$daisy_count" -gt 0 ] && {
        echo "DAISY CHAIN POINTS:"
        while read -r point; do
            [ -n "$point" ] && echo "  $point"
        done < "$TEMP_DIR/daisy"
    }
}

# Main execution
main() {
    log "Starting redirect analysis"
    check_api
    
    local products=($(get_products))
    local successful=()
    
    for p in "${products[@]}"; do
        fetch_redirects "$p" && successful+=("$p")
    done
    
    [ ${#successful[@]} -eq 0 ] && success "No products with redirects found"
    success "Processing ${#successful[@]} products"
    
    validate_all
    generate_report
    success "Analysis complete"
}

main "$@"
