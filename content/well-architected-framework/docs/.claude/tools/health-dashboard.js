#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function analyzeDocument(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const health = {
    document: filePath,
    structure: analyzeStructure(content, lines),
    content: analyzeContent(content, lines),
    style: analyzeStyle(content, lines),
    links: analyzeLinks(content, lines),
  };

  // Calculate overall score
  health.overall_score = calculateOverallScore(health);
  health.status = getStatus(health.overall_score);
  health.priority_fixes = identifyPriorityFixes(health);

  return health;
}

function analyzeStructure(content, lines) {
  const structure = {
    score: 0,
    status: 'good',
    checks: {}
  };

  // Frontmatter check
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = {
    status: 'pass',
    issues: []
  };

  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)["']?/);
    const descMatch = fm.match(/description:\s*["']?([^"'\n]+)["']?/);

    if (titleMatch) {
      frontmatter.title = titleMatch[1];
    } else {
      frontmatter.issues.push('Missing title');
      frontmatter.status = 'fail';
    }

    if (descMatch) {
      const descLength = descMatch[1].length;
      frontmatter.description = {
        text: descMatch[1],
        length: descLength,
        optimal: descLength >= 150 && descLength <= 160
      };
      if (descLength < 150 || descLength > 160) {
        frontmatter.issues.push(`Description ${descLength} characters (optimal: 150-160)`);
        frontmatter.status = 'warning';
      }
    } else {
      frontmatter.issues.push('Missing description');
      frontmatter.status = 'fail';
    }
  } else {
    frontmatter.status = 'fail';
    frontmatter.issues.push('No frontmatter found');
  }

  structure.checks.frontmatter = frontmatter;

  // Required sections check
  const sections = {
    status: 'pass',
    issues: []
  };

  const hasWhy = /^##\s+Why\s+/mi.test(content);
  const hasResources = /^##\s+HashiCorp\s+resources/mi.test(content);
  const hasNextSteps = /^##\s+Next\s+steps/mi.test(content);

  if (!hasWhy) sections.issues.push('Missing "Why" section');
  if (!hasResources) sections.issues.push('Missing "HashiCorp resources" section');
  if (!hasNextSteps) sections.issues.push('Missing "Next steps" section');

  if (sections.issues.length > 0) {
    sections.status = 'fail';
  }

  structure.checks.required_sections = sections;

  // Heading hierarchy check
  const headings = {
    status: 'pass',
    issues: []
  };

  const headingPattern = /^(#{1,6})\s+(.+)$/gm;
  let match;
  let lineNum = 0;

  while ((match = headingPattern.exec(content)) !== null) {
    lineNum = content.substring(0, match.index).split('\n').length;
    const level = match[1].length;
    const text = match[2];

    // Check for Title Case (multiple capital letters)
    const capitalWords = text.match(/\b[A-Z][a-z]+\b/g) || [];
    if (capitalWords.length > 1) {
      const allCaps = text.split(' ').every(word =>
        /^[A-Z]/.test(word) || /^[a-z]+$/.test(word)
      );
      if (allCaps) {
        headings.issues.push({
          line: lineNum,
          severity: 'minor',
          message: 'Title Case detected',
          current: match[0],
          suggested: match[1] + ' ' + text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        });
        headings.status = 'warning';
      }
    }
  }

  structure.checks.heading_hierarchy = headings;

  // List formatting check
  const lists = {
    status: 'pass',
    issues: []
  };

  // Check for lists without "the following" introduction
  // Only check multi-item lists (3+ items) and exclude code blocks
  const codeBlockPattern = /```[\s\S]*?```/g;
  const contentWithoutCode = content.replace(codeBlockPattern, '');

  const listBlockPattern = /(?:^|\n)((?:[-*]|\d+\.)\s+.+(?:\n(?:[-*]|\d+\.)\s+.+)*)/gm;
  const listBlocks = [...contentWithoutCode.matchAll(listBlockPattern)];

  for (const block of listBlocks) {
    const items = block[1].split('\n').filter(line => /^(?:[-*]|\d+\.)\s+/.test(line));

    // Only check lists with 3+ items
    if (items.length >= 3) {
      const lineNum = content.substring(0, content.indexOf(block[1])).split('\n').length;
      const prevLines = content.substring(0, content.indexOf(block[1])).split('\n').slice(-3);

      const hasFollowing = prevLines.some(line =>
        /the following/i.test(line) ||
        /these include/i.test(line) ||
        /include:/i.test(line) ||
        /:$/i.test(line.trim())
      );

      if (!hasFollowing) {
        lists.issues.push({
          line: lineNum,
          message: 'List without proper introduction'
        });
        lists.status = 'warning';
      }
    }
  }

  structure.checks.list_formatting = lists;

  // Calculate structure score
  let structureScore = 10;
  if (frontmatter.status === 'fail') structureScore -= 3;
  if (frontmatter.status === 'warning') structureScore -= 0.5;
  if (sections.status === 'fail') structureScore -= 3;
  if (headings.issues.length > 0) structureScore -= Math.min(headings.issues.length * 0.5, 2);
  if (lists.issues.length > 0) structureScore -= Math.min(lists.issues.length * 0.3, 1.5);

  structure.score = Math.max(0, structureScore);
  structure.status = structure.score >= 7 ? 'good' : structure.score >= 5 ? 'needs_attention' : 'critical';

  return structure;
}

function analyzeContent(content, lines) {
  const contentHealth = {
    score: 0,
    status: 'good',
    metrics: {}
  };

  // Word count
  const words = content.replace(/^---[\s\S]*?---/m, '').match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  contentHealth.metrics.word_count = {
    count: wordCount,
    status: wordCount >= 700 && wordCount <= 1200 ? 'excellent' :
            wordCount >= 500 && wordCount < 700 || wordCount > 1200 && wordCount <= 1500 ? 'acceptable' :
            'needs_attention'
  };

  // Code examples
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  contentHealth.metrics.code_examples = {
    count: codeBlocks.length,
    status: codeBlocks.length >= 1 ? 'good' : 'warning'
  };

  // Resource links in HashiCorp resources section
  const resourceSection = content.match(/##\s+HashiCorp\s+resources[\s\S]*?(?=##|$)/i);
  let resourceCount = 0;
  if (resourceSection) {
    const links = resourceSection[0].match(/\[.*?\]\(.*?\)/g) || [];
    resourceCount = links.length;
  }

  contentHealth.metrics.resource_links = {
    count: resourceCount,
    status: resourceCount >= 8 && resourceCount <= 12 ? 'excellent' :
            resourceCount >= 5 && resourceCount < 8 ? 'acceptable' :
            'needs_attention'
  };

  // Persona coverage (simplified heuristic)
  const hasWhy = /##\s+Why\s+/mi.test(content);
  const hasExamples = codeBlocks.length > 0;
  const hasResources = resourceCount > 0;

  contentHealth.metrics.persona_balance = {
    decision_maker: hasWhy,
    implementer: hasExamples && hasResources,
    status: hasWhy && hasExamples && hasResources ? 'balanced' : 'unbalanced'
  };

  // Calculate content score
  let contentScore = 10;
  if (contentHealth.metrics.word_count.status === 'needs_attention') contentScore -= 2;
  if (contentHealth.metrics.word_count.status === 'acceptable') contentScore -= 0.5;
  if (contentHealth.metrics.code_examples.status === 'warning') contentScore -= 1.5;
  if (contentHealth.metrics.resource_links.status === 'needs_attention') contentScore -= 2;
  if (contentHealth.metrics.resource_links.status === 'acceptable') contentScore -= 0.5;
  if (contentHealth.metrics.persona_balance.status === 'unbalanced') contentScore -= 2;

  contentHealth.score = Math.max(0, contentScore);
  contentHealth.status = contentHealth.score >= 8 ? 'excellent' :
                         contentHealth.score >= 6 ? 'good' :
                         contentHealth.score >= 4 ? 'needs_attention' : 'critical';

  return contentHealth;
}

function analyzeStyle(content, lines) {
  const style = {
    score: 0,
    status: 'good',
    issues: []
  };

  // Vague pronouns at sentence start
  const vaguePronounPattern = /^[>\s]*(This|That|It|These|Those)\s+/gm;
  const vaguePronounMatches = [...content.matchAll(vaguePronounPattern)];

  if (vaguePronounMatches.length > 0) {
    style.issues.push({
      type: 'vague_pronouns',
      count: vaguePronounMatches.length,
      severity: 'critical',
      lines: vaguePronounMatches.map(m =>
        content.substring(0, m.index).split('\n').length
      ).slice(0, 5)
    });
  }

  // Promotional language
  const promotionalWords = /\b(breathtaking|exceptional value|revolutionary|game-changing|best-in-class|unparalleled|cutting-edge)\b/gi;
  const promotionalMatches = [...content.matchAll(promotionalWords)];

  if (promotionalMatches.length > 0) {
    style.issues.push({
      type: 'promotional_language',
      count: promotionalMatches.length,
      severity: 'critical',
      lines: promotionalMatches.map(m =>
        content.substring(0, m.index).split('\n').length
      ).slice(0, 5)
    });
  }

  // Conjunction overuse
  const conjunctionPattern = /^[>\s]*(Moreover|Furthermore|Additionally|In addition)\b/gmi;
  const conjunctionMatches = [...content.matchAll(conjunctionPattern)];

  if (conjunctionMatches.length > 2) {
    style.issues.push({
      type: 'conjunction_overuse',
      count: conjunctionMatches.length,
      severity: 'minor',
      lines: conjunctionMatches.map(m =>
        content.substring(0, m.index).split('\n').length
      ).slice(0, 5)
    });
  }

  // Problematic words
  const problematicWords = /\b(please|simply|just|easy|easily)\b/gi;
  const problematicMatches = [...content.matchAll(problematicWords)];

  if (problematicMatches.length > 3) {
    style.issues.push({
      type: 'problematic_words',
      count: problematicMatches.length,
      severity: 'minor',
      words: [...new Set(problematicMatches.map(m => m[0].toLowerCase()))],
      lines: problematicMatches.map(m =>
        content.substring(0, m.index).split('\n').length
      ).slice(0, 5)
    });
  }

  // Calculate style score
  let styleScore = 10;
  for (const issue of style.issues) {
    if (issue.severity === 'critical') {
      styleScore -= issue.count * 0.5;
    } else if (issue.severity === 'minor') {
      styleScore -= issue.count * 0.2;
    }
  }

  style.score = Math.max(0, styleScore);
  style.status = style.score >= 8 ? 'excellent' :
                 style.score >= 6 ? 'good' :
                 style.score >= 4 ? 'needs_attention' : 'critical';

  return style;
}

function analyzeLinks(content, lines) {
  const links = {
    score: 0,
    status: 'good',
    metrics: {
      internal_links: 0,
      external_links: 0,
      broken_links: 0
    },
    issues: []
  };

  // Find all markdown links
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const linkMatches = [...content.matchAll(linkPattern)];

  for (const match of linkMatches) {
    const linkText = match[1];
    const linkUrl = match[2];
    const lineNum = content.substring(0, match.index).split('\n').length;

    // Classify as internal or external
    if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
      links.metrics.external_links++;
    } else {
      links.metrics.internal_links++;
    }

    // Check for verb inside brackets
    const actionVerbs = /^(Learn|Read|Get|See|View|Download|Install|Configure|Understand|Explore|Discover)/i;
    if (actionVerbs.test(linkText)) {
      links.issues.push({
        line: lineNum,
        severity: 'minor',
        message: 'Verb inside brackets',
        current: match[0],
        suggested: `${linkText.match(actionVerbs)[0]} [${linkText.replace(actionVerbs, '').trim()}]`
      });
    }
  }

  // Calculate link score
  let linkScore = 10;
  if (links.metrics.internal_links === 0) linkScore -= 2;
  linkScore -= links.issues.length * 0.3;

  links.score = Math.max(0, linkScore);
  links.status = links.score >= 8 ? 'excellent' :
                 links.score >= 6 ? 'good' :
                 links.score >= 4 ? 'needs_attention' : 'critical';

  return links;
}

function calculateOverallScore(health) {
  const weights = {
    structure: 0.25,
    content: 0.30,
    style: 0.25,
    links: 0.20
  };

  return (
    health.structure.score * weights.structure +
    health.content.score * weights.content +
    health.style.score * weights.style +
    health.links.score * weights.links
  ).toFixed(2);
}

function getStatus(score) {
  if (score >= 9) return 'excellent';
  if (score >= 7) return 'good';
  if (score >= 5) return 'needs_attention';
  return 'critical';
}

function identifyPriorityFixes(health) {
  const fixes = [];

  // Structure issues
  if (health.structure.checks.frontmatter.status === 'fail') {
    fixes.push({
      priority: 'high',
      category: 'structure',
      issue: 'frontmatter',
      description: health.structure.checks.frontmatter.issues.join(', ')
    });
  }

  if (health.structure.checks.required_sections.status === 'fail') {
    fixes.push({
      priority: 'high',
      category: 'structure',
      issue: 'required_sections',
      description: health.structure.checks.required_sections.issues.join(', ')
    });
  }

  // Style issues
  const vaguePronounIssue = health.style.issues.find(i => i.type === 'vague_pronouns');
  if (vaguePronounIssue) {
    fixes.push({
      priority: 'high',
      category: 'style',
      issue: 'vague_pronouns',
      count: vaguePronounIssue.count,
      auto_fixable: false
    });
  }

  const promotionalIssue = health.style.issues.find(i => i.type === 'promotional_language');
  if (promotionalIssue) {
    fixes.push({
      priority: 'high',
      category: 'style',
      issue: 'promotional_language',
      count: promotionalIssue.count,
      auto_fixable: false
    });
  }

  // Content issues
  if (health.content.metrics.resource_links.status === 'needs_attention') {
    fixes.push({
      priority: 'medium',
      category: 'content',
      issue: 'insufficient_resources',
      current: health.content.metrics.resource_links.count,
      target: '8-12 links'
    });
  }

  return fixes;
}

function formatTextOutput(health) {
  const doc = path.basename(health.document);
  const statusEmoji = {
    excellent: '🟢',
    good: '🟢',
    needs_attention: '🟡',
    critical: '🔴'
  };

  let output = '\n';
  output += `${colors.bright}Document Health Dashboard: ${doc}${colors.reset}\n`;
  output += '='.repeat(60) + '\n\n';

  // Structure Health
  output += `${colors.bright}🏗️  STRUCTURE HEALTH: ${statusEmoji[health.structure.status]} ${health.structure.status.toUpperCase()} (${health.structure.score}/10)${colors.reset}\n`;
  output += '─'.repeat(60) + '\n\n';

  // Frontmatter
  const fmStatus = health.structure.checks.frontmatter.status;
  const fmIcon = fmStatus === 'pass' ? '✅' : fmStatus === 'warning' ? '🟡' : '🔴';
  output += `${fmIcon} Frontmatter\n`;

  if (health.structure.checks.frontmatter.title) {
    output += `   ✓ Title: "${health.structure.checks.frontmatter.title}"\n`;
  }

  if (health.structure.checks.frontmatter.description) {
    const desc = health.structure.checks.frontmatter.description;
    output += `   ${desc.optimal ? '✓' : '⚠️'} Description: ${desc.length} characters ${desc.optimal ? '(optimal for SEO)' : '(optimal: 150-160)'}\n`;
  }

  if (health.structure.checks.frontmatter.issues.length > 0) {
    health.structure.checks.frontmatter.issues.forEach(issue => {
      output += `   ${colors.red}✗ ${issue}${colors.reset}\n`;
    });
  }
  output += '\n';

  // Required Sections
  const secStatus = health.structure.checks.required_sections.status;
  const secIcon = secStatus === 'pass' ? '✅' : '🔴';
  output += `${secIcon} Required Sections\n`;

  if (secStatus === 'pass') {
    output += `   ✓ All required sections present\n`;
  } else {
    health.structure.checks.required_sections.issues.forEach(issue => {
      output += `   ${colors.red}✗ ${issue}${colors.reset}\n`;
    });
  }
  output += '\n';

  // Heading Hierarchy
  const headStatus = health.structure.checks.heading_hierarchy.status;
  const headIcon = headStatus === 'pass' ? '✅' : '🟡';
  output += `${headIcon} Heading Hierarchy\n`;

  if (headStatus === 'pass') {
    output += `   ✓ All headings properly formatted\n`;
  } else {
    health.structure.checks.heading_hierarchy.issues.slice(0, 3).forEach(issue => {
      output += `   ${colors.yellow}⚠️  Line ${issue.line}: ${issue.message}${colors.reset}\n`;
      output += `      "${issue.current}"\n`;
      output += `      → "${issue.suggested}"\n`;
    });
    if (health.structure.checks.heading_hierarchy.issues.length > 3) {
      output += `   ... and ${health.structure.checks.heading_hierarchy.issues.length - 3} more\n`;
    }
  }
  output += '\n';

  output += '─'.repeat(60) + '\n\n';

  // Content Health
  output += `${colors.bright}📝 CONTENT HEALTH: ${statusEmoji[health.content.status]} ${health.content.status.toUpperCase()} (${health.content.score}/10)${colors.reset}\n`;
  output += '─'.repeat(60) + '\n\n';

  // Word Count
  const wcMetric = health.content.metrics.word_count;
  const wcIcon = wcMetric.status === 'excellent' ? '🟢' : wcMetric.status === 'acceptable' ? '🟡' : '🔴';
  output += `${wcIcon} Word Count: ${wcMetric.count} words\n`;
  output += `   Target: 700-1,200 | Status: ${wcMetric.status}\n\n`;

  // Code Examples
  const ceMetric = health.content.metrics.code_examples;
  const ceIcon = ceMetric.status === 'good' ? '🟢' : '🟡';
  output += `${ceIcon} Code Examples: ${ceMetric.count} examples\n`;
  if (ceMetric.count === 0) {
    output += `   ${colors.yellow}⚠️  No code examples found${colors.reset}\n`;
  }
  output += '\n';

  // Resource Links
  const rlMetric = health.content.metrics.resource_links;
  const rlIcon = rlMetric.status === 'excellent' ? '🟢' : rlMetric.status === 'acceptable' ? '🟡' : '🔴';
  output += `${rlIcon} Resource Links: ${rlMetric.count} HashiCorp resources\n`;
  output += `   Target: 8-12 | Status: ${rlMetric.status}\n\n`;

  // Persona Balance
  const pbMetric = health.content.metrics.persona_balance;
  const pbIcon = pbMetric.status === 'balanced' ? '🟢' : '🟡';
  output += `${pbIcon} Persona Coverage: ${pbMetric.status}\n`;
  output += `   ✓ Decision-maker: ${pbMetric.decision_maker ? 'Yes' : 'No'}\n`;
  output += `   ✓ Implementer: ${pbMetric.implementer ? 'Yes' : 'No'}\n\n`;

  output += '─'.repeat(60) + '\n\n';

  // Style Health
  output += `${colors.bright}✍️  STYLE HEALTH: ${statusEmoji[health.style.status]} ${health.style.status.toUpperCase()} (${health.style.score}/10)${colors.reset}\n`;
  output += '─'.repeat(60) + '\n\n';

  if (health.style.issues.length === 0) {
    output += `✅ No style issues detected\n\n`;
  } else {
    health.style.issues.forEach(issue => {
      const icon = issue.severity === 'critical' ? '🔴' : '🟡';
      const issueTitle = issue.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      output += `${icon} ${issueTitle} (${issue.count} issues)\n`;
      output += `   Lines: ${issue.lines.join(', ')}\n`;

      if (issue.type === 'vague_pronouns') {
        output += `   ${colors.red}Fix: Replace vague pronouns with specific subjects${colors.reset}\n`;
      } else if (issue.type === 'promotional_language') {
        output += `   ${colors.red}Fix: Use technical, objective language${colors.reset}\n`;
      } else if (issue.type === 'conjunction_overuse') {
        output += `   ${colors.yellow}Fix: Remove unnecessary conjunctions${colors.reset}\n`;
      } else if (issue.type === 'problematic_words') {
        output += `   Words: ${issue.words.join(', ')}\n`;
        output += `   ${colors.yellow}Fix: Use precise technical terms${colors.reset}\n`;
      }
      output += '\n';
    });
  }

  output += '─'.repeat(60) + '\n\n';

  // Link Health
  output += `${colors.bright}🔗 LINK HEALTH: ${statusEmoji[health.links.status]} ${health.links.status.toUpperCase()} (${health.links.score}/10)${colors.reset}\n`;
  output += '─'.repeat(60) + '\n\n';

  output += `${health.links.metrics.internal_links > 0 ? '✅' : '🔴'} Internal Links: ${health.links.metrics.internal_links}\n`;
  output += `✅ External Links: ${health.links.metrics.external_links}\n`;

  if (health.links.issues.length > 0) {
    output += `\n🟡 Link Format Issues (${health.links.issues.length})\n`;
    health.links.issues.slice(0, 3).forEach(issue => {
      output += `   Line ${issue.line}: ${issue.message}\n`;
    });
    if (health.links.issues.length > 3) {
      output += `   ... and ${health.links.issues.length - 3} more\n`;
    }
  }
  output += '\n';

  output += '─'.repeat(60) + '\n\n';

  // Overall Score
  output += `${colors.bright}📊 OVERALL HEALTH SCORE: ${statusEmoji[health.status]} ${health.overall_score}/10${colors.reset}\n`;
  output += '─'.repeat(60) + '\n\n';

  output += `Status: ${health.status.toUpperCase()}\n\n`;

  // Priority Fixes
  if (health.priority_fixes.length > 0) {
    output += `${colors.bright}Priority Fixes:${colors.reset}\n`;
    health.priority_fixes.forEach((fix, idx) => {
      const icon = fix.priority === 'high' ? '🔴' : '🟡';
      output += `${idx + 1}. ${icon} ${fix.issue.replace(/_/g, ' ')} (${fix.category})`;
      if (fix.count) output += ` - ${fix.count} instances`;
      if (fix.description) output += `\n   ${fix.description}`;
      output += '\n';
    });
    output += '\n';
  }

  // Quick Wins
  output += `${colors.bright}Quick Wins:${colors.reset}\n`;
  output += `- Run /check-hashicorp-style --fix for automated fixes\n`;
  output += `- Review and fix high-priority issues manually\n\n`;

  // Next Steps
  if (health.overall_score >= 7) {
    output += `${colors.green}✓ Ready for: Full review with /review-doc${colors.reset}\n`;
  } else if (health.overall_score >= 5) {
    output += `${colors.yellow}⚠️  Next: Fix priority issues, then run /review-doc${colors.reset}\n`;
  } else {
    output += `${colors.red}⚠️  Next: Major revision needed before review${colors.reset}\n`;
  }

  return output;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node health-dashboard.js <file.mdx> [--format json]');
  process.exit(1);
}

const filePath = args[0];
const format = args.includes('--format') && args[args.indexOf('--format') + 1] === 'json' ? 'json' : 'text';

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const health = analyzeDocument(filePath);

if (format === 'json') {
  console.log(JSON.stringify(health, null, 2));
} else {
  console.log(formatTextOutput(health));
}
