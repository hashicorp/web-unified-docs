---
name: branch-user-context-check
description: Compares the likely reader profile with the context needed to make sense of a page, for all files changed in a branch. Manually invoked. Do NOT load this skill automatically. Only load when the user explicitly runs /branch-user-context-check. 
---

# User Context Checking for Branch skill

Technical documentation targets users with a minimum level of technical skill, knowledge, and context around a topic.  If a reader lacks the necessary skill, knowledge, or context, the documentation will not be useful to the reader, and the reader may be confused.  This is undesirable. 

Edits are typically made on a branch before merging, so this skill will usually evaluate a complete change to documentation for a given topic.

---

## Step by step process

### Step 1:  Generate List of Changed Files

Generate a list of files that have changed on the current branch.  If the user allows, use `git diff --name-only main` to generate the list.

Report the list of changed files to the user.

**Error handling**:  If this is running on `main`, stop the process and report the issue to the user.

### Step 2:  Evaluate reader and needed context

For each of those files, please
1. Read the file
2. Analyze the intended reader of the file:  their expertise, their background, and their context.  Keep the reader profile to a few sentences or bullet points.
3. Analyze the context and background the reader would need to make sense of the instructions in the file.
4. Summarize the intended reader to the user.
5. Summarize the necessary context and background a reader would need to the user.
6. Compare the results of #2 with #3 to identify any gaps.
7. Rate the gaps on a scale from 1-5, where 1 means no or very small gaps, and 5 is a large gap between the reader profile and what is needed. Use an appropriate emoji.

**Error handling**:  
- If a file cannot be read, stop the process and report the issue to the user.
- If you cannot determine the reader profile from the contents of the file, stop the process and report the issue to the user.
