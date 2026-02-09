---
name: gap-analysis
description: Identify content and concept gaps in documentation, suggest specific improvements to achieve document goals
argument-hint: <file-path>
---

# Content and Concept Gap Analysis

Analyzes WAF documents to identify missing content, concepts, and sections that would improve the document's ability to achieve its stated goals. Provides actionable recommendations for content additions.

## Purpose

Helps improve documentation completeness by identifying:
- Missing technical concepts that should be explained
- Gaps in use cases, scenarios, or examples
- Incomplete sections or missing best practices
- Content needed to serve both personas (decision-makers and implementers)
- Opportunities to strengthen connections to related topics

## Usage

```bash
# Analyze a single document
/gap-analysis docs/secure-systems/secure-applications/ci-cd-secrets/github-actions.mdx

# Analyze with comparison to similar docs
/gap-analysis docs/define/modules.mdx --compare-to docs/define/workspaces.mdx
```

## Arguments

- **file-path**: Path to the `.mdx` file to analyze (required)
- **--compare-to**: Optional path to similar document for comparison
- **--verbose** or **-v**: Show detailed analysis with examples
- **--format**: Output format (`text` or `json`)

## What This Skill Analyzes

### 1. Document Goal Assessment

**Extracts the document's stated goal from:**
- Page title and H1 heading
- Meta description
- Opening paragraphs
- "Why" section focus

**Evaluates if content supports the goal:**
- Does the document deliver on what the title promises?
- Are all aspects of the description covered?
- Does the content match the expected scope?

### 2. Technical Concept Coverage

**Identifies missing concepts that should be explained:**

**For integration guides (e.g., GitHub Actions + Vault):**
- Authentication methods not covered
- Secret types available but not explained
- Integration patterns missing
- Alternative approaches not mentioned
- Security considerations absent

**For how-to guides (e.g., Create modules):**
- Prerequisites not stated
- Key terminology undefined
- Configuration options unexplained
- Validation or testing steps missing
- Troubleshooting guidance absent

**For conceptual docs (e.g., GitOps workflow):**
- Core principles not fully explained
- Benefits/trade-offs incomplete
- Relationship to other concepts unclear
- Common misconceptions not addressed

### 3. Use Case and Scenario Gaps

**Checks for missing practical applications:**
- Common use cases not covered
- Real-world scenarios absent
- Edge cases or special situations ignored
- When NOT to use this approach (anti-patterns)
- Migration or adoption paths missing

**Example gaps to identify:**
- "Document explains JWT auth but doesn't cover AppRole fallback for environments without OIDC"
- "Missing guidance on choosing between dynamic and static secrets for different scenarios"
- "No examples of handling secrets rotation in blue/green deployments"

### 4. Implementation Coverage

**Evaluates completeness of implementation guidance:**

**For decision-makers (strategic content):**
- Business value not quantified
- ROI or impact unclear
- Comparison to alternatives missing
- Compliance implications not stated
- Organizational prerequisites absent

**For implementers (tactical content):**
- No working code examples
- Steps not actionable (too high-level)
- Tool prerequisites not listed
- Configuration examples missing
- Command syntax not shown

### 5. Resource and Reference Gaps

**Identifies missing resources:**
- Related WAF documents not linked
- Vault documentation references absent
- Tutorial paths not provided
- External resources for third-party tools missing
- No next steps or learning path

**Checks for balance:**
- At least 5-8 HashiCorp resource links
- Mix of tutorials, docs, and WAF cross-references
- External resources for non-HashiCorp tools mentioned

### 6. Section and Structure Gaps

**Identifies missing sections that would improve completeness:**

**Common missing sections:**
- Prerequisites (tools, access, knowledge needed)
- Verification or testing (how to confirm it works)
- Production readiness (what to check before deploying)
- Troubleshooting (common issues and solutions)
- Best practices (do's and don'ts)
- Security considerations (what to watch out for)
- Performance implications (scale, cost, limits)
- Limitations or constraints (what this doesn't do)

### 7. Persona Balance Gaps

**Analyzes if both personas are served:**

**Decision-maker gaps:**
- No "Why" section explaining business value
- Missing risk/benefit analysis
- No comparison of approach options
- Compliance/governance not addressed
- Missing cost or scale implications

**Implementer gaps:**
- No code examples or too few
- Examples not realistic (hello world only)
- No hands-on tutorial links
- Missing tool-specific documentation
- No step-by-step guidance for complex tasks

### 8. Cross-Reference and Workflow Gaps

**Identifies missing connections:**
- Related WAF documents not mentioned
- Workflow dependencies unclear
- No "what to do before/after this"
- Missing links to prerequisite knowledge
- Related tools/techniques not connected

**Example gaps:**
- "GitOps document doesn't link to modules or testing docs"
- "Vault integration guide doesn't reference secrets anti-patterns"
- "No link to production hardening from deployment guide"

## Output Format

### Gap Analysis Report

```
═══════════════════════════════════════════════════════════
CONTENT & CONCEPT GAP ANALYSIS
═══════════════════════════════════════════════════════════
Document: docs/secure-systems/secure-applications/ci-cd-secrets/github-actions.mdx
Page Title: GitHub Actions
Goal: Learn how to integrate GitHub Actions with HashiCorp Vault for secure secrets management
Analysis Date: 2026-02-06

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 OVERALL GAP SCORE: 7.2/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: GOOD - Minor content additions would strengthen document
Primary gaps: Use case coverage, troubleshooting, workflow connections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ TECHNICAL CONCEPT GAPS [Priority: MEDIUM]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Missing: AppRole authentication fallback
   Impact: Users in environments without OIDC support lack guidance
   Recommendation: Add subsection under "Choose an integration approach"
   showing AppRole as fallback option with example configuration

❌ Missing: Reusable workflow pattern
   Impact: GitHub-specific optimization not covered
   Recommendation: Add section showing how to create reusable workflows
   that centralize Vault authentication for multiple jobs

✅ Covered: JWT/OIDC authentication (comprehensive)
✅ Covered: Dynamic vs static secrets (mentioned with links)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ USE CASE & SCENARIO GAPS [Priority: HIGH]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Missing: Multi-cloud deployment scenario
   Impact: Common pattern not addressed (deploy to AWS/Azure/GCP)
   Recommendation: Add example showing how to retrieve cloud credentials
   for different providers in the same workflow

❌ Missing: Pull request vs main branch secret access
   Impact: Security concern not addressed (should PRs get prod secrets?)
   Recommendation: Add "Verify the integration" section with environment
   protection rules and conditional secret access based on branch

❌ Missing: Secrets rotation during active workflows
   Impact: Users don't know how dynamic secrets handle long builds
   Recommendation: Add note about lease renewal for workflows >1 hour
   with link to Vault lease management docs

✅ Covered: Basic JWT authentication flow (good)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ IMPLEMENTATION COVERAGE [Priority: MEDIUM]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decision-maker content: ✅ GOOD (7/10)
- Strong "Why" section with clear challenges
- Missing: Cost implications of dynamic secrets (API call volume)
- Missing: Compliance benefits (audit trail specifics)

Implementer content: ⚠️ NEEDS IMPROVEMENT (6/10)
- Good: Code examples present
- Missing: Troubleshooting common auth failures
- Missing: How to test locally without GitHub Actions
- Weak: Only 4 HashiCorp resource links (need 5-8)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ MISSING SECTIONS [Priority: HIGH]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ CRITICAL: No "Verify the integration" section
   Recommendation: Add section with:
   - Test workflow to confirm Vault connectivity
   - How to check Vault audit logs for GitHub Actions
   - Validate secrets are masked in GitHub Actions logs
   - Test dynamic secret rotation

❌ IMPORTANT: No "Production readiness" section
   Recommendation: Add checklist covering:
   - Vault HA configuration for reliability
   - GitHub environment protection rules
   - Monitoring Vault auth failures from Actions
   - Backup authentication method if Vault unavailable

❌ NICE TO HAVE: No troubleshooting guidance
   Recommendation: Add common issues:
   - "Error: permission denied" → Check Vault policy
   - "OIDC token invalid" → Verify audience configuration
   - "Secret not found" → Check path and KV version

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ RESOURCE GAPS [Priority: MEDIUM]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HashiCorp resources: ⚠️ INSUFFICIENT (4 links, need 5-8)
Missing resources to add:
- Link to Vault GitHub Actions integration tutorial
- Link to dynamic secrets concepts (beyond just AWS engine)
- Link to Vault lease management for long-running workflows
- Cross-reference to CI/CD secrets anti-patterns doc
- Cross-reference to dynamic vs static secrets doc

External resources: ✅ ADEQUATE (3 links)
- Could add: GitHub Actions OIDC deep dive
- Could add: GitHub environment protection rules docs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6️⃣ WORKFLOW CONNECTION GAPS [Priority: LOW]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Missing connections:
- No link to "Prevent secret sprawl" from Secure systems pillar
- No connection to GitOps workflow (common pattern: GitOps + Vault)
- No mention of testing secrets in CI/CD pipelines
- Could reference Terraform Cloud integration (similar OIDC pattern)

Recommendation: Add "Related documentation" subsection to Next steps

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PRIORITY ACTIONS (Top 3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Add "Verify the integration" section (CRITICAL)
   - Missing validation steps create confusion
   - Estimated impact: +1.0 gap score

2. Add pull request security scenario (HIGH)
   - Critical security concern for most users
   - Shows environment protection best practice
   - Estimated impact: +0.5 gap score

3. Expand HashiCorp resources to 6-8 links (MEDIUM)
   - Improves implementer support
   - Add anti-patterns and dynamic secrets cross-refs
   - Estimated impact: +0.3 gap score

TOTAL POTENTIAL IMPROVEMENT: +1.8 → 9.0/10 gap score

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CONTENT SUGGESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Suggested new content to add:

1. After "Use JWT/OIDC authentication" section, add:

   ## Verify the integration

   After configuring GitHub Actions to retrieve secrets from Vault,
   verify the integration works correctly:

   1. **Run a test workflow:** Create a workflow that retrieves a
      test secret and outputs a masked value to confirm authentication.
   2. **Check Vault audit logs:** Verify Vault logs show successful
      GitHub Actions authentication and secret reads.
   3. **Test secret rotation:** For dynamic secrets, confirm new
      credentials generate on each workflow run.

2. In "Choose an integration approach", add alternative:

   **AppRole for self-hosted runners:** For GitHub Enterprise with
   self-hosted runners that don't support OIDC, use AppRole authentication
   with Role IDs and Secret IDs stored in GitHub Secrets. This provides
   fallback authentication when OIDC is not available.

3. Add to "Why" section, new challenge:

   **Prevent unauthorized secret access in pull requests:** Pull requests
   from forks or external contributors should not access production
   secrets. GitHub environment protection rules combined with Vault
   policies can restrict secret access to approved branches and reviewers.

═══════════════════════════════════════════════════════════
END ANALYSIS
═══════════════════════════════════════════════════════════
```

## Gap Scoring

**10/10** - Comprehensive, no significant gaps
**8-9/10** - Excellent, minor additions would help
**6-7/10** - Good, but missing some important content
**4-5/10** - Fair, significant gaps in coverage
**2-3/10** - Weak, many critical gaps
**0-1/10** - Incomplete, fails to meet document goal

## Integration with Other Skills

**Use after:**
- `/review-doc` - Fix structural issues before gap analysis
- `/check-style` - Clean up style before analyzing content

**Use before:**
- `/add-resources` - Gap analysis shows which resources to add
- `/persona-coverage` - Identifies which persona needs more content

**Combine with:**
- `/compare-docs` - Use similar docs to identify gaps
- `/cross-reference` - Add workflow connections identified in gaps

## Best Practices

**For best results:**
1. Run gap analysis after initial draft is complete
2. Focus on HIGH priority gaps first
3. Use gap analysis iteratively (analyze → improve → re-analyze)
4. Compare to similar documents to calibrate expectations
5. Don't try to fix all gaps at once - prioritize based on user impact

**Gap analysis works best for:**
- Integration guides (platform + Vault)
- How-to and tutorial documents
- Conceptual overviews
- Reference documentation

**Less useful for:**
- Index/navigation pages
- Simple link collections
- Very short documents (<500 words)

## Examples

### Analyze CI/CD integration guide
```bash
/gap-analysis docs/secure-systems/secure-applications/ci-cd-secrets/gitlab.mdx
```

### Compare to similar platform
```bash
/gap-analysis docs/ci-cd-secrets/github-actions.mdx --compare-to docs/ci-cd-secrets/gitlab.mdx
```

### Verbose output with suggestions
```bash
/gap-analysis docs/define/modules.mdx --verbose
```

### JSON output for tooling
```bash
/gap-analysis docs/deploy/atomic-deployments.mdx --format json
```

## Output Files

Gap analysis creates:
- Console output with recommendations
- Optional: `/tmp/gap-analysis-report-{timestamp}.md` for detailed findings
- Optional: `/tmp/gap-analysis-{timestamp}.json` for programmatic access

## Notes

- Gap analysis is **subjective** - uses WAF best practices and similar docs as baseline
- Recommendations are **suggestions** - not all gaps need to be filled
- Focus on gaps that **serve user needs** - don't add content just for completeness
- **Document goals matter** - some gaps are intentional (e.g., high-level docs skip implementation)
- Use **compare-to** to understand typical content patterns for document type
