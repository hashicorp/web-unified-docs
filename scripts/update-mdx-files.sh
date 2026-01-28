#!/bin/bash
# Copyright IBM Corp. 2024, 2025
# SPDX-License-Identifier: BUSL-1.1

# Check if a path was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a directory path."
  echo "Usage: $0 /path/to/directory"
  exit 1
fi

DIR_PATH="$1"

# Check if the provided path exists and is a directory
if [ ! -d "$DIR_PATH" ]; then
  echo "Error: '$DIR_PATH' is not a valid directory."
  exit 1
fi

# Create notification text file
NOTIFICATION_FILE=$(mktemp)
cat > "$NOTIFICATION_FILE" << 'EOF'

⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
> [!IMPORTANT]  
> **Documentation Update:** Product documentation previously located in `/website` has moved to the [`hashicorp/web-unified-docs`](https://github.com/hashicorp/web-unified-docs) repository, where all product documentation is now centralized. Please make contributions directly to `web-unified-docs`, since changes to `/website` in this repository will not appear on developer.hashicorp.com.
⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
EOF

# Counters for statistics
TOTAL_COUNT=0
UPDATED_COUNT=0
NO_FRONTMATTER_COUNT=0
ERROR_COUNT=0

# Save the current position for updating the stats in place
echo -e "Progress:\n"
echo -e "Files processed: 0\nFiles updated: 0\nFiles with no frontmatter: 0\nFiles with errors: 0"
STATS_LINE=$(tput lines)
STATS_LINE=$((STATS_LINE - 5))

update_stats() {
  tput cup $STATS_LINE 0
  echo -e "Files processed: $TOTAL_COUNT\nFiles updated: $UPDATED_COUNT\nFiles with no frontmatter: $NO_FRONTMATTER_COUNT\nFiles with errors: $ERROR_COUNT"
}

# Find all .mdx files in the provided directory (recursively)
find "$DIR_PATH" -type f -name "*.mdx" | while read -r FILE; do
  ((TOTAL_COUNT++))
  
  # Check if the file contains frontmatter (marked by ---)
  if grep -q "^---" "$FILE" 2>/dev/null; then
    # Create a temporary file
    TMP_FILE=$(mktemp)
    
    # Find the line number of the second occurrence of ---
    SECOND_MARKER=$(grep -n "^---" "$FILE" | sed -n '2p' | cut -d: -f1)
    
    if [ -n "$SECOND_MARKER" ]; then
      # Split the file at the second occurrence of ---
      if head -n "$SECOND_MARKER" "$FILE" > "$TMP_FILE" && \
         cat "$NOTIFICATION_FILE" >> "$TMP_FILE" && \
         tail -n +$((SECOND_MARKER + 1)) "$FILE" >> "$TMP_FILE" && \
         mv "$TMP_FILE" "$FILE"; then
        ((UPDATED_COUNT++))
      else
        echo "Error: Failed to update: $FILE"
        ((ERROR_COUNT++))
        rm -f "$TMP_FILE"
      fi
    else
      echo "Error: Could not find second frontmatter marker in: $FILE"
      ((ERROR_COUNT++))
      rm -f "$TMP_FILE"
    fi
  else
    ((NO_FRONTMATTER_COUNT++))
  fi
  
  # Update the stats display
  update_stats
done

# Remove the temporary notification file
rm "$NOTIFICATION_FILE"

# Move cursor past the stats for the final message
tput cup $((STATS_LINE + 5)) 0
echo -e "\nCompleted! All MDX files have been processed."