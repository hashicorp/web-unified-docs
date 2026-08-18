#!/usr/bin/env bash
# Doc review pre-commit hook
# Blocks commits on .md/.mdx files scoring below SCORE_THRESHOLD.
#
# Emergency override (use sparingly):
#   DOC_REVIEW_OVERRIDE=1 git commit -m "..."
#   git commit --no-verify  (skips ALL hooks — last resort)

set -uo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
CLI_MODEL="github-copilot/claude-sonnet-4.6"

# Format: "path_pattern|score_threshold|skill_path"
# First match wins. Use "." as a catch-all fallback at the end.
DIR_CONFIGS=(
  "content/vault/v2.x|65|.github/prompts/doc-review.prompt.md"
  "content/bunker|65|.github/prompts/doc-review.prompt.md"
  "content/warden|65|.github/prompts/doc-review.prompt.md"
  "content/hcp-docs/content/docs/vault-radar|65|.github/prompts/doc-review.prompt.md"
  #".|60|.github/prompts/radar-doc-review.prompt.md"
)

# On score parse failure: "allow" or "block"
ON_PARSE_FAILURE="allow"

# ── Emergency override ────────────────────────────────────────────────────────
if [[ "${DOC_REVIEW_OVERRIDE:-}" == "1" ]]; then
  echo "⚠️  [doc-review] Override active — skipping review (DOC_REVIEW_OVERRIDE=1)"
  exit 0
fi

# ── Staged .md/.mdx files only ────────────────────────────────────────────────
STAGED_DOCS=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null \
  | grep -E '\.(md|mdx)$' || true)

if [[ -z "$STAGED_DOCS" ]]; then
  exit 0
fi

# ── Dependency checks ─────────────────────────────────────────────────────────
if ! command -v opencode &>/dev/null; then
  echo "❌ [doc-review] opencode CLI not found in PATH."
  echo "   Install it or run: git commit --no-verify"
  exit 1
fi

for config in "${DIR_CONFIGS[@]}"; do
  IFS='|' read -r pattern threshold skill <<< "$config"
  if [[ ! -f "$skill" ]]; then
    echo "❌ [doc-review] Skill file not found: $skill"
    echo "   Ensure the skill is committed to the repo at that path."
    exit 1
  fi
done

# ── Format output for terminal readability ────────────────────────────────────
format_output() {
  local input="$1"
  local in_issues_table=0

  while IFS= read -r line; do
    # Detect the issues table header row
    if echo "$line" | grep -qE '^\|\s*#\s*\|\s*Location'; then
      in_issues_table=1
      continue  # skip the header row
    fi

    # Skip the separator row (|---|---|...)
    if [[ $in_issues_table -eq 1 ]] && echo "$line" | grep -qE '^\|[-| ]+\|$'; then
      continue
    fi

    # We've left the table if in_issues_table and line doesn't start with |
    if [[ $in_issues_table -eq 1 ]] && ! echo "$line" | grep -qE '^\|'; then
      in_issues_table=0
    fi

    if [[ $in_issues_table -eq 1 ]]; then
      # Split pipe-delimited row into fields
      IFS='|' read -ra fields <<< "$line"
      # fields[0] = empty, [1] = #, [2] = Location, [3] = Issue, [4] = Rule, [5] = Fix
      local num loc issue rule fix
      num=$(echo "${fields[1]:-}" | xargs)
      loc=$(echo "${fields[2]:-}" | xargs)
      issue=$(echo "${fields[3]:-}" | xargs)
      rule=$(echo "${fields[4]:-}" | xargs)
      fix=$(echo "${fields[5]:-}" | xargs)

      [[ -z "$num" ]] && continue

      printf "\n  ── Issue %s %s\n" "$num" "$(printf '─%.0s' {1..50})"
      printf "  %-12s %s\n" "Location:"  "$loc"
      printf "  %-12s %s\n" "Issue:"     "$issue"
      printf "  %-12s %s\n" "Rule:"      "$rule"
      printf "  %-12s %s\n" "Fix:"       "$fix"
    else
      echo "$line"
    fi
  done <<< "$input"
}

# ── Review a single file ──────────────────────────────────────────────────────
FAILED_FILES=()
PASSED_FILES=()
SKIPPED_FILES=()

review_file() {
  local file="$1"

  if [[ ! -f "$file" ]]; then
    echo "⚠️  [doc-review] Staged file not found on disk (deleted?): $file"
    return
  fi

  # ── Match file to directory config ──────────────────────────────────────────
  local SCORE_THRESHOLD="" SKILL_PATH="" matched=0

  for config in "${DIR_CONFIGS[@]}"; do
    IFS='|' read -r pattern threshold skill <<< "$config"
    if [[ "$file" == $pattern* ]]; then
      SCORE_THRESHOLD="$threshold"
      SKILL_PATH="$skill"
      matched=1
      break
    fi
  done

  if [[ $matched -eq 0 ]]; then
    echo "⚠️  [doc-review] No config matched for $file — skipping."
    SKIPPED_FILES+=("$file | no matching DIR_CONFIGS entry")
    return
  fi

  if [[ ! -f "$SKILL_PATH" ]]; then
    echo "❌ [doc-review] Skill file not found: $SKILL_PATH"
    FAILED_FILES+=("$file | missing skill file: $SKILL_PATH")
    return
  fi

  echo ""
  echo "┌─────────────────────────────────────────────────────────────┐"
  echo "  Reviewing: $file (threshold: ${SCORE_THRESHOLD}%)"
  echo "└─────────────────────────────────────────────────────────────┘"

  local prompt
  prompt=$(cat <<EOF
Read the documentation review skill at $SKILL_PATH and follow its full
Step-by-Step Review Process to review the file at $file.

The passing threshold for this review is ${SCORE_THRESHOLD}%.

Output ONLY the ## Output Format section defined in the skill:
- Doc Info
- Quality Score table
- What Looks Good
- Issues Found table
- Overall Assessment

CRITICAL OUTPUT RULES:
- Respond with exactly ONE text message: the final report, and nothing else.
- Do NOT narrate or "think out loud". Do NOT emit any interstitial text
  between tool calls (no "Now let me read...", "Let me check...", etc.).
- Use your tools silently, then produce the report as your single reply.
- Output nothing before or after the report.
EOF
)

  local output
  # ╔══════════════════════════════════════════════════════════════════════════╗
  # ║  DO NOT REMOVE `--agent plan` OR THE `snapshot: false` ENV VAR BELOW.     ║
  # ║  These are the TWO protections that make this pre-commit hook safe and    ║
  # ║  non-destructive. If you "simplify" the opencode call and drop either     ║
  # ║  one, this hook can MODIFY OR CORRUPT THE USER'S REPO during a commit.    ║
  # ║  READ THIS in full before changing the line below.                       ║
  # ╚══════════════════════════════════════════════════════════════════════════╝
  #
  # --agent plan  ── READ-ONLY GUARANTEE
  #   Runs opencode in its read-only "plan" agent: it may READ files to perform
  #   the review, but it CANNOT create, edit, or delete anything. Without this,
  #   opencode runs in its default (full-access) agent and is free to rewrite or
  #   delete files in the working tree mid-commit. This flag is the only thing
  #   keeping the review side-effect-free. Do not remove it.
  #
  # OPENCODE_CONFIG_CONTENT='{"snapshot": false}'  ── INDEX-INTEGRITY GUARANTEE
  #   Disables opencode's git snapshot/checkpoint feature for THIS invocation
  #   only. That feature writes worktree files into the git index using objects
  #   it doesn't reliably persist; in a non-interactive pre-commit run it stages
  #   untracked files and leaves the index pointing at a missing blob, causing
  #   "error: Error building trees" and a stuck/aborted commit. It runs
  #   regardless of --agent, so this env var is the ACTUAL fix — `--agent plan`
  #   alone does not prevent it. Scoped inline so it does not affect your
  #   interactive opencode usage. Do not remove it.
  #
  # If you must edit the command below, KEEP BOTH protections intact.
  if ! output=$(OPENCODE_CONFIG_CONTENT='{"snapshot": false}' opencode run --agent plan --model "$CLI_MODEL" "$prompt" 2>&1); then
    echo "❌ opencode exited with an error for $file:"
    echo "$output"
    FAILED_FILES+=("$file | opencode error — see above")
    return
  fi

  # Print the full report so the author sees it
  format_output "$output"
  echo ""

  # Extract score from "Overall Score: XX%" or "**Overall Score: XX%**"
  local score
  score=$(echo "$output" | grep -iE 'Overall Score:' | grep -oE '[0-9]+' | head -1 || true)

  if [[ -z "$score" ]]; then
    echo "⚠️  Could not parse score from review output."
    if [[ "$ON_PARSE_FAILURE" == "block" ]]; then
      echo "❌ Blocking commit (ON_PARSE_FAILURE=block). Fix or use override."
      FAILED_FILES+=("$file | score unparseable")
    else
      echo "⚠️  Allowing commit (ON_PARSE_FAILURE=allow)."
      SKIPPED_FILES+=("$file | score unparseable")
    fi
    return
  fi

  if (( score < SCORE_THRESHOLD )); then
    echo "❌ Score ${score}% is below the ${SCORE_THRESHOLD}% threshold — commit blocked."
    FAILED_FILES+=("$file | score: ${score}%")
  else
    echo "✅ Score ${score}% passes the ${SCORE_THRESHOLD}% threshold."
    PASSED_FILES+=("$file | score: ${score}%")
  fi
}

# ── Run reviews ───────────────────────────────────────────────────────────────
# To parallelize (if slow): swap the loop body for background jobs + wait
# See NOTE at bottom of file.
while IFS= read -r file; do
  review_file "$file"
done <<< "$STAGED_DOCS"

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════"
echo "  Doc Review Summary"
echo "══════════════════════════════════════════════"

if [[ ${#PASSED_FILES[@]} -gt 0 ]]; then
  printf "✅ Passed:\n"
  for f in "${PASSED_FILES[@]}"; do printf "   %s\n" "$f"; done
fi

if [[ ${#SKIPPED_FILES[@]} -gt 0 ]]; then
  printf "⚠️  Skipped (score unparseable):\n"
  for f in "${SKIPPED_FILES[@]}"; do printf "   %s\n" "$f"; done
fi

if [[ ${#FAILED_FILES[@]} -gt 0 ]]; then
  printf "❌ Blocked:\n"
  for f in "${FAILED_FILES[@]}"; do printf "   %s\n" "$f"; done
  echo ""
  echo "Fix the issues above, then re-stage and commit."
  echo ""
  echo "Emergency override options:"
  echo "  DOC_REVIEW_OVERRIDE=1 git commit -m \"your message\"  (doc review only)"
  echo "  git commit --no-verify                               (skips ALL hooks)"
  exit 1
fi

exit 0

# ── NOTE: Parallelization ─────────────────────────────────────────────────────
# If multiple docs per commit becomes slow, replace the loop with:
#
#   declare -A pids output_files
#   while IFS= read -r file; do
#     tmp=$(mktemp)
#     output_files["$file"]="$tmp"
#     review_file "$file" > "$tmp" 2>&1 &
#     pids["$file"]=$!
#   done <<< "$STAGED_DOCS"
#
#   for file in "${!pids[@]}"; do
#     wait "${pids[$file]}"
#     cat "${output_files[$file]}"
#     rm -f "${output_files[$file]}"
#   done
#
# This runs all reviews concurrently. Be aware of API rate limits.
