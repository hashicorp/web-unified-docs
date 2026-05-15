---
name: scrub
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Scrub AI

Identifies and removes AI-generated writing patterns from WAF documentation. Read these reference docs first to understand target style:
- docs/define-and-automate-processes/deploy/atomic-deployments.mdx
- docs/define-and-automate-processes/process-automation/gitops.mdx
- docs/define-and-automate-processes/define/modules.mdx

**Priority:** [CRITICAL] Generic Problems→Specific Scenarios (§1), Hypothetical→Real Incidents (§15), Technical Specificity (§16). [HIGH] "Addresses These Challenges By" (§1A), Security Jargon (§1B), Vague Attributions (§5), AI Vocabulary (§7), Copula Avoidance (§8). [ALLOWED] Tutorial language in "Next steps": "you learned", "you configured".

## CONTENT PATTERNS

### 1. Generic Problems → Explained Consequences [CRITICAL]
Detect: "Teams face challenges", "organizations struggle", no consequences explained, no specific technologies.

Before: `Manual configuration creates inconsistencies. Teams face challenges verifying compliance.`
After: `Manual infrastructure provisioning creates configuration drift between environments. Modules enforce consistent configuration across all deployments.`

### 1A. "Addresses These Challenges By" Transitions [HIGH]
Detect: "addresses these challenges by...", "solves these problems by...", "tackles these issues by..."

Before: `Integrating Vault addresses these challenges by centralizing secrets management, enabling dynamic secret generation, providing audit logs, and supporting rotation.`
After: `Integrating Vault centralizes secrets management in a single system. Vault generates dynamic credentials on demand, logs all secret access, and rotates credentials automatically.`

### 1B. Security Theater Jargon [HIGH]
Detect: "attack surface", "security posture", "threat landscape", "security vectors", "vulnerability exposure"

Before: `Static secrets remain valid indefinitely, creating a larger attack surface compared to short-lived credentials.`
After: `Static secrets remain valid indefinitely. If these secrets leak through logs or compromised agents, they remain exploitable until manually rotated. Dynamic credentials expire automatically—typically after 1-24 hours.`

### 2. Undue Emphasis on Significance
Detect: "stands/serves as", "pivotal", "vital/crucial/key role", "underscores", "evolving landscape", "indelible mark"

Before: `Terraform represents a pivotal shift, marking a transformative moment in the evolution of cloud operations.`
After: `Terraform lets you define infrastructure as code.`

### 3. Superficial Analyses with -ing Endings
Detect: "highlighting/underscoring/emphasizing...", "reflecting/symbolizing...", "cultivating/fostering...", "showcasing..."

### 4. Promotional Language
Detect: "boasts", "vibrant", "profound", "breathtaking", "groundbreaking", "renowned", "provides the most X", "advanced features", "powerful capabilities", "robust", "enterprise-grade"

Before: `AppRole provides the most flexibility but requires managing Role IDs and Secret IDs.`
After: `AppRole works with any CI/CD platform and supports custom authentication workflows, but requires managing Role IDs and Secret IDs.`

### 5. Vague Attributions [HIGH]
Detect: "Industry reports", "Experts argue", "best practices suggest", "it is recommended"

Before: `Industry reports indicate configuration drift creates security vulnerabilities.`
After: `The 2023 Verizon DBIR found 82% of breaches involved the human element, including misconfigurations.`

### 6. "Challenges and Future Prospects" Sections
Detect: "Despite its...", "Despite these challenges", "Future Outlook"

### 7. AI Vocabulary Words [HIGH]
Detect: "Additionally", "align with", "crucial", "delve", "emphasizing", "enhance", "fostering", "garner", "highlight", "intricate", "key" (adj), "landscape" (abstract), "pivotal", "showcase", "tapestry", "testament", "underscore", "valuable", "vibrant"

### 8. Copula Avoidance [HIGH]
Detect: "serves as", "stands as", "marks/represents [a]", "boasts/features/offers [a]"

Before: `Gallery 825 serves as LAAA's exhibition space and boasts over 3,000 square feet.`
After: `Gallery 825 is LAAA's exhibition space with 3,000 square feet.`

### 9. Negative Parallelisms
Detect: "Not only...but...", "It's not just about..., it's..."

### 10. Rule of Three Overuse
Detect: Ideas forced into groups of exactly three for appearance of comprehensiveness.

### 11. Elegant Variation (Synonym Cycling)
Detect: Same entity called by different names: "protagonist"/"main character"/"central figure"/"hero"

### 12. False Ranges
Detect: "from X to Y" where X and Y aren't on a meaningful scale.

### 13. Em Dash Overuse
Before: `The term is primarily promoted by Dutch institutions—not by the people themselves.`
After: `The term is primarily promoted by Dutch institutions, not by the people themselves.`

### 14. Overuse of Boldface
Remove bold from terms that don't need emphasis: OKRs, KPIs, Business Model Canvas → plain text.

### 15. Hypothetical Scenarios [CRITICAL]
Detect: "Imagine", "Suppose", "Consider a scenario", "What if", "Let's say"

Before: `Imagine a scenario where a developer accidentally deploys to production.`
After: `A developer ran 'terraform apply' in the wrong terminal tab and deployed staging configuration to production.`

### 16. Lack of Technical Specificity [CRITICAL]
Detect: "the configuration file", "the command", "the port", "the error", "the service", "the variable"

Before: `Modify the configuration file and restart the service.`
After: `Modify '/etc/ssh/sshd_config' to set 'PermitRootLogin no'. Run 'systemctl restart sshd' to apply changes.`

### 17. Collaborative Communication Artifacts
Detect: "I hope this helps", "Of course!", "Certainly!", "Would you like...", "let me know", "here is a..."

### 18. Knowledge-Cutoff Disclaimers
Detect: "as of [date]", "based on available information", "While specific details are limited"

### 19. Sycophantic/Servile Tone
Detect: "Great question!", "You're absolutely right", "That's an excellent point"

### 20. Filler Phrases
- "In order to" → "To"
- "Due to the fact that" → "Because"
- "At this point in time" → "Now"
- "Provides the ability to" → verb directly
- "Ensures that the system is configured" → "Configures the system"
- "Enables teams to manage" → "Lets teams manage"

### 21. Excessive Hedging
Detect: "could potentially possibly", "might have some effect"

### 22. Generic Positive Conclusions
Detect: "The future looks bright", "Exciting times lie ahead", "major step in the right direction"
