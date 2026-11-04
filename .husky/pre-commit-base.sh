#!/bin/sh
# Shared pre-commit base checks.
# Sourced by both .husky/pre-commit (Husky, Node users) and
# .githooks/pre-commit (fallback, non-Node users).
#
# Provides:
#   - .env file guard (exits calling script with code 1 if .env files are staged)
#   - is_normal_commit_flow function

# ── .env file guard ───────────────────────────────────────────────────────────
ENV_FILES=$(git diff --cached --name-only | grep '\.env' || true)

if [ -n "$ENV_FILES" ]; then
    echo "ERROR: .env files detected in staged changes!"
    echo ""
    echo "The following .env files are staged for commit:"
    echo "$ENV_FILES" | awk '{print "  - " $0}'
    echo ""
    echo ".env files should not be committed as they may contain sensitive information."
    echo "Please unstage these files using: git reset HEAD <file>"
    echo ""
    exit 1
fi

echo "No .env files detected in commit"

# ── is_normal_commit_flow ─────────────────────────────────────────────────────
# Returns 0 (true) for a normal interactive commit.
# Returns 1 (false) during merges, rebases, cherry-picks, reverts, etc.
is_normal_commit_flow() {
    for git_state in MERGE_HEAD REBASE_HEAD CHERRY_PICK_HEAD REVERT_HEAD rebase-merge rebase-apply SQUASH_MSG AUTO_MERGE; do
        if [ -e "$(git rev-parse --git-path "$git_state")" ]; then
            return 1
        fi
    done

    return 0
}
