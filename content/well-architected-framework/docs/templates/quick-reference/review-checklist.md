# WAF Document Review Checklist

**Print and use this checklist when reviewing documents**

---

## Document Information

- **File:** _______________________________________________
- **Reviewer:** ___________________________________________
- **Date:** _______________________________________________
- **Review Type:** ☐ New Document  ☐ Update  ☐ Quarterly Review

---

## ✅ Phase 1: Structure (5 minutes)

### Frontmatter
- [ ] Title present and descriptive
- [ ] Description 150-160 characters (SEO optimized)
- [ ] Valid YAML syntax

### Required Sections
- [ ] Introduction (2-3 paragraphs)
- [ ] "Why [topic]" section present
- [ ] Implementation guidance sections
- [ ] HashiCorp resources section
- [ ] Next steps section

### Why Section Format
- [ ] Section titled "Why [topic]"
- [ ] 3-4 challenges in **Bold challenge:** format
- [ ] Each challenge describes business/operational impact
- [ ] Paragraph after challenges explaining solution

### Headings
- [ ] All headings use sentence case (not Title Case)
- [ ] Proper nesting (no skipped levels: H1 → H2 → H3)
- [ ] Descriptive headings (not generic)

### Lists
- [ ] All lists preceded by "the following" in introduction
- [ ] Ordered lists use `1.` for every item
- [ ] Consistent bullet style throughout

### Document Ending Order
- [ ] HashiCorp resources section
- [ ] External resources section (if present)
- [ ] Next steps section (last)

### Vague Pronouns
- [ ] No sentences start with "This", "That", "It"
- [ ] Explicit subjects used throughout

**Auto-fix command:** `/check-structure docs/file.mdx --fix`

---

## ✅ Phase 2: Code Examples (10 minutes)

### Presence
- [ ] Code examples included (if implementation guide)
- [ ] Examples appropriate for document type

### Completeness
- [ ] Examples are complete (not empty templates)
- [ ] Packer: Includes provisioners and post-processors
- [ ] Terraform: Includes backend configuration
- [ ] Terraform: Uses data sources (not hardcoded IDs)
- [ ] All code blocks have language tags

### Summaries
- [ ] 1-2 sentence summary after each code block
- [ ] Summary explains what code does
- [ ] Summary explains why it matters
- [ ] Summary connects to workflow (input → output)

### Realism
- [ ] Examples use realistic values
- [ ] Examples show complete workflows
- [ ] Examples match document context

**Check command:** `/check-code-examples docs/file.mdx`

---

## ✅ Phase 3: Resources Section (5 minutes)

### Link Count
- [ ] 5-8+ HashiCorp resource links
- [ ] Appropriate number for document type

### Organization
- [ ] WAF cross-references appear first
- [ ] Grouped by tool/purpose (if multi-tool doc)
- [ ] Progressive organization (beginner → advanced)

### Link Formatting
- [ ] Verbs OUTSIDE link brackets
- [ ] Context in sentence (no dashes after links)
- [ ] Specific link text (not "Learn more")
- [ ] Action verbs used (Learn, Read, Get started, etc.)

### Link Descriptions
- [ ] Each link explains what user will find
- [ ] Documentation and tutorial links separated
- [ ] Multiple related links in one bullet (if appropriate)

**Auto-fix command:** `/check-resources docs/file.mdx --fix`

---

## ✅ Phase 4: HashiCorp Style Guide (5 minutes)

### Voice & Tense
- [ ] Second-person "you" throughout
- [ ] Present tense (no "will" for future events)
- [ ] Active voice preferred

### Word Choice
- [ ] "lets" instead of "allows" or "enables"
- [ ] No unofficial abbreviations (TF, TFC, TFE, etc.)
- [ ] No foreign words ("via", "etc.", "e.g.")
- [ ] No "please", "simply", "just", "easy"

### Clarity
- [ ] No promotional language ("breathtaking", "exceptional")
- [ ] No excessive conjunctions ("moreover", "furthermore")
- [ ] Direct, clear statements
- [ ] Precise technical terms

**Auto-fix command:** `/check-hashicorp-style docs/file.mdx --fix`

---

## ✅ Phase 5: Persona Coverage (10 minutes)

### Decision-Maker Content (40-50%)
- [ ] Why section with business impact
- [ ] Strategic guidance (tool selection, trade-offs)
- [ ] Business value statements (ROI, risk reduction)
- [ ] Comparison of approaches (when appropriate)

### Implementer Content (50-60%)
- [ ] Code examples with explanations
- [ ] 5-8+ resource links (tutorials, docs)
- [ ] How-to guidance or clear next steps
- [ ] Integration patterns and tool usage

### Balance
- [ ] Both personas well-served
- [ ] Smooth transitions between strategic and tactical
- [ ] No heavy skew to one persona (>70%)

**Check command:** `/persona-coverage docs/file.mdx --verbose`

---

## ✅ Phase 6: Cross-References (5 minutes)

### Workflow Connections
- [ ] Links to related WAF documents in body text
- [ ] Workflow progression clear (A → B → C)
- [ ] Explicit connections ("After X, do Y")

### Link Health
- [ ] All internal links work
- [ ] All external links work
- [ ] No broken or 404 links
- [ ] Redirected links updated to final URLs

### Discoverability
- [ ] Document not orphaned (has incoming links)
- [ ] Bidirectional links where appropriate
- [ ] Cross-references in resources section

**Check command:** `/smart-cross-reference docs/file.mdx --full-analysis`

---

## ✅ Phase 7: Content Quality (10 minutes)

### Word Count
- [ ] 700-1,200 words (target range)
- [ ] Appropriate depth for topic
- [ ] Not too shallow (<500) or too verbose (>1,500)

### Technical Accuracy
- [ ] Code examples syntactically correct
- [ ] Version numbers accurate (if mentioned)
- [ ] No deprecated patterns or APIs
- [ ] Security recommendations valid

### Freshness
- [ ] No version-specific references (unless necessary)
- [ ] No temporal language ("currently", "recently")
- [ ] No "coming soon" or "beta" references
- [ ] Links current and not redirected

### SEO & Discoverability
- [ ] Meta description optimized (150-160 chars)
- [ ] Title clear and searchable
- [ ] First paragraph hooks reader
- [ ] H2 headings descriptive and keyword-rich

**Check command:** `/content-freshness docs/file.mdx`

---

## 📊 Overall Assessment

### Quality Score
- [ ] Structure: ___/10
- [ ] Code Examples: ___/10
- [ ] Resources: ___/10
- [ ] Style: ___/10
- [ ] Persona Balance: ___/10
- [ ] Cross-References: ___/10
- [ ] Content Quality: ___/10

**Overall: ___/10**

### Status
- [ ] 🟢 Excellent (9-10) - Ready for publication
- [ ] 🟢 Good (7-8.9) - Minor improvements needed
- [ ] 🟡 Needs Work (5-6.9) - Several issues to address
- [ ] 🔴 Critical (<5) - Major revision required

---

## 🎯 Action Items

**Critical (Fix Today):**
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Medium Priority (This Week):**
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Low Priority (Nice to Have):**
1. _________________________________________________
2. _________________________________________________

---

## 💡 Notes & Observations

**What's Working Well:**
___________________________________________________________
___________________________________________________________
___________________________________________________________

**Areas for Improvement:**
___________________________________________________________
___________________________________________________________
___________________________________________________________

**Questions for Author:**
___________________________________________________________
___________________________________________________________
___________________________________________________________

---

## ✅ Final Sign-Off

- [ ] All critical issues addressed
- [ ] All auto-fixes applied
- [ ] Manual fixes completed
- [ ] Final validation passed
- [ ] Ready for publication

**Reviewer Signature:** _____________________________________

**Date Completed:** _________________________________________

---

## 🚀 Quick Commands Reference

```bash
# Run all auto-fixes
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
/check-resources docs/file.mdx --fix

# Comprehensive review
/review-doc docs/file.mdx --phases 1-7

# Health check
/doc-intelligence --view tactical
```

---

**Print this checklist:** File → Print → Save as PDF
**Last Updated:** January 29, 2026