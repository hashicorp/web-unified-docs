---
name: create-style-guide-checklist
description: Create a checklist from the latest version of the style guide. Manually invoked. Do NOT load this skill automatically. Only load when the user explicitly runs /create-style-guide-checklist. The checklist may be used as an input to other skills.
---

# Style guide checklist creation skill

The style guide is key to maintaining a consistent voice on developer.hashicorp.com. The source of truth is `/docs/style-guide`. Keeping checklists derived from the style guide elsewhere is likely to create future inconsistencies. To avoid that, this skill provides a consistent way to extract a checklist from the latest version of the style guide.

The user has the option to create a FULL checklist or a SUMMARIZED checklist.  If an option is not specified, assume SUMMARIZED.

The FULL checklist is a one-to-one mapping of checklist items to source style guide rules.  The SUMMARIZED checklist combines similar rules and may be more useful for humans to run through quickly.

---

## Step by step process

Follow these steps in order. Do not skip any steps.

### Step 1:  Read the Style Guide

Before doing anything else, read these files in full:
1. **Style guide**: `/docs/style-guide`, all `.md` files in all directories and subdirectories.
2. **Top 12**: `/docs/style-guide/top-12.md`, contains a summary of the most common and important style guide rules.

**Error handling**:  If any path or file cannot be found, stop the process and report the missing path to the user.

### Step 2:  Create checklist categories

Tasks in this step vary based on whether you are creating a FULL or SUMMARIZED checklist.

#### FULL checklist steps

Each style guide file is a category.  "Top 12" is the first category.

For each style guide file (i.e., category), add each rule in the source file to the checklist.

Report to the user that you are creating a full checklist, so each style guide file is a category.

#### SUMMARIZED checklist steps

Based on the files, divide style guide rules into categories. Categories should be focused, distinctive, minimizing overlap, and cohesive. Create between 5 and 15 categories, preferably between 7-11.  Consider a "Top 12" category, though it is not mandatory and should not be used if it causes other categories to be less coherent.

Report the categories to the user.

**Error handling**:  If the style guide rules will require fewer than 5 categories or more than 15, stop the process and report the issue to the user.

### Step 3:  Output checklist

Tasks in this step vary based on whether you are creating a FULL or SUMMARIZED checklist.

#### FULL checklist steps

Output the checklist items in a checklist format.  Each category name (which should be derived from the source style guide file) should be a heading.  Each checklist item should be a bulleted item and begin with a checkbox (in markdown, that would look like `- [ ] Checklist item`).

#### SUMMARIZED checklist steps

Allocate the style guide rules into the categories identified in Step 2. Please coalesce similar or related style guide directives into a single checklist item, unless significant meaning is lost in doing so. Ensure that each of the style guide items from the Top 12 is clearly represented and not coalesced.

Output the checklist items in a checklist format.  Each descriptive category name should be a heading.  Each checklist item should be a bulleted item and begin with a checkbox (in markdown, that would look like `- [ ] Checklist item`).

**Error handling**:  If any checklist category contains a disproportionately large number of rules, return to Step 2 and try again to create categories.  If you have already regenerated categories once, stop the process and inform the user.

### Step 4:  Check rule traceability

Compare the generated checklist items to the style guide.  Flag any generated checklist items that cannot be clearly traced back to the style guide.  

If any items were flagged as not being traceable, report to the user `❌❌ At least one generated rule was made up ❌❌`.

Now compare the style guide to the generated checklist items.  Flag any style guide rules that are not represented in the generated checklist.

If any items were flagged as not represented in the checklist, report to the user `❌❌ At least one style guide rule was left out ❌❌`.

If no items were flagged as not being traceable AND no items were flagged as not represented in the checklist, report to the user that you have compared the checklist to the style guide, and that the results look accurate.

### Step 5:  Offer to create a markdown file

Ask the user if they would like the checklist output to a markdown file, and prompt them for the location.

## Additional Rules

- Do not modify any style guide files.
- If any style guide rules appear to contradict each other, flag the conflict to the user.
- Do not invent style guide rules. There are enough already without making any up.
- If the style guide is ambiguous about its requirements, flag the ambiguity to the user.
- If any style guide examples (positive or negative) do not seem to support the rule they are supposed to illustrate, flag the issue to the user.
