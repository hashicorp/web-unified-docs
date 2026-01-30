---
name: check-hashicorp-style
description: Validate documentation against HashiCorp official style guide. Checks for active voice, word choice, tense, and formatting compliance.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check HashiCorp Style Guide Skill

Comprehensive validation against the official HashiCorp style guide located at `templates/styleguide.md`. This skill checks for the Top 12 guidelines and common style violations.

## Usage

```bash
/check-hashicorp-style <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-hashicorp-style docs/modules.mdx`
  - Multiple files: `/check-hashicorp-style docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-hashicorp-style docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

This skill validates against the HashiCorp style guide's "Top 12 guidelines" and additional rules:

### 1. Active Voice

**Rule:** Subject performs the action, exhibits agency, or gets described by a predicate phrase.

**Bad Examples:**
- ❌ "Next, the service will be registered."
- ❌ "It is recommended to configure VCS access..."
- ❌ "...files that run Vault are owned by the user."

**Good Examples:**
- ✅ "Next, register the service."
- ✅ "We recommend configuring VCS access..."
- ✅ "Vault expects users to own configuration files..."

**Auto-fixable:** Partial (simple passive constructions)

---

### 2. Simple Present Tense

**Rule:** Use present tense for immediate actions. Avoid "will" for future events.

**Bad Examples:**
- ❌ "The output will show that Vault is initialized."
- ❌ "The service's state will change to unhealthy."
- ❌ "Click **Next**. The screen will appear."

**Good Examples:**
- ✅ "The output shows that Vault is initialized."
- ✅ "After Consul performs a health check, the web UI reports that the service is unhealthy."
- ✅ "Click **Next**. The server configuration screen appears."

**Auto-fixable:** Yes (will → present tense conversions)

---

### 3. No Unofficial Abbreviations

**Rule:** Do not use: TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM

**Bad Examples:**
- ❌ "Configure TF to use remote state."
- ❌ "HCP TF provides team collaboration."
- ❌ "TFE supports SSO authentication."

**Good Examples:**
- ✅ "Configure Terraform to use remote state."
- ✅ "HCP Terraform provides team collaboration."
- ✅ "Terraform Enterprise supports SSO authentication."

**Auto-fixable:** Yes

---

### 4. Use "we" Only for HashiCorp

**Rule:** Use "we" when providing HashiCorp recommendations or describing company actions. Don't use "we" to guide readers through examples.

**Bad Examples:**
- ❌ "In the following example, we set up a new policy..."
- ❌ "Next we will configure the server."

**Good Examples:**
- ✅ "We recommend that you test your Sentinel policies extensively..."
- ✅ "In the following example, you set up a new policy..."
- ✅ "Next, configure the server."

**Auto-fixable:** No (requires context)

---

### 5. Address Reader as "you"

**Rule:** Use second person for actions readers perform. Helps avoid passive voice.

**Bad Examples:**
- ❌ "A user can create workspaces using the API."
- ❌ "Upon completing this tutorial, one has learned..."

**Good Examples:**
- ✅ "You can create workspaces using the API."
- ✅ "In this tutorial, you learned to configure service mesh."

**Auto-fixable:** Partial

---

### 6. Avoid Unnecessary Words

**Rule:** Remove extra words and phrases.

**Common violations:**
- ❌ "in order to" → ✅ "to"
- ❌ "in the case that" → ✅ "when"
- ❌ "simply", "just", "very", "actually" → ✅ (remove)

**Bad Example:**
- ❌ "Careful precaution should be taken to prohibit new clients from joining during the gossip encryption rotation process, otherwise the new clients will join the gossip pool without knowledge of the new primary gossip encryption key."

**Good Example:**
- ✅ "Do not allow new clients to join the gossip pool during the rotation process. Clients that join the pool during rotation may not receive the new primary gossip encryption key."

**Auto-fixable:** Yes (common phrases)

---

### 7. Use Simplest Word Possible

**Rule:** Use shortest word/phrase that conveys meaning.

**Critical rule:**
- ❌ "enables" or "allows" → ✅ "lets" (when describing what tools do for users)

**Other examples:**
- ❌ "utilize" → ✅ "use"
- ❌ "due to the fact that" → ✅ "because"

**Bad Examples:**
- ❌ "The AWS provider enables you to manage CodeArtifact..."
- ❌ "HCP Terraform's API allows you to create workspaces..."
- ❌ "Vault enables you to manage secrets dynamically."

**Good Examples:**
- ✅ "The AWS provider lets you manage CodeArtifact..."
- ✅ "HCP Terraform's API lets you create workspaces..."
- ✅ "Vault lets you manage secrets dynamically."

**Auto-fixable:** Yes

---

### 8. No Foreign/Scientific/Jargon Words

**Rule:** Use simple, concrete words for global audiences. Avoid Latin loan words.

**Common violations:**

| ❌ Don't Use | ✅ Use Instead | Type |
|--------------|----------------|------|
| "via" | "using", "with", "through" | Latin |
| "etc." | "...and other {entities}" | Latin abbreviation |
| "ergo" | "therefore", "as a result" | Latin |
| "vice versa" | "conversely" | Latin |
| "carte blanche" | "full permission", "admin access" | French |
| "blast radius" | "affected scope" | Jargon |
| "sanity check" | "verification" | Jargon, ableist |
| "smoke test" | "preliminary test" | Jargon |

**Bad Examples:**
- ❌ "Some repositories may include Git submodules that can only be accessed via SSH."
- ❌ "Vault manages credentials, tokens, etc."
- ❌ "Choose a set of tags germane to your project."

**Good Examples:**
- ✅ "Some repositories may include Git submodules that you can only access using an SSH connection."
- ✅ "Vault manages credentials, tokens, and other secrets."
- ✅ "Choose a set of tags relevant to your project."

**Auto-fixable:** Yes (common words)

---

### 9. No Same Elements Next to Each Other

**Rule:** Don't place same type of non-prose elements adjacent.

**Violations:**
- ❌ Alerts next to other alerts
- ❌ Headings next to other headings
- ❌ Tables next to other tables
- ❌ Lists next to other lists
- ❌ Code blocks next to other code blocks

**Bad Example:**
```markdown
## Heading

### Subheading
```

**Good Example:**
```markdown
## Heading

This paragraph introduces subtopics organized under each subheading.

### Subheading
```

**Auto-fixable:** No (requires content judgment)

---

### 10. Content Flow

**Rule:** Content flows in single direction. Avoid "above", "below", "previously". Use "following" for immediate next element.

**Bad Examples:**
- ❌ "The example below..."
- ❌ "Get the output from the step above..."
- ❌ "See above for supported versions."

**Good Examples:**
- ✅ "In the following example..."
- ✅ "Copy the certificate keys you created in [Create TLS certificates](#create-tls-certificates)..."
- ✅ "Copy the output from step 1."

**Auto-fixable:** Partial

---

## Output Format

```
HashiCorp Style Guide Check
============================

Files Checked: 2
Total Issues: 18
Auto-fixable: 12
Manual Review: 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/prevent.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ ACTIVE VOICE (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 33: Passive voice detected
  ❌ "Separation of duties may be required by government..."
  ✅ "Government or industry regulations may require separation of duties..."
  [MANUAL REVIEW]

Line 48: Passive voice detected
  ❌ "...credentials generated on demand..."
  ✅ "...credentials that services generate on demand..."
  [AUTO-FIX AVAILABLE]

❌ PRESENT TENSE (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 125: Future tense with "will"
  ❌ "Vault will automatically revoke it..."
  ✅ "Vault automatically revokes it..."
  [AUTO-FIX AVAILABLE]

❌ WORD CHOICE - lets vs allows/enables (5 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 70: Use "lets" instead of "allows"
  ❌ "The secrets engine allows Terraform to provision..."
  ✅ "The secrets engine lets Terraform provision..."
  [AUTO-FIX AVAILABLE]

Line 86: Use "lets" instead of "allows"
  ❌ "Single sign-on (SSO) is a process that allows users..."
  ✅ "Single sign-on (SSO) is a process that lets users..."
  [AUTO-FIX AVAILABLE]

Line 25: Use "lets" instead of "enables"
  ❌ "A single leaked secret often enables attackers..."
  ✅ "A single leaked secret often lets attackers..."
  [AUTO-FIX AVAILABLE]

Line 96: Use "lets" instead of "allow"
  ❌ "...auth methods that allow authentication from..."
  ✅ "...auth methods that let you authenticate from..."
  [AUTO-FIX AVAILABLE]

Line 160: Use "lets" instead of "allows" (2 instances)
  ❌ "Credential brokering allows users to connect..."
  ✅ "Credential brokering lets users connect..."
  [AUTO-FIX AVAILABLE]

❌ FOREIGN/JARGON WORDS (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 152: Latin word "via" detected
  ❌ "...accessed via SSH..."
  ✅ "...accessed using SSH..." or "...accessed through SSH..."
  [AUTO-FIX AVAILABLE]

✅ PASSES (7 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ No unofficial abbreviations (TF, TFC, etc.)
✓ Proper use of "we" (HashiCorp only)
✓ Addresses reader as "you"
✓ No unnecessary words detected
✓ No adjacent same elements
✓ Proper content flow
✓ No "etc." usage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 9
  ├─ Auto-fixable: 7
  └─ Manual Review: 2

Run with --fix to apply 7 automatic corrections.
Manual review required for 2 issues.
```

## Auto-fixable Issues

These can be fixed automatically with `--fix`:

✅ **Present tense (will → present)**
- "will show" → "shows"
- "will appear" → "appears"
- "will be" → "is"

✅ **Word choice (allows/enables → lets)**
- All instances when describing what tools do

✅ **Foreign words**
- "via" → "using" or "through"
- "etc." → "and other {entities}"

✅ **Unnecessary phrases**
- "in order to" → "to"
- "in the case that" → "when"

✅ **Unofficial abbreviations**
- "TF" → "Terraform"
- "TFC" → "HCP Terraform"
- "TFE" → "Terraform Enterprise"

✅ **Passive voice (simple cases)**
- "is managed by" → "manages"
- "are created by" → "creates"

## Manual Review Required

⚠️ **Complex passive voice**
- Requires sentence restructuring
- Context-dependent rewrites

⚠️ **"we" usage in examples**
- Need to determine if HashiCorp recommendation or reader guidance

⚠️ **Adjacent elements**
- Need to add introductory text
- Requires content judgment

⚠️ **Directional references**
- "above"/"below" → specific section references
- Requires understanding document structure

## Examples

### Check single file
```bash
/check-hashicorp-style docs/prevent.mdx
```

### Check and auto-fix
```bash
/check-hashicorp-style docs/prevent.mdx --fix
```

### Check multiple files
```bash
/check-hashicorp-style docs/**/*.mdx
```

### Pre-commit check
```bash
/check-hashicorp-style $(git diff --name-only --cached | grep '\.mdx$')
```

## Integration with Other Skills

**Complete review workflow:**
```bash
# 1. AGENTS.md style check (Phase 4)
/check-style docs/file.mdx --fix

# 2. HashiCorp style guide check
/check-hashicorp-style docs/file.mdx --fix

# 3. SEO optimization
/seo-optimize docs/file.mdx

# 4. Final comprehensive review
/review-doc docs/file.mdx --phases 5-7
```

**Quick pre-commit:**
```bash
/check-hashicorp-style docs/modified.mdx --fix
```

**CI/CD validation:**
```bash
/check-hashicorp-style docs/**/*.mdx || exit 1
```

## Common Fixes

### Word Choice: allows/enables → lets

**Before:**
```markdown
Vault enables you to manage secrets dynamically.
The API allows you to create workspaces.
Boundary allows users to connect securely.
```

**After:**
```markdown
Vault lets you manage secrets dynamically.
The API lets you create workspaces.
Boundary lets users connect securely.
```

### Present Tense: will → present

**Before:**
```markdown
The output will show that Vault is initialized.
Click **Next**. The screen will appear.
```

**After:**
```markdown
The output shows that Vault is initialized.
Click **Next**. The screen appears.
```

### Foreign Words: via → using/through

**Before:**
```markdown
Some repositories can only be accessed via SSH.
Configure authentication via OIDC.
```

**After:**
```markdown
Some repositories can only be accessed using SSH.
Configure authentication using OIDC.
```

### Unofficial Abbreviations

**Before:**
```markdown
Configure TF to use remote state.
HCP TF provides team collaboration.
```

**After:**
```markdown
Configure Terraform to use remote state.
HCP Terraform provides team collaboration.
```

## Performance

Typical execution times:
- Single file: ~45 seconds
- 5 files: ~3 minutes
- 20 files: ~12 minutes

Slower than `/check-style` because it performs deeper analysis of voice, tense, and word choice.

## When to Use This Skill

Use `/check-hashicorp-style` when:
- ✅ Need official HashiCorp style guide compliance
- ✅ Before submitting for publication
- ✅ After completing AGENTS.md Phase 4 checks
- ✅ Validating word choice (lets vs allows/enables)
- ✅ Checking for passive voice
- ✅ Verifying tense consistency

Don't use when:
- ❌ Need AGENTS.md style checks (use `/check-style`)
- ❌ Need SEO optimization (use `/seo-optimize`)
- ❌ Need comprehensive review (use `/review-doc`)
- ❌ Checking technical accuracy (use `/review-doc --phases 2`)

## Reference Files

This skill validates against:
- **`styleguide.md`** - HashiCorp official style guide (108KB, Top 12 guidelines + full guide)

Does NOT check:
- AGENTS.md Phase 4 criteria (use `/check-style`)
- SEO optimization (use `/seo-optimize`)
- Cross-references (use `/fix-links`)

## Best Practices

**Workflow order:**
1. `/check-style` (AGENTS.md Phase 4) → fast, catches formatting
2. `/check-hashicorp-style` (official guide) → catches word choice, voice, tense
3. Manual review of issues requiring judgment
4. `/review-doc` (comprehensive) → validates everything

**Pre-commit:**
```bash
# Quick check
/check-hashicorp-style docs/file.mdx

# Auto-fix
/check-hashicorp-style docs/file.mdx --fix

# Verify
git diff docs/file.mdx
```

**Team standards:**
- Run before every commit
- Fix all auto-fixable issues
- Document reasons if ignoring manual review items
- Include in CI/CD pipeline

## Notes

- Focuses on HashiCorp official style guide compliance
- Complements `/check-style` (AGENTS.md Phase 4)
- Auto-fixes are safe and follow official patterns
- Manual review items require context and judgment
- Reports include line numbers and examples
- Designed for HashiCorp documentation standards
- Essential for publication-ready documentation
