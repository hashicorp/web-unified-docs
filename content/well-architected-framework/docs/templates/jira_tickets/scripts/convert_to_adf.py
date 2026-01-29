#!/usr/bin/env python3
"""
Convert plain text description to JIRA ADF (Atlassian Document Format)
"""

import json
import sys
import re

def parse_inline_content(text):
    """Parse inline content (URLs, code blocks) and return ADF content array"""
    content = []

    # Pattern to match URLs
    url_pattern = r'(https?://[^\s]+)'

    # Pattern to match code blocks (backticks)
    parts = re.split(r'(`[^`]+`)', text)

    for part in parts:
        if not part:
            continue

        # Handle code blocks
        if part.startswith('`') and part.endswith('`'):
            content.append({
                "type": "text",
                "text": part[1:-1],
                "marks": [{"type": "code"}]
            })
        else:
            # Check for URLs in this part
            url_parts = re.split(url_pattern, part)
            for url_part in url_parts:
                if not url_part:
                    continue
                if re.match(url_pattern, url_part):
                    # Create a hyperlink
                    content.append({
                        "type": "text",
                        "text": url_part,
                        "marks": [{
                            "type": "link",
                            "attrs": {"href": url_part}
                        }]
                    })
                else:
                    # Regular text
                    content.append({"type": "text", "text": url_part})

    return content if content else [{"type": "text", "text": text}]


def parse_line(line):
    """Parse a line and return appropriate ADF node"""
    line = line.rstrip()

    # Empty line
    if not line:
        return None

    # Bullet list item (starts with -)
    if line.startswith('- '):
        content_text = line[2:]
        return {
            "type": "listItem",
            "content": [{
                "type": "paragraph",
                "content": parse_inline_content(content_text)
            }]
        }

    # Heading (ends with :)
    if line.endswith(':') and not line.startswith(' '):
        return {
            "type": "heading",
            "attrs": {"level": 3},
            "content": [{"type": "text", "text": line}]
        }

    # Regular paragraph with inline content (URLs, code blocks)
    return {
        "type": "paragraph",
        "content": parse_inline_content(line)
    }

def convert_to_adf(text_content):
    """Convert plain text to ADF format"""
    lines = text_content.split('\n')
    content = []
    current_list = []
    i = 0

    while i < len(lines):
        line = lines[i]
        node = parse_line(line)

        if node is None:
            # Empty line - check if there are more list items ahead
            if current_list:
                # Look ahead to see if another list item is coming
                has_more_list_items = False
                for j in range(i + 1, len(lines)):
                    next_line = lines[j].strip()
                    if not next_line:
                        continue  # Skip more empty lines
                    if next_line.startswith('- '):
                        has_more_list_items = True
                    break

                # If no more list items, close the list
                if not has_more_list_items:
                    content.append({
                        "type": "bulletList",
                        "content": current_list
                    })
                    current_list = []
            i += 1
            continue

        # Handle list items
        if node["type"] == "listItem":
            current_list.append(node)
        else:
            # Close any open list
            if current_list:
                content.append({
                    "type": "bulletList",
                    "content": current_list
                })
                current_list = []
            content.append(node)

        i += 1

    # Close any remaining list
    if current_list:
        content.append({
            "type": "bulletList",
            "content": current_list
        })

    return {
        "version": 1,
        "type": "doc",
        "content": content
    }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: convert_to_adf.py <description_file>", file=sys.stderr)
        sys.exit(1)

    description_file = sys.argv[1]

    try:
        with open(description_file, 'r') as f:
            content = f.read()

        adf = convert_to_adf(content)
        print(json.dumps(adf, indent=2))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
